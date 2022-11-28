const ImageReader = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/imageReader";
}

ImageReader.prototype.pdfToJpg = function (filePath, removeMode = false) {
  if (typeof filePath !== "string") {
    throw new Error("invaild input");
  }
  if (!/^\//.test(filePath)) {
    throw new Error("must be absolute path");
  }
  const { spawn } = require("child_process");
  const RESOLUTION = 300;
  const FORMAT = "jpeg";
  const DIGIT = 4;

  const fileName = filePath.split('/')[filePath.split('/').length - 1];
  const fileDir = filePath.split('/').slice(0, -1).join('/');
  if (!/\.pdf$/.test(fileName)) {
    throw new Error("must be pdf file");
  }
  const filePureName = fileName.replace(/\.pdf$/i, '');
  const targetJpg = fileDir + "/" + filePureName + "%0" + String(DIGIT) + "d.jpg";
  return new Promise((resolve, reject) => {
    const gs = spawn("gs", [ `-dNOPAUSE`, `-sDEVICE=${FORMAT}`, `-r${String(RESOLUTION)}`, `-sOutputFile=${targetJpg}`, filePath ]);
    let arr, maxLength, results;

    arr = [];
    gs.stdout.on("data", (data) => {
      if (/^Page/i.test(String(data).trim())) {
        arr.push(Number(String(data).trim().replace(/[^0-9]/gi, '')));
      } else if (String(data).trim() === "GS>") {
        gs.kill();

        arr.sort((a, b) => { return b - a; });
        maxLength = arr[0];
        results = [];
        for (let i = 0; i < maxLength; i++) {
          results.push(fileDir + "/" + filePureName + (new Array(DIGIT - String(i + 1).length)).fill(0, 0).map((num) => { return String(num) }).join('') + String(i + 1) + ".jpg");
        }

        if (!removeMode) {
          resolve(results);
        } else {
          const rm = spawn("rm", [ `-rf`, filePath ]);
          rm.on("close", (code) => { resolve(results); });
        }
      }
    });

    // gs.stderr.on("data", (data) => { reject(String(data)); });
  });
}

ImageReader.prototype.imageToJpg = async function (filePath, saveOriginal = false) {
  const instance = this;
  const { shellExec, fileSystem, shellLink } = this.mother;
  try {
    if (typeof filePath !== "string") {
      throw new Error("invaild input");
    }
    if (!/^\//.test(filePath)) {
      throw new Error("must be absolute path");
    }

    const fileName = filePath.split('/')[filePath.split('/').length - 1];
    const fileDir = filePath.split('/').slice(0, -1).join('/');
    const filePureName = fileName.split('.').slice(0, -1).join('.');
    const resultJpg = `${fileDir}/${filePureName}.jpg`;

    await shellExec(`convert ${shellLink(filePath)} -quality 100 ${shellLink(resultJpg)}`);
    if (!saveOriginal) {
      await shellExec(`rm`, [ `-rf`, filePath ]);
    }

    return await this.readImage(resultJpg);

  } catch (e) {
    console.log(e);
  }
}

ImageReader.prototype.readImage = async function (filePath, toJson = false) {
  const instance = this;
  const { shellExec, uniqueValue, fileSystem } = this.mother;
  try {
    if (typeof filePath !== "string") {
      throw new Error("invaild input");
    }
    if (!/^\//.test(filePath)) {
      throw new Error("must be absolute path");
    }
    const fileName = filePath.split('/')[filePath.split('/').length - 1];
    const fileDir = filePath.split('/').slice(0, -1).join('/');
    const filePureName = fileName.split('.').slice(0, -1).join('.');

    const tempDir = process.cwd() + "/temp";
    const tempJson = tempDir + "/" + uniqueValue("hex") + ".json";

    await shellExec(`convert`, [ filePath, tempJson ]);
    const [ { image } ] = await fileSystem(`readJson`, [ tempJson ]);
    delete image.version;
    image.name = image.baseName;
    delete image.baseName;
    image.path = filePath;

    await shellExec(`rm`, [ `-rf`, tempJson ]);
    if (toJson) {
      await fileSystem(`writeJson`, [ `${fileDir}/${filePureName}.json`, image ]);
    }

    return image;
  } catch (e) {
    console.log(e);
  }
}

ImageReader.prototype.recursivePdfConvert = async function (folderPath) {
  const instance = this;
  const { shellExec } = this.mother;
  try {
    if (typeof folderPath !== "string") {
      throw new Error("invaild input");
    }
    if (!/^\//.test(folderPath)) {
      throw new Error("must be absolute path");
    }
    let stdoutArr, targets;

    stdoutArr = (await shellExec(`find`, [ folderPath, `-name`, `*.pdf` ])).split("\n");
    targets = stdoutArr.filter((str) => { return (typeof str === "string" && /^\//.test(str)) });

    console.log(targets);

    for (let path of targets) {
      await this.pdfToJpg(path, true);
      console.log(`${path} to jpg done`);
    }

    return targets;

  } catch (e) {
    console.log(e);
  }
}

module.exports = ImageReader;
