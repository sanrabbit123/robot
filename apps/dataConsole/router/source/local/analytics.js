const AnalyticsJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

AnalyticsJs.prototype.baseMaker = function () {
  const instance = this;
  const { createNode, withOut, colorChip, equalJson, isMac } = GeneralJs;
  const { totalContents, ea, belowHeight, matrix } = this;
  let baseMother;
  let margin;
  let baseTong;
  let columnsNumber;
  let columnsMargin;
  let tongs, tong;
  let matrixLength;
  let matrixCopied;
  let fontSize, fontWeight, fontBoldWeight;
  let textTop;
  let boo;
  let grayZoneStandard;

  margin = 40;
  columnsMargin = 8;

  fontSize = 17;
  fontWeight = 400;
  fontBoldWeight = 600;
  textTop = isMac() ? -2 : 0;

  columnsNumber = matrix[0].length;
  matrixLength = matrix.length;
  grayZoneStandard = matrix[0].length - 2;


  matrixCopied = equalJson(JSON.stringify(matrix));

  baseMother = createNode({
    mother: totalContents,
    style: {
      display: "block",
      position: "relative",
      paddingTop: String(margin) + ea,
      width: withOut(0),
      height: withOut(margin + belowHeight, ea),
    }
  });

  baseTong = createNode({
    mother: baseMother,
    style: {
      display: "block",
      position: "relative",
      width: withOut(margin * 2, ea),
      marginLeft: String(margin) + ea,
      marginRight: String(margin) + ea,
      marginBottom: String(margin) + ea,
      height: withOut(margin, ea),
      overflow: "scroll",
    }
  });

  tongs = [];
  for (let i = 0; i < columnsNumber; i++) {
    tong = createNode({
      mother: baseTong,
      attribute: {
        index: String(i),
      },
      style: {
        display: "inline-block",
        position: "relative",
        width: "calc(calc(100% - " + String(columnsMargin * (columnsNumber - 1)) + ea + ") / " + String(columnsNumber) + ")",
        height: withOut(0),
        marginRight: String(i === columnsNumber - 1 ? 0 : columnsMargin) + ea,
      }
    });

    for (let j = 0; j < matrixLength; j++) {

      boo = (j === 0 || i === 0);
      if (j === 0 && i === 0) {
        boo = false;
      }

      createNode({
        mother: tong,
        style: {
          display: "flex",
          width: withOut(0),
          height: "calc(calc(100% - " + String(columnsMargin * (matrixLength - 1)) + ea + ") / " + String(matrixLength) + ")",
          marginBottom: String(j === matrixLength - 1 ? 0 : columnsMargin) + ea,
          borderRadius: String(5) + "px",
          background: boo ? (i === 0 ? colorChip.darkShadow : colorChip.green) : (i < grayZoneStandard ? colorChip.gray1 : colorChip.gray2),
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        children: [
          {
            text: matrixCopied[j][i],
            style: {
              fontSize: String(fontSize) + ea,
              fontWeight: String(boo ? fontBoldWeight : fontWeight),
              color: boo ? colorChip.white : (i >= grayZoneStandard ? colorChip.green : colorChip.black),
              textAlign: "center",
              position: "relative",
              top: String(textTop) + ea,
            },
            bold: {
              color: colorChip.deactive,
              fontWeight: String(300),
            }
          }
        ]
      })
    }

    tongs.push(tong);
  }

}


AnalyticsJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson, dateToString, autoComma } = GeneralJs;
  try {
    let from, to;
    let rows;
    let loading;
    let matrix, tempArr;
    let ago;
    let day;
    let standard;
    let year, month, date;
    let fromDate, toDate;
    let number;
    let target;
    let eventArr;
    let userObj;
    let userArr;
    let consultingArr;
    let popupArr;
    let historyAverageArr;
    let inputArr;
    let loginArr;
    let timeArr;
    let mobileArr;
    let sum, average;
    let userLength;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    loading = await this.mother.loadingRun();

    day = 7;

    to = new Date();
    to.setDate(to.getDate() - 1);
    to.setHours(23);
    to.setMinutes(59);
    to.setSeconds(59);

    from = new Date();
    from.setDate(from.getDate() - day);
    from.setHours(0);
    from.setMinutes(0);
    from.setSeconds(0);

    to = dateToString(to, true);
    from = dateToString(from, true);

    rows = await ajaxJson({ mode: "raw", from, to }, LOGHOST + "/extractLog", { equal: true })

    ago = new Date();
    ago.setDate(ago.getDate() - day);

    matrix = [];

    // date string
    tempArr = [];
    standard = [];
    for (let i = 0; i < day; i++) {
      tempArr.push(dateToString(ago));
      standard.push(dateToString(ago));
      ago.setDate(ago.getDate() + 1);
    }
    tempArr.push("총합");
    tempArr.push("평균");
    tempArr.unshift("-");
    matrix.push(tempArr);

    // event, user
    eventArr = [];
    userArr = [];
    historyAverageArr = [];
    consultingArr = [];
    popupArr = [];
    inputArr = [];
    loginArr = [];
    timeArr = [];
    mobileArr = [];
    for (let str of standard) {
      [ year, month, date ] = str.split('-');
      year = Number(year);
      month = Number(month) - 1;
      date = Number(date);

      fromDate = new Date(year, month, date, 0, 0, 0);
      toDate = new Date(year, month, date, 23, 59, 59);

      number = 0;
      target = [];
      for (let row of rows) {
        if (fromDate.valueOf() <= row.date.now.valueOf() && row.date.now.valueOf() <= toDate.valueOf()) {
          target.push(row);
          number++;
        }
      }
      eventArr.push(number);

      userObj = {};
      for (let row of target) {
        if (userObj[row.data.id] === undefined) {
          userObj[row.data.id] = [];
        }
        userObj[row.data.id].push(row);
      }

      userLength = Object.keys(userObj).length;

      if (userLength !== 0) {
        userArr.push(userLength);
        timeArr.push(Math.round(Object.values(userObj).map((arr) => {
          if (arr.length === 1) {
            return 0;
          } else {
            arr.sort((a, b) => { return a.date.now.valueOf() - b.date.now.valueOf() });
            return Math.round((((arr[arr.length - 1].date.now.valueOf() - arr[0].date.now.valueOf()) / 1000) / 60) * 100) / 100;
          }
        }).reduce((curr, acc) => { return curr + acc }, 0) / userLength))
        mobileArr.push(Math.round((Object.values(userObj).filter((arr) => { return arr[0].network.mobile }).length * 100) / userLength));
        historyAverageArr.push(Math.floor(Object.values(userObj).map((arr) => { return arr.length }).reduce((curr, acc) => { return curr + acc }, 0) / userLength));
      } else {
        userArr.push(0);
        timeArr.push(0);
        mobileArr.push(0);
        historyAverageArr.push(0);
      }
      consultingArr.push(target.filter((obj) => { return obj.data.page === "clientConsulting" && obj.data.action === "pageInit"; }).length);
      popupArr.push(target.filter((obj) => { return obj.data.action === "popupOpen"; }).length);
      inputArr.push(Object.values(userObj).filter((arr) => { return arr.map((obj) => { return obj.data.action }).includes("inputBlur") }).length);
      loginArr.push(target.filter((obj) => { return obj.data.action === "login"; }).length);

    }

    sum = eventArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / eventArr.length);
    eventArr.push(sum);
    eventArr.push(average);
    eventArr.unshift("이벤트");

    sum = userArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / userArr.length);
    userArr.push(sum);
    userArr.push(average);
    userArr.unshift("사용자");

    sum = timeArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / timeArr.length);
    timeArr.push('-');
    timeArr.push(average);
    timeArr.unshift("평균 시간");

    sum = mobileArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / mobileArr.length);
    mobileArr.push('-');
    mobileArr.push(average);
    mobileArr.unshift("모바일 비율");

    sum = historyAverageArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / historyAverageArr.length);
    historyAverageArr.push('-');
    historyAverageArr.push(average);
    historyAverageArr.unshift("평균 이벤트");

    sum = consultingArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / consultingArr.length);
    consultingArr.push(sum);
    consultingArr.push(average);
    consultingArr.unshift("신청 페이지");

    sum = popupArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / popupArr.length);
    popupArr.push(sum);
    popupArr.push(average);
    popupArr.unshift("신청 팝업");

    sum = inputArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / inputArr.length);
    inputArr.push(sum);
    inputArr.push(average);
    inputArr.unshift("작성");

    sum = loginArr.reduce((curr, acc) => { return curr + acc }, 0);
    average = Math.round(sum / loginArr.length);
    loginArr.push(sum);
    loginArr.push(average);
    loginArr.unshift("문의");

    matrix.push(eventArr.map((number) => { return typeof number === "number" ? `${autoComma(number)} <b%회%b>` : number; }));
    matrix.push(userArr.map((number) => { return typeof number === "number" ? `${autoComma(number)} <b%명%b>` : number; }));
    matrix.push(timeArr.map((number) => { return typeof number === "number" ? `${String(number)} <b%분%b>` : number; }));
    matrix.push(mobileArr.map((number) => { return typeof number === "number" ? `${String(number)} <b%%%b>` : number; }));
    matrix.push(historyAverageArr.map((number) => { return typeof number === "number" ? `${autoComma(number)} <b%회%b>` : number; }));
    matrix.push(consultingArr.map((number) => { return typeof number === "number" ? `${autoComma(number)} <b%회%b>` : number; }));
    matrix.push(popupArr.map((number) => { return typeof number === "number" ? `${autoComma(number)} <b%회%b>` : number; }));
    matrix.push(inputArr.map((number) => { return typeof number === "number" ? `${autoComma(number)} <b%명%b>` : number; }));
    matrix.push(loginArr.map((number) => { return typeof number === "number" ? `${autoComma(number)} <b%명%b>` : number; }));

    this.from = from;
    this.to = to;
    this.rows = rows;
    this.matrix = matrix;

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

    loading.parentElement.removeChild(loading);

    this.baseMaker();

  } catch (e) {
    console.log(e);
  }
}
