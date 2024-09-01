class GaroseroArray extends Array {
  toSimple() {
    let arr = [];
    for (let { gs } of this) {
      arr.push(gs);
    }
    return arr;
  }

  get simple() {
    return this.toSimple();
  }
}

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
  this.sourceDir = this.dir + "/source";
  this.officialSize = {
    s749: [ 749, 1060 ],
    s780: [ 780, 1103 ],
    s1000: [ 1000, 1415 ],
    s1500: [ 1060, 1500 ],
    s3508: [ 2480, 3508 ],
  };
}

ImageReader.prototype.convertImage = async function (obj) {
  const instance = this;
  const { shellExec, shellLink, fileSystem } = this.mother;
  try {
    let targetImage;
    let targetWidth;
    let targetHeight;
    let qualityConst;
    let middleTarget;
    let thisDir;
    let thisDirContents;
    let thisFileName;
    let thisFileExe;
    let mode;
    let cropMatrix;
    let moveX;
    let moveY;
    let inputDir;
    let inputFileName;
    let inputFileExe;
    let inputDirContents;

    mode = obj.mode || "resize";

    targetImage = obj.input;
    targetWidth = obj.width;
    targetHeight = obj.height;
    qualityConst = obj.quality;
    middleTarget = obj.output;

    inputDir = targetImage.split("/").slice(0, -1).join("/");
    inputFileName = targetImage.split("/")[targetImage.split("/").length - 1];
    inputFileExe = inputFileName.split(".")[inputFileName.split(".").length - 1];
    inputFileName = inputFileName.split(".").slice(0, -1).join(".");

    thisDir = middleTarget.split("/").slice(0, -1).join("/");
    thisFileName = middleTarget.split("/")[middleTarget.split("/").length - 1];
    thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
    thisFileName = thisFileName.split(".").slice(0, -1).join(".");

    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, targetImage ]);
    if (!(await fileSystem(`exist`, [ targetImage ]))) {
      inputDirContents = await fileSystem(`readFolder`, [ inputDir ]);
      inputDirContents = inputDirContents.filter((str) => { return (new RegExp(inputFileName + "-[0-9]+." + inputFileExe, "g")).test(str) });
      if (inputDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        await shellExec(`mv ${shellLink(inputDir + "/" + inputDirContents[0])} ${shellLink(inputDir + "/" + inputFileName + "." + inputFileExe)}`)
        for (let str of inputDirContents) {
          await shellExec(`rm -rf ${shellLink(inputDir + "/" + str)}`);
        }
      }
    }

    if (mode === "resize") {
      await shellExec(`convert ${shellLink(targetImage)} -resize ${String(targetWidth)}x${String(targetHeight)}! -quality ${String(qualityConst)} ${shellLink(middleTarget)}`);
    } else if (mode === "crop") {
      moveX = obj.x;
      moveY = obj.y;
      cropMatrix = String(targetWidth) + "x" + String(targetHeight) + "+" + String(moveX) + "+" + String(moveY);
      await shellExec(`convert ${shellLink(targetImage)} -crop ${cropMatrix} -quality ${String(qualityConst)} ${shellLink(middleTarget)}`);
    } else {
      throw new Error("invalid mode");
    }

    if (!(await fileSystem(`exist`, [ middleTarget ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, middleTarget ]);
    if (!(await fileSystem(`exist`, [ middleTarget ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    return { message: "done" };

  } catch (e) {
    console.log(e);
    return null;
  }
}

ImageReader.prototype.compositeImage = async function (obj) {
  const instance = this;
  const { shellExec, shellLink, fileSystem } = this.mother;
  try {
    let upLayer, downLayer;
    let resultTarget;
    let thisDir;
    let thisFileName;
    let thisFileExe;
    let thisDirContents;
    let moveX, moveY;

    upLayer = obj.up;
    downLayer = obj.down;
    resultTarget = obj.output;
    moveX = (typeof obj.x === "number" ? obj.x : 0);
    moveY = (typeof obj.y === "number" ? obj.y : 0);

    thisDir = resultTarget.split("/").slice(0, -1).join("/");
    thisFileName = resultTarget.split("/")[resultTarget.split("/").length - 1];
    thisFileExe = thisFileName.split(".")[thisFileName.split(".").length - 1];
    thisFileName = thisFileName.split(".").slice(0, -1).join(".");

    await shellExec(`composite -geometry +${String(moveX)}+${String(moveY)} ${shellLink(upLayer)} ${shellLink(downLayer)} ${shellLink(resultTarget)}`);
    if (!(await fileSystem(`exist`, [ resultTarget ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, resultTarget ]);
    if (!(await fileSystem(`exist`, [ resultTarget ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ thisDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(thisFileName + "-[0-9]+." + thisFileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        await shellExec(`mv ${shellLink(thisDir + "/" + thisDirContents[0])} ${shellLink(thisDir + "/" + thisFileName + "." + thisFileExe)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(thisDir + "/" + str)}`);
        }
      }
    }

    return { message: "done" };

  } catch (e) {
    console.log(e);
    return null;
  }
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
      } else if (/error occurred/gi.test(String(data)) || /Error\:/gi.test(String(data))) {
        gs.kill();
        const rm = spawn("rm", [ `-rf`, filePath ]);
        rm.on("close", (code) => { reject("pdf to jpg fail"); });
      }
    });
  });
}

ImageReader.prototype.readImage = async function (filePath, toJson = false) {
  const instance = this;
  const { shellExec, shellLink, uniqueValue, fileSystem } = this.mother;
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
    const fileExe = fileName.split('.')[fileName.split('.').length - 1];

    const tempDir = process.cwd() + "/temp";
    const tempJson = tempDir + "/" + uniqueValue("hex") + ".json";
    let thisDirContents;

    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, filePath ]);
    if (!(await fileSystem(`exist`, [ filePath ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ fileDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(filePureName + "-[0-9]+." + fileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        await shellExec(`mv ${shellLink(fileDir + "/" + thisDirContents[0])} ${shellLink(filePath)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(fileDir + "/" + str)}`);
        }
      }
    }

    await shellExec(`convert`, [ filePath, tempJson ]);
    if (!(await fileSystem(`exist`, [ filePath ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ fileDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(filePureName + "-[0-9]+." + fileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        await shellExec(`mv ${shellLink(fileDir + "/" + thisDirContents[0])} ${shellLink(filePath)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(fileDir + "/" + str)}`);
        }
      }
    }

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
  const { shellExec, shellLink, uniqueValue, fileSystem } = this.mother;
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
    const tempResultPureName = filePureName + "_" + uniqueValue("hex");
    const tempResult = tempDir + "/" + tempResultPureName + "." + fileExe;
    let thisDirContents, inputDirContents;

    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, filePath ]);
    if (!(await fileSystem(`exist`, [ filePath ]))) {
      inputDirContents = await fileSystem(`readFolder`, [ fileDir ]);
      inputDirContents = inputDirContents.filter((str) => { return (new RegExp(filePureName + "-[0-9]+." + fileExe, "g")).test(str) });
      if (inputDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        await shellExec(`mv ${shellLink(fileDir + "/" + inputDirContents[0])} ${shellLink(fileDir + "/" + filePureName + "." + fileExe)}`)
        for (let str of inputDirContents) {
          await shellExec(`rm -rf ${shellLink(fileDir + "/" + str)}`);
        }
      }
    }

    if (typeof width === "number" && height === "auto") {
      await shellExec(`convert`, [ filePath, "-resize", String(width) + "x", tempResult ]);
    } else if (width === "auto" && typeof height === "number") {
      await shellExec(`convert`, [ filePath, "-resize", "x" + String(height), tempResult ]);
    } else if (typeof width === "number" && typeof height === "number") {
      await shellExec(`convert`, [ filePath, "-resize", String(width) + "x" + String(height), tempResult ]);
    } else {
      throw new Error("invalid input");
    }

    if (!(await fileSystem(`exist`, [ tempResult ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ tempDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(tempResultPureName + "-[0-9]+." + fileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("converting fail");
      } else {
        await shellExec(`mv ${shellLink(tempDir + "/" + thisDirContents[0])} ${shellLink(tempResult)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(tempDir + "/" + str)}`);
        }
      }
    }

    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, tempResult ]);
    if (!(await fileSystem(`exist`, [ tempResult ]))) {
      thisDirContents = await fileSystem(`readFolder`, [ tempDir ]);
      thisDirContents = thisDirContents.filter((str) => { return (new RegExp(tempResultPureName + "-[0-9]+." + fileExe, "g")).test(str) });
      if (thisDirContents.length === 0) {
        throw new Error("mogrify fail");
      } else {
        await shellExec(`mv ${shellLink(tempDir + "/" + thisDirContents[0])} ${shellLink(tempResult)}`)
        for (let str of thisDirContents) {
          await shellExec(`rm -rf ${shellLink(tempDir + "/" + str)}`);
        }
      }
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
  const { shellExec, shellLink } = this.mother;
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

ImageReader.prototype.toOfficialImage = async function (targetImage, type = 3508) {
  const instance = this;
  const { tempDir: tempFolder, officialSize: size } = this;
  const middleConst = "tempResult_";
  const resultConst = "convertResult_";
  const typeConst = "s";
  const exe = "jpg";
  const qualityConst = 95;
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
    let resultObj;
    let tempObj;

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

      sampleWidth0 = Math.ceil(width * (size[typeKeywords][1] / width));
      sampleHeight0 = Math.ceil(height * (size[typeKeywords][1] / width));

      sampleWidth1 = Math.ceil(width * (size[typeKeywords][0] / height));
      sampleHeight1 = Math.ceil(height * (size[typeKeywords][0] / height));

      if (Math.floor(sampleHeight0) >= size[typeKeywords][0] && Math.floor(sampleWidth0) >= size[typeKeywords][1]) {
        targetWidth = Math.ceil(sampleWidth0);
        targetHeight = Math.ceil(sampleHeight0);
      } else {
        targetWidth = Math.ceil(sampleWidth1);
        targetHeight = Math.ceil(sampleHeight1);
      }

      await this.convertImage({
        input: targetImage,
        width: targetWidth,
        height: targetHeight,
        quality: qualityConst,
        output: middleTarget,
        mode: "resize",
        size: size[typeKeywords],
      });

      middleInfo = await this.readImage(middleTarget);
      middleWidth = middleInfo.geometry.width;
      middleHeight = middleInfo.geometry.height;
      
      moveX = Math.floor((middleWidth - size[typeKeywords][1]) / 2);
      moveY = Math.floor((middleHeight - size[typeKeywords][0]) / 2);
      
      await this.convertImage({
        input: middleTarget,
        width: size[typeKeywords][1],
        height: size[typeKeywords][0],
        x: moveX,
        y: moveY,
        quality: qualityConst,
        output: resultTarget,
        mode: "crop",
      });

    } else if (gs === "sero") {

      width = targetInfo.geometry.width;
      height = targetInfo.geometry.height;

      sampleWidth0 = Math.ceil(width * (size[typeKeywords][0] / width));
      sampleHeight0 = Math.ceil(height * (size[typeKeywords][0] / width));

      sampleWidth1 = Math.ceil(width * (size[typeKeywords][1] / height));
      sampleHeight1 = Math.ceil(height * (size[typeKeywords][1] / height));

      if (Math.floor(sampleWidth0) >= size[typeKeywords][0] && Math.floor(sampleHeight0) >= size[typeKeywords][1]) {
        targetWidth = Math.ceil(sampleWidth0);
        targetHeight = Math.ceil(sampleHeight0);
      } else {
        targetWidth = Math.ceil(sampleWidth1);
        targetHeight = Math.ceil(sampleHeight1);
      }

      await this.convertImage({
        input: targetImage,
        width: targetWidth,
        height: targetHeight,
        quality: qualityConst,
        output: middleTarget,
        mode: "resize",
        size: size[typeKeywords],
      });

      middleInfo = await this.readImage(middleTarget);
      middleWidth = middleInfo.geometry.width;
      middleHeight = middleInfo.geometry.height;
      
      moveX = Math.floor((middleWidth - size[typeKeywords][0]) / 2);
      moveY = Math.floor((middleHeight - size[typeKeywords][1]) / 2);
      
      await this.convertImage({
        input: middleTarget,
        width: size[typeKeywords][0],
        height: size[typeKeywords][1],
        x: moveX,
        y: moveY,
        quality: qualityConst,
        output: resultTarget,
        mode: "crop",
      });

    }

    await shellExec(`rm`, [ `-rf`, middleTarget ]);

    resultObj = {
      original: targetImage,
      output: resultTarget,
    };

    console.log("converting success => " + resultObj.output);
    return resultObj;

  } catch (e) {
    console.log(e);
    return null;
  }
}

ImageReader.prototype.overOfficialImage = async function (targetImage, type = 3508) {
  const instance = this;
  const { tempDir: tempFolder, officialSize: size } = this;
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;
  try {
    let tempObj;
    tempObj = await this.toOfficialImage(targetImage, type);
    await shellExec(`rm`, [ `-rf`, targetImage ]);
    await shellExec(`mv ${shellLink(tempObj.output)} ${shellLink(targetImage.split(".").slice(0, -1).join(".") + ".jpg")}`);
    return { message: "done" };
  } catch (e) {
    console.log(e);
    return null;
  }
}

ImageReader.prototype.createOfficialCanvas = async function (type = 3508, gs = "garo", exe = "png") {
  const instance = this;
  const { tempDir: tempFolder, officialSize: size } = this;
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;
  const typeConst = "s";
  const resultConst = "createResult_";
  try {
    let typeKeywords;
    let width, height;

    typeKeywords = typeConst + String(type);
    if (size[typeKeywords] === undefined) {
      throw new Error("invalid type");
    }

    if (gs === "garo") {
      width = size[typeKeywords][1];
      height = size[typeKeywords][0];
    } else {
      width = size[typeKeywords][0];
      height = size[typeKeywords][1];
    }

    resultTarget = tempFolder + "/" + resultConst + uniqueValue("hex") + "." + exe;

    await shellExec(`convert -size ${String(width)}x${String(height)} xc:rgba\\(254,255,255,1\\) ${shellLink(resultTarget)}`);
    await shellExec(`mogrify`, [ `-auto-orient`, `-strip`, resultTarget ]);

    return {
      output: resultTarget,
    };

  } catch (e) {
    console.log(e);
    return null;
  }
}

ImageReader.prototype.twoVerticalImages = async function (arr) {
  const instance = this;
  const { tempDir: tempFolder, officialSize: size } = this;
  const { shellExec, shellLink, fileSystem, uniqueValue } = this.mother;
  const verticalMiddleConst = "verticalMiddle_";
  const verticalResultConst = "verticalResult_";
  const exe = "png";
  try {
    const [ target0, target1 ] = arr;
    let baseCanvas;
    let middleTarget, resultTarget;
    let target0Converting;
    let target1Converting;
    let officialType0, officialType1;

    officialType0 = 1500;
    officialType1 = 749;

    middleTarget = tempFolder + "/" + verticalMiddleConst + uniqueValue("hex") + "." + exe;
    resultTarget = tempFolder + "/" + verticalResultConst + uniqueValue("hex") + "." + exe;

    target0Converting = (await this.toOfficialImage(target0, officialType1, false)).output;
    target1Converting = (await this.toOfficialImage(target1, officialType1, false)).output;
    baseCanvas = (await this.createOfficialCanvas(officialType0)).output;

    await this.compositeImage({
      up: target0Converting,
      down: baseCanvas,
      output: middleTarget,
      x: 0,
      y: 0,
    });

    await this.compositeImage({
      up: target1Converting,
      down: middleTarget,
      output: resultTarget,
      x: officialType0 - officialType1,
      y: 0,
    });

    await shellExec(`rm`, [ `-rf`, target0Converting ]);
    await shellExec(`rm`, [ `-rf`, target1Converting ]);
    await shellExec(`rm`, [ `-rf`, middleTarget ]);
    await shellExec(`rm`, [ `-rf`, baseCanvas ]);

    return {
      output: resultTarget,
    };

  } catch (e) {
    console.log(e);
    return null;
  }
}

ImageReader.prototype.queryImage = async function (image) {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  try {
    const res = await shellExec(`identify -ping -format '%w %h' ${shellLink(image)}`);
    const [ width, height ] = res.trim().split(" ").map((str) => { return Number(str.trim()) });
    if (width > height) {
      return 'g';
    } else if (width < height) {
      return 's';
    } else {
      return 'c';
    }
  } catch (e) {
    console.log(e);
  }
}

ImageReader.prototype.queryImages = async function (imageArr) {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  try {
    let target, width, height, resultObj;
    let totalTong = new GaroseroArray();
    let number = 0;
    let res, tempArr;
    for (let i of imageArr) {
      res = await shellExec(`identify -ping -format '%w %h' ${shellLink(i)}`);
      [ width, height ] = res.trim().split(" ").map((str) => { return Number(str.trim()) });
      if (width > height) {
        totalTong.push({ index: number, file: i, gs: 'g' });
      } else if (width < height) {
        totalTong.push({ index: number, file: i, gs: 's' });
      } else {
        totalTong.push({ index: number, file: i, gs: 'c' });
      }
      number++;
    }
    return totalTong;
  } catch (e) {
    console.log(e);
  }
}

ImageReader.prototype.queryDirectory = async function (dir) {
  const instance = this;
  const { shell, shellLink, fileSystem, appleScript } = this.mother;
  try {
    let tongRaw, tong, result;
    let numberBoo;
    let sortFunc;

    tongRaw = await fileSystem(`readDir`, [ dir ]);
    tong = [];
    numberBoo = [];
    for (let i of tongRaw) {
      if (i !== `.DS_Store`) {
        tong.push(dir + "/" + i);
        if (/[0-9]/g.test(i)) {
          numberBoo.push("number");
        } else {
          numberBoo.push("string");
        }
      }
    }

    if (numberBoo.includes("string")) {
      tong.sort();
    } else {
      sortFunc = (str) => {
        return Number(str.replace(/_[0-9][0-9][0-9][0-9][0-9][0-9]$/, '').replace(/[^0-9]/g, ''));
      }
      tong.sort((a, b) => { return sortFunc(a) - sortFunc(b); });
    }

    result = await this.queryImages(tong);
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = ImageReader;
