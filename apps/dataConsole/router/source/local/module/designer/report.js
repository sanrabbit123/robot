DesignerJs.prototype.reportData = function (factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight) {
  const instance = this;
  const checkListData = [
    {
      name: "일반",
      children: [
        {
          name: "성함",
          value: function (designer) {
            return designer.designer;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "연락처",
          value: function (designer) {
            return designer.information.phone;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "이메일",
          value: function (designer) {
            return designer.information.email;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "계약 상태",
          value: function (designer) {
            return designer.information.contract.status;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "계약일",
          value: function (designer) {
            const zeroAddition = (num) => { return (num < 10) ? '0' + String(num) : String(num); }
            const targetDate = designer.information.contract.date;
            return String(targetDate.getFullYear()) + '-' + zeroAddition(targetDate.getMonth() + 1) + '-' + zeroAddition(targetDate.getDate());
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "웹페이지",
          value: function (designer) {
            return (designer.information.personalSystem.webPage.length === 0) ? "웹페이지 없음" : designer.information.personalSystem.webPage[0];
          },
          script: function (mother, designer) {
            const text = mother.textContent.trim();
            if (/^http/gi.test(text)) {
              GeneralJs.blankHref(text);
            }
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "인스타",
          value: function (designer) {
            const sns = designer.information.personalSystem.sns;
            let target;
            target = "인스타그램 없음";
            for (let { kind, href } of sns) {
              if (/insta/gi.test(kind)) {
                target = href;
              }
            }
            return target;
          },
          script: function (mother, designer) {
            const text = mother.textContent.trim();
            if (/^http/gi.test(text)) {
              GeneralJs.blankHref(text);
            }
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "블로그",
          value: function (designer) {
            const sns = designer.information.personalSystem.sns;
            let target;
            target = "블로그 없음";
            for (let { kind, href } of sns) {
              if (/naver/gi.test(kind)) {
                target = href;
              }
            }
            return target;
          },
          script: function (mother, designer) {
            const text = mother.textContent.trim();
            if (/^http/gi.test(text)) {
              GeneralJs.blankHref(text);
            }
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "기타 SNS",
          value: function (designer) {
            const sns = designer.information.personalSystem.sns;
            let target;
            target = "기타 SNS 없음";
            for (let { kind, href } of sns) {
              if (!/naver/gi.test(kind) && !/insta/gi.test(kind)) {
                target = href;
              }
            }
            return target;
          },
          script: function (mother, designer) {
            const text = mother.textContent.trim();
            if (/^http/gi.test(text)) {
              GeneralJs.blankHref(text);
            }
          },
          height: factorHeight * 1.1,
          type: "string",
        },
      ]
    },
    {
      name: "업무",
      children: [
        {
          name: "경력",
          value: function (designer) {
            const { information } = designer;
            const { relatedY, relatedM, startY, startM } = information.business.career;
            return `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`;
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let tempArr;
            let arr0, arr1;
            let relatedY, relatedM, startY, startM;
            let divText;
            updateQuery = {};
            divText = "";
            if (!/\|/g.test(text)) {
              return errorObj;
            } else {
              tempArr = text.split('|');
              if (tempArr.length !== 2) {
                return errorObj;
              } else {
                if (/년/g.test(tempArr[0]) && /년/g.test(tempArr[1])) {
                  arr0 = tempArr[0].split('년');
                  arr1 = tempArr[1].split('년');
                  if (arr0.length === 2 && arr1.length === 2) {
                    if (arr0[0].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr0[1].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr1[0].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (arr1[1].replace(/[^0-9]/gi, '').length === 0) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr0[0].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr0[1].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr1[0].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    if (Number.isNaN(Number(arr1[1].replace(/[^0-9]/gi, '')))) {
                      return errorObj;
                    }
                    relatedY = Number(arr0[0].replace(/[^0-9]/gi, ''));
                    relatedM = Number(arr0[1].replace(/[^0-9]/gi, ''));
                    startY = Number(arr1[0].replace(/[^0-9]/gi, ''));
                    startM = Number(arr1[1].replace(/[^0-9]/gi, ''));
                    if (relatedY < 0) {
                      return errorObj;
                    }
                    if (relatedM < 0 || relatedM > 12) {
                      return errorObj;
                    }
                    if (startY < 1900 || startY > 4000) {
                      return errorObj;
                    }
                    if (startM <= 0 || startM > 12) {
                      return errorObj;
                    }
                    updateQuery["information.business.career.relatedY"] = relatedY;
                    updateQuery["information.business.career.relatedM"] = relatedM;
                    updateQuery["information.business.career.startY"] = startY;
                    updateQuery["information.business.career.startM"] = startM;
                    divText = `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`;
                  } else {
                    return errorObj;
                  }
                } else {
                  return errorObj;
                }
              }
            }
            return { updateQuery, text: divText };
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "경력 상세",
          value: function (designer) {
            return "팝업 보기";
          },
          script: function (mother, designer) {
            if (document.getElementById("memoTong") === null) {
              mother.textContent = "팝업 제거";
            } else {
              mother.textContent = "팝업 보기";
            }
            instance.reportDesignerMemo(designer.desid).call(instance.totalMother, { preventDefault: () => {}, stopPropagation: () => {} });
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "일정",
          value: function (designer) {
            return "일정 보기";
          },
          script: function (mother, designer) {
            GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=calendar&desid=" + designer.desid);
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "포트폴리오",
          value: function (designer) {
            return "포트폴리오 보기";
          },
          script: function (mother, designer) {
            GeneralJs.blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general&desid=" + designer.desid);
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "계좌번호",
          value: function (designer) {
            return (designer.information.business.account.length === 0) ? "계좌 없음" : designer.information.business.account[0].bankName + " " + designer.information.business.account[0].accountNumber;
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            let tempArr, tempObj;
            updateQuery = {};
            divText = "";
            updateQuery["information.business.account"] = [];
            if (/없음/gi.test(text)) {
              return { updateQuery: { "information.business.account": [] }, text: "계좌 없음" };
            } else if (!/ /gi.test(text)) {
              return errorObj;
            } else {
              tempArr = text.split(' ');
              if (tempArr.length !== 2) {
                return errorObj;
              } else {
                if (tempArr[1].replace(/[0-9\-]/g, '') === '') {
                  tempObj = {};
                  tempObj.bankName = tempArr[0].trim();
                  tempObj.accountNumber = tempArr[1].trim().replace(/[^0-9\-]/g, '');
                  updateQuery["information.business.account"].push(tempObj);
                  divText = tempObj.bankName + " " + tempObj.accountNumber;
                } else {
                  return errorObj;
                }
              }
            }
            return { updateQuery, text: divText };
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "사업자 분류",
          value: function (designer) {
            let contents, value;
            contents = [ "프리랜서", "개인사업자(간이)", "개인사업자(일반)", "법인사업자(간이)", "법인사업자(일반)" ];
            value = [];
            for (let i of contents) {
              if (i === designer.information.business.businessInfo.classification) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [ "프리랜서", "개인사업자(간이)", "개인사업자(일반)", "법인사업자(간이)", "법인사업자(일반)" ];
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
                break;
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "information.business.businessInfo.classification": target };
          },
          height: factorHeight * 2.1,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "사업자 등록번호",
          value: function (designer) {
            return (designer.information.business.businessInfo.businessNumber === '') ? "사업자 등록번호 없음" : designer.information.business.businessInfo.businessNumber;
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            let tempArr, tempObj;
            updateQuery = {};
            divText = "";
            if (/없음/gi.test(text)) {
              return { updateQuery: { "information.business.businessInfo.businessNumber": "" }, text: "사업자 등록번호 없음" };
            } else if (text.replace(/[0-9\-]/g, '') === '') {
              updateQuery["information.business.businessInfo.businessNumber"] = text.replace(/[^0-9\-]/g, '');
              divText = text.replace(/[^0-9\-]/g, '');
            } else {
              return errorObj;
            }
            return { updateQuery, text: divText };
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "수수료",
          value: function (designer) {
            const dateToString = (date) => { return String(date.getFullYear()).slice(2) + '.' + String(date.getMonth() + 1) + '.' + String(date.getDate()); }
            const history = designer.information.business.service.cost.percentageHistory;
            const token = "&nbsp;/&nbsp;";
            let str;
            let tempArr, tempArr2;
            str = String(designer.information.business.service.cost.percentage) + " (현재)";
            for (let { date: { start, end }, percentage } of history) {
              str += token;
              str += String(percentage);
              str += " (";
              str += dateToString(start);
              str += "-";
              str += dateToString(end);
              str += ")";
            }
            if (/\//g.test(str)) {
              if (str.split("/").length > 5) {
                tempArr = str.split("/");
                tempArr2 = [];
                for (let i = 0; i < 5; i++) {
                  tempArr2.push(tempArr[i].trim());
                }
                str = tempArr2.join(token);
              }
            }
            return str;
          },
          update: function (text, designer) {
            const dateToString = (date) => { return String(date.getFullYear()).slice(2) + '.' + String(date.getMonth() + 1) + '.' + String(date.getDate()); }
            const errorObj = { updateQuery: "error", text: "error" };
            const token = "&nbsp;/&nbsp;";
            let updateQuery;
            let divText;
            let tempArr, tempArr2;
            let past, history, contractDate, startDate, endDate;
            let str;

            updateQuery = {};
            divText = "";

            past = designer.information.business.service.cost.percentage;
            history = designer.information.business.service.cost.percentageHistory;
            contractDate = designer.information.contract.date;

            tempArr = text.split(' ');
            if (tempArr.length === 0) {
              return errorObj;
            }
            text = tempArr[0];

            if (/[^0-9]/g.test(text)) {
              return errorObj;
            } else {
              if (Number.isNaN(Number(text.replace(/[^0-9]/g, '')))) {
                return errorObj;
              } else {
                endDate = new Date();
                if (history.length === 0) {
                  startDate = contractDate;
                } else {
                  startDate = history[0].date.end;
                }
                history.unshift({ date: { start: startDate, end: endDate }, percentage: past });
                updateQuery["information.business.service.cost.percentage"] = Number(text.replace(/[^0-9]/g, ''));
                updateQuery["information.business.service.cost.percentageHistory"] = history;

                str = String(text) + " (현재)";
                for (let { date: { start, end }, percentage } of history) {
                  str += token;
                  str += String(percentage);
                  str += " (";
                  str += dateToString(start);
                  str += "-";
                  str += dateToString(end);
                  str += ")";
                }

                if (/\//g.test(str)) {
                  if (str.split("/").length > 5) {
                    tempArr = str.split("/");
                    tempArr2 = [];
                    for (let i = 0; i < 5; i++) {
                      tempArr2.push(tempArr[i].trim());
                    }
                    str = tempArr2.join(token);
                  }
                }
                divText = str;
              }
            }
            return { updateQuery, text: divText };
          },
          height: factorHeight * 1.1,
          type: "string",
        },
      ]
    },
    {
      name: "공간",
      children: [
        {
          name: "주소",
          value: function (designer) {
            return (designer.information.address.length === 0) ? "주소 없음" : designer.information.address[0];
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            updateQuery = {};
            divText = "";
            if (text === '') {
              return errorObj;
            } else {
              if (/없음/gi.test(text)) {
                updateQuery["information.address"] = [ text ];
              } else {
                updateQuery["information.address.0"] = text;
              }
            }
            return { updateQuery, text };
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "유효 범위",
          value: function (designer) {
            return String(designer.analytics.region.range) + "km";
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            let tempArr, tempObj;
            updateQuery = {};
            divText = "";
            text = Number(text.replace(/[^0-9]/gi, ''));
            updateQuery["analytics.region.range"] = text;
            divText = String(text) + "km";
            if (Number.isNaN(text)) {
              return errorObj;
            } else {
              return { updateQuery, text: divText };
            }
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "한계 범위",
          value: function (designer) {
            return String(designer.analytics.region.expenses) + "km";
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            let tempArr, tempObj;
            updateQuery = {};
            divText = "";
            text = Number(text.replace(/[^0-9]/gi, ''));
            updateQuery["analytics.region.expenses"] = text;
            divText = String(text) + "km";
            if (Number.isNaN(text)) {
              return errorObj;
            } else {
              return { updateQuery, text: divText };
            }
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "이동 수단",
          value: function (designer) {
            let contents, value;
            contents = [
              "대중교통",
              "자동차"
            ];
            value = [
              (/대중/.test(designer.analytics.region.transportation)) ? 1 : 0,
              (/대중/.test(designer.analytics.region.transportation)) ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [
              "대중교통",
              "자동차"
            ];
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
                break;
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.region.transportation": target };
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "작업",
      children: [
        {
          name: "활동 범위",
          value: function (designer) {
            const { matrix } = designer.analytics.project;
            let contents, value;
            contents = [
              "홈퍼니싱 프리미엄",
              "홈스타일링 프리미엄",
              "토탈 스타일링 프리미엄",
              "설계 변경 프리미엄",
              "홈퍼니싱 일반",
              "홈스타일링 일반",
              "토탈 스타일링 일반",
              "설계 변경 일반",
            ];
            value = [
              matrix[0][2],
              matrix[1][2],
              matrix[2][2],
              matrix[3][2],
              matrix[0][1],
              matrix[1][1],
              matrix[2][1],
              matrix[3][1],
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            let xy, updateQuery;
            const positionConst = "analytics.project.matrix.";
            xy = [
              '0.2',
              '1.2',
              '2.2',
              '3.2',
              '0.1',
              '1.1',
              '2.1',
              '3.1',
            ];
            updateQuery = {};
            for (let i = 0; i < value.length; i++) {
              updateQuery[positionConst + xy[i]] = value[i];
            }
            return updateQuery;
          },
          height: factorHeight * 2,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "부분 공간",
          value: function (designer) {
            const { matrix } = designer.analytics.project;
            let contents, value;
            contents = [
              "홈퍼니싱 부분 공간",
              "홈스타일링 부분 공간",
              "토탈 스타일링 부분 공간",
              "설계 변경 부분 공간",
            ];
            value = [
              matrix[0][0],
              matrix[1][0],
              matrix[2][0],
              matrix[3][0],
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            let xy, updateQuery;
            const positionConst = "analytics.project.matrix.";
            xy = [
              '0.0',
              '1.0',
              '2.0',
              '3.0'
            ];
            updateQuery = {};
            for (let i = 0; i < value.length; i++) {
              updateQuery[positionConst + xy[i]] = value[i];
            }
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "온라인",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.project.online ? 1 : 0,
              designer.analytics.project.online ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.project.online";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "거주중",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.project.living ? 1 : 0,
              designer.analytics.project.living ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.project.living";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "고객 예산 범위",
          value: function (designer) {
            let { min, max } = designer.analytics.project.operationBudget;
            let contentsValues;
            let tempArr;
            let contents, value;

            min = min / 10000;
            max = max / 10000;

            contents = [
              "0 - 500",
              "500 - 1000",
              "1000 - 2000",
              "2000 - 5000",
              "5000 -",
            ];

            contentsValues = [];
            for (let i = 0; i < contents.length; i++) {
              tempArr = contents[i].split(' - ');
              if (tempArr.length === 1) {
                tempArr.push("10000");
              }
              for (let j = 0; j < tempArr.length; j++) {
                tempArr[j] = Number(tempArr[j].replace(/[^0-9]/g, ''));
              }
              if (tempArr.length !== 2) {
                throw new Error("range error");
              }
              contentsValues.push(tempArr);
            }
            value = [];
            for (let i = 0; i < contents.length; i++) {
              value.push((min <= contentsValues[i][0] && contentsValues[i][1] <= max) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            let contents;
            let min = null, max = null;
            contents = [
              [ 0, 500 ],
              [ 500, 1000 ],
              [ 1000, 2000 ],
              [ 2000, 5000 ],
              [ 5000, 10000 ],
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                min = i;
                break;
              }
            }
            for (let i = contents.length - 1; i > -1; i--) {
              if (value[i] === 1) {
                max = i;
                break;
              }
            }
            if (min === null || max === null) {
              min = 0;
              max = 0;
            }
            return { "analytics.project.operationBudget": { min: (contents[min][0] * 10000), max: (contents[max][1] * 10000) } };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 5,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "1차 제안 시간",
          value: function (designer) {
            let contents, value;
            contents = [
              "1주일 이내",
              "2주일 이내",
              "3주일 이내",
              "3주 이상"
            ];
            value = [];
            for (let i = 0; i < contents.length; i++) {
              if (designer.analytics.project.time.first === ((i + 1) * 7)) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [
              7,
              14,
              21,
              28
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = i;
              }
            }
            return { "analytics.project.time.first": contents[target] };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "페이퍼 워크",
          value: function (designer) {
            let contents, value;
            contents = [
              "도면",
              "3D",
              "컨셉 제안",
              "마감재 제안",
              "제품 리스트",
              "참고 이미지",
              "드로잉",
            ];
            value = [];
            for (let i of contents) {
              value.push(designer.analytics.project.paperWork.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [
              "도면",
              "3D",
              "컨셉 제안",
              "마감재 제안",
              "제품 리스트",
              "참고 이미지",
              "드로잉",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            return { "analytics.project.paperWork": target };
          },
          height: factorHeight * 2.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
      ]
    },
    {
      name: "시공",
      children: [
        {
          name: "시공 능력",
          value: function (designer) {
            let contents, value;
            contents = [ "1단계", "2단계", "3단계" ];
            value = [ 0, 0, 0 ];
            if (value[designer.analytics.construct.level - 1] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.construct.level - 1] = 1;
            return { contents, value };
          },
          update: function (value, designer) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i + 1;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.construct.level": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "시공 감리",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.construct.possible.supervision ? 1 : 0,
              designer.analytics.construct.possible.supervision ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.possible.supervision";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "시공 방식 (S)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[0].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.case.0.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (S)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[0].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.case.0.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 방식 (T)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[1].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.case.1.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (T)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[1].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.case.1.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 방식 (XT)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[2].contract.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.case.2.contract";
            let contents, updateQuery, target;
            contents = [
              "직접 계약, 직접 감리",
              "직접 계약, 외주 감리",
              "협업사 계약",
              "공정별 연결"
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "시공 가능 (XT)",
          value: function (designer) {
            const constructCase = designer.analytics.construct.case;
            if (!Array.isArray(constructCase)) {
              throw new Error("invaild value");
            }
            if (constructCase.length !== 3) {
              throw new Error("invaild value");
            }
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(constructCase[2].possible.includes(i) ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.case.2.possible";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            updateQuery = {};
            updateQuery[position] = target;
            return updateQuery;
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
      ]
    },
    {
      name: "스타일링",
      children: [
        {
          name: "스타일링 능력",
          value: function (designer) {
            let contents, value;
            contents = [ "1단계", "2단계", "3단계" ];
            value = [ 0, 0, 0 ];
            if (value[designer.analytics.styling.level - 1] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.styling.level - 1] = 1;
            return { contents, value };
          },
          update: function (value, designer) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i + 1;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.styling.level": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "제안 방식",
          value: function (designer) {
            let contents, value;
            contents = [
              "순차 제안",
              "한번에 제안"
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.analytics.styling.method) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [
              "순차 제안",
              "한번에 제안"
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.styling.method": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "빌트인 가구 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.furniture.builtin ? 1 : 0,
              designer.analytics.styling.furniture.builtin ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.styling.furniture.builtin";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "디자인 가구 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.furniture.design ? 1 : 0,
              designer.analytics.styling.furniture.design ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.styling.furniture.design";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "커튼 패브릭 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.fabric.curtain ? 1 : 0,
              designer.analytics.styling.fabric.curtain ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.styling.fabric.curtain";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "베딩 패브릭 제작",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.styling.fabric.bedding ? 1 : 0,
              designer.analytics.styling.fabric.bedding ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.styling.fabric.bedding";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "패브릭 발주 방식",
          value: function (designer) {
            let contents, value;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            value = [];
            for (let i of contents) {
              if (designer.analytics.styling.fabric.method === i) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[0];
            }
            return { "analytics.styling.fabric.method": target };
          },
          height: factorHeight * 1.5,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "스타일 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "modern",
              "classic",
              "natural",
              "mixmatch",
              "scandinavian",
              "vintage",
              "oriental",
              "exotic",
            ];
            contentsMother = {
              modern: "모던",
              classic: "클래식",
              natural: "내추럴",
              mixmatch: "믹스매치",
              scandinavian: "북유럽",
              vintage: "빈티지",
              oriental: "오리엔탈",
              exotic: "이그저틱",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.style[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t, designer) {
            const position = "analytics.styling.tendency.style.";
            let contents, updateQuery;
            contents = [
              "modern",
              "classic",
              "natural",
              "mixmatch",
              "scandinavian",
              "vintage",
              "oriental",
              "exotic",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 8) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "텍스처 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ];
            contentsMother = {
              darkWood: "진한 우드",
              whiteWood: "연한 우드",
              coating: "도장",
              metal: "금속",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.texture[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t, designer) {
            const position = "analytics.styling.tendency.texture.";
            let contents, updateQuery;
            contents = [
              "darkWood",
              "whiteWood",
              "coating",
              "metal",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 4) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "컬러톤 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "darkWood",
              "whiteWood",
              "highContrast",
              "vivid",
              "white",
              "mono",
              "bright",
              "dark",
            ];
            contentsMother = {
              darkWood: "다크 우드",
              whiteWood: "화이트 우드",
              highContrast: "고대비",
              vivid: "비비드",
              white: "화이트",
              mono: "모노톤",
              bright: "밝은톤",
              dark: "어두운톤",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.color[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t, designer) {
            const position = "analytics.styling.tendency.color.";
            let contents, updateQuery;
            contents = [
              "darkWood",
              "whiteWood",
              "highContrast",
              "vivid",
              "white",
              "mono",
              "bright",
              "dark",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            return updateQuery;
          },
          height: (tendencyFactorHeight * 8) + (factorHeight * 0.7),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
        },
        {
          name: "밀도 경향성",
          value: function (designer) {
            let contents, contentsKey, contentsMother, value;
            contentsKey = [
              "maximun",
              "minimum",
            ];
            contentsMother = {
              maximun: "맥시멈",
              minimum: "미니멈",
            };
            contents = [];
            for (let i of contentsKey) {
              contents.push(contentsMother[i]);
            }
            value = [];
            for (let i of contentsKey) {
              value.push(designer.analytics.styling.tendency.density[i] - 1);
            }
            return { contents, value };
          },
          update: function (z, t, designer) {
            const position = "analytics.styling.tendency.density.";
            let contents, updateQuery;
            contents = [
              "maximun",
              "minimum",
            ];
            updateQuery = {};
            updateQuery[position + contents[z]] = t + 1;
            updateQuery[position + contents[1 - z]] = 10 - (t + 1);
            return updateQuery;
          },
          height: (tendencyFactorHeight * 2) + (factorHeight * 0.5),
          width: factorWidth - tendencyIndent,
          totalWidth: (factorWidth * 4) + tendencyWidthIndent,
          factorHeight: tendencyFactorHeight,
          type: "tendency",
          opposite: true,
        },
      ]
    },
    {
      name: "구매",
      children: [
        {
          name: "구매 대행",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.purchase.agencies ? 1 : 0,
              designer.analytics.purchase.agencies ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.purchase.agencies";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "조립 설치 서비스",
          value: function (designer) {
            let contents, value;
            contents = [
              "제공",
              "미제공"
            ];
            value = [
              designer.analytics.purchase.setting.install ? 1 : 0,
              designer.analytics.purchase.setting.install ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.purchase.setting.install";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "정리 수납 상담",
          value: function (designer) {
            let contents, value;
            contents = [
              "가능",
              "불가능"
            ];
            value = [
              designer.analytics.purchase.setting.storage ? 1 : 0,
              designer.analytics.purchase.setting.storage ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.purchase.setting.storage";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "성격",
      children: [
        {
          name: "미팅 적극성",
          value: function (designer) {
            let contents, value;
            contents = [
              "높음",
              "낮음"
            ];
            value = [
              designer.analytics.etc.personality[0].value ? 1 : 0,
              designer.analytics.etc.personality[0].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.etc.personality.0.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "미팅 준비성",
          value: function (designer) {
            let contents, value;
            contents = [
              "높음",
              "낮음"
            ];
            value = [
              designer.analytics.etc.personality[1].value ? 1 : 0,
              designer.analytics.etc.personality[1].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.etc.personality.1.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "작업 속도",
          value: function (designer) {
            let contents, value;
            contents = [
              "빠름",
              "느림"
            ];
            value = [
              designer.analytics.etc.personality[2].value ? 1 : 0,
              designer.analytics.etc.personality[2].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.etc.personality.2.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "진행 스타일",
          value: function (designer) {
            let contents, value;
            contents = [
              "리드",
              "순응"
            ];
            value = [
              designer.analytics.etc.personality[3].value ? 1 : 0,
              designer.analytics.etc.personality[3].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.etc.personality.3.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "고객 맞춤",
          value: function (designer) {
            let contents, value;
            contents = [
              "적극",
              "소극"
            ];
            value = [
              designer.analytics.etc.personality[4].value ? 1 : 0,
              designer.analytics.etc.personality[4].value ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.etc.personality.4.value";
            let updateQuery;
            updateQuery = {};
            updateQuery[position] = (value[0] === 1);
            return updateQuery;
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "홈리에종 관계",
          value: function (designer) {
            let contents, value;
            contents = [
              "지속가능성 높음",
              "그냥 평범",
              "확인중",
              "좋지 않음"
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.analytics.etc.relation) {
                value.push(1);
              } else {
                value.push(0);
              }
            }
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [
              "지속가능성 높음",
              "그냥 평범",
              "확인중",
              "좋지 않음"
            ];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            return { "analytics.etc.relation": target };
          },
          height: factorHeight * 1.1,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "세팅",
      children: [
        {
          name: "제안서 설명",
          value: function (designer) {
            return designer.setting.description;
          },
          update: function (value, designer) {
            const position = "setting.description";
            const error = "error";
            let updateQuery, tempArr, tempArr2, text;
            updateQuery = {};
            tempArr = value.split('\n');
            tempArr2 = [];
            for (let words of tempArr) {
              if (words.trim().replace(/ /gi, '') !== '') {
                text = words.trim();
                if (text.length >= 56) {
                  return error;
                }
                if (text.length < 20) {
                  return error;
                }
                tempArr2.push(words.trim());
              }
            }
            updateQuery[position] = tempArr2;
            return updateQuery;
          },
          height: (factorHeight * 2) + 24,
          textHeight: 14,
          factorHeight: factorHeight,
          type: "longtext",
        },
        {
          name: "웹 설명",
          value: function (designer) {
            return designer.setting.front.introduction.desktop;
          },
          update: function (value, designer) {
            const position = "setting.front.introduction.desktop";
            const error = "error";
            let updateQuery, tempArr, tempArr2, text;
            updateQuery = {};
            tempArr = value.split('\n');
            tempArr2 = [];
            for (let words of tempArr) {
              if (words.trim().replace(/ /gi, '') !== '') {
                text = words.trim();
                if (text.length >= 38) {
                  return error;
                }
                if (text.length < 12) {
                  return error;
                }
                tempArr2.push(words.trim());
              }
            }
            updateQuery[position] = tempArr2;
            return updateQuery;
          },
          height: (factorHeight * 3) + 11,
          textHeight: 3,
          factorHeight: factorHeight,
          type: "longtext",
        },
      ]
    }
  ];
  return checkListData;
}

DesignerJs.prototype.reportDetailLaunching = function (desid) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { colorChip } = GeneralJs;
  let target;

  this.desid = desid;

  if (this.reportBaseTong !== undefined && this.reportBaseTong !== null) {
    this.reportBaseTong.parentNode.removeChild(this.reportBaseTong);
    this.reportBaseTong = null;
    for (let i = 1; i < this.standardDoms.length; i++) {
      this.standardDoms[i].style.color = colorChip.black;
    }
    if (this.rInitialIcon !== undefined && this.rInitialIcon !== null) {
      this.rInitialIcon.parentElement.removeChild(this.rInitialIcon);
    }
    if (this.nextIcon !== undefined && this.nextIcon !== null) {
      this.nextIcon.parentElement.removeChild(this.nextIcon);
    }
    if (this.mInitialIcon !== undefined && this.mInitialIcon !== null) {
      this.mInitialIcon.parentElement.removeChild(this.mInitialIcon);
    }
    if (this.previousIcon !== undefined && this.previousIcon !== null) {
      this.previousIcon.parentElement.removeChild(this.previousIcon);
    }
    if (this.aInitialIcon !== undefined && this.aInitialIcon !== null) {
      this.aInitialIcon.parentElement.removeChild(this.aInitialIcon);
    }
    if (this.listIcon !== undefined && this.listIcon !== null) {
      this.listIcon.parentElement.removeChild(this.listIcon);
    }
    this.listIcon = null;
    this.aInitialIcon = null;
    this.previousIcon = null;
    this.mInitialIcon = null;
    this.nextIcon = null;
    this.rInitialIcon = null;

    if (document.getElementById("memoTong") !== null) {
      totalMother.removeChild(document.getElementById("memoTong"));
    }
  }

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
  totalMother.scrollTo({ top: 0, behavior: "smooth" });
  this.reportDetail(desid);
  this.reportIconSet(desid);
}

DesignerJs.prototype.reportDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, getCookiesAll } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const matrixButtonConst = "matrixButtons_" + desid;
  const cookies = getCookiesAll();
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

  designer = this.designers.pick(desid);
  information = designer.information;
  analytics = designer.analytics;

  margin = 8;
  level1Width = 160;
  level1Left = 120;
  topMargin = isMac() ? 30 : 34;
  leftMargin = 34;
  bottomMargin = isMac() ? 15 : 13;
  baseTongMarginBottom = 80;
  size = 17;
  tendencyTop = 3;
  tendencyHeight = 16;
  alphabetWidth = 30;

  factorHeight = 34;
  factorWidth = 210;
  tendencyFactorHeight = 30;
  tendencyIndent = 105;
  tendencyWidthIndent = -135;

  factorMarginTop = 22;
  factorMarginBottom = factorHeight - (size - 2 + 9);
  columnVisual = 5;

  textAreaTop = isMac() ? -3 : -4;

  const checkListData = this.reportData(factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight);

  baseTong0 = createNode({
    mother: totalMother,
    style: {
      position: "absolute",
      top: String(margin * 3) + ea,
      left: String(grayBarWidth + (margin * 3)) + ea,
      width: withOut(grayBarWidth + (margin * 6), ea),
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
      borderRadius: String(5) + ea,
      border: "1px solid " + colorChip.gray4,
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
    }
  });


  // DEV ============================================================================
  // ================================================================================

  const thisReport = this.reports.pick(desid);
  const { proposal, contract } = thisReport.timeSplit();
  const reportData = [
    { name: "제안", children: [] },
    { name: "계약", children: [] },
    { name: "가격", children: [] },
  ];

  reportData[0].children.push({
    name: "",
    matrix: [ proposal.columns ],
    width: proposal.width,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  reportData[1].children.push({
    name: "",
    matrix: [ contract.columns ],
    width: contract.width,
    height: factorHeight + factorMarginBottom - columnVisual,
  });

  for (let { name, matrix, values } of proposal) {
    reportData[0].children.push({
      name,
      matrix,
      width: proposal.width,
      height: (values.length >= 3) ? ((factorHeight * 3) + factorMarginBottom) : (values.length > 0 ? ((factorHeight * values.length) + factorMarginBottom) : (factorHeight + factorMarginBottom)),
    });
  }
  for (let { name, matrix, values } of contract) {
    reportData[1].children.push({
      name,
      matrix,
      width: contract.width,
      height: (values.length >= 3) ? ((factorHeight * 3) + factorMarginBottom) : (values.length > 0 ? ((factorHeight * values.length) + factorMarginBottom) : (factorHeight + factorMarginBottom)),
    });
  }

  console.log(proposal);

  // ================================================================================
  // DEV ============================================================================

  for (let i = 0; i < reportData.length; i++) {
    nodeArr = createNodes([
      {
        mother: baseTong,
        style: {
          position: "relative",
          width: String(100) + '%',
          borderBottom: i !== reportData.length - 1 ? "1px solid " + colorChip.gray4 : "",
        }
      },
      {
        mother: -1,
        text: reportData[i].name,
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(700),
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
          paddingBottom: String(bottomMargin) + ea,
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
        text: reportData[i].children[j].name,
        style: {
          display: "block",
          position: "relative",
          fontSize: String(size - 2) + ea,
          fontWeight: String(600),
          color: colorChip.green,
          height: String(reportData[i].children[j].height) + ea,
          width: String(100) + '%',
          marginBottom: String(factorMarginTop) + ea,
          borderBottom: "1px solid " + colorChip.gray4,
        }
      };
      tempArr.push(tempObj);

      tempObj = {
        mother: eachValueTong,
        class: [ "dom_" + String(i) + "_" + String(j) ],
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
          marginBottom: String(factorMarginTop) + ea,
          borderBottom: "1px solid " + colorChip.gray4
        }
      };
      tempArr.push(tempObj);

      for (let h = 0; h < reportData[i].children[j].matrix.length; h++) {
        tempObj = {
          mother: -1 + (-1 * h * (reportData[i].children[j].width.length + 1)),
          class: [ "dom_" + String(i) + "_" + String(j), "dom_" + String(i) + "_" + String(j) + "_" + String(h) ],
          attribute: [
            { x: String(i) },
            { y: String(j) },
            { z: String(h) },
          ],
          style: {
            display: (h < 3) ? "block" : "none",
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
              width: String(reportData[i].children[j].width[k]) + ea,
              top: String(0) + ea,
              left: String(left) + ea,
              textAlign: "center",
            }
          };
          tempArr.push(tempObj);
          left += reportData[i].children[j].width[k];
        }
      }

      createNodes(tempArr);
    }

  }

  this.reportBaseTong = baseTong0;
}

DesignerJs.prototype.reportDesignerMemo = function (desid) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const baseTong = this.reportBaseTong;
  const designer = this.designers.pick(desid);
  return async function (e) {
    try {
      if (document.getElementById("memoTong") === null) {

        let memoTong;
        let margin;
        let innerMargin;
        let titleHeight;
        let size;
        let resObj, history, career;
        let nodeArr;

        margin = 40;
        innerMargin = 15;
        titleHeight = 28;
        size = 16;

        resObj = await ajaxJson({ method: "designer", property: "history", idArr: [ desid ] }, "/getHistoryTotal");
        if (resObj[desid] === undefined) {
          throw new Error("history error");
        }
        career = resObj[desid].career;

        memoTong = createNode({
          mother: totalMother,
          id: "memoTong",
          events: [
            {
              type: "dblclick",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            },
            {
              type: "contextmenu",
              event: function (e) {
                e.preventDefault();
                e.stopPropagation();
                totalMother.removeChild(document.getElementById("memoTong"));
              }
            }
          ],
          style: {
            position: "fixed",
            width: "calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 3) - " + String(margin) + ea + ")",
            height: "calc(calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 3) * 1.5) - " + String(margin) + ea + ")",
            bottom: String(belowHeight + margin) + ea,
            right: String(margin) + ea,
            borderRadius: String(3) + "px",
            boxShadow: "0px 5px 18px -9px " + colorChip.shadow,
            animation: "fadeup 0.3s ease forwards",
            background: colorChip.gradientGreen2,
          }
        });

        nodeArr = createNodes([
          {
            mother: memoTong,
            text: designer.designer + " 디자이너 상세 경력",
            style: {
              position: "absolute",
              top: String(innerMargin - 1) + ea,
              left: String(innerMargin + 1) + ea,
              fontSize: String(size) + ea,
              fontWeight: String(600),
              color: colorChip.white,
            }
          },
          {
            mother: memoTong,
            style: {
              position: "absolute",
              bottom: String(innerMargin) + ea,
              left: String(innerMargin) + ea,
              width: "calc(100% - " + String(innerMargin * 2) + ea + ")",
              height: withOut((innerMargin * 2) + titleHeight, ea),
              background: colorChip.white,
              borderRadius: String(3) + "px",
              opacity: String(0.95),
            }
          },
          {
            mother: -1,
            style: {
              position: "absolute",
              top: String(innerMargin - 2) + ea,
              left: String(innerMargin) + ea,
              width: withOut((innerMargin - 2) * 2, ea),
              height: withOut(innerMargin * 2, ea),
              background: "aqua",
            }
          },
          {
            mother: -1,
            mode: "textarea",
            events: [
              {
                type: "blur",
                event: function (e) {
                  const cookies = GeneralJs.getCookiesAll();
                  const ajaxData = "method=designer&id=" + desid + "&column=career&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                  GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                }
              },
              {
                type: "keypress",
                event: function (e) {
                  if (e.key === "Enter") {
                    const cookies = GeneralJs.getCookiesAll();
                    const ajaxData = "method=designer&id=" + desid + "&column=career&value=" + this.value + "&email=" + cookies.homeliaisonConsoleLoginedEmail;
                    GeneralJs.ajax(ajaxData, "/updateHistory", function () {});
                  }
                }
              },
              {
                type: "contextmenu",
                event: function (e) {
                  e.stopPropagation();
                }
              }
            ],
            style: {
              position: "relative",
              top: String(0),
              left: String(0),
              width: String(100) + '%',
              fontSize: String(size - 1) + ea,
              fontWeight: String(400),
              color: colorChip.black,
              border: String(0),
              outline: String(0),
              overflow: "scroll",
              height: String(100) + '%',
              lineHeight: String(1.7),
            }
          },
        ]);
        nodeArr[3].value = career;

      } else {
        totalMother.removeChild(document.getElementById("memoTong"));
      }

    } catch (e) {
      console.log(e);
    }
  }
}

DesignerJs.prototype.reportIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref } = GeneralJs;
  const { totalMother, ea, grayBarWidth, belowHeight, motherHeight } = this;
  const designer = this.designers.pick(desid);
  let mother;
  let radius;
  let left, bottom;
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = 20;
  left = 40;
  bottom = 40;
  margin = 6;
  color = colorChip.gradientGreen;
  iconTop = 12.5;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    style: {
      position: "fixed",
      height: String(motherHeight) + ea,
      width: String(grayBarWidth) + ea,
      left: String(0),
      bottom: String(belowHeight) + ea,
      background: colorChip.gray0,
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
      source: this.mother.returnHamburger(colorChip.white),
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
      source: this.mother.returnAinitial(colorChip.white),
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
      source: this.mother.returnDecrease(colorChip.white),
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
      source: this.mother.returnMinitial(colorChip.white),
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
      source: this.mother.returnIncrease(colorChip.white),
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
      source: this.mother.returnRinitial(colorChip.white),
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

  this.listIcon = listIcon;
  this.aInitialIcon = aInitialIcon;
  this.previousIcon = previousIcon;
  this.mInitialIcon = mInitialIcon;
  this.nextIcon = nextIcon;
  this.rInitialIcon = rInitialIcon;

  listIcon.addEventListener("click", function (e) {
    blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general");
  });

  previousIcon.addEventListener("click", function (e) {
    const { desid: previousDesid } = instance.designers.previous(desid);
    instance.reportDetailLaunching(previousDesid);
  });

  nextIcon.addEventListener("click", function (e) {
    const { desid: nextDesid } = instance.designers.next(desid);
    instance.reportDetailLaunching(nextDesid);
  });

  rInitialIcon.addEventListener("click", function (e) {
    blankHref(window.location.protocol + "//" + window.location.host + window.location.pathname + "?mode=general&desid=" + desid);
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
    const today = new Date();
    const dayArr = [ '일', '월', '화', '수', '목', '금', '토' ];
    let expiredString = '';

    if (today.getDay() !== 0 && today.getDay() !== 6) {
      //pyeong-day
      today.setDate(today.getDate() + 7);
    } else {
      if (today.getDay() !== 0) {
        //saturday
        today.setDate(today.getDate() + 9);
      } else {
        //sunday
        today.setDate(today.getDate() + 8);
      }
    }

    expiredString += String(today.getMonth() + 1) + "월";
    expiredString += " ";
    expiredString += String(today.getDate()) + "일";
    expiredString += " ";
    expiredString += dayArr[today.getDay()] + "요일";
    expiredString += " ";
    expiredString += String(14) + "시";

    if (window.confirm(designer.designer + " 디자이너님에게 알림톡을 전송합니다. 확실합니까?\n메세지에 기입될 마감 기한 => " + expiredString)) {
      GeneralJs.ajax("method=designerCheckList&name=" + designer.designer + "&phone=" + designer.information.phone + "&option=" + JSON.stringify({ date: expiredString, desid: desid, host: "ADDRESS[homeinfo(ghost)]" }), "/alimTalk", function (rawJson) {
        let middleDate, deadDate;
        if (JSON.parse(rawJson).message !== "success") {
          throw new Error("alimTalk error");
        } else {
          instance.mother.greenAlert("알림톡이 전송되었습니다!");
          //set deadline
          middleDate = new Date();
          middleDate.setHours(middleDate.getHours() + 8);
          deadDate = new Date();
          deadDate.setDate(deadDate.getDate() + 9);
          GeneralJs.ajax("json=" + JSON.stringify({ deadline: deadDate, middleline: middleDate, name: "designerCheckList_" + desid, mode: "set" }), "/manageDeadline", function (res) {});
        }
      });
    } else {
      instance.mother.greenAlert("알림톡 전송을 취소하였습니다.");
    }
  });

}

DesignerJs.prototype.reportDataRendering = async function () {
  const instance = this;
  try {
    const { ajaxJson, dateToString, autoComma } = GeneralJs;
    const today = new Date();
    const yearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
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
    const relationItems = [ "지속가능성 높음", "그냥 평범", "확인중", "좋지 않음" ];
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
      constructor(projects, price) {
        if (projects === undefined || price === undefined) {
          throw new Error("invaild input");
        }
        this.projects = projects;
        this.price = price;
      }
      matrixProposal() {
        const allProjects = this.projects;
        let matrix;
        let arr;
        let order;
        let boo;
        let sum;
        let year, yearSum, yearOrder;
        let half, halfSum, halfOrder;
        let num;

        matrix = [ [ "전체 순서", "년도 순서", "반기 순서", "고객명", "서비스명", "제안 날짜", "제안 금액", "온오프라인", "부분 공간", "계약 여부", "제안서 아이디", "콘솔" ] ];
        order = this.proposal.length;
        sum = 0;
        year = null;
        yearSum = 0;
        yearOrder = 1;
        half = null;
        halfSum = 0;
        halfOrder = 1;

        this.proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });

        for (let obj of this.proposal) {

          if (half !== null) {
            if (half !== obj.date.getFullYear() + (obj.date.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1])) {
              for (let y = 0; y < halfOrder - 1; y++) {
                matrix[matrix.length - 1 - y][2] = y + 1;
              }
              matrix.push([ "반기 합계", "", "", "", "", "", halfSum, "", "", "", "", "" ]);
              halfSum = 0;
              halfOrder = 1;
            }
          }

          if (year !== null) {
            if (year !== obj.date.getFullYear()) {
              num = 0;
              for (let y = 0; y < yearOrder + 1; y++) {
                if (String(matrix[matrix.length - 2 - y][0]).trim().length === 0 || matrix[matrix.length - 2 - y][0] === "전체 순서") {
                  break;
                }
                if (matrix[matrix.length - 2 - y][0] === "반기 합계") {
                  continue;
                } else {
                  num++;
                }
                matrix[matrix.length - 2 - y][1] = num;
              }
              matrix.push([ "년도 합계", "", "", "", "", "", yearSum, "", "", "", "", "" ]);
              matrix.push([ "", "", "", "", "", "", "", "", "", "", "", "" ]);
              yearSum = 0;
              yearOrder = 1;
            }
          }

          arr = [];
          arr.push(order);
          arr.push(order);
          arr.push(order);
          arr.push(obj.client.name);
          arr.push(obj.service.name);
          arr.push(dateToString(obj.date));
          arr.push(obj.detail.amount);
          arr.push(/off/g.test(obj.detail.method) ? "오프라인" : "온라인");
          arr.push(obj.detail.partial ? 'O' : 'X');
          boo = false;
          for (let obj2 of this.contract) {
            if (obj.proid === obj2.project.proid) {
              boo = true;
            }
          }
          arr.push(boo ? 'O' : 'X');
          arr.push(obj.proid);
          arr.push(obj.console);
          matrix.push(arr);

          sum = sum + obj.detail.amount;
          yearSum = yearSum + obj.detail.amount;
          halfSum = halfSum + obj.detail.amount;
          year = obj.date.getFullYear();
          half = obj.date.getFullYear() + (obj.date.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]);
          order = order - 1;
          yearOrder = yearOrder + 1;
          halfOrder = halfOrder + 1;
        }
        matrix.push([ "반기 합계", "", "", "", "", "", halfSum, "", "", "", "", "" ]);
        matrix.push([ "년도 합계", "", "", "", "", "", yearSum, "", "", "", "", "" ]);
        matrix.push([ "전체 합계", "", "", "", "", "", sum, "", "", "", "", "" ]);
        return matrix;
      }
      matrixContract() {
        const allProjects = this.projects;
        let matrix;
        let arr;
        let order;
        let boo;
        let sum, sum2;
        let proposal;
        let targetProject;
        let year, yearSum, yearSum2, yearOrder;
        let half, halfSum, halfSum2, halfOrder;
        let num;

        matrix = [ [ "전체 순서", "년도 순서", "반기 순서", "고객명", "서비스명", "시작일", "종료일", "온오프라인", "부분 공간", "정산 금액", "제안 금액", "수수료", "선금 정산일", "잔금 정산일", "프로젝트 아이디", "콘솔" ] ];
        order = this.contract.length;
        sum = 0;
        sum2 = 0;
        year = null;
        yearSum = 0;
        yearSum2 = 0;
        yearOrder = 1;
        half = null;
        halfSum = 0;
        halfSum2 = 0;
        halfOrder = 1;


        this.contract.sort((a, b) => { return b.project.start.valueOf() - a.project.start.valueOf(); });

        for (let obj of this.contract) {
          proposal = null;
          for (let obj2 of this.proposal) {
            if (obj2.proid === obj.project.proid) {
              proposal = obj2;
            }
          }
          if (proposal === null) {
            for (let project of allProjects) {
              if (obj.project.proid === project.proid) {
                targetProject = project;
              }
            }
            proposal = {
              detail: {
                method: targetProject.proposal.detail[0].fee[0].method,
                partial: targetProject.proposal.detail[0].fee[0].partial,
                amount: 0
              }
            };
          }

          if (half !== null) {
            if (half !== obj.project.start.getFullYear() + (obj.project.start.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1])) {
              for (let y = 0; y < halfOrder - 1; y++) {
                matrix[matrix.length - 1 - y][2] = y + 1;
              }
              matrix.push([ "반기 합계", "", "", "", "", "", "", "", "", halfSum, halfSum2, "", "", "", "", "" ]);
              halfSum = 0;
              halfSum2 = 0;
              halfOrder = 1;
            }
          }

          if (year !== null) {
            if (year !== obj.project.start.getFullYear()) {
              num = 0;
              for (let y = 0; y < yearOrder + 1; y++) {
                if (String(matrix[matrix.length - 2 - y][0]).trim().length === 0 || matrix[matrix.length - 2 - y][0] === "전체 순서") {
                  break;
                }
                if (matrix[matrix.length - 2 - y][0] === "반기 합계") {
                  continue;
                } else {
                  num++;
                }
                matrix[matrix.length - 2 - y][1] = num;
              }
              matrix.push([ "년도 합계", "", "", "", "", "", "", "", "", yearSum, yearSum2, "", "", "", "", "" ]);
              matrix.push([ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ]);
              yearSum = 0;
              yearSum2 = 0;
              yearOrder = 1;
            }
          }

          arr = [];
          arr.push(order);
          arr.push(order);
          arr.push(order);
          arr.push(obj.client.name);
          arr.push(obj.service.name);
          arr.push(dateToString(obj.project.start));
          arr.push(dateToString(obj.project.end));
          arr.push(/off/g.test(proposal.detail.method) ? "오프라인" : "온라인");
          arr.push(proposal.detail.partial ? 'O' : 'X');
          arr.push(obj.payments.amount);
          arr.push(proposal.detail.amount);
          arr.push(obj.payments.percentage);
          arr.push(dateToString(obj.payments.first));
          arr.push(dateToString(obj.payments.remain));
          arr.push(obj.project.proid);
          arr.push(obj.console);
          matrix.push(arr);

          sum = sum + obj.payments.amount;
          sum2 = sum2 + proposal.detail.amount;
          yearSum = yearSum + obj.payments.amount;
          yearSum2 = yearSum2 + proposal.detail.amount;
          halfSum = halfSum + obj.payments.amount;
          halfSum2 = halfSum2 + proposal.detail.amount;
          year = obj.project.start.getFullYear();
          half = obj.project.start.getFullYear() + (obj.project.start.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]);
          order = order - 1;
          yearOrder = yearOrder + 1;
          halfOrder = halfOrder + 1;
        }
        matrix.push([ "반기 합계", "", "", "", "", "", "", "", "", halfSum, halfSum2, "", "", "", "", "" ]);
        matrix.push([ "년도 합계", "", "", "", "", "", "", "", "", yearSum, yearSum2, "", "", "", "", "" ]);
        matrix.push([ "전체 합계", "", "", "", "", "", "", "", "", sum, sum2, "", "", "", "", "" ]);
        return matrix;
      }
      matrixPrice() {
        const service = [
          { serid: "s2011_aa01s", column: "homeFurnishing", name: "홈퍼니싱", id: 'F' },
          { serid: "s2011_aa02s", column: "homeStyling", name: "홈스타일링", id: 'S' },
          { serid: "s2011_aa03s", column: "totalStyling", name: "토탈 스타일링", id: 'T' },
          { serid: "s2011_aa04s", column: "architecture", name: "설계 변경", id: 'XT' }
        ];
        let matrix;
        let basicTarget;
        let premiumTarget;
        let mapFunction;
        let tempArr;
        let target;
        let standards;

        for (let obj of this.price) {
          if (obj.key === 33) {
            standards = obj;
            break;
          }
        }

        matrix = [ [ "추가값", "서비스명" ] ];
        for (let str of standards.standard.x.string) {
          matrix[0].push(str);
        }

        basicTarget = Object.keys(this.price.detail.basic);
        premiumTarget = Object.keys(this.price.detail.premium);
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
            tempArr.push(String(this.price.alpha) + '%');
          } else {
            tempArr.push('');
          }
          tempArr.push(basicTarget[i].name + ' B');
          target = this.price.detail.basic[basicTarget[i].column];
          for (let j = 0; j < target.length; j++) {
            tempArr.push(target[j] * 10000);
          }
          matrix.push(tempArr);
        }

        for (let i = 0; i < premiumTarget.length; i++) {
          tempArr = [];
          tempArr.push('');
          tempArr.push(premiumTarget[i].name + ' P');
          target = this.price.detail.premium[premiumTarget[i].column];
          for (let j = 0; j < target.length; j++) {
            tempArr.push(target[j] * 10000);
          }
          matrix.push(tempArr);
        }

        tempArr = [];
        tempArr.push('');
        tempArr.push("수수료");
        for (let num of this.fee) {
          tempArr.push(num);
        }
        matrix.push(tempArr);

        return matrix;
      }
      getMatrix() {
        const sheetsName = [ "제안건", "계약건", "가격" ];
        return [
          { sheets: sheetsName[0], matrix: this.matrixProposal() },
          { sheets: sheetsName[1], matrix: this.matrixContract() },
          { sheets: sheetsName[2], matrix: this.matrixPrice() }
        ];
      }
      timeSplit() {
        const { proposal, contract } = this;
        const today = new Date();
        const timeHalfConst = "반기";
        const timeHalfArr = [ "상", "하" ];
        const timeHalfToken = [ 30000, 60000 ];
        class TimeArray extends Array {
          setWidth(width) {
            this.width = width;
          }
          setColumns(columns) {
            this.columns = columns;
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

        proposal.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
        proposalFirst = proposal[proposal.length - 1].date;
        contract.sort((a, b) => { return b.project.start.valueOf() - a.project.start.valueOf(); });
        contactFirst = contract[contract.length - 1].project.start;

        resultObj = {};
        for (let z = 0; z < 2; z++) {
          first = (z === 0) ? proposalFirst : contactFirst;
          timeValue0 = (today.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + today.getFullYear();
          timeValue1 = (first.getMonth() < 6 ? timeHalfToken[0] : timeHalfToken[1]) + first.getFullYear();
          timeCaseBoo = (0 <= timeValue0 - timeValue1 && timeValue0 - timeValue1 < 10000);
          timeLength = timeCaseBoo ? (((timeValue0 - timeValue1) * 2) + 1) : ((Math.abs(timeHalfToken[0] - Math.abs(timeValue0 - timeValue1)) * 2) + (timeValue0 >= timeHalfToken[1] ? 2 : 0));
          timeHalfFirst = timeValue0 >= timeHalfToken[1] ? 1 : 0;

          timeArr = new TimeArray();
          for (let i = 0; i < timeLength; i++) {
            thisYear = today.getFullYear() - Math.ceil(i / 2);
            thisHalf = i % 2 === 0 ? timeHalfFirst : 1 - timeHalfFirst;
            if (thisHalf === 0) {
              tempDate0 = new Date(thisYear, 0, 1);
              tempDate1 = new Date(thisYear, 6, 1);
            } else {
              tempDate0 = new Date(thisYear, 6, 1);
              tempDate1 = new Date(thisYear + 1, 0, 1);
            }
            tempTong = [];
            if (z === 0) {
              for (let p of proposal) {
                if (p.date.valueOf() >= tempDate0.valueOf() && p.date.valueOf() < tempDate1.valueOf()) {
                  tempTong.push(p);
                }
              }
            } else {
              for (let c of contract) {
                if (c.project.start.valueOf() >= tempDate0.valueOf() && c.project.start.valueOf() < tempDate1.valueOf()) {
                  tempTong.push(c);
                }
              }
            }
            timeArr.push({
              key: ((thisHalf === 0 ? timeHalfToken[0] : timeHalfToken[1]) + thisYear),
              year: thisYear,
              half: thisHalf,
              name: String(thisYear).slice(2) + "년 " + timeHalfArr[thisHalf] + timeHalfConst,
              values: tempTong,
              matrix: [],
              width: []
            });
          }
          resultObj[z === 0 ? "proposal" : "contract"] = timeArr;
        }

        totalOrder = 1;
        yearOrders = {};
        resultObj.proposal.setWidth([
          55,
          55,
          55,
          72,
          140,
          120,
          120,
          72,
          120,
          80,
          55,
          55,
          110,
        ]);
        resultObj.proposal.setColumns([
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
          "ID",
        ]);
        for (let i = 0; i < resultObj.proposal.length; i++) {
          order = resultObj.proposal[i].values.length;
          if (yearOrders['y' + String(resultObj.proposal[i].year)] === undefined) {
            yearOrders['y' + String(resultObj.proposal[i].year)] = 1;
          }
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
              alert("평수 에러 : " + obj.client.name + " 고객님의 평수가 0평으로 되어있습니다! 바르게 고쳐주세요!");
              window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + obj.client.cliid;
            }
            tempArr.push(autoComma(Math.round((obj.detail.amount / obj.client.pyeong) / 1000) * 1000) + '원');
            tempArr.push(/off/g.test(obj.detail.method) ? "오프라인" : "온라인");
            tempArr.push(obj.detail.partial ? 'O' : 'X');
            boo = false;
            for (let obj2 of this.contract) {
              if (obj.proid === obj2.project.proid) {
                boo = true;
              }
            }
            tempArr.push(boo ? 'O' : 'X');
            tempArr.push(obj.proid);
            resultObj.proposal[i].matrix.push(tempArr);
            order = order - 1;
            totalOrder = totalOrder + 1;
            yearOrders['y' + String(resultObj.proposal[i].year)] = yearOrders['y' + String(resultObj.proposal[i].year)] + 1;
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
          for (let arr of resultObj.proposal[i].matrix) {
            arr[0] = totalOrder - order;
            arr[1] = yearOrders['y' + String(resultObj.proposal[i].year)] - yearOrder;
            order = order + 1;
            yearOrder = yearOrder + 1;
          }
          pastYear = resultObj.proposal[i].year;
        }

        totalOrder = 1;
        yearOrders = {};
        resultObj.contract.setWidth([
          55,
          55,
          55,
          72,
          140,
          110,
          110,
          80,
          55,
          120,
          70,
          120,
          72,
          120,
          120,
          120,
          110,
        ]);
        resultObj.contract.setColumns([
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
          "ID",
        ]);
        for (let i = 0; i < resultObj.contract.length; i++) {
          order = resultObj.contract[i].values.length;
          if (yearOrders['y' + String(resultObj.contract[i].year)] === undefined) {
            yearOrders['y' + String(resultObj.contract[i].year)] = 1;
          }
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
            tempArr.push(/off/g.test(tempProposal.detail.method) ? "오프라인" : "온라인");
            tempArr.push(tempProposal.detail.partial ? 'O' : 'X');
            tempArr.push(autoComma(obj.payments.amount) + '원');
            tempArr.push(String(obj.payments.percentage) + '%');
            tempArr.push(autoComma(tempProposal.detail.amount) + '원');
            tempArr.push(String(obj.client.pyeong) + '평');
            if (obj.client.pyeong === 0) {
              alert("평수 에러 : " + obj.client.name + " 고객님의 평수가 0평으로 되어있습니다! 바르게 고쳐주세요!");
              window.location.href = window.location.protocol + "//" + window.location.host + "/client?cliid=" + obj.client.cliid;
            }
            tempArr.push(autoComma(Math.round((tempProposal.detail.amount / obj.client.pyeong) / 1000) * 1000) + '원');
            tempArr.push(dateToString(obj.payments.first));
            tempArr.push(dateToString(obj.payments.remain));
            tempArr.push(obj.project.proid);
            resultObj.contract[i].matrix.push(tempArr);
            order = order - 1;
            totalOrder = totalOrder + 1;
            yearOrders['y' + String(resultObj.contract[i].year)] = yearOrders['y' + String(resultObj.contract[i].year)] + 1;
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
          for (let arr of resultObj.contract[i].matrix) {
            arr[0] = totalOrder - order;
            arr[1] = yearOrders['y' + String(resultObj.contract[i].year)] - yearOrder;
            order = order + 1;
            yearOrder = yearOrder + 1;
          }
          pastYear = resultObj.contract[i].year;
        }

        return resultObj;
      }
    }
    let projects, clients;
    let cliidArr, cliidArr_raw;
    let desidArr, desidArr_raw;
    let proposalArr;
    let whereQuery;
    let price, standard;
    let allProjects, allDesigners;
    let entireTong;
    let proposals, contract;
    let desid;
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

    allDesigners = this.designers;

    // desidArr_raw = [];
    // for (let designer of this.designers) {
    //   desidArr_raw.push(designer.desid);
    // }
    // desidArr_raw = Array.from(new Set(desidArr_raw));
    // desidArr = [];
    // proposalArr = [];
    // for (let desid of desidArr_raw) {
    //   desidArr.push({ desid });
    //   proposalArr.push({ "proposal.detail": { $elemMatch: { desid } } });
    // }

    whereQuery = {};
    // whereQuery["$or"] = desidArr.concat(proposalArr);
    allProjects = await ajaxJson({ noFlat: true, whereQuery }, "/getProjects", { equal: true });

    cliidArr_raw = [];
    for (let project of allProjects) {
      cliidArr_raw.push(project.cliid);
    }
    cliidArr_raw = Array.from(new Set(cliidArr_raw));
    cliidArr = [];
    for (let cliid of cliidArr_raw) {
      cliidArr.push({ cliid });
    }
    whereQuery = {};
    whereQuery["$or"] = cliidArr;

    clients = await ajaxJson({ noFlat: true, whereQuery }, "/getClients", { equal: true });

    for (let project of allProjects) {
      for (let client of clients) {
        if (project.cliid === client.cliid) {
          project.name = client.name;
          requests = client.requests;
          boo = false;
          for (let { request } of requests) {
            if (request.timeline.valueOf() <= project.proposal.date.valueOf()) {
              boo = true;
              project.pyeong = request.space.pyeong;
            }
          }
          if (!boo) {
            project.pyeong = requests[0].request.space.pyeong;
          }
        }
      }
    }

    price = await ajaxJson({
      mode: "read",
      db: "console",
      collection: "designerPrice",
      whereQuery: {},
    }, "/generalMongo", { equal: true });

    for (let obj of price) {
      if (obj.key === 33) {
        standard = obj;
        break;
      }
    }

    tong = [];
    for (let designer of allDesigners) {
      desid = designer.desid;
      entireTong = new DesignerReport(allProjects, price);
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
            for (let { serid, name } of service) {
              if (serid === project.service.serid) {
                serviceName += name;
              }
            }
            serviceName += " ";
            serviceName += xValueMap[project.service.xValue];
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
        for (let { serid, name } of service) {
          if (serid === project.service.serid) {
            serviceName += name;
          }
        }
        serviceName += " ";
        serviceName += xValueMap[project.service.xValue];
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

      alpha = 0;
      alpha += ((new Date(designer.information.business.career.startY, designer.information.business.career.startM - 1, 1)).valueOf() <= yearsAgo.valueOf()) ? 2 : 0;
      alpha += (designer.analytics.project.paperWork.length >= 4) ? 2 : 0;
      alpha += designer.analytics.purchase.agencies ? (1 / 3) : 0
      alpha += designer.analytics.purchase.setting.install ? (1 / 3) : 0
      alpha += designer.analytics.purchase.setting.storage ? (1 / 3) : 0

      homeliaison = 0;
      for (let { value } of designer.analytics.etc.personality) {
        if (value) {
          homeliaison = homeliaison + 1;
        }
      }
      homeliaison += 2 - relationItems.indexOf(designer.analytics.etc.relation);

      alpha += (homeliaison * (2 / 7));
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

      tong.push(entireTong);
    }

    this.reports = new DesignerReports(tong, allProjects, price);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.reportView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    this.backGrayBar();
    await this.spreadData(null, true);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners", { equal: true });
    const length = designers.length;
    const getObj = returnGet();
    let boxTong;
    let nodeArr;
    let tempObj;
    let minWidth;
    let margin;
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

    await this.reportDataRendering();

    minWidth = 210;
    margin = 8;
    motherHeight = 154;

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
      this.standardDoms[i].style.color = colorChip[(/완료/g.test(this.designers.pick(this.standardDoms[i].getAttribute("desid")).information.contract.status)) ? "black" : "deactive"];
      this.standardDoms[i].setAttribute("color", this.standardDoms[i].style.color);
      this.standardDoms[i].style.transition = "all 0s ease";
      this.standardDoms[i].addEventListener("click", (e) => {
        instance.reportDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
      });
      this.standardDoms[i].addEventListener("contextmenu", this.makeClipBoardEvent(this.standardDoms[i].getAttribute("desid")));
      children = this.standardDoms[i].children;
      childrenLength = children.length;
      for (let j = 0; j < childrenLength; j++) {
        children[j].style.color = "inherit";
        children[j].style.transition = "all 0s ease";
      }
    }
    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    loading.parentNode.removeChild(loading);

    //launching
    this.reportDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
