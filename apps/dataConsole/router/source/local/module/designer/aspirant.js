DesignerJs.prototype.aspirantDataRender = async function (firstLoad = true) {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    const calcMonthDelta = (from, to) => {
      return ((to.getFullYear() * 12) + to.getMonth() + 1) - ((from.getFullYear() * 12) + from.getMonth() + 1) + 1;
    }
    const now = new Date();
    const past = new Date();
    const yearsAgo = new Date();
    const agoDelta = 6;
    const agoYearDelta = 1;
    let columns;
    let values;
    let yearDelta;
    let monthDelta;
    let standards;

    past.setFullYear(past.getFullYear() - agoYearDelta);
    past.setMonth(0);
    past.setDate(1);
    past.setHours(9);
    past.setMinutes(0);
    past.setSeconds(0);

    yearsAgo.setMonth(yearsAgo.getMonth() - agoDelta);
    yearDelta = now.getFullYear() - past.getFullYear() + 1
    monthDelta = calcMonthDelta(yearsAgo, now);

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "aspid",
          type: "string",
        },
        {
          title: "성함",
          width: 60,
          name: "designer",
          type: "string",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "신청일",
        width: 100,
        name: "applyDate",
        type: "date",
      },
      {
        title: "응대 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "조정 필요",
            color: colorChip.black,
          },
          {
            value: "조정중",
            color: colorChip.black,
          },
          {
            value: "미팅 대기",
            color: colorChip.black,
          },
          {
            value: "미팅 완료",
            color: colorChip.black,
          },
          {
            value: "계약서 발송",
            color: colorChip.black,
          },
          {
            value: "계약 합의중",
            color: colorChip.black,
          },
          {
            value: "계약 완료",
            color: colorChip.black,
          },
          {
            value: "메뉴얼 발송",
            color: colorChip.black,
          },
          {
            value: "드랍",
            color: colorChip.deactive,
          },
        ],
        type: "string",
        menu: [
          {
            value: "전체 보기",
            functionName: "filterEvent_$all",
          }
        ].concat([
          "조정 필요",
          "조정중",
          "미팅 대기",
          "미팅 완료",
          "계약서 발송",
          "계약 합의중",
          "계약 완료",
          "메뉴얼 발송",
          "드랍",
        ].map((str) => {
          return {
            value: str,
            functionName: "filterEvent_" + str,
          }
        }))
      },
      {
        title: "연락처",
        width: 130,
        name: "phone",
        type: "string",
      },
      {
        title: "주소",
        width: 400,
        name: "address",
        type: "string",
      },
      {
        title: "성별",
        width: 80,
        name: "gender",
        type: "string",
      },
      {
        title: "생일",
        width: 100,
        name: "birth",
        type: "date",
      },
      {
        title: "이메일",
        width: 200,
        name: "email",
        type: "string",
      },
      {
        title: "사업자 분류",
        width: 200,
        name: "business",
        type: "string",
      },
      {
        title: "회사명",
        width: 150,
        name: "company",
        type: "string",
      },
      {
        title: "등록 번호",
        width: 200,
        name: "numbers",
        type: "string",
      },
      {
        title: "SNS",
        width: 400,
        name: "sns",
        type: "string",
      },
      {
        title: "홈페이지",
        width: 400,
        name: "homepage",
        type: "string",
      },
    ];

    values = {};

    for (let aspirant of instance.aspirants) {

      standards.values[aspirant.aspid] = [
        {
          value: aspirant.aspid,
          name: "aspid",
        },
        {
          value: aspirant.designer,
          name: "designer",
        },
      ];

      values[aspirant.aspid] = [
        {
          value: dateToString(aspirant.submit.partnership.date),
          name: "applyDate",
        },
        {
          value: aspirant.meeting.status,
          name: "status",
        },
        {
          value: aspirant.phone,
          name: "phone",
        },
        {
          value: aspirant.address,
          name: "address",
        },
        {
          value: aspirant.gender,
          name: "gender",
        },
        {
          value: dateToString(aspirant.birth),
          name: "birth",
        },
        {
          value: aspirant.email,
          name: "email",
        },
        {
          value: aspirant.information.company.classification,
          name: "business",
        },
        {
          value: aspirant.information.company.name,
          name: "company",
        },
        {
          value: aspirant.information.company.businessNumber,
          name: "numbers",
        },
        {
          value: aspirant.information.channel.sns.join(", "),
          name: "sns",
        },
        {
          value: aspirant.information.channel.web.join(", "),
          name: "homepage",
        },
      ];

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantWhiteData = async function (aspid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, withOut, colorChip, dateToString } = GeneralJs;
  try {
    const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
    let dataMatrix;
    let careerToBlock;
    let schoolToBlock;

    careerToBlock = (aspirant) => {
      const pipe = "&nbsp;&nbsp;<u%|%u>&nbsp;&nbsp;";
      let endMatrix;

      endMatrix = aspirant.information.career.detail.map((obj) => {
        const endDate = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? new Date() : obj.date.end;
        const startDate = obj.date.start;
        const startWords = (String(obj.date.start.getFullYear()).slice(2) + "." + String(obj.date.start.getMonth() + 1));
        const endWords = (obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재직중" : (String(obj.date.end.getFullYear()).slice(2) + "." + String(obj.date.end.getMonth() + 1));
        const delta = endDate.valueOf() - startDate.valueOf();
        const deltaDates = Math.round((((delta / 1000) / 60) / 60) / 24);
        const rangeWords = String(Math.floor(deltaDates / 365)) + "년 " + String(Math.floor((deltaDates % 365) / 30)) + "개월" + "&nbsp;&nbsp;(" + startWords + " ~ " + endWords + ")";
        return {
          title: [
            "회사",
            "담당 업무",
            "기간",
            "태그",
          ],
          value: [
            obj.company + pipe + obj.team,
            obj.role,
            rangeWords,
            obj.tag,
          ]
        };
      });
      return endMatrix;
    }

    schoolToBlock = (aspirant) => {
      let endMatrix;
      endMatrix = aspirant.information.career.school.map((obj) => {
        return {
          title: [
            "학교",
            "전공",
            "졸업",
          ],
          value: [
            obj.school,
            obj.major,
            ((obj.date.end.valueOf() > (new Date(3000, 0, 1)).valueOf()) ? "재학중" : dateToString(obj.date.end).split("-").slice(0, 2).join("년 ") + "월"),
          ]
        };
      });
      return endMatrix;
    }

    dataMatrix = [
      {
        name: "name",
        type: "string",
        title: "성함",
        value: aspirant.designer,
      },
      {
        name: "phone",
        type: "string",
        title: "연락처",
        value: aspirant.phone,
      },
      {
        name: "apply",
        type: "date",
        title: "신청일",
        value: dateToString(aspirant.submit.partnership.date, true),
      },
      {
        name: "status",
        type: "select",
        columns: [
          "조정 필요",
          "조정중",
          "미팅 대기",
          "미팅 완료",
          "계약서 발송",
          "계약 합의중",
          "계약 완료",
          "메뉴얼 발송",
          "드랍",
        ],
        title: "상태",
        value: [
          "조정 필요",
          "조정중",
          "미팅 대기",
          "미팅 완료",
          "계약서 발송",
          "계약 합의중",
          "계약 완료",
          "메뉴얼 발송",
          "드랍",
        ].map((str) => {
          return str === aspirant.meeting.status ? 1 : 0;
        }),
      },
      {
        name: "gender",
        type: "select",
        title: "성별",
        columns: [
          "여성",
          "남성"
        ],
        value: aspirant.gender === "여성" ? [ 1, 0 ] : [ 0, 1 ],
      },
      {
        name: "birth",
        type: "string",
        title: "생일",
        value: dateToString(aspirant.birth) + " (" + String((new Date()).getFullYear() - aspirant.birth.getFullYear()) + "세)",
      },
      {
        name: "email",
        type: "string",
        title: "이메일",
        value: aspirant.email,
      },
      {
        name: "address",
        type: "string",
        title: "주소",
        value: aspirant.address,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "classification",
        type: "select",
        title: "사업자 구분",
        columns: [
          "법인(일반)",
          "개인(일반)",
          "개인(간이)",
          "프리랜서",
        ],
        value: (/법인/gi.test(aspirant.information.company.classification) ? [ 1, 0, 0, 0 ] : (/일반/gi.test(aspirant.information.company.classification) ? [ 0, 1, 0, 0 ] : (/간이/gi.test(aspirant.information.company.classification) ? [ 0, 0, 1, 0 ] : [ 0, 0, 0, 1 ]))),
      },
      {
        name: "company",
        type: "string",
        title: "회사명",
        value: aspirant.information.company.name,
      },
      {
        name: "businessNumber",
        type: "string",
        title: "사업자 등록번호",
        value: aspirant.information.company.businessNumber,
      },
      {
        name: "businessStart",
        type: "date",
        title: "사업자 개업일",
        value: dateToString(aspirant.information.company.start),
      },
      {
        name: "representative",
        type: "string",
        title: "대표자 성함",
        value: aspirant.information.company.representative,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "accountBank",
        type: "string",
        title: "은행명",
        value: aspirant.information.account.bank,
      },
      {
        name: "accountNumber",
        type: "string",
        title: "계좌 번호",
        value: aspirant.information.account.number,
      },
      {
        name: "accountTo",
        type: "string",
        title: "예금주",
        value: aspirant.information.account.to,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "career",
        type: "block",
        title: "경력",
        value: careerToBlock(aspirant),
      },
      {
        name: "school",
        type: "block",
        title: "학력",
        value: schoolToBlock(aspirant),
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
      {
        name: "homepage",
        type: "array",
        title: "홈페이지",
        value: aspirant.information.channel.web,
      },
      {
        name: "sns",
        type: "array",
        title: "SNS",
        value: aspirant.information.channel.sns,
      },
      {
        name: "margin",
        type: "margin",
        title: "",
        value: "",
      },
    ];

    return dataMatrix;
  } catch (e) {
    console.log(e);
    return [];
  }
}

DesignerJs.prototype.aspirantColorSync = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.aspirantDataRender(false));

    colorStandard = columns.find((obj) => { return obj.colorStandard === true });

    standardDoms = [ ...document.querySelectorAll('.' + standardCaseClassName) ];
    valueDoms = [ ...document.querySelectorAll('.' + valueCaseClassName) ];

    for (let i = 0; i < standardDoms.length; i++) {
      thisValue = findByAttribute([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ], "name", colorStandard.name).textContent.trim();
      if (colorStandard.colorMap.find((o) => { return o.value === thisValue }) === undefined) {
        throw new Error("invalid value color match");
      }
      thisColor = colorStandard.colorMap.find((o) => { return o.value === thisValue }).color;
      thisTargets = [ ...standardDoms[i].querySelectorAll('.' + valueTargetClassName) ].concat([ ...valueDoms[i].querySelectorAll('.' + valueTargetClassName) ]);
      for (let dom of thisTargets) {
        dom.style.color = (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor;
        dom.setAttribute("color", (new RegExp(asyncProcessText, "gi")).test(dom.textContent) ? colorChip.gray3 : thisColor);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantWhiteContents = async function (tong, aspid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, stringToLink, variableArray } = GeneralJs;
  try {
    const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
    const dataArr = await instance.aspirantWhiteData(aspid);
    const maxColumnsNumber = 9;
    let name;
    let type;
    let title;
    let value;
    let motherBlock;
    let blockHeight;
    let titleWidth;
    let titleArea;
    let titleSize, titleWeight;
    let num;
    let marginPercentage;
    let careerBlockGrayOuterMargin;
    let careerBlockOuterMargin;
    let careerBlockOuterMarginTop;
    let careerBlockOuterMarginBottom;
    let careerBlockInnerMargin;
    let careerBlockInnerMarginSmall;
    let careerBlockSize;
    let blockBottom;
    let portfolioImages;
    let imageTargets;
    let imageTong;
    let imageTongPadding;
    let imagesNumber;
    let imageInnerBetween;
    let imageTongChildren;
    let targetNumber;
    let imageNode;
    let targetNumberArr;

    blockHeight = 32;
    titleWidth = 180;

    titleSize = 15;
    titleWeight = 700;

    marginPercentage = 33;
    imageTongPadding = 16;

    careerBlockGrayOuterMargin = <%% 10, 10, 9, 8, 0 %%>;
    careerBlockOuterMargin = <%% 14, 14, 14, 12, 2.5 %%>;
    careerBlockOuterMarginTop = <%% (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), (isMac() ? 10 : 12), 2 %%>;
    careerBlockOuterMarginBottom = <%% (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), (isMac() ? 12 : 10), 2 %%>;
    careerBlockInnerMargin = <%% 6, 6, 6, 4, 1 %%>;
    careerBlockInnerMarginSmall = <%% 2, 2, 2, 2, 0 %%>;
    careerBlockSize = <%% 13, 13, 13, 13, 2.5 %%>;

    blockBottom = 20;

    imagesNumber = 3;
    imageInnerBetween = 8;
  
    for (let obj of dataArr) {
      name = obj.name;
      type = obj.type;
      title = obj.title;
      value = obj.value;

      motherBlock = createNode({
        mother: tong,
        style: {
          display: "block",
          position: "relative",
          width: withOut(0, ea),
          "min-height": String(blockHeight) + ea,
        }
      });

      titleArea = createNode({
        mother: motherBlock,
        style: {
          display: "inline-flex",
          verticalAlign: "top",
          position: "relative",
          width: String(titleWidth) + ea,
          height: String(blockHeight) + ea,
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "row",
        },
        child: {
          text: title,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            fontSize: String(titleSize) + ea,
            fontWeight: String(titleWeight),
            color: colorChip.black,
          }
        }
      })

      if (type === "string") {

        createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(titleWidth, ea),
          },
          child: {
            text: value,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
            }
          }
        });

      } else if (type === "date") {

        createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            width: withOut(titleWidth, ea),
          },
          child: {
            text: value,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              fontSize: String(titleSize) + ea,
              fontWeight: String(400),
              color: colorChip.black,
            }
          }
        });

      } else if (type === "select") {
        
        num = 0;
        for (let str of obj.columns) {
          createNode({
            mother: motherBlock,
            style: {
              display: "inline-block",
              verticalAlign: "top",
              position: "relative",
              width: "calc(" + withOut(titleWidth, ea) + " / " + String(maxColumnsNumber) + ")",
            },
            child: {
              text: str,
              style: {
                display: "inline-block",
                verticalAlign: "top",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(value[num] === 1 ? 400 : 200),
                color: value[num] === 1 ? colorChip.green : colorChip.deactive,
              }
            }
          });
          num++;
        }

      } else if (type === "block") {
        
        createNode({
          mother: motherBlock,
          style: {
            display: "inline-block",
            verticalAlign: "top",
            position: "relative",
            padding: String(careerBlockGrayOuterMargin) + ea,
            width: withOut(titleWidth + (careerBlockGrayOuterMargin * 2), ea),
            borderRadius: String(5) + "px",
            background: colorChip.gray0,
            marginBottom: String(blockBottom) + ea,
          },
          children: value.map((obj, index) => {
            const { title, value: factorValue } = obj;
            const lastBoo = (index === value.length - 1);
            return {
              attribute: {
                index: String(index),
              },
              style: {
                display: "block",
                position: "relative",
                padding: String(careerBlockOuterMargin) + ea,
                paddingTop: String(careerBlockOuterMarginTop) + ea,
                paddingBottom: String(careerBlockOuterMarginBottom) + ea,
                width: withOut(careerBlockOuterMargin * 2, ea),
                borderRadius: String(5) + "px",
                marginBottom: !lastBoo ? String(careerBlockInnerMargin) + ea : "",
                background: colorChip.white,
                boxShadow: "0px 2px 11px -9px " + colorChip.shadow,
              },
              children: factorValue.map((str, index) => {
                const lastBoo = (index === factorValue.length - 1);
                return {
                  text: "<b%" + title[index] + " %b>:" + "&nbsp;&nbsp;&nbsp;" + str,
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(400),
                    color: colorChip.black,
                    marginBottom: !lastBoo ? String(careerBlockInnerMarginSmall) + ea : "",
                  },
                  bold: {
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(800),
                    color: colorChip.black,
                  },
                  under: {
                    fontSize: String(careerBlockSize) + ea,
                    fontWeight: String(200),
                    color: colorChip.green,
                  }
                }
              })
            }
          })
        });

      } else if (type === "margin") {

        createNode({
          mother: motherBlock,
          style: {
            display: "block",
            position: "absolute",
            top: String(0),
            left: String(0),
            height: String(marginPercentage) + '%',
            width: withOut(0, ea),
            borderBottom: "1px dashed " + colorChip.gray3,
          }
        })

      } else if (type === "array") {

        if (value.length > 0) {
          createNode({
            mother: motherBlock,
            style: {
              display: "inline-block",
              position: "relative",
              width: withOut(titleWidth, ea),
            },
            child: {
              text: value[0],
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(titleSize) + ea,
                fontWeight: String(400),
                color: colorChip.black,
              }
            }
          });
        }

      }

    }
    
    portfolioImages = await ajaxJson({ aspid }, BRIDGEHOST + "/aspirantPortfolio", { equal: true });
    imageTargets = portfolioImages.link.map((str) => { return stringToLink(str) });

    imageTong = createNode({
      mother: tong,
      style: {
        display: "block",
        position: "relative",
        width: withOut(imageTongPadding * 2, ea),
        background: colorChip.gray1,
        padding: String(imageTongPadding) + ea,
        paddingRight: String(imageTongPadding - imageInnerBetween) + ea,
        borderRadius: String(5) + "px",
      }
    });

    imageTongChildren = [];
    for (let num of variableArray(imagesNumber)) {
      imageTongChildren.push(createNode({
        mother: imageTong,
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          marginRight: String(imageInnerBetween) + ea,
          width: "calc(calc(calc(100% - " + String(imageInnerBetween * (imagesNumber)) + ea + ") - " + String(0) + ea + ") / " + String(imagesNumber) + ")",
        }
      }))
    }

    num = 0;
    for (let link of imageTargets) {
      targetNumberArr = imageTongChildren.map((dom, index) => { return { height: dom.getBoundingClientRect().height, index } });
      targetNumberArr.sort((a, b) => { return a.height - b.height });
      targetNumber = targetNumberArr[0].index;

      imageNode = createNode({
        mode: "img",
        mother: imageTongChildren[targetNumber],
        attribute: {
          src: link,
        },
        style: {
          display: "inline-block",
          verticalAlign: "top",
          position: "relative",
          width: withOut(0, ea),
          marginBottom: String(imageInnerBetween) + ea,
        }
      });
      num++;
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantWhiteCard = function (aspid) {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson } = GeneralJs;
  return async function (e) {
    try {
      const zIndex = 4;
      const aspirant = instance.aspirants.find((d) => { return d.aspid === aspid });
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteMaker;
      let innerMarginTop;
      let basePaddingTop;

      margin = 30;
      titleHeight = 50;
      innerMargin = 24;
      innerMarginTop = 20;
      overlap = 12;
      basePaddingTop = 12;

      titleTextTop = isMac() ? 2 : 2;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 0;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      whiteMaker = (reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin + titleHeight) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth + (innerMargin * 2), ea),
            height: withOut(0 + (margin * 2) + titleHeight + belowHeight + (innerMargin + basePaddingTop), ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderBottomLeftRadius: String(5) + "px",
            borderBottomRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
            padding: String(innerMargin) + ea,
            paddingTop: String(basePaddingTop) + ea,
          },
          child: {
            style: {
              display: "block",
              position: "relative",
              width: withOut(0, ea),
              height: withOut(0, ea),
              overflow: "scroll",
              border: "1px solid " + colorChip.gray3,
              borderRadius: String(5) + "px",
              boxSizing: "border-box",
              padding: String(innerMargin) + ea,
              paddingTop: String(innerMarginTop) + ea,
            },
            child: {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0, ea),
                flexDirection: "column",
              }
            }
          }
        });
  
        titleWhite = createNode({
          mother: totalContents,
          class: [ whiteCardClassName ],
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: String(titleHeight) + ea,
            background: colorChip.white,
            zIndex: String(zIndex),
            borderTopLeftRadius: String(5) + "px",
            borderTopRightRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "end",
          },
          child: {
            style: {
              display: "flex",
              position: "relative",
              flexDirection: "row",
              alignItems: "end",
              justifyContent: "start",
              width: withOut(innerMargin * 2, ea),
            },
            children: [
              {
                attribute: { designer: aspirant.designer, phone: aspirant.phone.replace(/[^0-9]/gi, '') },
                event: {
                  click: function (e) {
                    const designer = this.getAttribute("designer");
                    const phone = this.getAttribute("phone");
                    const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
                    if (window.confirm(designer + " 실장님께 전화를 걸까요?")) {
                      ajaxJson({
                        who: cookies.homeliaisonConsoleLoginedEmail,
                        phone: phone
                      }, BACKHOST + "/callTo").catch((err) => { console.log(err); });
                    }
                  }
                },
                text: aspirant.designer,
                style: {
                  position: "relative",
                  top: String(titleTextTop) + ea,
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(titleWeight),
                  color: colorChip.black,
                  cursor: "pointer",
                }
              },
              {
                attribute: { aspid: aspid },
                event: {
                  click: async function (e) {
                    try {
                      const aspid = this.getAttribute("aspid");
                      await window.navigator.clipboard.writeText(aspid);
                      instance.mother.greenAlert("클립보드에 저장되었습니다!");
                    } catch (e) {
                      console.log(e);
                    }
                  },
                },
                text: aspirant.aspid,
                style: {
                  position: "relative",
                  top: String(fontTextTop) + ea,
                  fontSize: String(fontSize) + ea,
                  marginLeft: String(fontBetween) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                  cursor: "pointer",
                }
              },
            ]
          }
        });

        instance.aspirantWhiteContents(whitePrompt.firstChild.firstChild, aspid).catch((err) => { console.log(err); });
      }

      instance.whiteMaker = whiteMaker;

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteMaker(false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteMaker(true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.aspirantBase = async function () {
  const instance = this;
  const { ea, totalContents, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText, idNameAreaClassName, valueAreaClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson } = GeneralJs;
  const moveTargetClassName = "moveTarget";
  const menuPromptClassName = "menuPromptClassName";
  const importantCircleClassName = "importantCircleClassName";
  try {
    let totalMother;
    let grayArea, whiteArea;
    let totalPaddingTop;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameArea;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let thisTong;
    let columns;
    let values;
    let valueMaxWidth;
    let thisTargets;
    let hoverEvent, hoverOutEvent;
    let standards;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let columnsMenuEvent;
    let aspirantContentsLoad;
    let circleRight, circleTop;
    let contextIndent;
    let contextButtonOuterMargin;
    let contextButtonInnerMargin;
    let contextButtonWidth;
    let contextButtonHeight;
    let contextButtonSize;
    let contextButtonWeight;
    let contextButtonTextTop;
  
    totalPaddingTop = 38;
    columnAreaHeight = 32;
  
    fontSize = 14;
    fontWeight = 600;
    valueWeight = 500;
  
    idWidth = 96;
    nameWidth = 60;
  
    idNameAreaPaddingTop = 17;
    idNameHeight = 36;
  
    idNamePaddingBottom = 400;
    maxWidth = 8000;
    valueMaxWidth = 1000;
  
    valueColumnsAreaPaddingLeft = 20;

    menuPromptWidth = 90;
    menuPromptHeight = 32;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    contextIndent = 5;
    contextButtonOuterMargin = 8;
    contextButtonInnerMargin = 3;
    contextButtonWidth = 230;
    contextButtonHeight = 28;
    contextButtonSize = 12;
    contextButtonWeight = 700;
    contextButtonTextTop = isMac() ? -1 : 1;

    ({ standards, columns, values } = await this.aspirantDataRender(true));
  
    hoverEvent = () => {
      return function (e) {
        const aspid = this.getAttribute("aspid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "aspid", aspid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const aspid = this.getAttribute("aspid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "aspid", aspid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    columnsMenuEvent = (index) => {
      return async function (e) {
        try {
          e.preventDefault();
          const name = this.getAttribute("name");
          const index = Number(this.getAttribute("index"));
          const thisObject = columns[index];
          const zIndex = 4;
          let cancelBack, blackPrompt;
          let thisMenu;

          thisMenu = [
            {
              value: "내림차순",
              functionName: "sortEvent_down",
            },
            {
              value: "오름차순",
              functionName: "sortEvent_up",
            },
          ];

          if (Array.isArray(thisObject.menu)) {
            thisMenu = thisMenu.concat(thisObject.menu);
          }

          cancelBack = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            event: (e) => { removeByClass(menuPromptClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: "transparent",
              zIndex: String(zIndex),
            }
          });

          blackPrompt = createNode({
            mother: totalContents,
            class: [ menuPromptClassName ],
            style: {
              position: "fixed",
              top: String(e.y + menuVisual) + "px",
              left: String(e.x + menuVisual) + "px",
              width: String(menuPromptWidth) + ea,
              background: colorChip.white,
              animation: "fadeuplite 0.3s ease forwards",
              zIndex: String(zIndex),
            },
            children: thisMenu.map(({ value, functionName }) => {
              const functionOrderArr = functionName.split("_");
              const [ thisFunctionName ] = functionOrderArr;
              let thisArguments;
              if (functionOrderArr.length > 1) {
                thisArguments = functionOrderArr.slice(1).concat([ name, index ]);
              } else {
                thisArguments = [ name, index ];
              }
              return {
                event: {
                  selectstart: (e) => { e.preventDefault() },
                },
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(menuPromptWidth) + ea,
                  height: String(menuPromptHeight) + ea,
                  borderRadius: String(5) + "px",
                  background: colorChip.gradientGray,
                  marginBottom: String(menuBetween) + ea,
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  cursor: "pointer",
                },
                child: {
                  text: value,
                  event: {
                    selectstart: (e) => { e.preventDefault() },
                  },
                  style: {
                    position: "relative",
                    top: String(menuTextTop) + ea,
                    fontSize: String(menuSize) + ea,
                    fontWeight: String(menuWeight),
                    color: colorChip.white,
                  }
                }
              }
            })
          })

        } catch (e) {
          console.log(e);
        }
      }
    }

    totalMother = createNode({
      mother: totalContents,
      class: [ "totalMother" ],
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      }
    });
    this.totalMother = totalMother;

    aspirantContentsLoad = async (reload = false) => {
      try {

        if (reload) {
          ({ standards, columns, values } = await instance.aspirantDataRender(true));
        }

        cleanChildren(totalMother);

        createNode({
          mother: totalMother,
          style: {
            position: "absolute",
            top: String(0),
            left: String(0),
            width: String(this.grayBarWidth) + ea,
            height: withOut(0, ea),
            background: colorChip.gray0,
          }
        });
        createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(totalPaddingTop) + ea,
            height: String(columnAreaHeight) + ea,
            borderBottom: "1px dashed " + colorChip.gray3,
          },
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                height: withOut(0, ea),
                justifyContent: "center",
                alignItems: "start",
                verticalAlign: "top",
                width: String(this.grayBarWidth) + ea,
              },
              children: standards.columns.map(({ title, width }) => {
                return {
                  style: {
                    display: "inline-flex",
                    flexDirection: "row",
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "start",
                    width: String(width) + ea,
                    cursor: "pointer",
                  },
                  child: {
                    text: title,
                    style: {
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(fontWeight),
                      color: colorChip.green,
                    }
                  }
                }
              })
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                height: withOut(0, ea),
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
              child: {
                class: [ moveTargetClassName ],
                style: {
                  display: "flex",
                  position: "relative",
                  width: String(maxWidth) + ea,
                  height: withOut(0, ea),
                  flexDirection: "row",
                  alignItems: "start",
                  justifyContent: "start",
                  paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
                },
                children: columns.map(({ title, width, name }, index) => {
                  return {
                    attribute: {
                      name: name,
                      index: String(index),
                    },
                    event: {
                      selectstart: (e) => { e.preventDefault() },
                      click: columnsMenuEvent(index),
                      contextmenu: columnsMenuEvent(index),
                    },
                    style: {
                      display: "inline-flex",
                      flexDirection: "row",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "start",
                      width: String(width) + ea,
                      cursor: "pointer",
                    },
                    child: {
                      style: {
                        display: "inline-block",
                        width: String(90) + '%',
                        position: "relative",
                        overflow: "hidden",
                        textAlign: "center",
                      },
                      child: {
                        style: {
                          display: "flex",
                          width: String(valueMaxWidth) + ea,
                          position: "relative",
                          left: withOut(50, valueMaxWidth / 2, ea),
                          textAlign: "center",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        child: {
                          text: title,
                          style: {
                            fontSize: String(fontSize) + ea,
                            fontWeight: String(fontWeight),
                            color: colorChip.green,
                          }
                        }
                      }
                    }
                  }
                })
              }
            }
          ]
        });
      
        [ idNameArea, valueArea ] = createNode({
          mother: totalMother,
          style: {
            display: "block",
            position: "relative",
            paddingTop: String(idNameAreaPaddingTop) + ea,
            height: withOut(totalPaddingTop + columnAreaHeight + idNameAreaPaddingTop, ea),
            width: withOut(0, ea),
            overflow: "scroll",
          },
          children: [
            {
              class: [ idNameAreaClassName ],
              style: {
                display: "inline-flex",
                verticalAlign: "top",
                flexDirection: "column",
                position: "relative",
                width: String(this.grayBarWidth) + ea,
                paddingBottom: String(idNamePaddingBottom) + ea,
              }
            },
            {
              class: [ valueAreaClassName ],
              style: {
                display: "inline-block",
                position: "relative",
                verticalAlign: "top",
                width: withOut(this.grayBarWidth, ea),
                overflow: "hidden",
              },
            }
          ]
        }).children;
      
        for (let aspirant of instance.aspirants) {
      
          createNode({
            mother: idNameArea,
            attribute: { aspid: aspirant.aspid, lastfilter: "none" },
            event: {
              click: instance.aspirantWhiteCard(aspirant.aspid),
            },
            class: [ standardCaseClassName ],
            style: {
              display: "flex",
              flexDirection: "row",
              position: "relative",
              height: String(idNameHeight) + ea,
              justifyContent: "center",
              alignItems: "start",
              cursor: "pointer",
            },
            children: standards.values[aspirant.aspid].map(({ value, name }, index) => {
              return {
                style: {
                  display: "inline-flex",
                  flexDirection: "row",
                  position: "relative",
                  justifyContent: "center",
                  alignItems: "start",
                  width: String(standards.columns[index].width) + ea,
                },
                child: {
                  class: [ valueTargetClassName ],
                  attribute: { name },
                  text: value,
                  style: {
                    position: "relative",
                    transition: "all 0.3s ease",
                    fontSize: String(fontSize) + ea,
                    fontWeight: String(fontWeight),
                    color: colorChip.black,
                  },
                  next: {
                    class: [ importantCircleClassName ],
                    mode: "svg",
                    source: instance.mother.returnCircle("", colorChip.red),
                    style: {
                      display: "none",
                      position: "absolute",
                      transform: "scale(0.4)",
                      transformOrigin: "100% 0%",
                      right: String(index === 0 ? 0 : circleRight) + ea,
                      top: String(circleTop) + ea,
                      zIndex: String(0),
                    }
                  }
                }
              }
            })
          });
      
          thisTong = createNode({
            mother: valueArea,
            attribute: { aspid: aspirant.aspid, lastfilter: "none" },
            class: [ moveTargetClassName, valueCaseClassName, aspirant.aspid ],
            event: {
              mouseenter: hoverEvent(),
              mouseleave: hoverOutEvent(),
            },
            style: {
              display: "flex",
              position: "relative",
              width: String(maxWidth) + ea,
              height: String(idNameHeight) + ea,
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
              cursor: "pointer",
            }
          })
    
          for (let i = 0; i < columns.length; i++) {
            createNode({
              mother: thisTong,
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(columns[i].width) + ea,
              },
              child: {
                style: {
                  display: "inline-block",
                  width: String(90) + '%',
                  position: "relative",
                  overflow: "hidden",
                  textAlign: "center",
                },
                child: {
                  style: {
                    display: "flex",
                    width: String(valueMaxWidth) + ea,
                    position: "relative",
                    left: withOut(50, valueMaxWidth / 2, ea),
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    attribute: {
                      aspid: aspirant.aspid,
                      name: values[aspirant.aspid][i].name,
                    },
                    class: [ valueTargetClassName ],
                    text: String(values[aspirant.aspid][i].value),
                    style: {
                      position: "relative",
                      transition: "all 0.1s ease",
                      fontSize: String(fontSize) + ea,
                      fontWeight: String(valueWeight),
                      color: (new RegExp(asyncProcessText, "gi")).test(values[aspirant.aspid][i].value) ? colorChip.gray3 : colorChip.black,
                    }
                  }
                }
              }
            });
          }
    
        }
    
        await this.aspirantColorSync();

      } catch (e) {
        console.log(e);
      }
    }

    await aspirantContentsLoad(false);
    this.aspirantContentsLoad = aspirantContentsLoad;

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalSearchEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { ajaxJson, setQueue } = GeneralJs;
  try {
    this.searchInput.addEventListener("keypress", async function (e) {
      try {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            instance.totalFather.classList.remove("fadein");
            instance.totalFather.classList.add("fadeout");
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
            setQueue(() => {
              instance.totalFather.remove();
              instance.totalFather = null;
            }, 501);
          }
          if (document.querySelector('.' + whiteBaseClassName) !== null) {
            const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
            cancelBack.style.animation = "justfadeout 0.3s ease forwards";
            if (w0 !== undefined) {
              w0.style.animation = "fadedownlite 0.3s ease forwards";
            }
            if (w1 !== undefined) {
              w1.style.animation = "fadedownlite 0.3s ease forwards";
            }
            setQueue(() => {
              cancelBack.click();
            }, 350);
          }

          const value = this.value.trim().replace(/\&\=\+\\\//gi, '');
          const designers = await ajaxJson({ noFlat: true, query: value }, BACKHOST + "/searchDesigners", { equal: true });
          const histories = await ajaxJson({
            method: "designer",
            property: [ "manager", "important" ],
            idArr: designers.map((d) => { return d.desid }),
          }, BACKHOST + "/getHistoryProperty", { equal: true });

          for (let designer of designers) {
            designer.manager = histories[designer.desid].manager;
            designer.important = histories[designer.desid].important;
          }

          instance.designers = designers;
          await instance.aspirantContentsLoad(true);
          
          setQueue(async () => {
            try {
              if (instance.designers.length === 1) {
                const tempFunc = instance.aspirantWhiteCard(instance.designers[0].desid);
                await tempFunc({});
              }
            } catch (e) {
              console.log(e);
            }
          }, 350);

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalDetailSearchEvent = async function () {
  const instance = this;
  const { ea, totalContents, totalMother, belowHeight } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, setQueue } = GeneralJs;
  const detailSearchClassName = "detailSearchClassName";
  try {
    this.searchInput.addEventListener("contextmenu", async function (e) {
      e.preventDefault();
      try {
        const zIndex = 4;
        let cancelBack, whiteBase;
        let margin;
        let titleSize;
        let titleWeight;
        let fontSize;
        let fontWeight;

        margin = 30;

        titleSize = 21;
        titleWeight = 800;

        fontSize = 14;
        fontWeight = 400;

        cancelBack = createNode({
          mother: totalMother,
          class: [ detailSearchClassName ],
          event: {
            click: (e) => {
              removeByClass(detailSearchClassName);
            },
          },
          style: {
            position: "fixed",
            top: String(0),
            left: String(0),
            width: withOut(0, ea),
            height: withOut(0, ea),
            background: colorChip.black,
            opacity: String(0.3),
            zIndex: String(zIndex),
          }
        });

        whiteBase = createNode({
          mother: totalMother,
          class: [ detailSearchClassName ],
          style: {
            position: "fixed",
            top: String(margin) + ea,
            left: String(margin) + ea,
            width: withOut(margin * 2, ea),
            height: withOut((margin * 2) + belowHeight, ea),
            zIndex: String(zIndex),
            background: colorChip.white,
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            borderRadius: String(5) + "px",
          }
        });



      } catch (e) {
        console.log(e);
      }
    })
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalProcessDetailEvent = async function (proid, desid) {
  const instance = this;
  const { ea, totalContents, totalMother, belowHeight, grayBarWidth, processDetailEventClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, ajaxJson, setQueue } = GeneralJs;
  try {
    const zIndex = 4;
    let cancelBack, whiteBase;
    let margin;
    let titleSize;
    let titleWeight;
    let fontSize;
    let fontWeight;

    margin = 30;

    titleSize = 21;
    titleWeight = 800;

    fontSize = 14;
    fontWeight = 400;

    cancelBack = createNode({
      mother: totalMother,
      class: [ processDetailEventClassName ],
      attribute: {
        proid,
        desid,
      },
      event: {
        click: (e) => {
          removeByClass(processDetailEventClassName);
        },
      },
      style: {
        position: "fixed",
        top: String(0),
        left: String(grayBarWidth) + ea,
        width: withOut(grayBarWidth, ea),
        height: withOut(0, ea),
        background: colorChip.black,
        opacity: String(0.3),
        zIndex: String(zIndex),
      }
    });

    whiteBase = createNode({
      mother: totalMother,
      class: [ processDetailEventClassName ],
      attribute: {
        proid,
        desid,
      },
      style: {
        position: "fixed",
        top: String(margin) + ea,
        left: String(grayBarWidth + margin) + ea,
        width: withOut((margin * 2) + grayBarWidth, ea),
        height: withOut((margin * 2) + belowHeight, ea),
        zIndex: String(zIndex),
        background: colorChip.white,
        animation: "fadeuplite 0.3s ease forwards",
        boxShadow: "0 2px 10px -6px " + colorChip.shadow,
        borderRadius: String(5) + "px",
        overflow: "hidden",
      }
    });

    createNode({
      mother: whiteBase,
      mode: "iframe",
      attribute: {
        src: BACKHOST + "/process?proid=" + proid + "&entire=true&dataonly=true",
      },
      style: {
        display: "display",
        position: "relative",
        top: String(0),
        left: String(0),
        width: withOut(0, ea),
        height: withOut(0, ea),
        border: String(0),
        outline: String(0),
        borderRadius: String(5) + "px",
      }
    })

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalMessageEvent = async function () {
  const instance = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName, processDetailEventClassName } = this;
  const { findByAttribute, ajaxJson, removeByClass } = GeneralJs;
  try {
    window.addEventListener("message", async function (e) {
      try {
        const data = JSON.parse(e.data);
        if (typeof data === "object" && data !== null) {
          if (data.type === "whiteConverting") {
            if (document.querySelector('.' + whiteBaseClassName) !== null) {
              if (findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode) !== null) {
                findByAttribute([ ...document.querySelectorAll('.' + titleButtonsClassName) ], "mode", data.mode).click();
              }
            }
          } else if (data.type === "checklistUpdate") {
            let designers;
            let histories;

            ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true }).then((de) => {
              designers = de;
              return ajaxJson({
                method: "designer",
                property: [ "manager", "important" ],
                idArr: designers.map((d) => { return d.desid }),
              }, BACKHOST + "/getHistoryProperty", { equal: true });
            }).then((h) => {
              histories = h;
              for (let designer of designers) {
                designer.manager = histories[designer.desid].manager;
                designer.important = histories[designer.desid].important;
              }
              instance.designers = designers;
              return instance.aspirantContentsLoad(true);
            }).catch((err) => {
              console.log(err);
            });

          } else if (data.type === "processDetail") {
            removeByClass(whiteCardClassName);
            await instance.normalProcessDetailEvent(data.proid, data.desid);
          } else if (data.type === "returnToPast") {
            const tempFunction = instance.aspirantWhiteCard(document.querySelectorAll('.' + processDetailEventClassName)[1].getAttribute("desid"));
            removeByClass(processDetailEventClassName);
            await tempFunction({});
          }
        }
      } catch {}
    })
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalExtractEvent = async function () {
  const instance = this;
  const { ajaxJson, blankHref } = GeneralJs;
  try {
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
    this.mother.belowButtons.sub.extractIcon.addEventListener("click", async function (e) {
      try {
        if (instance.normalMatrix === null) {
          window.alert("잠시 기다렸다가 다시 시도해주세요!");
        } else {
          const today = new Date();
          const data = await instance.aspirantDataRender(false);
          let thisName;
          let thisObject;
          let matrix;
          let tempArr;
          let thisDesigner;

          for (let desid in data.values) {
            for (let obj of data.values[desid]) {
              thisName = obj.name;
              thisObject = instance.normalMatrix[desid].find((obj) => { return obj.name === thisName });
              if (thisObject !== undefined) {
                obj.value = thisObject.value;
              }
            }
          }

          matrix = [];
          tempArr = [
            "아이디",
            "이름",
            // -------------------------------
            // add
            "이메일",
            "계좌번호",
            "사업자 분류",
            "사업자 등록번호",
            // -------------------------------
          ];
          for (let obj of data.columns) {
            tempArr.push(obj.title);
          }
          matrix.push(tempArr);

          for (let desid in data.values) {

            thisDesigner = instance.designers.find((d) => { return d.desid === desid });

            tempArr = [];
            tempArr.push(desid);
            tempArr.push(thisDesigner.designer);

            // -------------------------------
            // add
            tempArr.push(thisDesigner.information.email);
            tempArr.push(thisDesigner.information.business.account.length > 0 ? thisDesigner.information.business.account[0].bankName + " " + thisDesigner.information.business.account[0].accountNumber : "");
            tempArr.push(thisDesigner.information.business.businessInfo.classification);
            tempArr.push(thisDesigner.information.business.businessInfo.businessNumber);
            // -------------------------------

            for (let obj of data.columns) {
              thisObject = data.values[desid].find((o) => { return o.name === obj.name });
              tempArr.push(thisObject.value);
            }
            matrix.push(tempArr);
          }

          instance.mother.greenAlert("시트 추출이 완료되면 자동으로 열립니다!");
          ajaxJson({
            values: matrix,
            newMake: true,
            parentId: parentId,
            sheetName: "fromDB_designer_" + String(today.getFullYear()) + instance.mother.todayMaker()
          }, BACKHOST + "/sendSheets", { equal: true }).then((result) => {
            blankHref(result.link);
          }).catch((err) => {
            console.log(err);
          })

        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalReportWhite = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition } = GeneralJs;
  const vaildValue = function (target) {
    const today = new Date();
    let valueArr0, valueArr1, valueArr2;
    target.style.color = GeneralJs.colorChip.black;
    if (!/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(target.value)) {
      valueArr0 = target.value.split(" ~ ");
      valueArr1 = valueArr0[0].split("-");
      if (valueArr0[1] !== undefined) {
        valueArr2 = valueArr0[1].split("-");
        if (valueArr1.length === 3 && valueArr2.length === 3) {
          target.value = String(valueArr1[0]) + '-' + zeroAddition(valueArr1[1]) + '-' + zeroAddition(valueArr1[2]) + ' ~ ' + String(valueArr2[0]) + '-' + zeroAddition(valueArr2[1]) + '-' + zeroAddition(valueArr2[2]);
        } else {
          target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
        }
      } else {
        target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
      }
    }
    target.value = (/[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9] \~ [0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.exec(target.value))[0];

    valueArr0 = target.value.split(" ~ ");
    valueArr1 = valueArr0[0].split("-");
    valueArr2 = valueArr0[1].split("-");
    if ((Number(valueArr1[0]) * 12) + Number(valueArr1[1].replace(/^0/, '')) > (Number(valueArr2[0]) * 12) + Number(valueArr2[1].replace(/^0/, ''))) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr1[1].replace(/^0/, '')) > 12 || Number(valueArr1[1].replace(/^0/, '')) < 1) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr2[1].replace(/^0/, '')) > 12 || Number(valueArr2[1].replace(/^0/, '')) < 1) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }
    if (Number(valueArr1[0]) < 19) {
      target.value = GeneralJs.stacks.reportBoxStartDayInputValue;
    }

    GeneralJs.stacks.reportBoxStartDayInputValue = target.value;
  }
  return async function (e) {
    try {
      const zIndex = 4;
      let cancelBack, whitePrompt;
      let titleWhite;
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let iframeMaker;
      let base, scrollBox;
      let titleArea;
      let basePaddingTop;
      let basePaddingBottom;
      let divideNumber;
      let lineBetween;
      let linePaddingLeft;
      let wordingSize;
      let linePaddingTop;
      let linePaddingBottom;
      let designerSize;
      let desidSize;
      let subTitleLeft;
      let subTitleBottom;
      let data;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let style;
      let startPaddingTop;
      let todayRange, dateInput;
      let todayString;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;

      today = new Date();
      ago = 30;
      agoDate = new Date();
      agoDate.setDate(agoDate.getDate() - ago);

      margin = 30;
      titleHeight = 58;
      innerMargin = 24;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 0;
      titleSize = 21;
      titleWeight = 800;

      fontTextTop = isMac() ? 1 : 0;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      basePaddingTop = 10;
      basePaddingBottom = 6;
      divideNumber = 4;
      lineBetween = 4;
      linePaddingLeft = 16;
      wordingSize = 14;
      linePaddingTop = isMac() ? 10 : 12;
      linePaddingBottom = isMac() ? 11 : 11;
      designerSize = 16;
      desidSize = 11;
      subTitleLeft = 1;
      subTitleBottom = isMac() ? 6 : 4;
      startPaddingTop = 10;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 20;
      inputWeight = 500;

      subTodaySize = 13;
      subTodayWeight = 200;

      dataLoad = () => {};

      whiteReportMaker = (fromDate, toDate, reload = false) => {

        if (!reload) {
          cancelBack = createNode({
            mother: totalContents,
            class: [ "justfadein", whiteCardClassName ],
            event: (e) => { removeByClass(whiteCardClassName) },
            style: {
              position: "fixed",
              top: String(0),
              left: String(grayBarWidth) + ea,
              width: withOut(grayBarWidth, ea),
              height: withOut(belowHeight, ea),
              background: colorChip.black,
            }
          });
        } 
  
        whitePrompt = createNode({
          mother: totalContents,
          class: [ whiteCardClassName, whiteBaseClassName ],
          style: {
            position: "fixed",
            top: String(0 + margin) + ea,
            left: String(grayBarWidth + margin) + ea,
            width: withOut((margin * 2) + grayBarWidth, ea),
            height: withOut(0 + (margin * 2) + belowHeight, ea),
            background: colorChip.white,
            zIndex: String(zIndex),
            borderRadius: String(5) + "px",
            animation: "fadeuplite 0.3s ease forwards",
            boxShadow: "0 2px 10px -6px " + colorChip.shadow,
            overflow: "hidden",
          },
          children: [
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: String(titleHeight) + ea,
                borderBottom: "1px dashed " + colorChip.gray3,
              }
            },
            {
              style: {
                display: "block",
                position: "relative",
                marginLeft: String(innerMargin) + ea,
                width: withOut(innerMargin * 2, ea),
                height: withOut(titleHeight + startPaddingTop, ea),
                paddingTop: String(startPaddingTop) + ea,
                overflow: "scroll",
              },
            }
          ]
        });

        [ titleArea, scrollBox ] = Array.from(whitePrompt.children);

        todayRange = dateToString(fromDate).slice(2) + " ~ " + dateToString(toDate).slice(2);
        todayString = dateToString(new Date());

        dateInput = createNode({
          mode: "input",
          attribute: {
            type: "text",
          },
          event: {
            focus: function (e) {
              this.style.color = colorChip.green;
              GeneralJs.stacks.reportBoxStartDayInputValue = this.value;
            },
            blur: function (e) {
              vaildValue(this);
            },
            keyup: function (e) {
              if (e.key === "Enter") {
                vaildValue(this);
                const dateArr = this.value.split(" ~ ");
                const startDay = "20" + dateArr[0];
                const endDay = "20" + dateArr[1];

                this.blur();

                cleanChildren(scrollBox);

                loading = instance.mother.returnLoadingIcon();
                style = {
                  position: "absolute",
                  width: String(loadingWidth) + ea,
                  height: String(loadingWidth) + ea,
                  top: withOut(50, loadingWidth / 2, ea),
                  left: withOut(50, loadingWidth / 2, ea),
                }
                for (let i in style) {
                  loading.style[i] = style[i];
                }
                whitePrompt.appendChild(loading);

                ajaxJson({
                  mode: "designer",
                  start: stringToDate(startDay),
                  end: stringToDate(endDay)
                }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
                  console.log(err);
                });
              }
            }
          },
          mother: titleArea,
          style: {
            position: "absolute",
            left: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            width: String(inputWidth) + ea,
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            border: String(0) + ea,
            outline: String(0) + ea,
            color: colorChip.black,
            fontFamily: "graphik",
          }
        });
        dateInput.value = todayRange;

        createNode({
          mother: titleArea,
          text: "today : " + todayString,
          style: {
            position: "absolute",
            fontSize: String(subTodaySize) + ea,
            fontWeight: String(subTodayWeight) + ea,
            right: String(0) + ea,
            bottom: String(startPaddingTop) + ea,
            color: colorChip.green,
            fontFamily: "graphik",
          }
        });

        loading = instance.mother.returnLoadingIcon();
        style = {
          position: "absolute",
          width: String(loadingWidth) + ea,
          height: String(loadingWidth) + ea,
          top: withOut(50, loadingWidth / 2, ea),
          left: withOut(50, loadingWidth / 2, ea),
        }
        for (let i in style) {
          loading.style[i] = style[i];
        }
        whitePrompt.appendChild(loading);

        dataLoad = (loading) => {
          return (data) => {
            loading.remove();
            cleanChildren(scrollBox);
  
            for (let designer of data.designers) {
        
              designer.proposal = designer.proposal.filter((obj) => { return obj.amount !== 0 });
              designer.process = designer.process.filter((obj) => { return obj.amount !== 0 });
              designer.first = designer.first.filter((obj) => { return obj.amount !== 0 });
              designer.remain = designer.remain.filter((obj) => { return obj.amount !== 0 });
          
              base = createNode({
                mother: scrollBox,
                style: {
                  display: "block",
                  position: "relative",
                  width: String(100) + '%',
                  paddingTop: String(basePaddingTop) + ea,
                  paddingBottom: String(basePaddingBottom) + ea,
                }
              });
          
              createNode({
                mother: base,
                class: [ "hoverDefault_lite" ],
                attribute: { desid: designer.desid },
                event: {
                  click: function (e) {
                    blankHref(FRONTHOST + "/designer/report.php?desid=" + this.getAttribute("desid"));
                  }
                },
                text: `${designer.designer}&nbsp;&nbsp;<b%${designer.desid}%b>`,
                style: {
                  display: "inline-block",
                  fontSize: String(designerSize) + ea,
                  fontWeight: String(600),
                  color: colorChip.black,
                  marginLeft: String(subTitleLeft) + ea,
                  marginBottom: String(subTitleBottom) + ea,
                },
                bold: {
                  fontSize: String(desidSize) + ea,
                  fontWeight: String(300),
                  color: colorChip.green
                }
              });
          
              tong = createNode({
                mother: base,
                style: {
                  display: "block",
                  borderRadius: String(5) + "px",
                  border: "1px solid " + colorChip.gray3,
                  boxSizing: "border-box",
                  width: String(100) + '%',
                }
              });
          
              for (let i = 0; i < divideNumber; i++) {
                area = createNode({
                  mother: tong,
                  style: {
                    display: "inline-block",
                    width: String(100 / divideNumber) + '%',
                    borderRight: i === divideNumber - 1 ? "" : "1px dashed " + colorChip.gray3,
                    verticalAlign: "top",
                    paddingTop: String(linePaddingTop) + ea,
                    paddingBottom: String(linePaddingBottom) + ea,
                    boxSizing: "border-box",
                  }
                });
                if (i === 0) {
          
                  createNode({
                    mother: area,
                    text: `<b%제안 횟수%b> : ${String(designer.proposal.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 누계%b> : ${autoComma(designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%제안액 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평단가 평균%b> : ${designer.proposal.length === 0 ? String(0) : autoComma(Math.floor((designer.proposal.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.proposal.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else if (i === 1) {
          
                  createNode({
                    mother: area,
                    text: `<b%계약 횟수%b> : ${String(designer.process.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 누계%b> : ${autoComma(designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평균%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%디자인비 평단가%b> : ${designer.process.length === 0 ? String(0) : autoComma(Math.floor((designer.process.reduce((acc, curr) => { return acc + curr.per }, 0) / designer.process.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
        
                } else if (i === 2) {
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 횟수%b> : ${String(designer.first.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 누계%b> : ${autoComma(designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%선금 정산 평균%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.first.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.first.length === 0 ? String(0) : autoComma(Math.floor((designer.first.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.first.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                } else {
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 횟수%b> : ${String(designer.remain.length)}회`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 누계%b> : ${autoComma(designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0))}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%잔금 정산 평균%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.amount }, 0) / designer.remain.length) / 1000) * 1000)}원`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      marginBottom: String(lineBetween) + ea,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                  createNode({
                    mother: area,
                    text: `<b%평균 평수%b> : ${designer.remain.length === 0 ? String(0) : autoComma(Math.floor((designer.remain.reduce((acc, curr) => { return acc + curr.pyeong }, 0) / designer.remain.length) / 1) * 1)}평`,
                    style: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(300),
                      color: colorChip.black,
                      paddingLeft: String(linePaddingLeft) + ea,
                    },
                    bold: {
                      fontSize: String(wordingSize) + ea,
                      fontWeight: String(600),
                      color: colorChip.black,
                    }
                  });
          
                }
              }
          
            }
          }
        }

        ajaxJson({
          mode: "designer",
          start: fromDate,
          end: toDate
        }, BACKHOST + "/getProjectReport", { equal: true }).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(agoDate, today, false);
      } else {
        const [ cancelBack, w0, w1 ] = Array.from(document.querySelectorAll('.' + whiteCardClassName));
        if (w0 !== undefined) {
          w0.style.animation = "fadedownlite 0.3s ease forwards";
        }
        if (w1 !== undefined) {
          w1.style.animation = "fadedownlite 0.3s ease forwards";
        }
        setQueue(() => {
          if (w0 !== undefined) {
            w0.remove();
          }
          if (w1 !== undefined) {
            w1.remove();
          }
          setQueue(() => {
            whiteReportMaker(agoDate, today, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.normalReportEvent = async function () {
  const instance = this;
  const { ajaxJson } = GeneralJs;
  try {
    this.mother.belowButtons.square.reportIcon.addEventListener("click", instance.normalReportWhite());
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.aspirantView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, returnGet } = GeneralJs;
    let loading;
    let aspirants;

    loading = await this.mother.loadingRun();
    aspirants = await ajaxJson({ noFlat: true, whereQuery: {} }, "/getAspirants", { equal: true });

    this.aspirants = aspirants;
    this.normalMatrix = null;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.whiteCardMode = "checklist";
    this.asyncProcessText = "로드중..";

    await this.aspirantBase();
    // await this.normalSearchEvent();
    // await this.normalDetailSearchEvent();
    // await this.normalMessageEvent();
    // await this.normalExtractEvent();
    // await this.normalReportEvent();
    // this.communicationRender();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
