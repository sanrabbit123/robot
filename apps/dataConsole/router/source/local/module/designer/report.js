DesignerJs.prototype.reportDataRendering = async function (desid) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  try {
    const { ajaxJson, dateToString, autoComma } = GeneralJs;
    const today = new Date();
    const yearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
    const fourYearsAgo = new Date(today.getFullYear() - 4, today.getMonth(), today.getDate());
    const emptyDate = new Date(1800, 0, 1);
    const emptyDateValue = (new Date(2000, 0, 1)).valueOf();
    const reverseMatrix = function (matrix) {
      if (!Array.isArray(matrix)) {
        throw new Error("must be 2 matrix");
      }
      let length = null;
      for (let arr of matrix) {
        if (!Array.isArray(arr)) {
          throw new Error("invaild matrix");
        }
        if (length !== null) {
          if (length !== arr.length) {
            throw new Error("invaild matrix");
          }
        }
        length = arr.length;
      }
      if (length === null) {
        return [];
      }
      let tong;
      let tempArr;
      tong = [];
      for (let i = 0; i < length; i++) {
        tempArr = [];
        for (let arr of matrix) {
          tempArr.push(arr[i]);
        }
        tong.push(tempArr);
      }
      return tong;
    }
    const service = [
      { serid: "s2011_aa01s", column: "homeFurnishing", name: "홈퍼니싱", id: 'F' },
      { serid: "s2011_aa02s", column: "homeStyling", name: "홈스타일링", id: 'S' },
      { serid: "s2011_aa03s", column: "totalStyling", name: "토탈 스타일링", id: 'T' },
      { serid: "s2011_aa04s", column: "architecture", name: "설계 변경", id: 'XT' }
    ];
    const xValueMap = { "M": "mini", "B": "basic", "P": "premium" };
    const { projects: allProjects, clients, contentsArr, price } = await ajaxJson({ desid }, "/getDesignerReport", { equal: true });
    class DesignerReports extends Array {
      constructor(arr, projects, price) {
        super();
        if (!Array.isArray(arr) || projects === undefined || price === undefined) {
          throw new Error("invaild input");
        }
        this.projects = projects;
        this.price = price;
        for (let i of arr) {
          if (!(i instanceof DesignerReport)) {
            throw new Error("child must be DesignerReport type");
          }
          this.push(i);
        }
      }
      pick(q) {
        if (typeof q !== "string") {
          throw new Error("invaild input");
        }
        let result;
        result = null;
        if (/^d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]$/.test(q)) {
          for (let obj of this) {
            if (obj.desid === q) {
              result = obj;
              break;
            }
          }
        } else {
          for (let obj of this) {
            if ((new RegExp(q, "gi")).test(obj.designer.designer)) {
              result = obj;
              break;
            }
          }
        }
        return result;
      }
    }
    class DesignerReport {
      constructor(designer, projects, price) {
        if (designer === undefined || projects === undefined || price === undefined) {
          throw new Error("invaild input");
        }
        this.designer = designer;
        this.projects = projects;
        this.price = price;
      }
      timeSplit() {
        const { proposal, contract, price, contents } = this;
        const today = new Date();
        const timeHalfConst = "반기";
        const timeHalfArr = [ "상", "하" ];
        const timeHalfToken = [ 30000, 60000 ];
        const service = [
          { serid: "s2011_aa01s", column: "homeFurnishing", name: "홈퍼니싱", id: 'F' },
          { serid: "s2011_aa02s", column: "homeStyling", name: "홈스타일링", id: 'S' },
          { serid: "s2011_aa03s", column: "totalStyling", name: "토탈 스타일링", id: 'T' },
          { serid: "s2011_aa04s", column: "architecture", name: "설계 변경", id: 'XT' }
        ];
        const proposalConst = {
          width: [
            50,
            50,
            50,
            72,
            60,
            120,
            120,
            64,
            110,
            72,
            60,
            60,
          ],
          columns: [
            'E',
            'Y',
            'H',
            "고객",
            "서비스",
            "제안 날짜",
            "제안 금액",
            "평수",
            "평단가",
            "방식",
            "부분",
            "계약",
          ],
          type: [
            "number",
            "number",
            "number",
            "string",
            "string",
            "string",
            "number",
            "string",
            "number",
            "string",
            "string",
            "string",
          ],
          middle: [
            true,
            true,
            true,
            true,
            false,
            true,
            true,
            false,
            false,
            true,
            true,
            true
          ]
        };
        const contractConst = {
          width: [
            50,
            50,
            50,
            72,
            60,
            110,
            110,
            72,
            50,
            120,
            70,
            120,
            64,
            110,
            110,
            110,
          ],
          columns: [
            'E',
            'Y',
            'H',
            "고객",
            "서비스",
            "시작일",
            "종료일",
            "방식",
            "부분",
            "정산 금액",
            "수수료",
            "제안 금액",
            "평수",
            "평단가",
            "선금 정산일",
            "잔금 정산일",
          ],
          type: [
            "number",
            "number",
            "number",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
            "number",
            "string",
            "number",
            "string",
            "number",
            "string",
            "string",
          ],
          middle: [
            true,
            true,
            true,
            true,
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            false,
            false,
            true,
            true
          ]
        };
        const priceConst = {
          width: [
            50,
            150,
            130,
            130,
            130,
            130,
            130,
            130,
            130,
            130,
          ],
          columns: [
            "추가값",
            "서비스명",
            "0 - 8",
            "9 - 14",
            "15 - 22",
            "23 - 29",
            "30 - 33",
            "34 - 38",
            "39 - 44",
            "44 - 999",
          ],
          type: [
            "string",
            "string",
            "number",
            "number",
            "number",
            "number",
            "number",
            "number",
            "number",
            "number",
          ],
          middle: [
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
          ]
        };
        const contentsConst = {
          width: [
            50,
            50,
            50,
            72,
            72,
            72,
            110,
            110,
            360,
            360
          ],
          columns: [
            'E',
            'Y',
            'H',
            "종류",
            "고객",
            "아이디",
            "발행일",
            "고객 후기",
            "포트폴리오 링크",
            "고객 후기 링크"
          ],
          type: [
            "number",
            "number",
            "number",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string",
            "string"
          ],
          middle: [
            true,
            true,
            true,
            true,
            true,
            false,
            true,
            true,
            true,
            false
          ]
        };
        const homepage = "https://home-liaison.com";
        const portfolioPath = "/portdetail.php";
        const reviewPath = "/revdetail.php";
        class TimeArray extends Array {
          setWidth(width) {
            if (!Array.isArray(width)) {
              throw new Error("invaild input");
            }
            this.width = width;
          }
          setColumns(columns) {
            if (!Array.isArray(columns)) {
              throw new Error("invaild input");
            }
            this.columns = columns;
          }
          setTypeArr(type) {
            if (!Array.isArray(type)) {
              throw new Error("invaild input");
            }
            this.typeArr = type;
          }
          setProperty(name, value) {
            this[name] = value;
          }
          setType(type) {
            const types = [ "timeMatrix", "generalMatrix" ];
            if (!types.includes(type)) {
              console.log(type);
              throw new Error("invaile type : 'timeMatrix' or 'generalMatrix'");
            }
            this.type = type;
          }
          intoSheetsMatrix(resultMode = false) {
            if (this.typeArr === undefined || this.columns === undefined || this.typeArr === undefined) {
              throw new Error("set first");
            }
            if (this.type !== "timeMatrix" && this.type !== "generalMatrix") {
              console.log(this.type);
              throw new Error("invaile type : 'timeMatrix' or 'generalMatrix'");
            }
            const { type, columns, typeArr } = this;
            const resultTargets = [ "year", "total" ];
            let matrix, tempArr;
            matrix = [];
            if (type === "timeMatrix") {

              if (!resultMode) {

                tempArr = [ "시간" ];
                for (let i of columns) {
                  tempArr.push(i);
                }
                matrix.push(tempArr);
                for (let obj of this) {
                  for (let i = 0; i < obj.matrix.length; i++) {
                    tempArr = [ (i === 0 ? obj.name : "") ];
                    for (let j = 0; j < obj.matrix[i].length; j++) {
                      if (typeArr[j] === "number") {
                        tempArr.push(Number(String(obj.matrix[i][j]).replace(/[^0-9\.\-]/g, '')));
                      } else if (typeArr[j] === "string") {
                        tempArr.push(String(obj.matrix[i][j]));
                      } else {
                        throw new Error("invaild type");
                      }
                    }
                    matrix.push(tempArr);
                  }
                  tempArr = columns.map((z) => { return ''; });
                  tempArr.unshift('');
                  matrix.push(tempArr);
                }

              } else {

                if (this.result !== undefined && this.result !== null) {

                  for (let i = 0; i < this.result["words"].length; i++) {
                    tempArr = [ this.result["words"][i].name ];
                    for (let j = 0; j < this.result["words"][i].values.length; j++) {
                      tempArr.push(Number(String(this.result["words"][i].values[j].value).replace(/[^0-9\.\-]/g, '')));
                    }
                    matrix.push(tempArr);
                  }

                  if (matrix.length > 0) {
                    tempArr = [ "시간" ];
                    for (let i = 0; i < this.result["words"][0].values.length; i++) {
                      tempArr.push(this.result["words"][0].values[i].name);
                    }
                    matrix.unshift(tempArr);
                    matrix.push(matrix[0].map((z) => { return ''; }));

                    for (let w of resultTargets) {
                      for (let i = 0; i < this.result[w].words.length; i++) {
                        tempArr = [ this.result[w].words[i].name ];
                        for (let j = 0; j < this.result[w].words[i].values.length; j++) {
                          tempArr.push(Number(String(this.result[w].words[i].values[j].value).replace(/[^0-9\.\-]/g, '')));
                        }
                        matrix.push(tempArr);
                      }

                      tempArr = matrix[0].map((z) => { return ''; });
                      matrix.push(tempArr);
                    }
                  }
                }

              }

            } else {

              tempArr = columns.map((z) => { return z; });
              matrix.push(tempArr);
              for (let arr of this) {
                tempArr = [];
                for (let i = 0; i < arr.length; i++) {
                  if (typeArr[i] === "number") {
                    tempArr.push(Number(String(arr[i]).replace(/[^0-9\.\-]/g, '')));
                  } else if (typeArr[i] === "string") {
                    tempArr.push(String(arr[i]));
                  } else {
                    throw new Error("invaild type");
                  }
                }
                matrix.push(tempArr);
              }

            }
            return matrix;
          }
        }
        class TimeSplitResult {
          constructor(designer) {
            this.designer = designer;
          }
          async toSheets() {
            if (this.proposal === undefined || this.contract === undefined || this.price === undefined || this.contents === undefined) {
              throw new Error("render first");
            }
            try {
              const { proposal, contract, price, contents } = this;
              const parentId = "1oKc2UD6hhMyLwfAKWylqh1iKTa7zBc6l";
              const values = [
                { sheets: "제안", matrix: proposal.intoSheetsMatrix() },
                { sheets: "제안 합계", matrix: proposal.intoSheetsMatrix(true) },
                { sheets: "계약", matrix: contract.intoSheetsMatrix() },
                { sheets: "계약 합계", matrix: contract.intoSheetsMatrix(true) },
                { sheets: "가격", matrix: price.intoSheetsMatrix() },
                { sheets: "컨텐츠", matrix: contents.intoSheetsMatrix() },
              ];
              const { link } = await GeneralJs.ajaxJson({
                sheetName: this.designer.designer + " 보고서_" + dateToString(new Date()).replace(/-/g, '').slice(2),
                multiple: true,
                async: true,
                channel: "#300_designer",
                parentId,
                values
              }, "/sendSheets", { equal: true });
              return link;
            } catch (e) {
              console.log(e);
            }
          }
        }
        let proposalFirst, contactFirst;
        let timeValue0, timeValue1;
        let timeCaseBoo;
        let timeArr;
        let timeLength;
        let timeHalfFirst;
        let first;
        let thisYear, thisHalf;
        let tempDate0, tempDate1;
        let tempTong;
        let resultObj;
        let tempArr;
        let boo;
        let totalOrder;
        let yearOrders, yearOrder;
        let order;
        let pastYear;
        let targetProject, tempProposal;
        let tempObj;
        let yearSums, yearSums_key;
        let totalSums;
        let basicTarget, premiumTarget;
        let mapFunction;
        let target;

        resultObj = new TimeSplitResult(this.designer);

        //proposal
        if (proposal.length === 0) {

          resultObj.proposal = new TimeArray();
          resultObj.proposal.setWidth(proposalConst.width);
          resultObj.proposal.setColumns(proposalConst.columns);
          resultObj.proposal.setTypeArr(proposalConst.type);
          resultObj.proposal.setType("timeMatrix");

        } else {

          proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
          proposalFirst = proposal[proposal.length - 1].date;

          first = proposalFirst;
          timeValue0 = (today.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + today.getFullYear();
          timeValue1 = (first.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + first.getFullYear();
          timeCaseBoo = (0 <= timeValue0 - timeValue1 && timeValue0 - timeValue1 < 10000);
          timeLength = timeCaseBoo ? (((timeValue0 - timeValue1) * 2) + 1) : ((Math.abs(timeHalfToken[0] - Math.abs(timeValue0 - timeValue1)) * 2) + (timeValue0 >= timeHalfToken[1] ? 2 : 0));
          timeHalfFirst = timeValue0 >= timeHalfToken[1] ? 1 : 0;

          timeArr = new TimeArray();
          for (let i = 0; i < timeLength; i++) {
            thisYear = ((new Date()).getMonth() >= 6 ? (today.getFullYear() - Math.floor(i / 2)) : (today.getFullYear() - Math.ceil(i / 2)));
            thisHalf = i % 2 === 0 ? timeHalfFirst : 1 - timeHalfFirst;
            if (thisHalf === 0) {
              tempDate0 = new Date(thisYear, 0, 1);
              tempDate1 = new Date(thisYear, 6, 1);
            } else {
              tempDate0 = new Date(thisYear, 6, 1);
              tempDate1 = new Date(thisYear + 1, 0, 1);
            }
            tempTong = [];

            for (let p of proposal) {
              if (p.date.valueOf() >= tempDate0.valueOf() && p.date.valueOf() < tempDate1.valueOf()) {
                tempTong.push(p);
              }
            }

            timeArr.push({
              key: ((thisHalf === 0 ? timeHalfToken[0] : timeHalfToken[1]) + thisYear),
              year: thisYear,
              half: thisHalf,
              name: String(thisYear).slice(2) + "년 " + timeHalfArr[thisHalf] + timeHalfConst,
              values: tempTong,
              matrix: [],
              result: {},
            });

          }
          resultObj.proposal = timeArr;
          resultObj.proposal.setWidth(proposalConst.width);
          resultObj.proposal.setColumns(proposalConst.columns);
          resultObj.proposal.setTypeArr(proposalConst.type);
          resultObj.proposal.setType("timeMatrix");

          totalOrder = 1;
          yearOrders = {};
          yearSums = {};
          totalSums = {
            proposal: 0,
            pyeongEa: 0,
            pyeongLength: 0,
          };
          for (let i = 0; i < resultObj.proposal.length; i++) {
            order = resultObj.proposal[i].values.length;
            if (yearOrders['y' + String(resultObj.proposal[i].year)] === undefined) {
              yearOrders['y' + String(resultObj.proposal[i].year)] = 1;
            }
            if (yearSums['y' + String(resultObj.proposal[i].year)] === undefined) {
              yearSums['y' + String(resultObj.proposal[i].year)] = {
                proposal: 0,
                pyeongEa: 0,
                pyeongLength: 0,
              };
            }

            resultObj.proposal[i].result.order = 0;
            resultObj.proposal[i].result.proposal = 0;
            resultObj.proposal[i].result.pyeongEa = 0;
            resultObj.proposal[i].result.pyeongLength = 0;

            for (let obj of resultObj.proposal[i].values) {
              tempArr = [];
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(obj.client.name);
              tempArr.push(obj.service.name);
              tempArr.push(dateToString(obj.date));
              tempArr.push(autoComma(obj.detail.amount) + '원');
              tempArr.push(String(obj.client.pyeong) + '평');
              if (obj.client.pyeong === 0) {
                alert("평수 에러 : " + obj.client.name + " 고객님의 평수가 0평으로 되어 있습니다! 바르게 고쳐 주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + obj.client.cliid;
              }
              tempArr.push(autoComma(Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000) + '원');
              tempArr.push(obj.detail.method);
              tempArr.push(obj.detail.partial ? 'O' : 'X');
              boo = false;
              for (let obj2 of this.contract) {
                if (obj.proid === obj2.project.proid) {
                  boo = true;
                }
              }
              tempArr.push(boo ? 'O' : 'X');
              resultObj.proposal[i].matrix.push(tempArr);
              order = order - 1;
              totalOrder = totalOrder + 1;
              yearOrders['y' + String(resultObj.proposal[i].year)] = yearOrders['y' + String(resultObj.proposal[i].year)] + 1;

              resultObj.proposal[i].result.order += 1;
              resultObj.proposal[i].result.proposal += obj.detail.amount;
              totalSums.proposal += obj.detail.amount;
              yearSums['y' + String(resultObj.proposal[i].year)].proposal += obj.detail.amount;
              if (!obj.detail.partial) {
                resultObj.proposal[i].result.pyeongEa += Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000;
                resultObj.proposal[i].result.pyeongLength += 1;
                totalSums.pyeongEa += Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000;
                totalSums.pyeongLength += 1;
                yearSums['y' + String(resultObj.proposal[i].year)].pyeongEa += Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000;
                yearSums['y' + String(resultObj.proposal[i].year)].pyeongLength += 1;
              }

            }
          }

          totalSums.order = totalOrder - 1;
          if (totalSums.pyeongLength !== 0) {
            totalSums.pyeongEaAverage = Math.round((totalSums.pyeongEa / totalSums.pyeongLength) / 1000) * 1000;
          } else {
            totalSums.pyeongEaAverage = 0;
          }
          for (let i in yearSums) {
            yearSums[i].order = yearOrders[i] - 1;
            if (yearSums[i].pyeongLength !== 0) {
              yearSums[i].pyeongEaAverage = Math.round((yearSums[i].pyeongEa / yearSums[i].pyeongLength) / 1000) * 1000;
            } else {
              yearSums[i].pyeongEaAverage = 0;
            }
          }

          order = 1;
          yearOrder = 1;
          pastYear = null;
          for (let i = 0; i < resultObj.proposal.length; i++) {
            if (pastYear !== null) {
              if (resultObj.proposal[i].year !== pastYear) {
                yearOrder = 1;
              }
            }

            if (resultObj.proposal[i].result.pyeongLength !== 0) {
              resultObj.proposal[i].result.pyeongEaAverage = Math.round((resultObj.proposal[i].result.pyeongEa / resultObj.proposal[i].result.pyeongLength) / 1000) * 1000;
            } else {
              resultObj.proposal[i].result.pyeongEaAverage = 0;
            }

            resultObj.proposal[i].result.total = {};
            resultObj.proposal[i].result.total.order = totalOrder - 1;
            resultObj.proposal[i].result.total.proposal = totalSums.proposal;
            resultObj.proposal[i].result.total.pyeongEa = totalSums.pyeongEa;
            resultObj.proposal[i].result.total.pyeongLength = totalSums.pyeongLength;
            resultObj.proposal[i].result.total.pyeongEaAverage = totalSums.pyeongEaAverage;

            resultObj.proposal[i].result.year = {};
            resultObj.proposal[i].result.year.order = yearOrders['y' + String(resultObj.proposal[i].year)] - 1;
            resultObj.proposal[i].result.year.proposal = yearSums['y' + String(resultObj.proposal[i].year)].proposal;
            resultObj.proposal[i].result.year.pyeongEa = yearSums['y' + String(resultObj.proposal[i].year)].pyeongEa;
            resultObj.proposal[i].result.year.pyeongLength = yearSums['y' + String(resultObj.proposal[i].year)].pyeongLength;
            resultObj.proposal[i].result.year.pyeongEaAverage = yearSums['y' + String(resultObj.proposal[i].year)].pyeongEaAverage;

            for (let arr of resultObj.proposal[i].matrix) {
              arr[0] = totalOrder - order;
              arr[1] = yearOrders['y' + String(resultObj.proposal[i].year)] - yearOrder;
              order = order + 1;
              yearOrder = yearOrder + 1;
            }
            pastYear = resultObj.proposal[i].year;
          }

          resultObj.proposal.setProperty("result", {});
          resultObj.proposal.result.words = [];
          resultObj.proposal.result.year = {};
          resultObj.proposal.result.total = {};
          resultObj.proposal.result.year.words = [];
          resultObj.proposal.result.total.words = [];
          for (let i = 0; i < resultObj.proposal.length; i++) {
            if (resultObj.proposal[i].values.length > 0) {
              tempObj = {};
              tempObj.name = resultObj.proposal[i].name;
              tempObj.values = [];
              tempObj.values.push({ name: "건수", value: String(resultObj.proposal[i].result.order) + "건", width: [ 50, 80 ] });
              tempObj.values.push({ name: "제안 총 금액", value: autoComma(resultObj.proposal[i].result.proposal) + "원", width: [ 98, 145 ] });
              tempObj.values.push({ name: "평단가 평균", value: autoComma(resultObj.proposal[i].result.pyeongEaAverage) + "원", width: [ 94, 120 ] });
              resultObj.proposal.result.words.push(tempObj);
            }
          }

          yearSums_key = Object.keys(yearSums);
          yearSums_key.sort((a, b) => { return Number(b.replace(/[^0-9]/g, '')) - Number(a.replace(/[^0-9]/g, '')); });
          for (let year of yearSums_key) {
            tempObj = {};
            tempObj.name = String(year.replace(/[^0-9]/g, '')) + "년 합계";
            tempObj.values = [];
            tempObj.values.push({ name: "건수", value: String(yearSums[year].order) + "건", width: [ 50, 80 ] });
            tempObj.values.push({ name: "제안 총 금액", value: autoComma(yearSums[year].proposal) + "원", width: [ 98, 145 ] });
            tempObj.values.push({ name: "평단가 평균", value: autoComma(yearSums[year].pyeongEaAverage) + "원", width: [ 94, 120 ] });
            resultObj.proposal.result.year.words.push(tempObj);
          }

          tempObj = {};
          tempObj.name = "총 합계";
          tempObj.values = [];
          tempObj.values.push({ name: "건수", value: String(totalSums.order) + "건", width: [ 50, 80 ] });
          tempObj.values.push({ name: "제안 총 금액", value: autoComma(totalSums.proposal) + "원", width: [ 98, 145 ] });
          tempObj.values.push({ name: "평단가 평균", value: autoComma(totalSums.pyeongEaAverage) + "원", width: [ 94, 120 ] });
          resultObj.proposal.result.total.words.push(tempObj);

        }

        //contract
        if (contract.length === 0) {

          resultObj.contract = new TimeArray();
          resultObj.contract.setWidth(contractConst.width);
          resultObj.contract.setColumns(contractConst.columns);
          resultObj.contract.setTypeArr(contractConst.type);
          resultObj.contract.setType("timeMatrix");

        } else {

          contract.sort((a, b) => { return b.project.start.valueOf() - a.project.start.valueOf(); });
          contactFirst = contract[contract.length - 1].project.start;

          first = contactFirst;
          timeValue0 = (today.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + today.getFullYear();
          timeValue1 = (first.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + first.getFullYear();
          timeCaseBoo = (0 <= timeValue0 - timeValue1 && timeValue0 - timeValue1 < 10000);
          timeLength = timeCaseBoo ? (((timeValue0 - timeValue1) * 2) + 1) : ((Math.abs(timeHalfToken[0] - Math.abs(timeValue0 - timeValue1)) * 2) + (timeValue0 >= timeHalfToken[1] ? 2 : 0));
          timeHalfFirst = timeValue0 >= timeHalfToken[1] ? 1 : 0;

          timeArr = new TimeArray();
          for (let i = 0; i < timeLength; i++) {
            thisYear = ((new Date()).getMonth() >= 6 ? (today.getFullYear() - Math.floor(i / 2)) : (today.getFullYear() - Math.ceil(i / 2)));
            thisHalf = i % 2 === 0 ? timeHalfFirst : 1 - timeHalfFirst;
            if (thisHalf === 0) {
              tempDate0 = new Date(thisYear, 0, 1);
              tempDate1 = new Date(thisYear, 6, 1);
            } else {
              tempDate0 = new Date(thisYear, 6, 1);
              tempDate1 = new Date(thisYear + 1, 0, 1);
            }
            tempTong = [];
            for (let c of contract) {
              if (c.project.start.valueOf() >= tempDate0.valueOf() && c.project.start.valueOf() < tempDate1.valueOf()) {
                tempTong.push(c);
              }
            }

            timeArr.push({
              key: ((thisHalf === 0 ? timeHalfToken[0] : timeHalfToken[1]) + thisYear),
              year: thisYear,
              half: thisHalf,
              name: String(thisYear).slice(2) + "년 " + timeHalfArr[thisHalf] + timeHalfConst,
              values: tempTong,
              matrix: [],
              result: {},
            });

          }
          resultObj.contract = timeArr;
          resultObj.contract.setWidth(contractConst.width);
          resultObj.contract.setColumns(contractConst.columns);
          resultObj.contract.setTypeArr(contractConst.type);
          resultObj.contract.setType("timeMatrix");

          totalOrder = 1;
          yearOrders = {};
          yearSums = {};
          totalSums = {
            contract: 0,
            first: 0,
            remain: 0,
            proposal: 0,
            pyeongEa: 0,
            pyeongLength: 0,
          };
          for (let i = 0; i < resultObj.contract.length; i++) {
            order = resultObj.contract[i].values.length;
            if (yearOrders['y' + String(resultObj.contract[i].year)] === undefined) {
              yearOrders['y' + String(resultObj.contract[i].year)] = 1;
            }
            if (yearSums['y' + String(resultObj.contract[i].year)] === undefined) {
              yearSums['y' + String(resultObj.contract[i].year)] = {
                contract: 0,
                first: 0,
                remain: 0,
                proposal: 0,
                pyeongEa: 0,
                pyeongLength: 0,
              };
            }

            resultObj.contract[i].result.order = 0;
            resultObj.contract[i].result.contract = 0;
            resultObj.contract[i].result.first = 0;
            resultObj.contract[i].result.remain = 0;
            resultObj.contract[i].result.proposal = 0;
            resultObj.contract[i].result.pyeongEa = 0;
            resultObj.contract[i].result.pyeongLength = 0;

            for (let obj of resultObj.contract[i].values) {

              tempProposal = null;
              for (let obj2 of this.proposal) {
                if (obj2.proid === obj.project.proid) {
                  tempProposal = obj2;
                }
              }
              if (tempProposal === null) {
                for (let project of this.projects) {
                  if (obj.project.proid === project.proid) {
                    targetProject = project;
                  }
                }
                tempProposal = {
                  detail: {
                    method: targetProject.proposal.detail[0].fee[0].method,
                    partial: targetProject.proposal.detail[0].fee[0].partial,
                    amount: 0
                  }
                };
              }

              tempArr = [];
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(obj.client.name);
              tempArr.push(obj.service.name);
              tempArr.push(dateToString(obj.project.start));
              tempArr.push(dateToString(obj.project.end));
              tempArr.push(tempProposal.detail.method);
              tempArr.push(tempProposal.detail.partial ? 'O' : 'X');
              tempArr.push(autoComma(obj.payments.amount) + '원');
              tempArr.push(String(obj.payments.percentage) + '%');
              tempArr.push(autoComma(tempProposal.detail.amount) + '원');
              tempArr.push(String(obj.client.pyeong) + '평');
              if (obj.client.pyeong === 0) {
                alert("평수 에러 : " + obj.client.name + " 고객님의 평수가 0평으로 되어 있습니다! 바르게 고쳐 주세요!");
                window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + obj.client.cliid;
              }
              tempArr.push(autoComma(Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000) + '원');
              tempArr.push(/없음/gi.test(dateToString(obj.payments.first)) ? "예정" : dateToString(obj.payments.first));
              tempArr.push(/없음/gi.test(dateToString(obj.payments.remain)) ? "예정" : dateToString(obj.payments.remain));
              resultObj.contract[i].matrix.push(tempArr);
              order = order - 1;
              totalOrder = totalOrder + 1;
              yearOrders['y' + String(resultObj.contract[i].year)] = yearOrders['y' + String(resultObj.contract[i].year)] + 1;

              resultObj.contract[i].result.order += 1;
              resultObj.contract[i].result.contract += obj.payments.amount;
              totalSums.contract += obj.payments.amount;
              yearSums['y' + String(resultObj.contract[i].year)].contract += obj.payments.amount;

              if ((new Date(2000, 0, 1)).valueOf() <= obj.payments.first.valueOf() && (new Date(3000, 0, 1)).valueOf() >= obj.payments.first.valueOf()) {
                resultObj.contract[i].result.first += Math.round(obj.payments.amount / 2);
                totalSums.first += Math.round(obj.payments.amount / 2);
                yearSums['y' + String(resultObj.contract[i].year)].first += Math.round(obj.payments.amount / 2);
              }
              if ((new Date(2000, 0, 1)).valueOf() <= obj.payments.remain.valueOf() && (new Date(3000, 0, 1)).valueOf() >= obj.payments.remain.valueOf()) {
                resultObj.contract[i].result.remain += Math.round(obj.payments.amount / 2);
                totalSums.remain += Math.round(obj.payments.amount / 2);
                yearSums['y' + String(resultObj.contract[i].year)].remain += Math.round(obj.payments.amount / 2);
              }
              resultObj.contract[i].result.proposal += tempProposal.detail.amount;
              totalSums.proposal += tempProposal.detail.amount;
              yearSums['y' + String(resultObj.contract[i].year)].proposal += tempProposal.detail.amount;

              if (!tempProposal.detail.partial && (tempProposal.detail.amount !== 0)) {
                resultObj.contract[i].result.pyeongEa += Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000;
                resultObj.contract[i].result.pyeongLength += 1;
                totalSums.pyeongEa += Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000;
                totalSums.pyeongLength += 1;
                yearSums['y' + String(resultObj.contract[i].year)].pyeongEa += Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000;
                yearSums['y' + String(resultObj.contract[i].year)].pyeongLength += 1;
              }

            }
          }

          totalSums.order = totalOrder - 1;
          if (totalSums.pyeongLength !== 0) {
            totalSums.pyeongEaAverage = Math.round((totalSums.pyeongEa / totalSums.pyeongLength) / 1000) * 1000;
          } else {
            totalSums.pyeongEaAverage = 0;
          }
          for (let i in yearSums) {
            yearSums[i].order = yearOrders[i] - 1;
            if (yearSums[i].pyeongLength !== 0) {
              yearSums[i].pyeongEaAverage = Math.round((yearSums[i].pyeongEa / yearSums[i].pyeongLength) / 1000) * 1000;
            } else {
              yearSums[i].pyeongEaAverage = 0;
            }
          }

          order = 1;
          yearOrder = 1;
          pastYear = null;
          for (let i = 0; i < resultObj.contract.length; i++) {
            if (pastYear !== null) {
              if (resultObj.contract[i].year !== pastYear) {
                yearOrder = 1;
              }
            }
            if (resultObj.contract[i].result.pyeongLength !== 0) {
              resultObj.contract[i].result.pyeongEaAverage = Math.round((resultObj.contract[i].result.pyeongEa / resultObj.contract[i].result.pyeongLength) / 1000) * 1000;
            } else {
              resultObj.contract[i].result.pyeongEaAverage = 0;
            }

            resultObj.contract[i].result.total = {};
            resultObj.contract[i].result.total.order = totalOrder - 1;
            resultObj.contract[i].result.total.contract = totalSums.contract;
            resultObj.contract[i].result.total.first = totalSums.first;
            resultObj.contract[i].result.total.remain = totalSums.remain;
            resultObj.contract[i].result.total.proposal = totalSums.proposal;
            resultObj.contract[i].result.total.pyeongEa = totalSums.pyeongEa;
            resultObj.contract[i].result.total.pyeongLength = totalSums.pyeongLength;
            resultObj.contract[i].result.total.pyeongEaAverage = totalSums.pyeongEaAverage;

            resultObj.contract[i].result.year = {};
            resultObj.contract[i].result.year.order = yearOrders['y' + String(resultObj.contract[i].year)] - 1;
            resultObj.contract[i].result.year.contract = yearSums['y' + String(resultObj.contract[i].year)].contract;
            resultObj.contract[i].result.year.first = yearSums['y' + String(resultObj.contract[i].year)].first;
            resultObj.contract[i].result.year.remain = yearSums['y' + String(resultObj.contract[i].year)].remain;
            resultObj.contract[i].result.year.proposal = yearSums['y' + String(resultObj.contract[i].year)].proposal;
            resultObj.contract[i].result.year.pyeongEa = yearSums['y' + String(resultObj.contract[i].year)].pyeongEa;
            resultObj.contract[i].result.year.pyeongLength = yearSums['y' + String(resultObj.contract[i].year)].pyeongLength;
            resultObj.contract[i].result.year.pyeongEaAverage = yearSums['y' + String(resultObj.contract[i].year)].pyeongEaAverage;

            for (let arr of resultObj.contract[i].matrix) {
              arr[0] = totalOrder - order;
              arr[1] = yearOrders['y' + String(resultObj.contract[i].year)] - yearOrder;
              order = order + 1;
              yearOrder = yearOrder + 1;
            }
            pastYear = resultObj.contract[i].year;
          }

          resultObj.contract.setProperty("result", {});
          resultObj.contract.result.words = [];
          resultObj.contract.result.year = {};
          resultObj.contract.result.total = {};
          resultObj.contract.result.year.words = [];
          resultObj.contract.result.total.words = [];
          for (let i = 0; i < resultObj.contract.length; i++) {
            if (resultObj.contract[i].values.length > 0) {
              tempObj = {};
              tempObj.name = resultObj.contract[i].name;
              tempObj.values = [];
              tempObj.values.push({ name: "건수", value: String(resultObj.contract[i].result.order) + "건", width: [ 50, 80 ] });
              tempObj.values.push({ name: "계약 총 금액", value: autoComma(resultObj.contract[i].result.contract) + "원", width: [ 98, 145 ] });
              tempObj.values.push({ name: "선금 정산액", value: autoComma(resultObj.contract[i].result.first) + "원", width: [ 94, 140 ] });
              tempObj.values.push({ name: "잔금 정산액", value: autoComma(resultObj.contract[i].result.remain) + "원", width: [ 94, 140 ] });
              tempObj.values.push({ name: "제안 총 금액", value: autoComma(resultObj.contract[i].result.proposal) + "원", width: [ 98, 145 ] });
              tempObj.values.push({ name: "평단가 평균", value: autoComma(resultObj.contract[i].result.pyeongEaAverage) + "원", width: [ 94, 140 ] });
              resultObj.contract.result.words.push(tempObj);
            }
          }

          yearSums_key = Object.keys(yearSums);
          yearSums_key.sort((a, b) => { return Number(b.replace(/[^0-9]/g, '')) - Number(a.replace(/[^0-9]/g, '')); });
          for (let year of yearSums_key) {
            tempObj = {};
            tempObj.name = String(year.replace(/[^0-9]/g, '')) + "년 합계";
            tempObj.values = [];
            tempObj.values.push({ name: "건수", value: String(yearSums[year].order) + "건", width: [ 50, 80 ] });
            tempObj.values.push({ name: "계약 총 금액", value: autoComma(yearSums[year].contract) + "원", width: [ 98, 145 ] });
            tempObj.values.push({ name: "선금 정산액", value: autoComma(yearSums[year].first) + "원", width: [ 94, 140 ] });
            tempObj.values.push({ name: "잔금 정산액", value: autoComma(yearSums[year].remain) + "원", width: [ 94, 140 ] });
            tempObj.values.push({ name: "제안 총 금액", value: autoComma(yearSums[year].proposal) + "원", width: [ 98, 145 ] });
            tempObj.values.push({ name: "평단가 평균", value: autoComma(yearSums[year].pyeongEaAverage) + "원", width: [ 94, 140 ] });
            resultObj.contract.result.year.words.push(tempObj);
          }

          tempObj = {};
          tempObj.name = "총 합계";
          tempObj.values = [];
          tempObj.values.push({ name: "건수", value: String(totalSums.order) + "건", width: [ 50, 80 ] });
          tempObj.values.push({ name: "계약 총 금액", value: autoComma(totalSums.contract) + "원", width: [ 98, 145 ] });
          tempObj.values.push({ name: "선금 정산액", value: autoComma(totalSums.first) + "원", width: [ 94, 140 ] });
          tempObj.values.push({ name: "잔금 정산액", value: autoComma(totalSums.remain) + "원", width: [ 94, 140 ] });
          tempObj.values.push({ name: "제안 총 금액", value: autoComma(totalSums.proposal) + "원", width: [ 98, 145 ] });
          tempObj.values.push({ name: "평단가 평균", value: autoComma(totalSums.pyeongEaAverage) + "원", width: [ 94, 140 ] });
          resultObj.contract.result.total.words.push(tempObj);

        }

        //contents
        if (contents.length === 0) {

          resultObj.contents = new TimeArray();
          resultObj.contents.setWidth(contentsConst.width);
          resultObj.contents.setColumns(contentsConst.columns);
          resultObj.contents.setTypeArr(contentsConst.type);
          resultObj.contents.setType("timeMatrix");

        } else {

          contents.sort((a, b) => { return b.contents.portfolio.date.valueOf() - a.contents.portfolio.date.valueOf(); });
          first = contents[contents.length - 1].contents.portfolio.date;
          timeValue0 = (today.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + today.getFullYear();
          timeValue1 = (first.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + first.getFullYear();
          timeCaseBoo = (0 <= timeValue0 - timeValue1 && timeValue0 - timeValue1 < 10000);
          timeLength = timeCaseBoo ? (((timeValue0 - timeValue1) * 2) + 1) : ((Math.abs(timeHalfToken[0] - Math.abs(timeValue0 - timeValue1)) * 2) + (timeValue0 >= timeHalfToken[1] ? 2 : 0));
          timeHalfFirst = timeValue0 >= timeHalfToken[1] ? 1 : 0;

          timeArr = new TimeArray();
          for (let i = 0; i < timeLength; i++) {
            thisYear = ((new Date()).getMonth() >= 6 ? (today.getFullYear() - Math.floor(i / 2)) : (today.getFullYear() - Math.ceil(i / 2)));
            thisHalf = i % 2 === 0 ? timeHalfFirst : 1 - timeHalfFirst;
            if (thisHalf === 0) {
              tempDate0 = new Date(thisYear, 0, 1);
              tempDate1 = new Date(thisYear, 6, 1);
            } else {
              tempDate0 = new Date(thisYear, 6, 1);
              tempDate1 = new Date(thisYear + 1, 0, 1);
            }
            tempTong = [];
            for (let p of contents) {
              if (p.contents.portfolio.date.valueOf() >= tempDate0.valueOf() && p.contents.portfolio.date.valueOf() < tempDate1.valueOf()) {
                tempTong.push(p);
              }
            }

            timeArr.push({
              key: ((thisHalf === 0 ? timeHalfToken[0] : timeHalfToken[1]) + thisYear),
              year: thisYear,
              half: thisHalf,
              name: String(thisYear).slice(2) + "년 " + timeHalfArr[thisHalf] + timeHalfConst,
              values: tempTong,
              matrix: [],
              result: {},
            });

          }
          resultObj.contents = timeArr;
          resultObj.contents.setWidth(contentsConst.width);
          resultObj.contents.setColumns(contentsConst.columns);
          resultObj.contents.setTypeArr(contentsConst.type);
          resultObj.contents.setType("timeMatrix");

          totalOrder = 1;
          yearOrders = {};

          for (let i = 0; i < resultObj.contents.length; i++) {
            order = resultObj.contents[i].values.length;
            if (yearOrders['y' + String(resultObj.contents[i].year)] === undefined) {
              yearOrders['y' + String(resultObj.contents[i].year)] = 1;
            }

            for (let obj of resultObj.contents[i].values) {
              tempArr = [];
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(order);
              tempArr.push(obj.proid === "" ? "개인" : "HL");
              tempArr.push(obj.name === undefined ? "개인" : obj.name);
              tempArr.push(obj.contents.portfolio.pid);
              tempArr.push(dateToString(obj.contents.portfolio.date));
              tempArr.push(dateToString(obj.contents.review.date));
              tempArr.push(homepage + portfolioPath + "?pid=" + obj.contents.portfolio.pid);
              tempArr.push(/999/g.test(obj.contents.review.rid) ? "-" : homepage + reviewPath + "?pid=" + obj.contents.portfolio.pid);
              resultObj.contents[i].matrix.push(tempArr);
              order = order - 1;
              totalOrder = totalOrder + 1;
              yearOrders['y' + String(resultObj.contents[i].year)] = yearOrders['y' + String(resultObj.contents[i].year)] + 1;
            }
          }

          order = 1;
          yearOrder = 1;
          pastYear = null;
          for (let i = 0; i < resultObj.contents.length; i++) {
            if (pastYear !== null) {
              if (resultObj.contents[i].year !== pastYear) {
                yearOrder = 1;
              }
            }
            for (let arr of resultObj.contents[i].matrix) {
              arr[0] = totalOrder - order;
              arr[1] = yearOrders['y' + String(resultObj.contents[i].year)] - yearOrder;
              order = order + 1;
              yearOrder = yearOrder + 1;
            }
            pastYear = resultObj.contents[i].year;
          }

        }

        //price
        resultObj.price = new TimeArray();
        resultObj.price.setWidth(priceConst.width);
        resultObj.price.setColumns(priceConst.columns);
        resultObj.price.setTypeArr(priceConst.type);
        resultObj.price.setType("generalMatrix");

        basicTarget = Object.keys(price.detail.basic);
        premiumTarget = Object.keys(price.detail.premium);
        mapFunction = (str) => {
          for (let { column, name } of service) {
            if (column === str) {
              return { column, name };
            }
          }
        }
        basicTarget = basicTarget.map(mapFunction);
        premiumTarget = premiumTarget.map(mapFunction);

        for (let i = 0; i < basicTarget.length; i++) {
          tempArr = [];
          if (i === 0) {
            tempArr.push(String(price.alpha) + '%');
          } else {
            tempArr.push('');
          }
          tempArr.push(basicTarget[i].name + ' B');
          target = price.detail.basic[basicTarget[i].column];
          for (let j = 0; j < target.length; j++) {
            tempArr.push(autoComma(target[j] * 10000) + '원');
          }
          resultObj.price.push(tempArr);
        }
        for (let i = 0; i < premiumTarget.length; i++) {
          tempArr = [];
          tempArr.push('');
          tempArr.push(premiumTarget[i].name + ' P');
          target = price.detail.premium[premiumTarget[i].column];
          for (let j = 0; j < target.length; j++) {
            tempArr.push(autoComma(target[j] * 10000) + '원');
          }
          resultObj.price.push(tempArr);
        }

        tempArr = [];
        tempArr.push('');
        tempArr.push("수수료");
        for (let num of this.fee) {
          tempArr.push(String(Math.round(num)) + '%');
        }
        resultObj.price.push(tempArr);

        if (instance.middleMode) {
          resultObj.proposal.columns = resultObj.proposal.columns.filter((element, i) => { return proposalConst.middle[i]; });
          resultObj.proposal.typeArr = resultObj.proposal.typeArr.filter((element, i) => { return proposalConst.middle[i]; });
          resultObj.proposal.width = resultObj.proposal.width.filter((element, i) => { return proposalConst.middle[i]; });
          for (let obj of resultObj.proposal) {
            for (let m = 0; m < obj.matrix.length; m++) {
              obj.matrix[m] = obj.matrix[m].filter((element, i) => { return proposalConst.middle[i]; });
            }
          }
          for (let obj of resultObj.proposal.result.words) {
            obj.values.pop();
          }
          for (let obj of resultObj.proposal.result.total.words) {
            obj.values.pop();
          }
          for (let obj of resultObj.proposal.result.year.words) {
            obj.values.pop();
          }

          resultObj.contract.columns = resultObj.contract.columns.filter((element, i) => { return contractConst.middle[i]; });
          resultObj.contract.typeArr = resultObj.contract.typeArr.filter((element, i) => { return contractConst.middle[i]; });
          resultObj.contract.width = resultObj.contract.width.filter((element, i) => { return contractConst.middle[i]; });
          for (let obj of resultObj.contract) {
            for (let m = 0; m < obj.matrix.length; m++) {
              obj.matrix[m] = obj.matrix[m].filter((element, i) => { return contractConst.middle[i]; });
            }
          }
          for (let obj of resultObj.contract.result.words) {
            obj.values.pop();
          }
          for (let obj of resultObj.contract.result.total.words) {
            obj.values.pop();
          }
          for (let obj of resultObj.contract.result.year.words) {
            obj.values.pop();
          }

          resultObj.contents.columns = resultObj.contents.columns.filter((element, i) => { return contentsConst.middle[i]; });
          resultObj.contents.typeArr = resultObj.contents.typeArr.filter((element, i) => { return contentsConst.middle[i]; });
          resultObj.contents.width = resultObj.contents.width.filter((element, i) => { return contentsConst.middle[i]; });
          for (let obj of resultObj.contents) {
            for (let m = 0; m < obj.matrix.length; m++) {
              obj.matrix[m] = obj.matrix[m].filter((element, i) => { return contentsConst.middle[i]; });
            }
          }

          resultObj.price.columns = resultObj.price.columns.filter((element, i) => { return priceConst.middle[i]; });
          resultObj.price.typeArr = resultObj.price.typeArr.filter((element, i) => { return priceConst.middle[i]; });
          resultObj.price.width = resultObj.price.width.filter((element, i) => { return priceConst.middle[i]; });
          for (let m = 0; m < resultObj.price.length; m++) {
            resultObj.price[m] = resultObj.price[m].filter((element, i) => { return priceConst.middle[i]; });
          }

        }

        return resultObj;
      }
    }
    let projects;
    let proposalArr;
    let standard;
    let allDesigners;
    let entireTong;
    let proposals, contract;
    let alpha, alphaPercentage;
    let homeliaison;
    let key0, key1;
    let matrix;
    let newcomer;
    let premium;
    let fee;
    let possible;
    let targetService;
    let targetServicePremium;
    let serviceTong;
    let tong;
    let requests;
    let boo;
    let contents;
    let tempArr;
    let thisDesignerCareerStart;

    allDesigners = [ this.designers.pick(desid) ];

    for (let obj of price) {
      if (obj.key === 33) {
        standard = obj;
        break;
      }
    }

    tong = [];
    for (let designer of allDesigners) {
      desid = designer.desid;
      entireTong = new DesignerReport(designer, allProjects, price);
      entireTong.desid = desid;
      entireTong.designer = designer;
      projects = [];
      for (let project of allProjects) {
        if (project.desid === desid) {
          projects.push(project);
        }
      }

      proposals = [];
      for (let project of allProjects) {
        for (let obj of project.proposal.detail) {
          if (desid === obj.desid) {
            serviceName = "";
            for (let { serid, name, id } of service) {
              if (serid === project.service.serid) {
                serviceName += id;
              }
            }
            serviceName += project.service.xValue;
            proposals.push({
              proid: project.proid,
              date: project.proposal.date,
              service: {
                name: serviceName,
                serid: project.service.serid,
                xValue: project.service.xValue
              },
              client: {
                name: project.name,
                cliid: project.cliid,
                pyeong: project.pyeong
              },
              detail: {
                amount: obj.fee[0].amount,
                method: obj.fee[0].method,
                partial: obj.fee[0].partial,
              }
            });
          }
        }
      }

      contract = [];
      for (let project of projects) {
        serviceName = "";
        for (let { serid, name, id } of service) {
          if (serid === project.service.serid) {
            serviceName += id;
          }
        }
        serviceName += project.service.xValue;
        contract.push({
          client: {
            name: project.name,
            cliid: project.cliid,
            pyeong: project.pyeong
          },
          service: {
            name: serviceName,
            serid: project.service.serid,
            xValue: project.service.xValue
          },
          project: {
            proid: project.proid,
            start: (project.process.contract.meeting.date.valueOf() < emptyDateValue ? project.proposal.date : project.process.contract.meeting.date),
            end: (project.process.contract.form.date.to.valueOf() < emptyDateValue ? ((project.process.calculation.payments.remain.date.valueOf() < emptyDateValue) ? (project.contents.photo.date.valueOf() < emptyDateValue ? (new Date(3800, 0, 1)) : project.contents.photo.date) : project.process.calculation.payments.remain.date) : project.process.contract.form.date.to),
          },
          payments: {
            percentage: project.process.calculation.percentage,
            amount: project.process.calculation.payments.totalAmount,
            first: project.process.calculation.payments.first.date,
            remain: project.process.calculation.payments.remain.date,
          }
        });
      }

      entireTong.proposal = proposals;
      entireTong.contract = contract;

      thisDesignerCareerStart = new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1);

      alpha = 0;
      alpha += (designer.information.business.career.relatedY >= 4 ? 0.5 : 0);
      alpha += thisDesignerCareerStart.valueOf() <= tenYearsAgo.valueOf() ? 1 : (thisDesignerCareerStart.valueOf() <= fourYearsAgo.valueOf() ? 0.5 : 0);
      alpha += (designer.analytics.project.paperWork.includes("3D") ? 0.5 : 0);
      alpha += (designer.analytics.project.paperWork.includes("콜라주") ? 0.5 : 0);
      alpha += (designer.analytics.project.paperWork.length >= 4 ? 0.5 : 0);

      homeliaison = 0;
      for (let { value } of designer.analytics.etc.personality) {
        if (value) {
          homeliaison = homeliaison + 1;
        }
      }
      relationItems = [ "지속가능성 높음", "그냥 평범", "확인중", "좋지 않음" ];
      homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation);

      alpha += (homeliaison * (4.5 / 7));

      //고객 평가 (2점 만점)
      alpha += 1;
      //인기도 (0.5점 만점)
      alpha += 0.5;

      alphaPercentage = (alpha / 100) + 1;
      alpha = (Math.floor(alpha * 100) / 100);

      key0 = designer.analytics.construct.level;
      key1 = designer.analytics.styling.level;

      row = null;
      for (let obj of price) {
        if (obj.key === ((key0 * 10) + key1)) {
          row = obj;
        }
      }
      if (row === null) {
        throw new Error("invaild key");
      }
      matrix = reverseMatrix(row.matrix);

      newcomer = standard.newcomer;
      premium = standard.premium;
      fee = standard.fee;
      possible = designer.analytics.project.matrix;

      targetService = [];
      targetServicePremium = [];
      for (let i = 0; i < possible.length; i++) {
        if (possible[i][1] === 1) {
          targetService.push(i);
        }
        if (possible[i][2] === 1) {
          targetServicePremium.push(i);
        }
      }

      serviceTong = {
         basic: {},
         premium: {}
      };
      for (let index of targetService) {
        serviceTong.basic[service[index].column] = matrix[index].map((amount) => { return Math.round(amount * alphaPercentage) });
      }
      for (let index of targetServicePremium) {
        serviceTong.premium[service[index].column] = matrix[index].map((amount) => { return Math.round(amount * premium * alphaPercentage) });
      }
      fee = fee.map((num) => { return designer.information.business.service.cost.percentage * (num / 30) });

      entireTong.price = {};
      entireTong.price.alpha = alpha;
      entireTong.price.detail = serviceTong;
      entireTong.fee = fee;

      contents = [];
      for (let c of contentsArr) {
        if (c.desid === designer.desid) {
          contents.push(c);
        }
      }
      entireTong.contents = contents;

      //mobile
      if (mobile) {
        entireTong.mobile = {
          proposal: [],
          contract: [],
          contents: [],
        };

        for (let obj of entireTong.proposal) {
          tempArr = [
            obj.client.name,
            String(obj.client.pyeong) + "평",
            dateToString(obj.date).slice(2).replace(/\-/gi, '.'),
            autoComma(obj.detail.amount) + "원",
          ];
          entireTong.mobile.proposal.push(tempArr);
        }

        for (let obj of entireTong.contract) {
          tempArr = [
            obj.client.name,
            dateToString(obj.project.start).slice(2).replace(/\-/gi, '.'),
            dateToString(obj.project.end).slice(2).replace(/\-/gi, '.'),
            autoComma(obj.payments.amount) + "원",
          ];
          entireTong.mobile.contract.push(tempArr);
        }

        for (let obj of entireTong.contents) {
          tempArr = [
            (obj.name === undefined ? "개인" : obj.name),
            dateToString(obj.contents.portfolio.date).slice(2).replace(/\-/gi, '.'),
            FRONTHOST + "/portdetail.php?pid=" + obj.contents.portfolio.pid,
          ];
          entireTong.mobile.contents.push(tempArr);
        }

      }

      tong.push(entireTong);
    }

    this.reports = new DesignerReports(tong, allProjects, price);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.reportDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target;
  let loading;

  if (!middleMode) {
    this.pageHistory.unshift({ path: "report", status: "list", desid });
  }
  window.history.pushState({ path: "report", status: "list", desid }, '');

  this.desid = desid;
  this.fixTargets = [];

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
      page: "report",
      mode: "page",
      who: instance.designer.information.phone,
      desid,
    }, "/ghostDesigner_updateAnalytics").then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
  }

  totalMother.scrollTo({ top: 0, behavior: "smooth" });
  this.reportIconSet(desid);
  this.mother.loadingRun().then((l) => {
    loading = l;
    return instance.reportDataRendering(desid);
  }).then(() => {
    loading.parentNode.removeChild(loading);
    instance.reportDetail(desid);
    if (callback !== null) {
      if (typeof callback === "function") {
        callback();
      }
    }
  }).catch((err) => {
    console.log(err);
  });

}

DesignerJs.prototype.reportDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const mother = this.mother;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, equalJson } = GeneralJs;
  const { totalMother, ea, grayBarWidth, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const matrixButtonConst = "matrixButtons_" + desid;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const overConst = 3;
  const today = new Date();
  const thisReport = this.reports.pick(desid);
  const timeSplitResult = thisReport.timeSplit();
  const { proposal, contract, price, contents } = timeSplitResult;
  const reportData = [
    { name: "제안", children: [] },
    { name: "계약", children: [] },
    { name: "가격", children: [] },
    { name: "컨텐츠", children: [] },
  ];
  let designer;
  let information, analytics;
  let margin;
  let baseTong0, baseTong;
  let matrix;
  let tempArr;
  let tempObj, nodeArr;
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
  let factorMarginTop, factorMarginBottom;
  let left;
  let columnVisual;
  let sumStartLeft;
  let overTargets;
  let overWidth, overRadius;
  let offConst;
  let mediaWidthRatio;
  let mobileReportData;
  let mergeMap, callbackMap, boldMap, titleMap, widthRatio;
  let table;
  let mobileBlock;
  let mobileBlockPaddingTop;
  let mobileBlockLineTop;
  let mobileBlockLineBetween;
  let mobileBlockTitleSize;
  let mobileBlockTableBetween;
  let mobileTableFontSize;
  let mobileTableBlockHeight;
  let mobileTableMarginBottom;
  let mobileTableInnderMargin;
  let baseTongPaddingTop, baseTongPaddingBottom;
  let mobileOuterMargin;

  designer = this.designers.pick(desid);
  information = designer.information;
  analytics = designer.analytics;

  this.result = timeSplitResult;
  this.proposal = proposal;
  this.contract = contract;
  this.price = price;
  this.contents = contents;

  mediaWidthRatio = <%% 1, 0.82, 0.82, 0.82, 0.82 %%>;

  margin = 8;
  level1Width = <%% 130, 110, 110, 110, 34 %%>;
  level1Left = <%% 120, 110, 110, 110, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 3 %%>;
  tendencyTop = 3;
  tendencyHeight = 16;
  alphabetWidth = 30;

  factorHeight = <%% 34, 32, 32, 32, 10 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = 30;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  factorMarginTop = 22;
  factorMarginBottom = factorHeight - (size - 2 + (isMac() ? 9 : 7));
  columnVisual = 5;

  sumStartLeft = 12;
  overWidth = 40;
  overRadius = 6;

  offConst = 102;

  textAreaTop = isMac() ? -3 : -4;

  baseTongPaddingTop = 1;
  baseTongPaddingBottom = 20;
  mobileOuterMargin = 4;

  mobileBlockPaddingTop = 7;
  mobileBlockLineTop = 2.4;
  mobileBlockTitleSize = 4;
  mobileBlockLineBetween = 3;
  mobileBlockTableBetween = 3.5;

  mobileTableFontSize = 2.8;
  mobileTableMarginBottom = 2;
  mobileTableBlockHeight = 8.9;
  mobileTableInnderMargin = 1;

  reportData[0].children.push({
    name: "",
    matrix: [ proposal.columns ],
    width: proposal.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  reportData[1].children.push({
    name: "",
    matrix: [ contract.columns ],
    width: contract.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  reportData[3].children.push({
    name: "",
    matrix: [ contents.columns ],
    width: contents.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  if (proposal.length > 0) {
    for (let { name, matrix, values } of proposal) {
      if (values.length === 0) {
        reportData[0].children.push({
          name,
          matrix: [ (proposal.columns.map((i) => { return '-'; })) ],
          width: proposal.width,
          over: false,
          height: factorHeight + factorMarginBottom,
        });
      } else {
        reportData[0].children.push({
          name,
          matrix,
          width: proposal.width,
          over: (values.length > overConst),
          height: (values.length >= overConst) ? ((factorHeight * overConst) + factorMarginBottom) : ((factorHeight * values.length) + factorMarginBottom),
        });
      }
    }
    reportData[0].children.push({
      name: "",
      result: proposal.result,
      height: (factorHeight * proposal.result.words.length) + factorMarginBottom,
    });
    reportData[0].children.push({
      name: "",
      result: proposal.result.year,
      height: (factorHeight * proposal.result.year.words.length) + factorMarginBottom,
    });
    reportData[0].children.push({
      name: "",
      result: proposal.result.total,
      height: (factorHeight * proposal.result.total.words.length) + factorMarginBottom,
    });
  } else {
    reportData[0].children.push({
      name: "제안건 없음",
      matrix: [ (proposal.columns.map((i) => { return '-'; })) ],
      width: proposal.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  if (contract.length > 0) {
    for (let { name, matrix, values } of contract) {
      if (values.length === 0) {
        reportData[1].children.push({
          name,
          matrix: [ (contract.columns.map((i) => { return '-'; })) ],
          width: contract.width,
          over: false,
          height: factorHeight + factorMarginBottom,
        });
      } else {
        reportData[1].children.push({
          name,
          matrix,
          width: contract.width,
          over: (values.length > overConst),
          height: (values.length >= overConst) ? ((factorHeight * overConst) + factorMarginBottom) : ((factorHeight * values.length) + factorMarginBottom),
        });
      }
    }
    reportData[1].children.push({
      name: "",
      result: contract.result,
      height: (factorHeight * contract.result.words.length) + factorMarginBottom,
    });
    reportData[1].children.push({
      name: "",
      result: contract.result.year,
      height: (factorHeight * contract.result.year.words.length) + factorMarginBottom,
    });
    reportData[1].children.push({
      name: "",
      result: contract.result.total,
      height: (factorHeight * contract.result.total.words.length) + factorMarginBottom,
    });
  } else {
    reportData[1].children.push({
      name: "계약건 없음",
      matrix: [ (contract.columns.map((i) => { return '-'; })) ],
      width: contract.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  reportData[2].children.push({
    name: "",
    matrix: [ price.columns ],
    width: price.width,
    over: false,
    height: factorHeight + factorMarginBottom - columnVisual,
  });
  if (price.length > 0) {
    reportData[2].children.push({
      name: String(today.getFullYear()).slice(2) + "년 현재",
      matrix: price,
      width: price.width,
      over: false,
      height: (factorHeight * price.length) + factorMarginBottom,
    });
  } else {
    reportData[2].children.push({
      name: "가격 없음",
      matrix: [ (price.columns.map((i) => { return '-'; })) ],
      width: price.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  if (contents.length > 0) {
    for (let { name, matrix, values } of contents) {
      if (values.length === 0) {
        reportData[3].children.push({
          name,
          matrix: [ (contents.columns.map((i) => { return '-'; })) ],
          width: contents.width,
          over: false,
          height: factorHeight + factorMarginBottom,
        });
      } else {
        reportData[3].children.push({
          name,
          matrix,
          width: contents.width,
          over: (values.length > overConst),
          height: (values.length >= overConst) ? ((factorHeight * overConst) + factorMarginBottom) : ((factorHeight * values.length) + factorMarginBottom),
        });
      }
    }
  } else {
    reportData[3].children.push({
      name: "컨텐츠 없음",
      matrix: [ (contents.columns.map((i) => { return '-'; })) ],
      width: contents.width,
      over: false,
      height: factorHeight + factorMarginBottom,
    });
  }

  // mobile
  if (mobile) {
    mobileReportData = equalJson(JSON.stringify(reportData));
    mobileReportData.splice(2, 1);
    mobileReportData[0].children = thisReport.mobile.proposal;
    mobileReportData[1].children = thisReport.mobile.contract;
    mobileReportData[2].children = thisReport.mobile.contents;

    for (let i = 0; i < mobileReportData.length; i++) {
      if (i === 0) {
        mobileReportData[i].columns = [ "고객", "평수", "제안일", "금액" ];
        mobileReportData[i].widthRatio = [ 1, 1, 1, 2 ];
      } else if (i === 1) {
        mobileReportData[i].columns = [ "고객", "시작일", "종료일", "금액" ];
        mobileReportData[i].widthRatio = [ 1, 1, 1, 2 ];
      } else if (i === 2) {
        mobileReportData[i].columns = [ "고객", "발행일", "홈페이지 링크" ];
        mobileReportData[i].widthRatio = [ 1, 1, 3 ];
      }

      mobileReportData[i].boldMap = [];
      mobileReportData[i].callbackMap = [];
      if (mobileReportData[i].children.length > 0) {
        for (let j = 0; j < mobileReportData[i].children.length + 1; j++) {
          mobileReportData[i].boldMap.push((new Array(mobileReportData[i].children[0].length)).fill(0, 0));
          mobileReportData[i].callbackMap.push((new Array(mobileReportData[i].children[0].length)).fill(null, 0));
        }
        if (i === 2) {
          for (let j = 0; j < mobileReportData[i].callbackMap.length; j++) {
            mobileReportData[i].callbackMap[j][mobileReportData[i].callbackMap[j].length - 1] = function (e) {
              const target = this.firstChild.firstChild;
              const link = target.textContent;
              GeneralJs.blankHref(link);
            }
          }
        }
      }

      mobileReportData[i].titleMap = (new Array(mobileReportData[i].boldMap.length)).fill(0, 0);
      if (mobileReportData[i].boldMap.length > 0) {
        mobileReportData[i].boldMap[0].fill(1, 0);
        mobileReportData[i].titleMap[0] = 1;
      }
    }

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
      left: String(grayBarWidth + (desktop ? margin * 3 : mobileOuterMargin)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : mobileOuterMargin * 2), ea),
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
      height: "auto",
      animation: "",
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
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingTop: desktop ? "" : String(baseTongPaddingTop) + ea,
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingTop: desktop ? "" : String(baseTongPaddingTop) + ea,
      paddingBottom: desktop ? "" : String(baseTongPaddingBottom) + ea,
    }
  });

  if (desktop) {
    for (let i = 0; i < reportData.length; i++) {
      nodeArr = createNodes([
        {
          mother: baseTong,
          class: [ "totalname_" + String(i) ],
          attribute: [
            { x: String(i) },
          ],
          style: {
            position: "relative",
            width: String(100) + '%',
            height: "auto",
            overflow: "hidden",
            borderBottom: (desktop ? (i !== reportData.length - 1 ? "1px solid " + colorChip.gray4 : "") : ""),
          }
        },
        {
          mother: -1,
          class: [ "hoverDefault" ],
          text: reportData[i].name,
          events: [
            {
              type: "click",
              event: function (e) {
                const x = Number(this.getAttribute('x'));
                const toggle = this.getAttribute("toggle");
                const target = document.querySelector(".totalname_" + String(x));
                if (toggle === "on") {
                  target.style.height = String(offConst) + ea;
                  this.setAttribute("toggle", "off");
                } else {
                  target.style.height = "auto";
                  this.setAttribute("toggle", "on");
                }
              }
            }
          ],
          attribute: [
            { x: String(i) },
            { toggle: "on" },
          ],
          style: {
            position: "absolute",
            fontSize: String(size) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            top: String(topMargin + 1) + ea,
            left: String(leftMargin) + ea,
          }
        },
        {
          mother: -2,
          style: {
            position: "absolute",
            width: String(level1Width) + ea,
            top: String(0) + ea,
            left: String(level1Left) + ea,
            paddingTop: String(topMargin) + ea,
          }
        },
        {
          mother: -3,
          style: {
            position: "relative",
            width: withOut(level1Width + level1Left, ea),
            top: String(0) + ea,
            left: String(level1Width + level1Left) + ea,
            height: String(100) + '%',
            paddingTop: String(topMargin) + ea,
          }
        },
      ]);

      eachTotalTong = nodeArr[0];
      eachNameTong = nodeArr[2];
      eachValueTong = nodeArr[3];

      for (let j = 0; j < reportData[i].children.length; j++) {
        tempArr = [];
        tempObj = {
          mother: eachNameTong,
          class: [ "name_" + String(i) + "_" + String(j), ((reportData[i].children[j].matrix !== undefined && reportData[i].children[j].over) ? "overTarget" : "generalTarget") ],
          attribute: [
            { x: String(i) },
            { y: String(j) },
          ],
          text: reportData[i].children[j].name,
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size - 2) + ea,
            fontWeight: String(600),
            color: colorChip.green,
            height: String(reportData[i].children[j].height) + ea,
            width: String(100) + '%',
            marginBottom: String((j !== reportData[i].children.length - 1) ? factorMarginTop : 0) + ea,
            borderBottom: j !== reportData[i].children.length - 1 ? ("1px solid " + colorChip.gray4) : "",
          }
        };
        tempArr.push(tempObj);

        tempObj = {
          mother: eachValueTong,
          class: [ "report_" + String(i) + "_" + String(j) ],
          attribute: [
            { x: String(i) },
            { y: String(j) },
          ],
          style: {
            display: "block",
            position: "relative",
            height: String(reportData[i].children[j].height) + ea,
            width: String(100) + '%',
            overflow: "hidden",
            marginBottom: String((j !== reportData[i].children.length - 1) ? factorMarginTop : 0) + ea,
            borderBottom: j !== reportData[i].children.length - 1 ? ("1px solid " + colorChip.gray4) : "",
          }
        };
        tempArr.push(tempObj);

        if (reportData[i].children[j].matrix !== undefined) {
          for (let h = 0; h < reportData[i].children[j].matrix.length; h++) {
            tempObj = {
              mother: -1 + (-1 * h * (reportData[i].children[j].width.length + 1)),
              class: [ "report_" + String(i) + "_" + String(j), "report_" + String(i) + "_" + String(j) + "_" + String(h) ],
              attribute: [
                { x: String(i) },
                { y: String(j) },
                { z: String(h) },
              ],
              style: {
                display: ((i === 2) || (h < overConst)) ? "block" : "none",
                position: "relative",
                height: String(factorHeight) + ea,
                width: String(100) + '%',
                left: String(0) + ea,
                overflow: "hidden"
              }
            };
            tempArr.push(tempObj);
            left = 0;
            for (let k = 0; k < reportData[i].children[j].width.length; k++) {
              tempObj = {
                mother: -1 + (-1 * k),
                text: String(reportData[i].children[j].matrix[h][k]),
                style: {
                  position: "absolute",
                  fontSize: String(size - 2) + ea,
                  fontWeight: String(j === 0 ? 600 : 400),
                  color: colorChip.black,
                  height: String(100) + '%',
                  width: String(reportData[i].children[j].width[k] * mediaWidthRatio) + ea,
                  top: String(0) + ea,
                  left: String(left) + ea,
                  textAlign: "center",
                }
              };
              tempArr.push(tempObj);
              left += reportData[i].children[j].width[k] * mediaWidthRatio;
            }
          }
        } else if (reportData[i].children[j].result !== undefined) {

          for (let h = 0; h < reportData[i].children[j].result.words.length; h++) {
            tempObj = {
              mother: -1 + (-1 * h * ((reportData[i].children[j].result.words[h].values.length * 2) + 1 + 1)),
              class: [ "report_" + String(i) + "_" + String(j), "report_" + String(i) + "_" + String(j) + "_" + String(h) ],
              attribute: [
                { x: String(i) },
                { y: String(j) },
                { z: String(h) },
              ],
              style: {
                display: "block",
                position: "relative",
                height: String(factorHeight) + ea,
                width: String(100) + '%',
                left: String(0) + ea,
                overflow: "hidden"
              }
            };
            tempArr.push(tempObj);

            tempObj = {
              mother: -3 + (-1 * h * ((reportData[i].children[j].result.words[h].values.length * 2) + 1 + 1)),
              text: String(reportData[i].children[j].result.words[h].name),
              style: {
                display: "block",
                position: "relative",
                height: String(factorHeight) + ea,
                fontSize: String(size - 2) + ea,
                fontWeight: String(600),
                color: colorChip.black,
                width: String(100) + '%',
                top: String(0) + ea,
                left: String(0) + ea,
                textAlign: "left",
              }
            };
            tempArr.push(tempObj);

            left = sumStartLeft;
            for (let k = 0; k < reportData[i].children[j].result.words[h].values.length; k++) {
              tempObj = {
                mother: -2 + (-2 * k),
                text: String(reportData[i].children[j].result.words[h].values[k].name),
                style: {
                  position: "absolute",
                  fontSize: String(size - 2) + ea,
                  fontWeight: String(400),
                  color: colorChip.green,
                  height: String(100) + '%',
                  width: String(reportData[i].children[j].result.words[h].values[k].width[0] * mediaWidthRatio) + ea,
                  top: String(0) + ea,
                  left: String(left) + ea,
                  textAlign: "left",
                }
              };
              tempArr.push(tempObj);
              left += reportData[i].children[j].result.words[h].values[k].width[0] * mediaWidthRatio;

              tempObj = {
                mother: -3 + (-2 * k),
                text: String(reportData[i].children[j].result.words[h].values[k].value),
                style: {
                  position: "absolute",
                  fontSize: String(size - 2) + ea,
                  fontWeight: String(400),
                  color: colorChip.black,
                  height: String(100) + '%',
                  width: String(reportData[i].children[j].result.words[h].values[k].width[1] * mediaWidthRatio) + ea,
                  top: String(0) + ea,
                  left: String(left) + ea,
                  textAlign: "left",
                }
              };
              tempArr.push(tempObj);
              left += reportData[i].children[j].result.words[h].values[k].width[1] * mediaWidthRatio;
            }
          }
        }
        createNodes(tempArr);
      }
    }
    overTargets = document.querySelectorAll('.' + "overTarget");
    for (let dom of overTargets) {
      createNode({
        mother: dom,
        attribute: [
          { x: dom.getAttribute('x') },
          { y: dom.getAttribute('y') },
          { toggle: "off" },
        ],
        events: [
          {
            type: "click",
            event: function (e) {
              const x = Number(this.getAttribute('x'));
              const y = Number(this.getAttribute('y'));
              const toggle = this.getAttribute("toggle");
              let targets, temp, length;

              targets = [];
              temp = document.querySelector(".report_" + String(x) + "_" + String(y));
              targets.push(temp);
              temp = document.querySelector(".name_" + String(x) + "_" + String(y));
              targets.push(temp);
              length = targets[0].children.length;

              if (toggle === "off") {
                for (let target of targets) {
                  target.style.height = String((factorHeight * length) + factorMarginBottom) + ea;
                }
                for (let child of targets[0].children) {
                  child.style.display = "block";
                }
                this.setAttribute("toggle", "on");
              } else {
                for (let target of targets) {
                  target.style.height = String((factorHeight * overConst) + factorMarginBottom) + ea;
                }
                for (let i = 0; i < length; i++) {
                  if (i < overConst) {
                    targets[0].children[i].style.display = "block";
                  } else {
                    targets[0].children[i].style.display = "none";
                  }
                }
                this.setAttribute("toggle", "off");
              }
            }
          }
        ],
        class: [ "hoverDefault" ],
        style: {
          position: "absolute",
          bottom: String(factorMarginTop + factorMarginBottom - 3) + ea,
          left: String(0) + ea,
          width: String(overWidth) + ea,
          height: String(overRadius + 12) + ea,
          background: colorChip.white,
          cursor: "pointer",
        },
        children: [
          {
            style: {
              position: "absolute",
              height: String(overRadius) + ea,
              width: String(overRadius) + ea,
              background: colorChip.green,
              borderRadius: String(overRadius) + ea,
              bottom: String(0) + ea,
              left: String(0) + ea,
            }
          },
          {
            style: {
              position: "absolute",
              height: String(overRadius) + ea,
              width: String(overRadius) + ea,
              background: colorChip.green,
              borderRadius: String(overRadius) + ea,
              bottom: String(0) + ea,
              left: String(overRadius * 1.5) + ea,
            }
          },
          {
            style: {
              position: "absolute",
              height: String(overRadius) + ea,
              width: String(overRadius) + ea,
              background: colorChip.green,
              borderRadius: String(overRadius) + ea,
              bottom: String(0) + ea,
              left: String(overRadius * 3) + ea,
            }
          },
        ]
      });
    }
  } else {
    for (let { name, children: matrix, boldMap, titleMap, callbackMap, widthRatio, columns } of mobileReportData) {
      if (matrix.length > 0) {

        mobileBlock = createNode({
          mother: baseTong,
          style: {
            display: "block",
            position: "relative",
            marginLeft: String(leftMargin) + ea,
            width: withOut(100, leftMargin * 2, ea),
            paddingTop: String(mobileBlockPaddingTop) + ea,
          },
          children: [
            {
              style: {
                position: "absolute",
                top: String(mobileBlockPaddingTop) + ea,
                left: String(0),
                height: String(mobileBlockLineTop) + ea,
                width: String(100) + '%',
                borderBottom: "1px dashed " + colorChip.gray3,
              }
            },
            {
              text: name,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(mobileBlockTitleSize) + ea,
                fontWeight: String(600),
                marginBottom: String(mobileBlockTableBetween) + ea,
                paddingRight: String(mobileBlockLineBetween) + ea,
                background: colorChip.white,
              }
            }
          ]
        });

        matrix.unshift(columns);
        table = mother.makeTable(matrix, { style: {
          width: (100 - (mobileOuterMargin * 2) - (leftMargin * 2)) / (widthRatio.reduce((accumulator, current) => { return accumulator + current; })),
          height: mobileTableBlockHeight,
          size: mobileTableFontSize,
          innerMargin: mobileTableInnderMargin,
          innerMarginLeft: mobileTableInnderMargin
        }, boldMap, titleMap, callbackMap, widthRatio, whiteMode: true });
        mobileBlock.appendChild(table);
        table = baseTong.lastChild;
        table.style.position = "relative";
        table.style.display = "block";
        table.style.marginBottom = String(mobileTableMarginBottom) + ea;

      }
    }
  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.reportIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref } = GeneralJs;
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
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, cInitialIcon;

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
  cInitialIcon = nodeArr[10];

  this.iconTong = mother;
  this.listIcon = listIcon;
  this.aInitialIcon = aInitialIcon;
  this.previousIcon = previousIcon;
  this.mInitialIcon = mInitialIcon;
  this.nextIcon = nextIcon;
  this.cInitialIcon = cInitialIcon;

  if (!this.middleMode) {

    listIcon.addEventListener("click", function (e) {
      blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general");
    });

    previousIcon.addEventListener("click", function (e) {
      const { desid: previousDesid } = instance.designers.previous(desid);
      if (instance.modes.indexOf(instance.mode) === 0) {
        instance.checkListDetailLaunching(previousDesid);
      } else {
        instance.reportDetailLaunching(previousDesid);
      }
    });

    nextIcon.addEventListener("click", function (e) {
      const { desid: nextDesid } = instance.designers.next(desid);
      if (instance.modes.indexOf(instance.mode) === 0) {
        instance.checkListDetailLaunching(nextDesid);
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
          grayBack.setAttribute("toggle", "off");
          instance.listIcon.style.left = String(left2) + ea;
        } else {
          grayBack.style.width = String(instance.grayBarWidth) + ea;
          listPannel.style.transform = "translateX(" + String(0) + ea + ")";
          iconSetPannel.style.background = colorChip.gray0;
          mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
          mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
          grayBack.setAttribute("toggle", "on");
          instance.listIcon.style.left = String(left) + ea;
        }

      });

    } else {

      listIcon.addEventListener("click", function (e) {
        instance.mode = "request";
        instance.requestDetailLaunching(designer.desid);
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

  cInitialIcon.addEventListener("click", function (e) {
    instance.checkListDetailLaunching(desid);
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
        method: "designerCheckList",
        name: designer.designer,
        phone: designer.information.phone,
        option: {
          desid: designer.desid,
          designer: designer.designer,
          host: FRONTHOST.replace(/https\:\/\//gi, "").trim(),
          path: "about",
        }
      }, "/alimTalk").then(() => {
        return GeneralJs.ajaxJson({
          page: "report",
          mode: "send",
          who: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail,
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

DesignerJs.prototype.reportAddExtractEvent = function () {
  const instance = this;
  const { ea } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  if (this.mother.belowButtons !== undefined && this.mother.belowButtons !== null) {
    if (this.mother.belowButtons.sub !== undefined && this.mother.belowButtons.sub !== null) {
      if (this.mother.belowButtons.sub.extractIcon !== undefined && this.mother.belowButtons.sub.extractIcon !== null) {
        this.mother.belowButtons.sub.extractIcon.addEventListener("click", (e) => {
          if (instance.result !== null) {
            const width = 50;
            const [ back, icon ] = createNodes([
              {
                mother: instance.totalMother,
                class: [ "justfadein" ],
                style: {
                  position: "fixed",
                  zIndex: String(2),
                  background: colorChip.black,
                  opacity: String(0.2),
                  width: "100%",
                  height: "100%",
                  top: String(0),
                  left: String(0),
                }
              },
              {
                mother: instance.totalMother,
                class: [ "loading" ],
                mode: "svg",
                source: instance.mother.returnLoading(),
                style: {
                  position: "fixed",
                  zIndex: String(2),
                  width: String(width) + ea,
                  height: String(width) + ea,
                  top: "calc(50% - " + String((width / 2) + 60) + ea + ")",
                  left: "calc(50% - " + String((width / 2)) + ea + ")",
                }
              }
            ]);
            instance.result.toSheets().then((link) => {
              back.classList.remove("justfadein");
              back.classList.add("justfadeout");
              icon.style.opacity = "0";
              GeneralJs.timeouts["extractPendingBack"] = setTimeout(() => {
                let viewFunction;
                instance.totalMother.removeChild(instance.totalMother.lastChild);
                instance.totalMother.removeChild(instance.totalMother.lastChild);
                window.alert("시트 제작이 요청되었습니다! 슬랙을 통해 링크가 갈 예정입니다!");
                clearTimeout(GeneralJs.timeouts["extractPendingBack"]);
                GeneralJs.timeouts["extractPendingBack"] = null;
              }, 401);
            });
          }
        });
      }
    }
  }
}

DesignerJs.prototype.reportView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
    const length = designers.length;
    const getObj = returnGet();
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

    this.designers = new Designers(designers);
    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[1].getAttribute("desid");
    this.result = null;
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[1];

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    //search event
    if (this.searchInput !== undefined && this.searchInput !== null) {
      searchInput = this.searchInput;
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
          let target;
          if (value === "") {
            instance.reportDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            target = null;
            for (let { designer, desid } of instance.designers) {
              if (value === designer) {
                target = desid;
              }
            }
            if (target !== null) {
              instance.reportDetailLaunching(target);
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
          instance.reportDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
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
    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    //sse
    // const es = new EventSource("https://" + SSEHOST + ":3000/specificsse/checklistDesigner");
    // es.addEventListener("updateTong", (e) => {
    //   instance.checkListSseParsing(equalJson(e.data));
    // });

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    window.addEventListener("resize", (e) => {
      window.location.reload();
    });
    window.addEventListener("popstate", (e) => {
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (getObj.mode === instance.pageHistory[1].path) {
          instance.reportDetailLaunching(instance.pageHistory[1].desid);
          instance.pageHistory.shift();
          instance.pageHistory.shift();
        }
      }
    });

    //launching
    this.reportDetailLaunching(this.desid);

    //add extract event
    this.reportAddExtractEvent();

  } catch (e) {
    console.log(e);
  }
}
