const ServiceJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

ServiceJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents } = this;
  const { createNode, createNodes, withOut, colorChip, cleanChildren } = GeneralJs;
  let roomsBaseMother, communicationBaseMother;
  let roomsBase, communicationBase;
  let paddingTop;
  let communicationMargin;
  let backgroundSize, backgroundTextTop;
  let communicationTong;
  let inputBase;
  let size;
  let inputHeight;
  let leftBarWidth;

  paddingTop = 18;
  communicationMargin = paddingTop;
  backgroundSize = 260;
  backgroundTextTop = 200;
  size = 20;
  inputHeight = 90;
  leftBarWidth = 160;

  document.body.style.background = colorChip.black;
  totalContents.style.background = colorChip.black;

  roomsBaseMother = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      width: String(leftBarWidth) + ea,
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
          }
          if (instance.connection !== null) {
            instance.connection.close();
            instance.connection = null;
          }
          instance.communicationBase.firstChild.textContent = "99";
          cleanChildren(instance.communicationTong);
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
      width: withOut(leftBarWidth + (communicationMargin * 2), ea),
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

  inputBase = createNode({
    mother: communicationBaseMother,
    style: {
      position: "relative",
      marginTop: String(communicationMargin / 2) + ea,
      height: String(communicationMargin * 3.5) + ea,
      width: String(100) + '%',
      borderRadius: String(5) + "px",
      background: colorChip.darkBlack,
    },
    children: [
      {
        mode: "input",
        attribute: [
          { type: "text" },
          { placeholder: "대화를 입력해주세요..." },
        ],
        events: [
          {
            type: [ "keypress", "keydown" ],
            event: function (e) {
              let tempArr;
              if (instance.connection !== null) {
                if ((e.type === "keypress" && e.key === "Enter") || (e.type === "keydown" && e.key === "Tab")) {
                  e.preventDefault();
                  instance.connection.send(this.value);
                  tempArr = JSON.parse(window.sessionStorage.getItem("C" + instance.index));
                  tempArr.push([ false, this.value ]);
                  window.sessionStorage.setItem("C" + instance.index, JSON.stringify(tempArr));
                  instance.wordingBlock(instance.communicationTong, this.value, false);
                  this.value = '';
                }
              }
            }
          }
        ],
        style: {
          width: String(100) + '%',
          height: String(inputHeight) + '%',
          fontSize: String(size) + ea,
          fontWeight: String(200),
          color: colorChip.gray3,
          border: String(0),
          outline: String(0),
          background: "transparent",
          textAlign: "center",
        }
      }
    ]
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

ServiceJs.prototype.wordingBlock = function (mother, text, incoming, index = "99") {
  const instance = this;
  const { ea, roomsBase, communicationBase } = this;
  const { createNode, createNodes, withOut, colorChip, cleanChildren, scrollTo } = GeneralJs;
  let name, size, size2, height;
  let motherPadding;
  let nameRight;
  let paddingTop, paddingBottom, paddingLeft;
  let children, nameObj, wordingObj;
  let newWordBlock;

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
  paddingTop = 7;
  paddingBottom = 9;
  paddingLeft = 12;

  children = [];
  nameObj = {
    text: name,
    style: {
      display: "inline-block",
      position: "relative",
      fontSize: String(size) + ea,
      color: instance.lastestWho === incoming ? colorChip.darkBlack : colorChip.gray5,
      fontFamily: "graphik",
      fontWeight: String(400),
      marginRight: incoming ? String(nameRight) + ea : "",
      marginLeft: !incoming ? String(nameRight) + ea : "",
    }
  };
  wordingObj = {
    style: {
      display: "inline-block",
      position: "relative",
      height: String(height * text.split('\n').length),
      borderRadius: String(3) + "px",
      background: incoming ? colorChip.gray4 : colorChip.realBlack,
    },
    children: [
      {
        text,
        style: {
          position: "relative",
          fontSize: String(size2) + ea,
          color: incoming ? colorChip.black : colorChip.gray4,
          paddingTop: String(paddingTop) + ea,
          paddingBottom: String(paddingBottom) + ea,
          paddingLeft: String(paddingLeft) + ea,
          paddingRight: String(paddingLeft) + ea,
          fontWeight: String(400),
        }
      }
    ]
  };

  if (incoming) {
    children.push(nameObj);
    children.push(wordingObj);
  } else {
    children.push(wordingObj);
    children.push(nameObj);
  }

  newWordBlock = createNode({
    mother,
    style: {
      position: "relative",
      paddingTop: String(this.lastestWho === incoming ? 0 : motherPadding) + ea,
      paddingBottom: String(motherPadding) + ea,
      paddingLeft: String(motherPadding) + ea,
      paddingRight: String(motherPadding) + ea,
      textAlign: incoming ? "left" : "right",
    },
    children
  });

  this.lastestWho = incoming;
  scrollTo(mother.parentElement, newWordBlock);

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
  const cardCreate = function (index) {
    if (typeof index !== "number") {
      throw new Error("invaild input");
    }
    let margin, height, size, textTop;

    margin = 16;
    height = 77;
    size = 35;
    textTop = 10;

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
            let pastArr;
            for (let dom of roomsBase.children) {
              if (dom !== this) {
                dom.firstChild.style.color = colorChip.realBlack;
              }
            }
            this.firstChild.style.color = colorChip.gray5;
            communicationBase.firstChild.textContent = index;

            cleanChildren(instance.communicationTong);

            if (instance.connection !== null) {
              instance.connection.close();
              instance.connection = null;
            }
            instance.index = index;
            instance.lastestWho = null;

            if (window.sessionStorage.getItem("C" + index) === null) {
              window.sessionStorage.setItem("C" + index, JSON.stringify([]));
            } else {
              pastArr = JSON.parse(window.sessionStorage.getItem("C" + index));
              for (let [ incoming, data ] of pastArr) {
                instance.wordingBlock(instance.communicationTong, data, incoming, index);
              }
            }

            const roomSocket = new WebSocket(PYTHONHOST.replace(/^https/, "wss").replace(/\:3000$/, ":8080") + "/homeliaison" + index.replace(/^0/, ''));

            roomSocket.onopen = () => {
              instance.connection = roomSocket;
              roomSocket.onmessage = (event) => {
                let tempArr = JSON.parse(window.sessionStorage.getItem("C" + index));
                tempArr.push([ true, event.data ]);
                window.sessionStorage.setItem("C" + index, JSON.stringify(tempArr));
                instance.wordingBlock(instance.communicationTong, event.data, true, index);
              }
            }

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
  let orders;

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
    GeneralJs.cssInjection(`*{transition:all 0s ease}`);

    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.totalContents.removeChild(this.totalContents.firstChild);

    this.connection = null;
    this.lastestWho = null;
    this.index = "99";

    this.baseMaker();
    await this.roomsMaker();

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
