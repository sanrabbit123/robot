const FileJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = this.mother.totalContents;
  this.ea = "px";
}

FileJs.prototype.iconSvg = function () {
  const instance = this;
  return [];
}

FileJs.prototype.backGrayBar = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth } = this;
  const { createNode, colorChip } = GeneralJs;
  createNode({
    mother: totalContents,
    style: {
      position: "absolute",
      background: colorChip.gray0,
      width: String(grayBarWidth) + ea,
      height: String(100) + "vh",
      top: String(0) + ea,
      left: String(0) + ea,
      zIndex: String(0),
    }
  });
}

FileJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, grayBarWidth, belowHeight } = this;
  const { createNode, colorChip, withOut } = GeneralJs;
  let mother, list, files;
  let innerMargin;

  innerMargin = 30;

  mother = createNode({
    mother: totalContents,
    style: {
      position: "absolute",
      top: String(0),
      left: String(0),
      width: String(100) + '%',
      height: withOut(100, belowHeight, ea),
      verticalAlign: "top",
    }
  });
  list = createNode({
    mother,
    style: {
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      height: String(100) + '%',
      width: String(grayBarWidth) + ea,
    },
    children: [
      {
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          paddingTop: String(innerMargin) + ea,
          paddingBottom: String(innerMargin) + ea,
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) + ea,
          width: withOut(100, innerMargin * 2, ea),
          height: withOut(100, innerMargin * 2, ea)
        }
      }
    ]
  }).firstChild;
  files = createNode({
    mother,
    style: {
      position: "relative",
      display: "inline-block",
      verticalAlign: "top",
      height: String(100) + '%',
      width: withOut(100, grayBarWidth, ea),
    },
    children: [
      {
        style: {
          position: "relative",
          top: String(0),
          left: String(0),
          paddingTop: String(innerMargin) + ea,
          paddingBottom: String(innerMargin) + ea,
          paddingLeft: String(innerMargin) + ea,
          paddingRight: String(innerMargin) + ea,
          width: withOut(100, innerMargin * 2, ea),
          height: withOut(100, innerMargin * 2, ea)
        }
      }
    ]
  }).firstChild;
  this.motherTong = { mother, list, files };

}

FileJs.prototype.fileLoad = async function (path) {
  if (typeof path !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { ea, motherTong: { mother, list, files } } = this;
  const { createNode, colorChip, withOut, ajaxJson, cleanChildren } = GeneralJs;
  try {
    let thisFolderFiles;

    cleanChildren(files);

    thisFolderFiles = await ajaxJson({ path }, "/ghostPass_listFiles");

    console.log(thisFolderFiles);




  } catch (e) {
    console.log(e);
  }
}

FileJs.prototype.launching = async function () {
  const instance = this;
  try {
    this.belowHeight = this.mother.belowHeight;
    this.searchInput = this.mother.searchInput;
    this.grayBarWidth = this.mother.grayBarWidth;

    this.motherTong = {
      mother: null,
      list: null,
      files: null
    };

    this.backGrayBar();
    this.baseMaker();
    this.fileLoad("/");

  } catch (e) {
    GeneralJs.ajax("message=" + JSON.stringify(e).replace(/[\&\=]/g, '') + "&channel=#error_log", "/sendSlack", function () {});
    console.log(e);
  }
}
