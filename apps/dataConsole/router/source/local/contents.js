const ContentsJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.grayBarWidth = null;
  this.belowHeight = null;
  this.whiteBox = null;
  this.totalMother = null;
  this.totalFather = null;
  this.ea = "px";
}

ContentsJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, belowHeight } = this;
  const { contentsArr } = this;
  const { createNode, withOut, colorChip } = GeneralJs;
  const photoChar = 't';
  let totalMother;
  let scrollTong;
  let tongPaddingLeft;

  tongPaddingLeft = 30;

  totalMother = createNode({
    mother: totalContents,
    class: [ "totalMother" ],
    style: {
      display: "block",
      position: "relative",
      width: String(100) + '%',
      height: withOut(belowHeight, ea),
    }
  });

  this.totalMother = totalMother;

  scrollTong = createNode({
    mother: totalMother,
    style: {
      width: withOut(tongPaddingLeft * 2, ea),
      height: "auto",
      position: "relative",
      padding: String(tongPaddingLeft) + ea,
    }
  });

  this.scrollTong = scrollTong;
  this.spreadContents();

}

ContentsJs.prototype.spreadContents = function (search = null) {
  const instance = this;
  const { ea, totalContents, scrollTong } = this;
  const { contentsArr, designers, clients } = this;
  const { createNode, withOut, colorChip, cleanChildren } = GeneralJs;
  const photoChar = 't';
  let boxMargin;
  let boxNumber, boxWidth;
  let num;
  let pidFontSize, pidFontWeight, pidTextTop;
  let pidPaddingLeft, pidPaddingTop, pidPaddingBottom;
  let tongPaddingLeft;
  let contentsTong;
  let designer, client;
  let boo;

  tongPaddingLeft = 30;

  boxMargin = 10;
  boxWidth = 250;
  pidFontSize = 15;
  pidFontWeight = 400;
  pidTextTop = -4;
  pidPaddingLeft = 13;
  pidPaddingTop = 9;
  pidPaddingBottom = 6;

  boxNumber = Math.floor((window.innerWidth - (tongPaddingLeft * 2) + boxMargin) / (boxMargin + boxWidth));
  boxWidth = (window.innerWidth - (tongPaddingLeft * 2) + boxMargin - (boxNumber * boxMargin)) / boxNumber;

  cleanChildren(scrollTong);

  if (typeof search === "string") {
    contentsTong = [];
    for (let contents of contentsArr) {
      designer = designers.search("desid", contents.desid);
      client = designers.search("cliid", contents.cliid);

      boo = false;
      if (contents.contents.portfolio.detailInfo.tag.some((str) => { return (new RegExp(search, "gi")).test(str) })) {
        boo = true;
      }
      if ((new RegExp(search, "gi")).test(designer.designer)) {
        boo = true;
      }
      if (client !== null) {
        if ((new RegExp(search, "gi")).test(client.name)) {
          boo = true;
        }
      }

      if (boo) {
        contentsTong.push(contents);
      }
    }

  } else {
    contentsTong = contentsArr.toNormal();
  }

  num = 0;
  this.conidTong = [];
  this.contentsTong = contentsTong;
  for (let contents of contentsTong) {
    createNode({
      mother: scrollTong,
      attribute: {
        conid: contents.conid,
        proid: contents.proid,
        desid: contents.desid,
        cliid: contents.cliid,
      },
      event: {
        mouseenter: function (e) {
          this.style.background = colorChip.liteGreen;
          this.firstChild.style.color = colorChip.green;
        },
        mouseleave: function (e) {
          this.style.background = colorChip.gray1;
          this.firstChild.style.color = colorChip.deactive;
        },
        click: this.whitePopupEvent(contents.conid),
      },
      style: {
        display: "inline-block",
        width: String(boxWidth) + ea,
        background: colorChip.gray1,
        marginRight: String(num % boxNumber === boxNumber - 1 ? 0 : boxMargin) + ea,
        marginBottom: String(boxMargin) + ea,
        cursor: "pointer",
        borderRadius: String(5) + "px",
        verticalAlign: "top",
        overflow: "hidden",
      },
      children: [
        {
          text: contents.contents.portfolio.pid,
          style: {
            position: "relative",
            fontFamily: "graphik",
            fontSize: String(pidFontSize) + ea,
            fontWeight: String(pidFontWeight),
            color: colorChip.deactive,
            top: String(pidTextTop) + ea,
            transition: "all 0.5s ease",
            paddingLeft: String(pidPaddingLeft) + ea,
            paddingTop: String(pidPaddingTop) + ea,
            paddingBottom: String(pidPaddingBottom) + ea
          }
        },
        {
          mode: "img",
          attribute: {
            src: `${S3HOST}/corePortfolio/listImage/${contents.contents.portfolio.pid}/${photoChar + String(contents.contents.portfolio.detailInfo.photodae[1]) + contents.contents.portfolio.pid + ".jpg"}`,
          },
          style: {
            position: "relative",
            width: String(100) + '%',
          }
        }
      ]
    });
    num++;
    this.conidTong.push(contents.conid);
  }

}

