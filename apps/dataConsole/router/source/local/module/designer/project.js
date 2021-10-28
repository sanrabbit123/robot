DesignerJs.prototype.portfolioData = function (factorHeight = 0, factorWidth = 0, tendencyIndent = 0, tendencyWidthIndent = 0, tendencyFactorHeight = 0, mobileTendencyVisualMargin = 0) {
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
          script: function (mother, designer) {
            if (window.confirm(designer.designer + " 실장님께 전화를 걸까요?")) {
              GeneralJs.ajaxJson({
                who: cookies.homeliaisonConsoleLoginedEmail,
                phone: designer.information.phone.replace(/[^0-9]/gi, '')
              }, "/callTo").catch((err) => { console.log(err); });
            }
          },
          value: function (designer) {
            return designer.designer;
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "연락처",
          script: function (mother, designer) {
            if (window.confirm(designer.designer + " 실장님께 전화를 걸까요?")) {
              GeneralJs.ajaxJson({
                who: cookies.homeliaisonConsoleLoginedEmail,
                phone: designer.information.phone.replace(/[^0-9]/gi, '')
              }, "/callTo").catch((err) => { console.log(err); });
            }
          },
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
                                      let confirm;
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
                                            text = `유관 경력 : ${String(relatedY)}년 ${String(relatedM)}개월`;

                                            if (instance.middleMode ? false : window.confirm("수정이 확실합니까?")) {
                                              await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                              await ajaxJson({
                                                mode: "sse",
                                                db: "console",
                                                collection: "sse_checklistDesigner",
                                                log: true,
                                                who: (instance.middleMode ? designer.information.phone : cookies.homeliaisonConsoleLoginedEmail),
                                                updateQuery: {
                                                  desid,
                                                  type: "async__function__{ mother.querySelectorAll('div')[0].textContent __equal__ value; }",
                                                  value: text,
                                                  position: { x: 1, y: 0, class: "dom_" + String(1) + "_" + String(0) },
                                                  update: { whereQuery, updateQuery }
                                                }
                                              }, "/generalMongo");
                                              await ajaxJson({
                                                page: "project",
                                                mode: "update",
                                                who: (instance.middleMode ? instance.designer.information.phone : GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail),
                                                update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                                                desid,
                                              }, "/ghostDesigner_updateAnalytics");
                                              instance.designers.update([ whereQuery, updateQuery ]);
                                            } else {
                                              text = this.getAttribute("past");
                                              this.value = text;
                                            }
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
                                            text = `스타일링 시작일 : ${String(startY)}년 ${String(startM)}월`;
                                            if (instance.middleMode ? false : window.confirm("수정이 확실합니까?")) {
                                              await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                              await ajaxJson({
                                                mode: "sse",
                                                db: "console",
                                                collection: "sse_checklistDesigner",
                                                log: true,
                                                who: (instance.middleMode ? designer.information.phone : cookies.homeliaisonConsoleLoginedEmail),
                                                updateQuery: {
                                                  desid,
                                                  type: "async__function__{ mother.querySelectorAll('div')[2].textContent __equal__ value; }",
                                                  value: text,
                                                  position: { x: 1, y: 0, class: "dom_" + String(1) + "_" + String(0) },
                                                  update: { whereQuery, updateQuery }
                                                }
                                              }, "/generalMongo");
                                              await ajaxJson({
                                                page: "project",
                                                mode: "update",
                                                who: (instance.middleMode ? instance.designer.information.phone : GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail),
                                                update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                                                desid,
                                              }, "/ghostDesigner_updateAnalytics");
                                              instance.designers.update([ whereQuery, updateQuery ]);
                                            } else {
                                              text = this.getAttribute("past");
                                              this.value = text;
                                            }
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
              mother.style.fontWeight = String(400);

            } catch (e) {
              console.log(e);
            }
          },
          height: (desktop ? factorHeight : factorHeight * 1.75),
          search: function (designer, z = null) {
            let contents, tempArr;
            contents = [
              "1년 이하",
              "1년 - 3년",
              "3년 - 5년",
              "5년 - 7년",
              "7년 - 10년",
              "10년 이상"
            ];
            if (z === null) {
              return { contents };
            } else if (typeof z === "number") {
              const today = new Date();
              const { information } = designer;
              const { startY, startM } = information.business.career;
              const thisMonth = ((today.getFullYear() * 12) + today.getMonth()) - ((startY * 12) + startM);
              tempArr = contents[z].split(" - ");
              if (tempArr.length === 1) {
                if (/이상/gi.test(contents[z])) {
                  return { result: ((Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) <= thisMonth) };
                } else {
                  return { result: ((Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) >= thisMonth) };
                }
              } else {
                return { result: ((Number(tempArr[0].replace(/[^0-9]/gi, '')) * 12) <= thisMonth && (Number(tempArr[1].replace(/[^0-9]/gi, '')) * 12) > thisMonth) };
              }
            }
          },
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
          textHeight: desktop ? 14 : 6.5,
          height: desktop ? factorHeight : factorHeight * 1.8,
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
          search: function (designer, z = null) {
            let contents;
            contents = [
              "40km 미만",
              "40km - 60km",
              "60km - 80km",
              "80km - 100km",
              "100km - 120km",
              "120km 이상"
            ];
            if (z === null) {
              return { contents };
            } else if (typeof z === "number") {
              tempArr = contents[z].split(" - ");
              if (tempArr.length === 1) {
                if (/이상/gi.test(contents[z])) {
                  return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) <= designer.analytics.region.range) };
                } else {
                  return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) > designer.analytics.region.range) };
                }
              } else {
                return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) <= designer.analytics.region.range && Number(tempArr[1].replace(/[^0-9]/gi, '')) > designer.analytics.region.range) };
              }
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
          search: function (designer, z = null) {
            let contents;
            contents = [
              "40km 미만",
              "40km - 60km",
              "60km - 80km",
              "80km - 100km",
              "100km - 120km",
              "120km 이상"
            ];
            if (z === null) {
              return { contents };
            } else if (typeof z === "number") {
              tempArr = contents[z].split(" - ");
              if (tempArr.length === 1) {
                if (/이상/gi.test(contents[z])) {
                  return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) <= designer.analytics.region.expenses) };
                } else {
                  return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) > designer.analytics.region.expenses) };
                }
              } else {
                return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) <= designer.analytics.region.expenses && Number(tempArr[1].replace(/[^0-9]/gi, '')) > designer.analytics.region.expenses) };
              }
            }
          },
          height: factorHeight,
          type: "string",
        },
        {
          name: "시공 한계 범위",
          value: function (designer) {
            return String(designer.analytics.region.construct) + "km";
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let divText;
            let tempArr, tempObj;
            updateQuery = {};
            divText = "";
            text = Number(text.replace(/[^0-9]/gi, ''));
            updateQuery["analytics.region.construct"] = text;
            divText = String(text) + "km";
            if (Number.isNaN(text)) {
              return errorObj;
            } else {
              return { updateQuery, text: divText };
            }
          },
          search: function (designer, z = null) {
            let contents;
            contents = [
              "40km 미만",
              "40km - 60km",
              "60km - 80km",
              "80km - 100km",
              "100km - 120km",
              "120km 이상"
            ];
            if (z === null) {
              return { contents };
            } else if (typeof z === "number") {
              tempArr = contents[z].split(" - ");
              if (tempArr.length === 1) {
                if (/이상/gi.test(contents[z])) {
                  return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) <= designer.analytics.region.construct) };
                } else {
                  return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) > designer.analytics.region.construct) };
                }
              } else {
                return { result: (Number(tempArr[0].replace(/[^0-9]/gi, '')) <= designer.analytics.region.construct && Number(tempArr[1].replace(/[^0-9]/gi, '')) > designer.analytics.region.construct) };
              }
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
          height: desktop ? factorHeight * 2 : factorHeight * 7.3,
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
          height: desktop ? factorHeight : factorHeight * 3.8,
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
          height: desktop ? factorHeight : factorHeight * 4.6,
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
          height: desktop ? factorHeight : factorHeight * 3.8,
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
              "제품 이미지",
              "콜라주",
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
              "제품 이미지",
              "콜라주",
            ];
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            return { "analytics.project.paperWork": target };
          },
          height: desktop ? factorHeight * 2.1 : factorHeight * 3.8,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
          half: true
        },
      ]
    },
    {
      name: "시공",
      children: [
        {
          name: "시공 유형",
          value: function (designer) {
            let contents, value;
            contents = [ "F", "J", "S" ];
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
          height: desktop ? factorHeight : factorHeight * 1.8,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
          middle: false,
          half: true,
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
          height: desktop ? factorHeight : factorHeight * 3.8,
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
          height: desktop ? factorHeight : factorHeight * 2.9,
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
          height: desktop ? factorHeight : factorHeight * 3.8,
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
          height: desktop ? factorHeight : factorHeight * 2.9,
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
          height: desktop ? factorHeight : factorHeight * 3.8,
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
          height: desktop ? factorHeight * 1.1 : factorHeight * 2.9,
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
          name: "스타일링 유형",
          value: function (designer) {
            let contents, value;
            contents = [ "F", "J", "S" ];
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
          height: desktop ? factorHeight : factorHeight * 1.8,
          width: factorWidth,
          totalWidth: factorWidth * 3,
          factorHeight: factorHeight,
          type: "matrix",
          middle: false,
          half: true,
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
          name: "커튼 패브릭",
          value: function (designer) {
            let contents, value;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            value = [];
            for (let i of contents) {
              if (designer.analytics.styling.fabric.curtain.includes(i)) {
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
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            if (target.length === 0) {
              target = [ contents[0] ];
            }
            return { "analytics.styling.fabric.curtain": target };
          },
          height: desktop ? factorHeight : factorHeight * 2.8,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "베딩 패브릭",
          value: function (designer) {
            let contents, value;
            contents = [
              "업체 연결",
              "기성 제품 추천",
              "직접 제작"
            ];
            value = [];
            for (let i of contents) {
              if (designer.analytics.styling.fabric.bedding.includes(i)) {
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
            target = [];
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target.push(contents[i]);
              }
            }
            if (target.length === 0) {
              target = [ contents[0] ];
            }
            return { "analytics.styling.fabric.bedding": target };
          },
          height: desktop ? factorHeight * 1.5 : factorHeight * 2.9,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
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
          height: (tendencyFactorHeight * 8) + (desktop ? factorHeight * 0.7 : mobileTendencyVisualMargin),
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
          height: (tendencyFactorHeight * 4) + (desktop ? factorHeight * 0.7 : mobileTendencyVisualMargin),
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
              whiteWood: "밝은 우드",
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
          height: (tendencyFactorHeight * 8) + (desktop ? factorHeight * 0.7 : mobileTendencyVisualMargin),
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
          height: (tendencyFactorHeight * 2) + (desktop ? factorHeight * 0.5 : mobileTendencyVisualMargin),
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
              "직접",
              "연결"
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
          name: "정리 수납",
          value: function (designer) {
            let contents, value;
            contents = [
              "연결",
              "미제공"
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
      name: "성향",
      children: [
        {
          name: "미팅 준비성",
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
          middle: false,
        },
        {
          name: "응대 적극성",
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
          middle: false,
        },
        {
          name: "마감 기한",
          value: function (designer) {
            let contents, value;
            contents = [
              "정확",
              "지연"
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
          middle: false,
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
          middle: false,
        },
        {
          name: "문제 해결력",
          value: function (designer) {
            let contents, value;
            contents = [
              "높음",
              "낮음"
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
          middle: false,
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
          height: desktop ? factorHeight * 1.1 : factorHeight * 3.8,
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
                      height: String(desktop ? factorHeight : factorHeight * 0.9) + ea,
                      overflow: "hidden",
                      width: String(1000) + ea,
                    },
                    children: [
                      {
                        text: project.name + " (" + project.phone + ")",
                        style: {
                          display: desktop ? "inline-block" : "block",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(desktop ? margin : 0) + ea,
                        }
                      },
                      {
                        text: '|',
                        style: {
                          display: desktop ? "inline-block" : "none",
                          fontSize: "inherit",
                          fontWeight: String(200),
                          color: colorChip.gray4,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: project.request.space.address,
                        style: {
                          display: desktop ? "inline-block" : "none",
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
                  text: desktop ? "대기중 프로젝트 없음" : "없음",
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
                      height: String(desktop ? factorHeight : factorHeight * 0.9) + ea,
                      overflow: "hidden",
                      width: String(1000) + ea,
                    },
                    children: [
                      {
                        text: project.name + " (" + project.phone + ")",
                        style: {
                          display: desktop ? "inline-block" : "block",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(desktop ? margin : 0) + ea,
                        }
                      },
                      {
                        text: '|',
                        style: {
                          display: desktop ? "inline-block" : "none",
                          fontSize: "inherit",
                          fontWeight: String(200),
                          color: colorChip.gray4,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: dateToString(project.process.contract.form.date.from) + " ~ " + dateToString(project.process.contract.form.date.to),
                        style: {
                          display: desktop ? "inline-block" : "none",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: colorChip.black,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: '|',
                        style: {
                          display: desktop ? "inline-block" : "none",
                          fontSize: "inherit",
                          fontWeight: String(200),
                          color: colorChip.gray4,
                          marginRight: String(margin) + ea,
                        }
                      },
                      {
                        text: project.request.space.address,
                        style: {
                          display: desktop ? "inline-block" : "none",
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
                  text: desktop ? "진행중 프로젝트 없음" : "없음",
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
  if (mobile) {
    checkListData.pop();
  }
  return checkListData;
}

DesignerJs.prototype.projectDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight, middleMode } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip } = GeneralJs;
  let target, pastScrollTop;

  // if (middleMode) {
  //   if (typeof GeneralJs.stacks["designerConsoleSseEvent"] === "function") {
  //     GeneralJs.stacks["designerConsoleSseSource"].removeEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
  //     GeneralJs.stacks["designerConsoleSseSource"] = null;
  //     GeneralJs.stacks["designerConsoleSseEvent"] = null;
  //   }
  //   GeneralJs.stacks["designerConsoleSseSource"] = new EventSource("https://" + SSEHOST + ":3000/specificsse/checklistDesigner");
  //   GeneralJs.stacks["designerConsoleSseEvent"] = function (e) {
  //     instance.checkListSseParsing(GeneralJs.equalJson(e.data));
  //   }
  //   GeneralJs.stacks["designerConsoleSseSource"].addEventListener("updateTong", GeneralJs.stacks["designerConsoleSseEvent"]);
  // }

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  if (!middleMode) {
    this.pageHistory.unshift({ path: "project", status: "list", desid });
  }
  window.history.pushState({ path: "project", status: "list", desid }, '');

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

  if (middleMode) {
    ajaxJson({
      page: "project",
      mode: "page",
      who: instance.designer.information.phone,
      desid,
    }, "/ghostDesigner_updateAnalytics").then((message) => {
      console.log(message);
    }).catch((err) => {
      console.log(err);
    });
  }

  this.projectDetail(desid);
  this.projectIconSet(desid);
  scrollTo(totalMother, pastScrollTop);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }
}

DesignerJs.prototype.projectDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac } = GeneralJs;
  const { totalMother, ea, grayBarWidth, projectMap } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  let designer;
  let margin;
  let baseTong0, baseTong;
  let tempObj, nodeArr, subNodeArr;
  let topMargin, leftMargin, bottomMargin;
  let size;
  let temp;
  let baseTongMarginBottom;
  let baseTongPaddingTop, baseTongPaddingBottom;
  let mobileOuterMargin;
  let divisionEntireMap;
  let baseArea;
  let num, num2;
  let areaBetween;
  let innerPaddingTop;
  let innerPaddingLeft;
  let titleHeight;
  let areaPaddingTop, areaPaddingLeft, areaPaddingBottom;
  let areaTitleTop, areaTitleLeft;
  let fontSize0, fontSize1, fontSize2, fontSize3;
  let mainTitleTextTop, mainTitleTextLeft;
  let countNumberBetween;
  let countNumberTextTop;
  let lastMargin;
  let cardHeight;
  let cardMargin;
  let areaMinHeight;
  let cards;

  designer = this.designers.pick(desid);
  divisionEntireMap = projectMap.action.itemMap.filter((arr) => { return !/없/gi.test(arr[0]); });

  margin = 8;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 11 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 3.5 %%>;

  baseTongPaddingTop = 1;
  baseTongPaddingBottom = 50;
  mobileOuterMargin = 4;

  areaBetween = <%% 13, 12, 12, 12, 12 %%>;
  innerPaddingTop = <%% 24, 24, 24, 24, 24 %%>;
  innerPaddingLeft = <%% 36, 36, 36, 36, 36 %%>;
  titleHeight = <%% 62, 62, 62, 62, 62 %%>;

  areaPaddingTop = <%% 50, 50, 50, 50, 50 %%>;
  areaPaddingLeft = <%% 15, 15, 15, 15, 15 %%>;
  areaPaddingBottom = <%% 15, 15, 15, 15, 15 %%>;

  areaTitleTop = <%% 14, 14, 14, 14, 14 %%>;
  areaTitleLeft = <%% 20, 20, 20, 20, 20 %%>;

  fontSize0 = <%% 25, 25, 25, 25, 25 %%>;
  fontSize1 = <%% 17, 17, 17, 17, 17 %%>;
  fontSize2 = <%% 14, 14, 14, 14, 14 %%>;
  fontSize3 = <%% 12, 12, 12, 12, 12 %%>;

  mainTitleTextTop = <%% -3, -3, -3, -3, -3 %%>;
  mainTitleTextLeft = <%% 3, 3, 3, 3, 3 %%>;
  countNumberBetween = <%% 9, 9, 9, 9, 9 %%>;
  countNumberTextTop = <%% 1, 1, 1, 1, 1 %%>;

  lastMargin = <%% 30, 30, 30, 30, 30 %%>;

  cardHeight = <%% 40, 40, 40, 40, 40 %%>;
  cardMargin = <%% 10, 10, 10, 10, 10 %%>;
  areaMinHeight = cardHeight + (cardMargin * 2);

  



  cards = [
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
    {
      name: "배창규",
      cliid: "c1801_aa01s",
      action: "의뢰서 작성중",
    },
  ];






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
      height: "auto",
      animation: "",
      paddingTop: desktop ? "" : String(mobileOuterMargin) + ea,
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
      boxShadow: desktop ? "" : "0px 3px 15px -9px " + colorChip.shadow,
      background: colorChip.white,
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingTop: desktop ? String(innerPaddingTop) + ea : String(baseTongPaddingTop) + ea,
      paddingBottom: String(baseTongPaddingBottom) + ea,
    }
  });

  for (let [ title, subTitles ] of divisionEntireMap) {

    createNode({
      mother: baseTong,
      style: {
        display: "flex",
        position: "relative",
        alignItems: "center",
        height: String(titleHeight) + ea,
        paddingLeft: String(innerPaddingLeft) + ea,
      },
      children: [
        {
          text: title,
          style: {
            fontSize: String(fontSize0) + ea,
            fontWeight: String(600),
            color: colorChip.black,
            position: "relative",
            top: String(mainTitleTextTop) + ea,
            left: String(mainTitleTextLeft) + ea,
          }
        }
      ]
    });

    num2 = 0;
    for (let subTitle of subTitles) {

      baseArea = createNode({
        mother: baseTong,
        style: {
          display: "block",
          position: "relative",
          paddingLeft: String(innerPaddingLeft) + ea,
          width: withOut(innerPaddingLeft * 2, ea),
          marginBottom: String(num2 !== subTitles.length - 1 ? areaBetween : lastMargin) + ea,
        },
      });

      num = 0;
      for (let sub of subTitle) {

        createNode({
          mother: baseArea,
          style: {
            display: "inline-block",
            position: "relative",
            borderRadius: String(5) + "px",
            border: "1px dashed " + colorChip.gray4,
            boxSizing: "border-box",
            width: "calc(calc(100% - " + String(areaBetween * (subTitle.length - 1)) + ea + ") / " + String(subTitle.length) + ")",
            marginRight: String(num !== subTitle.length - 1 ? areaBetween : 0) + ea,
            paddingTop: String(areaPaddingTop) + ea,
            paddingLeft: String(areaPaddingLeft) + ea,
            paddingRight: String(areaPaddingLeft) + ea,
            paddingBottom: String(areaPaddingBottom) + ea,
          },
          children: [
            {
              style: {
                display: "block",
                position: "absolute",
                width: withOut(areaTitleLeft * 2, ea),
                top: String(areaTitleTop) + ea,
                left: String(areaTitleLeft) + ea,
              },
              children: [
                {
                  text: sub,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(fontSize1) + ea,
                    fontWeight: String(600),
                    color: colorChip.black,
                  }
                },
                {
                  text: String(0) + "명",
                  style: {
                    display: "inline-block",
                    position: "relative",
                    fontSize: String(fontSize2) + ea,
                    fontWeight: String(400),
                    color: colorChip.deactive,
                    top: String(countNumberTextTop) + ea,
                    marginLeft: String(countNumberBetween) + ea,
                  }
                }
              ]
            },
            {
              style: {
                display: "block",
                position: "relative",
                background: colorChip.gray1,
                height: String(areaMinHeight) + ea,
                borderRadius: String(5) + "px",
              }
            }
          ]
        });

        num++;
      }

      num2++;
    }

  }

  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.projectIconSet = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, colorChip, withOut, blankHref, scrollTo } = GeneralJs;
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
  let listIcon, previousIcon, nextIcon, aInitialIcon, mInitialIcon, rInitialIcon;

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
  rInitialIcon = nodeArr[10];

  this.iconTong = mother;
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
      let previousDesid, boo, thisStandard;
      previousDesid = desid;
      do {
        previousDesid = instance.designers.previous(previousDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === previousDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      if (instance.modes.indexOf(instance.mode) === 0) {
        instance.projectDetailLaunching(previousDesid);
      } else {
        instance.reportDetailLaunching(previousDesid);
      }
    });

    nextIcon.addEventListener("click", function (e) {
      let nextDesid, boo, thisStandard;
      nextDesid = desid;
      do {
        nextDesid = instance.designers.next(nextDesid).desid;
        for (let dom of instance.standardDoms) {
          if (dom.getAttribute("desid") === nextDesid) {
            thisStandard = dom;
            boo = (dom.style.display === "none");
          }
        }
      } while (boo);
      if (instance.modes.indexOf(instance.mode) === 0) {
        instance.projectDetailLaunching(nextDesid);
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
          instance.listIcon.style.left = String(left2) + ea;
          grayBack.setAttribute("toggle", "off");
        } else {
          grayBack.style.width = String(instance.grayBarWidth) + ea;
          listPannel.style.transform = "translateX(" + String(0) + ea + ")";
          iconSetPannel.style.background = colorChip.gray0;
          mainBaseTong.style.left = String(instance.grayBarWidth + outerMargin) + ea;
          mainBaseTong.style.width = withOut(instance.grayBarWidth + (outerMargin * 2), ea);
          instance.listIcon.style.left = String(left) + ea;
          grayBack.setAttribute("toggle", "on");
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
    if (window.confirm(designer.designer + " 디자이너님에게 디자이너 콘솔 알림톡을 전송합니다. 확실합니까?")) {
      GeneralJs.ajaxJson({
        method: "designerConsole",
        name: designer.designer,
        phone: designer.information.phone,
        option: {
          desid: designer.desid,
          designer: designer.designer,
          host: GHOSTHOST,
          path: "console",
        }
      }, "/alimTalk").then(() => {
        return GeneralJs.ajaxJson({
          page: "project",
          mode: "send",
          who: GeneralJs.getCookiesAll().homeliaisonConsoleLoginedEmail,
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

DesignerJs.prototype.projectView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    const middleMode = /middle/gi.test(window.location.pathname);
    this.backGrayBar();
    await this.spreadData(null, true, middleMode ? "middle" : null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight, media } = this;
    const mobile = media[4];
    const desktop = !mobile;
    const standardBar = totalMother.firstChild;
    const getObj = returnGet();
    let designers, length;
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
    let searchResult;
    let projects, clients;

    if (!middleMode) {
      designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
      length = designers.length;
      this.designers = new Designers(designers);
    } else {
      designers = await ajaxJson({ noFlat: true, whereQuery: { desid: getObj.desid } }, "/getDesigners", { equal: true });
      if (designers.length === 0) {
        throw new Error("invaild desid");
      }
      length = designers.length;
      this.designers = new Designers(designers);
      this.designer = this.designers.pick(getObj.desid);
    }

    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.middleMode = middleMode;
    this.modes = [ "checklist", "report", "request", "possible" ];
    this.mode = this.modes[0];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };

    if (!middleMode) {
      this.projects = await ajaxJson({ noFlat: true, whereQuery: { desid: { $regex: "^d" } } }, "/getProjects", { equal: true });
    } else {
      this.projects = await ajaxJson({ noFlat: true, whereQuery: { desid: this.desid } }, "/getProjects", { equal: true });
    }

    this.clients = await ajaxJson({ noFlat: true, whereQuery: { $or: [ ...new Set(this.projects.map((obj) => { return obj.cliid; })) ].map((cliid) => { return { cliid }; }) } }, "/getClients", { equal: true })
    this.designers.setProjects(this.projects);
    this.designers.setClients(this.clients);

    motherHeight = <%% 154, 148, 148, 148, 148 %%>;

    if (!middleMode) {
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
              instance.projectDetailLaunching(instance.standardDoms[1].getAttribute("desid"));
            } else {
              searchResult = instance.designers.search(value);
              if (searchResult.length > 0) {
                instance.projectDetailLaunching(searchResult[0].desid);
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
            instance.projectDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
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
    }

    this.firstTop = this.standardDoms[1].getBoundingClientRect().top;
    this.motherHeight = motherHeight;

    this.projectMap = await ajaxJson({ method: "projectMap" }, "/getDataPatch");

    //sse
    // if (!this.middleMode) {
    //   const es = new EventSource("https://" + SSEHOST + ":3000/specificsse/checklistDesigner");
    //   es.addEventListener("updateTong", (e) => {
    //     instance.checkListSseParsing(equalJson(e.data));
    //   });
    // }

    loading.parentNode.removeChild(loading);

    this.pageHistory = [];
    if (desktop) {
      window.addEventListener("resize", (e) => {
        window.location.reload();
      });
    }
    window.addEventListener("popstate", (e) => {
      let targets, targetIndex;
      e.preventDefault();
      if (instance.pageHistory.length > 1) {
        if (!middleMode) {
          if (getObj.mode === instance.pageHistory[1].path) {
            instance.projectDetailLaunching(instance.pageHistory[1].desid);
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }
        } else {

          targets = document.querySelectorAll(".leftMenus");
          if (instance.pageHistory[1].status === "page") {
            if (targets[instance.pageHistory[1].index] !== undefined) {
              targets[instance.pageHistory[1].index].click();
            } else if (instance.menuMap[instance.pageHistory[1].index] !== undefined) {
              instance.menuMap[instance.pageHistory[1].index].event.call(({
                getAttribute: (index) => {
                  return instance.pageHistory[1].index;
                }
              }));
            }
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          } else if (instance.pageHistory[1].status === "card") {
            targetIndex = 5;
            if (targets[targetIndex] !== undefined) {
              targets[targetIndex].click();
            } else if (instance.menuMap[targetIndex] !== undefined) {
              instance.menuMap[targetIndex].event.call(({
                getAttribute: (index) => {
                  return targetIndex;
                }
              }));
            }
            instance.pageHistory.shift();
            for (let box of instance.requestBoxes) {
              if (box.getAttribute("cliid") === instance.pageHistory[1].cliid) {
                box.click();
              }
            }
            instance.pageHistory.shift();
            instance.pageHistory.shift();
          }

        }
      }
    });

    //launching
    this.projectDetailLaunching(this.desid);

  } catch (e) {
    console.log(e);
  }
}
