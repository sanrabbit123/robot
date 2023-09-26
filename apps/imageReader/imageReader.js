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
  this.tempDir = process.cwd() + "/temp";
  this.officialSize = {
    s780: [ 780, 1103 ],
    s1500: [ 1060, 1500 ],
    s3508: [ 2480, 3508 ],
  };
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

ImageReader.prototype.resizeImage = async function (filePath, width = 1500, height = "auto", original = false) {
  const instance = this;
  const { shellExec, uniqueValue, fileSystem } = this.mother;
  try {
    if (typeof filePath !== "string") {
      throw new Error("invaild input");
    }
    if (!/^\//.test(filePath)) {
      throw new Error("must be absolute path");
    }
    if (width === null || width === 0) {
      width = "auto";
    }
    if (height === null || height === 0) {
      height = "auto";
    }
    const fileName = filePath.split('/')[filePath.split('/').length - 1];
    const fileDir = filePath.split('/').slice(0, -1).join('/');
    const filePureName = fileName.split('.').slice(0, -1).join('.');
    const fileExe = fileName.split('.')[fileName.split('.').length - 1];

    const tempDir = process.cwd() + "/temp";
    const tempResult = tempDir + "/" + filePureName + "_" + uniqueValue("hex") + "." + fileExe;

    if (typeof width === "number" && height === "auto") {
      await shellExec(`convert`, [ filePath, "-resize", String(width) + "x", tempResult ]);
    } else if (width === "auto" && typeof height === "number") {
      await shellExec(`convert`, [ filePath, "-resize", "x" + String(height), tempResult ]);
    } else if (typeof width === "number" && typeof height === "number") {
      await shellExec(`convert`, [ filePath, "-resize", String(width) + "x" + String(height), tempResult ]);
    } else {
      throw new Error("invalid input");
    }
    
    if (original) {
      await shellExec(`mv`, [ filePath, fileDir + "/" + filePureName + "_original" + "." + fileExe ]);
    } else {
      await shellExec(`rm`, [ `-rf`, filePath ]);
    }
    await shellExec(`mv`, [ tempResult, filePath ]);
    
    return filePath;
  } catch (e) {
    console.log(e);
    return null;
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

ImageReader.prototype.toOfficialImage = async function (targetImage, type = 3508, water = false) {
  const instance = this;
  const { tempDir: tempFolder, officialSize: size } = this;
  const middleConst = "tempResult_";
  const resultConst = "convertResult_";
  const typeConst = "s";
  const exe = "jpg";
  const qualityConst = 100;
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;
  try {
    let targetInfo;
    let gs;
    let width, height;
    let sampleWidth0, sampleHeight0;
    let sampleWidth1, sampleHeight1;
    let targetWidth, targetHeight;
    let middleTarget;
    let middleInfo;
    let middleWidth, middleHeight;
    let cropMatrix;
    let moveX, moveY;
    let typeKeywords;
    let resultTarget;

    typeKeywords = typeConst + String(type);
    if (size[typeKeywords] === undefined) {
      throw new Error("invalid type");
    }

    middleTarget = tempFolder + "/" + middleConst + uniqueValue("hex") + "." + exe;
    resultTarget = tempFolder + "/" + resultConst + uniqueValue("hex") + "." + exe;
    targetInfo = await this.readImage(targetImage);

    if (targetInfo.geometry.width >= targetInfo.geometry.height) {
      gs = "garo";
    } else if (targetInfo.geometry.width < targetInfo.geometry.height) {
      gs = "sero";
    }

    if (gs === "garo") {

      width = targetInfo.geometry.width;
      height = targetInfo.geometry.height;

      sampleWidth0 = width * (size[typeKeywords][1] / width);
      sampleHeight0 = height * (size[typeKeywords][1] / width);

      sampleWidth1 = width * (size[typeKeywords][0] / height);
      sampleHeight1 = height * (size[typeKeywords][0] / height);

      if (Math.floor(sampleHeight0) >= size[typeKeywords][0]) {
        targetWidth = Math.round(sampleWidth0);
        targetHeight = Math.round(sampleHeight0);
      } else {
        targetWidth = Math.round(sampleWidth1);
        targetHeight = Math.round(sampleHeight1);
      }

      await shellExec(`convert ${shellLink(targetImage)} -resize ${String(targetWidth)}x${String(targetHeight)}! -quality ${String(qualityConst)} ${shellLink(middleTarget)}`);

      middleInfo = await this.readImage(middleTarget);
      middleWidth = middleInfo.geometry.width;
      middleHeight = middleInfo.geometry.height;

      moveX = Math.floor((middleWidth - size[typeKeywords][1]) / 2);
      moveY = Math.floor((middleHeight - size[typeKeywords][0]) / 2);
      cropMatrix = String(size[typeKeywords][1]) + "x" + String(size[typeKeywords][0]) + "+" + String(moveX) + "+" + String(moveY);

      await shellExec(`convert ${shellLink(middleTarget)} -crop ${cropMatrix} -quality ${String(qualityConst)} ${shellLink(resultTarget)}`);

    } else if (gs === "sero") {

      width = targetInfo.geometry.width;
      height = targetInfo.geometry.height;

      sampleWidth0 = width * (size[typeKeywords][0] / width);
      sampleHeight0 = height * (size[typeKeywords][0] / width);

      sampleWidth1 = width * (size[typeKeywords][1] / height);
      sampleHeight1 = height * (size[typeKeywords][1] / height);

      if (Math.floor(sampleWidth0) >= size[typeKeywords][0]) {
        targetWidth = Math.round(sampleWidth0);
        targetHeight = Math.round(sampleHeight0);
      } else {
        targetWidth = Math.round(sampleWidth1);
        targetHeight = Math.round(sampleHeight1);
      }

      await shellExec(`convert ${shellLink(targetImage)} -resize ${String(targetWidth)}x${String(targetHeight)}! -quality ${String(qualityConst)} ${shellLink(middleTarget)}`);

      middleInfo = await this.readImage(middleTarget);
      middleWidth = middleInfo.geometry.width;
      middleHeight = middleInfo.geometry.height;

      moveX = Math.floor((middleWidth - size[typeKeywords][0]) / 2);
      moveY = Math.floor((middleHeight - size[typeKeywords][1]) / 2);
      cropMatrix = String(size[typeKeywords][0]) + "x" + String(size[typeKeywords][1]) + "+" + String(moveX) + "+" + String(moveY);

      await shellExec(`convert ${shellLink(middleTarget)} -crop ${cropMatrix} -quality ${String(qualityConst)} ${shellLink(resultTarget)}`);

    }

    await shellExec(`rm`, [ `-rf`, middleTarget ]);

    return {
      original: targetImage,
      output: resultTarget,
    };

  } catch (e) {
    console.log(e);
    return null;
  }
}

ImageReader.prototype.setWatermark = async function (targetImage) {
  const instance = this;
  try {

  } catch (e) {
    console.log(e);
  }
}

module.exports = ImageReader;