ContentsJs.prototype.whitePopupEvent = function (conid) {
  const instance = this;
  const { ea, totalMother, belowHeight, contentsArr, clients, designers, projects, whitePopupClassName } = this;
  const { createNode, withOut, colorChip, ajaxJson, setQueue, serviceParsing, cleanChildren, isMac, fireEvent } = GeneralJs;
  const photoChar = 't';
  const blank = "&nbsp;&nbsp;/&nbsp;&nbsp;";
  const serviceName = serviceParsing().name;
  const tendencyConst = 10;
  const relativeConst = 10;
  const tagMultiplyConst = 3;
  const tendencyKey = [
    {
      target: "style",
      name: "스타일 경향성",
      order: [
        "modern",
        "classic",
        "natural",
        "mixmatch",
        "scandinavian",
        "vintage",
        "oriental",
        "exotic",
      ],
      map: {
        modern: "모던",
        classic: "클래식",
        natural: "내추럴",
        mixmatch: "믹스매치",
        scandinavian: "북유럽",
        vintage: "빈티지",
        oriental: "오리엔탈",
        exotic: "이그저틱",
      }
    },
    {
      target: "texture",
      name: "텍스처 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "coating",
        "metal",
      ],
      map: {
        darkWood: "진한 우드",
        whiteWood: "연한 우드",
        coating: "도장",
        metal: "금속",
      }
    },
    {
      target: "color",
      name: "컬러톤 경향성",
      order: [
        "darkWood",
        "whiteWood",
        "highContrast",
        "vivid",
        "white",
        "mono",
        "bright",
        "dark",
      ],
      map: {
        darkWood: "다크 우드",
        whiteWood: "밝은 우드",
        highContrast: "고대비",
        vivid: "비비드",
        white: "화이트",
        mono: "모노톤",
        bright: "밝은톤",
        dark: "어두운톤",
      }
    },
    {
      target: "density",
      name: "밀도 경향성",
      order: [
        "maximun",
        "minimum",
      ],
      map: {
        maximun: "맥시멈",
        minimum: "미니멈",
      }
    },
  ];
  const tagAmplification = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tag } } } } = contents;
    const filtered = [ ...new Set(tag.concat(tag.map((str) => {
      return str.replace(/한$/gi, '').replace(/적인$/gi, '').replace(/스러운$/gi, '').replace(/가구$/gi, '').replace(/인테리어$/gi, '').replace(/있는$/gi, '');
    }))) ];
    filtered.conid = conid;
    return filtered;
  }
  const tendencySpread = (contents) => {
    const { conid, proid, cliid, desid, contents: { portfolio: { detailInfo: { tendency } } } } = contents;
    let values;
    values = [];
    for (let { target, order } of tendencyKey) {
      for (let key of order) {
        values.push(tendency[target][key]);
      }
    }
    values.conid = conid;
    return values;
  }
  return function (e) {
    const contents = contentsArr.search("conid", conid);
    const { cliid, proid, desid } = contents;
    const { photos, contents: { portfolio: { pid, detailInfo: { tag, tendency } } } } = contents;
    const client = clients.search("cliid", cliid);
    const designer = designers.search("desid", desid);
    const project = projects.search("proid", proid);
    let cancelBack, whiteBoard;
    let cancelEvent;
    let margin;
    let zIndex;
    let innerMargin;
    let mainTong, leftTong, rightTong;
    let source;
    let photoMargin;
    let seroNum;
    let titleSize, titleWeight;
    let titleMarginBottom;
    let subTitleSize, subTitleWeight;
    let tagTong;
    let tagTongMarginTop, tagTongPadding;
    let tagSize, tagWeight;
    let tagPaddingLeft;
    let tagBetween;
    let tagPaddingTop, tagPaddingBottom;
    let tendencyTong;
    let tendencyTitleWeight;
    let tendencyTitleMarginTop;
    let tendencyTitleMarginBottom;
    let tendencyBarHeight;
    let tendencyBarMarginBottom;
    let tendencyFactorSize, tendencyFactorWeight;
    let tendencyFactorWidth;
    let standardTag;
    let totalTag;
    let firstFiltered;
    let standardTendency;
    let totalTendency;
    let relativeTong;
    let relativeColumn;
    let relativeBetween;
    let j;
    let relativeTitleMarginBottom;
    let tagNum;
    let tagGreenBoo;
    let tagWhiteGreenBoo;
    let tagMaker;

    margin = 30;
    zIndex = 2;
    innerMargin = 40;
    photoMargin = 10;

    titleSize = 28;
    titleWeight = 400;
    titleMarginBottom = 6;

    subTitleSize = 15;
    subTitleWeight = 400;

    tagTongMarginTop = 18;
    tagTongPadding = 16;

    tagSize = 13;
    tagWeight = 400;
    tagPaddingLeft = 12;
    tagBetween = 4;
    tagPaddingTop = 6;
    tagPaddingBottom = 8;

    tendencyTitleWeight = 600;
    tendencyTitleMarginTop = 26;
    tendencyTitleMarginBottom = 8;

    tendencyBarHeight = 14;
    tendencyBarMarginBottom = 3;

    tendencyFactorSize = 12;
    tendencyFactorWeight = 400;
    tendencyFactorWidth = 90;

    relativeColumn = 4;
    relativeBetween = 8;
    relativeTitleMarginBottom = 12;

    cancelEvent = function (e) {
      totalMother.removeChild(totalMother.lastChild);
      totalMother.removeChild(totalMother.lastChild);
    }

    instance.cancelEvent = cancelEvent;

    cancelBack = createNode({
      mother: totalMother,
      event: {
        click: cancelEvent
      },
      style: {
        position: "fixed",
        background: colorChip.black,
        opacity: String(0),
        top: String(0),
        left: String(0),
        width: String(100) + '%',
        height: withOut(belowHeight, ea),
        animation: "justfadein 0.3s ease forwards",
        zIndex: String(zIndex),
      }
    });

    whiteBoard = createNode({
      mother: totalMother,
      class: [ whitePopupClassName ],
      attribute: {
        conid,
      },
      style: {
        position: "fixed",
        background: colorChip.white,
        borderRadius: String(5) + ea,
        top: String(margin) + ea,
        left: String(margin) + ea,
        width: withOut(margin * 2, ea),
        height: withOut(margin * 2 + belowHeight, ea),
        boxShadow: "0px 3px 15px -9px " + colorChip.darkShadow,
        animation: "fadeuphard 0.3s ease forwards",
        zIndex: String(zIndex),
      }
    });

    mainTong = createNode({
      mother: whiteBoard,
      style: {
        padding: String(innerMargin) + ea,
        width: withOut(innerMargin * 2, ea),
        height: withOut(innerMargin * 2, ea),
        position: "relative",
        display: "block",
      }
    });

    leftTong = createNode({
      mother: mainTong,
      style: {
        display: "inline-block",
        width: String(50) + '%',
        height: String(100) + '%',
        position: "relative",
        overflow: "scroll"
      },
      children: [
        {
          style: {
            display: "block",
          }
        }
      ]
    }).firstChild;

    seroNum = 0;
    for (let { index, gs } of photos.detail) {
      source = `${S3HOST}/corePortfolio/listImage/${pid}/${photoChar + String(index) + pid + ".jpg"}`;
      createNode({
        mother: leftTong,
        mode: "img",
        attribute: {
          src: source,
        },
        style: {
          display: "inline-block",
          width: (gs === 'g' ? `calc(calc(calc(100% - ${String(photoMargin * 4)}${ea}) / ${String(4)}) * 2)` : `calc(calc(100% - ${String(photoMargin * 4)}${ea}) / ${String(4)})`),
          marginRight: gs === 'g' ? String(photoMargin) + ea : (seroNum % 2 === 0 ? 0 : String(photoMargin) + ea),
          marginBottom: String(photoMargin) + ea,
          borderRadius: String(5) + "px",
        }
      });
      if (gs === 's') {
        seroNum++;
      }
    }

    rightTong = createNode({
      mother: mainTong,
      style: {
        display: "inline-block",
        width: String(50) + '%',
        height: String(100) + '%',
        position: "relative",
        overflow: "scroll",
      }
    });

    createNode({
      mother: rightTong,
      attribute: {
        pid,
        conid,
      },
      event: {
        click: async function (e) {
          try {
            const pid = this.getAttribute("pid");
            const conid = this.getAttribute("conid");
            let whereQuery, updateQuery;
            
            whereQuery = { conid };
            updateQuery = {};
            updateQuery.complete = true;
            updateQuery.date = new Date();

            await ajaxJson({ mode: "update", whereQuery, updateQuery }, BACKHOST + "/updateContentsStatus");
            instance.contentsStatus = await ajaxJson({ mode: "get", whereQuery: {} }, BACKHOST + "/updateContentsStatus");

            fireEvent(cancelBack, "click");

          } catch (e) {
            console.log(e);
          }
        }
      },
      style: {
        top: String(8) + ea,
        right: String(0),
        width: String(108) + ea,
        height: String(30) + ea,
        display: "inline-flex",
        position: "absolute",
        background: colorChip.gradientGreen,
        borderRadius: String(5) + "px",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      child: {
        text: "스타일 체크 완료",
        style: {
          display: "inline-block",
          position: "relative",
          top: String(isMac() ? -1 : 1) + ea,
          fontSize: String(13) + ea,
          fontWeight: String(700),
          color: colorChip.white,
        }
      }
    })

    createNode({
      mother: rightTong,
      text: pid,
      style: {
        fontSize: String(titleSize) + ea,
        fontWeight: String(titleWeight),
        fontFamily: "graphik",
        color: colorChip.black,
        marginBottom: String(titleMarginBottom) + ea,
      }
    });

    createNode({
      mother: rightTong,
      text: (!(client?.name) ? "" : client.name + " 고객님" + blank) + designer.designer + " 디자이너님",
      style: {
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(subTitleWeight),
        color: colorChip.black,
        paddingLeft: String(1) + ea,
      }
    });

    // tag
    tagTong = createNode({
      mother: rightTong,
      attribute: {
        conid: conid,
      },
      event: {
        click: async function (e) {
          try {
            if (!e.altKey) {
              const conid = this.getAttribute("conid");
              const tag = [ ...this.children ].map((dom) => { return dom.textContent });
              const newTagName = window.prompt("태그명을 입력해주세요!");
              let whereQuery, updateQuery;

              if (newTagName !== '' && newTagName !== null) {

                tag.push(newTagName);
                instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tag.push(newTagName);
                whereQuery = { conid };
                updateQuery = {};
                updateQuery["contents.portfolio.detailInfo.tag"] = tag;
                await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                createNode({
                  mother: this,
                  text: newTagName,
                  style: {
                    display: "inline-block",
                    fontSize: String(tagSize) + ea,
                    fontWeight: String(tagWeight),
                    color: colorChip.black,
                    paddingLeft: String(tagPaddingLeft) + ea,
                    paddingRight: String(tagPaddingLeft) + ea,
                    paddingTop: String(tagPaddingTop) + ea,
                    paddingBottom: String(tagPaddingBottom) + ea,
                    background: colorChip.white,
                    borderRadius: String(5) + "px",
                    marginRight: String(tagBetween) + ea,
                    marginBottom: String(tagBetween) + ea,
                  }
                });

              }
            } else {
              e.preventDefault();
              const conid = this.getAttribute("conid");
              const tag = [ ...this.children ].map((dom) => { return dom.textContent });
              let target, targetTag, tong;
              let whereQuery, updateQuery;
              if (e.target !== this) {
                if (e.target.parentElement === this) {
                  target = e.target;
                } else {
                  target = e.target.parentElement;
                }
                targetTag = target.textContent.trim();
                tong = [];
                for (let t of tag) {
                  if (targetTag !== t) {
                    tong.push(t);
                  }
                }
                instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tag = tong;
                whereQuery = { conid };
                updateQuery = {};
                updateQuery["contents.portfolio.detailInfo.tag"] = tong;
                await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");
                target.remove();
              }
            }
          } catch (e) {
            console.log(e);
          }
        },
        contextmenu: function (e) {
          try {
            e.preventDefault();
            e.stopPropagation();
          } catch (e) {
            console.log(e);
          }
        }
      },
      style: {
        display: "block",
        background: colorChip.gray2,
        borderRadius: String(5) + "px",
        marginTop: String(tagTongMarginTop) + ea,
        padding: String(tagTongPadding) + ea,
        paddingBottom: String(tagTongPadding - tagBetween) + ea,
        cursor: "pointer",
      }
    });

    tagMaker = () => {
      cleanChildren(tagTong);
      tagNum = 0;
      for (let t of tag) {

        tagGreenBoo = false;
        if (tagNum >= 5 && tagNum < 10) {
          tagGreenBoo = true;
        }

        tagWhiteGreenBoo = false;
        if (tagNum >= 10 && tagNum < 17) {
          tagWhiteGreenBoo = true;
        }

        createNode({
          mother: tagTong,
          text: t,
          attribute: {
            conid: conid,
            value: t,
            index: String(tagNum),
          },
          event: {
            contextmenu: async function (e) {
              e.preventDefault();
              e.stopPropagation();
              try {
                const conid = this.getAttribute("conid");
                const value = this.getAttribute("value");
                const index = Number(this.getAttribute("index"));
                let whereQuery, updateQuery;

                tag.splice(index, 1);
                tag.splice(5, 0, value);

                whereQuery = { conid };
                updateQuery = {};
                updateQuery["contents.portfolio.detailInfo.tag"] = tag;
                await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                tagMaker();
              } catch (e) {
                console.log(e);
              }
            }
          },
          style: {
            display: "inline-block",
            fontSize: String(tagSize) + ea,
            fontWeight: String(tagWeight),
            color: tagGreenBoo ? colorChip.white : colorChip.black,
            paddingLeft: String(tagPaddingLeft) + ea,
            paddingRight: String(tagPaddingLeft) + ea,
            paddingTop: String(tagPaddingTop) + ea,
            paddingBottom: String(tagPaddingBottom) + ea,
            background: tagGreenBoo ? colorChip.green : (tagWhiteGreenBoo ? colorChip.whiteGreen : colorChip.white),
            borderRadius: String(5) + "px",
            marginRight: String(tagBetween) + ea,
            marginBottom: String(tagBetween) + ea,
          }
        });

        tagNum++;
      }
    }

    tagMaker();

    if (project !== null) {
      createNode({
        mother: rightTong,
        style: {
          display: "block",
          background: colorChip.gray2,
          borderRadius: String(5) + "px",
          marginTop: String(tagBetween) + ea,
          padding: String(tagTongPadding) + ea,
          paddingBottom: String(tagTongPadding - tagBetween) + ea,
        },
        children: [
          {
            text: serviceName[Number(project.service.serid.split('_')[1].replace(/[^0-9]/gi, '')) - 1],
            style: {
              display: "inline-block",
              fontSize: String(tagSize) + ea,
              fontWeight: String(tagWeight),
              color: colorChip.black,
              paddingLeft: String(tagPaddingLeft) + ea,
              paddingRight: String(tagPaddingLeft) + ea,
              paddingTop: String(tagPaddingTop) + ea,
              paddingBottom: String(tagPaddingBottom) + ea,
              background: colorChip.white,
              borderRadius: String(5) + "px",
              marginRight: String(tagBetween) + ea,
              marginBottom: String(tagBetween) + ea,
            }
          }
        ]
      });
    }

    // tendency
    for (let { target, name, order, map } of tendencyKey) {
      createNode({
        mother: rightTong,
        text: name,
        style: {
          fontSize: String(subTitleSize) + ea,
          fontWeight: String(tendencyTitleWeight),
          color: colorChip.black,
          marginTop: String(tendencyTitleMarginTop) + ea,
          marginBottom: String(tendencyTitleMarginBottom) + ea,
        }
      });
      for (let key of order) {
        tendencyTong = createNode({
          mother: rightTong,
          style: {
            display: "block",
            height: String(tendencyBarHeight) + ea,
            marginBottom: String(tendencyBarMarginBottom) + ea,
          },
          children: [
            {
              text: map[key],
              style: {
                display: "inline-flex",
                fontSize: String(tendencyFactorSize) + ea,
                fontWeight: String(tendencyFactorWeight),
                color: colorChip.black,
                width: String(tendencyFactorWidth) + ea,
                height: String(100) + '%',
                textAlign: "left",
                alignItems: "center",
                verticalAlign: "top",
              }
            },
            {
              style: {
                display: "inline-block",
                position: "relative",
                width: withOut(tendencyFactorWidth, ea),
                height: String(100) + '%',
                verticalAlign: "top",
                overflow: "hidden",
                background: colorChip.gray1,
                borderRadius: String(3) + "px",
              }
            }
          ]
        }).children[1];

        for (let i = 0; i < tendencyConst; i++) {
          createNode({
            mother: tendencyTong,
            class: [ target + "_" + key ],
            attribute: {
              conid: conid,
              target: target,
              key: key,
              value: String(i + 1),
              past: String(i < tendency[target][key] ? 1 : 0),
            },
            event: {
              click: async function (e) {
                try {
                  const conid = this.getAttribute("conid");
                  const target = this.getAttribute("target");
                  const key = this.getAttribute("key");
                  const sibling = [ ...document.querySelectorAll('.' + target + '_' + key) ];
                  const index = Number(this.getAttribute("value"));
                  let whereQuery, updateQuery;

                  whereQuery = { conid };
                  updateQuery = {};
                  updateQuery["contents.portfolio.detailInfo.tendency." + target + "." + key] = index;
                  instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tendency[target][key] = index;
                  await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                  for (let i = 0; i < tendencyConst; i++) {
                    sibling[i].style.opacity = String(i < index ? 1 : 0);
                  }
                  this.setAttribute("past", String(1));

                } catch (e) {
                  console.log(e);
                }
              },
              contextmenu: async function (e) {
                try {
                  e.preventDefault();
                  const conid = this.getAttribute("conid");
                  const target = this.getAttribute("target");
                  const key = this.getAttribute("key");
                  const sibling = [ ...document.querySelectorAll('.' + target + '_' + key) ];
                  const index = 0;
                  let whereQuery, updateQuery;

                  whereQuery = { conid };
                  updateQuery = {};
                  updateQuery["contents.portfolio.detailInfo.tendency." + target + "." + key] = index;
                  instance.contentsArr.search("conid", conid).contents.portfolio.detailInfo.tendency[target][key] = index;
                  await ajaxJson({ whereQuery, updateQuery }, "/rawUpdateContents");

                  for (let i = 0; i < tendencyConst; i++) {
                    sibling[i].style.opacity = String(i < index ? 1 : 0);
                  }
                  this.setAttribute("past", String(0));

                } catch (e) {
                  console.log(e);
                }
              },
              mouseenter: function (e) {
                this.setAttribute("past", this.style.opacity);
                this.style.opacity = String(0.4);
              },
              mouseleave: function (e) {
                this.style.opacity = this.getAttribute("past");
              }
            },
            style: {
              display: "inline-block",
              height: String(100) + '%',
              width: "calc(100% / " + String(tendencyConst) + ")",
              background: colorChip.green,
              opacity: String(i < tendency[target][key] ? 1 : 0),
              cursor: "pointer",
              transition: "all 0s ease",
            }
          });
        }
      }
    }

    // relative
    standardTag = tagAmplification(contents);

    totalTag = instance.contentsArr.toNormal().map((obj) => {
      return tagAmplification(obj);
    }).map((arr) => {
      let num;
      num = 0;
      for (let i of arr) {
        if (standardTag.includes(i)) {
          num++;
        }
      }
      arr.number = num;
      return arr;
    });

    totalTag.sort((a, b) => { return b.number - a.number });
    firstFiltered = totalTag.slice(1).slice(0, relativeConst * tagMultiplyConst).map((arr) => { return arr.conid }).map((conid) => {
      return instance.contentsArr.search("conid", conid);
    });

    standardTendency = tendencySpread(contents);
    totalTendency = firstFiltered.map((obj) => {
      return tendencySpread(obj);
    }).map((arr) => {
      let num;
      num = 0;
      for (let i = 0; i < arr.length; i++) {
        num = num + (standardTendency[i] - arr[i]);
      }
      num = num / arr.length;
      arr.number = Math.abs(num);
      return arr;
    });
    totalTendency.sort((a, b) => { return a.number - b.number });

    secondFiltered = totalTendency.slice(0, relativeConst).map((arr) => { return arr.conid }).map((conid) => {
      return instance.contentsArr.search("conid", conid);
    });

    createNode({
      mother: rightTong,
      text: "유사한 포트폴리오",
      style: {
        fontSize: String(subTitleSize) + ea,
        fontWeight: String(tendencyTitleWeight),
        color: colorChip.black,
        marginTop: String(tendencyTitleMarginTop) + ea,
        marginBottom: String(relativeTitleMarginBottom) + ea,
      }
    });

    relativeTong = createNode({
      mother: rightTong,
      style: {
        position: "relative",
        display: "block",
      }
    })

    j = 0;
    for (let { conid: c, contents: { portfolio: { pid, detailInfo: { photodae: [ sero, garo ] } } } } of secondFiltered) {
      createNode({
        mother: relativeTong,
        mode: "img",
        class: [ "hoverDefault_lite" ],
        attribute: {
          src: `${S3HOST}/corePortfolio/listImage/${pid}/${photoChar + String(garo) + pid + ".jpg"}`,
          pid: pid,
          conid: c
        },
        event: {
          click: function (e) {
            const thisConid = this.getAttribute("conid");
            setQueue(() => {
              const func = instance.whitePopupEvent(thisConid);
              func.call(window, e);
            });
            cancelEvent.call(this, e);
          }
        },
        style: {
          display: "inline-block",
          width: "calc(calc(100% - " + String(relativeBetween * (relativeColumn - 1)) + ea + ") / " + String(relativeColumn) + ")",
          marginRight: String(j % relativeColumn === relativeColumn - 1 ? 0 : relativeBetween) + ea,
          marginBottom: String(relativeBetween) + ea,
          borderRadius: String(5) + "px",
        }
      });
      j++;
    }

  }
}

