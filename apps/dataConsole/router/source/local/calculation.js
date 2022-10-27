const CalculationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

CalculationJs.prototype.baseMaker = function () {
  const instance = this;
  const { totalContents, ea, belowHeight, users, designers, miniDesigners } = this;
  const { createNode, withOut, colorChip, isMac, dateToString, blankHref, ajaxJson, cleanChildren } = GeneralJs;
  let outerMargin;
  let innerPadding;
  let grayBack;
  let grayTong;
  let blockHeight;
  let blockMargin;
  let baseBlock;
  let targetTong;
  let textTop;
  let textSize;
  let minimumBetween;
  let barWidth, barMargin;
  let motherBlock;
  let alarmCircleRadius;
  let buttonSize, buttonWeight, buttonTextTop;
  let buttonHeight, buttongTop;
  let buttonList;
  let buttonWidth;
  let num;
  let buttonBetween;
  let idWidth, nameWidth, phoneWidth, timelineWidth, status0Width, status1Width, targetsWidth, designerWidth, emailWidth;
  let contentsLoad;

  outerMargin = 30;
  innerPadding = 20;

  blockHeight = 43;
  blockMargin = 1;

  textTop = (isMac() ? 11 : 13);
  textSize = 14;

  barWidth = 4;
  barMargin = 6;

  minimumBetween = 19;

  alarmCircleRadius = 8;

  idWidth = 88;
  nameWidth = 60;
  phoneWidth = 122;
  timelineWidth = 145;
  status0Width = 80;
  status1Width = 80;
  targetsWidth = 49;
  designerWidth = 70;
  emailWidth = 200;

  buttonTextTop = isMac() ? -1 : 0;
  buttonSize = 12;
  buttonWeight = 700;
  buttonHeight = 28;
  buttongTop = 8;
  buttonWidth = 90;
  buttonBetween = 6;

  contentsLoad = () => {};

  buttonList = [
    {
      name: "컨펌 및 전송",
      click: async function (e) {
        try {
          const useid = this.getAttribute("useid");
          const user = instance.users.find((obj) => { return obj.useid === useid });
          const desid = user.desid;
          const designer = instance.designers.find((obj) => { return obj.desid === desid });
          let updateQuery, whereQuery;

          if (user.response.design.length > 0) {

            // alimtalk 1
            await ajaxJson({
              method: "miniProposal",
              name: user.name,
              phone: user.phone,
              option: {
                client: user.name,
                host: BACKHOST.slice(8, -5),
                path: "miniProposal",
                useid: useid,
              }
            }, "/alimTalk");

            // alimtalk 2
            await ajaxJson({
              method: "miniCompleteDesigner",
              name: designer.designer,
              phone: designer.information.phone,
              option: {
                designer: designer.designer,
                client: user.name,
              }
            }, "/alimTalk");

            whereQuery = { useid };
            updateQuery = {};
            updateQuery["request.status"] = "제안서 전송";
            updateQuery["response.status"] = "제안서 컨펌";
            updateQuery["request.alarm"] = false;
            updateQuery["response.alarm"] = false;

            await ajaxJson({ whereQuery, updateQuery }, "/updateUser");

            instance.users.find((obj) => { return obj.useid === useid }).request.status = "제안서 전송";
            instance.users.find((obj) => { return obj.useid === useid }).request.alarm = false;
            instance.users.find((obj) => { return obj.useid === useid }).response.status = "제안서 컨펌";
            instance.users.find((obj) => { return obj.useid === useid }).response.alarm = false;

            window.alert(user.name + " 고객님께 제안서 알림톡을 보냈습니다!");

            contentsLoad();

          } else {
            window.alert("현재 단계에서는 할 수 없습니다!");
          }

        } catch (e) {
          console.log(e);
        }
      },
      contextmenu: async function (e) {
        e.preventDefault();
        try {
        } catch (e) {
          console.log(e);
        }
      },
      green: (user) => { return user.response.design.length > 0; },
    },
    {
      name: "제안서 보기",
      click: async function (e) {
        try {
          const useid = this.getAttribute("useid");
          const user = instance.users.find((obj) => { return obj.useid === useid });
          if (user.response.design.length > 0) {
            blankHref(BACKHOST + "/middle/miniProposal?useid=" + useid);
          } else {
            window.alert("현재 단계에서는 할 수 없습니다!");
          }
        } catch (e) {
          console.log(e);
        }
      },
      contextmenu: function (e) {
        e.preventDefault();
        try {
        } catch (e) {
          console.log(e);
        }
      },
      green: (user) => { return user.response.design.length > 0; },
    },
    {
      name: "요청서 보기",
      click: async function (e) {
        try {
          const useid = this.getAttribute("useid");
          blankHref(BACKHOST + "/middle/miniRequest?useid=" + useid);
        } catch (e) {
          console.log(e);
        }
      },
      contextmenu: async function (e) {
        e.preventDefault();
        try {
        } catch (e) {
          console.log(e);
        }
      },
      green: (user) => { return true },
    },
    {
      name: "디자이너 지정",
      click: async function (e) {
        try {
          const useid = this.getAttribute("useid");
          const targets = miniDesigners.map((desid) => { return { designer: designers.find((obj) => { return obj.desid === desid }).designer, desid } });
          const mother = totalContents;
          const zIndex = 4;
          let cancelBack, whitePopup;
          let popupWidth, popupHeight;
          let whitePadding;
          let marginBottom;
          let bigTextTop, bigSize, bigWeight;
          let textBetween;
          let smallTextTop, smallSize, smallWeight;

          whitePadding = 20;
          popupWidth = 180;
          blockHeight = 45;
          marginBottom = 8;
          popupHeight = (blockHeight + marginBottom) * targets.length;

          bigTextTop = -1;
          bigSize = 16;
          bigWeight = 600;

          textBetween = 4;

          smallTextTop = 1;
          smallSize = 12;
          smallWeight = 400;

          cancelBack = {};
          whitePopup = {};

          cancelBack = createNode({
            mother,
            event: {
              click: function () {
                whitePopup.remove();
                cancelBack.remove();
              }
            },
            style: {
              position: "fixed",
              top: String(0),
              left: String(0),
              width: withOut(0, ea),
              height: withOut(0, ea),
              background: colorChip.black,
              opacity: String(0.3),
            }
          });

          whitePopup = createNode({
            mother,
            style: {
              position: "fixed",
              width: String(popupWidth) + ea,
              top: "calc(calc(calc(100% - " + String(belowHeight) + ea + ") / 2) - " + String(popupHeight / 2) + ea + ")",
              left: withOut(50, ((popupWidth + (whitePadding * 2)) / 2), ea),
              background: colorChip.white,
              padding: String(whitePadding) + ea,
              paddingBottom: String(whitePadding - marginBottom) + ea,
              borderRadius: String(5) + "px",
              boxShadow: "0px 3px 15px -9px " + colorChip.shadow,
              animation: "fadeuporiginal 0.3s ease forwards",
            }
          });

          for (let { designer, desid } of targets) {
            createNode({
              mother: whitePopup,
              attribute: { designer, desid, useid },
              event: {
                click: async function (e) {
                  try {
                    const desid = this.getAttribute("desid");
                    const designer = instance.designers.find((obj) => { return obj.desid === desid });
                    const name = designer.designer;
                    const phone = designer.information.phone;
                    const useid = this.getAttribute("useid");
                    const user = instance.users.find((obj) => { return obj.useid === useid });
                    let whereQuery, updateQuery;

                    whereQuery = { useid };
                    updateQuery = {};
                    updateQuery["desid"] = desid;
                    updateQuery["request.status"] = "디자인 대기";
                    updateQuery["response.status"] = "디자인 요청";

                    await ajaxJson({ whereQuery, updateQuery }, "/updateUser");

                    // alimtalk
                    await ajaxJson({
                      method: "miniRequest",
                      name: name,
                      phone: phone,
                      option: {
                        designer: name,
                        client: user.name,
                        host: BACKHOST.slice(8, -5),
                        path: "miniRequest",
                        useid: useid,
                      }
                    }, "/alimTalk");

                    instance.users.find((obj) => { return obj.useid === useid }).desid = desid;
                    instance.users.find((obj) => { return obj.useid === useid }).request.status = "디자인 대기";
                    instance.users.find((obj) => { return obj.useid === useid }).response.status = "디자인 요청";

                    window.alert(name + " 디자이너에게 홈리에종 미니 서비스 요청을 보냈습니다!");

                    whitePopup.remove();
                    cancelBack.remove();

                    contentsLoad();

                  } catch (e) {
                    console.log(e);
                  }
                }
              },
              style: {
                display: "flex",
                width: withOut(0, ea),
                height: String(blockHeight) + ea,
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "row",
                borderRadius: String(5) + "px",
                background: colorChip.gray1,
                marginBottom: String(marginBottom) + ea,
                cursor: "pointer",
              },
              children: [
                {
                  text: designer,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(bigTextTop) + ea,
                    fontSize: String(bigSize) + ea,
                    fontWeight: String(bigWeight),
                    color: colorChip.black,
                    marginRight: String(textBetween) + ea,
                  }
                },
                {
                  text: desid,
                  style: {
                    display: "inline-block",
                    position: "relative",
                    top: String(smallTextTop) + ea,
                    fontSize: String(smallSize) + ea,
                    fontWeight: String(smallWeight),
                    color: colorChip.green,
                  }
                }
              ]
            });
          }

        } catch (e) {
          console.log(e);
        }
      },
      contextmenu: async function (e) {
        e.preventDefault();
        try {
        } catch (e) {
          console.log(e);
        }
      },
      green: (user) => { return true },
    },
    {
      name: "가이드 보기",
      click: async function (e) {
        try {
          const useid = this.getAttribute("useid");
          blankHref(BACKHOST + "/middle/miniGuide?useid=" + useid);
        } catch (e) {
          console.log(e);
        }
      },
      contextmenu: async function (e) {
        e.preventDefault();
        try {
        } catch (e) {
          console.log(e);
        }
      },
      green: (user) => { return true },
    },
  ];

  grayBack = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(outerMargin) + ea,
      left: String(outerMargin) + ea,
      width: withOut(outerMargin * 2, ea),
      height: withOut((outerMargin * 2) + belowHeight, ea),
      background: colorChip.gray1,
      borderRadius: String(5) + "px",
    },
    children: [
      {
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          display: "block",
          width: withOut(0, ea),
          height: withOut(0, ea),
        },
        children: [
          {
            style: {
              position: "absolute",
              top: String(innerPadding) + ea,
              left: String(innerPadding) + ea,
              width: withOut(innerPadding * 2, ea),
              height: withOut(innerPadding * 2, ea),
              overflow: "scroll",
            },
            children: [
              {
                style: {
                  display: "block",
                  position: "relative",
                  width: withOut(0, ea),
                }
              }
            ]
          }
        ]
      }
    ]
  });

  grayTong = grayBack.firstChild.firstChild.firstChild;

  // column

  contentsLoad = () => {

    cleanChildren(grayTong);

    motherBlock = createNode({
      mother: grayTong,
      style: {
        display: "block",
        position: "sticky",
        top: String(0),
        zIndex: String(1),
        height: String(blockHeight) + ea,
        width: withOut(0, ea),
        overflow: "hidden",
        borderRadius: String(5) + "px",
        marginBottom: String(blockMargin) + ea,
      }
    });

    createNode({
      mother: motherBlock,
      style: {
        display: "inline-flex",
        width: String(blockHeight) + ea,
        position: "relative",
        height: String(blockHeight) + ea,
        background: colorChip.gradientGray,
        backdropFilter: "blur(4px)",
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        marginRight: String(blockMargin) + ea,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      children: [
        {
          style: {
            display: "inline-block",
            position: "relative",
            width: String(alarmCircleRadius) + ea,
            height: String(alarmCircleRadius) + ea,
            borderRadius: String(alarmCircleRadius) + ea,
            background: colorChip.gray4,
          }
        }
      ]
    });

    baseBlock = createNode({
      mother: motherBlock,
      style: {
        display: "inline-block",
        width: withOut(blockHeight + blockMargin, ea),
        position: "relative",
        height: String(blockHeight) + ea,
        background: colorChip.gradientGray,
        backdropFilter: "blur(4px)",
        borderRadius: String(5) + "px",
        verticalAlign: "top",
      },
      children: [
        {
          style: {
            display: "block",
            position: "relative",
            width: String(8000) + ea,
            height: withOut(0, ea),
          }
        },
      ]
    });
    targetTong = baseBlock.firstChild;
    createNode({
      mother: targetTong,
      text: "아이디",
      style: {
        width: String(idWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: '|',
      style: {
        width: String(barWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.gray4,
        top: String(textTop) + ea,
        marginLeft: String(barMargin) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "이름",
      style: {
        width: String(nameWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "연락처",
      style: {
        width: String(phoneWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "결제일",
      style: {
        width: String(timelineWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "상태 A",
      style: {
        width: String(status0Width) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "상태 B",
      style: {
        width: String(status1Width) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "공간",
      style: {
        width: String(targetsWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "디자이너",
      style: {
        width: String(designerWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });
    createNode({
      mother: targetTong,
      text: "이메일",
      style: {
        width: String(emailWidth) + ea,
        display: "inline-block",
        position: "relative",
        fontSize: String(textSize) + ea,
        fontWeight: String(700),
        color: colorChip.white,
        top: String(textTop) + ea,
        marginLeft: String(minimumBetween) + ea,
      }
    });

    for (let user of users) {

      motherBlock = createNode({
        mother: grayTong,
        attribute: {
          useid: user.useid,
        },
        style: {
          display: "block",
          position: "relative",
          height: String(blockHeight) + ea,
          width: withOut(0, ea),
          overflow: "hidden",
          borderRadius: String(5) + "px",
          marginBottom: String(blockMargin) + ea,
        }
      });

      createNode({
        mother: motherBlock,
        attribute: {
          useid: user.useid,
        },
        style: {
          display: "inline-flex",
          width: String(blockHeight) + ea,
          position: "relative",
          height: String(blockHeight) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
          marginRight: String(blockMargin) + ea,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        children: [
          {
            style: {
              display: "inline-block",
              position: "relative",
              width: String(alarmCircleRadius) + ea,
              height: String(alarmCircleRadius) + ea,
              borderRadius: String(alarmCircleRadius) + ea,
              background: (user.response.status === "지정 필요" || user.response.status === "컨펌 대기") ? colorChip.red : colorChip.gradientGreen,
            }
          }
        ]
      });

      baseBlock = createNode({
        mother: motherBlock,
        attribute: {
          useid: user.useid,
        },
        style: {
          display: "inline-block",
          width: withOut(blockHeight + blockMargin, ea),
          position: "relative",
          height: String(blockHeight) + ea,
          background: colorChip.white,
          borderRadius: String(5) + "px",
          verticalAlign: "top",
        },
        children: [
          {
            attribute: {
              useid: user.useid,
            },
            style: {
              display: "block",
              position: "relative",
              width: String(8000) + ea,
              height: withOut(0, ea),
            }
          },
        ]
      });

      num = 0;
      for (let { name, click, contextmenu, green } of buttonList) {
        createNode({
          mother: baseBlock,
          attribute: {
            useid: user.useid,
          },
          event: { click, contextmenu },
          style: {
            display: "inline-flex",
            position: "absolute",
            width: String(buttonWidth) + ea,
            height: String(buttonHeight) + ea,
            right: String(buttongTop + ((buttonWidth + buttonBetween) * num)) + ea,
            top: String(buttongTop) + ea,
            borderRadius: String(5) + "px",
            background: green(user) ? colorChip.gradientGreen : colorChip.gradientGray,
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
          children: [
            {
              text: name,
              style: {
                position: "relative",
                top: String(buttonTextTop) + ea,
                color: colorChip.white,
                fontSize: String(buttonSize) + ea,
                fontWeight: String(buttonWeight),
              }
            }
          ]
        });
        num++;
      }

      targetTong = baseBlock.firstChild;
      createNode({
        mother: targetTong,
        text: user.useid,
        style: {
          width: String(idWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: '|',
        style: {
          width: String(barWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.gray4,
          top: String(textTop) + ea,
          marginLeft: String(barMargin) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: user.name,
        style: {
          width: String(nameWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: user.phone,
        style: {
          width: String(phoneWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: dateToString(user.request.timeline, true),
        style: {
          width: String(timelineWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: user.request.status,
        style: {
          width: String(status0Width) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: user.response.status,
        style: {
          width: String(status1Width) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: String(user.request.space.targets) + "개",
        style: {
          width: String(targetsWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: /^d/.test(user.desid) ? designers.find((obj) => { return obj.desid === user.desid }).designer : "미지정",
        style: {
          width: String(designerWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });
      createNode({
        mother: targetTong,
        text: user.email,
        style: {
          width: String(emailWidth) + ea,
          display: "inline-block",
          position: "relative",
          fontSize: String(textSize) + ea,
          fontWeight: String(400),
          color: colorChip.black,
          top: String(textTop) + ea,
          marginLeft: String(minimumBetween) + ea,
        }
      });

    }

  }

  contentsLoad();


}

CalculationJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, equalJson } = GeneralJs;
  try {
    let users;
    let designers;

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    users = await ajaxJson({ whereQuery: {} }, "/getUsers", { equal: true });
    designers = await ajaxJson({ noFlat: true, whereQuery: {} }, "/getDesigners", { equal: true });
    miniDesigners = [
      "d2104_aa02s",
      "d1904_aa12s",
      "d1908_aa02s"
    ];

    this.users = users;
    this.designers = designers;
    this.miniDesigners = miniDesigners;

    this.baseMaker();

    document.getElementById("moveLeftArea").remove();
    document.getElementById("moveRightArea").remove();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
