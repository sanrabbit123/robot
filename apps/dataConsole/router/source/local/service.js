const ServiceJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

ServiceJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, grayBarWidth, totalContents } = this;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  let roomsBaseMother, communicationBaseMother;
  let roomsBase, communicationBase;
  let paddingTop;
  let communicationMargin;
  let backgroundSize, backgroundTextTop;
  let communicationTong;

  paddingTop = 18;
  communicationMargin = paddingTop;
  backgroundSize = 300;
  backgroundTextTop = 240;

  document.body.style.background = colorChip.black;
  totalContents.style.background = colorChip.black;

  roomsBaseMother = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      width: String(grayBarWidth) + ea,
      height: withOut(paddingTop, ea),
      borderRight: "1px solid " + colorChip.realBlack,
      paddingTop: String(paddingTop) + ea,
    }
  });

  roomsBase = createNode({
    mother: roomsBaseMother,
    events: [
      {
        type: "click",
        event: function (e) {
          for (let dom of this.firstChild.children) {
            dom.firstChild.style.color = colorChip.realBlack;
            if (instance.connections[Number(dom.getAttribute("index").replace(/^0/, ''))] !== null) {
              instance.connections[Number(dom.getAttribute("index").replace(/^0/, ''))].close();
              console.log(instance.connections[Number(dom.getAttribute("index").replace(/^0/, ''))]);
            }
          }
          console.log(instance.connections);
          instance.communicationBase.firstChild.textContent = "99";
        }
      }
    ],
    style: {
      position: "relative",
      height: withOut(paddingTop, ea),
      width: String(100) + '%',
      overflow: "scroll",
    },
    children: [
      {
        style: {
          position: "relative",
          width: String(100) + '%',
        }
      }
    ]
  });

  roomsBase = roomsBase.firstChild;

  communicationBaseMother = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(0),
      right: String(0),
      paddingLeft: String(communicationMargin) + ea,
      paddingRight: String(communicationMargin) + ea,
      paddingTop: String(communicationMargin) + ea,
      paddingBottom: String(communicationMargin * 7) + ea,
      width: withOut(grayBarWidth + (communicationMargin * 2), ea),
      height: withOut(communicationMargin * 6, ea),
    }
  });

  communicationBase = createNode({
    mother: communicationBaseMother,
    style: {
      position: "relative",
      width: String(100) + '%',
      height: String(100) + '%',
      background: colorChip.darkBlack,
      borderRadius: String(5) + "px",
    },
    children: [
      {
        text: String(99),
        style: {
          position: "absolute",
          width: String(100) + '%',
          fontSize: String(backgroundSize) + ea,
          fontFamily: "graphik",
          fontWeight: String(200),
          color: colorChip.realBlack,
          textAlign: "center",
          opacity: String(0.3),
          top: withOut(50, backgroundTextTop, ea),
        }
      },
      {
        style: {
          position: "absolute",
          width: withOut(communicationMargin * 2, ea),
          height: withOut(communicationMargin * 2, ea),
          top: String(communicationMargin) + ea,
          left: String(communicationMargin) + ea,
          overflow: "scroll",
        },
        children: [
          {
            class: [ "communicationTong" ],
            style: {
              position: "relative",
              width: String(100) + '%',
            }
          }
        ]
      }
    ]
  });

  communicationTong = communicationBase.querySelector('.' + "communicationTong");

  createNode({
    mother: communicationBaseMother,
    style: {
      position: "relative",
      marginTop: String(communicationMargin / 2) + ea,
      height: String(communicationMargin * 3.5) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      background: colorChip.darkBlack,
    }
  })

  this.roomsBase = roomsBase;
  this.communicationBase = communicationBase;
  this.communicationTong = communicationTong;
}

