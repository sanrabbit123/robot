DesignerJs.prototype.normalDataRender = async function (firstLoad = true) {
  const instance = this;
  const { ea, totalContents, designers, valueTargetClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    const calcMonthDelta = (from, to) => {
      return ((to.getFullYear() * 12) + to.getMonth() + 1) - ((from.getFullYear() * 12) + from.getMonth() + 1) + 1;
    }
    const now = new Date();
    const past = new Date(2019, 0, 1);
    const yearsAgo = new Date();
    const agoDelta = 6;
    let columns;
    let values;
    let timeDelta;
    let year, month;
    let filteredProjectsProposal;
    let filteredProjectsContract;
    let thisTarget;
    let thisValueDoms;
    let yearDelta;
    let monthDelta;
    let tempDate;
    let tempString;
    let thisYear, from, to;
    let filteredFilteredProjectsProposal;
    let filteredFilteredProjectsContract;
    let thisDate;
    let standards;

    yearsAgo.setMonth(yearsAgo.getMonth() - agoDelta);
    yearDelta = now.getFullYear() - past.getFullYear() + 1
    monthDelta = calcMonthDelta(yearsAgo, now);

    standards = {
      columns: [
        {
          title: "아이디",
          width: 96,
          name: "desid",
        },
        {
          title: "성함",
          width: 60,
          name: "designer",
        },
      ],
      values: {},
    }

    columns = [
      {
        title: "담당자",
        width: 80,
        name: "manger",
      },
      {
        title: "계약 상태",
        width: 100,
        name: "status",
        colorStandard: true,
        colorMap: [
          {
            value: "협약 완료",
            color: colorChip.black,
          },
          {
            value: "협약 휴직",
            color: colorChip.deactive,
          },
          {
            value: "협약 해지",
            color: colorChip.gray3,
          },
          {
            value: "신청 대기",
            color: colorChip.red,
          },
          {
            value: "컨택중",
            color: colorChip.deactive,
          },
        ]
      },
      {
        title: "계약일",
        width: 100,
        name: "contractDate",
      },
      {
        title: "계약 유지",
        width: 100,
        name: "contractDuring",
      },
      {
        title: "적용 경력",
        width: 100,
        name: "career",
      },
      {
        title: "주소",
        width: 400,
        name: "address",
      },
      {
        title: "유효 범위",
        width: 100,
        name: "range",
      },
      {
        title: "한계 범위",
        width: 100,
        name: "expenses",
      },
      {
        title: "홈퍼니싱",
        width: 100,
        name: "homefurnishing",
      },
      {
        title: "홈스타일링",
        width: 100,
        name: "homestyling",
      },
      {
        title: "토탈 스타일링",
        width: 100,
        name: "totalstyling",
      },
      {
        title: "설계 변경",
        width: 100,
        name: "extrastyling",
      },
      {
        title: "프리미엄",
        width: 100,
        name: "premium",
      },
      {
        title: "부분 공간",
        width: 100,
        name: "partial",
      },
      {
        title: "온라인",
        width: 100,
        name: "online",
      },
      {
        title: "거주중",
        width: 100,
        name: "living",
      },
      {
        title: "총 추천수",
        width: 100,
        name: "proposalNumber",
      },
      {
        title: "총 진행수",
        width: 100,
        name: "contractNumber",
      },
      {
        title: "진행율",
        width: 100,
        name: "contractPercentage",
      },
      {
        title: "총 정산액",
        width: 120,
        name: "totalAmount",
      },
    ];

    for (let i = 0; i < yearDelta; i++) {
      columns.push({ title: String(now.getFullYear() - i) + " " + "추천수", width: 120, name: "proposalNumberY" + String(i) });
      columns.push({ title: String(now.getFullYear() - i) + " " + "진행수", width: 120, name: "contractNumberY" + String(i) });
      columns.push({ title: String(now.getFullYear() - i) + " " + "진행율", width: 120, name: "contractPercentageY" + String(i) });
      columns.push({ title: String(now.getFullYear() - i) + " " + "총 정산액", width: 120, name: "totalAmountY" + String(i) });
    }

    for (let i = 0; i < monthDelta; i++) {
      tempDate = new Date();
      tempDate.setMonth(tempDate.getMonth() - i);
      tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
      columns.push({ title: tempString + " " + "추천수", width: 120, name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1) });
    }

    values = {};

    for (let designer of designers) {

      standards.values[designer.desid] = [
        {
          value: designer.desid,
          name: "desid",
        },
        {
          value: designer.designer,
          name: "designer",
        },
      ];

      values[designer.desid] = [
        {
          value: designer.manager,
          name: "manger",
        },
        {
          value: designer.information.contract.status,
          name: "status",
        },
        {
          value: dateToString(designer.information.contract.date),
          name: "contractDate",
        },
      ];

      timeDelta = calcMonthDelta(designer.information.contract.date, new Date());
      values[designer.desid].push({
        value: String(timeDelta) + "개월",
        name: "contractDuring",
      });

      [ year, month ] = designerCareer(designer);
      values[designer.desid].push({
        value: `${String(year)}년 ${String(month)}개월`,
        name: "career",
      });

      values[designer.desid].push({
        value: designer.information.address.length > 0 ? designer.information.address[0] : "",
        name: "address",
      });
      values[designer.desid].push({
        value: String(designer.analytics.region.range) + "km",
        name: "range",
      });
      values[designer.desid].push({
        value: String(designer.analytics.region.expenses) + "km",
        name: "expenses",
      });

      values[designer.desid].push({
        value: designer.analytics.project.matrix[0][1] === 1 ? "가능" : "불가능",
        name: "homefurnishing",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[1][1] === 1 ? "가능" : "불가능",
        name: "homestyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[2][1] === 1 ? "가능" : "불가능",
        name: "totalstyling",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix[3][1] === 1 ? "가능" : "불가능",
        name: "extrastyling",
      });

      values[designer.desid].push({
        value: designer.analytics.project.matrix.some((arr) => { return arr[2] === 1 }) ? "가능" : "불가능",
        name: "premium",
      });
      values[designer.desid].push({
        value: designer.analytics.project.matrix.some((arr) => { return arr[0] === 1 }) ? "가능" : "불가능",
        name: "partial",
      });

      values[designer.desid].push({
        value: designer.analytics.project.online ? "가능" : "불가능",
        name: "online",
      });
      values[designer.desid].push({
        value: designer.analytics.project.living ? "가능" : "불가능",
        name: "living",
      });

      values[designer.desid].push({
        value: asyncProcessText,
        name: "proposalNumber",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "contractNumber",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "contractPercentage",
      });
      values[designer.desid].push({
        value: asyncProcessText,
        name: "totalAmount",
      });

      for (let i = 0; i < yearDelta; i++) {
        values[designer.desid].push({ value: asyncProcessText, name: "proposalNumberY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "contractNumberY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "contractPercentageY" + String(i) });
        values[designer.desid].push({ value: asyncProcessText, name: "totalAmountY" + String(i) });
      }
  
      for (let i = 0; i < monthDelta; i++) {
        tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() - i);
        tempString = String(tempDate.getFullYear()).slice(2) + ". " + String(tempDate.getMonth() + 1) + "월";
        values[designer.desid].push({ value: asyncProcessText, name: "monthDelta" + String(tempDate.getFullYear()).slice(2) + String(tempDate.getMonth() + 1) });
      }

    }

    if (firstLoad) {

      ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getProjects", { equal: true }).then((projects) => {

        instance.projects = projects;

        for (let designer of designers) {
          thisValueDoms = [ ...document.querySelector('.' + designer.desid).querySelectorAll('.' + valueTargetClassName) ];
  
          filteredProjectsProposal = projects.filter((p) => {
            return p.proposal.detail.some((obj) => {
              return obj.desid === designer.desid
            });
          });
  
          filteredProjectsContract = projects.filter((p) => {
            return p.desid === designer.desid;
          });
  
          thisTarget = findByAttribute(thisValueDoms, "name", "proposalNumber");
          thisTarget.textContent = String(filteredProjectsProposal.length);
          thisTarget.style.color = colorChip.black;
  
          thisTarget = findByAttribute(thisValueDoms, "name", "contractNumber");
          thisTarget.textContent = String(filteredProjectsContract.length);
          thisTarget.style.color = colorChip.black;
  
          thisTarget = findByAttribute(thisValueDoms, "name", "contractPercentage");
          thisTarget.textContent = String(Math.round((filteredProjectsProposal.length === 0 ? 0 : (filteredProjectsContract.length / filteredProjectsProposal.length)) * 10000) / 100) + '%';
          thisTarget.style.color = colorChip.black;
  
          thisTarget = findByAttribute(thisValueDoms, "name", "totalAmount");
          thisTarget.textContent = autoComma(Math.floor(filteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원';
          thisTarget.style.color = colorChip.black;
  
          
          for (let i = 0; i < yearDelta; i++) {
  
            thisYear = (new Date()).getFullYear() - i;
            from = new Date(thisYear, 0, 1);
            to = new Date(thisYear + 1, 0, 1);
    
            filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
              return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
            });
    
            filteredFilteredProjectsContract = filteredProjectsContract.filter((p) => {
              return (p.process.contract.first.date.valueOf() >= from.valueOf() && p.process.contract.first.date.valueOf() < to.valueOf());
            });
    
            thisTarget = findByAttribute(thisValueDoms, "name", "proposalNumberY" + String(i));
            thisTarget.textContent = String(filteredFilteredProjectsProposal.length);
            thisTarget.style.color = colorChip.black;
    
            thisTarget = findByAttribute(thisValueDoms, "name", "contractNumberY" + String(i));
            thisTarget.textContent = String(filteredFilteredProjectsContract.length);
            thisTarget.style.color = colorChip.black;
    
            thisTarget = findByAttribute(thisValueDoms, "name", "contractPercentageY" + String(i));
            thisTarget.textContent = String(Math.round((filteredFilteredProjectsProposal.length === 0 ? 0 : (filteredFilteredProjectsContract.length / filteredFilteredProjectsProposal.length)) * 10000) / 100) + '%';
            thisTarget.style.color = colorChip.black;
    
            thisTarget = findByAttribute(thisValueDoms, "name", "totalAmountY" + String(i));
            thisTarget.textContent = autoComma(Math.floor(filteredFilteredProjectsContract.reduce((acc, curr) => { return acc + curr.process.calculation.payments.totalAmount; }, 0))) + '원';
            thisTarget.style.color = colorChip.black;
    
          }
    
          for (let i = 0; i < monthDelta; i++) {
            thisDate = new Date();
            thisDate.setMonth(thisDate.getMonth() - i);
            from = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
            to = new Date(thisDate.getFullYear(), thisDate.getMonth(), 1);
            to.setMonth(to.getMonth() + 1);
            filteredFilteredProjectsProposal = filteredProjectsProposal.filter((p) => {
              return (p.proposal.date.valueOf() >= from.valueOf() && p.proposal.date.valueOf() < to.valueOf());
            });
            thisTarget = findByAttribute(thisValueDoms, "name", "monthDelta" + String(thisDate.getFullYear()).slice(2) + String(thisDate.getMonth() + 1));
            thisTarget.textContent = String(filteredFilteredProjectsProposal.length);
            thisTarget.style.color = colorChip.black;
          }
  
        }
  
        return instance.normalColorSync();
  
      }).catch((err) => { console.log(err); });

    }

    return { standards, columns, values };

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalColorSync = async function () {
  const instance = this;
  const { ea, totalContents, designers, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, dateToString, designerCareer, ajaxJson, autoComma, findByAttribute } = GeneralJs;
  try {
    let columns;
    let colorStandard;
    let standardDoms, valueDoms;
    let thisValue;
    let thisColor;
    let thisTargets;

    ({ columns } = await this.normalDataRender(false));

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

DesignerJs.prototype.normalBase = async function () {
  const instance = this;
  const { ea, totalContents, designers, valueTargetClassName, valueCaseClassName, standardCaseClassName, asyncProcessText } = this;
  const { createNode, colorChip, withOut, findByAttribute } = GeneralJs;
  const moveTargetClassName = "moveTarget";
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
    let valueColumnsArea;
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
  
    hoverEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = colorChip.green;
        }
      }
    }

    hoverOutEvent = () => {
      return function (e) {
        const desid = this.getAttribute("desid");
        const opposite = findByAttribute(document.querySelectorAll('.' + standardCaseClassName), "desid", desid);
        thisTargets = [ ...this.querySelectorAll('.' + valueTargetClassName) ].concat([ ...opposite.querySelectorAll('.' + valueTargetClassName) ]);
        for (let dom of thisTargets) {
          dom.style.color = dom.getAttribute("color") !== null ? dom.getAttribute("color") : colorChip.black;
        }
      }
    }

    ({ standards, columns, values } = await this.normalDataRender());

    totalMother = createNode({
      mother: totalContents,
      style: {
        display: "block",
        position: "relative",
        width: withOut(0, ea),
        height: withOut(this.belowHeight, ea),
      },
      child: {
        style: {
          position: "absolute",
          top: String(0),
          left: String(0),
          width: String(this.grayBarWidth) + ea,
          height: withOut(0, ea),
          background: colorChip.gray0,
        }
      }
    });
  
    valueColumnsArea = createNode({
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
            }
          }
        }
      ]
    }).children[1].children[0];
  
  
    for (let i = 0; i < columns.length; i++) {

      createNode({
        mother: valueColumnsArea,
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
              text: columns[i].title,
              style: {
                fontSize: String(fontSize) + ea,
                fontWeight: String(fontWeight),
                color: colorChip.green,
              }
            }
          }
        }
      });
  
    }
  

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
  
    for (let designer of designers) {
  
      createNode({
        mother: idNameArea,
        attribute: { desid: designer.desid },
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
        children: standards.values[designer.desid].map(({ value, name }, index) => {
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
              }
            }
          }
        })
      });
  
      thisTong = createNode({
        mother: valueArea,
        attribute: { desid: designer.desid },
        class: [ moveTargetClassName, valueCaseClassName, designer.desid ],
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
                  desid: designer.desid,
                  name: values[designer.desid][i].name,
                },
                class: [ valueTargetClassName ],
                text: String(values[designer.desid][i].value),
                style: {
                  position: "relative",
                  transition: "all 0.1s ease",
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(valueWeight),
                  color: (new RegExp(asyncProcessText, "gi")).test(values[designer.desid][i].value) ? colorChip.gray3 : colorChip.black,
                }
              }
            }
          }
        });
      }
  
    }

    await this.normalColorSync();
  
  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalView = async function () {
  const instance = this;
  try {
    const { colorChip, ajaxJson, returnGet } = GeneralJs;
    let loading;
    let designers;
    let histories;

    loading = await this.mother.loadingRun();

    designers = await ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true });
    histories = await ajaxJson({
      method: "designer",
      property: "manager",
      idArr: designers.map((d) => { return d.desid }),
    }, BACKHOST + "/getHistoryProperty", { equal: true });

    for (let designer of designers) {
      designer.manager = histories[designer.desid];
    } 

    this.designers = designers;
    this.projects = null;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.asyncProcessText = "로드중..";

    await this.normalBase();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
