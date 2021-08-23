const BillJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.totalMother = null;
  this.totalFather = null;
  this.whiteBox = null;
  this.onView = "mother";
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
  this.media = GeneralJs.stacks.updateMiddleMedialQueryConditions;
}

BillJs.prototype.cardViewMaker = function (force = false) {
  const instance = this;

  return async function (e) {
    const { totalContents, totalMother } = instance;

    if (instance.whiteBox !== null) {
      if (GeneralJs.stacks.whiteBox !== 1) {
        instance.whiteBox.cancelBox.click();
      }
    }

    if (instance.totalFather !== null) {

      instance.totalFather.style.zIndex = String(1);
      if (instance.totalMother !== null && instance.totalMother !== undefined) {
        instance.totalMother.classList.remove("justfadeinoriginal");
        instance.totalMother.classList.add("justfadeoutoriginal");
      }
      instance.totalFather.classList.remove("fadeout");
      instance.totalFather.classList.add("fadein");

    } else {

      if (instance.totalMother !== null && instance.totalMother !== undefined) {
        instance.totalMother.classList.remove("justfadeinoriginal");
        instance.totalMother.classList.add("justfadeoutoriginal");
      }

      const ea = "px";
      const { createNodes, colorChip, withOut } = GeneralJs;
      const modeHref = (mode) => { window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}?mode=${mode}`; }
      const cards = [
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>고객 정렬", event: (e) => { modeHref("aspirant"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>프로젝트 정렬", event: (e) => { modeHref("general"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>디자이너 정렬", event: (e) => { modeHref("calculation"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>전체 보기", event: (e) => { modeHref("price"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>출장비 제작", event: (e) => { modeHref("calendar"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>서비스비 제작", event: (e) => { modeHref("checklist"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>시공 견적 제작", event: (e) => { modeHref("contents"); } },
        { name: "<b style=\"font-weight:100;color:" + colorChip.black + "\">견적서</b><br>일반 용도 제작", event: (e) => { modeHref("report"); } },
      ];
      let totalFather, tong, nodeArr;
      let tempObj;
      let topMargin, leftMargin;
      let margin;
      let width, height;
      let sqrt;

      topMargin = 42;
      leftMargin = 42;
      margin = 12;

      [ totalFather, tong ] = createNodes([
        {
          mother: totalContents,
          class: !force ? [ "totalFather", "fadein" ] : [ "totalFather" ],
          style: {
            zIndex: String(1),
            background: colorChip.gradientGreen3,
            overflow: "hidden",
          }
        },
        {
          mother: -1,
          style: {
            position: "relative",
            top: String(topMargin) + ea,
            left: String(leftMargin) + ea,
            width: withOut(leftMargin * 2, ea),
            height: withOut(topMargin * 2, ea)
          }
        }
      ]);

      for (let i = 0; i < cards.length; i++) {
        nodeArr = createNodes([
          {
            mother: tong,
            text: cards[i].name,
            class: [ "hoverDefault_lite" ],
            events: [
              {
                type: "click",
                event: cards[i].event
              },
            ],
            style: {
              display: "inline-block",
              position: "relative",
              width: "calc(calc(100% - " + String(margin * ((cards.length / 2) - 1)) + ea + ") / " + String(cards.length / 2) + ")",
              height: "calc(50% - " + String(margin) + ea + ")",
              background: colorChip.white,
              borderRadius: String(5) + "px",
              marginRight: ((i % (cards.length / 2)) === (cards.length / 2) - 1) ? String(0) + ea : String(margin) + ea,
              cursor: "pointer",
              boxShadow: "0px 3px 12px -9px " + colorChip.deactive,
              marginBottom: (i < (cards.length / 2)) ? String(margin) + ea : String(0) + ea,
            }
          },
          {
            mother: -1,
            text: String(i + 1),
            style: {
              position: "absolute",
              fontSize: String(25) + ea,
              fontWeight: String(100),
              top: String(GeneralJs.isMac() ? 16 : 20) + ea,
              left: String(29) + ea,
              color: colorChip.green,
            }
          },
          {
            mother: -2,
            text: cards[i].name,
            style: {
              position: "absolute",
              fontSize: String(30) + ea,
              fontWeight: String(500),
              bottom: String(31) + ea,
              right: String(32) + ea,
              color: colorChip.black,
              textAlign: "right",
              lineHeight: String(1.25),
            }
          },
          {
            mother: -3,
            style: {
              position: "absolute",
              top: String(0) + ea,
              left: String(0) + ea,
              width: String(100) + '%',
              height: String(50) + '%',
              borderBottom: "1px solid " + colorChip.green,
              transformOrigin: "50% 100%",
              transition: "all 0s ease",
              opacity: String(0.15)
            }
          },
        ]);

        width = nodeArr[0].getBoundingClientRect().width;
        height = nodeArr[0].getBoundingClientRect().height;
        sqrt = Math.sqrt((width * width) + (height * height));
        sqrt = sqrt - (2 * (31 / width) * sqrt);
        nodeArr[3].style.width = String(sqrt) + ea;
        nodeArr[3].style.left = String((width - sqrt) / 2) + ea;
        nodeArr[3].style.transform = "rotate(" + String(90 + (1 * (Math.atan(width / height) * (180 / Math.PI)))) + "deg)";

      }

      instance.totalFather = totalFather;
      window.addEventListener("resize", (e) => { window.location.reload(); });
    }
    instance.onView = "father";
  }
}

BillJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { protoPatch, returnGet, getUser } = GeneralJs;
    const removeIds = [
      "moveRightArea",
      "moveLeftArea",
      "grayLeftOpenButton"
    ];
    const modulePath = "/module/bill";
    const belowGreen = this.totalContents.firstChild;
    const getObj = returnGet();
    let tempFunction, totalMother;

    for (let id of removeIds) {
      document.getElementById(id).style.display = "none";
    }

    this.user = getUser();
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    if (/read/gi.test(getObj.mode)) {
      await protoPatch(instance, `${modulePath}/read.js`);
      await this.contentsView();
    } else {
      totalMother = GeneralJs.nodes.div.cloneNode(true);
      totalMother.classList.add("totalMother");
      totalMother.style.height = "calc(100% - " + String(this.belowHeight) + "px" + ")";
      this.totalContents.appendChild(totalMother);
      this.totalMother = totalMother;
      tempFunction = this.cardViewMaker(true);
      await tempFunction();
    }

  } catch (e) {
    console.log(e);
  }
}