ServiceJs.prototype.roomsMaker = async function () {
  const instance = this;
  const { requestPromise } = GeneralJs;
  try {
    let rooms;
    rooms = JSON.parse(await requestPromise(PYTHONHOST.replace(/\:3000$/, ":8080") + "/view"));
    console.log(rooms);
    this.rooms = null;
    instance.roomCardRender(rooms);
    const es = new EventSource(PYTHONHOST.replace(/\:3000$/, ":8080") + "/viewSse");
    es.addEventListener("updateTong", function (e) {
      rooms = JSON.parse(e.data);
      if (instance.rooms !== null) {
        instance.roomCardRender(rooms);
      }
      instance.rooms = rooms;
    });
  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}

ServiceJs.prototype.roomCardRender = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea, roomsBase, communicationBase } = this;
  const { createNode, createNodes, withOut, colorChip, cleanChildren } = GeneralJs;
  const length = arr.length;
  const zeroAddition = (num) => { return (num < 10 ? `0${String(num)}` : String(num)); }

  const wordingBlock = function (mother, text, incoming, index) {
    let name, size, size2, height;
    let motherPadding;
    let nameRight;
    let paddingTop, paddingBottom, paddingLeft;

    if (text.trim() === '') {
      return;
    }

    if (incoming) {
      name = 'C' + index;
    } else {
      name = "HL";
    }
    height = 30;
    motherPadding = 6;
    size = 17;
    size2 = 15;
    nameRight = 11;
    paddingTop = 5;
    paddingBottom = 6;
    paddingLeft = 10;

    createNode({
      mother,
      style: {
        position: "relative",
        padding: String(motherPadding) + ea,
      },
      children: [
        {
          text: name,
          style: {
            display: "inline-block",
            position: "relative",
            fontSize: String(size) + ea,
            color: colorChip.gray5,
            fontFamily: "graphik",
            fontWeight: String(400),
            marginRight: String(nameRight) + ea,
          }
        },
        {
          style: {
            display: "inline-block",
            position: "relative",
            height: String(height * text.split('\n').length),
            borderRadius: String(3) + "px",
            background: colorChip.gray4,
          },
          children: [
            {
              text,
              style: {
                position: "relative",
                fontSize: String(size2) + ea,
                color: colorChip.black,
                paddingTop: String(paddingTop) + ea,
                paddingBottom: String(paddingBottom) + ea,
                paddingLeft: String(paddingLeft) + ea,
                paddingRight: String(paddingLeft) + ea,
                fontWeight: String(400),
              }
            }
          ]
        }
      ]
    });
  }

  const cardCreate = function (index) {
    if (typeof index !== "number") {
      throw new Error("invaild input");
    }
    let margin, height, size, textTop;

    margin = 16;
    height = 90;
    size = 45;
    textTop = 9;

    createNode({
      mother: roomsBase,
      attribute: [
        { index: zeroAddition(index) },
      ],
      class: [ "hoverDefault_lite" ],
      events: [
        {
          type: "click",
          event: function (e) {
            e.preventDefault();
            e.stopPropagation();
            const index = this.getAttribute("index");
            const roomsBase = instance.roomsBase;
            for (let dom of roomsBase.children) {
              if (dom !== this) {
                dom.firstChild.style.color = colorChip.realBlack;
                if (instance.connections[Number(dom.getAttribute("index").replace(/^0/, ''))] !== null) {
                  instance.connections[Number(dom.getAttribute("index").replace(/^0/, ''))].close();
                }
              }
            }
            this.firstChild.style.color = colorChip.gray5;
            communicationBase.firstChild.textContent = index;

            const roomSocket = new WebSocket(PYTHONHOST.replace(/^https/, "wss").replace(/\:3000$/, ":8080") + "/homeliaison" + index.replace(/^0/, ''));

            roomSocket.onopen = () => {
              roomSocket.onmessage = (event) => {
                wordingBlock(instance.communicationTong, event.data, true, index);
              }
            }

            instance.connections[Number(index.replace(/^0/, ''))] = roomSocket;

          }
        }
      ],
      style: {
        position: "relative",
        width: withOut(margin * 2, ea),
        height: String(height) + ea,
        borderRadius: String(3) + "px",
        background: colorChip.darkBlack,
        marginLeft: String(margin) + ea,
        marginBottom: String(margin) + ea,
        animation: "fadeup 0.3s ease forwards",
      },
      children: [
        {
          text: "C" + zeroAddition(index),
          style: {
            position: "absolute",
            fontSize: String(size) + ea,
            fontWeight: String(400),
            fontFamily: "graphik",
            color: colorChip.realBlack,
            width: String(100) + '%',
            textAlign: "center",
            top: String(textTop) + ea,
          }
        }
      ]
    });
  }
  const cardRemove = function (index) {
    if (typeof index !== "number") {
      throw new Error("invaild input");
    }
    const children = roomsBase.children;
    let targetDom;

    targetDom = null;
    for (let dom of children) {
      if (Number(dom.getAttribute("index")) === index) {
        dom.style.animation = "fadedown 0.3s ease forwards";
        targetDom = dom;
        break;
      }
    }

    if (targetDom !== null) {
      GeneralJs.setTimeout(() => {
        roomsBase.removeChild(targetDom);
      }, 320);
    }

  }
  let orders, connections;

  connections = [];
  for (let i = 0; i < length; i++) {
    connections.push(null);
  }

  this.connections = connections;

  if (this.rooms !== null) {
    orders = [];
    for (let i = 0; i < length; i++) {
      if (this.rooms[i] !== arr[i]) {
        if (this.rooms[i] > arr[i]) {
          orders.push(-1);
        } else {
          orders.push(1);
        }
      } else {
        orders.push(0);
      }
    }
  } else {
    orders = arr;
  }

  console.log(orders);

  for (let i = 0; i < length; i++) {
    if (orders[i] === 1) {
      cardCreate(i);
    } else if (orders[i] === -1) {
      cardRemove(i);
    }
  }

}


ServiceJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.totalContents.removeChild(this.totalContents.firstChild);

    this.baseMaker();
    await this.roomsMaker();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
