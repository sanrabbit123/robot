DesignerJs.prototype.reportContents = function (data, mother, loadingIcon, callback = function (doms) {}) {
  const instance = this;
  const zeroAddition = function (number) {
    if (number < 10) {
      return "0" + String(number);
    } else {
      return String(number);
    }
  }
  const stringToDateValue = function (str) {
    let tempArr0, tempArr1, tempArr2;
    let resultDate;
    tempArr0 = str.split(" ");
    tempArr1 = tempArr0[0].split("-");
    tempArr2 = tempArr0[1].split(":");
    resultDate = new Date(Number(tempArr1[0]), Number(tempArr1[1].replace(/^0/, '')) - 1, Number(tempArr1[2].replace(/^0/, '')), Number(tempArr2[0].replace(/^0/, '')), Number(tempArr2[1].replace(/^0/, '')), Number(tempArr2[2].replace(/^0/, '')));
    return resultDate.valueOf();
  }
  const stringToCareerNumber = function (str) {
    let tempArr0, tempArr1, tempArr2;
    tempArr0 = str.split("년 ");
    return (Number(tempArr0[0].replace(/[^0-9]/g, '').replace(/^0/, '')) * 12) + Number(tempArr0[1].replace(/[^0-9]/g, '').replace(/^0/, ''));
  }
  class DataDoms extends Array {
    pickValue(colmun, index) {
      let targetDom;
      for (let i of this[index].children) {
        if (i.getAttribute("column") === column) {
          targetDom = i.firstChild;
        }
      }
      return targetDom.textContent;
    }
    valueFilter(column, value, reverse=false) {
      let arr, boo;
      arr = [];
      for (let i of this) {
        boo = false;
        for (let j of i.children) {
          if (j.getAttribute("column") === column) {
            if (j.firstChild.textContent === value) {
              boo = true;
            }
          }
        }
        if (value === "all") {
          boo = true;
        }
        if (reverse ? !boo : boo) {
          arr.push(i);
        }
      }
      return arr;
    }
  }
  const columns = Object.keys(data.columns);
  const { portfolioBooArr, alarmStandard, updateStandard, binaryStandard, dbNameMap, titleNameMap, columnRelativeMap, cardViewMap, reportTargetMap, sameStandard, editables } = DataPatch.designerRawMap();
  const map = columnRelativeMap[data.mode];
  let div_clone, gray_line;
  let text_div;
  let style;
  let ea;
  let temp, tempArr, tempObj;
  let mainMargin, mainTopBottom;
  let subMargin;
  let motherWidth;
  let titleArea;
  let titleFontSize, titleHeight;
  let titleIcon0, titleIcon1, titleIcon2;
  let titleIcon0_2, titleIcon0_3, titleIcon0_4;
  let dataArea;
  let dataScrollBox;
  let dataTitleZone;
  let dataTitleBox;
  let dataTitleFactor;
  let dataTitleFactors;
  let dataDataZone;
  let dataDataBox;
  let dataDataFactor;
  let dataDataFactorsTotal, dataDataFactors;
  let dataDoms;
  let reportArea;
  let reportScrollBox;
  let visualSpecific;
  let relativeRatio;
  let totalWidth;
  let fixedWidth;
  let factorsMargin;
  let iconHeight;
  let moveTargets, moveParsing, moveAmount;
  let sortTargets;
  let columnIndex;
  let dataAreaToCardEvent;
  let reportHeight;
  let reportFontSize;
  let reportTextWidth, reportTextHeight;
  let reportContentsBox;
  let reportTargetColumn;
  let reportTargetColumnTong;
  let reportTargetAllBox;
  let reportTargetNumberValue;
  let reportScrollBoxTotalWidth;
  let editFunction;
  let tempFunction, tempFunctionOutput;
  let tempWidth0, tempWidth1, tempWidth2;
  let reportSortTitleTop;
  let alarmTargets;
  let alarmCircle;


  motherWidth = Number(mother.style.width.replace((new RegExp(ea + '$')), ''));
  ea = "px";
  mainMargin = 45;
  subMargin = 15;
  mainTopBottom = mainMargin - 4;

  titleFontSize = 22;
  titleHeight = 28;
  iconHeight = 11;

  reportHeight = 90;
  visualSpecific = 2.5
  relativeRatio = 1.2;

  factorsMargin = 10;

  reportFontSize = 21;

  moveTargets = [];
  moveParsing = function (dom, move) {
    let number;
    let ea;
    let translateX;
    translateX = dom.style.transform;
    ea = "px";
    number = Number(translateX.replace(/[^0-9\-\.]/gi, ''));
    return { style: "translateX(" + String(number + move) + ea + ")", number: number + move };
  }
  moveAmount = (data.mode === "presentation") ? 200 : 360;

  totalWidth = 100;
  for (let i of columns) {
    totalWidth += (data.columns[i].relative * relativeRatio) + factorsMargin;
  }

  dataArea = {};
  dataDataZone = {};
  sortTargets = [];
  dataDataFactorsTotal = [];
  alarmTargets = [];

  titleIcon0 = {};
  titleIcon0_2 = {};
  titleIcon0_3 = {};
  titleIcon0_4 = {};

  editFunction = function (thisColumnName, inputFunction, outputFunction) {
    return {
      calendar: function (e) {
        e.stopPropagation();
        if (e.cancelable) {
          e.preventDefault();
        }
        const grandMother = this.parentNode.parentNode;
        const mother = this.parentNode;
        const { top: grandMotherTop, left: grandMotherLeft } = grandMother.getBoundingClientRect();
        const { top, left, height, width } = this.getBoundingClientRect();
        const targetSpot = this.firstChild;
        const thisWidth = Number(this.style.width.replace(/[^0-9\.\-]/gi, ''));
        const thisDate = inputFunction(targetSpot.textContent);
        const thisStandard = this.getAttribute("standard");
        const ea = "px";
        let style, calendarWidth, calendarHeight, cancelBack, calendar, calendarTong;
        let whiteTop, whiteLeft;

        calendarTong = GeneralJs.nodes.div.cloneNode(true);
        calendar = instance.mother.makeCalendar(thisDate, function (e) {
          e.stopPropagation();

          const dateString = this.getAttribute("buttonValue");
          let tempArr, thisDate;
          let finalValue;
          let promptData;

          tempArr = dateString.split('-');
          thisDateObj = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));

          finalValue = outputFunction(thisDateObj);

          promptData = window.prompt("시간을 한글 없이, 숫자 형태로만 적어주세요! (예 : 오후 2시 => 14, 오전 9시 => 9, 오후 11시 => 23, 새벽 12시 => 0)");
          promptData = Number(promptData.replace(/[^0-9]/g, ''));
          if (Number.isNaN(promptData)) {
            promptData = 14;
          }
          if (!(promptData >= 0 && promptData < 24)) {
            promptData = 14;
          }

          finalValue = finalValue.slice(0, -3) + String(promptData) + '시';

          targetSpot.style.width = "";
          targetSpot.style.left = "";

          targetSpot.textContent = finalValue;

          targetSpot.style.left = String((thisWidth / 2) - (targetSpot.getBoundingClientRect().width / 2) - 2) + ea;
          targetSpot.style.width = String(targetSpot.getBoundingClientRect().width + 4) + ea;

          GeneralJs.ajax("standard=" + thisStandard + "&column=" + thisColumnName + "&value=" + finalValue + "&calendar=true", "/updateAspirantReport", function (res) {
            let statusDom;

            mother.setAttribute("alarm", "off");
            for (let dom of mother.children) {
              if (alarmStandard[data.mode].target.includes(dom.getAttribute("column"))) {
                if (dom.querySelector("svg") !== null) {
                  dom.querySelector("svg").remove();
                }
                dom.setAttribute("alarm", "off");
              }
              if (dom.getAttribute("column") === alarmStandard[data.mode].standard) {
                statusDom = dom;
              }
            }

            if (alarmStandard[data.mode].value.includes(statusDom.firstChild.textContent)) {
              statusDom.firstChild.textContent = alarmStandard[data.mode].convertValue;
              GeneralJs.ajax("standard=" + thisStandard + "&column=" + alarmStandard[data.mode].standard + "&value=" + alarmStandard[data.mode].convertValue, "/updateAspirantReport", function (res) {});
            }

            for (let obj of data.data) {
              if (obj.phone === thisStandard) {
                obj[thisColumnName] = finalValue;
                if (alarmStandard[data.mode].value.includes(statusDom.firstChild.textContent)) {
                  obj[alarmStandard[data.mode].standard] = alarmStandard[data.mode].convertValue;
                }
              }
            }

            GeneralJs.stacks.reportSortTitleFunction();

            grandMother.removeChild(grandMother.lastChild);
            grandMother.removeChild(grandMother.lastChild);
          });
        });
        calendarWidth = Number(calendar.calendarBase.style.width.replace(/[^0-9\.\-]/gi, ''));
        calendarHeight = Number(calendar.calendarBase.style.height.replace(/[^0-9\.\-]/gi, ''));
        whiteTop = grandMother.scrollTop + top - grandMotherTop + height + 5;
        whiteLeft = left - grandMotherLeft + (width / 2) - (calendarWidth / 2);

        style = {
          position: "absolute",
          background: GeneralJs.colorChip.white,
          top: String(whiteTop) + ea,
          left: String(whiteLeft) + ea,
          boxShadow: "0px 4px 14px -8px " + GeneralJs.colorChip.shadow,
          paddingTop: String(1) + ea,
          borderRadius: String(5) + ea,
          animation: "fadeuplite 0.3s ease forwards",
          width: String(calendarWidth) + ea,
          height: String(calendarHeight) + ea,
          overflow: "hidden",
        };
        GeneralJs.timeouts["designerReportEditableCalendar"] = setTimeout(function () {
          calendarTong.style.animation = "";
          clearTimeout(GeneralJs.timeouts["designerReportEditableCalendar"]);
          GeneralJs.timeouts["designerReportEditableCalendar"] = null;
        }, 301);
        for (let i in style) {
          calendarTong.style[i] = style[i];
        }

        moveTargets.push(calendarTong);

        cancelBack = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          background: "gray",
          opacity: String(0),
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + '%',
          height: String(6 + (36 * data.data.length) + 500) + ea,
          animation: "justfadein 0.3s ease forwards",
        };
        for (let i in style) {
          cancelBack.style[i] = style[i];
        }

        cancelBack.addEventListener("click", function (e) {
          cancelBack.parentNode.removeChild(calendarTong);
          cancelBack.parentNode.removeChild(cancelBack);
        });

        grandMother.appendChild(cancelBack);
        calendarTong.appendChild(calendar.calendarBase);
        grandMother.appendChild(calendarTong);
      },
      menu: function (e) {
        e.stopPropagation();
        if (e.cancelable) {
          e.preventDefault();
        }
        const grandMother = this.parentNode.parentNode;
        const mother = this.parentNode;
        const { top: grandMotherTop, left: grandMotherLeft } = grandMother.getBoundingClientRect();
        const { top, left, height, width } = this.getBoundingClientRect();
        const targetSpot = this.firstChild;
        const thisWidth = Number(this.style.width.replace(/[^0-9\.\-]/gi, ''));
        const items = outputFunction();
        const thisItem = inputFunction(targetSpot.textContent);
        const thisStandard = this.getAttribute("standard");
        const ea = "px";
        let style;
        let itemsTong;
        let itemFactor;
        let itemStyle, itemTextStyle;
        let text_div;
        let tongWidth, tongHeight;
        let itemHeight;
        let cancelBack;
        let whiteTop, whiteLeft;
        let itemClickEvent;

        tongWidth = 80;
        itemHeight = 32;

        whiteTop = grandMother.scrollTop + top - grandMotherTop + height + 5;
        whiteLeft = left - grandMotherLeft + (width / 2) - (tongWidth / 2);

        itemClickEvent = function (e) {
          e.stopPropagation();
          if (e.cancelable) {
            e.preventDefault();
          }

          let finalValue;

          finalValue = this.getAttribute("value");

          targetSpot.style.left = "";
          targetSpot.style.width = "";
          targetSpot.firstChild.textContent = finalValue;
          targetSpot.style.left = String((thisWidth / 2) - (targetSpot.getBoundingClientRect().width / 2) - 2) + ea;
          targetSpot.style.width = String(targetSpot.getBoundingClientRect().width + 4) + ea;

          GeneralJs.ajax("standard=" + thisStandard + "&column=" + thisColumnName + "&value=" + finalValue, "/updateAspirantReport", function (res) {
            let alarmCircle;

            if (alarmStandard[data.mode].standard === thisColumnName) {
              if (!alarmStandard[data.mode].value.includes(finalValue)) {
                mother.setAttribute("alarm", "off");
                for (let dom of mother.children) {
                  if (alarmStandard[data.mode].target.includes(dom.getAttribute("column"))) {
                    if (dom.querySelector("svg") !== null) {
                      dom.querySelector("svg").remove();
                    }
                    dom.setAttribute("alarm", "off");
                  }
                }
              } else {
                mother.setAttribute("alarm", "on");
                for (let dom of mother.children) {
                  if (alarmStandard[data.mode].target.includes(dom.getAttribute("column"))) {
                    alarmCircle = SvgTong.stringParsing(instance.mother.returnCircle("position:absolute;transform:scale(0.4);transform-origin:100% 0%;right:-5.5px;top:" + (GeneralJs.isMac() ? String(4) : String(2)) + "px;", GeneralJs.colorChip.red));
                    dom.firstChild.appendChild(alarmCircle);
                    dom.setAttribute("alarm", "on");
                  }
                }
              }
            }

            for (let obj of data.data) {
              if (obj.phone === thisStandard) {
                obj[thisColumnName] = finalValue;
              }
            }

            GeneralJs.stacks.reportSortTitleFunction();

            if (/드[랍롭]/.test(finalValue)) {
              titleIcon0.click();
            }

            grandMother.removeChild(grandMother.lastChild);
            grandMother.removeChild(grandMother.lastChild);
          });
        }

        //item tong
        itemsTong = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          top: String(whiteTop) + ea,
          left: String(whiteLeft) + ea,
          paddingTop: String(1) + ea,
          animation: "fadeuplite 0.3s ease forwards",
          width: String(tongWidth) + ea,
        };
        for (let i in style) {
          itemsTong.style[i] = style[i];
        }

        GeneralJs.timeouts["designerReportEditableMenuBox"] = setTimeout(function () {
          itemsTong.style.animation = "";
          clearTimeout(GeneralJs.timeouts["designerReportEditableMenuBox"]);
          GeneralJs.timeouts["designerReportEditableMenuBox"] = null;
        }, 301);

        moveTargets.push(itemsTong);

        //set item style
        itemStyle = {
          display: "block",
          position: "relative",
          width: String(100) + '%',
          height: String(itemHeight) + ea,
          background: GeneralJs.colorChip.white,
          boxShadow: "0px 2px 14px -8px " + GeneralJs.colorChip.shadow,
          borderRadius: String(3) + ea,
          marginBottom: String(5) + ea,
          cursor: "pointer",
        };
        itemTextStyle = {
          fontSize: String(13) + ea,
          fontWeight: String(500),
          position: "absolute",
          width: String(100) + '%',
          top: String(GeneralJs.isMac() ? 6 : 8) + ea,
          textAlign: "center",
          color: GeneralJs.colorChip.green,
        };

        //append items
        for (let i = 0; i < items.length; i++) {
          itemFactor = GeneralJs.nodes.div.cloneNode(true);
          for (let j in itemStyle) {
            itemFactor.style[j] = itemStyle[j];
          }
          text_div = GeneralJs.nodes.div.cloneNode(true);
          text_div.classList.add("hoverDefault_lite");
          text_div.textContent = items[i];
          for (let j in itemTextStyle) {
            text_div.style[j] = itemTextStyle[j];
          }
          itemFactor.appendChild(text_div);
          itemFactor.setAttribute("value", items[i]);
          itemFactor.addEventListener("click", itemClickEvent);
          itemsTong.appendChild(itemFactor);
        }

        //cancel back
        cancelBack = GeneralJs.nodes.div.cloneNode(true);
        style = {
          position: "absolute",
          background: "gray",
          opacity: String(0),
          top: String(0) + ea,
          left: String(0) + ea,
          width: String(100) + '%',
          height: String(6 + (36 * data.data.length) + 500) + ea,
          animation: "justfadein 0.3s ease forwards",
        };
        for (let i in style) {
          cancelBack.style[i] = style[i];
        }

        cancelBack.addEventListener("click", function (e) {
          cancelBack.parentNode.removeChild(itemsTong);
          cancelBack.parentNode.removeChild(cancelBack);
        });

        //end
        grandMother.appendChild(cancelBack);
        grandMother.appendChild(itemsTong);
      }
    };
  }

  //title area
  titleArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingTop: String(mainTopBottom) + ea,
    paddingLeft: String(mainMargin) + ea,
    height: String(titleHeight) + ea,
  };
  for (let i in style) {
    titleArea.style[i] = style[i];
  }

  div_clone = GeneralJs.nodes.div.cloneNode(true);
  div_clone.textContent = data.title;
  style = {
    display: "inline-block",
    position: "relative",
    width: "auto",
    fontSize: String(titleFontSize) + ea,
    fontWeight: String(600),
    bottom: String(GeneralJs.isMac() ? 0 : -2) + ea,
  };
  for (let i in style) {
    div_clone.style[i] = style[i];
  }
  titleArea.appendChild(div_clone);


  titleIcon0 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "전체 보기";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: (data.mode === "total" ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray4),
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0.appendChild(text_div);
  titleIcon0.addEventListener("click", function (e) {
    while (mother.firstChild !== loadingIcon) {
      mother.removeChild(mother.firstChild);
    }
    while (mother.lastChild !== loadingIcon) {
      mother.removeChild(mother.lastChild);
    }
    loadingIcon.style.opacity = "1";
    GeneralJs.ajax("mode=total", "/getAspirantReport", function (data) {
      loadingIcon.style.opacity = "0";
      instance.reportContents(JSON.parse(data), mother, loadingIcon);
    });
  });
  titleArea.appendChild(titleIcon0);


  titleIcon0_2 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0_2.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0_2.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "설명회";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: (data.mode === "presentation" ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray4),
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0_2.appendChild(text_div);
  titleIcon0_2.addEventListener("click", function (e) {
    while (mother.firstChild !== loadingIcon) {
      mother.removeChild(mother.firstChild);
    }
    while (mother.lastChild !== loadingIcon) {
      mother.removeChild(mother.lastChild);
    }
    loadingIcon.style.opacity = "1";
    GeneralJs.ajax("mode=presentation", "/getAspirantReport", function (data) {
      loadingIcon.style.opacity = "0";
      instance.reportContents(JSON.parse(data), mother, loadingIcon);
    });
  });
  titleArea.appendChild(titleIcon0_2);


  titleIcon0_3 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0_3.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0_3.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "파트너십";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: (data.mode === "partnership" ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray4),
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0_3.appendChild(text_div);
  titleIcon0_3.addEventListener("click", function (e) {
    while (mother.firstChild !== loadingIcon) {
      mother.removeChild(mother.firstChild);
    }
    while (mother.lastChild !== loadingIcon) {
      mother.removeChild(mother.lastChild);
    }
    loadingIcon.style.opacity = "1";
    GeneralJs.ajax("mode=partnership", "/getAspirantReport", function (data) {
      loadingIcon.style.opacity = "0";
      instance.reportContents(JSON.parse(data), mother, loadingIcon);
    });
  });
  titleArea.appendChild(titleIcon0_3);


  titleIcon0_4 = GeneralJs.nodes.div.cloneNode(true);
  titleIcon0_4.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    height: String(15) + ea,
    width: String(300) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon0_4.style[i] = style[i];
  }
  text_div = GeneralJs.nodes.div.cloneNode(true);
  text_div.textContent = "추출";
  style = {
    position: "absolute",
    fontSize: String(13) + ea,
    bottom: String(0) + ea,
    fontWeight: String(500),
    color: GeneralJs.colorChip.gray4,
  };
  for (let i in style) {
    text_div.style[i] = style[i];
  }
  titleIcon0_4.appendChild(text_div);
  titleIcon0_4.addEventListener("click", function (e) {
    const today = new Date();
    const parentId = "1JcUBOu9bCrFBQfBAG-yXFcD9gqYMRC1c";
    let ajaxData, matrix, tempArr;
    let targetWhite, grayBack, style, ea;

    matrix = [];

    tempArr = [];
    for (let c of columns) {
      tempArr.push(map[c].name);
    }
    matrix.push(tempArr);

    for (let i of data.data) {
      tempArr = [];
      for (let c of columns) {
        tempArr.push(i[c]);
      }
      matrix.push(tempArr);
    }

    ajaxData = '';
    ajaxData += "values=";
    ajaxData += JSON.stringify(matrix).replace(/&/g, '').replace(/=/g, '');
    ajaxData += "&newMake=";
    ajaxData += "true";
    ajaxData += "&parentId=";
    ajaxData += parentId;
    ajaxData += "&sheetName=";
    ajaxData += "fromDB_rawDesigner_" + String(today.getFullYear()) + instance.mother.todayMaker();

    ea = "px";
    targetWhite = loadingIcon.parentNode;

    loadingIcon.style.opacity = String(1);
    loadingIcon.style.zIndex = String(1);

    grayBack = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(100) + '%',
      height: String(100) + '%',
      background: GeneralJs.colorChip.gray4,
      opacity: String(0.4),
      top: String(0) + ea,
      left: String(0) + ea,
      animation: "justfadein 0.3s ease",
    };
    for (let i in style) {
      grayBack.style[i] = style[i];
    }
    targetWhite.appendChild(grayBack);

    GeneralJs.ajax(ajaxData, "/sendSheets", function (res) {
      const { link } = JSON.parse(res);
      loadingIcon.style.opacity = String(0);
      loadingIcon.style.zIndex = String(0);
      targetWhite.removeChild(targetWhite.lastChild);
      window.open(link, "_blank");
    });
  });
  titleArea.appendChild(titleIcon0_4);


  titleIcon1 = SvgTong.stringParsing(this.mother.returnArrow("left", GeneralJs.colorChip.green));
  titleIcon1.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
    height: String(iconHeight) + ea,
    right: String(mainMargin + 18) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon1.style[i] = style[i];
  }
  titleIcon1.addEventListener("click", function (e) {
    let tempObj;
    let minArr;
    let minimumMove;
    minArr = [];
    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * -1));
      minArr.push(tempObj.number);
    }
    minArr.sort((a, b) => { return a - b; });

    minimumMove = moveAmount * -1;

    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * 1));
      if (minArr[0] >= minimumMove) {
        dom.style.transform = "translateX(0px)";
      } else {
        dom.style.transform = tempObj.style;
      }
    }
  });
  titleArea.appendChild(titleIcon1);

  titleIcon2 = SvgTong.stringParsing(this.mother.returnArrow("right", GeneralJs.colorChip.green));
  titleIcon2.classList.add("hoverDefault_lite");
  style = {
    position: "absolute",
    width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
    height: String(iconHeight) + ea,
    right: String(mainMargin) + ea,
    bottom: String(0) + ea,
  };
  for (let i in style) {
    titleIcon2.style[i] = style[i];
  }
  titleIcon2.addEventListener("click", function (e) {
    let tempObj;
    let standard;
    let maxArr;
    standard = dataArea.getBoundingClientRect().width - (mainMargin * 2);
    maxArr = [];
    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * -1));
      maxArr.push(tempObj.number);
    }
    maxArr.sort((a, b) => { return b - a; });
    for (let dom of moveTargets) {
      tempObj = moveParsing(dom, (moveAmount * -1));
      if (maxArr[0] <= standard - totalWidth) {
        dom.style.transform = "translateX(" + String(standard - totalWidth) + "px)";
      } else {
        dom.style.transform = tempObj.style;
      }
    }
  });
  titleArea.appendChild(titleIcon2);
  mother.appendChild(titleArea);

  titleIcon0.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11) + ea;
  tempWidth0 = titleIcon0.firstChild.getBoundingClientRect().width;
  titleIcon0.style.width = String(tempWidth0 + 1) + ea;

  titleIcon0_2.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11 + tempWidth0 + 9) + ea;
  tempWidth1 = titleIcon0_2.firstChild.getBoundingClientRect().width;
  titleIcon0_2.style.width = String(tempWidth1 + 1) + ea;

  titleIcon0_3.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11 + tempWidth0 + 9 + tempWidth1 + 9) + ea;
  tempWidth2 = titleIcon0_3.firstChild.getBoundingClientRect().width;
  titleIcon0_3.style.width = String(tempWidth2 + 1) + ea;

  titleIcon0_4.style.left = String(mainMargin + div_clone.getBoundingClientRect().width + 11 + tempWidth0 + 9 + tempWidth1 + 9 + tempWidth2 + 9) + ea;
  titleIcon0_4.style.width = String(titleIcon0_4.firstChild.getBoundingClientRect().width + 1) + ea;

  //data area
  dataArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingLeft: String(mainMargin) + ea,
    paddingRight: String(mainMargin) + ea,
    width: "calc(100% - " + String(mainMargin * 2) + ea + ")",
    height: "calc(calc(100% - " + String(((mainMargin * 2) + visualSpecific) + titleHeight) + ea + ") - " + String(reportHeight) + ea + ")",
  };
  for (let i in style) {
    dataArea.style[i] = style[i];
  }

  dataAreaToCardEvent = function (e) {
    const thisCase = this.parentNode;
    const thisIndex = Number(this.getAttribute("index"));
    const thisRelation = (this.getAttribute(sameStandard.name) === "true");
    const thisRelationIndex = thisRelation ? 1 : 0;
    const thisBinary = (this.getAttribute(binaryStandard.name) === "true");
    const thisBinaryIndex = thisBinary ? 1 : 0;
    const thisFolderId = this.getAttribute(binaryStandard.target);
    const thisData = data.data[thisIndex];
    const { designer, phone } = thisData;
    let newArea;
    let cardArea;
    let div_clone, text_div;
    let style;
    let ea;
    let cardTitleWidth, cardTitleHeight;
    let cardTitleTop;
    let cardMargin;
    let cardGrayBar;
    let contentsStartTop;
    let lineHeight, indexNumber, valueIndent;
    let cardTitleFontSize, cardDefaultFontSize;
    let buttonsTargets;
    let buttonsWidthAddtion;
    let titleIcon1, titleIcon2;
    let cardValueTong;
    let tempBoo;

    ea = "px";
    cardMargin = 42;
    cardTitleTop = 30;
    lineHeight = 30;
    valueIndent = 120;
    cardTitleFontSize = 38;
    cardDefaultFontSize = 15;

    //initial
    newArea = dataArea.cloneNode(true);
    newArea.style.position = "absolute";
    newArea.style.top = String(mainTopBottom + titleHeight) + ea;
    cardArea = newArea.firstChild;

    while (cardArea.firstChild) {
      cardArea.removeChild(cardArea.lastChild);
    }

    if (e.noFadeInAnimation !== undefined) {
      newArea.style.transition = "all 0s ease";
      dataArea.style.transition = "all 0s ease";
      newArea.style.animation = "fadein 0s ease forwards";
      dataArea.style.animation = "fadeout 0s ease forwards";
    } else {
      newArea.style.transition = "all 0.3s ease";
      dataArea.style.transition = "all 0.3s ease";
      newArea.style.animation = "fadein 0.3s ease forwards";
      dataArea.style.animation = "fadeout 0.3s ease forwards";
    }
    dataArea.parentNode.insertBefore(newArea, dataArea.nextElementSibling);

    //button setting
    buttonsTargets = [
      {
        toggle: [ "목록으로", "목록으로" ],
        click: function (e) {
          dataArea.parentNode.removeChild(newArea);
          dataArea.style.animation = "fadein 0.3s ease forwards";
        },
        color: [ GeneralJs.colorChip.black, GeneralJs.colorChip.black ],
        mode: null,
      },
      {
        toggle: [ ((data.mode !== "partnership") ? "파트너십 신청 안 함" : "설명회 신청 안 함"), ((data.mode !== "partnership") ? "파트너십 신청" : "설명회 신청") ],
        click: function (e) {
          if (thisRelation) {
            while (mother.firstChild !== loadingIcon) {
              mother.removeChild(mother.firstChild);
            }
            while (mother.lastChild !== loadingIcon) {
              mother.removeChild(mother.lastChild);
            }
            loadingIcon.style.opacity = "1";
            GeneralJs.ajax("mode=" + ((data.mode === "presentation") ? "partnership" : "presentation"), "/getAspirantReport", function (data) {
              loadingIcon.style.opacity = "0";
              instance.reportContents(JSON.parse(data), mother, loadingIcon, function (doms) {
                const target = (doms.valueFilter("phone", phone))[0];
                GeneralJs.timeouts["convertDesignerReportTimeouts"] = setTimeout(function () {
                  target.firstChild.click();
                  clearTimeout(GeneralJs.timeouts["convertDesignerReportTimeouts"]);
                  GeneralJs.timeouts["convertDesignerReportTimeouts"] = null;
                }, 0);
              });
            });
          } else {
            alert("추가 신청이 없습니다!");
          }
        },
        color: [ GeneralJs.colorChip.red, GeneralJs.colorChip.green ],
        mode: "opposite",
      },
      {
        toggle: [ "포트폴리오 없음", "포트폴리오 보기" ],
        click: function (e) {
          let str;
          if (thisFolderId !== null) {
            if (!/^__link__/.test(thisFolderId)) {
              str = "https://drive.google.com/drive/folders/";
              str += thisFolderId;
              str += "?usp=sharing";
            } else {
              str = thisFolderId.replace(/^__link__/, '');
            }
            for (let doms of thisCase.children) {
              if (portfolioBooArr.includes(doms.getAttribute("column"))) {
                if (doms.firstChild.querySelector("svg") !== null) {
                  doms.firstChild.querySelector("svg").remove();
                }
              }
            }
            GeneralJs.ajax("standard=" + phone + "&user=" + instance.user.email, "/viewAspirantRawPortfolio", function (data) {});
            window.open(str, "_blank");
          } else {
            alert("포트폴리오가 없습니다!");
          }
        },
        color: [ GeneralJs.colorChip.red, GeneralJs.colorChip.green ],
        mode: "binary",
      },
    ];

    //name
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("hoverDefault_lite");
    style = {
      position: "relative",
      marginTop: String(cardTitleTop) + ea,
      left: String(cardMargin) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = designer;
    style = {
      position: "absolute",
      fontSize: String(cardTitleFontSize) + ea,
      fontWeight: String(500),
      top: String(0) + ea,
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.addEventListener("click", buttonsTargets[0].click);
    div_clone.appendChild(text_div);
    cardArea.appendChild(div_clone);

    cardTitleWidth = text_div.getBoundingClientRect().width;
    cardTitleHeight = text_div.getBoundingClientRect().height;

    div_clone.style.width = String(cardTitleWidth) + ea;
    div_clone.style.height = String(cardTitleHeight) + ea;

    //phone
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("hoverDefault_lite");
    style = {
      position: "absolute",
      top: String((cardTitleTop * 2) - (cardMargin - cardTitleFontSize)) + ea,
      left: String(cardMargin + cardTitleWidth + 11) + ea,
      width: String(1000) + ea,
      transition: "all 0s ease",
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = phone;
    style = {
      position: "absolute",
      fontSize: String(cardDefaultFontSize + 1) + ea,
      fontWeight: String(200),
      color: GeneralJs.colorChip.green,
      top: String(0) + ea,
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.appendChild(text_div);
    div_clone.addEventListener("click", buttonsTargets[0].click);
    cardArea.appendChild(div_clone);

    cardTitleWidth = text_div.getBoundingClientRect().width;
    cardTitleHeight = text_div.getBoundingClientRect().height;

    div_clone.style.width = String(cardTitleWidth) + ea;
    div_clone.style.height = String(cardTitleHeight) + ea;

    //icons
    titleIcon1 = SvgTong.stringParsing(instance.mother.returnArrow("left", GeneralJs.colorChip.green));
    titleIcon1.classList.add("hoverDefault_lite");
    style = {
      position: "absolute",
      width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
      height: String(iconHeight) + ea,
      right: String(cardMargin + 18) + ea,
      top: String(64) + ea,
    };
    for (let i in style) {
      titleIcon1.style[i] = style[i];
    }
    titleIcon1.addEventListener("click", function (e) {
      if (thisCase.previousElementSibling !== null) {
        dataArea.parentNode.removeChild(newArea);
        e.noFadeInAnimation = true;
        dataAreaToCardEvent.call(thisCase.previousElementSibling.firstChild, e);
      }
    });
    cardArea.appendChild(titleIcon1);

    titleIcon2 = SvgTong.stringParsing(instance.mother.returnArrow("right", GeneralJs.colorChip.green));
    titleIcon2.classList.add("hoverDefault_lite");
    style = {
      position: "absolute",
      width: String(iconHeight * SvgTong.getRatio(titleIcon1)) + ea,
      height: String(iconHeight) + ea,
      right: String(cardMargin) + ea,
      top: String(64) + ea,
    };
    for (let i in style) {
      titleIcon2.style[i] = style[i];
    }
    titleIcon2.addEventListener("click", function (e) {
      if (thisCase.nextElementSibling !== null) {
        dataArea.parentNode.removeChild(newArea);
        e.noFadeInAnimation = true;
        dataAreaToCardEvent.call(thisCase.nextElementSibling.firstChild, e);
      }
    });
    cardArea.appendChild(titleIcon2);

    //gray bar
    contentsStartTop = ((cardTitleTop * 2) - (cardMargin - cardTitleFontSize)) + cardTitleHeight + 12;
    cardGrayBar = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(contentsStartTop) + ea,
      borderTop: "1px solid " + GeneralJs.colorChip.gray3,
      width: "calc(100% - " + String(cardMargin * 2) + ea + ")",
      left: String(cardMargin) + ea,
    };
    for (let i in style) {
      cardGrayBar.style[i] = style[i];
    }
    cardArea.appendChild(cardGrayBar);

    //card values
    cardValueTong = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      marginTop: String(11) + ea,
      width: "calc(100% - " + String(cardMargin * 2) + ea + ")",
      left: String(cardMargin) + ea,
      height: "calc(100% - " + String(130) + ea + ")",
      overflow: "scroll",
    };
    for (let i in style) {
      cardValueTong.style[i] = style[i];
    }
    cardArea.appendChild(cardValueTong);

    contentsStartTop = contentsStartTop + cardTitleTop;
    indexNumber = 0;
    for (let obj of cardViewMap[data.mode]) {

      //column name
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        top: String(cardTitleTop + (lineHeight * indexNumber)) + ea,
        left: String(0) + ea,
        width: String(2000) + ea,
        transition: "all 0s ease",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      text_div.textContent = map[obj.column].name;
      style = {
        position: "absolute",
        fontSize: String(cardDefaultFontSize) + ea,
        fontWeight: String(600),
        color: GeneralJs.colorChip.black,
        top: String(0) + ea,
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      cardValueTong.appendChild(div_clone);

      cardTitleWidth = text_div.getBoundingClientRect().width;
      cardTitleHeight = text_div.getBoundingClientRect().height;

      div_clone.style.width = String(cardTitleWidth) + ea;
      div_clone.style.height = String(cardTitleHeight) + ea;

      //value
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        top: String(cardTitleTop + (lineHeight * indexNumber)) + ea,
        left: String(valueIndent) + ea,
        width: String(12000) + ea,
        overflow: "scroll",
        transition: "all 0s ease",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      if (obj.complex !== undefined) {
        text_div.textContent = thisData[obj.column];
        text_div.textContent = text_div.textContent + " ";
        for (let c of obj.complex) {
          text_div.textContent = text_div.textContent + thisData[c];
          text_div.textContent = text_div.textContent + " ";
        }
        text_div.textContent = text_div.textContent.slice(0, -1);
      } else {
        text_div.textContent = thisData[obj.column];
      }
      style = {
        position: "absolute",
        fontSize: String(cardDefaultFontSize) + ea,
        fontWeight: String(300),
        textAlign: "left",
        color: GeneralJs.colorChip.black,
        top: String(0) + ea,
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      cardValueTong.appendChild(div_clone);

      cardTitleWidth = text_div.getBoundingClientRect().width;
      cardTitleHeight = text_div.getBoundingClientRect().height;

      div_clone.style.width = String(cardTitleWidth) + ea;
      div_clone.style.height = String(cardTitleHeight) + ea;
      text_div.style.width = String(cardTitleWidth) + ea;
      div_clone.style.width = "calc(100% - " + String(valueIndent) + ea + ")";

      indexNumber++;
    }

    //buttons
    buttonsWidthAddtion = 0;
    for (let obj of buttonsTargets) {

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      style = {
        position: "absolute",
        bottom: String(cardMargin - 2) + ea,
        right: String(cardMargin + buttonsWidthAddtion) + ea,
        width: String(1000) + ea,
        border: "1px solid " + GeneralJs.colorChip.gray3,
        borderRadius: String(3) + ea,
        transition: "all 0s ease",
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      text_div.textContent = obj.toggle[obj.mode === "binary" ? thisBinaryIndex : thisRelationIndex];
      text_div.classList.add("hoverDefault_lite");
      style = {
        position: "absolute",
        fontSize: String(cardDefaultFontSize - 1) + ea,
        fontWeight: String(600),
        color: obj.color[obj.mode === "binary" ? thisBinaryIndex : thisRelationIndex],
        top: String(5) + ea,
        left: String(13) + ea,
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      cardArea.appendChild(div_clone);

      cardTitleWidth = text_div.getBoundingClientRect().width;
      cardTitleHeight = text_div.getBoundingClientRect().height;

      div_clone.style.width = String(cardTitleWidth + (13 * 2)) + ea;
      div_clone.style.height = String(cardTitleHeight + (5 * 2) + 2) + ea;

      div_clone.addEventListener("click", obj.click);

      buttonsWidthAddtion = buttonsWidthAddtion + (cardTitleWidth + (13 * 2)) + 10;
    }
  }

  dataScrollBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(subMargin) + ea,
    height: "calc(100% - " + String(subMargin) + ea + ")",
    border: "1px solid " + GeneralJs.colorChip.gray3,
    borderRadius: String(4) + ea,
  };
  for (let i in style) {
    dataScrollBox.style[i] = style[i];
  }

  dataTitleZone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    height: String(46) + ea,
    borderBottom: "1px solid " + GeneralJs.colorChip.gray3,
    overflow: "hidden",
  };
  for (let i in style) {
    dataTitleZone.style[i] = style[i];
  }

  dataTitleBox = GeneralJs.nodes.div.cloneNode(true);
  moveTargets.push(dataTitleBox);
  style = {
    position: "relative",
    height: String(46) + ea,
    width: String(totalWidth) + ea,
    transform: "translateX(" + String(0) + ea + ")",
  };
  for (let i in style) {
    dataTitleBox.style[i] = style[i];
  }

  dataTitleFactors = [];

  columnIndex = 0;
  for (let z of columns) {
    dataTitleFactor = GeneralJs.nodes.div.cloneNode(true);
    dataTitleFactor.classList.add("hoverDefault_lite");
    style = {
      display: "inline-block",
      position: "relative",
      height: "100%",
      width: String(1000) + ea,
      transition: "all 0s ease",
      opacity: String(0),
      overflow: "hidden",
      marginRight: String(factorsMargin) + ea,
    };
    for (let i in style) {
      dataTitleFactor.style[i] = style[i];
    }

    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = data.columns[z].name;
    style = {
      position: "absolute",
      top: String(GeneralJs.isMac() ? 12 : 13) + ea,
      fontSize: String(14) + ea,
      fontWeight: String(600),
      width: "auto",
      color: GeneralJs.colorChip.green,
      transition: "all 0s ease",
      textAlign: "center",
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    dataTitleFactor.appendChild(text_div);
    dataTitleFactor.setAttribute("index", String(columnIndex));
    dataTitleFactor.setAttribute("sort_toggle", String(1));
    dataTitleFactor.addEventListener("click", function (e) {
      const columnIndex = Number(this.getAttribute("index"));
      const toggle = Number(this.getAttribute("sort_toggle"));
      if (map[z].sort === "string") {
        sortTargets.sort((a, b) => {
          if (b.children[columnIndex].firstChild.textContent >= a.children[columnIndex].firstChild.textContent) {
            return -1 * toggle;
          } else {
            return 1 * toggle;
          }
        });
      } else if (map[z].sort === "number") {
        sortTargets.sort((a, b) => {
          return toggle * (Number(a.children[columnIndex].firstChild.textContent.replace(/[^0-9]/g, '')) - Number(b.children[columnIndex].firstChild.textContent.replace(/[^0-9]/g, '')));
        });
      } else if (map[z].sort === "date") {
        sortTargets.sort((a, b) => {
          return toggle * (stringToDateValue(a.children[columnIndex].firstChild.textContent) - stringToDateValue(b.children[columnIndex].firstChild.textContent));
        });
      } else if (map[z].sort === "career") {
        sortTargets.sort((a, b) => {
          return toggle * (stringToCareerNumber(a.children[columnIndex].firstChild.textContent) - stringToCareerNumber(b.children[columnIndex].firstChild.textContent));
        });
      }
      for (let div of sortTargets) {
        dataDataZone.appendChild(div);
      }
      this.setAttribute("sort_toggle", String(-1 * toggle));
    });

    dataTitleFactors.push({ tong: dataTitleFactor, text: text_div, width: (data.columns[z].relative * relativeRatio) });
    dataTitleBox.appendChild(dataTitleFactor);
    columnIndex++;
  }
  dataTitleZone.appendChild(dataTitleBox);
  dataScrollBox.appendChild(dataTitleZone);

  dataDataZone = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingTop: String(6) + ea,
    paddingBottom: String(200) + ea,
    height: "calc(100% - " + String(46 + (6 + 200)) + ea + ")",
    overflowY: "scroll",
    overflowX: "hidden",
  };
  for (let i in style) {
    dataDataZone.style[i] = style[i];
  }

  dataDoms = new DataDoms();
  for (let j = 0; j < data.data.length; j++) {
    dataDataBox = GeneralJs.nodes.div.cloneNode(true);
    dataDataBox.setAttribute("index", String(j));
    dataDataBox.setAttribute("standard", data.data[j][data.standard]);
    dataDataBox.setAttribute(sameStandard.name, String(data.data[j][sameStandard.name]));
    dataDataBox.setAttribute(binaryStandard.name, String(data.data[j][binaryStandard.name]));
    if (alarmStandard[data.mode].value.includes(data.data[j][alarmStandard[data.mode].standard])) {
      dataDataBox.setAttribute("alarm", "on");
    } else {
      dataDataBox.setAttribute("alarm", "off");
    }
    moveTargets.push(dataDataBox);
    style = {
      height: String(36) + ea,
      width: String(totalWidth) + ea,
      transform: "translateX(" + String(0) + ea + ")",
      opacity: data.data[j][binaryStandard.name] ? String(1) : String(0.5),
    };
    for (let i in style) {
      dataDataBox.style[i] = style[i];
    }

    dataDataFactors = [];
    for (let z of columns) {
      dataDataFactor = GeneralJs.nodes.div.cloneNode(true);
      dataDataFactor.classList.add("hoverDefault_lite");
      dataDataFactor.setAttribute("index", String(j));
      dataDataFactor.setAttribute("standard", data.data[j][data.standard]);
      dataDataFactor.setAttribute("column", z);
      dataDataFactor.setAttribute(sameStandard.name, String(data.data[j][sameStandard.name]));
      dataDataFactor.setAttribute(binaryStandard.name, String(data.data[j][binaryStandard.name]));
      if (data.data[j][binaryStandard.target] !== null) {
        dataDataFactor.setAttribute(binaryStandard.target, String(data.data[j][binaryStandard.target]));
      }
      style = {
        display: "inline-block",
        position: "relative",
        height: "100%",
        width: String(1000) + ea,
        transition: "all 0s ease",
        opacity: String(0),
        overflow: "hidden",
        marginRight: String(factorsMargin) + ea,
      };
      for (let i in style) {
        dataDataFactor.style[i] = style[i];
      }

      text_div = GeneralJs.nodes.div.cloneNode(true);
      text_div.setAttribute("index", String(j));
      text_div.setAttribute("column", z);
      text_div.textContent = data.data[j][z];
      style = {
        position: "absolute",
        top: String(7) + ea,
        fontSize: String(14) + ea,
        width: "auto",
        lineHeight: String(1.8),
        color: GeneralJs.colorChip.realBlack,
        fontWeight: data.data[j][sameStandard.name] ? String(500) : String(200),
        transition: "all 0s ease",
        textAlign: "center",
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      dataDataFactor.appendChild(text_div);
      if (editables[z] !== undefined) {
        tempFunction = editables[z];
        tempFunctionOutput = tempFunction();
        dataDataFactor.addEventListener("click", (editFunction(tempFunctionOutput.thisColumnName, tempFunctionOutput.inputFunction, tempFunctionOutput.outputFunction))[tempFunctionOutput.type]);
        dataDataFactor.addEventListener("contextmenu", (editFunction(tempFunctionOutput.thisColumnName, tempFunctionOutput.inputFunction, tempFunctionOutput.outputFunction))[tempFunctionOutput.type]);
      } else {
        dataDataFactor.addEventListener("click", dataAreaToCardEvent);
      }
      dataDataFactors.push({ tong: dataDataFactor, text: text_div, width: (data.columns[z].relative * relativeRatio) });
      if (alarmStandard[data.mode].target.includes(z)) {
        if (alarmStandard[data.mode].value.includes(data.data[j][alarmStandard[data.mode].standard])) {
          dataDataFactor.setAttribute("alarm", "on");
        } else {
          dataDataFactor.setAttribute("alarm", "off");
        }
        alarmTargets.push(dataDataFactor);
      }

      if (portfolioBooArr.includes(z)) {

        dataDataFactor.addEventListener("click", function (e) {
          const thisCase = this.parentNode;
          const thisFolderId = this.getAttribute(binaryStandard.target);
          const thisIndex = Number(this.getAttribute("index"));
          const thisData = data.data[thisIndex];
          const { designer, phone } = thisData;
          let str;
          if (thisFolderId !== null) {
            if (!/^__link__/.test(thisFolderId)) {
              str = "https://drive.google.com/drive/folders/";
              str += thisFolderId;
              str += "?usp=sharing";
            } else {
              str = thisFolderId.replace(/^__link__/, '');
            }
            for (let doms of thisCase.children) {
              if (portfolioBooArr.includes(doms.getAttribute("column"))) {
                if (doms.firstChild.querySelector("svg") !== null) {
                  doms.firstChild.querySelector("svg").remove();
                }
              }
            }
            GeneralJs.ajax("standard=" + phone + "&user=" + instance.user.email, "/viewAspirantRawPortfolio", function (data) {});
            window.open(str, "_blank");
          } else {
            alert("포트폴리오가 없습니다!");
          }
        });

        if (data.data[j][portfolioBooArr.standardColumnName] === portfolioBooArr.standardColumnValue) {
          if (JSON.parse(data.data[j][portfolioBooArr.flatColumnName]).length > 0) {
            tempBoo = false;
            for (let p of JSON.parse(data.data[j][portfolioBooArr.flatColumnName])) {
              if (p.who === instance.user.email) {
                tempBoo = true;
              }
            }
            if (!tempBoo) {
              dataDataFactor.setAttribute("alarm", "on");
              alarmTargets.push(dataDataFactor);
            }
          } else {
            dataDataFactor.setAttribute("alarm", "on");
            alarmTargets.push(dataDataFactor);
          }
        }
      }

      dataDataBox.appendChild(dataDataFactor);
    }
    sortTargets.push(dataDataBox);
    dataDataFactorsTotal.push(dataDataFactors);
    dataDataZone.appendChild(dataDataBox);
    dataDoms.push(dataDataBox);
  }

  this.aspirants = dataDoms;
  dataScrollBox.appendChild(dataDataZone);

  dataArea.appendChild(dataScrollBox);
  mother.appendChild(dataArea);

  //fix data area factor's width
  for (let { tong, text, width } of dataTitleFactors) {
    fixedWidth = text.getBoundingClientRect().width;
    tong.style.width = String(width) + ea;
    text.style.width = String(fixedWidth + 4) + ea;
    text.style.left = "calc(50% - " + String((fixedWidth / 2) + 2) + ea + ")";
    tong.style.opacity = String(1);
  }

  for (let arr of dataDataFactorsTotal) {
    for (let { tong, text, width } of arr) {
      fixedWidth = text.getBoundingClientRect().width;
      tong.style.width = String(width) + ea;
      text.style.width = String(fixedWidth + 4) + ea;
      text.style.left = "calc(50% - " + String((fixedWidth / 2) + 2) + ea + ")";
      tong.style.opacity = String(1);
    }
  }

  for (let a of alarmTargets) {
    if (a.getAttribute("alarm") === "on") {
      alarmCircle = SvgTong.stringParsing(instance.mother.returnCircle("position:absolute;transform:scale(0.4);transform-origin:100% 0%;right:-5.5px;top:" + (GeneralJs.isMac() ? String(4) : String(2)) + "px;", GeneralJs.colorChip.red));
      a.firstChild.appendChild(alarmCircle);
    }
  }

  //report area
  reportArea = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    paddingLeft: String(mainMargin) + ea,
    paddingRight: String(mainMargin) + ea,
    height: String(reportHeight) + ea,
  };
  for (let i in style) {
    reportArea.style[i] = style[i];
  }
  reportScrollBox = GeneralJs.nodes.div.cloneNode(true);
  style = {
    position: "relative",
    top: String(subMargin) + ea,
    height: "calc(100% - " + String(subMargin) + ea + ")",
    background: GeneralJs.colorChip.gray1,
    borderRadius: String(4) + ea,
  };
  for (let i in style) {
    reportScrollBox.style[i] = style[i];
  }
  reportArea.appendChild(reportScrollBox);
  mother.appendChild(reportArea);

  //report sort standards contents

  //report sort title
  GeneralJs.stacks["reportSortTitleFunction"] = function () {
    let div_clone, text_div;
    let style;
    let ea;
    let tempArr;

    //reset
    while (reportScrollBox.firstChild) {
      reportScrollBox.removeChild(reportScrollBox.lastChild);
    }

    ea = "px";

    reportSortTitleTop = GeneralJs.isMac() ? 20 : 24;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "relative",
      top: String(reportSortTitleTop) + ea,
      left: String(28) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = "분류 기준";
    style = {
      position: "absolute",
      fontSize: String(reportFontSize) + ea,
      fontWeight: String(500),
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.appendChild(text_div);

    reportScrollBox.appendChild(div_clone);
    reportTextWidth = text_div.getBoundingClientRect().width;
    reportTextHeight = text_div.getBoundingClientRect().height;
    div_clone.style.width = String(reportTextWidth) + ea;
    div_clone.style.height = String(reportTextHeight) + ea;

    //report sort bar
    div_clone = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(reportSortTitleTop - 1) + ea,
      left: String(28 + reportTextWidth + 12) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }
    text_div = GeneralJs.nodes.div.cloneNode(true);
    text_div.textContent = "|";
    style = {
      position: "absolute",
      fontSize: String(reportFontSize) + ea,
      fontWeight: String(200),
      color: GeneralJs.colorChip.gray4,
    };
    for (let i in style) {
      text_div.style[i] = style[i];
    }
    div_clone.appendChild(text_div);

    reportScrollBox.appendChild(div_clone);
    div_clone.style.width = String(text_div.getBoundingClientRect().width) + ea;
    div_clone.style.height = String(text_div.getBoundingClientRect().height) + ea;

    //report contents
    reportContentsBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      top: String(reportSortTitleTop) + ea,
      left: String(28 + reportTextWidth + 12 + text_div.getBoundingClientRect().width + 25) + ea,
      width: "calc(100% - " + String(28 + reportTextWidth + 12 + text_div.getBoundingClientRect().width + 25 + 28) + ea + ")",
      height: "calc(100% - " + String(reportSortTitleTop * 2) + ea + ")",
      overflow: "scroll",
    };
    for (let i in style) {
      reportContentsBox.style[i] = style[i];
    }

    reportTargetColumn = reportTargetMap[data.mode][0];
    reportTargetColumnTong = [];
    for (let i = 0; i < data.data.length; i++) {
      reportTargetColumnTong.push(data.data[i][reportTargetColumn]);
    }

    reportTargetColumnTong = Array.from(new Set(reportTargetColumnTong));
    reportTargetColumnTong.sort((a, b) => {
      if (a >= b) {
        return -1;
      } else {
        return 1;
      }
    });

    tempArr = [];
    reportTargetNumberValue = 0;
    for (let c of reportTargetColumnTong) {
      tempObj = {};
      reportTargetNumberValue = 0;
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i][reportTargetColumn] === c) {
          reportTargetNumberValue = reportTargetNumberValue + 1;
        }
      }
      tempObj.name = c;
      tempObj.value = reportTargetNumberValue;
      tempObj.eventFunction = function (e) {
        const displayNoneTarget = dataDoms.valueFilter(reportTargetColumn, c, true);
        const displayBlockTarget = dataDoms.valueFilter(reportTargetColumn, c, false);
        for (let z of displayNoneTarget) {
          z.style.display = "none";
        }
        for (let z of displayBlockTarget) {
          z.style.display = "block";
        }
      }
      tempArr.push(tempObj);
    }

    if (reportTargetColumn === "presentationTimes" || reportTargetColumn === "meetingTime") {
      tempArr.sort((a, b) => {
        return ((b.name.slice(0, 5).replace(/[^0-9]/g, '').length === 0) ? 9999999999 : ((b.name.slice(0, 5).replace(/[^0-9]/g, '').length === 2) ? Number(b.name.slice(0, 1) + '0' + b.name.slice(1, 5).replace(/[^0-9]/g, '')) : Number(b.name.slice(0, 5).replace(/[^0-9]/g, '')))) - ((a.name.slice(0, 5).replace(/[^0-9]/g, '').length === 0) ? 9999999999 : ((a.name.slice(0, 5).replace(/[^0-9]/g, '').length === 2) ? Number(a.name.slice(0, 1) + '0' + a.name.slice(1, 5).replace(/[^0-9]/g, '')) : Number(a.name.slice(0, 5).replace(/[^0-9]/g, ''))));
      });
    } else {
      tempArr.sort((a, b) => {
        if (a.name >= b.name) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    reportTargetColumnTong = tempArr;
    reportTargetColumnTong.unshift({
      name: "전체 보기",
      value: null,
      eventFunction: function (e) {
        const displayBlockTarget = dataDoms.valueFilter(reportTargetColumn, "all", false);
        for (let z of displayBlockTarget) {
          z.style.display = "block";
        }
      }
    });

    reportTargetAllBox = GeneralJs.nodes.div.cloneNode(true);
    style = {
      position: "absolute",
      width: String(8000) + ea,
      height: String(100) + '%',
      left: String(0) + ea,
      top: String(0) + ea,
      transition: "all 0s ease",
    };
    for (let i in style) {
      reportTargetAllBox.style[i] = style[i];
    }
    reportContentsBox.appendChild(reportTargetAllBox);
    reportScrollBox.appendChild(reportContentsBox);

    reportScrollBoxTotalWidth = 0;
    for (let i = 0; i < reportTargetColumnTong.length; i++) {
      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("hoverDefault");
      style = {
        display: "inline-block",
        position: "relative",
        height: String(100) + '%',
        width: String(500) + ea,
        marginRight: String(28) + ea,
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }
      text_div = GeneralJs.nodes.div.cloneNode(true);
      if (reportTargetColumnTong[i].value !== null) {
        text_div.insertAdjacentHTML("beforeend", reportTargetColumnTong[i].name + ' : <b style="font-size:' + String(reportFontSize - 2) + ea + ';color:' + GeneralJs.colorChip.green + ';font-weight:500">' + String(reportTargetColumnTong[i].value) + '</b>');
      } else {
        text_div.insertAdjacentHTML("beforeend", reportTargetColumnTong[i].name);
      }
      style = {
        position: "absolute",
        fontSize: String(reportFontSize - 2) + ea,
        fontWeight: String(200),
        color: GeneralJs.colorChip.realBlack,
      };
      for (let i in style) {
        text_div.style[i] = style[i];
      }
      div_clone.appendChild(text_div);
      reportTargetAllBox.appendChild(div_clone);

      reportScrollBoxTotalWidth += text_div.getBoundingClientRect().width + 28 + 2;
      div_clone.style.width = String(text_div.getBoundingClientRect().width) + ea;
      div_clone.addEventListener("click", reportTargetColumnTong[i].eventFunction);
    }

    reportTargetAllBox.style.width = String(reportScrollBoxTotalWidth) + ea;
    GeneralJs.addScrollXEvent(reportContentsBox);

  }

  GeneralJs.stacks.reportSortTitleFunction();

  callback(dataDoms);
}

DesignerJs.prototype.reportViewMakerDetail = function (recycle = false) {
  const instance = this;
  try {
    return function () {
      const searchTarget = instance.searchInput.parentNode;
      const searchTarget_new = searchTarget.cloneNode(true);
      searchTarget.style.opacity = String(0);
      searchTarget_new.style.position = "absolute";
      searchTarget.parentNode.insertBefore(searchTarget_new, instance.searchInput.parentNode.nextElementSibling);
      searchTarget_new.querySelector("input").addEventListener("keypress", function (e) {
        this.value = this.value.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\[\]\{\}\<\>\/\? \n]/g, '').trim();
        if (e.key === "Enter") {
          const finalValue = this.value.replace(/[\~\!\@\#\$\%\^\&\*\(\)\_\[\]\{\}\<\>\/\? \n]/g, '').trim();
          const regexp = new RegExp(finalValue, "gi");
          for (let dom of instance.aspirants) {
            if (!regexp.test(dom.textContent)) {
              dom.style.display = "none";
            } else {
              dom.style.display = "block";
            }
          }
        }
      });
      instance.aspirants_searchInput = searchTarget_new;

      let div_clone, svg_icon;
      let style;
      let ea = "px";
      let margin;
      let domTargets;
      let motherBoo;
      let width;

      motherBoo = (instance.onView === "mother") ? true : false;

      margin = 30;

      if (!recycle) {

        instance.whiteBox = {};

        //cancel box
        div_clone = GeneralJs.nodes.div.cloneNode(true);
        div_clone.classList.add("justfadein");
        style = {
          position: "fixed",
          background: GeneralJs.colorChip.black,
          top: String(0) + ea,
          left: String(motherBoo ? instance.grayBarWidth : 0) + ea,
          width: "calc(100% - " + String(motherBoo ? instance.grayBarWidth : 0) + ea + ")",
          height: "calc(100% - " + String(instance.belowHeight) + ea + ")",
          zIndex: String(2),
        };
        for (let i in style) {
          div_clone.style[i] = style[i];
        }

        div_clone.addEventListener("click", instance.whiteCancelMaker());

        instance.whiteBox.cancelBox = div_clone;
        instance.totalContents.appendChild(div_clone);

      }

      div_clone = GeneralJs.nodes.div.cloneNode(true);
      div_clone.classList.add("fadeup");
      div_clone.classList.add("totalWhite");
      style = {
        position: "fixed",
        background: GeneralJs.colorChip.white,
        top: String(margin) + ea,
        left: String((motherBoo ? instance.grayBarWidth : 0) + margin) + ea,
        borderRadius: String(5) + ea,
        boxShadow: "0 2px 10px -6px " + GeneralJs.colorChip.shadow,
        width: String(window.innerWidth - (motherBoo ? instance.grayBarWidth : 0) - (margin * 2)) + ea,
        height: String(window.innerHeight - instance.belowHeight - (margin * 2) - 10) + ea,
        zIndex: String(2),
      };
      for (let i in style) {
        div_clone.style[i] = style[i];
      }

      width = 50;

      svg_icon = instance.mother.returnLoadingIcon();
      style = {
        width: String(width) + ea,
        height: String(width) + ea,
        top: 'calc(50% - ' + String(width / 2) + ea + ')',
        left: 'calc(50% - ' + String(width / 2) + ea + ')',
      }
      for (let i in style) {
        svg_icon.style[i] = style[i];
      }
      div_clone.appendChild(svg_icon);

      instance.whiteBox.contentsBox = div_clone;
      instance.totalContents.appendChild(div_clone);

      GeneralJs.ajax("mode=total", "/getAspirantReport", function (data) {
        svg_icon.style.opacity = "0";
        instance.reportContents(JSON.parse(data), div_clone, svg_icon);
      });

      GeneralJs.stacks.whiteBox = 0;
    }
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
