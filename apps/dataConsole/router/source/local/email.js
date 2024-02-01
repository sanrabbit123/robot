const EmailJs = function () {
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
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

EmailJs.prototype.baseMaker = async function () {
  const instance = this;
  const { ea, totalContents, valueAreaClassName, emailAddress } = this;
  const { createNode, colorChip, withOut, findByAttribute, removeByClass, isMac, dateToString, stringToDate, blankHref, cleanChildren, ajaxJson, equalJson, autoComma } = GeneralJs;
  const listTongClassName = "listTongClassName";
  const bodyTongClassName = "bodyTongClassName";
  const attachTongClassName = "attachTongClassName";
  const eventTargetClassName = "eventTargetClassName";
  try {
    let totalMother;
    let columnAreaHeight;
    let fontSize, fontWeight;
    let idWidth, nameWidth;
    let idNameAreaPaddingTop;
    let idNameHeight;
    let idNamePaddingBottom;
    let maxWidth;
    let valueColumnsAreaPaddingLeft;
    let valueArea;
    let valueWeight;
    let valueMaxWidth;
    let menuPromptWidth, menuPromptHeight;
    let menuVisual;
    let menuBetween;
    let menuTextTop, menuSize, menuWeight;
    let circleRight, circleTop;
    let receiveEmails;
    let tongBase;
    let basicBlockWidth;
    let nameBlockWidth, emailBlockWidth;
    let innerMargin;
    let blockBetween;
    let blockBetweenSmall;
    let bodyBase;
    let tongHeight;
    let attachBase;
    let tongBetween;
    let bodyOpenHeight;
    let fontUpFunc;
    let titleAreaHeight, titleAreaMarginBottom;
    let titleArea;

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

    menuPromptWidth = 110;
    menuPromptHeight = 32;
    menuVisual = 4;
    menuBetween = 3;

    menuTextTop = isMac() ? -1 : 1,
    menuSize = 13;
    menuWeight = 600;

    circleRight = 2.5;
    circleTop = isMac() ? 3 : 1;

    basicBlockWidth = 136;
    nameBlockWidth = 80;
    emailBlockWidth = 172;

    innerMargin = 8;
    blockBetween = 12;
    blockBetweenSmall = 4;

    tongHeight = 42;
    tongBetween = 6;

    bodyOpenHeight = 640;

    titleAreaHeight = 24;
    titleAreaMarginBottom = 12;

    receiveEmails = this.receiveEmails.data;

    fontUpFunc = (dom) => {
      const targetChildren = [ ...dom.children ];
      let targetChildrenChildren;
      for (let d of targetChildren) {
        if (!/style/gi.test(d.nodeName)) {
          if (typeof d.style.fontSize !== "string" || d.style.fontSize === "") {
            d.style.fontSize = String(14) + ea;
          }
          d.style.lineHeight = String(1.6);
          if (typeof d.style.display !== "string" || d.style.display === "") {
            d.style.display = "block";
          }
          if (typeof d.style.color !== "string" || d.style.color === "") {
            d.style.color = colorChip.black;
          }
        }
        if (d.nodeName === "b" || d.nodeName === "B") {
          if (typeof d.style.color !== "string" || d.style.color === "") {
            d.style.color = colorChip.black;
          }
          d.style.fontWeight = String(800);
        }
        targetChildrenChildren = [ ...d.children ];
        if (targetChildrenChildren.length > 0) {
          fontUpFunc(d);
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

    titleArea = createNode({
      mother: totalMother,
      style: {
        display: "flex",
        position: "relative",
        width: withOut(idNameAreaPaddingTop * 2, ea),
        height: String(titleAreaHeight) + ea,
        marginBottom: String(titleAreaMarginBottom) + ea,
        marginLeft: String(idNameAreaPaddingTop) + ea,
        paddingTop: String(16) + ea,
      },
      children: [
        {
          text: "<u%< %u>" + emailAddress + "<u% >%u>",
          style: {
            display: "block",
            position: "relative",
            fontFamily: "graphik",
            fontSize: String(20) + ea,
            fontWeight: String(500),
            color: colorChip.black,
          },
          under: {
            position: "relative",
            fontSize: String(20) + ea,
            fontWeight: String(500),
            color: colorChip.gray4,
            top: String(2) + ea,
          }
        }
      ]
    });
    
    valueArea = createNode({
      mother: totalMother,
      style: {
        display: "block",
        position: "relative",
        paddingTop: String(idNameAreaPaddingTop) + ea,
        height: withOut(titleAreaHeight + titleAreaMarginBottom + idNameAreaPaddingTop, ea),
        width: withOut(0, ea),
        overflow: "scroll",
      },
      child: {
        class: [ valueAreaClassName ],
        style: {
          display: "inline-block",
          position: "relative",
          verticalAlign: "top",
          width: withOut(0, ea),
          overflow: "hidden",
        },
      }
    }).firstChild;

    receiveEmails.sort((a, b) => { return b.date.valueOf() - a.date.valueOf(); });
    for (let obj of receiveEmails) {

      tongBase = createNode({
        mother: valueArea,
        class: [ obj.id, listTongClassName ],
        style: {
          display: "flex",
          position: "relative",
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) +  ea,
          width: withOut((idNameAreaPaddingTop * 2) + (innerMargin * 2), ea),
          marginLeft: String(idNameAreaPaddingTop) + ea,
          height: String(tongHeight) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gray1,
          marginBottom: String(tongBetween) + ea,
          alignItems: "center",
          justifyContent: "start",
          cursor: "pointer",
        }
      });

      createNode({
        mother: tongBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(basicBlockWidth) + ea,
          height: String(tongHeight - (innerMargin * 2)) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.darkDarkShadow,
          alignItems: "center",
          justifyContent: "center",
          marginRight: String(blockBetween) + ea,
        },
        child: {
          text: dateToString(obj.date, true),
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(12) + ea,
            fontWeight: String(700),
            color: colorChip.white,
            top: String(-1) + ea,
          }
        }
      });
      createNode({
        mother: tongBase,
        class: [ eventTargetClassName ],
        attribute: {
          id: obj.id,
          toggle: "off",
        },
        event: {
          click: async function (e) {
            try {
              const toggle = this.getAttribute("toggle") === "on";
              const id = this.getAttribute("id");
              const allMailTargets = [ ...document.querySelectorAll('.' + listTongClassName) ];
              const allBodyTargets = [ ...document.querySelectorAll('.' + bodyTongClassName) ];
              const allAttachTargets = [ ...document.querySelectorAll('.' + attachTongClassName) ];
              let targetBody, loading;
              let targetChildren;
              let targetAttachDom;
              let thisFileName;

              if (toggle) {

                for (let block of allMailTargets) {
                  block.style.opacity = String(1);
                  block.querySelector("." + eventTargetClassName).setAttribute("toggle", "off");
                }
                for (let bodyDom of allBodyTargets) {
                  cleanChildren(bodyDom)
                  bodyDom.style.height = String(0) + ea;
                  bodyDom.style.paddingTop = String(0) + ea;
                }
                for (let attachDom of allAttachTargets) {
                  cleanChildren(attachDom)
                  attachDom.style.height = String(0) + ea;
                  attachDom.style.paddingTop = String(0) + ea;
                  attachDom.style.paddingBottom = String(0) + ea;
                }
                this.setAttribute("toggle", "off");

              } else {

                for (let block of allMailTargets) {
                  if (block !== this.parentNode) {
                    block.style.opacity = String(0.4);
                    block.querySelector("." + eventTargetClassName).setAttribute("toggle", "off");
                  } else {
                    block.style.opacity = String(1);
                    block.querySelector("." + eventTargetClassName).setAttribute("toggle", "on");
                  }
                }
  
                targetBody = null;
                for (let bodyDom of allBodyTargets) {
                  cleanChildren(bodyDom)
                  if (bodyDom.className.split(" ").includes(id)) {
                    bodyDom.style.height = String(bodyOpenHeight) + ea;
                    bodyDom.style.paddingTop = String(12) + ea;
                    targetBody = bodyDom;
                  } else {
                    bodyDom.style.height = String(0) + ea;
                    bodyDom.style.paddingTop = String(0) + ea;
                  }
                }

                for (let attachDom of allAttachTargets) {
                  cleanChildren(attachDom)
                  attachDom.style.height = String(0) + ea;
                  attachDom.style.paddingTop = String(0) + ea;
                  attachDom.style.paddingBottom = String(0) + ea;
                }
  
                if (targetBody !== null) {
                  loading = instance.mother.whiteProgressLoading(null, true, false, false);
                  ajaxJson({ id }, PARSERHOST + "/getEmailBody", { equal: true }).then((response) => {
                    loading.remove();
                    cleanChildren(targetBody);
                    targetBody.insertAdjacentHTML("beforeend", response["body"]);
                    fontUpFunc(targetBody);
                    if (response.attachment.length > 0) {
                      targetAttachDom = allAttachTargets.find((d) => {
                        return d.className.split(" ").includes(id);
                      });
                      if (targetAttachDom !== undefined) {
                        targetAttachDom.style.height = "auto";
                        targetAttachDom.style.paddingTop = String(12) + ea;
                        targetAttachDom.style.paddingBottom = String(16) + ea;

                        for (let obj of response.attachment) {
                          thisFileName = obj.key.split("/")[obj.key.split("/").length - 1];
                          createNode({
                            mother: targetAttachDom,
                            text: thisFileName,
                            attribute: {
                              file: thisFileName,
                              hash: obj.hash
                            },
                            event: {
                              click: async function (e) {
                                try {
                                  const hash = this.getAttribute("hash");
                                  const { link } = await ajaxJson({ hash }, PARSERHOST + "/getFileLink", { equal: true });
                                  blankHref(link);
                                } catch (e) {
                                  console.log(e);
                                }
                              }
                            },
                            style: {
                              height: String(28) + ea,
                              borderRadius: String(5) + "px",
                              background: colorChip.gradientGreen,
                              fontSize: String(13) + ea,
                              fontWeight: String(800),
                              color: colorChip.white,
                              paddingLeft: String(16) + ea,
                              paddingRight: String(16) + ea,
                              marginRight: String(4) + ea,
                              display: "inline-flex",
                              position: "relative",
                              justifyContent: "center",
                              alignItems: "center",
                              paddingBottom: String(2) + ea,
                              cursor: "pointer",
                            }
                          })
                        }

                      }
                    }
                  }).catch((err) => {
                    console.log(err);
                  });
                }

                this.setAttribute("toggle", "on");

              }

            } catch (e) {
              console.log(e);
            }
          }
        },
        style: {
          display: "inline-block",
          position: "relative",
          overflow: "scroll",
          height: withOut(0, ea),
          textAlign: "center",
          width: withOut(basicBlockWidth + blockBetween + nameBlockWidth + blockBetween + blockBetweenSmall + emailBlockWidth, ea),
        },
        child: {
          style: {
            display: "inline-flex",
            position: "relative",
            width: String(5000) + ea,
            alignItems: "center",
            justifyContent: "start",
            height: withOut(0, ea),
          },
          child: {
            text: obj.title,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(15) + ea,
              fontWeight: String(500),
              color: colorChip.black,
              top: String(-1) + ea,
            }
          }
        }
      });
      createNode({
        mother: tongBase,
        style: {
          display: "inline-flex",
          position: "relative",
          width: String(nameBlockWidth) + ea,
          height: String(tongHeight - (innerMargin * 2)) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGreen,
          textAlign: "center",
          marginLeft: String(blockBetween) + ea,
        },
        child: {
          style: {
            display: "inline-block",
            position: "relative",
            width: withOut(0, ea),
            height: withOut(0, ea),
            textAlign: "center",
            overflow: "scroll",
          },
          child: {
            style: {
              display: "inline-flex",
              position: "relative",
              height: withOut(0, ea),
              alignItems: "center",
              justifyContent: "center",
              width: String(5000) + ea,
              marginLeft: String(-1 * ((5000 / 2) - (nameBlockWidth / 2))) + ea,
            },
            child: {
              text: obj.from.name,
              style: {
                display: "inline-block",
                position: "relative",
                fontSize: String(12) + ea,
                fontWeight: String(700),
                color: colorChip.white,
                top: String(-1) + ea,
              }
            }
          }
        },
      });
      createNode({
        mother: tongBase,
        style: {
          display: "inline-block",
          position: "relative",
          width: String(emailBlockWidth) + ea,
          height: String(tongHeight - (innerMargin * 2)) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.gradientGreen,
          marginLeft: String(blockBetweenSmall) + ea,
          textAlign: "center",
          overflow: "scroll",
        },
        child: {
          style: {
            display: "inline-flex",
            position: "relative",
            color: colorChip.white,
            height: withOut(0, ea),
            width: String(5000) + ea,
            marginLeft: String(-1 * ((5000 / 2) - (emailBlockWidth / 2))) + ea,
            alignItems: "center",
            justifyContent: "center",
          },
          child: {
            text: obj.from.email,
            style: {
              display: "inline-block",
              position: "relative",
              fontSize: String(12) + ea,
              fontWeight: String(700),
              color: colorChip.white,
              top: String(-1) + ea,
            }
          }
        }
      });

      bodyBase = createNode({
        mother: valueArea,
        class: [ obj.id, bodyTongClassName ],
        style: {
          display: "flex",
          position: "relative",
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) +  ea,
          width: withOut((idNameAreaPaddingTop * 2) + (innerMargin * 2), ea),
          marginLeft: String(idNameAreaPaddingTop) + ea,
          height: String(0) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          marginBottom: String(0) + ea,
          alignItems: "start",
          justifyContent: "start",
          flexDirection: "column",
        }
      });

      attachBase = createNode({
        mother: valueArea,
        class: [ obj.id, attachTongClassName ],
        style: {
          display: "flex",
          position: "relative",
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) +  ea,
          width: withOut((idNameAreaPaddingTop * 2) + (innerMargin * 2), ea),
          marginLeft: String(idNameAreaPaddingTop) + ea,
          height: String(0) + ea,
          borderRadius: String(5) + "px",
          background: colorChip.white,
          marginBottom: String(0) + ea,
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "row",
        }
      });

    }

  } catch (e) {
    console.log(e);
  }
}

EmailJs.prototype.launching = async function () {
  const instance = this;
  const { returnGet, ajaxJson, cleanChildren, setQueue } = GeneralJs;
  try {
    const getObj = returnGet();
    const entireMode = (getObj.entire === "true" && getObj.dataonly === "true");
    const defaultMonth = 3;
    let loading;
    let memid;
    let receiveEmails;

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

    memid = instance.mother.member.id;
    receiveEmails = await ajaxJson({ memid }, PARSERHOST + "/listEmail", { equal: true });

    this.receiveEmails = receiveEmails;
    this.valueAreaClassName = "valueAreaClassName";
    this.emailHost = NUMBERSHOST.split(":")[1].split("/")[2];
    this.emailAddress = instance.mother.member.email.find((s) => { return (new RegExp(instance.emailHost, "gi")).test(s) })

    if (this.emailAddress === undefined) {
      throw new Error("invalid member");
    }

    await this.baseMaker();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
