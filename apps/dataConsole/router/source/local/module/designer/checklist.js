DesignerJs.prototype.checkListData = function (factorHeight = 0, factorWidth = 0, tendencyIndent = 0, tendencyWidthIndent = 0, tendencyFactorHeight = 0, mobileTendencyVisualMargin = 0) {
  const instance = this;
  const { ea, media, totalContents, belowHeight, grayBarWidth } = this;
  const { createNode, colorChip, withOut, removeByClass } = GeneralJs;
  const { entireMode, normalMode } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const zIndex = 4;
  const possiblePopupClassName = "possiblePopupClassName";
  let checkListData;
  let margin;

  margin = 30;

  checkListData = [
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
          name: "아이디",
          script: function (mother, designer) {
            window.navigator.clipboard.writeText(designer.desid).then(() => {
              instance.mother.greenAlert(`클립보드에 저장되었습니다!`);
            }).catch((err) => { console.log(err) });
          },
          value: function (designer) {
            return designer.desid;
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
          name: "생일",
          value: function (designer) {
            return `${String(designer.information.birth.getFullYear())}년 ${String(designer.information.birth.getMonth() + 1)}월 ${String(designer.information.birth.getDate())}일`;
          },
          update: function (text, designer) {
            const errorObj = { updateQuery: "error", text: "error" };
            let updateQuery;
            let year, month, date;
            let rawArr;

            updateQuery = {};

            if (!/년/gi.test(text)) {
              return errorObj;
            }
            if (!/월/gi.test(text)) {
              return errorObj;
            }
            if (!/일/gi.test(text)) {
              return errorObj;
            }
            rawArr = text.split(/[년월]/gi);

            if (rawArr.length !== 3) {
              return errorObj;
            }

            [ year, month, date ] = rawArr.map((str) => { return Number(str.trim().replace(/[^0-9]/gi, '')) });
            month = month - 1;

            if (year < 1000) {
              return errorObj;
            }

            updateQuery["information.birth"] = new Date(year, month, date);

            return { updateQuery, text: `${String(year)}년 ${String(month + 1)}월 ${String(date)}일` };
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
          name: "계약 상태",
          value: function (designer) {
            let contents, value;
            contents = [
              "협약 완료",
              "협약 휴직",
              "협약 해지",
              "신청 대기",
            ];
            value = [];
            for (let i of contents) {
              if (i === designer.information.contract.status) {
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
              "협약 완료",
              "협약 휴직",
              "협약 해지",
              "신청 대기",
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[3];
            }
            return { "information.contract.status": target };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
        {
          name: "메인 디자이너",
          value: function (designer) {
            let contents, value;
            contents = [
              "신규",
              "일반",
              "메인"
            ];
            value = [
              (designer.analytics.grade === -1) ? 1 : 0,
              (designer.analytics.grade === 0) ? 1 : 0,
              (designer.analytics.grade === 1) ? 1 : 0,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            let contents, target;
            contents = [
              "신규",
              "일반",
              "메인"
            ];
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
                break;
              }
            }
            if (target === null) {
              target = contents[1];
            }
            return { "analytics.grade": contents.findIndex((str) => { return str === target }) - 1 };
          },
          height: factorHeight,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
        },
      ]
    },
    {
      name: "업무",
      children: [
        {
          name: "일정",
          script: function (mother, designer) {
            let cancelBack, whitePrompt;

            if (!normalMode) {
              cancelBack = createNode({
                mother: totalContents,
                class: [ possiblePopupClassName ],
                event: {
                  click: (e) => {
                    removeByClass(possiblePopupClassName);
                  }
                },
                style: {
                  position: "fixed",
                  top: String(0),
                  left: String(grayBarWidth) + ea,
                  width: withOut(grayBarWidth, ea),
                  height: withOut(belowHeight, ea),
                  background: colorChip.black,
                  opacity: String(0.3),
                  zIndex: String(zIndex),
                }
              });
  
              whitePrompt = createNode({
                mother: totalContents,
                class: [ possiblePopupClassName ],
                style: {
                  position: "fixed",
                  top: String(margin) + ea,
                  left: String(margin + grayBarWidth) + ea,
                  width: withOut((margin * 2) + grayBarWidth, ea),
                  height: withOut((margin * 2) + belowHeight, ea),
                  background: colorChip.white,
                  borderRadius: String(5) + "px",
                  animation: "fadeuplite 0.3s ease forwards",
                  boxShadow: "0 2px 10px -6px " + colorChip.shadow,
                  overflow: "hidden",
                  zIndex: String(zIndex),
                },
                child: {
                  mode: "iframe",
                  attribute: {
                    src: BACKHOST + "/middle/designerPossible?desid=" + designer.desid + "&entire=true",
                  },
                  style: {
                    position: "absolute",
                    display: "block",
                    top: String(0),
                    left: String(0),
                    width: withOut(0, ea),
                    height: withOut(0, ea),
                    border: String(0),
                  }
                }
              });
            } else {
              window.parent.postMessage(JSON.stringify({ type: "whiteConverting", desid: designer.desid, mode: "possible" }), "*");
            }

          },
          value: function (designer) {
            return "일정 관리";
          },
          height: factorHeight,
          type: "string",
        },
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

                                            if (window.confirm("수정이 확실합니까?")) {
                                              await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                              await ajaxJson({
                                                mode: "sse",
                                                db: "console",
                                                collection: "sse_checklistDesigner",
                                                log: true,
                                                who: (cookies.homeliaisonConsoleLoginedEmail),
                                                updateQuery: {
                                                  desid,
                                                  type: "async__function__{ mother.querySelectorAll('div')[0].textContent __equal__ value; }",
                                                  value: text,
                                                  position: { x: 1, y: 0, class: "dom_" + String(1) + "_" + String(0) },
                                                  update: { whereQuery, updateQuery }
                                                }
                                              }, "/generalMongo");
                                              await ajaxJson({
                                                page: "checklist",
                                                mode: "update",
                                                who: (JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
                                                update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                                                desid,
                                              }, "/ghostDesigner_updateAnalytics");
                                              instance.designers.update([ whereQuery, updateQuery ]);
                                              if (typeof window.parent.postMessage === "function") {
                                                window.parent.postMessage(JSON.stringify({
                                                  type: "checklistUpdate",
                                                  desid: desid,
                                                  updateQuery,
                                                }), "*");
                                              }
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
                                            if (window.confirm("수정이 확실합니까?")) {
                                              await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                              await ajaxJson({
                                                mode: "sse",
                                                db: "console",
                                                collection: "sse_checklistDesigner",
                                                log: true,
                                                who: (cookies.homeliaisonConsoleLoginedEmail),
                                                updateQuery: {
                                                  desid,
                                                  type: "async__function__{ mother.querySelectorAll('div')[2].textContent __equal__ value; }",
                                                  value: text,
                                                  position: { x: 1, y: 0, class: "dom_" + String(1) + "_" + String(0) },
                                                  update: { whereQuery, updateQuery }
                                                }
                                              }, "/generalMongo");
                                              await ajaxJson({
                                                page: "checklist",
                                                mode: "update",
                                                who: (JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
                                                update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                                                desid,
                                              }, "/ghostDesigner_updateAnalytics");
                                              instance.designers.update([ whereQuery, updateQuery ]);
                                              if (typeof window.parent.postMessage === "function") {
                                                window.parent.postMessage(JSON.stringify({
                                                  type: "checklistUpdate",
                                                  desid: desid,
                                                  updateQuery,
                                                }), "*");
                                              }
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
            let cancelBack, whitePrompt;

            if (!normalMode) {
              cancelBack = createNode({
                mother: totalContents,
                class: [ possiblePopupClassName ],
                event: {
                  click: (e) => {
                    removeByClass(possiblePopupClassName);
                  }
                },
                style: {
                  position: "fixed",
                  top: String(0),
                  left: String(grayBarWidth) + ea,
                  width: withOut(grayBarWidth, ea),
                  height: withOut(belowHeight, ea),
                  background: colorChip.black,
                  opacity: String(0.3),
                  zIndex: String(zIndex),
                }
              });
  
              whitePrompt = createNode({
                mother: totalContents,
                class: [ possiblePopupClassName ],
                style: {
                  position: "fixed",
                  top: String(margin) + ea,
                  left: String(margin + grayBarWidth) + ea,
                  width: withOut((margin * 2) + grayBarWidth, ea),
                  height: withOut((margin * 2) + belowHeight, ea),
                  background: colorChip.white,
                  borderRadius: String(5) + "px",
                  animation: "fadeuplite 0.3s ease forwards",
                  boxShadow: "0 2px 10px -6px " + colorChip.shadow,
                  overflow: "hidden",
                  zIndex: String(zIndex),
                },
                child: {
                  mode: "iframe",
                  attribute: {
                    src: window.location.protocol + "//" + window.location.host + "/designer?mode=general&desid=" + designer.desid + "&dataonly=true&entire=true",
                  },
                  style: {
                    position: "absolute",
                    display: "block",
                    top: String(0),
                    left: String(0),
                    width: withOut(0, ea),
                    height: withOut(0, ea),
                    border: String(0),
                  }
                }
              });
            } else {
              window.parent.postMessage(JSON.stringify({ type: "whiteConverting", desid: designer.desid, mode: "portfolio" }), "*");
            }
          },
          height: factorHeight,
          type: "string",
          middle: true,
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
          middle: true,
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
          middle: true,
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
          middle: true,
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
          middle: true,
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
          middle: true,
        },
        /*
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
          middle: true,
        },
        */
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
            contents = [ "N", "F", "J", "S" ];
            value = [ 0, 0, 0, 0 ];
            if (value[designer.analytics.construct.level] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.construct.level] = 1;
            return { contents, value };
          },
          update: function (value, designer) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.construct.level": target };
          },
          height: desktop ? factorHeight : factorHeight * 1.8,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          middle: true,
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
        // {
        //   name: "시공 방식 (S)",
        //   value: function (designer) {
        //     const constructCase = designer.analytics.construct.case;
        //     if (!Array.isArray(constructCase)) {
        //       throw new Error("invaild value");
        //     }
        //     if (constructCase.length !== 3) {
        //       throw new Error("invaild value");
        //     }
        //     let contents, value;
        //     contents = [
        //       "직접 계약, 직접 감리",
        //       "직접 계약, 외주 감리",
        //       "협업사 계약",
        //       "공정별 연결"
        //     ];
        //     value = [];
        //     for (let i of contents) {
        //       value.push(constructCase[0].contract.includes(i) ? 1 : 0);
        //     }
        //     return { contents, value };
        //   },
        //   update: function (value, designer) {
        //     const position = "analytics.construct.case.0.contract";
        //     let contents, updateQuery, target;
        //     contents = [
        //       "직접 계약, 직접 감리",
        //       "직접 계약, 외주 감리",
        //       "협업사 계약",
        //       "공정별 연결"
        //     ];
        //     target = [];
        //     for (let i = 0; i < contents.length; i++) {
        //       if (value[i] === 1) {
        //         target.push(contents[i]);
        //       }
        //     }
        //     updateQuery = {};
        //     updateQuery[position] = target;
        //     return updateQuery;
        //   },
        //   height: desktop ? factorHeight : factorHeight * 3.8,
        //   width: factorWidth,
        //   totalWidth: factorWidth * 4,
        //   factorHeight: factorHeight,
        //   type: "matrix",
        //   multiple: true,
        // },
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
        // {
        //   name: "시공 방식 (T)",
        //   value: function (designer) {
        //     const constructCase = designer.analytics.construct.case;
        //     if (!Array.isArray(constructCase)) {
        //       throw new Error("invaild value");
        //     }
        //     if (constructCase.length !== 3) {
        //       throw new Error("invaild value");
        //     }
        //     let contents, value;
        //     contents = [
        //       "직접 계약, 직접 감리",
        //       "직접 계약, 외주 감리",
        //       "협업사 계약",
        //       "공정별 연결"
        //     ];
        //     value = [];
        //     for (let i of contents) {
        //       value.push(constructCase[1].contract.includes(i) ? 1 : 0);
        //     }
        //     return { contents, value };
        //   },
        //   update: function (value, designer) {
        //     const position = "analytics.construct.case.1.contract";
        //     let contents, updateQuery, target;
        //     contents = [
        //       "직접 계약, 직접 감리",
        //       "직접 계약, 외주 감리",
        //       "협업사 계약",
        //       "공정별 연결"
        //     ];
        //     target = [];
        //     for (let i = 0; i < contents.length; i++) {
        //       if (value[i] === 1) {
        //         target.push(contents[i]);
        //       }
        //     }
        //     updateQuery = {};
        //     updateQuery[position] = target;
        //     return updateQuery;
        //   },
        //   height: desktop ? factorHeight : factorHeight * 3.8,
        //   width: factorWidth,
        //   totalWidth: factorWidth * 4,
        //   factorHeight: factorHeight,
        //   type: "matrix",
        //   multiple: true,
        // },
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
        // {
        //   name: "시공 방식 (XT)",
        //   value: function (designer) {
        //     const constructCase = designer.analytics.construct.case;
        //     if (!Array.isArray(constructCase)) {
        //       throw new Error("invaild value");
        //     }
        //     if (constructCase.length !== 3) {
        //       throw new Error("invaild value");
        //     }
        //     let contents, value;
        //     contents = [
        //       "직접 계약, 직접 감리",
        //       "직접 계약, 외주 감리",
        //       "협업사 계약",
        //       "공정별 연결"
        //     ];
        //     value = [];
        //     for (let i of contents) {
        //       value.push(constructCase[2].contract.includes(i) ? 1 : 0);
        //     }
        //     return { contents, value };
        //   },
        //   update: function (value, designer) {
        //     const position = "analytics.construct.case.2.contract";
        //     let contents, updateQuery, target;
        //     contents = [
        //       "직접 계약, 직접 감리",
        //       "직접 계약, 외주 감리",
        //       "협업사 계약",
        //       "공정별 연결"
        //     ];
        //     target = [];
        //     for (let i = 0; i < contents.length; i++) {
        //       if (value[i] === 1) {
        //         target.push(contents[i]);
        //       }
        //     }
        //     updateQuery = {};
        //     updateQuery[position] = target;
        //     return updateQuery;
        //   },
        //   height: desktop ? factorHeight : factorHeight * 3.8,
        //   width: factorWidth,
        //   totalWidth: factorWidth * 4,
        //   factorHeight: factorHeight,
        //   type: "matrix",
        //   multiple: true,
        // },
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
          height: desktop ? factorHeight : factorHeight * 3.8,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          multiple: true,
        },
        {
          name: "파트너 시공사",
          value: function (designer) {
            let contents, value;
            contents = [
              "있음",
              "없음"
            ];
            value = [
              designer.analytics.construct.partner ? 1 : 0,
              designer.analytics.construct.partner ? 0 : 1,
            ];
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.partner";
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
          name: "파트너 가능 범위",
          value: function (designer) {
            let contents, value;
            contents = [
              "홈스타일링",
              "토탈 스타일링",
              "엑스트라 스타일링",
            ];
            value = [];
            for (let i = 0; i < contents.length; i++) {
              value.push(designer.analytics.construct.range - 2 === i ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.range";
            let contents, updateQuery, target;
            contents = [
              "홈스타일링",
              "토탈 스타일링",
              "엑스트라 스타일링",
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = i + 2;
              }
            }
            if (target === null) {
              target = 0 + 2;
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
        },

        {
          name: "주 이용 시공사",
          value: function (designer) {
            let contents, value;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            value = [];
            for (let i of contents) {
              value.push(designer.analytics.construct.major === i ? 1 : 0);
            }
            return { contents, value };
          },
          update: function (value, designer) {
            const position = "analytics.construct.major";
            let contents, updateQuery, target;
            contents = [
              "고객 시공사",
              "홈리에종 시공사",
              "디자이너 시공사",
            ];
            target = null;
            for (let i = 0; i < contents.length; i++) {
              if (value[i] === 1) {
                target = contents[i];
              }
            }
            if (target === null) {
              target = contents[1];
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
            contents = [ "N", "F", "J", "S" ];
            value = [ 0, 0, 0, 0 ];
            if (value[designer.analytics.styling.level] === undefined) {
              throw new Error("level error");
            }
            value[designer.analytics.styling.level] = 1;
            return { contents, value };
          },
          update: function (value, designer) {
            let target;
            target = null;
            for (let i = 0; i < value.length; i++) {
              if (value[i] === 1) {
                target = i;
              }
            }
            if (target === null) {
              target = 1;
            }
            return { "analytics.styling.level": target };
          },
          height: desktop ? factorHeight : factorHeight * 1.8,
          width: factorWidth,
          totalWidth: factorWidth * 4,
          factorHeight: factorHeight,
          type: "matrix",
          middle: true,
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
        // {
        //   name: "빌트인 상세",
        //   value: function (designer) {
        //     let contents, value;
        //     contents = [
        //       "도면",
        //       "3D",
        //       "AS 가능"
        //     ];
        //     value = [];
        //     for (let i of contents) {
        //       value.push(designer.analytics.styling.furniture.builtinDetail.includes(i) ? 1 : 0);
        //     }
        //     return { contents, value };
        //   },
        //   update: function (value, designer) {
        //     let contents, target;
        //     contents = [
        //       "도면",
        //       "3D",
        //       "AS 가능"
        //     ];
        //     target = [];
        //     for (let i = 0; i < contents.length; i++) {
        //       if (value[i] === 1) {
        //         target.push(contents[i]);
        //       }
        //     }
        //     return { "analytics.styling.furniture.builtinDetail": target };
        //   },
        //   height: factorHeight,
        //   width: factorWidth,
        //   totalWidth: factorWidth * 4,
        //   factorHeight: factorHeight,
        //   type: "matrix",
        //   multiple: true,
        //   half: true
        // },
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
        // {
        //   name: "가구 상세",
        //   value: function (designer) {
        //     let contents, value;
        //     contents = [
        //       "도면",
        //       "3D",
        //       "AS 가능"
        //     ];
        //     value = [];
        //     for (let i of contents) {
        //       value.push(designer.analytics.styling.furniture.designDetail.includes(i) ? 1 : 0);
        //     }
        //     return { contents, value };
        //   },
        //   update: function (value, designer) {
        //     let contents, target;
        //     contents = [
        //       "도면",
        //       "3D",
        //       "AS 가능"
        //     ];
        //     target = [];
        //     for (let i = 0; i < contents.length; i++) {
        //       if (value[i] === 1) {
        //         target.push(contents[i]);
        //       }
        //     }
        //     return { "analytics.styling.furniture.designDetail": target };
        //   },
        //   height: factorHeight,
        //   width: factorWidth,
        //   totalWidth: factorWidth * 4,
        //   factorHeight: factorHeight,
        //   type: "matrix",
        //   multiple: true,
        //   half: true
        // },
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
        // {
        //   name: "구매 대행",
        //   value: function (designer) {
        //     let contents, value;
        //     contents = [
        //       "가능",
        //       "불가능"
        //     ];
        //     value = [
        //       designer.analytics.purchase.agencies ? 1 : 0,
        //       designer.analytics.purchase.agencies ? 0 : 1,
        //     ];
        //     return { contents, value };
        //   },
        //   update: function (value, designer) {
        //     const position = "analytics.purchase.agencies";
        //     let updateQuery;
        //     updateQuery = {};
        //     updateQuery[position] = (value[0] === 1);
        //     return updateQuery;
        //   },
        //   height: factorHeight,
        //   width: factorWidth,
        //   totalWidth: factorWidth * 4,
        //   factorHeight: factorHeight,
        //   type: "matrix",
        // },
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
          middle: true,
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
          middle: true,
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
          middle: true,
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
          middle: true,
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
          middle: true,
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
          middle: true,
        },
      ]
    },
    /*
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
    */
  ];

  return checkListData;
}

DesignerJs.prototype.checkListDetailLaunching = function (desid, callback = null) {
  const instance = this;
  const { ea, belowHeight, firstTop, motherHeight } = this;
  const totalMother = document.querySelector(".totalMother");
  const standardBar = this.standardDoms[0].parentElement;
  const { scrollTo, ajaxJson, colorChip, removeByClass } = GeneralJs;
  const memoBaseClassName = "memoBaseClassName";
  const possiblePopupClassName = "possiblePopupClassName";
  let target, pastScrollTop;

  removeByClass(possiblePopupClassName);

  pastScrollTop = totalMother.scrollTop;
  this.desid = desid;
  this.fixTargets = [];

  this.pageHistory.unshift({ path: "checklist", status: "list", desid });
  window.history.pushState({ path: "checklist", status: "list", desid }, '');

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

  this.checkListDetail(desid);
  this.checkListIconSet(desid);
  scrollTo(totalMother, pastScrollTop);
  if (callback !== null) {
    if (typeof callback === "function") {
      callback();
    }
  }

  if ([ ...document.querySelectorAll('.' + memoBaseClassName) ].length > 0 && typeof instance.checklistMemoSystem === "function") {
    instance.checklistMemoSystem(desid).catch((err) => { console.log(err); });
  }
}

DesignerJs.prototype.checkListDetail = function (desid) {
  if (desid === undefined) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const { entireMode, normalMode } = this;
  const matrixButtonConst = "matrixButtons_" + desid;
  const cookies = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
  const mobile = this.media[4];
  const desktop = normalMode ? true : !mobile;
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
  let mobileTendencyTop;
  let mobileTendencyVisualMargin;
  let mobileTendencyIntend;
  let baseTongPaddingTop, baseTongPaddingBottom;
  let allHideIndex, safeNum;
  let mobileOuterMargin;

  designer = this.designers.pick(desid);
  information = designer.information;
  analytics = designer.analytics;

  margin = 8;
  level1Width = <%% 210, 172, 172, 172, 34 %%>;
  level1Left = <%% 160, 136, 136, 136, 0 %%>;
  topMargin = <%% (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), (isMac() ? 30 : 34), 6 %%>;
  leftMargin = <%% 34, 34, 34, 34, 8 %%>;
  bottomMargin = <%% (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), (isMac() ? 15 : 13), 11 %%>;
  baseTongMarginBottom = <%% 80, 80, 80, 80, 25 %%>;
  size = <%% 16, 15, 15, 15, 3.5 %%>;

  tendencyTop = <%% 3, 3, 3, 3, 0.8 %%>;
  tendencyHeight = <%% 16, 16, 16, 16, 4 %%>;
  alphabetWidth = <%% 30, 30, 30, 30, 7 %%>;

  factorHeight = <%% 38, 36, 36, 36, 8.2 %%>;
  factorWidth = <%% 210, 172, 172, 172, 210 %%>;
  tendencyFactorHeight = <%% 30, 30, 30, 30, 7 %%>;
  tendencyIndent = <%% 105, 71, 71, 71, 65 %%>;
  tendencyWidthIndent = -135;

  textAreaTop = <%% (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), (isMac() ? -3 : -4), -0.7 %%>;

  mobileTendencyTop = 8;
  mobileTendencyVisualMargin = 13;
  mobileTendencyIntend = 20;

  baseTongPaddingTop = 1;
  baseTongPaddingBottom = 20;
  mobileOuterMargin = 4;

  checkListData = this.checkListData(factorHeight, factorWidth, tendencyIndent, tendencyWidthIndent, tendencyFactorHeight, mobileTendencyVisualMargin);

  baseTong0 = createNode({
    mother: totalMother,
    class: [ "mainBaseTong" ],
    style: {
      position: "absolute",
      top: desktop ? String((GeneralJs.returnGet().normal === "true" ? margin * 1.5 : margin * 3)) + ea : (String(0)),
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
      height: "auto",
      overflow: "hidden",
      marginBottom: String(baseTongMarginBottom) + ea,
      paddingTop: desktop ? "" : String(baseTongPaddingTop) + ea,
      paddingBottom: desktop ? "" : String(baseTongPaddingBottom) + ea,
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
          fontSize: String(size + (mobile ? 0.5 : 0)) + ea,
          fontWeight: String(600),
          color: colorChip.black,
          top: String(topMargin + 1) + ea,
          left: String(leftMargin) + ea,
          background: colorChip.white,
          paddingRight: String(desktop ? 0 : 3) + ea,
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
          display: desktop ? "block" : "none",
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
          verticalAlign: "top",
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
          verticalAlign: "top",
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
                                  const confirm = window.confirm("수정이 확실합니까?");
                                  if (updateQuery === "error" || !confirm) {
                                    this.value = this.getAttribute("past");
                                  } else {
                                    if (this.parentElement !== null) {
                                      this.parentElement.removeChild(this.parentElement.firstChild);
                                      this.parentElement.insertAdjacentHTML("beforeend", text);
                                    }
                                    await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                                    await ajaxJson({
                                      mode: "sse",
                                      db: "console",
                                      collection: "sse_checklistDesigner",
                                      log: true,
                                      who: (cookies.homeliaisonConsoleLoginedEmail),
                                      updateQuery: { desid, type: checkListData[x].children[y].type, value: text, position: { x, y, class: "dom_" + String(x) + "_" + String(y) },
                                      update: { whereQuery, updateQuery } } }, "/generalMongo");
                                    await ajaxJson({
                                      page: "checklist",
                                      mode: "update",
                                      who: (JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
                                      update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                                      desid,
                                    }, "/ghostDesigner_updateAnalytics");
                                    instance.designers.update([ whereQuery, updateQuery ]);
                                  }
                                  if (this.parentElement !== null) {
                                    this.parentElement.removeChild(this.parentElement.querySelector("aside"));
                                  }
                                  if (this.parentElement !== null) {
                                    this.parentElement.removeChild(this.parentElement.querySelector("input"));
                                  }
                                  if (typeof window.parent.postMessage === "function") {
                                    window.parent.postMessage(JSON.stringify({
                                      type: "checklistUpdate",
                                      desid: desid,
                                      updateQuery,
                                    }), "*");
                                  }
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
                          width: desktop ? String(this.getBoundingClientRect().width) + ea : String(100) + '%',
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
            verticalAlign: "top",
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
            verticalAlign: "top",
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

                    if (window.confirm("수정이 확실합니까?")) {
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
                      await ajaxJson({
                        mode: "sse",
                        db: "console",
                        collection: "sse_checklistDesigner",
                        log: true,
                        who: (cookies.homeliaisonConsoleLoginedEmail),
                        updateQuery: { desid, type: checkListData[x].children[y].type, value: resultArr, position: { x, y, class: "dom_" + String(x) + "_" + String(y) },
                        update: { whereQuery, updateQuery } } }, "/generalMongo");
                      await ajaxJson({
                        page: "checklist",
                        mode: "update",
                        who: (JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
                        update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                        desid,
                      }, "/ghostDesigner_updateAnalytics");
                      instance.designers.update([ whereQuery, updateQuery ]);
                      if (typeof window.parent.postMessage === "function") {
                        window.parent.postMessage(JSON.stringify({
                          type: "checklistUpdate",
                          desid: desid,
                          updateQuery,
                        }), "*");
                      }
                    }

                  } catch (err) {
                    console.log(err);
                  }
                }
              }
            ],
            class: [ "hoverDefault_lite", matrixButtonConst + String(i) + String(j), matrixButtonConst + String(i) + String(j) + String(k) ],
            style: {
              display: desktop ? "inline-block" : ((tempMatrix.contents.length <= 2 || checkListData[i].children[j].half === true) ? "inline-block" : "block"),
              position: "relative",
              top: desktop ? "" : String(0.1) + ea,
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: desktop ? String(checkListData[i].children[j].width) + ea : String((tempMatrix.contents.length <= 2 || checkListData[i].children[j].half === true) ? 45 : 100) + '%',
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
            width: String(desktop ? checkListData[i].children[j].totalWidth : 100 - (mobileOuterMargin * 2) - (leftMargin * 2)) + ea,
            height: String(checkListData[i].children[j].height - (desktop ? 0 : mobileTendencyTop)) + ea,
            paddingTop: desktop ? "" : String(mobileTendencyTop) + ea,
            left: desktop ? "" : String(0 - level1Width) + ea,
            verticalAlign: "top",
          }
        };
        tempArr.push(tempObj);

        for (let k = 0; k < tempMatrix.contents.length; k++) {
          tempObj = {
            mother: -1 + (k * -11),
            text: tempMatrix.contents[k],
            class: [ (desktop ? "hoverDefault_lite" : "tendencyMother") ],
            style: {
              display: "block",
              position: "relative",
              fontSize: String(size) + ea,
              fontWeight: String(300),
              width: String(desktop ? checkListData[i].children[j].totalWidth : 100 - (mobileOuterMargin * 2) - (leftMargin * 2)) + ea,
              color: colorChip.black,
              height: String(checkListData[i].children[j].factorHeight) + ea,
            }
          };
          tempArr.push(tempObj);
          for (let l = 0; l < 10; l++) {
            if (desktop) {
              temp = (checkListData[i].children[j].totalWidth - checkListData[i].children[j].width) / 10;
            } else {
              temp = (100 - (mobileOuterMargin * 2) - (leftMargin * 2) - mobileTendencyIntend) / 10;
            }
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

                      if (window.confirm("수정이 확실합니까?")) {
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
                        await ajaxJson({
                          mode: "sse",
                          db: "console",
                          collection: "sse_checklistDesigner",
                          log: true,
                          who: (cookies.homeliaisonConsoleLoginedEmail),
                          updateQuery: { desid, type: checkListData[x].children[y].type, value: [ z, t, (checkListData[x].children[y].opposite === true), matrixButtonConst ], position: { x, y, class: "dom_" + String(x) + "_" + String(y) },
                          update: { whereQuery, updateQuery } } }, "/generalMongo");
                        await ajaxJson({
                          page: "checklist",
                          mode: "update",
                          who: (JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
                          update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                          desid,
                        }, "/ghostDesigner_updateAnalytics");
                        instance.designers.update([ whereQuery, updateQuery ]);
                        if (typeof window.parent.postMessage === "function") {
                          window.parent.postMessage(JSON.stringify({
                            type: "checklistUpdate",
                            desid: desid,
                            updateQuery,
                          }), "*");
                        }
                      }

                    } catch (err) {
                      console.log(err);
                    }
                  }
                }
              ],
              class: [ (desktop ? "hoverDefault_lite" : "tendencyDetail"), matrixButtonConst + String(i) + String(j) + String(k) ],
              style: {
                position: "absolute",
                width: String(temp) + ea,
                left: String((desktop ? checkListData[i].children[j].width : mobileTendencyIntend) + (temp * l)) + ea,
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
            verticalAlign: "top",
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
              type: "keydown",
              event: function (e) {
                if (e.key === "Enter" || e.key === "Tab") {
                  e.preventDefault();
                  this.blur();
                }
              }
            },
            {
              type: "blur",
              event: async function (e) {
                try {
                  this.value = this.value.trim().replace(/^\n/g, '').replace(/\n$/g, '').trim().replace(/^\n/g, '').replace(/\n$/g, '').trim().replace(/^\n/g, '').replace(/\n$/g, '').trim().replace(/^\n/g, '').replace(/\n$/g, '');
                  if (this.value !== this.getAttribute("past")) {
                    const x = Number(this.getAttribute('x'));
                    const y = Number(this.getAttribute('y'));
                    if (typeof checkListData[x].children[y].update === "function") {
                      const designer = instance.designers.pick(desid);
                      const updateQuery = checkListData[x].children[y].update(this.value.trim(), designer);
                      const whereQuery = { desid };
                      const confirm = window.confirm("수정이 확실합니까?");
                      if (updateQuery === "error" || !confirm) {
                        this.value = this.getAttribute("past");
                      } else {
                        await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateDesigner");
                        await ajaxJson({
                          mode: "sse",
                          db: "console",
                          collection: "sse_checklistDesigner",
                          log: true,
                          who: (cookies.homeliaisonConsoleLoginedEmail),
                          updateQuery: { desid, type: checkListData[x].children[y].type, value: this.value.trim(), position: { x, y, class: "dom_" + String(x) + "_" + String(y) },
                          update: { whereQuery, updateQuery } } }, "/generalMongo");
                        await ajaxJson({
                          page: "checklist",
                          mode: "update",
                          who: (JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail),
                          update: [ Object.keys(updateQuery), Object.values(updateQuery) ],
                          desid,
                        }, "/ghostDesigner_updateAnalytics");
                        instance.designers.update([ whereQuery, updateQuery ]);
                        if (typeof window.parent.postMessage === "function") {
                          window.parent.postMessage(JSON.stringify({
                            type: "checklistUpdate",
                            desid: desid,
                            updateQuery,
                          }), "*");
                        }
                      }
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
            height: desktop ? withOut(checkListData[i].children[j].textHeight, ea) : String(checkListData[i].children[j].textHeight * checkListData[i].children[j].value(designer).length * 2) + ea,
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
            verticalAlign: "top",
          }
        };
        tempArr.push(tempObj);
      }

      subNodeArr = createNodes(tempArr);
      if (checkListData[i].children[j].type === "async") {
        if (typeof checkListData[i].children[j].value === "function") {
          checkListData[i].children[j].value(subNodeArr, designer).catch((err) => {
            console.log(err);
          });
        }
      }
    }

  }

  instance.checkListProjectsView(desid, baseTong0).catch((err) => { console.log(err); });
  this.mainBaseTong = baseTong0;
}

DesignerJs.prototype.isEmptyString = function (string) {
  const instance = this;
  if (/^[0-9]/.test(string) && /[0-9]$/.test(string) && string.length > 5 && string.replace(/[0-9]/gi, '') === '') {
    return true;
  } else {
    return false;
  }
}

DesignerJs.prototype.checkListProjectsView = async function (desid, base) {
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, stringToDate, findByAttribute, setQueue, uniqueValue, sleep, blankHref, scrollTo, returnGet } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  const panClassName = "panClassName";
  try {
    let designer;
    let projects, clients;
    let client;
    let requestNumber;
    let baseTong;
    let thisMother;
    let motherMargin;
    let blockHeight;
    let project;
    let projectTong;
    let basicSize;
    let textTop;
    let state;
    let lineTop;
    let statusWidth;
    let blockMargin;
    let smallSize;
    let smallTextTop;
    let basicMarginLeft, smallMarginLeft;
    let circleWidth;
    let moreWidth;
    let projectDetailTong;
    let checklist;
    let type;
    let key;
    let title;
    let action;
    let typeObj;
    let panContents;
    let innerMargin;
    let panPaddingLeft;
    let panBetween;
    let panPaddingTop;
    let panTitleSize;
    let panTitleWeight;
    let panTitleBottom;
    let subButtonTop;
    let subButtonHeight;
    let subButtonSize;
    let subButtonWeight;
    let subButtonTextPadding;
    let panContentsPaddingTop;
    let panContentsMinHeight;
    let minTotalHeight;
    let divideNumber;
    let photoDivideNumber;
    let blockBetween;
    let blockHeight2;
    let blockSize;
    let blockWeight;
    let linkImageHeight;
    let targetProjectBlock;

    motherMargin = 34;
    blockHeight = 52;
    blockMargin = 4;

    basicSize = 16;
    textTop = (isMac() ? -1 : 1);
    smallSize = 12;
    smallTextTop = (isMac() ? 1 : 3);

    lineTop = 18;
    statusWidth = 100;

    basicMarginLeft = 36;
    smallMarginLeft = 6;

    circleWidth = 6;
    moreWidth = 90;

    innerMargin = 16;
    panBetween = 6;
    panPaddingTop = 15;
    panPaddingLeft = 18;

    panTitleSize = 13;
    panTitleWeight = 700;
    panTitleBottom = 5;

    subButtonTop = 2;
    subButtonHeight = 21;
    subButtonSize = 10;
    subButtonWeight = 800;
    subButtonTextPadding = 8;

    panContentsPaddingTop = 12;
    panContentsMinHeight = 80;

    minTotalHeight = 1400;

    divideNumber = 8;
    photoDivideNumber = 6;
    blockBetween = 5;

    blockHeight2 = 40;
    blockSize = 12;
    blockWeight = 400;

    linkImageHeight = 147;

    typeObj = {};

    designer = this.designers.pick(desid);
    baseTong = base.firstChild;

    projects = await ajaxJson({ whereQuery: { desid } }, SECONDHOST + "/getProjects", { equal: true });
    if (projects.length > 0) {
      clients = await ajaxJson({ whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) } }, SECONDHOST + "/getClients", { equal: true });
    } else {
      clients = [];
    }
    for (let project of projects) {
      client = clients.find((obj) => { return obj.cliid === project.cliid });
      requestNumber = 0;
      for (let z = 0; z < client.requests.length; z++) {
        if (client.requests[z].request.timeline.valueOf() <= project.proposal.date.valueOf()) {
          requestNumber = z;
          break;
        }
      }
      project.name = client.name;
      project.timeline = client.requests[requestNumber].request.timeline;
    }
    projects.sort((a, b) => {
      const emptyValue = Math.abs((new Date(1200, 0, 1)).valueOf());
      let aConst, bConst;

      if (/드[랍롭]/gi.test(a.process.status) || /홀[드딩]/gi.test(a.process.status)) {
        aConst = 1;
      } else if (/완료/gi.test(a.process.status)) {
        aConst = 10000;
      } else {
        aConst = 100000000;
      }

      if (/드[랍롭]/gi.test(b.process.status) || /홀[드딩]/gi.test(b.process.status)) {
        bConst = 1;
      } else if (/완료/gi.test(b.process.status)) {
        bConst = 10000;
      } else {
        bConst = 100000000;
      }

      return ((b.process.contract.form.date.from.valueOf() + emptyValue) * bConst) - ((a.process.contract.form.date.from.valueOf() + emptyValue) * aConst);
    });

    checklist = await ajaxJson({}, SECONDHOST + "/getChecklist", { equal: true });

    thisMother = createNode({
      mother: baseTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        borderTop: "1px solid " + colorChip.gray4,
        paddingTop: String(motherMargin) + ea,
        paddingBottom: String(motherMargin) + ea,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(motherMargin) + ea,
          marginRight: String(motherMargin) + ea,
          width: withOut(motherMargin * 2, ea),
        }
      }
    }).firstChild;

    this.projectAreas = [];
    this.projectBlocks = [];
    for (let i = 0; i < projects.length; i++) {

      project = projects[i];
      state = 0;
      if (/드[랍롭]/gi.test(project.process.status) || /홀[드딩]/gi.test(project.process.status)) {
        state = 3;
      } else if (/완료/gi.test(project.process.status)) {
        state = 2;
      }

      projectTong = createNode({
        mother: thisMother,
        attribute: {
          proid: project.proid,
          desid: designer.desid,
          cliid: project.cliid,
          name: project.name,
          timeline: dateToString(project.timeline),
          toggle: "off",
        },
        event: {
          click: async function (e) {
            const proid = this.getAttribute("proid");
            const desid = this.getAttribute("desid");
            const cliid = this.getAttribute("cliid");
            const name = this.getAttribute("name");
            const timeline = stringToDate(this.getAttribute("timeline"));
            const targetArea = findByAttribute(instance.projectAreas, "proid", proid);
            const toggle = this.getAttribute("toggle");
            const targetHref = BRIDGEHOST.replace(/\:3000/gi, '') + "/photo/designer" + "/" + desid + "/" + proid;
            const linkTargetKey = [ "productLink" ];
            const preItemMotherKey = "firstPhoto";
            const preItemHex = "070a916ebdea87fae21233050e1b322eb4694980e1bced5012199be287e2e92d";
            const hashConst = "homeliaisonHash";
            const load = targetArea.getAttribute("load");
            const emptyDate = new Date(1800, 0, 1);
            let itemList, indexTong;
            let file, link, memo;
            let image;
            let id;
            let linkTargets;
            let linkContents;
            let preItemList;
            let tempArr;
            let preIndex;
            let preItemHexId;
            let fileItemList;
            let photoItemList;
            let targets;

            try {
              if (toggle === "off") {

                targetArea.style.minHeight = String(minTotalHeight) + ea;
                targetArea.style.height = String(1) + ea;
                setQueue(() => {
                  targetArea.style.height = "auto";
                }, 1001);
                this.setAttribute("toggle", "on");

                if (load === "false") {
                  itemList = await ajaxJson({ target: desid + "/" + proid }, BRIDGEHOST + "/middlePhotoRead", { equal: true });
                  preItemList = await ajaxJson({ cliid }, BRIDGEHOST + "/clientPhoto", { equal: true });

                  linkTargets = itemList.filter((str) => { return linkTargetKey.includes(str.split("_")[0]) });
                  linkContents = await ajaxJson({ links: linkTargets.map((file) => { return { desid, proid, file } }) }, BRIDGEHOST + "/middleLinkParsing", { equal: true });

                  tempArr = [];
                  preIndex = 1;
                  for (let original of preItemList.sitePhoto) {
                    preItemHexId = ((new RegExp("^" + hashConst + "_", "g")).test(original.split("/")[original.split("/").length - 1]) ? original.split("/")[original.split("/").length - 1].split("_")[1] : preItemHex);
                    tempArr.push({
                      fileName: [
                        preItemMotherKey,
                        String(timeline.valueOf()),
                        String(preIndex),
                        preItemHexId + "." + original.split(".")[original.split(".").length - 1],
                      ].join("_"),
                      original,
                    });
                    preIndex++;
                  }
                  itemList = tempArr.concat(itemList);

                  indexTong = {};
                  fileItemList = [];
                  photoItemList = [];
                  itemList.forEach((raw) => {
                    let originalRoot;
                    if (typeof raw !== "string") {
                      originalRoot = raw.original;
                      raw = raw.fileName;
                    } else {
                      originalRoot = targetHref + "/" + raw;
                    }
                    const [ key, timeString, orderString, hex ] = raw.split("_");
                    const [ hexString, exe ] = hex.split(".");
                    const mother = findByAttribute(targetArea.querySelectorAll('.' + panClassName), "key", key);
                    const date = dateToString(new Date(Number(timeString)));

                    id = key + "_" + timeString + "_" + String(orderString) + "_" + hexString;

                    if (indexTong[key] === undefined) {
                      indexTong[key] = 0;
                    } else {
                      indexTong[key] = indexTong[key] + 1;
                    }

                    if (typeObj[key] === "file") {

                      createNode({
                        mother,
                        attribute: {
                          src: originalRoot,
                          link: originalRoot
                        },
                        event: {
                          click: function (e) {
                            const link = this.getAttribute("link");
                            blankHref(link);
                          }
                        },
                        style: {
                          display: "inline-flex",
                          position: "relative",
                          width: "calc(calc(100% - " + String(blockBetween * (divideNumber - 1)) + ea + ") / " + String(divideNumber) + ")",
                          height: String(blockHeight2) + ea,
                          marginRight: String((indexTong[key] % divideNumber === (divideNumber - 1)) ? 0 : blockBetween) + ea,
                          marginBottom: String(blockBetween) + ea,
                          background: colorChip.white,
                          borderRadius: String(5) + "px",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          cursor: "pointer",
                        },
                        child: {
                          id,
                          attribute: {
                            exe,
                            date: date.split("-").slice(1).join("/"),
                          },
                          text: (date + "_" + orderString + "." + exe),
                          style: {
                            fontSize: String(blockSize) + ea,
                            fontWeight: String(blockWeight),
                            color: colorChip.black,
                            position: "relative",
                            top: String(isMac() ? -1 : 1) + ea,
                          }
                        }
                      });
                      fileItemList.push({
                        hash: hexString,
                        target: id
                      });

                    } else if (typeObj[key] === "photo") {

                      createNode({
                        mother: [ ...mother.children ][indexTong[key] % photoDivideNumber],
                        style: {
                          display: "block",
                          position: "relative",
                          width: withOut(0, ea),
                          marginBottom: String(blockBetween) + ea,
                          cursor: "pointer",
                        },
                        children: [
                          {
                            mode: "img",
                            attribute: {
                              src: originalRoot,
                              link: originalRoot
                            },
                            event: {
                              click: function (e) {
                                const link = this.getAttribute("link");
                                blankHref(link);
                              }
                            },
                            style: {
                              display: "block",
                              position: "relative",
                              width: withOut(0),
                              borderTopLeftRadius: String(5) + "px",
                              borderTopRightRadius: String(5) + "px",
                            }
                          },
                          {
                            id,
                            attribute: {
                              height: String(blockHeight2) + ea,
                              date: date.split("-").slice(1).join("/"),
                            },
                            style: {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: withOut(0, ea),
                              height: String(0),
                              borderBottomLeftRadius: String(5) + "px",
                              borderBottomRightRadius: String(5) + "px",
                              background: desktop ? colorChip.white : colorChip.gray0,
                              textAlign: "center",
                              overflow: "hidden",
                              boxShadow: "0px 1px 8px -6px " + colorChip.shadow,
                              transition: "all 0.3s ease",
                            },
                            child: {
                              text: "",
                              style: {
                                display: "inline-block",
                                position: "relative",
                                top: String(isMac() ? -1 : 1) + ea,
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.black,
                              },
                              bold: {
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.deactive,
                              }
                            }
                          }
                        ]
                      });
                      photoItemList.push({
                        hash: hexString,
                        target: id
                      });

                    } else if (typeObj[key] === "link") {

                      ({ link, memo } = linkContents.find(({ file }) => { return file === raw }))
                      id = raw.replace(/[\_\-\.]/gi, '');

                      createNode({
                        mother,
                        attribute: {
                          link,
                        },
                        event: {
                          click: function (e) {
                            const link = this.getAttribute("link");
                            blankHref(link);
                          }
                        },
                        style: {
                          display: "inline-flex",
                          position: "relative",
                          width: "calc(calc(100% - " + String(blockBetween * (divideNumber - 1)) + ea + ") / " + String(divideNumber) + ")",
                          marginRight: String((indexTong[key] % divideNumber === (divideNumber - 1)) ? 0 : blockBetween) + ea,
                          marginBottom: String(blockBetween) + ea,
                          flexDirection: "column",
                          textAlign: "center",
                          cursor: "pointer",
                        },
                        children: [
                          {
                            id,
                            style: {
                              display: "block",
                              position: "relative",
                              width: withOut(0, ea),
                              height: String(linkImageHeight) + ea,
                              background: colorChip.white,
                              borderTopLeftRadius: String(5) + "px",
                              borderTopRightRadius: String(5) + "px",
                              backgroundPosition: "50% 50%",
                              backgroundSize: "100% auto",
                              backgroundRepeat: "no-repeat",
                            }
                          },
                          {
                            style: {
                              display: "flex",
                              position: "relative",
                              width: withOut(0, ea),
                              height: String(blockHeight2) + ea,
                              background: colorChip.white,
                              borderBottomLeftRadius: String(5) + "px",
                              borderBottomRightRadius: String(5) + "px",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              textAlign: "center",
                            },
                            child: {
                              text: memo + " <b%(" + date.split("-").slice(1).join("/") + ")%b>",
                              style: {
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.black,
                                position: "relative",
                                top: String(isMac() ? -1 : 1) + ea,
                              },
                              bold: {
                                fontSize: String(blockSize) + ea,
                                fontWeight: String(blockWeight),
                                color: colorChip.deactive,
                              }
                            }
                          }
                        ]
                      });

                      ajaxJson({ mode: "image", url: window.encodeURIComponent(link), target: id }, "/getOpenGraph").then(({ image, target }) => {
                        target = targetArea.querySelector('#' + target);
                        target.style.backgroundImage = "url('" + image + "')";
                      }).catch((err) => {
                        console.log(err);
                      });

                    }
                  });

                  targetArea.setAttribute("load", "true");

                  targets = await ajaxJson({ mode: "decrypto", targets: fileItemList }, BACKHOST + "/homeliaisonCrypto", { equal: true });
                  for (let { string, target } of targets) {
                    target = targetArea.querySelector('#' + target);
                    if (string.trim() !== "") {
                      target.textContent = "";
                      target.insertAdjacentHTML("beforeend", string + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(blockWeight) + "\">(" + target.getAttribute("date") + ")</b>");
                    }
                  }

                  targets = await ajaxJson({ mode: "decrypto", targets: photoItemList }, BACKHOST + "/homeliaisonCrypto", { equal: true });
                  for (let { string, target } of targets) {
                    target = targetArea.querySelector('#' + target);
                    target.style.height = target.getAttribute("height");
                    target.firstChild.textContent = "";
                    if (!instance.isEmptyString(string)) {
                      target.firstChild.insertAdjacentHTML("beforeend", string + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(blockWeight) + "\">(" + target.getAttribute("date") + ")</b>");
                    } else {
                      target.firstChild.insertAdjacentHTML("beforeend", "- " + " <b style=\"color: " + colorChip.deactive + ";font-weight: " + String(blockWeight) + "\">(" + target.getAttribute("date") + ")</b>");
                    }
                  }

                }

              } else {

                targetArea.style.minHeight = String(0) + ea;
                targetArea.style.height = String(0) + ea;
                this.setAttribute("toggle", "off");

              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          height: String(blockHeight) + ea,
          width: withOut(0, ea),
          borderRadius: String(5) + "px",
          background: state >= 3 ? colorChip.gray4 : (state === 2 ? colorChip.gray2 : colorChip.gray0),
          alignItems: "center",
          cursor: "pointer",
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(statusWidth) + ea,
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
        child: {
          text: project.process.status,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(basicSize) + ea,
            fontWeight: String(600),
            color: state === 0 ? colorChip.black : colorChip.deactive,
          },
          next: {
            style: {
              position: "absolute",
              right: String(0),
              top: String(lineTop) + ea,
              height: withOut(lineTop * 2, ea),
              borderRight: "1px solid " + colorChip.gray4,
            }
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          marginLeft: String(basicMarginLeft) + ea,
        },
        child: {
          text: project.name,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(basicSize) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          marginLeft: String(smallMarginLeft) + ea,
        },
        child: {
          text: project.proid,
          style: {
            display: "inline-block",
            position: "relative",
            top: String(smallTextTop) + ea,
            fontSize: String(smallSize) + ea,
            fontWeight: String(300),
            color: colorChip.deactive,
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "relative",
          height: withOut(0, ea),
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "left",
          marginLeft: String(basicMarginLeft) + ea,
        },
        child: {
          text: "문의 : " + dateToString(project.timeline).slice(2) + "&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;" + dateToString(project.process.contract.form.date.from).slice(2) + " ~ " + dateToString(project.process.contract.form.date.to).slice(2),
          style: {
            display: "inline-block",
            position: "relative",
            top: String(textTop) + ea,
            fontSize: String(basicSize) + ea,
            fontWeight: String(300),
            color: colorChip.deactive,
          }
        }
      });
      createNode({
        mother: projectTong,
        style: {
          display: "inline-flex",
          position: "absolute",
          width: String(moreWidth) + ea,
          height: withOut(0, ea),
          right: String(0),
          background: "transparent",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          cursor: "pointer",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.darkShadow,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.darkShadow,
              marginLeft: String(circleWidth / 2) + ea,
              marginRight: String(circleWidth / 2) + ea,
            }
          },
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(circleWidth) + ea,
              height: String(circleWidth) + ea,
              borderRadius: String(circleWidth) + ea,
              background: colorChip.darkShadow,
            }
          },
        ]
      });
      this.projectBlocks.push(projectTong);

      // detail area
      projectDetailTong = createNode({
        mother: thisMother,
        attribute: {
          proid: project.proid,
          load: "false",
        },
        display: "flex",
        minHeight: String(0) + ea,
        height: String(0),
        width: withOut(0, ea),
        borderRadius: String(5) + "px",
        background: colorChip.gray4,
        marginBottom: String(blockMargin) + ea,
        transition: "all 1s ease",
        overflow: "hidden",
        flexDirection: "column",
      });
      this.projectAreas.push(projectDetailTong);

      typeObj = {};
      for (let x = 0; x < checklist.length; x++) {
        for (let y = 0; y < checklist[x].children.length; y++) {

          type = checklist[x].children[y].type;
          key = checklist[x].children[y].key;
          title = checklist[x].children[y].title;
          action = checklist[x].children[y].action;
          typeObj[key] = type;

          panContents = createNode({
            mother: projectDetailTong,
            style: {
              display: "block",
              position: "relative",
              marginLeft: String(innerMargin) + ea,
              width: withOut((innerMargin * 2) + (panPaddingLeft * 2), ea),
              borderRadius: String(5) + "px",
              background: colorChip.gray1,
              paddingTop: String(panPaddingTop) + ea,
              paddingLeft: String(panPaddingLeft) + ea,
              paddingRight: String(panPaddingLeft) + ea,
              paddingBottom: String(panPaddingTop) + ea,
              marginTop: (x === 0 && y === 0 ? String(innerMargin) + ea : ""),
              marginBottom: (x === checklist.length - 1 && y === checklist[x].children.length - 1 ? String(innerMargin) + ea : String(panBetween) + ea),
            },
            child: {
              set: "flex",
              style: {
                width: withOut(0, ea),
                flexDirection: "row",
              },
              child: {
                text: title,
                style: {
                  display: "inline-block",
                  position: "relative",
                  fontSize: String(panTitleSize) + ea,
                  fontWeight: String(panTitleWeight),
                  color: colorChip.black,
                  paddingBottom: String(panTitleBottom) + ea,
                  borderBottom: "1px solid " + colorChip.deactive,
                },
                next: {
                  attribute: {
                    key,
                    title,
                    desid: designer.desid,
                    designer: designer.designer,
                    proid: project.proid,
                    name: project.name,
                    phone: designer.information.phone,
                  },
                  event: {
                    click: async function (e) {
                      try {
                        const key = this.getAttribute("key");
                        const title = this.getAttribute("title");
                        const desid = this.getAttribute("desid");
                        const designer = this.getAttribute("designer");
                        const proid = this.getAttribute("proid");
                        const name = this.getAttribute("name");
                        const phone = this.getAttribute("phone");
                        const host = FRONTHOST.replace(/^https\:\/\//gi, '');
                        const path = "process";

                        if (window.confirm(designer + "실장님께 알림톡을 보낼까요?")) {
                          await ajaxJson({
                            method: "pushDesignerFile",
                            name: designer,
                            phone: phone,
                            option: {
                              designer: designer,
                              client: name,
                              file: title,
                              host: host,
                              path: path,
                              proid: proid,
                            }
                          }, BACKHOST + "/alimTalk");
                          window.alert(designer + " 실장님에게 알림톡을 전송하였습니다!");
                        }

                      } catch (e) {
                        console.log(e);
                      }
                    }
                  },
                  style: {
                    display: "inline-flex",
                    position: "absolute",
                    right: String(0),
                    top: String(subButtonTop) + ea,
                    height: String(subButtonHeight) + ea,
                    background: colorChip.black,
                    borderRadius: String(5) + "px",
                    cursor: "pointer",
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  child: {
                    text: "디자이너에게 " + title + " 업로드 알림톡",
                    style: {
                      display: "inline-block",
                      position: "relative",
                      top: String(isMac() ? -1 : 1) + ea,
                      fontSize: String(subButtonSize) + ea,
                      fontWeight: String(subButtonWeight),
                      color: colorChip.white,
                      paddingLeft: String(subButtonTextPadding) + ea,
                      paddingRight: String(subButtonTextPadding) + ea,
                    }
                  }
                }
              },
              next: {
                attribute: {
                  key,
                },
                class: [ panClassName ],
                style: {
                  display: "block",
                  paddingTop: String(panContentsPaddingTop) + ea,
                  position: "relative",
                  width: withOut(0, ea),
                  minHeight: String(panContentsMinHeight) + ea,
                }
              }
            }
          });
          if (type === "photo") {
            for (let z = 0; z < photoDivideNumber; z++) {
              createNode({
                mother: panContents.querySelector('.' + panClassName),
                style: {
                  display: "inline-block",
                  position: "relative",
                  verticalAlign: "top",
                  width: "calc(calc(100% - " + String(blockBetween * (photoDivideNumber - 1)) + ea + ") / " + String(photoDivideNumber) + ")",
                  marginRight: String((z === (photoDivideNumber - 1)) ? 0 : blockBetween) + ea,
                }
              });
            }
          }


        }
      }

    }

    if (typeof returnGet().proid === "string") {
      targetProjectBlock = findByAttribute(this.projectBlocks, "proid", returnGet().proid);
      if (targetProjectBlock !== null) {
        scrollTo(totalMother, targetProjectBlock);
        targetProjectBlock.click();
      }
    }

    // dev
    // await instance.checkListPaperView(desid, base, projects, clients, checklist);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.checkListPaperView = async function (desid, base, projects, clients, checklist) {
  const instance = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut, isMac, dateToString, stringToDate, findByAttribute, setQueue, uniqueValue, sleep, blankHref, scrollTo, returnGet } = GeneralJs;
  const { totalMother, ea, grayBarWidth } = this;
  const mobile = this.media[4];
  const desktop = !mobile;
  try {
    let thisMother;
    let motherMargin;
    let designer;
    let baseTong;
    let blockHeight;
    let blockMargin;
    let basicSize;
    let textTop;
    let smallSize;
    let smallTextTop;
    let lineTop;
    let statusWidth;
    let basicMarginLeft;
    let smallMarginLeft;
    let typeObj;
    let type;
    let key;
    let title;
    let action;
    let panContents;
    let circleWidth;
    let moreWidth;

    motherMargin = 34;
    blockHeight = 52;
    blockMargin = 4;

    basicSize = 16;
    textTop = (isMac() ? -1 : 1);
    smallSize = 12;
    smallTextTop = (isMac() ? 1 : 3);

    lineTop = 18;
    statusWidth = 100;

    basicMarginLeft = 36;
    smallMarginLeft = 6;

    circleWidth = 6;
    moreWidth = 90;

    designer = this.designers.pick(desid);
    baseTong = base.firstChild;

    thisMother = createNode({
      mother: baseTong,
      style: {
        display: "block",
        position: "relative",
        width: String(100) + '%',
        borderTop: "1px solid " + colorChip.gray4,
        paddingTop: String(motherMargin) + ea,
        paddingBottom: String(motherMargin) + ea,
      },
      child: {
        style: {
          display: "block",
          position: "relative",
          marginLeft: String(motherMargin) + ea,
          marginRight: String(motherMargin) + ea,
          width: withOut(motherMargin * 2, ea),
        }
      }
    }).firstChild;


    typeObj = {};
    for (let x = 0; x < checklist.length; x++) {
      for (let y = 0; y < checklist[x].children.length; y++) {

        type = checklist[x].children[y].type;
        key = checklist[x].children[y].key;
        title = checklist[x].children[y].title;
        action = checklist[x].children[y].action;
        typeObj[key] = type;

        panContents = createNode({
          mother: thisMother,
          style: {
            display: "flex",
            flexDirection: "row",
            position: "relative",
            height: String(blockHeight) + ea,
            width: withOut(0, ea),
            borderRadius: String(5) + "px",
            background: type === "photo" ? colorChip.gray2 : colorChip.gray0,
            marginBottom: String(blockMargin) + ea,
            alignItems: "center",
            cursor: "pointer",
          },
        });
        createNode({
          mother: panContents,
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(statusWidth) + ea,
            height: withOut(0, ea),
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          },
          child: {
            text: String(x + 1) + " - " + String(y + 1),
            style: {
              display: "inline-block",
              position: "relative",
              top: String(textTop) + ea,
              fontSize: String(basicSize) + ea,
              fontWeight: String(600),
              color: colorChip.deactive,
            },
            next: {
              style: {
                position: "absolute",
                right: String(0),
                top: String(lineTop) + ea,
                height: withOut(lineTop * 2, ea),
                borderRight: "1px solid " + colorChip.gray4,
              }
            }
          }
        });
        createNode({
          mother: panContents,
          style: {
            display: "inline-flex",
            position: "relative",
            height: withOut(0, ea),
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "left",
            marginLeft: String(basicMarginLeft) + ea,
          },
          child: {
            text: title,
            style: {
              display: "inline-block",
              position: "relative",
              top: String(textTop) + ea,
              fontSize: String(basicSize) + ea,
              fontWeight: String(500),
              color: colorChip.black,
            }
          }
        });
        createNode({
          mother: panContents,
          style: {
            display: "inline-flex",
            position: "relative",
            height: withOut(0, ea),
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "left",
            marginLeft: String(smallMarginLeft) + ea,
          },
          child: {
            text: (type === "photo" ? "사진" : (type === "file" ? "파일" : "링크")),
            style: {
              display: "inline-block",
              position: "relative",
              top: String(smallTextTop) + ea,
              fontSize: String(smallSize) + ea,
              fontWeight: String(300),
              color: colorChip.deactive,
            }
          }
        });
        createNode({
          mother: panContents,
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(moreWidth) + ea,
            height: withOut(0, ea),
            right: String(0),
            background: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
          },
          children: [
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: String(circleWidth) + ea,
                height: String(circleWidth) + ea,
                borderRadius: String(circleWidth) + ea,
                background: colorChip.darkShadow,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: String(circleWidth) + ea,
                height: String(circleWidth) + ea,
                borderRadius: String(circleWidth) + ea,
                background: colorChip.darkShadow,
                marginLeft: String(circleWidth / 2) + ea,
                marginRight: String(circleWidth / 2) + ea,
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: String(circleWidth) + ea,
                height: String(circleWidth) + ea,
                borderRadius: String(circleWidth) + ea,
                background: colorChip.darkShadow,
              }
            },
          ]
        });

      }
    }

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.checkListDesignerMemo = function (desid) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight, media } = this;
  const { createNode, createNodes, ajaxJson, colorChip, withOut } = GeneralJs;
  const baseTong = this.mainBaseTong;
  const designer = this.designers.pick(desid);
  const mobile = media[4];
  const desktop = !mobile;
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
        let mobileBottom, mobileHeight;

        margin = <%% 40, 40, 40, 40, 7 %%>;
        innerMargin = <%% 15, 15, 15, 15, 4 %%>;
        titleHeight = <%% 28, 28, 28, 28, 6.4 %%>;
        size = <%% 16, 16, 16, 16, 4 %%>;

        mobileBottom = 16;
        mobileHeight = 56;

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
            width: desktop ? "calc(calc(calc(100% - " + String(grayBarWidth) + ea + ") / 3) - " + String(margin) + ea + ")" : "calc(100% - " + String(margin * 2) + ea + ")",
            height: desktop ? "calc(calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 3) * 1.5) - " + String(margin) + ea + ")" : String(mobileHeight) + ea,
            bottom: String(desktop ? belowHeight + margin : mobileBottom + margin) + ea,
            right: String(margin) + ea,
            borderRadius: String(3) + "px",
            boxShadow: "0px 5px 18px -9px " + colorChip.shadow,
            animation: "fadeup 0.3s ease forwards",
            background: colorChip.gradientGreen2,
            zIndex: String(3),
          }
        });

        nodeArr = createNodes([
          {
            mother: memoTong,
            text: designer.designer + " 디자이너 상세 경력",
            style: {
              position: "absolute",
              top: String(innerMargin - (desktop ? 1 : 1.2)) + ea,
              left: String(innerMargin + (desktop ? 1 : 0.1)) + ea,
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
            }
          },
          {
            mother: -1,
            mode: "textarea",
            events: [
              {
                type: "blur",
                event: function (e) {
                  GeneralJs.ajaxPromise({
                    method: "designer",
                    id: desid,
                    column: "career",
                    value: this.value,
                    email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                  }, "/updateHistory").catch((err) => { console.log(err); });
                }
              },
              {
                type: "keypress",
                event: function (e) {
                  if (e.key === "Enter") {
                    GeneralJs.ajaxPromise({
                      method: "designer",
                      id: desid,
                      column: "career",
                      value: this.value,
                      email: JSON.parse(window.localStorage.getItem("GoogleClientProfile")).homeliaisonConsoleLoginedEmail
                    }, "/updateHistory").catch((err) => { console.log(err); });
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
              fontSize: String(size - (desktop ? 1 : 0.2)) + ea,
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
      display: GeneralJs.returnGet().dataonly === "true" ? "none" : "block",
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
        display: "block",
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
        display: "block",
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
        display: "block",
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
        display: "block",
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
        display: "block",
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
      instance.checkListDetailLaunching(previousDesid);
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
      instance.checkListDetailLaunching(nextDesid);
    } else {
      instance.reportDetailLaunching(nextDesid);
    }
  });

  rInitialIcon.addEventListener("click", function (e) {
    instance.reportDetailLaunching(desid);
  });

  mInitialIcon.addEventListener("click", async function (e) {
    try {
      await instance.checklistMemoSystem(desid);
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
          page: "checklist",
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
            targetDom.textContent = "";
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

DesignerJs.prototype.checkListDetailSearchBox = function () {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight, searchCondition } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const className = "searchConditionBack";
  return function (e) {
    e.stopPropagation();
    e.preventDefault();
    if (document.querySelector('.' + className) === null) {
      let cancelBox, whiteBox, scrollBox, scrollBase;
      let margin, innerMargin;
      let paddingTop, paddingBottom;

      innerMargin = 48;
      margin = 100;
      paddingTop = 63;
      paddingBottom = 160;

      cancelBox = createNode({
        mother: totalMother,
        class: [ className ],
        style: {
          position: "fixed",
          top: String(0),
          left: String(grayBarWidth) + ea,
          width: withOut(grayBarWidth, ea),
          height: withOut(belowHeight, ea),
          background: colorChip.black,
          animation: "justfadein 0.3s ease forwards",
          zIndex: String(2),
          cursor: "pointer",
        },
        events: [
          {
            type: [ "click", "contextmenu" ],
            event: function (e) {
              e.preventDefault();
              e.stopPropagation();
              instance.checkListDetailSearchParsing();
              totalMother.removeChild(totalMother.lastChild);
              totalMother.removeChild(totalMother.lastChild);
            }
          }
        ]
      });
      whiteBox = createNode({
        mother: totalMother,
        style: {
          position: "fixed",
          top: String(margin) + ea,
          left: String(grayBarWidth + margin) + ea,
          width: withOut(grayBarWidth + (margin * 2), ea),
          height: withOut(belowHeight + (margin * 2), ea),
          background: colorChip.white,
          borderRadius: String(5) + "px",
          boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
          animation: "fadeup 0.3s ease forwards",
          zIndex: String(2),
        }
      });
      scrollBox = createNode({
        mother: whiteBox,
        style: {
          position: "absolute",
          top: String(innerMargin) + ea,
          left: String(innerMargin) + ea,
          width: withOut(innerMargin * 2, ea),
          height: withOut(innerMargin, ea),
          overflow: "scroll",
        }
      });
      scrollBase = createNode({
        mother: scrollBox,
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          width: String(100) + '%',
          paddingTop: String(paddingTop) + ea,
          paddingBottom: String(paddingBottom) + ea,
        }
      });
      instance.checkListDetailSearchContents(scrollBase);
    }
  }
}

DesignerJs.prototype.checkListDetailSearchContents = function (mother) {
  const instance = this;
  const { totalMother, ea, grayBarWidth, belowHeight, searchCondition } = this;
  const { createNode, createNodes, colorChip, withOut, isMac } = GeneralJs;
  const innerMargin = Number(mother.parentNode.style.top.replace(/[^0-9\-\.]/gi, ''));
  const checkListData = this.checkListData();
  const designer = this.designers[this.designers.length - 1];
  const token = "_";
  let domTong;
  let titleSize, size;
  let titleHeight;
  let block, title, contents;
  let titleWidth;
  let tempResult;
  let factorWidth, factorHeight;
  let radius;
  let circleMargin, circleVisual;
  let obj;
  let modeTop, modeRight;
  let modeWidth, modeMargin;
  let modeCircleTop;

  titleSize = 25;
  titleHeight = 48;
  size = 15;
  titleWidth = 160;
  factorWidth = 172;
  factorHeight = 30;
  radius = 3;
  circleMargin = 6;
  circleVisual = 1.5;
  modeTop = isMac() ? 15 : 17;
  modeRight = 62;
  modeWidth = 36.34;
  modeMargin = 5;
  modeCircleTop = isMac() ? 7 : 5;

  createNode({
    mother,
    style: {
      position: "fixed",
      width: withOut(100, innerMargin * 2, ea),
      height: String(titleHeight) + ea,
      background: colorChip.white,
      top: String(innerMargin * (5 / 6)) + ea,
      left: String(innerMargin) + ea,
      zIndex: String(1),
      borderBottom: "1px solid " + colorChip.gray2,
    },
    children: [
      {
        text: "디자이너 조건 검색",
        style: {
          position: "absolute",
          top: String(isMac() ? 0 : 3) + ea,
          left: String(-1) + ea,
          fontSize: String(titleSize) + ea,
          fontWeight: String(500),
          color: colorChip.black
        }
      },
      {
        style: {
          position: "absolute",
          top: String(modeTop + modeCircleTop) + ea,
          right: String((modeRight * 2) + modeWidth + modeMargin) + ea,
          background: colorChip.black,
          width: String((radius - 1) * 2) + ea,
          height: String((radius - 1) * 2) + ea,
          borderRadius: String((radius - 1) * 2) + ea,
        }
      },
      {
        text: "초기화",
        class: [ "hoverDefault_lite" ],
        style: {
          position: "absolute",
          top: String(modeTop) + ea,
          right: String(modeRight * 2) + ea,
          fontSize: String(size - 1) + ea,
          fontWeight: String(500),
          color: colorChip.black,
        },
        events: [
          {
            type: "click",
            event: function (e) {
              let targetTongs;
              let children;
              targetTongs = [];
              for (let b of searchCondition.blocks) {
                children = b.querySelectorAll(".hoverDefault_lite");
                for (let c of children) {
                  targetTongs.push(c);
                }
              }
              for (let dom of targetTongs) {
                dom.setAttribute("toggle", "off");
                dom.firstChild.style.background = colorChip.gray2;
                dom.lastChild.style.color = colorChip.black;
              }
              searchCondition.conditions = [];
            }
          }
        ]
      },
      {
        style: {
          position: "absolute",
          top: String(modeTop + modeCircleTop) + ea,
          right: String(modeRight + modeWidth + modeMargin) + ea,
          background: searchCondition.mode === "and" ? colorChip.green : colorChip.deactive,
          width: String((radius - 1) * 2) + ea,
          height: String((radius - 1) * 2) + ea,
          borderRadius: String((radius - 1) * 2) + ea,
        }
      },
      {
        text: "교집합",
        class: [ "hoverDefault_lite" ],
        style: {
          position: "absolute",
          top: String(modeTop) + ea,
          right: String(modeRight) + ea,
          fontSize: String(size - 1) + ea,
          fontWeight: String(500),
          color: searchCondition.mode === "and" ? colorChip.green : colorChip.deactive,
        },
        events: [
          {
            type: "click",
            event: function (e) {
              if (searchCondition.mode === "and") {
                searchCondition.mode = "or";
                this.style.color = colorChip.deactive;
                this.parentNode.children[this.parentNode.children.length - 4].style.background = colorChip.deactive;
                this.parentNode.children[this.parentNode.children.length - 2].style.background = colorChip.green;
                this.parentNode.children[this.parentNode.children.length - 1].style.color = colorChip.green;
              } else {
                searchCondition.mode = "and";
                this.style.color = colorChip.green;
                this.parentNode.children[this.parentNode.children.length - 4].style.background = colorChip.green;
                this.parentNode.children[this.parentNode.children.length - 2].style.background = colorChip.deactive;
                this.parentNode.children[this.parentNode.children.length - 1].style.color = colorChip.deactive;
              }
            }
          }
        ]
      },
      {
        style: {
          position: "absolute",
          top: String(modeTop + modeCircleTop) + ea,
          right: String(0 + modeWidth + modeMargin) + ea,
          background: searchCondition.mode === "and" ? colorChip.deactive : colorChip.green,
          width: String((radius - 1) * 2) + ea,
          height: String((radius - 1) * 2) + ea,
          borderRadius: String((radius - 1) * 2) + ea,
        }
      },
      {
        text: "합집합",
        class: [ "hoverDefault_lite" ],
        style: {
          position: "absolute",
          top: String(modeTop) + ea,
          right: String(0) + ea,
          fontSize: String(size - 1) + ea,
          fontWeight: String(500),
          color: searchCondition.mode === "and" ? colorChip.deactive : colorChip.green,
        },
        events: [
          {
            type: "click",
            event: function (e) {
              if (searchCondition.mode === "and") {
                searchCondition.mode = "or";
                this.style.color = colorChip.green;
                this.parentNode.children[this.parentNode.children.length - 2].style.background = colorChip.green;
                this.parentNode.children[this.parentNode.children.length - 4].style.background = colorChip.deactive;
                this.parentNode.children[this.parentNode.children.length - 3].style.color = colorChip.deactive;
              } else {
                searchCondition.mode = "and";
                this.style.color = colorChip.deactive;
                this.parentNode.children[this.parentNode.children.length - 2].style.background = colorChip.deactive;
                this.parentNode.children[this.parentNode.children.length - 4].style.background = colorChip.green;
                this.parentNode.children[this.parentNode.children.length - 3].style.color = colorChip.green;
              }
            }
          }
        ]
      },
    ]
  });

  domTong = [];
  for (let i = 0; i < checkListData.length; i++) {
    for (let j = 0; j < checkListData[i].children.length; j++) {
      obj = checkListData[i].children[j];
      if (obj.type === "matrix" || typeof obj.search === "function") {

        block = createNode({
          mother,
          style: {
            position: "relative",
            display: "block",
            width: String(100) + '%',
            height: "auto",
            fontSize: String(size) + ea,
          },
          children: [
            {
              style: {
                position: "absolute",
                width: String(titleWidth) + ea,
                height: String(100) + '%',
                fontSize: "inherit",
              }
            },
            {
              style: {
                position: "relative",
                display: "block",
                left: String(titleWidth) + ea,
                width: withOut(titleWidth, ea),
                fontSize: "inherit",
              }
            }
          ]
        });

        title = block.firstChild;
        contents = block.lastChild;

        createNode({
          mother: title,
          style: {
            position: "relative",
            display: "inline-block",
            width: String(factorWidth) + ea,
            height: String(factorHeight) + ea,
            fontSize: "inherit",
          },
          children: [
            {
              text: obj.name,
              style: {
                position: "absolute",
                top: String(isMac() ? 0 : 1) + ea,
                left: String(0) + ea,
                fontSize: "inherit",
                fontWeight: String(600),
              }
            }
          ]
        });

        if (obj.type === "matrix") {
          tempResult = obj.value(designer);
        } else {
          tempResult = obj.search(designer);
        }
        for (let k = 0; k < tempResult.contents.length; k++) {
          createNode({
            mother: contents,
            class: [ "hoverDefault_lite" ],
            attribute: [
              { toggle: (searchCondition.conditions.includes(String(i) + token + String(j) + token + String(k)) ? "on" : "off") },
              { x: String(i) },
              { y: String(j) },
              { z: String(k) },
            ],
            events: [
              {
                type: [ "click", "contextmenu" ],
                event: function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                  const x = Number(this.getAttribute('x'));
                  const y = Number(this.getAttribute('y'));
                  const z = Number(this.getAttribute('z'));
                  const toggle = this.getAttribute("toggle");
                  const value = ([ String(x), String(y), String(z) ]).join(token);
                  let tempArr, targetIndex;
                  if (toggle === "off") {
                    searchCondition.conditions.push(value);
                    this.lastChild.style.color = colorChip.green;
                    this.firstChild.style.background = colorChip.green;
                    this.setAttribute("toggle", "on");
                  } else {
                    for (let i = 0; i < searchCondition.conditions.length; i++) {
                      tempArr = searchCondition.conditions[i].split(token);
                      if (tempArr.length !== 3) {
                        throw new Error("invaild value");
                      }
                      if (Number(tempArr[0]) === x && Number(tempArr[1]) === y && Number(tempArr[2]) === z) {
                        targetIndex = i;
                        break;
                      }
                    }
                    searchCondition.conditions.splice(targetIndex, 1);
                    this.lastChild.style.color = colorChip.black;
                    this.firstChild.style.background = colorChip.gray2;
                    this.setAttribute("toggle", "off");
                  }
                }
              }
            ],
            style: {
              position: "relative",
              display: "inline-block",
              width: String(factorWidth) + ea,
              height: String(factorHeight) + ea,
              fontSize: "inherit",
              fontWeight: String(300),
            },
            children: [
              {
                style: {
                  position: "absolute",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  top: String((size / 2) - radius + circleVisual) + ea,
                  left: String(0),
                  width: String(radius * 2) + ea,
                  height: String(radius * 2) + ea,
                  borderRadius: String(radius * 2) + ea,
                  background: searchCondition.conditions.includes(String(i) + token + String(j) + token + String(k)) ? colorChip.green : colorChip.gray2,
                }
              },
              {
                text: tempResult.contents[k],
                style: {
                  position: "absolute",
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: searchCondition.conditions.includes(String(i) + token + String(j) + token + String(k)) ? colorChip.green : colorChip.black,
                  top: String(isMac() ? 0 : 1) + ea,
                  left: String((radius * 2) + circleMargin) + ea,
                  width: withOut((radius * 2) + circleMargin, ea),
                  height: String(100) + '%',
                },
              },
            ]
          });
        }

        domTong.push(block);
      }
    }
  }
  searchCondition.blocks = domTong;

  createNode({
    mother,
    style: {
      position: "fixed",
      width: withOut(100, innerMargin * 2, ea),
      height: String(titleHeight) + ea,
      background: colorChip.white,
      bottom: String(0) + ea,
      left: String(innerMargin) + ea,
      zIndex: String(1),
      borderTop: "1px solid " + colorChip.gray2,
    },
  });

}

DesignerJs.prototype.checkListDetailSearchParsing = function () {
  const instance = this;
  const { searchCondition, standardDoms, designers } = this;
  const { createNode, createNodes, colorChip, withOut } = GeneralJs;
  const checkListData = this.checkListData();
  const token = "_";
  let tempArr, tempObj;
  let x, y, z;
  let desidArr, desidArr2;
  let blocks;

  Set.prototype.union = function (setB) {
    let union = new Set(this);
    for (let elem of setB) {
      union.add(elem);
    }
    return union;
  }

  Set.prototype.intersection = function (setB) {
    let intersection = new Set();
    for (let elem of setB) {
      if (this.has(elem)) {
        intersection.add(elem);
      }
    }
    return intersection;
  }

  class SetArray extends Array {
    union() {
      let finalSet;
      finalSet = new Set([]);
      for (let set of this) {
        finalSet = finalSet.union(set);
      }
      return Array.from(finalSet);
    }
    intersection() {
      let finalSet;
      if (this.length === 0) {
        return [];
      } else {
        finalSet = this[0];
        if (this.length > 1) {
          for (let i = 1; i < this.length; i++) {
            finalSet = finalSet.intersection(this[i]);
          }
          return Array.from(finalSet);
        } else {
          return Array.from(finalSet);
        }
      }
    }
  }

  if (searchCondition.conditions.length === 0) {
    desidArr = [];
    for (let { desid } of designers) {
      desidArr.push(desid);
    }
  } else {
    desidArr = new SetArray();
    for (let order of searchCondition.conditions) {
      tempArr = order.split(token);
      if (tempArr.length !== 3) {
        throw new Error("invaild order");
      }
      x = Number(tempArr[0]);
      y = Number(tempArr[1]);
      z = Number(tempArr[2]);

      desidArr2 = [];
      for (let designer of designers) {
        if (checkListData[x].children[y].type === "matrix") {
          tempObj = checkListData[x].children[y].value(designer);
          tempObj.result = (tempObj.value[z] === 1);
        } else {
          tempObj = checkListData[x].children[y].search(designer, z);
        }
        if (tempObj.result) {
          desidArr2.push(designer.desid);
        }
      }
      desidArr.push(new Set(desidArr2));
    }
    if (searchCondition.mode === "and") {
      desidArr = desidArr.intersection();
    } else {
      desidArr = desidArr.union();
    }
  }

  blocks = [];
  for (let i = 1; i < standardDoms.length; i++) {
    if (desidArr.includes(standardDoms[i].getAttribute("desid"))) {
      standardDoms[i].style.display = "block";
      blocks.push(standardDoms[i]);
    } else {
      standardDoms[i].style.display = "none";
    }
  }

  if (blocks.length > 0) {
    setTimeout(() => {
      blocks[0].click();
    }, 0);
  }

}

DesignerJs.prototype.checklistMemoSystem = async function (desid) {
  const instance = this;
  const { createNode, withOut, colorChip, ajaxJson, dateToString, cleanChildren } = GeneralJs;
  const { ea, totalContents, belowHeight, grayBarWidth, designers } = this;
  const designer = designers.pick(desid);
  const memoBaseClassName = "memoBaseClassName";
  const memoWhitePopupClassName = "memoWhitePopupClassName";
  const textUpdateTargetClassName = "textUpdateTargetClassName";
  try {
    let memoBase, memoTong;
    let motherMargin;
    let innerMotherMargin;
    let tongBetween;
    let titleLineTop;
    let titleSize, titleWeight;
    let titleWhitePadding;
    let boxContents;
    let boxInnerPaddingLeft;
    let boxInnerPaddingTop;
    let contentsSize, contentsWeight, contentsLineHeight;
    let contentsPaddingBottom;
    let whiteOuterMargin;
    let whiteInnerMargin;
    let whiteTitleHeight;
    let whiteTitleSize;
    let whiteTitleWeight;
    let whiteTitleTextTop;
    let whiteTitleLeftVisual;
    let whiteInnerDescriptionPadding;
    let plusCircleWidth;
    let plusCircleRight;
    let plusCircleBottom;
    let plusSize;
    let plusWeight;
    let plusTextTop;
    let thisDesignerHistory;
    let renderMemo;

    motherMargin = 24;
    innerMotherMargin = 0;
    tongBetween = 16;
    titleLineTop = 10;

    titleSize = 16;
    titleWeight = 700;
    titleWhitePadding = 10;

    boxInnerPaddingLeft = 20;
    boxInnerPaddingTop = 20;

    contentsSize = 14;
    contentsWeight = 400;
    contentsLineHeight = 1.7;
    contentsPaddingBottom = 160;

    whiteOuterMargin = 72;
    whiteInnerMargin = 40;

    whiteTitleHeight = 44;

    whiteTitleSize = 22;
    whiteTitleWeight = 700;
    whiteTitleTextTop = -2;
    whiteTitleLeftVisual = 1;

    whiteInnerDescriptionPadding = 30;

    plusCircleWidth = 45;
    plusCircleRight = 24;
    plusCircleBottom = 21;

    plusSize = 38;
    plusWeight = 500;
    plusTextTop = -3;

    thisDesignerHistory = (await ajaxJson({ method: "designer", idArr: [ desid ] }, "/getHistoryTotal", { equal: true }))[desid];
    boxContents = [
      {
        title: "VOC",
        contents: thisDesignerHistory.history,
        property: "history",
      },
      {
        title: "VOD",
        contents: thisDesignerHistory.issue,
        property: "issue",
      },
      {
        title: "경력 상세",
        contents: thisDesignerHistory.career,
        property: "career",
      },
      {
        title: "자녀 및 반려 동물",
        contents: thisDesignerHistory.family,
        property: "family",
      },
      {
        title: "파트너 시공사 특징",
        contents: thisDesignerHistory.partner,
        property: "partner",
      },
      {
        title: "제작 가구 패브릭",
        contents: thisDesignerHistory.craft,
        property: "craft",
      },
      {
        title: "응대 방식",
        contents: thisDesignerHistory.reception,
        property: "reception",
      },
      {
        title: "디자인 경향",
        contents: thisDesignerHistory.styling,
        property: "styling",
      },
      {
        title: "기타 메모",
        contents: thisDesignerHistory.etc,
        property: "etc",
      }
    ];

    renderMemo = (desid, boxContents) => {
      cleanChildren(document.querySelector('.' + memoBaseClassName).firstChild);
      memoTong = createNode({
        mother: document.querySelector('.' + memoBaseClassName).firstChild,
        style: {
          display: "block",
          position: "relative",
          top: String(motherMargin) + ea,
          marginLeft: String(motherMargin) + ea,
          paddingTop: String(innerMotherMargin) + ea,
          paddingBottom: String(innerMotherMargin - tongBetween) + ea,
          paddingLeft: String(innerMotherMargin) + ea,
          paddingRight: String(innerMotherMargin - tongBetween) + ea,
          width: withOut((motherMargin * 2) + (innerMotherMargin * 2) - tongBetween, ea),
          height: withOut((motherMargin * 2) + (innerMotherMargin * 2) - tongBetween, ea),
        }
      });
      for (let i = 0; i < boxContents.length; i++) {
        createNode({
          mother: memoTong,
          event: {
            mouseenter: function (e) {
              this.children[0].children[0].children[0].style.color = colorChip.black;
              this.children[1].style.color = colorChip.green;
            },
            mouseleave: function (e) {
              this.children[0].children[0].children[0].style.color = colorChip.deactive;
              this.children[1].style.color = colorChip.black;
            }
          },
          style: {
            display: "inline-block",
            position: "relative",
            verticalAlign: "top",
            width: "calc(calc(100% - " + String(tongBetween * 3) + ea + ") / " + String(3) + ")",
            paddingTop: String(titleLineTop) + ea,
            height: "calc(calc(calc(100% - " + String(tongBetween * 3) + ea + ") / " + String(3) + ") - " + String(titleLineTop) + ea + ")",
            marginRight: String(tongBetween) + ea,
            marginBottom: String(tongBetween) + ea,
          },
          children: [
            {
              style: {
                display: "flex",
                position: "relative",
                width: withOut(0),
                height: withOut(0),
                border: "1px solid " + colorChip.gray4,
                boxSizing: "border-box",
                borderRadius: String(5) + "px",
                justifyContent: "center",
                alignItems: "end",
              },
              children: [
                {
                  style: {
                    display: "inline-block",
                    verticalAlign: "top",
                    position: "relative",
                    width: withOut(boxInnerPaddingLeft * 2, ea),
                    height: withOut(boxInnerPaddingTop, ea),
                    overflow: "scroll",
                  },
                  children: [
                    {
                      class: [ textUpdateTargetClassName ],
                      attribute: { index: String(i) },
                      text: boxContents[i].contents,
                      style: {
                        display: "block",
                        position: "relative",
                        fontSize: String(contentsSize) + ea,
                        fontWeight: String(contentsWeight),
                        color: colorChip.deactive,
                        lineHeight: String(contentsLineHeight),
                        paddingBottom: String(contentsPaddingBottom) + ea,
                      }
                    }
                  ]
                }
              ]
            },
            {
              text: boxContents[i].title,
              attribute: {
                index: String(i),
              },
              event: {
                click: function (e) {
                  const index = Number(this.getAttribute("index"));
                  const thisContents = boxContents[index];
                  let cancelBack, whiteBase;

                  cancelBack = createNode({
                    mother: totalContents,
                    class: [ memoWhitePopupClassName ],
                    event: {
                      click: function (e) {
                        const removeTargets = document.querySelectorAll('.' + memoWhitePopupClassName);
                        for (let dom of removeTargets) {
                          dom.remove();
                        }
                      }
                    },
                    style: {
                      position: "fixed",
                      top: String(0),
                      left: String(grayBarWidth) + ea,
                      height: withOut(belowHeight, ea),
                      width: withOut(grayBarWidth, ea),
                      zIndex: String(5),
                      background: colorChip.black,
                      opacity: String(0.2),
                    }
                  });

                  whiteBase = createNode({
                    mother: totalContents,
                    attribute: { index: String(index) },
                    class: [ memoWhitePopupClassName ],
                    style: {
                      position: "fixed",
                      top: String(whiteOuterMargin) + ea,
                      left: String(grayBarWidth + whiteOuterMargin) + ea,
                      width: withOut(grayBarWidth + (whiteOuterMargin * 2), ea),
                      height: withOut(belowHeight + (whiteOuterMargin * 2), ea),
                      zIndex: String(5),
                      background: colorChip.white,
                      borderRadius: String(8) + "px",
                      boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
                      opacity: String(0),
                      animation: "fadeuplite 0.3s ease forwards",
                    }
                  });

                  createNode({
                    mother: whiteBase,
                    style: {
                      display: "block",
                      position: "relative",
                      paddingTop: String(whiteInnerMargin) + ea,
                      paddingBottom: String(whiteInnerMargin) + ea,
                      height: withOut(whiteInnerMargin * 2, ea),
                      width: withOut(0),
                    },
                    children: [
                      {
                        style: {
                          display: "block",
                          position: "relative",
                          marginLeft: String(whiteInnerMargin) + ea,
                          width: withOut(whiteInnerMargin * 2, ea),
                          height: withOut(0),
                        },
                        children: [
                          {
                            style: {
                              display: "flex",
                              position: "relative",
                              justifyContent: "left",
                              alignItems: "start",
                              width: withOut(0),
                              height: String(whiteTitleHeight) + ea,
                            },
                            children: [
                              {
                                text: thisContents.title,
                                style: {
                                  display: "inline-block",
                                  position: "relative",
                                  fontSize: String(whiteTitleSize) + ea,
                                  fontWeight: String(whiteTitleWeight),
                                  color: colorChip.black,
                                  top: String(whiteTitleTextTop) + ea,
                                  left: String(whiteTitleLeftVisual) + ea,
                                }
                              }
                            ]
                          },
                          {
                            style: {
                              display: "flex",
                              position: "relative",
                              width: withOut(0),
                              height: withOut(whiteTitleHeight, ea),
                              border: "1px solid " + colorChip.gray3,
                              borderRadius: String(8) + "px",
                              justifyContent: "center",
                              alignItems: "end",
                            },
                            children: [
                              {
                                style: {
                                  display: "inline-block",
                                  position: "relative",
                                  overflow: "scroll",
                                  width: withOut(whiteInnerDescriptionPadding * 2, ea),
                                  height: withOut(whiteInnerDescriptionPadding, ea),
                                },
                                children: [
                                  {
                                    class: [ textUpdateTargetClassName ],
                                    attribute: { index: String(index) },
                                    text: thisContents.contents,
                                    style: {
                                      display: "block",
                                      position: "relative",
                                      fontSize: String(contentsSize) + ea,
                                      fontWeight: String(contentsWeight),
                                      lineHeight: String(contentsLineHeight),
                                      paddingBottom: String(contentsPaddingBottom) + ea,
                                      color: colorChip.black,
                                    }
                                  }
                                ]
                              },
                              {
                                event: {
                                  selectstart: (e) => { e.preventDefault(); },
                                  click: async function (e) {
                                    try {
                                      const index = Number(this.getAttribute("index"));
                                      const baseTarget = this.parentElement.children[0];
                                      let textArea, text;
                                      let areaTarget;
                                      let updateValue;
                                      let updateTargets;
                                      let profile;
                                      let thisMember;

                                      if (baseTarget.querySelector("textarea") === null) {

                                        profile = JSON.parse(window.localStorage.getItem("GoogleClientProfile"));
                                        if (profile === null) {
                                          window.alert("허가된 멤버가 아닙니다!");
                                          window.localStorage.clear();
                                          window.location.reload();
                                        }
                                        thisMember = (await ajaxJson({ type: "boo", value: profile.homeliaisonConsoleLoginedEmail }, "/getMembers")).result;

                                        text = "-------- " + dateToString(new Date(), true) + " / " + thisMember.name + " --------";
                                        text += "\n\n";
                                        text += "\n\n";
                                        text += "----------------------------------------------";
                                        text += "\n\n";
                                        text += thisContents.contents;

                                        textArea = createNode({
                                          mother: baseTarget,
                                          mode: "textarea",
                                          attribute: { index: String(index) },
                                          event: {
                                            keydown: function (e) {
                                              if (e.key === "Tab") {
                                                e.preventDefault();
                                              }
                                            },
                                            keyup: async function (e) {
                                              try {
                                                if (e.key === "Tab") {
                                                  const index = Number(this.getAttribute("index"));

                                                  updateValue = this.value.trim();
                                                  await ajaxJson({ id: desid, column: boxContents[index].property, value: updateValue, email: null }, "/updateDesignerHistory");

                                                  boxContents[index].contents = updateValue;
                                                  thisContents.contents = updateValue;

                                                  updateTargets = document.querySelectorAll('.' + textUpdateTargetClassName);
                                                  for (let dom of updateTargets) {
                                                    if (Number(dom.getAttribute("index")) === index) {
                                                      cleanChildren(dom);
                                                      dom.insertAdjacentHTML("beforeend", updateValue.replace(/\n/gi, "<br>"));
                                                    }
                                                  }

                                                  this.remove();

                                                }
                                              } catch (e) {
                                                console.log(e);
                                              }
                                            }
                                          },
                                          text,
                                          style: {
                                            display: "block",
                                            position: "absolute",
                                            top: String(0),
                                            left: String(0),
                                            paddingBottom: String(contentsPaddingBottom) + ea,
                                            width: withOut(0, ea),
                                            height: withOut(0, ea),
                                            background: colorChip.white,
                                            border: String(0),
                                            outline: String(0),
                                            fontSize: String(contentsSize) + ea,
                                            fontWeight: String(contentsWeight),
                                            lineHeight: String(contentsLineHeight),
                                            color: colorChip.green,
                                          }
                                        });

                                        textArea.focus();

                                      } else {

                                        areaTarget = baseTarget.querySelector("textarea");
                                        updateValue = areaTarget.value.trim();
                                        await ajaxJson({ id: desid, column: boxContents[index].property, value: updateValue, email: null }, "/updateDesignerHistory");

                                        boxContents[index].contents = updateValue;
                                        thisContents.contents = updateValue;

                                        updateTargets = document.querySelectorAll('.' + textUpdateTargetClassName);
                                        for (let dom of updateTargets) {
                                          if (Number(dom.getAttribute("index")) === index) {
                                            cleanChildren(dom);
                                            dom.insertAdjacentHTML("beforeend", updateValue.replace(/\n/gi, "<br>"));
                                          }
                                        }

                                        areaTarget.remove();

                                      }

                                    } catch (err) {
                                      console.log(err);
                                    }
                                  }
                                },
                                attribute: { index: String(index) },
                                style: {
                                  display: "inline-flex",
                                  position: "absolute",
                                  width: String(plusCircleWidth) + ea,
                                  height: String(plusCircleWidth) + ea,
                                  borderRadius: String(plusCircleWidth) + ea,
                                  background: colorChip.gradientGreen,
                                  bottom: String(plusCircleBottom) + ea,
                                  right: String(plusCircleRight) + ea,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  cursor: "pointer",
                                },
                                children: [
                                  {
                                    text: "+",
                                    attribute: { index: String(index) },
                                    event: {
                                      selectstart: (e) => { e.preventDefault(); },
                                    },
                                    style: {
                                      fontSize: String(plusSize) + ea,
                                      fontWeight: String(plusWeight),
                                      color: colorChip.white,
                                      fontFamily: "graphik",
                                      position: "relative",
                                      top: String(plusTextTop) + ea,
                                    }
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  });

                }
              },
              style: {
                display: "inline-block",
                position: "absolute",
                paddingLeft: String(titleWhitePadding) + ea,
                paddingRight: String(titleWhitePadding) + ea,
                background: colorChip.white,
                zIndex: String(1),
                top: String(0),
                left: String(titleWhitePadding) + ea,
                fontSize: String(titleSize) + ea,
                fontWeight: String(titleWeight),
                color: colorChip.black,
                cursor: "pointer",
              }
            }
          ]
        });
      }
    }

    if ([ ...document.querySelectorAll('.' + memoBaseClassName) ].length > 0) {
      if ([ ...document.querySelectorAll('.' + memoWhitePopupClassName) ].length > 0) {
        const removeTargets = document.querySelectorAll('.' + memoWhitePopupClassName);
        for (let dom of removeTargets) {
          dom.remove();
        }
      }
      if (document.querySelector('.' + memoBaseClassName).getAttribute("desid") === desid) {
        document.querySelector('.' + memoBaseClassName).remove();
      } else {
        document.querySelector('.' + memoBaseClassName).setAttribute("desid", desid);
        renderMemo(desid, boxContents);
      }

      return;
    }

    memoBase = createNode({
      mother: totalContents,
      attribute: { desid },
      class: [ memoBaseClassName ],
      style: {
        position: "fixed",
        top: String(0),
        left: String(grayBarWidth) + ea,
        height: withOut(belowHeight, ea),
        width: withOut(grayBarWidth, ea),
        zIndex: String(4),
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            top: String(0),
            left: String(0),
            width: withOut(0),
            height: withOut(0),
            background: colorChip.white,
          }
        }
      ]
    }).children[0];

    renderMemo(desid, boxContents);

  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.checkListView = async function () {
  const instance = this;
  try {
    const loading = await this.mother.loadingRun();
    if (GeneralJs.returnGet().entire !== "true") {
      this.backGrayBar();
    }
    await this.spreadData(null, true, null);
    const { returnGet, createNode, createNodes, ajaxJson, colorChip, withOut, equalJson } = GeneralJs;
    const { totalMother, ea, grayBarWidth, belowHeight, media } = this;
    const mobile = media[4];
    const desktop = !mobile;
    const standardBar = totalMother.firstChild;
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true");
    const normalMode = (entireMode && getObj.normal === "true");
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

    if (typeof getObj.desid === "string" && getObj.normal === "true") {
      designers = await ajaxJson({ noFlat: true, whereQuery: { desid: getObj.desid } }, "/getDesigners", { equal: true });
    } else {
      designers = await ajaxJson({ noFlat: true, whereQuery: { "information.contract.status": { $not: { $regex: "해지" } } } }, "/getDesigners", { equal: true });
    }
    length = designers.length;
    this.designers = new Designers(designers);

    this.desid = (getObj.desid !== undefined) ? getObj.desid : this.standardDoms[this.standardDoms.length - 1].getAttribute("desid");
    this.modes = [ "checklist", "report", "request", "possible", "project", "schedule" ];
    this.mode = this.modes[0];
    this.result = null;
    this.searchCondition = {
      mode: "or",
      conditions: [],
      blocks: [],
    };
    this.entireMode = entireMode;
    this.normalMode = normalMode;
    if (normalMode) {
      this.ea = "px";
    }

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
            searchResult = instance.designers.search(value);
            if (searchResult.length > 0) {
              instance.checkListDetailLaunching(searchResult[0].desid);
            }
          }
        }
      });
      searchInput.addEventListener("contextmenu", this.checkListDetailSearchBox());
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
          instance.checkListDetailLaunching(instance.standardDoms[i].getAttribute("desid"));
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
        if (getObj.mode === instance.pageHistory[1].path) {
          instance.checkListDetailLaunching(instance.pageHistory[1].desid);
          instance.pageHistory.shift();
          instance.pageHistory.shift();
        }
      }
    });

    this.projectAreas = [];
    this.projectBlocks = [];

    //launching
    this.checkListDetailLaunching(this.desid);

    //add extract event
    this.reportAddExtractEvent();

  } catch (e) {
    console.log(e);
  }
}
