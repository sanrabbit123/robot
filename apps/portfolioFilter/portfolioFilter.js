const PortfolioFilter = function (clientName = "", apartName = "", designer = "", pid = "g0") {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const apart = function (str) {
    let arr = str.split(' ');
    let new_string = '';
    for (let i of arr) {
      new_string += i + '_';
    }
    new_string += "홈스타일링_";
    return new_string;
  }

  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = `${process.cwd()}/apps/portfolioFilter`;
  this.generator = {
    factory: require(this.dir + "/factory/generator.js"),
  }
  this.clientName = clientName;
  this.designer = designer;
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.apartName = apart(apartName);
  this.pid = pid;
  this.resourceFolderName = "resource";
  this.resultFolderName = "result";
  this.options = {
    home_dir: `${process.env.HOME}/portfolioFilter`,
    photo_dir: `${process.env.HOME}/portfolioFilter/${this.resourceFolderName}`,
    result_dir: `${process.env.HOME}/portfolioFilter/${this.resultFolderName}`,
  };
  this.clientNullATarget = [
    "null",
    "NULL",
    "Null",
    "no",
    "",
    "X",
    "x",
    "nothing",
    "anyone",
    "없음",
    "a",
    "A",
    "designer",
    "Designer",
    "DESIGNER",
    "undefined"
  ];
}

PortfolioFilter.prototype.static_setting = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    let staticFolderBoo, staticFolderBootr;
    let order;
    let staticFolderscriptBoo, staticFolderscriptBootr;
    let staticFolderresultBootr, staticFolderresourceBootr;
    let folderList;

    staticFolderBoo = await this.mother.fileSystem(`readDir`, [ process.env.HOME ]);
    staticFolderBootr = false;
    for (let i of staticFolderBoo) {
      if (/^portfolioFilter/.test(i)) {
        staticFolderBootr = true;
      }
    }
    if (!staticFolderBootr) {
      order = ``;
      order += `mkdir ${shellLink(this.options.home_dir)};`;
      order += `mkdir ${shellLink(this.options.home_dir)}/script;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/result;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/resource;`;
      shell.exec(order);
    } else {
      staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);
      staticFolderscriptBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^script$/.test(i)) {
          staticFolderscriptBootr = true;
        }
      }
      if (!staticFolderscriptBootr) {
        shell.exec(`mkdir ${shellLink(this.options.home_dir)}/script`);
      }
      staticFolderresultBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^result$/.test(i)) {
          staticFolderresultBootr = true;
        }
      }
      if (!staticFolderresultBootr) {
        shell.exec(`mkdir ${shellLink(this.options.home_dir)}/result`);
      }
      staticFolderresourceBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^resource$/.test(i)) {
          staticFolderresourceBootr = true;
        }
      }
      if (!staticFolderresourceBootr) {
        shell.exec(`mkdir ${shellLink(this.options.home_dir)}/resource`);
      }
    }

    folderList = [ "factory" ];
    for (let f of folderList) {
      shell.exec(`cp -r ${shellLink(process.cwd())}/apps/portfolioFilter/${f} ${shellLink(this.options.home_dir)}`);
    }

  } catch (e) {
    console.log(e.message);
  }
}

PortfolioFilter.prototype.image_filter = function (str, size) {
  const instance = this;
  let date = new Date();
  let datestring = String(date.getFullYear()).slice(2);
  if (date.getMonth() + 1 < 10) {
    datestring += '0' + String(date.getMonth() + 1);
  } else {
    datestring += String(date.getMonth() + 1);
  }
  if (date.getDate() < 10) {
    datestring += '0' + String(date.getDate());
  } else {
    datestring += String(date.getDate());
  }
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
  str = str.replace(/[^0-9]/g, '');
  str = str.replace(/^0/g, '');
  if (str.length === 1) {
    str = '0' + str;
  }
  if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
    str = this.clientName + '_' + size + '_' + str + '_' + datestring + '.jpg';
  } else {
    str = this.designer + '_' + size + '_' + str + '_' + datestring + '.jpg';
  }
  return str;
}