ContentsJs.prototype.launching = async function () {
  const instance = this;
  const { ajaxJson, setQueue } = GeneralJs;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;

    const loading = await this.mother.loadingRun();

    class SearchArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          this.push(i);
        }
      }
      search(target, value) {
        let obj = null;
        for (let i of this) {
          if (i[target] === value) {
            obj = i;
          }
        }
        return obj;
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    const contentsArr = await ajaxJson({ noFlat: true, whereQuery: {} }, "/getContents", { equal: true });
    const projects = await ajaxJson({ noFlat: true, whereQuery: { $or: contentsArr.map((obj) => { return { proid: obj.proid } }) } }, "/getProjects", { equal: true });
    const clients = await ajaxJson({ noFlat: true, whereQuery: { $or: projects.map((obj) => { return { cliid: obj.cliid } }) } }, "/getClients", { equal: true });
    const designers = await ajaxJson({ noFlat: true, whereQuery: { $or: contentsArr.map((obj) => { return { desid: obj.desid } }) } }, "/getDesigners", { equal: true });

    this.contentsStatus = await ajaxJson({ mode: "get", whereQuery: {} }, BACKHOST + "/updateContentsStatus");
    this.contentsArr = new SearchArray(contentsArr);
    this.clients = new SearchArray(clients);
    this.projects = new SearchArray(projects);
    this.designers = new SearchArray(designers);
    this.whitePopupClassName = "whitePopupClassName";

    loading.parentElement.removeChild(loading);

    this.baseMaker();

    window.addEventListener("resize", (e) => {
      window.location.reload();
    });
    this.searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        if (this.value.trim() === '') {
          instance.spreadContents();
        } else {
          instance.spreadContents(this.value.trim());
        }
      }
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (document.querySelector('.' + instance.whitePopupClassName) !== null) {
          if (Array.isArray(instance.conidTong)) {
            let func, next;
            if (e.key === "ArrowRight") {
              next = instance.conidTong[instance.conidTong.findIndex((c) => { return c === document.querySelector('.' + instance.whitePopupClassName).getAttribute("conid") }) + 1];
              if (next === undefined) {
                next = instance.conidTong[0];
              }
            } else {
              next = instance.conidTong[instance.conidTong.findIndex((c) => { return c === document.querySelector('.' + instance.whitePopupClassName).getAttribute("conid") }) - 1];
              if (next === undefined) {
                next = instance.conidTong[instance.conidTong.length - 1];
              }
            }
            setQueue(() => {
              func = instance.whitePopupEvent(next);
              func.call(window, e);
            });
            instance.cancelEvent.call(window, e);
          }
        }
      }
    });

  } catch (e) {
    console.log(e);
  }
}
