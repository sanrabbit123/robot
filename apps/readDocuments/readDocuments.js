const ReadDocuments = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/readDocuments";
  this.moduleDir = this.dir + "/module";
  
  const { stat } = require("fs/promises");
  this.stat = stat;
}

ReadDocuments.prototype.readDocx = async function (fileName) {
  const instance = this;
  const { moduleDir, stat } = this;
  const readDocx = require(moduleDir + "/readDocx.js");
  try {
    const raw = await stat(fileName);
    const text = await readDocx(fileName);
    let result;

    result = {
      name: fileName.split("/")[fileName.split("/").length - 1],
      type: "docx",
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],
      size: {
        bytes: raw.size,
        kb: raw.size / 1024,
        mb: (raw.size / 1024) / 1024,
      },
      date: {
        birth: raw.birthtime,
        last: {
          access: raw.atime,
          modification: raw.mtime,
        }
      },
      body: text
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}

ReadDocuments.prototype.readDoc = async function (fileName) {
  const instance = this;
  const { moduleDir, stat } = this;
  const readDoc = require(moduleDir + "/readDoc.js");
  try {
    const raw = await stat(fileName);
    const text = await readDoc(fileName);
    let result;

    result = {
      name: fileName.split("/")[fileName.split("/").length - 1],
      type: "doc",
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],
      size: {
        bytes: raw.size,
        kb: raw.size / 1024,
        mb: (raw.size / 1024) / 1024,
      },
      date: {
        birth: raw.birthtime,
        last: {
          access: raw.atime,
          modification: raw.mtime,
        }
      },
      body: text
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}

ReadDocuments.prototype.readPptx = async function (fileName) {
  const instance = this;
  const { moduleDir, stat } = this;
  const readPptx = require(moduleDir + "/readPptx.js");
  try {
    const raw = await stat(fileName);
    const text = await readPptx(fileName);
    let result;

    result = {
      name: fileName.split("/")[fileName.split("/").length - 1],
      type: "pptx",
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],
      size: {
        bytes: raw.size,
        kb: raw.size / 1024,
        mb: (raw.size / 1024) / 1024,
      },
      date: {
        birth: raw.birthtime,
        last: {
          access: raw.atime,
          modification: raw.mtime,
        }
      },
      body: text
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}

ReadDocuments.prototype.readPdf = async function (fileName) {
  const instance = this;
  const { moduleDir, stat } = this;
  const { shellExec, uniqueValue, fileSystem } = this.mother;
  const readPdf = require(moduleDir + "/readPdf.js");
  try {
    const raw = await stat(fileName);
    const tempFileName = `${process.cwd()}/temp/__pdftotext__${uniqueValue("hex")}`;
    let result, text;
    try {
      await shellExec("pdftotext", [ "-q", fileName, tempFileName ]);
      text = await fileSystem(`readString`, [ tempFileName ]);
      await shellExec("rm", [ `-rf`, tempFileName ]);
    } catch {
      text = "";
    }

    result = {
      name: fileName.split("/")[fileName.split("/").length - 1],
      type: "pdf",
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],
      size: {
        bytes: raw.size,
        kb: raw.size / 1024,
        mb: (raw.size / 1024) / 1024,
      },
      date: {
        birth: raw.birthtime,
        last: {
          access: raw.atime,
          modification: raw.mtime,
        }
      },
      body: text,
    };

    return result;

  } catch (e) {
    console.log(e);
  }
}

ReadDocuments.prototype.readHwp = async function (fileName) {
  const instance = this;
  const { moduleDir, stat } = this;
  const readHwp = require(moduleDir + "/readHwp.js");
  try {
    const raw = await stat(fileName);
    const text = await readHwp(fileName);
    let result;

    result = {
      name: fileName.split("/")[fileName.split("/").length - 1],
      type: "hwp",
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],
      size: {
        bytes: raw.size,
        kb: raw.size / 1024,
        mb: (raw.size / 1024) / 1024,
      },
      date: {
        birth: raw.birthtime,
        last: {
          access: raw.atime,
          modification: raw.mtime,
        }
      },
      body: text
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}

ReadDocuments.prototype.readXlsx = async function (fileName, sheetsName = null) {
  const instance = this;
  const { moduleDir, stat } = this;
  const readXlsx = require(moduleDir + "/readXlsx.js");
  try {
    const raw = await stat(fileName);
    const matrix = await readXlsx(fileName, sheetsName);
    let result;

    result = {
      name: fileName.split("/")[fileName.split("/").length - 1],
      type: "xlsx",
      exe: fileName.split("/")[fileName.split("/").length - 1].split(".")[1],
      size: {
        bytes: raw.size,
        kb: raw.size / 1024,
        mb: (raw.size / 1024) / 1024,
      },
      date: {
        birth: raw.birthtime,
        last: {
          access: raw.atime,
          modification: raw.mtime,
        }
      },
      body: matrix
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}

ReadDocuments.prototype.readFile = async function (filePath) {
  if (typeof filePath !== "string") {
    throw new Error("invalid input");
  }

  const instance = this;
  try {
    let fileName, exe;

    fileName = filePath.split("/")[filePath.split("/").length - 1];
    exe = fileName.split(".")[fileName.split(".").length - 1].trim().toLowerCase();

    if (exe === "docx") {
      return this.readDocx(filePath);
    } else if (exe === "doc") {
      return this.readDoc(filePath);
    } else if (exe === "pptx") {
      return this.readPptx(filePath);
    } else if (exe === "pdf") {
      return this.readPdf(filePath);
    } else if (exe === "hwp") {
      return this.readHwp(filePath);
    } else if (exe === "xlsx") {
      return this.readXlsx(filePath);
    } else {
      return null;
    }

  } catch (e) {
    console.log(e);
  }
}

ReadDocuments.prototype.readFiles = async function (fileArr) {
  if (!Array.isArray(fileArr)) {
    throw new Error("invalid input");
  }
  if (!fileArr.every((str) => { return (typeof str === "string") })) {
    throw new Error("invalid input 2");
  }

  const instance = this;
  try {
    let resultArr;
    let obj;

    resultArr = [];

    for (let str of fileArr) {
      obj = await this.readFile(str);
      resultArr.push(obj);
    }

    return resultArr;

  } catch (e) {
    console.log(e);
  }
}

module.exports = ReadDocuments;

