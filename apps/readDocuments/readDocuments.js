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

ReadDocuments.prototype.readPdf = async function (fileName) {
  const instance = this;
  const { moduleDir, stat } = this;
  const readPdf = require(moduleDir + "/readPdf.js");
  try {
    const raw = await stat(fileName);
    const meta = await readPdf(fileName);
    const { text, info, numpages } = meta;
    let result;

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
      info: {
        version: info.PDFFormatVersion,
        isAcroFormPresent: info.IsAcroFormPresent,
        isXFAPresent: info.IsXFAPresent,
        creator: info.Creator,
        producer: info.Producer,
        numberOfPages: numpages,
        date: {
          create: info.CreationDate,
          modification: info.ModDate,
        }
      }
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

module.exports = ReadDocuments;