PortfolioFilter.prototype.just_filter = function (str) {
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
  str = str.replace(/[^0-9]/g, '');
  str = str.replace(/^0/g, '');
  return str;
}

PortfolioFilter.prototype.to_portfolio = async function (liteMode = false) {
  const instance = this;
  const { fileSystem, shell, shellLink, todayMaker } = this.mother;
  let options = {
    home_dir: this.options.home_dir,
    apart_name: this.apartName,
    photo_dir: this.options.photo_dir,
    result_dir: this.options.result_dir,
    photo_list: [],
  };
  try {
    let file_list, resultFolderBoo;
    let rawFix_file_list;
    let new_photo_name, new_photo_name_list;
    let photo_sizes;
    let resultFolder;

    file_list = await fileSystem(`readDir`, [ this.options.photo_dir ]);
    for (let i = 0; i < file_list.length; i++) {
      if (file_list[i] === '.DS_Store') {
        file_list.splice(i, 1);
      }
    }

    if (file_list.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
      process.exit();
    }

    file_list.sort((a, b) => { return Number(instance.just_filter(a)) - Number(instance.just_filter(b)); });
    for (let i = 0; i < file_list.length; i++) {
      shell.exec(`mv ${shellLink(this.options.photo_dir + "/" + file_list[i])} ${shellLink(this.options.photo_dir)}/photo${String(i + 1)}.jpg`);
      file_list[i] = "photo" + String(i + 1) + ".jpg";
    }
    options.photo_list = file_list;
    console.log(file_list);

    rawFix_file_list = [];
    for (let photo of file_list) {
      rawFix_file_list.push(`${this.options.photo_dir}/${photo}`);
    }
    console.log(rawFix_file_list);

    await fileSystem(`write`, [ `${this.options.home_dir}/script/raw.js`, this.generator.factory.rawFilter(rawFix_file_list, options) ]);
    shell.exec(`osascript ${this.options.home_dir}/factory/applescript/raw.scpt`);

    photo_sizes = liteMode ? [ "780" ] : [ "780", "원본" ];

    resultFolderBoo = await fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i of resultFolderBoo) {
      shell.exec(`rm -rf ${shellLink(this.options.result_dir)}/${i};`);
    }

    if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
      this.folderName = `${this.pid}_${this.designer}_${this.clientName}_${todayMaker("year")}`;
    } else {
      this.folderName = `${this.pid}_${this.designer}_${todayMaker("year")}`;
    }
    resultFolder = `${this.options.result_dir}/${this.folderName}`;
    this.resultFolder = resultFolder;
    shell.exec(`mkdir ${shellLink(resultFolder)}`);

    for (let i of photo_sizes) {
      new_photo_name_list = [];
      shell.exec(`mkdir ${shellLink(resultFolder)}/${i}`);
      for (let photo of file_list) {
        new_photo_name = this.image_filter(photo, i);
        shell.exec(`cp ${shellLink(this.options.photo_dir)}/${photo} ${shellLink(resultFolder)}/${i}/${new_photo_name}`);
        new_photo_name_list.push(`${resultFolder}/${i}/${new_photo_name}`);
      }
      options.size = i;
      await fileSystem(`write`, [ `${this.options.home_dir}/script/to_portfolio.js`, this.generator.factory.to_portfolio(new_photo_name_list, options) ]);
      shell.exec(`osascript ${this.options.home_dir}/factory/applescript/to_portfolio.scpt`);
    }

    if (!liteMode) {
      await fileSystem(`write`, [ `${this.options.home_dir}/script/to_png.js`, this.generator.factory.to_png({}, options) ]);
      shell.exec(`osascript ${this.options.home_dir}/factory/applescript/to_png.scpt`);
    }

    shell.exec(`osascript ${this.options.home_dir}/factory/applescript/return_terminal.scpt`);

    return resultFolder;

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.parsing_fileList = async function (resultFolder, liteMode = false) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let fileList_780_raw, fileList_original_raw, fileList_png_raw;
    let fileList_780, fileList_original, fileList_png;
    let resultFolderArr, resultFolderParent;

    resultFolderArr = resultFolder.split('/');
    resultFolderArr.pop();
    resultFolderParent = resultFolderArr.join('/');

    fileList_780 = [];
    fileList_original = [];
    fileList_png = [];

    fileList_780_raw = await fileSystem(`readDir`, [ `${resultFolder}/780` ]);
    if (!liteMode) {
      fileList_original_raw = await fileSystem(`readDir`, [ `${resultFolder}/원본` ]);
      fileList_png_raw = await fileSystem(`readDir`, [ resultFolderParent ]);
    }

    for (let i of fileList_780_raw) {
      if (i !== `.DS_Store`) {
        fileList_780.push(resultFolder + "/780/" + i);
      }
    }

    if (!liteMode) {
      for (let i of fileList_original_raw) {
        if (i !== `.DS_Store`) {
          fileList_original.push(resultFolder + "/원본/" + i);
        }
      }
      for (let i of fileList_png_raw) {
        if (/\.png$/g.test(i)) {
          fileList_png.push(resultFolderParent + "/" + i);
          console.log(i);
        }
      }
    }

    return { fileList_780, fileList_original, fileList_png };
  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.ghost_filter = async function (start_num) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  let options = {
    home_dir: this.options.home_dir,
    photo_dir: this.options.photo_dir,
    result_dir: this.options.result_dir,
    photo_list: [],
    start_num: start_num,
  };

  try {
    let past_list, file_list;

    past_list = await fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i of past_list) {
      shell.exec(`rm -rf ${shellLink(this.options.result_dir)}/${i};`)
    }

    file_list = await fileSystem(`readDir`, [ this.options.photo_dir ]);
    for (let i = 0; i < file_list.length; i++) {
      if (file_list[i] === '.DS_Store') {
        file_list.splice(i, 1);
      }
    }

    if (file_list.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
      process.exit();
    }

    file_list.sort((a, b) => { return Number(a.replace(/[^0-9]/gi, '')) - Number(b.replace(/[^0-9]/gi, '')); });
    console.log(file_list);

    options.photo_list = file_list;
    await fileSystem(`write`, [ `${shellLink(this.options.home_dir)}/script/ghostFilter.js`, this.generator.factory.ghostFilter({}, options) ]);
    shell.exec(`osascript ${shellLink(this.options.home_dir)}/factory/applescript/ghostFilter.scpt`);

    return { result_folder: `${this.options.home_dir}/result`, script_folder: `${this.options.home_dir}/factory/applescript` };

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.total_make = async function (liteMode = false) {
  const instance = this;
  const { fileSystem, shell, shellLink, slack_bot, s3FileUpload, ghostFileUpload, ghostRequest, sleep } = this.mother;
  const photoRequest = ghostRequest().bind("photo");
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const drive = new GoogleDrive();
  const idFilterNum = function (past) {
    past = past.replace(/\.jpg$/, '');
    past = past.replace(/_[0-9][0-9][0-9][0-9][0-9][0-9]$/, '');
    past = past.replace(/[^0-9]/g, '');
    past = past.replace(/^0/, '');
    let newNumber = Number(past);
    return (newNumber);
  }
  const idFilter = function (past) {
    return String(idFilterNum(past));
  }
  try {
    const photoFolderConst = "사진_등록_포트폴리오";
    const sambaPhotoPath = `/samba/drive/HomeLiaisonServer/${photoFolderConst}`;
    const targetFolderIdConst = "1KUt6DHSVtHBsknsKcIo8Woc2t1vyPd21";
    const aTargetFolderIdConst = "18x4Ym6Sm8PK2PGEglRbxqn5-L7lquVXG";
    await this.static_setting();

    let thisFolderId, folderId_780, folderId_original;
    let pidFolder, fromArr, toArr;
    let webViewLink;
    let resultFolder;
    let ghostPhotos;
    let scpTarget;

    resultFolder = await this.to_portfolio(liteMode);
    const { fileList_780, fileList_original, fileList_png } = await this.parsing_fileList(resultFolder, liteMode);
    console.log(fileList_780, fileList_original, fileList_png);
    if (fileList_780.length === 0 || fileList_original.length === 0) {
      throw new Error("no photo error");
    }

    //google drive upload
    if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
      thisFolderId = await drive.makeFolder_andMove_inPython(this.folderName, targetFolderIdConst);
    } else {
      thisFolderId = await drive.makeFolder_andMove_inPython(this.folderName, aTargetFolderIdConst);
    }
    await drive.sleep(500);
    console.log(`make folder ${this.folderName} done`);
    // folderId_780 = await drive.makeFolder_andMove_inPython("780", thisFolderId);
    // await drive.sleep(500);
    // console.log(`make folder ${this.folderName}/780 done`);
    // if (!liteMode) {
    //   folderId_original = await drive.makeFolder_andMove_inPython("원본", thisFolderId);
    //   await drive.sleep(500);
    //   console.log(`make folder ${this.folderName}/원본 done`);
    // }

    //fix dir
    console.log(await ghostRequest("fixDir", {
      await: true,
      target: "__samba__/" + photoFolderConst
    }));
    console.log(`ghost request done`);

    for (let z = 0; z < 3; z++) {
      console.log(`insync waiting... ${String(3 - z)}s`);
      await sleep(1000);
    }

    ghostPhotos = await photoRequest("ls");
    while (!ghostPhotos.includes(this.folderName)) {
      for (let z = 0; z < 5; z++) {
        console.log(`insync waiting... ${String(5 - z)}s`);
        await sleep(1000);
      }
      ghostPhotos = await photoRequest("ls");
    }

    scpTarget = `${this.address.officeinfo.ghost.user}@${this.address.officeinfo.ghost.host}:/home/${shellLink(this.address.officeinfo.ghost.user + sambaPhotoPath + "/" + this.folderName)}/`;

    shell.exec(`scp -r ${shellLink(fileList_780[0].split("/").slice(0, -1).join("/"))} ${scpTarget}`);
    if (!liteMode) {
      shell.exec(`scp -r ${shellLink(fileList_original[0].split("/").slice(0, -1).join("/"))} ${scpTarget}`);
      for (let f of fileList_png) {
        shell.exec(`scp ${shellLink(f)} ${scpTarget}`);
      }
    }

    //slack
    webViewLink = await drive.read_webView_inPython(thisFolderId);
    await slack_bot.chat.postMessage({ text: `${this.folderName} 사진을 공유하였습니다! : \n${webViewLink}`, channel: `#502_sns_contents` });

    //s3 upload
    if (!liteMode) {
      shell.exec(`mv ${shellLink(this.resultFolder)}/원본 ${shellLink(this.resultFolder)}/${this.pid}`);
      pidFolder = await fileSystem(`readDir`, [ this.resultFolder + "/" + this.pid ]);
      fromArr = [];
      toArr = [];

      pidFolder.sort((a, b) => { return idFilterNum(a) - idFilterNum(b); });

      for (let i of pidFolder) {
        if (i !== `.DS_Store`) {
          shell.exec(`mv ${shellLink(this.resultFolder + "/" + this.pid + "/" + i)} ${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          fromArr.push(`${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          toArr.push(`corePortfolio/original/${this.pid}/i${idFilter(i)}${this.pid}.jpg`);
        }
      }

      console.log(fromArr);
      console.log(toArr);
      await s3FileUpload(fromArr, toArr);
      console.log(`s3 upload done`);

      await ghostFileUpload(fromArr, toArr);
      console.log(`ghost upload done`);
    }

    //fix dir
    console.log(await ghostRequest("fixDir", {
      await: true,
      target: "__samba__/" + photoFolderConst
    }));
    console.log(`second ghost request done`);

    return this.folderName;

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.image_ready = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, slack_bot } = this.mother;
  try {
    await this.static_setting();

    let fileList, fullFileList;
    let resourceFolder, resultFolder;
    let resultFolderList;
    let targetPhotoDir;

    resourceFolder = this.options.photo_dir;
    resultFolder = this.options.result_dir;

    fileList = await fileSystem(`readDir`, [ resourceFolder ]);
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i] === '.DS_Store') {
        fileList.splice(i, 1);
      }
    }

    if (fileList.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${resourceFolder}`);
      process.exit();
    }

    fileList.sort((a, b) => { return Number(instance.just_filter(a)) - Number(instance.just_filter(b)); });
    for (let i = 0; i < fileList.length; i++) {
      shell.exec(`mv ${shellLink(resourceFolder + "/" + fileList[i])} ${shellLink(resourceFolder)}/photo${String(i + 1)}.jpg`);
      fileList[i] = "photo" + String(i + 1) + ".jpg";
    }

    fullFileList = [];
    for (let photo of fileList) {
      fullFileList.push(`${resourceFolder}/${photo}`);
    }

    console.log(fileList);

    resultFolderList = await fileSystem(`readDir`, [ resultFolder ]);
    for (let i of resultFolderList) {
      shell.exec(`rm -rf ${shellLink(resultFolder)}/${i};`);
    }
    shell.exec(`mkdir ${shellLink(resultFolder)}/A`);

    await fileSystem(`write`, [ `${this.options.home_dir}/script/white.js`, this.generator.factory.whiteFilter(fullFileList, this.options) ]);
    shell.exec(`osascript ${this.options.home_dir}/factory/applescript/white.scpt`);

    shell.exec(`open ${shellLink(resultFolder)}`);
    console.log(`done`);

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.ghost_make = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shell, shellLink, consoleQ, s3FileUpload, ghostFileUpload } = this.mother;
  const getNumber = (obj) => { return Number(obj.link.slice(1).replace(/\.jpg$/g, '').split('/')[2].replace(/^g/g,'')); };
  try {
    const ghostStatic = "/rawDesigner/ghost";
    let targetDesigner, ghostArray, designers;
    let consoleInput;
    let startNumber;
    let result_files, dimensions;
    let fromArr, toArr;

    await this.static_setting();

    //find designer and set designer object
    designers = await back.getDesignersByQuery({ designer: this.designer });
    if (designers.length > 1) {
      console.log(`Exception occur : `);
      for (let i = 0; i < designers.length; i++) {
        console.log(`exceptionId : ${String(i + 1)} => designer : ${i.designer} / desid : ${i.desid}`);
      }
      consoleInput = await consoleQ(`Exception number : `);
      targetDesigner = designers[Number(consoleInput.replace(/[^0-9]/g, '')) - 1].toNormal();
    } else {
      targetDesigner = designers[0].toNormal();
    }

    //set ghost array
    ghostArray = targetDesigner.setting.ghost;

    //find start number of ghost-picture
    if (ghostArray.length === 0) {
      startNumber = 0;
    } else {
      ghostArray.sort((a, b) => { return getNumber(b) - getNumber(a); });
      startNumber = getNumber(ghostArray[0]);
    }

    //run ghost filter
    const { result_folder, script_folder } = await this.ghost_filter(startNumber);
    result_files = await fileSystem(`readDir`, [ result_folder ]);

    fromArr = [];
    toArr = [];

    for (let file of result_files) {
      if (file !== ".DS_Store") {
        fromArr.push(result_folder + "/" + file);
        toArr.push(`${ghostStatic.slice(1)}/${targetDesigner.desid}/${file}`);
        dimensions = shell.exec(`osascript ${shellLink(script_folder)}/photo_sg.scpt ${shellLink(result_folder)}/${file}`);
        ghostArray.unshift({
          link: `${ghostStatic}/${targetDesigner.desid}/${file}`,
          sgTrue: dimensions.replace(/[^gs]/g, ''),
        });
      }
    }

    console.log(ghostArray);
    console.log(fromArr);
    console.log(toArr);

    await back.updateDesigner([ { desid: targetDesigner.desid }, { "setting.ghost": ghostArray } ]);
    await s3FileUpload(fromArr, toArr);
    await ghostFileUpload(fromArr, toArr);

  } catch (e) {
    console.log(e.message);
  }
}

PortfolioFilter.prototype.additionalRepair = async function (pid, tNumber) {
  const instance = this;
  const { fileSystem, shell, shellLink, s3FileUpload, ghostFileUpload, todayMaker } = this.mother;
  const home = process.env.HOME;
  const tempFolderName = "__PortfolioFilteraddtionalRepairTemp__" + todayMaker("year");
  try {
    let homeDir;
    let currentDir, currentDirArr;
    let binaryTarget, binaryTargetDir;
    let targetFolder, targetFile;
    let fromArr, toArr;

    fromArr = [];
    toArr = [];

    currentDir = process.cwd();
    currentDirArr = currentDir.split("/");
    currentDirArr.pop();
    currentDirArr.push("binary");
    currentDirArr.push("corePortfolio");
    currentDirArr.push("original");
    binaryTarget = currentDirArr.join("/");

    binaryTargetDir = await fileSystem("readDir", [ binaryTarget ]);

    for (let i of binaryTargetDir) {
      if ((new RegExp('^' + pid)).test(i)) {
        targetFolder = i;
      }
    }

    targetFile = 'i' + String(tNumber) + pid + ".jpg";

    homeDir = await fileSystem("readDir", [ home ]);
    if (!homeDir.includes(tempFolderName)) {
      shell.exec(`mkdir ${shellLink(home)}/${tempFolderName}`);
    }
    shell.exec(`cp ${shellLink(binaryTarget + '/' + targetFolder + '/' + pid + '/' + targetFile)} ${shellLink(home)}/${tempFolderName}/`);

    fromArr.push(shellLink(home + '/' + tempFolderName + '/' + targetFile));
    toArr.push(`corePortfolio/original/${pid}/${targetFile}`);

    await s3FileUpload(fromArr, toArr);
    await ghostFileUpload(fromArr, toArr);

    shell.exec(`rm -rf ${shellLink(home)}/${tempFolderName}`);

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.rawToRaw = async function (arr) {
  const instance = this;
  const back = this.back;
  const { fileSystem, shell, shellLink, consoleQ, appleScript, sleep, ghostRequest } = this.mother;
  const photoRequest = ghostRequest().bind("photo");
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GaroseroParser = require(`${process.cwd()}/apps/garoseroParser/garoseroParser.js`);
  const errorMessage = `argument must be => [ { client: "", designer: "", pid: "", link: "" } ... ]`;
  const photoFolderConst = "사진_등록_포트폴리오";
  const sambaPhotoPath = `/samba/drive/HomeLiaisonServer/${photoFolderConst}`;
  const foreCastContant = `/corePortfolio/forecast`;
  const forecastPath = this.address.homeinfo.ghost.file.static + foreCastContant;
  class RawArray extends Array {
    constructor(arr) {
      super();
      if (arr.length === 0) {
        throw new Error(errorMessage);
      }
      for (let i of arr) {
        if (i.client === undefined || i.designer === undefined || i.pid === undefined || i.link === undefined) {
          throw new Error(errorMessage);
        }
        this.push(i);
      }
    }
  }
  try {
    if (!Array.isArray(arr)) {
      throw new Error(errorMessage);
    }
    arr = new RawArray(arr);
    const drive = new GoogleDrive();
    let folderPath;
    let designers, consoleInput, targetDesigner, googleFolderName;
    let adobe, tempAppList;
    let folderPathList_raw, folderPathList;
    let forecast, garoseroParser;
    let finalObj;
    let ghostPhotos;

    tempAppList = await fileSystem(`readDir`, [ `/Applications` ]);
    adobe = null;
    for (let i of tempAppList) {
      if (/Photoshop/gi.test(i)) {
        adobe = i;
      }
    }
    if (adobe === null) {
      throw new Error("There is no photoshop");
    }
    const photoshopScript = function (argv, app) {
      let text = '';
      text += 'tell application "' + app + '"\n';
      text += '\tactivate\n';
      text += '\topen file "' + argv + '"\n';
      text += '\tset docheight to height of document 1\n';
      text += '\tset docWidth to width of document 1\n';
      text += '\tif docheight < docWidth then\n';
      text += '\t\tdo action "fore_garo" from "to_portfolio"\n';
      text += '\t\tclose document 1\n';
      text += '\t\treturn "g"\n';
      text += '\telse\n';
      text += '\t\tdo action "fore_sero" from "to_portfolio"\n';
      text += '\t\tclose document 1\n';
      text += '\t\treturn "s"\n';
      text += '\tend if\n';
      text += 'end tell';
      return text;
    }

    garoseroParser = new GaroseroParser();
    await this.static_setting();

    for (let { client, designer, pid, link } of arr) {

      designers = await back.getDesignersByQuery({ designer: designer });
      if (designers.length > 1) {
        console.log(`Exception occur : `);
        for (let i = 0; i < designers.length; i++) {
          console.log(`exceptionId : ${String(i + 1)} => designer : ${i.designer} / desid : ${i.desid}`);
        }
        consoleInput = await consoleQ(`Exception number : `);
        targetDesigner = designers[Number(consoleInput.replace(/[^0-9]/g, '')) - 1].toNormal();
      } else {
        targetDesigner = designers[0].toNormal();
      }

      folderPath = await drive.get_folder(link, `${pid}__${targetDesigner.desid}`);
      folderPathList_raw = await fileSystem(`readDir`, [ folderPath ]);
      folderPathList = folderPathList_raw.filter((name) => { return (name !== ".DS_Store"); });

      shell.exec(`rm -rf ${shellLink(this.options.photo_dir)};`);
      shell.exec(`cp -r ${shellLink(folderPath)} ${shellLink(this.options.photo_dir)};`);

      this.clientName = client;
      this.designer = designer;
      this.pid = pid;
      this.apartName = "";
      googleFolderName = await this.total_make(true);

      ghostPhotos = await photoRequest("ls");
      while (!ghostPhotos.includes(googleFolderName)) {
        console.log(await ghostRequest("fixDir", {
          await: true,
          target: "__samba__/" + photoFolderConst
        }));
        console.log(`third ghost request done`);
        for (let z = 0; z < 5; z++) {
          console.log(`insync waiting... ${String(5 - z)}s`);
          await sleep(1000);
        }
        ghostPhotos = await photoRequest("ls");
      }

      shell.exec(`scp -r ${shellLink(folderPath)} ${this.address.officeinfo.ghost.user}@${this.address.officeinfo.ghost.host}:/home/${shellLink(this.address.officeinfo.ghost.user + sambaPhotoPath + "/" + googleFolderName)}/`);

      for (let item of folderPathList) {
        await appleScript(`compress_${item.replace(/\./g, '')}`, photoshopScript(shellLink(`${folderPath}/${item}`), adobe), null, false);
      }
      forecast = await garoseroParser.queryDirectory(folderPath, true);
      for (let obj of forecast) {
        obj.file = foreCastContant + "/" + obj.file.split("/").slice(-2).join("/");
      }

      finalObj = { pid, desid: targetDesigner.desid, forecast };
      await back.mongoCreate("foreContents", finalObj, { console: true });

      shell.exec(`scp -r ${shellLink(folderPath)} ${this.address.homeinfo.ghost.user}@${this.address.homeinfo.ghost.host}:${shellLink(forecastPath)}/`);

      for (let z = 0; z < 3; z++) {
        console.log(`scp waiting... ${String(3 - z)}s`);
        await sleep(1000);
      }

      shell.exec(`rm -rf ${shellLink(folderPath)};`);

      console.log(`${client}C ${designer}D raw to raw done;`)
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = PortfolioFilter;
