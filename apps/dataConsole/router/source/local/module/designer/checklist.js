DesignerJs.prototype.checkListData = function (factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight) {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const cookies = GeneralJs.getCookiesAll();
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
          value: async function (nodeArr, designer) {
            try {
              const [ abc, title, mother ] = nodeArr;
              const { ajaxJson, colorChip, createNode, createNodes, cleanChildren } = GeneralJs;
              const { information } = designer;
              const { relatedY, relatedM, startY, startM } = information.business.career;
              const desid = designer.desid;
              let h;
              let margin;
              let totalWidth;

              h = document.createDocumentFragment();
              margin = 15;
              totalWidth = 800;

              createNode({
                mother: h,
                text: `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월`,
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.stopPropagation();
                      if (/div/gi.test(e.target.nodeName)) {
                        const [ cancelBox, inputBox ] = createNodes([
                          {
                            mother: this,
                            mode: "aside",
                            events: [
                              {
                                type: "click",
                                event: function (e) {
                                  this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                  this.parentElement.removeChild(this.parentElement.querySelector("aside"));
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
                              zIndex: String(1),
                            }
                          },
                          {
                            mother: this,
                            mode: "input",
                            attribute: [
                              { type: "text" },
                              { value: this.textContent },
                              { past: this.textContent },
                            ],
                            events: [
                              {
                                type: "keypress",
                                event: async function (e) {
                                  try {
                                    if (e.key === "Enter") {
                                      const designer = instance.designers.pick(desid);
                                      const whereQuery = { desid };
                                      let updateQuery;
                                      let text;
                                      let relatedY, relatedM;
                                      let tempArr;
                                      if (/년/g.test(this.value)) {
                                        tempArr = this.value.split('년');
                                        if (tempArr.length !== 2) {
                                          text = this.getAttribute("past");
                                          this.value = text;
                                        } else {
                                          relatedY = Number(tempArr[0].replace(/[^0-9]/g, ''));
                                          relatedM = Number(tempArr[1].replace(/[^0-9]/g, ''));
                                          if (Number.isNaN(relatedY) || Number.isNaN(relatedM)) {
                                            text = this.getAttribute("past");
                                            this.value = text;
                                          } else {
                                            updateQuery = {};
                                            updateQuery["information.business.career.relatedY"] = relatedY;
                                            updateQuery["information.business.career.relatedM"] = relatedM;
                                            text = `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월`
                                            await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                            await ajaxJson({
                                              mode: "sse",
                                              db: "console",
                                              collection: "sse_checklistDesigner",
                                              log: true,
                                              who: cookies.homeliaisonConsoleLoginedEmail,
                                              updateQuery: {
                                                desid,
                                                type: "async__function__{ mother.querySelectorAll('div')[0].textContent __equal__ value; }",
                                                value: text,
                                                position: { x: 1, y: 0, class: "dom_" + String(1) + "_" + String(0) },
                                                update: { whereQuery, updateQuery }
                                              }
                                            }, "/generalMongo");
                                            instance.designers.update([ whereQuery, updateQuery ]);
                                          }
                                        }
                                      } else {
                                        text = this.getAttribute("past");
                                        this.value = text;
                                      }
                                      this.parentElement.removeChild(this.parentElement.firstChild);
                                      this.parentElement.insertAdjacentHTML("beforeend", text);
                                      this.parentElement.removeChild(this.parentElement.querySelector("aside"));
                                      this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                    }
                                  } catch (err) {
                                    console.log(err);
                                  }
                                }
                              }
                            ],
                            style: {
                              display: "block",
                              position: "absolute",
                              fontSize: "inherit",
                              fontWeight: String(400),
                              top: String(0),
                              left: String(0),
                              color: colorChip.green,
                              background: colorChip.white,
                              border: String(0),
                              outline: String(0),
                              width: String(this.getBoundingClientRect().width) + ea,
                              zIndex: String(1),
                            }
                          }
                        ]);
                        inputBox.focus();
                      }
                    }
                  }
                ],
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: colorChip.black,
                  marginRight: String(margin) + ea,
                  width: desktop ? "auto" : String(100) + '%',
                  marginBottom: String(desktop ? 0 : 1.5) + ea,
                }
              });
              createNode({
                mother: h,
                text: '|',
                style: {
                  display: desktop ? "inline-block" : "none",
                  position: "relative",
                  fontSize: "inherit",
                  fontWeight: String(200),
                  color: colorChip.gray4,
                  marginRight: String(margin) + ea,
                }
              });
              createNode({
                mother: h,
                text: `스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`,
                events: [
                  {
                    type: "click",
                    event: function (e) {
                      e.stopPropagation();
                      if (/div/gi.test(e.target.nodeName)) {
                        const [ cancelBox, inputBox ] = createNodes([
                          {
                            mother: this,
                            mode: "aside",
                            events: [
                              {
                                type: "click",
                                event: function (e) {
                                  this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                  this.parentElement.removeChild(this.parentElement.querySelector("aside"));
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
                              zIndex: String(1),
                            }
                          },
                          {
                            mother: this,
                            mode: "input",
                            attribute: [
                              { type: "text" },
                              { value: this.textContent },
                              { past: this.textContent },
                            ],
                            events: [
                              {
                                type: "keypress",
                                event: async function (e) {
                                  try {
                                    if (e.key === "Enter") {
                                      const designer = instance.designers.pick(desid);
                                      const whereQuery = { desid };
                                      let updateQuery;
                                      let text;
                                      let startY, startM;
                                      let tempArr;
                                      if (/년/g.test(this.value)) {
                                        tempArr = this.value.split('년');
                                        if (tempArr.length !== 2) {
                                          text = this.getAttribute("past");
                                          this.value = text;
                                        } else {
                                          startY = Number(tempArr[0].replace(/[^0-9]/g, ''));
                                          startM = Number(tempArr[1].replace(/[^0-9]/g, ''));
                                          if (Number.isNaN(startY) || Number.isNaN(startM)) {
                                            text = this.getAttribute("past");
                                            this.value = text;
                                          } else {
                                            updateQuery = {};
                                            updateQuery["information.business.career.startY"] = startY;
                                            updateQuery["information.business.career.startM"] = startM;
                                            text = `스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`,
                                            await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                            await ajaxJson({
                                              mode: "sse",
                                              db: "console",
                                              collection: "sse_checklistDesigner",
                                              log: true,
                                              who: cookies.homeliaisonConsoleLoginedEmail,
                                              updateQuery: {
                                                desid,
                                                type: "async__function__{ mother.querySelectorAll('div')[2].textContent __equal__ value; }",
                                                value: text,
                                                position: { x: 1, y: 0, class: "dom_" + String(1) + "_" + String(0) },
                                                update: { whereQuery, updateQuery }
                                              }
                                            }, "/generalMongo");
                                            instance.designers.update([ whereQuery, updateQuery ]);
                                          }
                                        }
                                      } else {
                                        text = this.getAttribute("past");
                                        this.value = text;
                                      }
                                      this.parentElement.removeChild(this.parentElement.firstChild);
                                      this.parentElement.insertAdjacentHTML("beforeend", text);
                                      this.parentElement.removeChild(this.parentElement.querySelector("aside"));
                                      this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                    }
                                  } catch (err) {
                                    console.log(err);
                                  }
                                }
                              }
                            ],
                            style: {
                              display: "block",
                              position: "absolute",
                              fontSize: "inherit",
                              fontWeight: String(400),
                              top: String(0),
                              left: String(0),
                              color: colorChip.green,
                              background: colorChip.white,
                              border: String(0),
                              outline: String(0),
                              width: String(this.getBoundingClientRect().width) + ea,
                              zIndex: String(1),
                            }
                          }
                        ]);
                        inputBox.focus();
                      }
                    }
                  }
                ],
                style: {
                  display: desktop ? "inline-block" : "block",
                  position: "relative",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: colorChip.black,
                  marginRight: String(margin) + ea,
                  width: desktop ? "auto" : String(100) + '%',
                }
              });

              cleanChildren(mother);
              mother.appendChild(h);
              mother.style.overflow = "hidden";
              mother.style.width = desktop ? (String(totalWidth) + ea) : String(100) + '%';

            } catch (e) {
              console.log(e);
            }
          },
          height: (desktop ? factorHeight : factorHeight * 1.75),
          type: "async",
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
            instance.checkListDesignerMemo(designer.desid).call(instance.totalMother, { preventDefault: () => {}, stopPropagation: () => {} });
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
          middle: false,
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
          name: "사업자",
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
          height: desktop ? factorHeight * 2.1 : factorHeight * 4.7,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "등록번호",
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
          middle: false,
        },
      ]
    },
    {
      name: "공간",
      children: [
        {
          name: "주소",
          value: function (designer) {
            return designer.information.address;
          },
          update: function (value, designer) {
            const position = "information.address";
            const error = "error";
            let updateQuery, tempArr, tempArr2, text;
            updateQuery = {};
            tempArr = value.split('\n');
            tempArr2 = [];
            for (let words of tempArr) {
              if (words.trim().replace(/ /gi, '') !== '') {
                text = words.trim();
                tempArr2.push(words.trim());
              }
            }
            updateQuery[position] = tempArr2;
            return updateQuery;
          },
          textHeight: 14,
          height: factorHeight,
          type: "longtext",
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
          middle: false,
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
          middle: false,
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
          middle: false,
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
          middle: false,
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
          middle: false,
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
          middle: false,
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
          middle: false,
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
          name: "빌트인 제작",
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
          name: "가구 제작",
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
          name: "커튼 제작",
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
          name: "베딩 제작",
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
          name: "패브릭 발주",
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
          name: "설치 서비스",
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
              "보통"
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
          middle: false,
        },
      ]
    },
    {
      name: "일정",
      children: [
        {
          name: "가능 일정",
          value: async function (nodeArr, designer) {
            try {
              const [ abc, title, mother ] = nodeArr;
              const { ajaxJson, colorChip, createNode, cleanChildren } = GeneralJs;
              const today = new Date();
              const futureMonth = 7;
              const calendarData = await ajaxJson({
                mode: "read",
                db: "console",
                collection: "realtimeDesigner",
                whereQuery: {},
              }, "/generalMongo", { equal: true });
              let target = { possible: [] };
              for (let obj of calendarData) {
                if (designer.desid === obj.desid) {
                  target = obj;
                }
              }
              let { possible } = target;
              let h;
              let future, map;
              let margin;
              let num;
              let boo, boos;

              margin = 15;

              map = [ { value: today, text: `${String(today.getFullYear()).slice(2)}년 ${String(today.getMonth() + 1)}월`, toggle: "off" } ];
              future = new Date();
              for (let i = 0; i < futureMonth; i++) {
                future.setMonth(future.getMonth() + 1);
                map.push({ value: new Date(future.getFullYear(), future.getMonth(), future.getDate()), text: `${String(future.getFullYear()).slice(2)}년 ${String(future.getMonth() + 1)}월`, toggle: "off" });
              }

              h = document.createDocumentFragment();
              num = 0;
              for (let obj of map) {
                boo = false;
                boos = [];
                for (let { start, end } of possible) {
                  boos.push(((start.getMonth() + (start.getFullYear() * 12)) <= (obj.value.getMonth() + (obj.value.getFullYear() * 12))) && ((end.getMonth() + (end.getFullYear() * 12)) >= (obj.value.getMonth() + (obj.value.getFullYear() * 12))));
                }
                boos = boos.filter((b) => { return b; });
                boo = (boos.length > 0);
                if (boo) {
                  obj.toggle = "on";
                }

                createNode({
                  mother: h,
                  text: obj.text,
                  attribute: [
                    { year: String(obj.value.getFullYear()) },
                    { month: String(obj.value.getMonth() + 1) },
                    { toggle: obj.toggle },
                  ],
                  class: [ "hoverDefault" ],
                  events: [
                    {
                      type: "click",
                      event: function (e) {
                        const possible = GeneralJs.stacks["designer_possible"];
                        const year = Number(this.getAttribute("year"));
                        const month = Number(this.getAttribute("month"));
                        const toggle = this.getAttribute("toggle");
                        let endTarget, startTarget, targetObj, firstDate, previousMonth, nextMonth, lastDate, index, targetIndex;
                        let boo, boos;

                        firstDate = new Date(year, month - 1, 1);
                        previousMonth = new Date(year, month - 1, 1);
                        previousMonth.setDate(previousMonth.getDate() - 1);

                        lastDate = new Date(year, month, 1);
                        lastDate.setDate(lastDate.getDate() - 1);
                        nextMonth = new Date(year, month, 1);

                        if (toggle === "off") {

                          endTarget = null;
                          startTarget = null;
                          targetIndex = null;
                          index = 0;

                          for (let obj of possible) {
                            if ((obj.end.getMonth() === previousMonth.getMonth()) && (obj.end.getFullYear() === previousMonth.getFullYear()) && (obj.end.getDate() === previousMonth.getDate())) {
                              endTarget = obj;
                              targetIndex = index;
                            }
                            if ((obj.start.getMonth() === nextMonth.getMonth()) && (obj.start.getFullYear() === nextMonth.getFullYear()) && (obj.start.getDate() === nextMonth.getDate())) {
                              startTarget = obj;
                            }
                            index++;
                          }

                          if (endTarget === null && startTarget === null) {
                            possible.push({ start: firstDate, end: lastDate });
                          } else if (endTarget === null && startTarget !== null) {
                            startTarget.start = firstDate;
                          } else if (endTarget !== null && startTarget === null) {
                            endTarget.end = lastDate;
                          } else {
                            startTarget.start = endTarget.start;
                            possible.splice(targetIndex, 1);
                          }

                          this.style.color = colorChip.green;
                          this.setAttribute("toggle", "on");
                        } else {
                          targetObj = null;
                          targetIndex = null;
                          index = 0;
                          for (let obj of possible) {
                            if (((obj.start.getMonth() + 1 + (obj.start.getFullYear() * 12)) <= (month + (year * 12))) && ((obj.end.getMonth() + 1 + (obj.end.getFullYear() * 12)) >= (month + (year * 12)))) {
                              targetObj = obj;
                              targetIndex = index;
                              break;
                            }
                            index++;
                          }

                          if (targetObj.end.valueOf() > lastDate.valueOf()) {
                            if (targetObj.start.valueOf() < firstDate.valueOf()) {
                              possible.push({ start: nextMonth, end: new Date(targetObj.end.getFullYear(), targetObj.end.getMonth(), targetObj.end.getDate()) });
                              targetObj.end = previousMonth;
                            } else {
                              targetObj.start = nextMonth;
                            }
                          } else {
                            if (targetObj.start.valueOf() < firstDate.valueOf()) {
                              targetObj.end = previousMonth;
                            } else {
                              possible.splice(targetIndex, 1);
                            }
                          }

                          this.style.color = colorChip.gray4;
                          this.setAttribute("toggle", "off");
                        }

                        possible.sort((a, b) => { return a.start.valueOf() - b.start.valueOf(); });
                        GeneralJs.stacks["designer_possible"] = possible;


                        const sseFunc = function () {
                          const today = new Date();
                          let filtered = value.replace(/(\"[0-9]+\-[0-9]+\-[0-9]+T[0-9]+\:[0-9]+\:[^Z]+Z\")/g, function (match, p1, offset, string) { return "new Date(" + p1 + ")"; });
                          let tempFunc = new Function("const obj = " + filtered + "; return obj;");
                          possible = tempFunc();
                          let boo, boos;
                          let map = [ { value: today, toggle: "off" } ];
                          let future = new Date();
                          for (let i = 0; i < 7; i++) {
                            future.setMonth(future.getMonth() + 1);
                            map.push({ value: new Date(future.getFullYear(), future.getMonth(), future.getDate()), toggle: "off" });
                          }
                          for (let o of map) {
                            boo = false;
                            boos = [];
                            for (let { start, end } of possible) {
                              boos.push(((start.getMonth() + (start.getFullYear() * 12)) <= (o.value.getMonth() + (o.value.getFullYear() * 12))) && ((end.getMonth() + (end.getFullYear() * 12)) >= (o.value.getMonth() + (o.value.getFullYear() * 12))));
                            }
                            boos = boos.filter((b) => { return b; });
                            boo = (boos.length > 0);
                            if (boo) {
                              o.toggle = "on";
                            }
                          }
                          let targets = mother.querySelectorAll(".hoverDefault");
                          for (let i = 0; i < targets.length; i++) {
                            targets[i].style.color = (map[i].toggle === "on" ? GeneralJs.colorChip.green : GeneralJs.colorChip.gray4);
                            targets[i].setAttribute("toggle", map[i].toggle);
                          }
                          GeneralJs.stacks["designer_possible"] = possible;
                        }

                        GeneralJs.ajaxJson({
                          mode: "update",
                          db: "console",
                          collection: "realtimeDesigner",
                          whereQuery: { desid: instance.desid },
                          updateQuery: { possible }
                        }, "/generalMongo").then(() => {
                          return GeneralJs.ajaxJson({
                            mode: "sse",
                            db: "console",
                            collection: "sse_checklistDesigner",
                            log: true,
                            who: cookies.homeliaisonConsoleLoginedEmail,
                            updateQuery: {
                              desid: instance.desid,
                              type: ("async__function__{ " + sseFunc.toString().replace(/\n/g, '').trim().replace(/=/gi, "__equal__").replace(/&/gi, "__ampersand__").replace(/\+/gi, "__plus__").replace(/\}$/, '').replace(/^function \(\) \{/gi, '') + " }"),
                              value: JSON.stringify(possible),
                              position: { x: 8, y: 0, class: "dom_" + String(8) + "_" + String(0) },
                              update: { whereQuery: { desid: instance.desid }, updateQuery: {} }
                            }
                          }, "/generalMongo");
                        }).catch((err) => {
                          console.log(err);
                        });

                      }
                    }
                  ],
                  style: {
                    display: "inline-block",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: boo ? colorChip.green : colorChip.gray4,
                    marginRight: String(margin) + ea,
                  }
                });

                if (num !== map.length - 1) {
                  createNode({
                    mother: h,
                    text: '|',
                    style: {
                      display: "inline-block",
                      fontSize: "inherit",
                      fontWeight: String(200),
                      color: colorChip.gray4,
                      marginRight: String(margin) + ea,
                    }
                  });
                }

                num++;
              }

              GeneralJs.stacks["designer_possible"] = possible;
              cleanChildren(mother);
              mother.appendChild(h);
              mother.style.fontWeight = String(300);
              mother.style.color = colorChip.black;
              mother.style.overflow = "hidden";
              mother.style.width = String((80 + (margin * 2)) * (futureMonth + 1)) + ea;

            } catch (e) {
              console.log(e);
            }
          },
          height: factorHeight,
          type: "async",
        },
        {
          name: "대기중",
          value: async function (nodeArr, designer) {
            try {
              const [ abc, title, mother ] = nodeArr;
              const { ajaxJson, colorChip, createNode, cleanChildren, dateToString } = GeneralJs;
              const desid = instance.desid;
              let h, projects;
              let cliidArr_raw, cliidArr;
              let clients;
              let text;
              let margin;

              margin = 15;

              projects = await ajaxJson({
                noFlat: true,
                whereQuery: {
                  $and: [
                    { "process.status": { $regex: "^[대홀]" } },
                    { desid }
                  ]
                },
              }, "/getProjects", { equal: true });

              h = document.createDocumentFragment();

              cliidArr_raw = [];
              for (let { cliid } of projects) {
                cliidArr_raw.push(cliid);
              }
              cliidArr = cliidArr_raw.map((c) => { return { cliid: c }; });

              if (cliidArr.length > 0) {

                clients = await ajaxJson({
                  noFlat: true,
                  whereQuery: {
                    $or: cliidArr,
                  },
                }, "/getClients", { equal: true });

                for (let p of projects) {
                  for (let c of clients) {
                    if (p.cliid === c.cliid) {
                      p.name = c.name;
                      p.phone = c.phone;
                      c.requests.sort((a, b) => { return a.request.timeline.valueOf() - b.request.timeline.valueOf(); });
                      for (let r of c.requests) {
                        if (p.proposal.date.valueOf() >= r.request.timeline.valueOf()) {
                          p.request = r.request;
                        }
                      }
                    }
                  }
                }

                projects.sort((a, b) => { return b.process.contract.form.date.from.valueOf() - a.process.contract.form.date.from.valueOf(); });

                for (let project of projects) {

                  createNode({
                    mother: h,
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      color: "inherit",
                      height: String(factorHeight) + ea,
                      overflow: "hidden",
                      width: String(1000) + ea,
                    },
                    children: [
                      {
                        text: project.name + " (" + project.phone + ")",
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: '|',
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: String(200),
                          color: colorChip.gray4,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: project.request.space.address,
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(margin) + ea,
                        }
                      },
                    ]
                  });
                }
              } else {

                createNode({
                  mother: h,
                  text: "대기중 프로젝트 없음",
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    height: String(factorHeight) + ea,
                  },
                });

              }

              cleanChildren(mother);
              mother.appendChild(h);
              for (let dom of nodeArr) {
                dom.style.height = String(factorHeight * (projects.length === 0 ? 1 : projects.length)) + ea;
              }
              mother.style.fontWeight = String(300);
              mother.style.color = colorChip.black;
              mother.style.overflow = "hidden";

            } catch (e) {
              console.log(e);
            }
          },
          height: factorHeight,
          type: "async",
        },
        {
          name: "진행중",
          value: async function (nodeArr, designer) {
            try {
              const [ abc, title, mother ] = nodeArr;
              const { ajaxJson, colorChip, createNode, cleanChildren, dateToString } = GeneralJs;
              const desid = instance.desid;
              let h, projects;
              let cliidArr_raw, cliidArr;
              let clients;
              let text;
              let margin;

              margin = 15;

              projects = await ajaxJson({
                noFlat: true,
                whereQuery: {
                  $and: [
                    { "process.status": { $regex: "^[진홀]" } },
                    { desid }
                  ]
                },
              }, "/getProjects", { equal: true });

              h = document.createDocumentFragment();

              cliidArr_raw = [];
              for (let { cliid } of projects) {
                cliidArr_raw.push(cliid);
              }
              cliidArr = cliidArr_raw.map((c) => { return { cliid: c }; });

              if (cliidArr.length > 0) {

                clients = await ajaxJson({
                  noFlat: true,
                  whereQuery: {
                    $or: cliidArr,
                  },
                }, "/getClients", { equal: true });

                for (let p of projects) {
                  for (let c of clients) {
                    if (p.cliid === c.cliid) {
                      p.name = c.name;
                      p.phone = c.phone;
                      c.requests.sort((a, b) => { return a.request.timeline.valueOf() - b.request.timeline.valueOf(); });
                      for (let r of c.requests) {
                        if (p.proposal.date.valueOf() >= r.request.timeline.valueOf()) {
                          p.request = r.request;
                        }
                      }
                    }
                  }
                }

                projects.sort((a, b) => { return b.process.contract.form.date.from.valueOf() - a.process.contract.form.date.from.valueOf(); });

                for (let project of projects) {

                  createNode({
                    mother: h,
                    style: {
                      display: "block",
                      position: "relative",
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      color: "inherit",
                      height: String(factorHeight) + ea,
                      overflow: "hidden",
                      width: String(1000) + ea,
                    },
                    children: [
                      {
                        text: project.name + " (" + project.phone + ")",
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: '|',
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: String(200),
                          color: colorChip.gray4,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: dateToString(project.process.contract.form.date.from) + " ~ " + dateToString(project.process.contract.form.date.to),
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: '|',
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: String(200),
                          color: colorChip.gray4,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: project.request.space.address,
                        style: {
                          display: "inline-block",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(margin) + ea,
                        }
                      },
                    ]
                  });
                }
              } else {

                createNode({
                  mother: h,
                  text: "진행중 프로젝트 없음",
                  style: {
                    display: "block",
                    position: "relative",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    height: String(factorHeight) + ea,
                  },
                });

              }

              cleanChildren(mother);
              mother.appendChild(h);
              for (let dom of nodeArr) {
                dom.style.height = String(factorHeight * (projects.length === 0 ? 1 : projects.length)) + ea;
              }
              mother.style.fontWeight = String(300);
              mother.style.color = colorChip.black;
              mother.style.overflow = "hidden";

            } catch (e) {
              console.log(e);
            }
          },
          height: factorHeight,
          type: "async",
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

DesignerJs.prototype.checkListDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { colorChip } = GeneralJs;
  let target;

  this.desid = desid;

  if (this.mainBaseTong !== undefined && this.mainBaseTong !== null) {
    this.mainBaseTong.parentNode.removeChild(this.mainBaseTong);
    this.mainBaseTong = null;
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
  this.checkListDetail(desid);
  this.checkListIconSet(desid);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }
}

DesignerJs.prototype.checkListDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, getCookiesAll } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const matrixButtonConst = "matrixButtons_" + desid;
  const cookies = getCookiesAll();
  const mobile = this.media[4];
  const desktop = !mobile;
  let designer;
  let information, analytics;
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

  designer = this.designers.pick(desid);
  information = designer.information;
  analytics = designer.analytics;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 12 %%>;
  baseTongMarginBottom = 80;
  size = <%% 16, 15, 15, 15, 4 %%>;
  tendencyTop = 3;
  tendencyHeight = 16;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.5 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = 30;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = isMac() ? -3 : -4;

  checkListData = this.checkListData(factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight);

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: String(desktop ? margin * 3 : 0) + ea,
      left: String(grayBarWidth + (desktop ? margin * 3 : 0)) + ea,
      width: withOut(grayBarWidth + (desktop ? margin * 6 : 0), ea),
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
      border: desktop ? ("1px solid " + colorChip.gray4) : "",
      background: colorChip.white,
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
    }
  });

  for (let i = 0; i < checkListData.length; i++) {
    nodeArr = createNodes([
      {
        mother: baseTong,
        style: {
          position: "relative",
          width: String(100) + '%',
          borderBottom: (desktop ? (i !== checkListData.length - 1 ? "1px solid " + colorChip.gray4 : "") : ""),
        }
      },
      {
        mother: -1,
        text: checkListData[i].name,
        style: {
          position: "absolute",
          fontSize: String(size + (mobile ? 1 : 0)) + ea,
          fontWeight: String(700),
          color: colorChip.black,
          top: String(topMargin + 1) + ea,
          left: String(leftMargin) + ea,
          background: colorChip.white,
          paddingRight: String(desktop ? 0 : 3.5) + ea,
          zIndex: String(desktop ? 0 : 1),
        }
      },
      {
        mother: -2,
        style: {
          position: "absolute",
          width: String(level1Width) + ea,
          top: String(desktop ? 0 : size + 1.2 + (topMargin * 1.2)) + ea,
          left: String(desktop ? level1Left : leftMargin) + ea,
          paddingTop: String(topMargin) + ea,
        }
      },
      {
        mother: -3,
        style: {
          position: "relative",
          width: withOut((desktop ? level1Width + level1Left : (leftMargin * 2) + level1Width), ea),
          top: String(desktop ? 0 : size + 1.2 + (topMargin * 1.2)) + ea,
          left: String(desktop ? level1Width + level1Left : leftMargin + level1Width) + ea,
          height: String(100) + '%',
          paddingTop: String(topMargin) + ea,
          paddingBottom: String(bottomMargin) + ea,
        }
      },
      {
        mother: -4,
        text: String.fromCharCode(65 + i),
        style: {
          position: "absolute",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          bottom: String(desktop ? topMargin + (isMac() ? 0 : -3) : (topMargin * 1.2) - 4) + ea,
          right: String(leftMargin) + ea,
          zIndex: String(2),
        }
      },
    ]);

    eachTotalTong = nodeArr[0];
    eachNameTong = nodeArr[2];
    eachValueTong = nodeArr[3];

    if (mobile) {
      createNode({
        mother: eachTotalTong,
        style: {
          position: "absolute",
          top: String(topMargin + 1 + 3.1) + ea,
          left: String(leftMargin) + ea,
          width: withOut(leftMargin * 2, ea),
          borderBottom: "1px dashed " + colorChip.green,
          opacity: String(0.8),
        }
      });
    }

    if (this.middleMode) {
      middleAdjustTong = [];
    }
    for (let j = 0; j < checkListData[i].children.length; j++) {
      tempArr = [];
      tempObj = {
        mother: eachNameTong,
        text: String.fromCharCode(65 + i) + String(j + 1),
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(200),
          color: colorChip.green,
          height: String(checkListData[i].children[j].height) + ea,
          width: String(alphabetWidth) + ea,
        }
      };
      tempArr.push(tempObj);
      tempObj = {
        mother: eachNameTong,
        text: checkListData[i].children[j].name,
        style: {
          display: "inline-block",
          position: "relative",
          fontSize: String(size) + ea,
          fontWeight: String(desktop ? 500 : 600),
          color: colorChip.black,
          height: String(checkListData[i].children[j].height) + ea,
          width: withOut(alphabetWidth, ea),
        }
      };
      tempArr.push(tempObj);

      if (checkListData[i].children[j].type === "string") {

        tempObj = {
          mother: eachValueTong,
          text: (typeof checkListData[i].children[j].value === "function") ? checkListData[i].children[j].value(designer) : "NULL",
          class: [ "dom_" + String(i) + "_" + String(j) ],
          attribute: [
            { x: String(i) },
            { y: String(j) },
          ],
          events: [
            {
              type: "click",
              event: function (e) {
                e.stopPropagation();
                if (/div/gi.test(e.target.nodeName)) {
                  const x = Number(this.getAttribute('x'));
                  const y = Number(this.getAttribute('y'));
                  if (typeof checkListData[x].children[y].update === "function") {
                    const [ cancelBox, inputBox ] = createNodes([
                      {
                        mother: this,
                        mode: "aside",
                        events: [
                          {
                            type: "click",
                            event: function (e) {
                              this.parentElement.removeChild(this.parentElement.querySelector("input"));
                              this.parentElement.removeChild(this.parentElement.querySelector("aside"));
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
                          zIndex: String(1),
                        }
                      },
                      {
                        mother: this,
                        mode: "input",
                        attribute: [
                          { type: "text" },
                          { value: this.textContent },
                          { past: this.textContent },
                        ],
                        events: [
                          {
                            type: "keypress",
                            event: async function (e) {
                              try {
                                if (e.key === "Enter") {
                                  const designer = instance.designers.pick(desid);
                                  const whereQuery = { desid };
                                  const { updateQuery, text } = checkListData[x].children[y].update(this.value, designer);
                                  if (updateQuery === "error") {
                                    this.value = this.getAttribute("past");
                                  } else {
                                    this.parentElement.removeChild(this.parentElement.firstChild);
                                    this.parentElement.insertAdjacentHTML("beforeend", text);
                                    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                    await ajaxJson({ mode: "sse", db: "console", collection: "sse_checklistDesigner", log: true, who: cookies.homeliaisonConsoleLoginedEmail, updateQuery: { desid, type: checkListData[x].children[y].type, value: text, position: { x, y, class: "dom_" + String(x) + "_" + String(y) }, update: { whereQuery, updateQuery } } }, "/generalMongo");
                                    instance.designers.update([ whereQuery, updateQuery ]);
                                  }
                                  this.parentElement.removeChild(this.parentElement.querySelector("aside"));
                                  this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                }
                              } catch (err) {
                                console.log(err);
                              }
                            }
                          }
                        ],
                        style: {
                          display: "block",
                          position: "absolute",
                          fontSize: String(size) + ea,
                          fontWeight: String(400),
                          top: String(0),
                          left: String(0),
                          color: colorChip.green,
                          background: colorChip.white,
                          border: String(0),
                          outline: String(0),
                          width: String(this.getBoundingClientRect().width) + ea,
                          zIndex: String(1),
                        }
                      }
                    ]);
                    inputBox.focus();
                  }
                  if (typeof checkListData[x].children[y].script === "function") {
                    checkListData[x].children[y].script(this, designer);
                  }
                }
              }
            }
          ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            height: String(checkListData[i].children[j].height) + ea,
            cursor: "pointer",
          }
        };
        tempArr.push(tempObj);

      } else if (checkListData[i].children[j].type === "matrix") {

        tempMatrix = checkListData[i].children[j].value(designer);

        tempObj = {
          mother: eachValueTong,
          class: [ "dom_" + String(i) + "_" + String(j) ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            width: desktop ? String(checkListData[i].children[j].totalWidth) + ea : String(100) + '%',
            height: String(checkListData[i].children[j].height) + ea,
          }
        };
        tempArr.push(tempObj);

        for (let k = 0; k < tempMatrix.contents.length; k++) {
          tempObj = {
            mother: -1 + (k * -1),
            text: tempMatrix.contents[k],
            attribute: [
              { x: String(i) },
              { y: String(j) },
              { z: String(k) },
              { toggle: String(tempMatrix.value[k]) },
            ],
            events: [
              {
                type: "click",
                event: async function (e) {
                  try {
                    const x = Number(this.getAttribute('x'));
                    const y = Number(this.getAttribute('y'));
                    const z = Number(this.getAttribute('z'));
                    const toggle = Number(this.getAttribute('toggle'));
                    const multiple = checkListData[x].children[y].multiple === true;
                    const thisButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y));
                    const designer = instance.designers.pick(desid);
                    let anothers, resultArr;
                    let whereQuery, updateQuery;

                    anothers = [];
                    for (let dom of thisButtons) {
                      if (this !== dom) {
                        anothers.push(dom);
                      }
                    }
                    if (toggle === 0) {
                      if (!multiple) {
                        for (let dom of anothers) {
                          dom.style.color = colorChip.gray4;
                          dom.setAttribute("toggle", String(0));
                        }
                      }
                      this.style.color = colorChip.green;
                      this.setAttribute("toggle", String(1));
                    } else {
                      this.style.color = colorChip.gray4;
                      this.setAttribute("toggle", String(0));
                    }

                    resultArr = [];
                    for (let dom of thisButtons) {
                      resultArr.push(Number(dom.getAttribute("toggle")));
                    }
                    updateQuery = checkListData[x].children[y].update(resultArr, designer);
                    whereQuery = { desid };

                    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                    await ajaxJson({ mode: "sse", db: "console", collection: "sse_checklistDesigner", log: true, who: cookies.homeliaisonConsoleLoginedEmail, updateQuery: { desid, type: checkListData[x].children[y].type, value: resultArr, position: { x, y, class: "dom_" + String(x) + "_" + String(y) }, update: { whereQuery, updateQuery } } }, "/generalMongo");
                    instance.designers.update([ whereQuery, updateQuery ]);
                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            ],
            class: [ "hoverDefault_lite", matrixButtonConst + String(i) + String(j), matrixButtonConst + String(i) + String(j) + String(k) ],
            style: {
              display: desktop ? "inline-block" : (tempMatrix.contents.length > 2 ? "block" : "inline-block"),
              position: "relative",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: desktop ? String(checkListData[i].children[j].width) + ea : String(tempMatrix.contents.length > 2 ? 100 : 45) + '%',
              color: colorChip[tempMatrix.value[k] === 1 ? "green" : "gray4"],
              height: String(checkListData[i].children[j].factorHeight * (desktop ? 1 : 0.9)) + ea,
              transition: "all 0.1s ease",
            }
          };
          tempArr.push(tempObj);
        }

      } else if (checkListData[i].children[j].type === "tendency") {

        tempMatrix = checkListData[i].children[j].value(designer);
        tempObj = {
          mother: eachValueTong,
          class: [ "dom_" + String(i) + "_" + String(j) ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            width: String(checkListData[i].children[j].totalWidth) + ea,
            height: String(checkListData[i].children[j].height) + ea,
          }
        };
        tempArr.push(tempObj);

        for (let k = 0; k < tempMatrix.contents.length; k++) {
          tempObj = {
            mother: -1 + (k * -11),
            text: tempMatrix.contents[k],
            class: [ "hoverDefault_lite" ],
            style: {
              display: "block",
              position: "relative",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(checkListData[i].children[j].totalWidth) + ea,
              color: colorChip.black,
              height: String(checkListData[i].children[j].factorHeight) + ea,
            }
          };
          tempArr.push(tempObj);
          for (let l = 0; l < 10; l++) {
            temp = (checkListData[i].children[j].totalWidth - checkListData[i].children[j].width) / 10;
            tempObj = {
              mother: -1 + (l * -1),
              attribute: [
                { x: String(i) },
                { y: String(j) },
                { z: String(k) },
                { t: String(l) },
                { toggle: String(l <= tempMatrix.value[k] ? 1 : 0) },
              ],
              events: [
                {
                  type: "click",
                  event: async function (e) {
                    try {
                      const x = Number(this.getAttribute('x'));
                      const y = Number(this.getAttribute('y'));
                      const z = Number(this.getAttribute('z'));
                      const t = Number(this.getAttribute('t'));
                      const thisButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y) + String(z));
                      const designer = instance.designers.pick(desid);
                      let whereQuery, updateQuery;

                      for (let i = 0; i < thisButtons.length; i++) {
                        if (i <= t) {
                          thisButtons[i].setAttribute("toggle", String(1));
                          thisButtons[i].style.background = colorChip.green;
                        } else {
                          thisButtons[i].setAttribute("toggle", String(0));
                          thisButtons[i].style.background = colorChip.gray2;
                        }
                      }

                      if (checkListData[x].children[y].opposite === true) {
                        const oppositeButtons = document.querySelectorAll('.' + matrixButtonConst + String(x) + String(y) + String(1 - z));
                        for (let i = 0; i < oppositeButtons.length; i++) {
                          if (i < oppositeButtons.length - t - 1) {
                            oppositeButtons[i].setAttribute("toggle", String(1));
                            oppositeButtons[i].style.background = colorChip.green;
                          } else {
                            oppositeButtons[i].setAttribute("toggle", String(0));
                            oppositeButtons[i].style.background = colorChip.gray2;
                          }
                        }
                      }

                      whereQuery = { desid };
                      updateQuery = checkListData[x].children[y].update(z, t, designer);

                      await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                      await ajaxJson({ mode: "sse", db: "console", collection: "sse_checklistDesigner", log: true, who: cookies.homeliaisonConsoleLoginedEmail, updateQuery: { desid, type: checkListData[x].children[y].type, value: [ z, t, (checkListData[x].children[y].opposite === true), matrixButtonConst ], position: { x, y, class: "dom_" + String(x) + "_" + String(y) }, update: { whereQuery, updateQuery } } }, "/generalMongo");
                      instance.designers.update([ whereQuery, updateQuery ]);
                    } catch (err) {
                      console.log(err);
                    }
                  }
                }
              ],
              class: [ "hoverDefault_lite", matrixButtonConst + String(i) + String(j) + String(k) ],
              style: {
                position: "absolute",
                width: String(temp) + ea,
                left: String(checkListData[i].children[j].width + (temp * l)) + ea,
                background: colorChip[l <= tempMatrix.value[k] ? "green" : "gray2"],
                top: String(tendencyTop) + ea,
                height: String(tendencyHeight) + ea,
                transition: "all 0.1s ease",
              }
            };
            if (l === 0) {
              tempObj.style.borderTopLeftRadius = tempObj.style.borderBottomLeftRadius = String(3) + "px";
            }
            if (l === 10 - 1) {
              tempObj.style.borderTopRightRadius = tempObj.style.borderBottomRightRadius = String(3) + "px";
            }
            tempArr.push(tempObj);
          }
        }
      } else if (checkListData[i].children[j].type === "longtext") {

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
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            height: String(checkListData[i].children[j].height) + ea,
            cursor: "pointer",
            overflow: "scroll",
          }
        };
        tempArr.push(tempObj);
        tempObj = {
          mother: -1,
          mode: "textarea",
          text: (typeof checkListData[i].children[j].value === "function") ? checkListData[i].children[j].value(designer).join("\n") : "NULL",
          attribute: [
            { x: String(i) },
            { y: String(j) },
            { value: ((typeof checkListData[i].children[j].value === "function") ? checkListData[i].children[j].value(designer).join("\n") : "NULL") },
            { past: ((typeof checkListData[i].children[j].value === "function") ? checkListData[i].children[j].value(designer).join("\n") : "NULL") }
          ],
          events: [
            {
              type: "focus",
              event: function (e) {
                this.style.color = colorChip.green;
              }
            },
            {
              type: "blur",
              event: async function (e) {
                try {
                  const x = Number(this.getAttribute('x'));
                  const y = Number(this.getAttribute('y'));
                  if (typeof checkListData[x].children[y].update === "function") {
                    const designer = instance.designers.pick(desid);
                    const updateQuery = checkListData[x].children[y].update(this.value.trim(), designer);
                    const whereQuery = { desid };
                    if (updateQuery === "error") {
                      this.value = this.getAttribute("past");
                    } else {
                      await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                      await ajaxJson({ mode: "sse", db: "console", collection: "sse_checklistDesigner", log: true, who: cookies.homeliaisonConsoleLoginedEmail, updateQuery: { desid, type: checkListData[x].children[y].type, value: this.value.trim(), position: { x, y, class: "dom_" + String(x) + "_" + String(y) }, update: { whereQuery, updateQuery } } }, "/generalMongo");
                      instance.designers.update([ whereQuery, updateQuery ]);
                    }
                  }
                  this.style.color = colorChip.black;
                } catch (e) {
                  console.log(e);
                }
              }
            },
          ],
          style: {
            display: "block",
            position: "absolute",
            width: String(100) + '%',
            height: withOut(checkListData[i].children[j].textHeight, ea),
            top: String(textAreaTop) + ea,
            left: String(0),
            fontSize: String(size) + ea,
            fontWeight: String(400),
            color: colorChip.black,
            border: String(0),
            outline: String(0),
            lineHeight: String(1.7),
          }
        };
        tempArr.push(tempObj);

      } else if (checkListData[i].children[j].type === "async") {
        tempObj = {
          mother: eachValueTong,
          text: "로드중...",
          class: [ "dom_" + String(i) + "_" + String(j) ],
          attribute: [
            { x: String(i) },
            { y: String(j) },
          ],
          style: {
            display: "block",
            position: "relative",
            fontSize: String(size) + ea,
            fontWeight: String(300),
            color: colorChip.gray4,
            height: String(checkListData[i].children[j].height) + ea,
            cursor: "pointer",
          }
        };
        tempArr.push(tempObj);
      }

      if (!this.middleMode || checkListData[i].children[j].middle !== false) {
        subNodeArr = createNodes(tempArr);
        if (checkListData[i].children[j].type === "async") {
          if (typeof checkListData[i].children[j].value === "function") {
            checkListData[i].children[j].value(subNodeArr, designer).catch((err) => {
              console.log(err);
            });
          }
        }
        if (this.middleMode) {
          middleAdjustTong.push(subNodeArr[0]);
        }
      }
    }

    if (this.middleMode) {
      for (let j = 0; j < middleAdjustTong.length; j++) {
        middleAdjustTong[j].textContent = String.fromCharCode(65 + i) + String(j + 1);
      }
    }

  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.checkListDesignerMemo = function (desid) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const baseTong = this.mainBaseTong;
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

