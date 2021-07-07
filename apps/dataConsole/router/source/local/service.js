const ServiceJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

ServiceJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, grayBarWidth, totalContents } = this;
  const { createNode, createNodes, withOut, colorChip } = GeneralJs;
  let roomsBase, communicationBase;

  roomsBase = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(0),
      left: String(0),
      width: String(grayBarWidth) + ea,
      height: withOut(0, ea),
      borderRight: "1px solid " + colorChip.gray2,
    }
  });

  communicationBase = createNode({
    mother: totalContents,
    style: {
      position: "fixed",
      top: String(0),
      right: String(0),
      width: withOut(grayBarWidth, ea),
      height: withOut(0, ea),
    }
  });

  this.roomsBase = roomsBase;
  this.communicationBase = communicationBase;
}

ServiceJs.prototype.roomsMaker = async function () {
  const instance = this;
  const { requestPromise } = GeneralJs;
  try {
    let rooms;

    rooms = JSON.parse(await requestPromise(PYTHONHOST.replace(/\:3000$/, ":8080") + "/view"));
    this.rooms = rooms;
    console.log(rooms);

    const es = new EventSource(PYTHONHOST.replace(/\:3000$/, ":8080") + "/viewSse");
    es.addEventListener("updateTong", function (e) {
      rooms = JSON.parse(e.data);
      instance.rooms = rooms;
      console.log(rooms);
    });

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
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
