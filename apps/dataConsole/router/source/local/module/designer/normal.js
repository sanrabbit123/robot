DesignerJs.prototype.normalDataRender = async function () {
  const instance = this;
  const { ea, totalContents, designers } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  try {





  } catch (e) {
    console.log(e);
  }
}

DesignerJs.prototype.normalBase = async function () {
  const instance = this;
  const { ea, totalContents, designers } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
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
  
    valueColumnsAreaPaddingLeft = 12;
  
  
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
          children: [
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(idWidth) + ea,
              },
              child: {
                text: "아이디",
                style: {
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                }
              }
            },
            {
              style: {
                display: "inline-flex",
                flexDirection: "row",
                position: "relative",
                justifyContent: "center",
                alignItems: "start",
                width: String(nameWidth) + ea,
              },
              child: {
                text: "성함",
                style: {
                  fontSize: String(fontSize) + ea,
                  fontWeight: String(fontWeight),
                  color: colorChip.green,
                }
              }
            },
          ]
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
  
  
    for (let i = 0; i < 30; i++) {
  
      createNode({
        mother: valueColumnsArea,
        style: {
          display: "inline-flex",
          flexDirection: "row",
          position: "relative",
          justifyContent: "center",
          alignItems: "start",
          width: String(idWidth) + ea,
        },
        child: {
          text: "아이디",
          style: {
            fontSize: String(fontSize) + ea,
            fontWeight: String(fontWeight),
            color: colorChip.green,
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
        style: {
          display: "flex",
          flexDirection: "row",
          position: "relative",
          height: String(idNameHeight) + ea,
          justifyContent: "center",
          alignItems: "start",
        },
        children: [
          {
            style: {
              display: "inline-flex",
              flexDirection: "row",
              position: "relative",
              justifyContent: "center",
              alignItems: "start",
              width: String(idWidth) + ea,
            },
            child: {
              text: designer.desid,
              style: {
                fontSize: String(fontSize) + ea,
                fontWeight: String(fontWeight),
                color: colorChip.black,
              }
            }
          },
          {
            style: {
              display: "inline-flex",
              flexDirection: "row",
              position: "relative",
              justifyContent: "center",
              alignItems: "start",
              width: String(nameWidth) + ea,
            },
            child: {
              text: designer.designer,
              style: {
                fontSize: String(fontSize) + ea,
                fontWeight: String(fontWeight),
                color: colorChip.black,
              }
            }
          },
        ]
      });
  
      thisTong = createNode({
        mother: valueArea,
        class: [ moveTargetClassName ],
        style: {
          display: "flex",
          position: "relative",
          width: String(maxWidth) + ea,
          height: String(idNameHeight) + ea,
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "start",
          paddingLeft: String(valueColumnsAreaPaddingLeft) + ea,
        }
      })
  
      for (let i = 0; i < 30; i++) {
        createNode({
          mother: thisTong,
          style: {
            display: "inline-flex",
            flexDirection: "row",
            position: "relative",
            justifyContent: "center",
            alignItems: "start",
            width: String(idWidth) + ea,
          },
          child: {
            text: designer.designer,
            style: {
              fontSize: String(fontSize) + ea,
              fontWeight: String(valueWeight),
              color: colorChip.black,
            }
          }
        });
      }
  
    }
  
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

    loading = await this.mother.loadingRun();

    designers = await ajaxJson({ noFlat: true, whereQuery: {} }, BACKHOST + "/getDesigners", { equal: true });
    this.designers = designers;

    await this.normalBase();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