DesignerJs.prototype.checkListIconSet = function (desid) {
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
  let margin;
  let color;
  let iconTop;
  let nodeArr;
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

  radius = <%% 20, 20, 20, 20, 0 %%>;
  left = <%% 40, 35, 35, 35, 0 %%>;
  bottom = <%% 40, 35, 35, 35, 0 %%>;
  margin = <%% 6, 6, 6, 6, 0 %%>;
  color = colorChip.gradientGreen;
  iconTop = 12.5;

  mother = createNode({
    mother: document.querySelector(".totalMother"),
    style: {
      display: desktop ? "block" : "none",
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

    listIcon.addEventListener("click", function (e) {
      let num = designer.information.did.replace(/[^0-9]/g, '');
      let id;
      id = '';
      for (let i = 0; i < 3 - num.length; i++) {
        id += '0';
      }
      id += num;
      blankHref(FRONTHOST + "/desdetail.php?qqq=de" + id);
    });

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

  rInitialIcon.addEventListener("click", function (e) {
    instance.reportDetailLaunching(desid);
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

DesignerJs.prototype.checkListSseParsing = function (orders) {
  const instance = this;
  const { ea } = this;
  const { colorChip } = GeneralJs;
  if (!Array.isArray(orders)) {
    throw new Error("invaild input");
  }
  if (orders.length > 0) {
    for (let obj of orders) {
      if (obj.desid === undefined || obj.position === undefined || obj.type === undefined || obj.update === undefined || obj.value === undefined) {
        throw new Error("invaild input");
      }
      const { desid, position, type, update, value } = obj;
      if (instance.desid === desid) {
        if (update.whereQuery === undefined || update.updateQuery === undefined) {
          throw new Error("invaild input");
        }
        const { whereQuery, updateQuery } = update;
        const targetDom = document.querySelector('.' + position.class);
        let tempFunction, tempArr, tempString;

        instance.designers.update([ whereQuery, updateQuery ]);

        if (targetDom !== null && targetDom !== undefined) {
          if (type === "string") {
            targetDom.removeChild(targetDom.firstChild);
            targetDom.insertAdjacentHTML("beforeend", value);
          } else if (type === "matrix") {
            const children = targetDom.children;
            const length = children.length;
            for (let z = 0; z < length; z++) {
              if (value[z] === 1) {
                children[z].style.color = colorChip.green;
                children[z].setAttribute("toggle", String(1));
              } else {
                children[z].style.color = colorChip.gray4;
                children[z].setAttribute("toggle", String(0));
              }
            }
          } else if (type === "tendency") {
            const children = targetDom.children;
            const [ z, t, opposite, matrixButtonConst ] = value;
            const factors = children[z].querySelectorAll("div");
            const length = factors.length;
            for (let i = 0; i < length; i++) {
              if (i <= t) {
                factors[i].setAttribute("toggle", String(1));
                factors[i].style.background = colorChip.green;
              } else {
                factors[i].setAttribute("toggle", String(0));
                factors[i].style.background = colorChip.gray2;
              }
            }
            if (opposite) {
              const oppositeButtons = document.querySelectorAll('.' + matrixButtonConst + String(position.x) + String(position.y) + String(1 - z));
              for (let i = 0; i < oppositeButtons.length; i++) {
                if (i < oppositeButtons.length - t - 1) {
                  oppositeButtons[i].setAttribute("toggle", String(1));
                  oppositeButtons[i].style.background = colorChip.green;
                } else {
                  oppositeButtons[i].setAttribute("toggle", String(0));
                  oppositeButtons[i].style.background = colorChip.gray2;
                }
              }
            }
          } else if (type === "longtext") {
            targetDom.querySelector("textarea").value = value;
          } else if (/^async/.test(type) && /__function__/g.test(type)) {
            tempArr = type.split("__function__");
            if (tempArr.length === 2) {
              tempString = tempArr[1].trim().replace(/^\{/, '').replace(/\}$/, '').trim().replace(/__equal__/gi, '=').replace(/__ampersand__/gi, '&').replace(/__plus__/gi, '+');
              tempFunction = new Function("mother", "value", tempString);
              tempFunction(targetDom, value);
            }
          }
        }

      }
    }
  }
}

DesignerJs.prototype.checkListView = async function (middleMode = false) {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight } = this;
    const standardBar = totalMother.firstChild;
    const designers = await ajaxJson({ noFlat: true }, "/getDesigners", { equal: true });
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
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report" ];
    this.mode = this.modes[0];
    this.result = null;

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    //search event
    if (this.searchInput !== undefined && this.searchInput !== null) {
      searchInput = this.searchInput;
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          if (instance.totalFather !== null) {
            document.getElementById("totalcontents").removeChild(document.querySelector(".totalFather"));
            instance.totalFather = null;
            instance.totalMother.classList.remove("justfadeoutoriginal");
            instance.totalMother.classList.add("justfadeinoriginal");
          }
          const value = this.value.trim().replace(/[ㄱ-ㅎㅏ-ㅣ]/gi, '').replace(/[\~\@\#\$\%\^\&\*\(\)\-\=\+\[\]\{\}\<\>\/\\ \n\t]/gi, '');
          let target;
          if (value === "") {
            instance.checkListDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
          } else {
            target = null;
            for (let { designer, desid } of instance.designers) {
              if (value === designer) {
                target = desid;
              }
            }
            if (target !== null) {
              instance.checkListDetailLaunching(target);
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
        instance.checkListDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
      });
      children = this.standardDoms[i].children;
      childrenLength = children.length;
      for (let j = 0; j < childrenLength; j++) {
        children[j].style.color = "inherit";
        children[j].style.transition = "all 0s ease";
      }
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    //sse
    const es = new EventSource("https://" + SSEHOST + ":3000/specificsse/checklistDesigner");
    es.addEventListener("updateTong", (e) => {
      instance.checkListSseParsing(equalJson(e.data));
    });

    loading.parentNode.removeChild(loading);

    //launching
    this.checkListDetailLaunching(this.desid);

    //add extract event
    this.reportAddExtractEvent();

  } catch (e) {
    console.log(e);
  }
}
