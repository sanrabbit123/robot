/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "class": {
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 응대 예약 페이지 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 응대 예약 페이지 입니다! | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "responseReservation",
  "route": [
    "reservation",
    "RR"
  ]
} %/%/g

const ResponseReservationJs = function () {
  this.mother = new GeneralJs();
  this.client = null;
}

ResponseReservationJs.binaryPath = "/middle/proposal";

ResponseReservationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  let blockHeight, bottomMargin;
  let calendar;

  blockHeight = <%% this.backHeight - 460, this.backHeight - 470, this.backHeight - 490, this.backHeight - 540, this.backHeight - 460 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 5 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: String(this.backHeight) + ea,
      background: colorChip.white,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    }
  });


  calendar = this.mother.makeCalendar(new Date(), function (e) {
    console.log(this.getAttribute("buttonValue"));
  }, {
    bigMode: true,
    width: String(400) + ea,
    height: String(300) + ea,
    events: [],
  });
  whiteBlock.appendChild(calendar.calendarBase);



}

ResponseReservationJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { ea, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  let topMargin, leftMargin;
  let blockHeight, blockMarginBottom;
  let whiteBlock;
  let buttonHeight, buttonWidth;
  let buttonMargin;
  let buttonTextTop, buttonTextSize;
  let wordSpacing;
  let finalBottom;

  topMargin = <%% 52 + 6, 52 + 6, 44 + 6, 32 + 6, 52 %%>;
  leftMargin = <%% 52, 52, 44, 32, 52 %%>;

  blockHeight = <%% 820, 820, 820, 820, 820 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  buttonHeight = <%% 47, 48, 48, 40, 8.4 %%>;
  buttonWidth = <%% 92, 92, 92, 74, 17 %%>;
  buttonMargin = <%% 8, 8, 8, 5, 2 %%>;

  buttonTextTop = <%% 9, 9, 9, 9, 1.2 %%>;
  buttonTextSize = <%% 20, 20, 20, 16, 3.8 %%>;

  if (desktop) {
    buttonTextTop = buttonTextTop + (GeneralJs.isMac() ? 0 : 2);
  }

  wordSpacing = <%% -1, -1, -1, -1, -1 %%>;
  finalBottom = <%% 42, 42, 42, 20, 5 %%>;

  whiteBlock = createNode({
    mother: this.baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 3) + "px",
      paddingTop: String(desktop ? topMargin : 5.8) + ea,
      paddingLeft: String(this.subBoxMargin.left) + ea,
      paddingRight: String(this.subBoxMargin.left) + ea,
      width: withOut(this.subBoxMargin.left * 2, ea),
      height: String(blockHeight) + ea,
      background: colorChip.white,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
      paddingBottom: String(finalBottom) + ea
    }
  });

}

ResponseReservationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let proid, cliid;
    let projects, project;
    let clients, client;
    let designers, designer;
    let whereQuery;
    let belowTarget, removeTargets;

    if (getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients");
    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];
    this.client = client;

    await this.mother.ghostClientLaunching({
      base: {
        instance: this,
        binaryPath: ResponseReservationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 응대 예약 페이지"),
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertPannelBox();
        } catch (e) {
          console.log(e);
        }
      }
    });

    //loading end
    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
