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
      "return (thisPerson.name + ' 고객님 견적서 | 홈리에종');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 고객님 견적서 | 홈리에종');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  },
  "name": "universalEstimation",
  "route": [
    "estimation",
    "UE"
  ]
} %/%/g

const UniversalEstimationJs = function () {
  this.mother = new GeneralJs();
}

UniversalEstimationJs.binaryPath = "/middle/estimation";

UniversalEstimationJs.prototype.insertInitBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;

  blockHeight = <%% 444, 424, 390, 335, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 9) + ea,
      paddingBottom: String(desktop ? margin : 10.5) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;


}

UniversalEstimationJs.prototype.insertWordsBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;

  blockHeight = <%% 444, 424, 390, 335, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 9) + ea,
      paddingBottom: String(desktop ? margin : 10.5) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;


}

UniversalEstimationJs.prototype.insertPannelBox = function () {
  const instance = this;
  const { client, ea, baseTong, media } = this;
  const mobile = media[4];
  const desktop = !mobile;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  let whiteBlock, whiteTong;
  let blockHeight, bottomMargin;
  let margin;
  let blockMarginBottom;

  blockHeight = <%% 444, 424, 390, 335, 424 %%>;
  bottomMargin = <%% 16, 16, 16, 12, 3 %%>;
  margin = <%% 52, 52, 44, 36, 4.7 %%>;
  blockMarginBottom = <%% 160, 160, 160, 80, 12 %%>;

  whiteBlock = createNode({
    mother: baseTong,
    style: {
      position: "relative",
      borderRadius: String(desktop ? 8 : 1) + ea,
      width: String(100) + '%',
      height: desktop ? String(blockHeight - (margin * 2)) + ea : "auto",
      background: colorChip.white,
      paddingTop: String(desktop ? margin : 9) + ea,
      paddingBottom: String(desktop ? margin : 10.5) + ea,
      marginBottom: String(bottomMargin) + ea,
      boxShadow: "0px 5px 12px -10px " + colorChip.gray5,
      marginBottom: String(blockMarginBottom) + ea,
    },
    children: [
      {
        display: "block",
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(100) + '%',
        marginLeft: String(margin) + ea,
      }
    ]
  });
  whiteTong = whiteBlock.firstChild;


}

UniversalEstimationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    this.mother.setGeneralProperties(this);

    const { returnGet, ajaxJson } = GeneralJs;
    const getObj = returnGet();
    let clients, client;

    if (getObj.needs === undefined || getObj.cliid === undefined) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }

    const { needs, cliid } = getObj;
    const [ kind, desid, proid, method ] = needs.split(',');
    clients = await ajaxJson({ noFlat: true, whereQuery: { cliid } }, "/getClients", { equal: true });
    if (clients.length === 0) {
      alert("잘못된 접근입니다!");
      window.location.href = this.frontPage;
    }
    client = clients[0];
    this.client = client;

    console.log(kind, cliid, desid, proid, method);

    const bills = await ajaxJson({ mode: "read", whereQuery: { $and: [ { class: kind }, { "links.cliid": cliid }, { "links.desid": desid }, { "links.proid": proid }, { "links.method": method } ] } }, PYTHONHOST + "/generalBill");
    console.log(bills);

    await this.mother.ghostClientLaunching({
      name: "universalEstimation",
      client: client,
      base: {
        instance: this,
        binaryPath: UniversalEstimationJs.binaryPath,
        subTitle: (this.client.name + " 고객님 견적서"),
      },
      local: async () => {
        try {
          instance.insertInitBox();
          instance.insertWordsBox();
          instance.insertPannelBox();
        } catch (e) {
          console.log(e);
        }
      }
    });

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
