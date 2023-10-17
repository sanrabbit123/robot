const MprJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.module = {};
  this.module.paddingTop = 38;
  this.module.height = <%% 18, 16, 16, 16, 18 %%>;
  this.module.marginBottom = 18;
  this.module.initialLine = 14;
  this.module.initialMargin = 14;

  this.grayBarWidth = null;
  this.belowHeight = null;
  this.whiteBox = null;
  this.standardDoms = [];
  this.caseDoms = [];
  this.cases = [];
  this.totalMother = null;
  this.totalFather = null;
  this.totalFatherChildren = [];
  this.onView = "mother";
  this.whiteConvert = 0;
  this.whiteMatrixA = null;
  this.whiteMatrixB = null;
  this.aspirants = [];
  this.aspirants_searchInput = null;
  this.whiteSse = null;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
  this.designers = [];
}

MprJs.prototype.reportWhite = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight, entireMode } = this;
  const { titleButtonsClassName, whiteCardClassName, whiteBaseClassName } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, cleanChildren, setQueue, blankHref, ajaxJson, autoComma, zeroAddition, chartJsPatch, serviceParsing } = GeneralJs;
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
      let margin;
      let titleHeight;
      let innerMargin;
      let overlap;
      let titleTextTop, titleSize;
      let titleWeight;
      let fontTextTop, fontSize, fontBetween, fontWeight;
      let whiteReportMaker;
      let scrollBox;
      let titleArea;
      let today;
      let ago;
      let agoDate;
      let loading;
      let loadingWidth;
      let startPaddingTop;
      let inputWidth, inputSize, inputWeight;
      let subTodaySize, subTodayWeight;
      let dataLoad;
      let fromDate, toDate;
      let chartBetween;
      let chartHeight;
      let style;
      let todayRange;
      let todayString;
      let dateInput;
      let inputBottom;
      let middleTitleHeight;
      let previousToDate;

      toDate = new Date();
      previousToDate = new Date();
      previousToDate.setDate(previousToDate.getDate() - 1);
      ago = 21;
      fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - ago);

      margin = entireMode ? 0 : 30;
      titleHeight = 84;
      innerMargin = 36;
      overlap = 12;

      titleTextTop = isMac() ? 2 : 0;
      titleSize = 18;
      titleWeight = 800;
      middleTitleHeight = 32;

      fontTextTop = isMac() ? 1 : 0;
      fontSize = 14;
      fontBetween = 8;
      fontWeight = 400;

      loadingWidth = 48;

      inputWidth = 500;
      inputSize = 29;
      inputWeight = 200;

      subTodaySize = 15;
      subTodayWeight = 500;

      chartBetween = 40;
      chartHeight = 480;

      startPaddingTop = 40;
      inputBottom = 8;

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
              left: String(0) + ea,
              width: withOut(0, ea),
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
            left: String(0 + margin) + ea,
            width: withOut((margin * 2) + 0, ea),
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
                let endPreviousDay;

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

                endPreviousDay = stringToDate(endDay);
                endPreviousDay.setDate(endPreviousDay.getDate() - 1);
                chartJsPatch([
                  { data: { mode: "daily", fromDate: stringToDate(startDay), toDate: endPreviousDay }, url: LOGHOST + "/extractAnalytics" },
                  { data: { mode: "charge", fromDate: stringToDate(startDay), toDate: endPreviousDay }, url: LOGHOST + "/extractAnalytics" },
                  { data: { mode: "basic", fromDate: stringToDate(startDay), toDate: endPreviousDay }, url: BACKHOST + "/extractAnalytics" },
                  { data: { fromDate: stringToDate(startDay), toDate: stringToDate(endDay) }, url: S3HOST + ":3000/complexReport" },
                ]).then(dataLoad(loading)).catch((err) => {
                  console.log(err);
                });

              }
            }
          },
          mother: titleArea,
          style: {
            position: "absolute",
            left: String(0) + ea,
            bottom: String(inputBottom) + ea,
            width: String(inputWidth) + ea,
            fontSize: String(inputSize) + ea,
            fontWeight: String(inputWeight),
            border: String(0) + ea,
            outline: String(0) + ea,
            color: colorChip.black,
          }
        });
        dateInput.value = todayRange;

        createNode({
          mother: titleArea,
          text: "리포트 전환",
          event: {
            click: function (e) {
              if (typeof globalThis.window.parent.postMessage === "function") {
                globalThis.window.parent.postMessage(JSON.stringify({
                  target: "first",
                  report: "reset",
                }), "*");
              }
            }
          },
          style: {
            position: "absolute",
            fontSize: String(subTodaySize) + ea,
            fontWeight: String(subTodayWeight) + ea,
            right: String(0) + ea,
            bottom: String(inputBottom) + ea,
            color: colorChip.green,
            cursor: "pointer",
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
          return (result) => {

            loading.remove();
            cleanChildren(scrollBox);

            [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                },
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "페이지뷰, 유저수, 전환수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수, 전환수, 문의수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 - 오가닉 / 광고 / SNS / 다이렉트",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 - 네이버 유입 / 메타 유입 / 구글 유입",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "전환수 - 오가닉 / 광고 / SNS / 다이렉트",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "페이지뷰 기기 비율 - 모바일 / 데스트탑 / 태블릿",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "문의수, 추천수, 계약수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "유저수 / 20, 문의수, 계약수",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginRight: String(chartBetween) + ea,
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "광고 비용 - 네이버 / 메타 / 구글",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                  marginBottom: String(chartBetween) + ea,
                  verticalAlign: "top",
                },
                child: {
                  mode: "canvas",
                  style: {
                    display: "block",
                    position: "relative",      
                  },
                  previous: {
                    text: "광고 클릭 - 네이버 / 메타 / 구글",
                    style: {
                      display: "flex",
                      position: "relative",
                      fontSize: String(titleSize) + ea,
                      fontWeight: String(titleWeight),
                      color: colorChip.black,
                      top: String(titleTextTop) + ea,
                      justifyContent: "center",
                      alignItems: "start",
                      height: String(middleTitleHeight) + ea,
                    }
                  }
                }
              },
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  verticalAlign: "top",
                  marginBottom: String(chartBetween) + ea,
                },
              },
            ].forEach((obj) => {
              obj.mother = scrollBox;
              createNode(obj);
            });

            const [ rows, charge, basic, complex ] = result;
            const { contractDetail } = complex;

            rows.sort((a, b) => { return a.date.from.valueOf() - b.date.from.valueOf() });
            charge.sort((a, b) => { return a.date.from.valueOf() - b.date.from.valueOf() });
            basic.sort((a, b) => { return a.fromDate.valueOf() - b.fromDate.valueOf() });

            const type = "line";
            const labels = rows.map((o) => { return dateToString(o.date.from).slice(5) });
            const fill = false;
            const tension = 0.3;
            const borderJoinStyle = "round";
            const complexBoxesLength = 1;
            const visualDivide = 3;
            const visualDivideBlock = 4;
            const visualDivideFinal = 1;
            const detailBlockWidth = 60;
            const detailNormalWidth = 120;
            const detailServiceWidth = 162;
            const detailDoubleBlockWidth = 220;
            const nameBlockWidth = 200;
            const barWidth = 38;
            const contentsLongWidth = 3000;
            const detailBlockHeight = 30;
            const detailBlockSize = 16;
            let naverAds, metaAds, googleAds;
            let complexMother;
            let summaryMother;
            let contractBlockMother;
            let detailValueInjection;
            let totalWidth;
    
            // 0 - complex report
            complexMother = scrollBox.children[0];

            // 0 - 1
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "문의수",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.clients),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "추천수",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.proposal),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "계약수",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.contracts),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "계약 성공",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.contractsSuccess),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "계약 금액",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
              },
              child: {
                text: autoComma(complex.contractsSupply) + "원",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });

            // 0 - 2
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "광고 노출",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.impressions),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "광고 클릭",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.clicks),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "MAU",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.mau),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "페이지뷰",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: String(complex.pageViews),
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10)",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: "광고 비용",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });
            createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(calc(100% - " + String(chartBetween * (10 - 1)) + ea + ") / 10) + " + String(chartBetween) + ea + ")",
                marginBottom: String(chartBetween / visualDivideFinal) + ea,
                verticalAlign: "top",
              },
              child: {
                text: autoComma(complex.charge) + "원",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(200),
                  color: colorChip.green,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });

            // 0 - 12

            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "지역별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.region.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.region.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.region.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "준공년차 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.old.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.old.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.old.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "평형별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.pyeong.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.pyeong.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.pyeong.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "방 개수별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.room.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.room.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.room.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "예산별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.budget.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.budget.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.budget.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "계약 형태별 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.contract.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.contract.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.contract.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "소스별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.source.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.source.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.source.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "광고 여부 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.ad.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.ad.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.ad.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "디바이스별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.device.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.device.map((o) => { return o.value }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.device.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "거주중별 문의수, 계약수",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.living.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.living.map((o) => { return o.value }),
                    borderColor: colorChip.green,
                    backgroundColor: colorChip.green,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.living.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginRight: String(chartBetween) + ea,
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "층별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.floor.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.floor.map((o) => { return o.value }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.floor.map((o) => { return o.contract }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });
            new window.Chart((createNode({
              mother: complexMother,
              style: {
                display: "inline-block",
                position: "relative",
                width: "calc(calc(100% - " + String(chartBetween) + ea + ") / 2)",
                marginBottom: String(chartBetween) + ea,
                verticalAlign: "top",
              },
              child: {
                mode: "canvas",
                style: {
                  display: "block",
                  position: "relative",      
                },
                previous: {
                  text: "세대 규모별 문의자, 계약자",
                  style: {
                    display: "flex",
                    position: "relative",
                    fontSize: String(titleSize) + ea,
                    fontWeight: String(titleWeight),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    justifyContent: "center",
                    alignItems: "start",
                    height: String(middleTitleHeight) + ea,
                  }
                }
              }
            })).querySelector("canvas"), {
              type: "bar",
              data: {
                labels: complex.graph.household.map((o) => { return o.case }),
                datasets: [
                  {
                    axis: 'y',
                    label: "문의자",
                    data: complex.graph.household.map((o) => { return o.value }),
                    borderColor: colorChip.gray4,
                    backgroundColor: colorChip.gray4,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    axis: 'y',
                    label: "계약자",
                    data: complex.graph.household.map((o) => { return o.contract }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                indexAxis: 'y',
              }
            });

            // 1
            new window.Chart(scrollBox.children[complexBoxesLength + 0].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users",
                    data: rows.map((o) => { return o.data.users.total }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Views",
                    data: rows.map((o) => { return o.data.views.total }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Conversion",
                    data: rows.map((o) => { return o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total }),
                    borderColor: colorChip.purple,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 2
            new window.Chart(scrollBox.children[complexBoxesLength + 1].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users",
                    data: rows.map((o) => { return o.data.users.total }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Conversion",
                    data: rows.map((o) => { return o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total }),
                    borderColor: colorChip.purple,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 3
            new window.Chart(scrollBox.children[complexBoxesLength + 2].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Organic",
                    data: rows.map((o) => { return o.data.users.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Ads",
                    data: rows.map((o) => { return o.data.users.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Sns",
                    data: rows.map((o) => { return o.data.users.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Direct",
                    data: rows.map((o) => { return o.data.users.total - (o.data.users.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (o.data.users.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 4
            new window.Chart(scrollBox.children[complexBoxesLength + 3].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: rows.map((o) => { return o.data.users.detail.source.cases.filter((c) => { return /naver/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: rows.map((o) => { return o.data.users.detail.source.cases.filter((c) => { return /instagram/gi.test(c.case) || /facebook/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: rows.map((o) => { return o.data.users.detail.source.cases.filter((c) => { return /google/gi.test(c.case) || /youtube/gi.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // 5
            new window.Chart(scrollBox.children[complexBoxesLength + 4].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Organic",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.red,
                    backgroundColor: colorChip.red,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Ads",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && !/^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.yellow,
                    backgroundColor: colorChip.yellow,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Sns",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return (c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)") && /^link/.test(c.case) }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Direct",
                    data: rows.map((o) => { return (o.data.conversion.consultingPage.total + o.data.conversion.popupOpen.total) - (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case === "(organic)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) - (o.data.conversion.consultingPage.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0) + o.data.conversion.popupOpen.detail.campaign.cases.filter((c) => { return c.case !== "(direct)" && c.case !== "(organic)" && c.case !== "(referral)" && c.case !== "(not set)" }).reduce((acc, curr) => { return acc + curr.value }, 0)) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 6
            new window.Chart(scrollBox.children[complexBoxesLength + 5].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Mobile",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "mobile" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Desktop",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "desktop" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.black,
                    backgroundColor: colorChip.black,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Tablet",
                    data: rows.map((o) => { return o.data.views.detail.deviceCategory.cases.filter((c) => { return c.case === "tablet" }).reduce((acc, curr) => { return acc + curr.value }, 0) }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    beginAtZero: true,
                    stacked: true,
                  }
                }
              }
            });
  
            // 7
            new window.Chart(scrollBox.children[complexBoxesLength + 6].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Recommend",
                    data: basic.map((o) => { return o.recommend }),
                    borderColor: colorChip.black,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Contracts",
                    data: basic.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 8
            new window.Chart(scrollBox.children[complexBoxesLength + 7].querySelector("canvas"), {
              type,
              data: {
                labels,
                datasets: [
                  {
                    label: "Users / 20",
                    data: rows.map((o) => { return o.data.users.total / 20 }),
                    borderColor: colorChip.red,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Clients",
                    data: basic.map((o) => { return o.client }),
                    borderColor: colorChip.green,
                    fill, tension, borderJoinStyle,
                  },
                  {
                    label: "Contracts",
                    data: basic.map((o) => { return o.contract }),
                    borderColor: colorChip.yellow,
                    fill, tension, borderJoinStyle,
                  },
                ]
              },
            });
  
            // 9
            naverAds = [];
            metaAds = [];
            googleAds = [];
            for (let { date: { from, to } } of rows) {
              naverAds.push(charge.filter((o) => {
                return /naver/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0
              }));
  
              metaAds.push(charge.filter((o) => {
                return /facebook/gi.test(o.information.mother) || /instagram/gi.test(o.information.mother) || /meta/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0
              }));
  
              googleAds.push(charge.filter((o) => {
                return /google/gi.test(o.information.mother);
              }).filter((o) => {
                return o.date.from.valueOf() >= from.valueOf() && o.date.to.valueOf() <= to.valueOf();
              }).reduce((acc, curr) => {
                return {
                  charge: acc.charge + curr.value.charge,
                  clicks: acc.clicks + curr.value.performance.clicks,
                  impressions: acc.impressions + curr.value.performance.impressions,
                }
              }, {
                charge: 0,
                clicks: 0,
                impressions: 0
              }));
  
            }
            new window.Chart(scrollBox.children[complexBoxesLength + 8].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: naverAds.map((o) => { return o.charge }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: metaAds.map((o) => { return o.charge }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: googleAds.map((o) => { return o.charge }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // 10
            new window.Chart(scrollBox.children[complexBoxesLength + 9].querySelector("canvas"), {
              type: "bar",
              data: {
                labels,
                datasets: [
                  {
                    label: "Naver",
                    data: naverAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.softGreen,
                    backgroundColor: colorChip.softGreen,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Meta",
                    data: metaAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.purple,
                    backgroundColor: colorChip.purple,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                  {
                    label: "Google",
                    data: googleAds.map((o) => { return o.clicks }),
                    borderColor: colorChip.gray3,
                    backgroundColor: colorChip.gray3,
                    borderRadius: 3,
                    borderWidth: 0,
                  },
                ]
              },
              options: {
                scales: {
                  y: {
                    beginAtZero: true,
                  }
                }
              }
            });
  
            // contracts detail    
            summaryMother = scrollBox.lastChild;

            createNode({
              mother: summaryMother,
              style: {
                display: "block",
                position: "relative",
                width: withOut(0, ea),
                marginBottom: String(chartBetween / visualDivide) + ea,
                verticalAlign: "top",
                borderBottom: "1px solid " + colorChip.gray3,
              },
              child: {
                text: "계약자 상세 (" + String(contractDetail.length) + "명)",
                style: {
                  display: "flex",
                  position: "relative",
                  fontSize: String(titleSize) + ea,
                  fontWeight: String(800),
                  color: colorChip.black,
                  top: String(titleTextTop) + ea,
                  justifyContent: "start",
                  alignItems: "start",
                  height: String(middleTitleHeight) + ea,
                }
              }
            });

            detailValueInjection = (contractBlockMother, value, width) => {
              createNode({
                mother: contractBlockMother,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: typeof width === "number" ? String(width) + ea : width,
                  height: String(detailBlockHeight) + ea,
                  overflow: "scroll",
                },
                child: {
                  text: value,
                  style: {
                    position: "relative",
                    fontSize: String(detailBlockSize) + ea,
                    fontWeight: String(300),
                    color: colorChip.green,
                    top: String(titleTextTop) + ea,
                    width: String(contentsLongWidth) + ea,
                  }
                }
              });
              if (typeof width === "number") {
                createNode({
                  mother: contractBlockMother,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    width: String(barWidth) + ea,
                    height: String(detailBlockHeight) + ea,
                    overflow: "scroll",
                  },
                  child: {
                    text: "|",
                    style: {
                      position: "relative",
                      fontSize: String(detailBlockSize) + ea,
                      fontWeight: String(200),
                      color: colorChip.gray3,
                      top: String(titleTextTop) + ea,
                      width: String(contentsLongWidth) + ea,
                    }
                  }
                });
              }
              return width + barWidth;
            }

            for (let contractClient of contractDetail) {

              // mother
              contractBlockMother = createNode({
                mother: summaryMother,
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                  marginBottom: String(chartBetween / visualDivideBlock) + ea,
                  verticalAlign: "top",
                },
              });

              // name
              createNode({
                mother: contractBlockMother,
                style: {
                  display: "inline-block",
                  position: "relative",
                  width: String(nameBlockWidth) + ea,
                  height: String(detailBlockHeight) + ea,
                  overflow: "scroll",
                },
                child: {
                  text: contractClient.name + "(" + contractClient.cliid + ")",
                  style: {
                    position: "relative",
                    fontSize: String(detailBlockSize) + ea,
                    fontWeight: String(600),
                    color: colorChip.black,
                    top: String(titleTextTop) + ea,
                    width: String(contentsLongWidth) + ea,
                  }
                }
              });

              // values
              totalWidth = nameBlockWidth;
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.region, detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, (contractClient.summary.naverObject === null ? "알 수 없음" : contractClient.summary.naverObject.name), detailDoubleBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.howLong, detailNormalWidth);
              totalWidth += detailValueInjection(contractBlockMother, String(contractClient.summary.pyeong) + "평", detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.living, detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.contract, detailBlockWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.budget.replace(/ 이상/gi, ""), detailNormalWidth);
              totalWidth += detailValueInjection(contractBlockMother, serviceParsing(contractClient.thisProject.service).replace(/[a-zA-Z]/gi, '').trim(), detailServiceWidth);
              totalWidth += detailValueInjection(contractBlockMother, contractClient.summary.ad.replace(/ 유입/gi, ""), detailBlockWidth);
              detailValueInjection(contractBlockMother, contractClient.family, withOut(totalWidth, ea));

            }

          }
        }

        chartJsPatch([
          { data: { mode: "daily", fromDate, toDate: previousToDate }, url: LOGHOST + "/extractAnalytics" },
          { data: { mode: "charge", fromDate, toDate: previousToDate }, url: LOGHOST + "/extractAnalytics" },
          { data: { mode: "basic", fromDate, toDate: previousToDate }, url: BACKHOST + "/extractAnalytics" },
          { data: { fromDate, toDate }, url: S3HOST + ":3000/complexReport" },
        ]).then(dataLoad(loading)).catch((err) => {
          console.log(err);
        });

      }

      if (document.querySelector('.' + whiteCardClassName) === null) {
        whiteReportMaker(fromDate, toDate, false);
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
            whiteReportMaker(fromDate, toDate, true);
          })
        }, 350);
      }

    } catch (e) {
      console.log(e);
    }
  }
}

MprJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, ajaxJson } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true" && getObj.dataonly === "true");
    let loading;
    let members;
    let ago;
    let clients;

    this.grayBarWidth = this.mother.grayBarWidth;
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    this.grayBarWidth = <%% 210, 200, 200, 200, 0 %%>;
    this.mother.grayBarWidth = <%% 210, 200, 200, 210, 0 %%>;

    if (getObj.dataonly === "true") {
      this.belowHeight = this.mother.belowHeight = 0;
      this.grayBarWidth = this.mother.grayBarWidth = 0;
    }

    document.getElementById("grayLeftOpenButton").remove();

    loading = await this.mother.loadingRun();
    ago = new Date();
    ago.setMonth(ago.getMonth() - 12);

    clients = await ajaxJson({ mode: "get", whereQuery: {
      "client.requests": {
        $elemMatch: {
          "request.timeline": { $gte: ago }
        }
      }
    }, projectQuery: {
      "client": 1,
    } }, CONTENTSHOST + "/clientAnalytics", { equal: true });

    members = await ajaxJson({ type: "get" }, BACKHOST + "/getMembers", { equal: true });

    this.members = members;
    this.clients = clients;
    this.valueTargetClassName = "valueTargetClassName";
    this.valueCaseClassName = "valueCaseClassName";
    this.standardCaseClassName = "standardCaseClassName";
    this.idNameAreaClassName = "idNameAreaClassName";
    this.valueAreaClassName = "valueAreaClassName";
    this.titleButtonsClassName = "titleButtonsClassName";
    this.whiteCardClassName = "whiteCardClassName";
    this.whiteBaseClassName = "whiteBaseClassName";
    this.processDetailEventClassName = "processDetailEventClassName";
    this.whiteCardMode = "aspirant";
    this.asyncProcessText = "로드중..";
    this.entireMode = entireMode;


    // await this.mprBase();
    // await (this.reportWhite())();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
