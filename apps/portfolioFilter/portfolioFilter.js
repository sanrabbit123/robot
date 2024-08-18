const PortfolioFilter = function (clientName = "", apartName = "", designer = "", pid = "g0") {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ImageReader = require(`${process.cwd()}/apps/imageReader/imageReader.js`);
  const ParsingHangul = require(process.cwd() + "/apps/parsingHangul/parsingHangul.js");
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
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = `${process.cwd()}/apps/portfolioFilter`;
  this.image = new ImageReader(this.mother, this.back, this.address);
  this.hangul = new ParsingHangul();
  this.generator = {
    factory: require(this.dir + "/factory/generator.js"),
  };
  this.clientName = clientName;
  this.designer = designer;
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
  const { fileSystem, shellExec, shellLink } = this.mother;
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
      await shellExec(order);
    } else {
      staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);
      staticFolderscriptBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^script$/.test(i)) {
          staticFolderscriptBootr = true;
        }
      }
      if (!staticFolderscriptBootr) {
        await shellExec(`mkdir ${shellLink(this.options.home_dir)}/script`);
      }
      staticFolderresultBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^result$/.test(i)) {
          staticFolderresultBootr = true;
        }
      }
      if (!staticFolderresultBootr) {
        await shellExec(`mkdir ${shellLink(this.options.home_dir)}/result`);
      }
      staticFolderresourceBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^resource$/.test(i)) {
          staticFolderresourceBootr = true;
        }
      }
      if (!staticFolderresourceBootr) {
        await shellExec(`mkdir ${shellLink(this.options.home_dir)}/resource`);
      }
    }

    folderList = [ "factory" ];
    for (let f of folderList) {
      await shellExec(`cp -r ${shellLink(process.cwd())}/apps/portfolioFilter/${f} ${shellLink(this.options.home_dir)}`);
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
  const image = this.image;
  const { fileSystem, shellExec, shellLink, todayMaker } = this.mother;
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
    let tempObj;
    let pngResultFolder;
    let pngImageList;

    file_list = await fileSystem(`readFolder`, [ this.options.photo_dir ]);
    if (file_list.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
    }

    file_list.sort((a, b) => { return Number(instance.just_filter(a)) - Number(instance.just_filter(b)); });
    for (let i = 0; i < file_list.length; i++) {
      await shellExec(`mv ${shellLink(this.options.photo_dir + "/" + file_list[i])} ${shellLink(this.options.photo_dir)}/photo${String(i + 1)}.jpg`);
      file_list[i] = "photo" + String(i + 1) + ".jpg";
    }
    options.photo_list = file_list;
    console.log(file_list);

    rawFix_file_list = [];
    for (let photo of file_list) {
      rawFix_file_list.push(`${this.options.photo_dir}/${photo}`);
    }
    console.log(rawFix_file_list);

    photo_sizes = liteMode ? [ "780" ] : [ "3508" ];

    resultFolderBoo = await fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i of resultFolderBoo) {
      await shellExec(`rm -rf ${shellLink(this.options.result_dir)}/${i};`);
    }

    if (!this.clientNullATarget.includes(this.clientName) && !/없/gi.test(this.clientName)) {
      this.folderName = `${this.pid}_${this.designer}_${this.clientName}_${todayMaker("total")}`;
    } else {
      this.folderName = `${this.pid}_${this.designer}_${todayMaker("total")}`;
    }
    resultFolder = `${this.options.result_dir}/${this.folderName}`;
    this.resultFolder = resultFolder;
    await shellExec(`mkdir ${shellLink(resultFolder)}`);

    for (let i of photo_sizes) {
      new_photo_name_list = [];
      await shellExec(`mkdir ${shellLink(resultFolder)}/${i}`);
      for (let targetImage of rawFix_file_list) {
        new_photo_name = this.image_filter(targetImage, i);
        tempObj = await image.toOfficialImage(targetImage, Number(i), false, liteMode);
        await shellExec(`mv ${shellLink(tempObj.output)} ${shellLink(resultFolder)}/${i}/${new_photo_name}`);
        new_photo_name_list.push(`${resultFolder}/${i}/${new_photo_name}`);
      }
    }

    return resultFolder;

  } catch (e) {
    console.log(e);
    return null;
  }
}

PortfolioFilter.prototype.parsing_fileList = async function (resultFolder, liteMode = false) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let fileList_780_raw, fileList_1500_raw, fileList_original_raw, fileList_png_raw;
    let fileList_780, fileList_1500, fileList_original, fileList_png;
    let resultFolderArr, resultFolderParent;

    resultFolderArr = resultFolder.split('/');
    resultFolderArr.pop();
    resultFolderParent = resultFolderArr.join('/');

    try {
      fileList_780_raw = await fileSystem(`readDir`, [ `${resultFolder}/780` ]);
      if (!liteMode) {
        fileList_original_raw = await fileSystem(`readDir`, [ `${resultFolder}/3508` ]);
      }
    } catch {
      fileList_780_raw = [];
      fileList_original_raw = [];
    }

    fileList_780 = [];
    fileList_original = [];

    for (let i of fileList_780_raw) {
      if (i !== `.DS_Store`) {
        fileList_780.push(resultFolder + "/780/" + i);
      }
    }
    if (!liteMode) {
      for (let i of fileList_original_raw) {
        if (i !== `.DS_Store`) {
          fileList_original.push(resultFolder + "/3508/" + i);
        }
      }
    }

    return { fileList_780, fileList_1500: [], fileList_original, fileList_png: [] };
  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.ghost_filter = async function (start_num) {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
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
      await shellExec(`rm -rf ${shellLink(this.options.result_dir)}/${i};`)
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
    await shellExec(`osascript ${shellLink(this.options.home_dir)}/factory/applescript/ghostFilter.scpt`);

    return { result_folder: `${this.options.home_dir}/result`, script_folder: `${this.options.home_dir}/factory/applescript` };

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.total_make = async function (liteMode = false) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, ghostFileUpload, sleep, messageSend, requestSystem } = this.mother;
  const idFilterNum = function (past) {
    let newNumber;
    past = past.split('_')[2];
    past = past.replace(/[^0-9]/g, '');
    past = past.replace(/^0/, '');
    newNumber = Number(past);
    return newNumber;
  }
  const idFilter = function (past) {
    return String(idFilterNum(past));
  }
  try {
    const photoFolderConst = "사진_등록_포트폴리오";
    await this.static_setting();

    let pidFolder, fromArr, toArr;
    let resultFolder;
    let ghostPhotos, ghostPhotosTarget;
    let sambaPhotoPath;

    resultFolder = await this.to_portfolio(liteMode);
    const { fileList_780, fileList_original } = await this.parsing_fileList(resultFolder, liteMode);
    console.log(fileList_780, fileList_original);

    if (liteMode) {
      sambaPhotoPath = instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + this.folderName;
      await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/makeFolder", { path: sambaPhotoPath }, { headers: { "Content-Type": "application/json" } });
    } else {
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } })).data.map(({ fileName }) => { return fileName });
      ghostPhotosTarget = null;
      for (let folder of ghostPhotos) {
        if ((new RegExp("^" + this.pid)).test(folder)) {
          ghostPhotosTarget = folder;
        }
      }
      if (ghostPhotosTarget === null) {
        throw new Error("there is no folder in server");
      } else {
        this.folderName = ghostPhotosTarget;
      }
      sambaPhotoPath = instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + this.folderName;
    }

    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/780" ])
    } catch {}
    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/1500" ])
    } catch {}
    try {
      await shellExec("mkdir", [ instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/3508" ])
    } catch {}

    if (!liteMode) {
      for (let f of fileList_original) {
        await shellExec(`cp`, [ f, instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/3508/" ]);
      }
    } else {
      for (let f of fileList_780) {
        await shellExec(`cp`, [ f, instance.address.officeinfo.ghost.file.static + "/" + sambaPhotoPath.replace(/^\//i, '').replace(/\/$/i, '') + "/780/" ]);
      }
    }
    await messageSend({ text: `${this.folderName} 사진을 처리하였습니다! (total_make success)`, channel: `#502_sns_contents` });

    if (!liteMode) {
      await shellExec(`mv ${shellLink(this.resultFolder)}/3508 ${shellLink(this.resultFolder)}/${this.pid}`);
      pidFolder = await fileSystem(`readDir`, [ this.resultFolder + "/" + this.pid ]);
      fromArr = [];
      toArr = [];

      pidFolder.sort((a, b) => { return idFilterNum(a) - idFilterNum(b); });

      try {
        await shellExec("mkdir", [ `${instance.address.officeinfo.ghost.file.static}/corePortfolio/original/${this.pid}` ])
      } catch {}
      for (let i of pidFolder) {
        if (i !== `.DS_Store`) {
          await shellExec(`mv ${shellLink(this.resultFolder + "/" + this.pid + "/" + i)} ${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          await shellExec(`cp`, [ `${(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`, `${instance.address.officeinfo.ghost.file.static}/corePortfolio/original/${this.pid}/` ]);
          fromArr.push(`${shellLink(this.resultFolder + "/" + this.pid)}/i${idFilter(i)}${this.pid}.jpg`);
          toArr.push(`corePortfolio/original/${this.pid}/i${idFilter(i)}${this.pid}.jpg`);
        }
      }

      console.log(fromArr);
      console.log(toArr);
      await ghostFileUpload(fromArr, toArr);
      console.log(`ghost upload done`);
    }

    return { folderName: this.folderName };

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.image_ready = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
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
    }

    fileList.sort((a, b) => { return Number(instance.just_filter(a)) - Number(instance.just_filter(b)); });
    for (let i = 0; i < fileList.length; i++) {
      await shellExec(`mv ${shellLink(resourceFolder + "/" + fileList[i])} ${shellLink(resourceFolder)}/photo${String(i + 1)}.jpg`);
      fileList[i] = "photo" + String(i + 1) + ".jpg";
    }

    fullFileList = [];
    for (let photo of fileList) {
      fullFileList.push(`${resourceFolder}/${photo}`);
    }

    console.log(fileList);

    resultFolderList = await fileSystem(`readDir`, [ resultFolder ]);
    for (let i of resultFolderList) {
      await shellExec(`rm -rf ${shellLink(resultFolder)}/${i};`);
    }
    await shellExec(`mkdir ${shellLink(resultFolder)}/A`);

    await fileSystem(`write`, [ `${this.options.home_dir}/script/white.js`, this.generator.factory.whiteFilter(fullFileList, this.options) ]);
    await shellExec(`osascript ${this.options.home_dir}/factory/applescript/white.scpt`);

    await shellExec(`open ${shellLink(resultFolder)}`);
    console.log(`done`);

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.ghost_make = async function () {
  const instance = this;
  const back = this.back;
  const { fileSystem, shellExec, shellLink, consoleQ, ghostFileUpload } = this.mother;
  const getNumber = function (obj) {
    let link = obj.link;
    let tempArr;
    tempArr = link.split('/');
    return Number(tempArr[tempArr.length - 1].replace(/[^0-9]/gi, ''));
  };
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
        dimensions = await shellExec(`osascript ${shellLink(script_folder)}/photo_sg.scpt ${shellLink(result_folder)}/${file}`);
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
    await ghostFileUpload(fromArr, toArr);

  } catch (e) {
    console.log(e.message);
  }
}

PortfolioFilter.prototype.additionalRepair = async function (pid, tNumber) {
  const instance = this;
  const { fileSystem, shell, shellLink, ghostFileUpload, todayMaker } = this.mother;
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

    await ghostFileUpload(fromArr, toArr);

    shell.exec(`rm -rf ${shellLink(home)}/${tempFolderName}`);

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.rawToRaw = async function (arr) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const image = this.image;
  const { fileSystem, shellExec, shellLink, sleep, messageSend, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongoinfo } = this.mother;
  const GaroseroParser = require(`${process.cwd()}/apps/garoseroParser/garoseroParser.js`);
  const notePath = process.env.HOME + "/note/portfolio";
  const photoFolderConst = "사진_등록_포트폴리오";
  const foreCastContant = `/corePortfolio/forecast`;
  const forecastPath = this.address.officeinfo.ghost.file.static + foreCastContant;
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const kakaoInstance = new KakaoTalk();
  const collection = "foreContents";
  const selfCoreMongo = new mongo(mongoinfo);
  const selfMongo = new mongo(mongoofficeinfo);
  const garoseroParser = new GaroseroParser();
  let nextPid;

  nextPid = null;

  try {
    await selfMongo.connect();
    await selfCoreMongo.connect();
    let folderPath;
    let designers, consoleInput, targetDesigner, googleFolderName;
    let folderPathList_raw, folderPathList;
    let forecast;
    let finalObj;
    let foreRows;
    let note;
    let projects, project;
    let totalMakeResult;
    let shareLinkClient, shareLinkDeginer;
    let shareGoogleIdClient, shareGoogleIdDesigner;
    let clientObj, designerObj;
    let zipLinks;
    let consoleQInput;
    let contentsRows;
    let fromArr, toArr;
    let allContentsArr;
    let allProjects, allClients;
    let zipPhotoRes;
    let zipIdDesigner;
    let zipIdClient;
    let client, designer;
    let targetClient;
    let rawObj;

    await this.static_setting();

    rawObj = arr[0];
    client = rawObj.cliid;
    designer = rawObj.desid;
    nextPid = null;

    if (/^c[0-9]/.test(client) && /^d[0-9]/.test(designer)) {

      [ targetClient ] = await back.mongoRead("client", { cliid: client }, { selfMongo: selfCoreMongo });
      [ targetDesigner ] = await back.mongoRead("designer", { desid: designer }, { selfMongo: selfCoreMongo });

      await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ])
      await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);

      foreRows = (await back.mongoRead("contents", {}, { selfMongo: selfCoreMongo })).map((c) => { return { pid: c.contents.portfolio.pid } }).filter((o) => { return /^p/.test(o.pid) });
      foreRows.sort((a, b) => {
        return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, ''));
      });
      nextPid = 'p' + String(Number(foreRows[0].pid.replace(/[^0-9]/gi, '')) + 1);
      folderPath = `${process.cwd()}/temp/resource`;

      this.clientName = targetClient.name;
      this.designer = targetDesigner.designer;
      this.pid = nextPid;
      this.apartName = "";
      totalMakeResult = await this.total_make(true);
      googleFolderName = totalMakeResult.folderName;

      folderPathList = await fileSystem(`readFolder`, [ folderPath ]);

      fromArr = [];
      toArr = [];

      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}` ]);
      } catch {}
      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}` ]);
      } catch {}
      for (let f of folderPathList) {
        await shellExec("cp", [ `${folderPath}/${f}`, `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}/` ]);
      }
      console.log(`original copy done`);

      forecast = await garoseroParser.queryDirectory(folderPath);
      for (let obj of forecast) {
        obj.file = foreCastContant + "/" + nextPid + "/" + obj.file.split("/").slice(-1).join("/");
      }
      finalObj = { pid: nextPid, desid: targetDesigner.desid, client, forecast };
      await back.mongoCreate(collection, finalObj, { selfMongo });
      console.log("db in success");

      folderPathList = await fileSystem(`readFolder`, [ folderPath ]);
      fromArr = [];
      toArr = [];

      try {
        await shellExec("mkdir", [ `${forecastPath}/${this.pid}` ]);
      } catch {}
      for (let f of folderPathList) {
        fromArr.push(`${folderPath}/${f}`);
        toArr.push(`${foreCastContant}/${this.pid}/${f}`);
        await shellExec("cp", [ `${folderPath}/${f}`, `${forecastPath}/${this.pid}/` ]);
      }
      console.log(`forecast copy done`);

      [ project ] = await back.mongoRead("project", { proid: rawObj.proid }, { selfMongo: selfCoreMongo });
      await back.updateProject([
        { proid: project.proid },
        {
          "contents.raw.photo.status": "원본 보정 완료",
          "contents.share.client.photo": new Date(),
          "contents.share.designer.photo": new Date(),
        }
      ], { selfMongo: selfCoreMongo });
      await back.mongoUpdate(collection, [ { pid: nextPid }, { proid: project.proid } ], { selfMongo });
      await back.mongoUpdate(collection, [ { pid: nextPid }, { exception: false } ], { selfMongo });

      clientObj = targetClient;
      designerObj = targetDesigner;

      await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/zipPhoto", { pid: nextPid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });

      await shellExec(`rm -rf ${shellLink(folderPath)};`);

      await requestSystem("https://" + instance.address.officeinfo.host + ":3000/evaluationNotice", { mode: "send", cliid: clientObj.cliid, desid: designerObj.desid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });
      await kakaoInstance.sendTalk("photoShareClient", clientObj.name, clientObj.phone, { client: clientObj.name, host: instance.address.frontinfo.host, path: "evaluation", proid: project.proid });
      await kakaoInstance.sendTalk("photoShareDesigner", designerObj.designer, designerObj.information.phone, { client: clientObj.name, designer: designerObj.designer, host: instance.address.frontinfo.host, proid: project.proid });
      await messageSend({ text: `${designerObj.designer} 디자이너, ${clientObj.name} 고객님께 사진 공유 알림톡을 전송하였습니다!`, channel: `#502_sns_contents` });
      await requestSystem("https://" + instance.address.officeinfo.host + ":3002/justClientEvaluation", { mode: "store", cliid: clientObj.cliid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });

    } else {

      [ targetDesigner ] = await back.mongoRead("designer", { desid: designer }, { selfMongo: selfCoreMongo });

      await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ])
      await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);

      foreRows = (await back.mongoRead("contents", {}, { selfMongo: selfCoreMongo })).map((c) => { return { pid: c.contents.portfolio.pid } }).filter((o) => { return /^a/.test(o.pid) });
      foreRows.sort((a, b) => {
        return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, ''));
      });
      nextPid = 'a' + String(Number(foreRows[0].pid.replace(/[^0-9]/gi, '')) + 1);
      folderPath = `${process.cwd()}/temp/resource`;

      this.clientName = "없음";
      this.designer = targetDesigner.designer;
      this.pid = nextPid;
      this.apartName = "";
      totalMakeResult = await this.total_make(true);
      googleFolderName = totalMakeResult.folderName;

      folderPathList = await fileSystem(`readFolder`, [ folderPath ]);
      fromArr = [];
      toArr = [];

      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}` ]);
      } catch {}
      try {
        await shellExec("mkdir", [ `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}` ]);
      } catch {}
      for (let f of folderPathList) {
        await shellExec("cp", [ `${folderPath}/${f}`, `${this.address.officeinfo.ghost.file.static}/${this.address.officeinfo.ghost.file.office}/${photoFolderConst}/${googleFolderName}/${this.pid}/` ]);
      }
      console.log(`original copy done`);

      await shellExec(`rm -rf ${shellLink(folderPath)};`);
    }
    
    await selfMongo.close();
    await selfCoreMongo.close();
    return nextPid;
  } catch (e) {
    console.log(e);
    if (typeof nextPid === "string") {
      await back.mongoDelete(collection, { pid: nextPid }, { selfMongo });
    }
    await selfMongo.close();
    await selfCoreMongo.close();
    return false;
  }
}

PortfolioFilter.prototype.rawVideo = async function (arr) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const hangul = this.hangul;
  const options = this.options;
  const { mongo, mongoinfo, mongoofficeinfo, fileSystem, shellExec, shellLink, consoleQ, sleep, messageSend, requestSystem, ghostFileUpload } = this.mother;
  const errorMessage = `argument must be => [ { client: "", designer: "" } ... ]`;
  const selfMongo = new mongo(mongoinfo);
  const selfContentsMongo = new mongo(mongoofficeinfo);
  const collection = "foreContents";
  const splitToken = "__split__";
  const corePortfolio = "corePortfolio";
  const serverFolderName = "rawVideo";
  const videoFileKeyword = "v";
  try {
    if (!Array.isArray(arr)) {
      throw new Error(errorMessage);
    }
    let tempArr, tempArr2;
    let clientName, designerName;
    let projects;
    let targetProject;
    let rows;
    let thisProid, thisPid;
    let contentsArr;
    let thisFolderName;
    let response;
    let thisFileName;
    let exe;
    let targetFolder, targetFolderList;
    let num;

    await selfMongo.connect();
    await selfContentsMongo.connect();
    await this.static_setting();

    for (let { client, designer } of arr) {

      targetFolder = options.photo_dir;
      targetFolderList = await fileSystem(`readFolder`, [ targetFolder ]);

      num = 0;
      for (let name of targetFolderList) {
        await shellExec(`mv ${shellLink(targetFolder + "/" + name)} ${shellLink(targetFolder + "/" + client + "_" + designer + "_" + String(num) + "." + name.split(".")[name.split(".").length - 1])}`);
        num++;
      }

      targetFolder = options.photo_dir;
      targetFolderList = await fileSystem(`readFolder`, [ targetFolder ]);

      for (let fileName of targetFolderList) {
        tempArr = fileName.split("_");
        tempArr2 = tempArr[tempArr.length - 1].split(".");
        tempArr[tempArr.length - 1] = tempArr2[0];
        for (let i = 1; i < tempArr2.length; i++) {
          tempArr.push(tempArr2[i]);
        }
        [ clientName, designerName ] = tempArr;
        exe = tempArr[tempArr.length - 1];

        projects = await back.getProjectsByNames([ hangul.fixString(clientName.trim()), hangul.fixString(designerName.trim()) ], { selfMongo });

        if (projects.length === 0) {
          console.log(clientName, designerName);
          targetProject = null;
        } else {
          projects = projects.toNormal().filter((p) => { return p.desid !== "" });
          if (projects.length === 0) {
            console.log(clientName, designerName);
            targetProject = null;
          } else if (projects.length !== 1) {
            projects = projects.filter((p) => {
              return p.process.contract.remain.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            }).filter((p) => {
              return !/^드/gi.test(p.process.status);
            }).filter((p) => {
              return p.process.calculation.payments.first.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            }).filter((p) => {
              return p.contents.photo.date.valueOf() <= (new Date()).valueOf() && p.contents.photo.date.valueOf() > (new Date(2000, 0, 1)).valueOf();
            });
            projects.sort((a, b) => {
              return b.contents.photo.date.valueOf() - a.contents.photo.date.valueOf();
            });
            if (projects.length === 0) {
              console.log(clientName, designerName);
              targetProject = null;
            } else {
              [ targetProject ] = projects;
            }
          } else {
            [ targetProject ] = projects;
          }
        }

        if (targetProject === null) {
          throw new Error(clientName + " " + designerName + " " + "project not found");
        }

        thisProid = targetProject.proid;
        rows = await back.mongoRead(collection, { proid: thisProid }, { selfMongo: selfContentsMongo });

        if (rows.length > 0) {
          thisPid = rows[0].pid;
        } else {
          contentsArr = await back.getContentsArrByQuery({ proid: thisProid }, { selfMongo });
          if (contentsArr.length === 0) {
            if (projects.length > 1) {
              thisPid = null;
              for (let i = 1; i < projects.length; i++) {
                rows = await back.mongoRead(collection, { proid: projects[i].proid }, { selfMongo: selfContentsMongo });
                if (rows.length > 0) {
                  thisPid = rows[0].pid;
                } else {
                  contentsArr = await back.getContentsArrByQuery({ proid: projects[i].proid }, { selfMongo });
                  if (contentsArr.length > 0) {
                    thisPid = contentsArr[0].contents.portfolio.pid;
                  }
                }
                if (thisPid !== null) {
                  thisProid = projects[i].proid;
                  break;
                }
              }
              if (thisPid === null) {
                throw new Error(clientName + " " + designerName + " " + thisProid + " " + "pid error");
              }
            } else {
              throw new Error(clientName + " " + designerName + " " + thisProid + " " + "pid error");
            }
          } else {
            thisPid = contentsArr[0].contents.portfolio.pid;
          }
        }

        thisFolderName = thisProid + splitToken + thisPid;

        response = await requestSystem("https://" + address.officeinfo.ghost.host + "/makeFolder", {
          path: "/" + corePortfolio + "/" + serverFolderName + "/" + thisFolderName,
        }, {
          headers: { "Content-Type": "application/json" }
        });

        thisFileName = videoFileKeyword + String(response.data.list.length) + thisPid + "." + exe;
        await ghostFileUpload([ `${targetFolder}/${fileName}` ], [ "/" + corePortfolio + "/" + serverFolderName + "/" + thisFolderName + "/" + thisFileName ]);

      }

    }

  } catch (e) {
    console.log(e);
  } finally {
    await selfMongo.close();
    await selfContentsMongo.close();
  }
}

PortfolioFilter.prototype.updateSubject = async function (pid, individualKey = null) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongosecondinfo } = this.mother;
  const selfMongo = new mongo(mongoofficeinfo);
  const selfCoreMongo = new mongo(mongoinfo);
  const selfSecondMongo = new mongo(mongosecondinfo);
  try {
    await selfMongo.connect();
    await selfCoreMongo.connect();
    await selfSecondMongo.connect();
    const collection = "foreContents";
    const rawCollection = "designerRawContents";
    const toNormal = true;
    const photoFolderConst = "사진_등록_포트폴리오";
    let targetFores;
    let targetContents;
    let proid;
    let targetRaw;
    let targetBody;
    let tong;
    let thisBlank;
    let targetText;
    let frontText;
    let backText;
    let frontEnd;
    let backEnd;
    let project, client;
    let subjectInput;
    let apartInput;
    let regionInput;
    let targetPid;
    let addressArr;
    let contents;
    let ghostPhotos;
    let thisFolderName;
    let thisDesignerName;
    let thisDesid;
    let thisDesigner;
    let pyeongInput;
    let infoIndex;
    let backArr;

    if (/^p/.test(pid.trim())) {
      targetPid = pid;
      [ targetFores ] = await back.mongoRead(collection, { pid: targetPid }, { selfMongo });
      proid = targetFores.proid;
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });
      project = await back.getProjectById(proid, { selfMongo: selfCoreMongo, toNormal });
      client = await back.getClientById(project.cliid, { selfMongo: selfCoreMongo, toNormal });
  
      tong = [];
      targetBody = targetRaw.contents.body.split("\n").filter((s) => {
        return !/고객 상황에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/고객이 원하는 스타일에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/디자이너의 공간별 디자인 의도 이야기/gi.test(s);
      }).filter((s) => {
        return !/^[0-9][ ]*\./gi.test(s.trim());
      }).join("\n").trim().split("\n");
  
      thisBlank = false;
      tong = [];
      for (let i = 0; i < targetBody.length; i++) {
        targetText = targetBody[i].trim();
        if (targetText === '') {
          if (thisBlank) {
            // pass
          } else {
            tong.push(targetText);
          }
          thisBlank = true;
        } else {
          tong.push(targetText);
          thisBlank = false;
        }
      }
      frontText = '';
      backText = '';
      frontEnd = false;
      backEnd = false;
      for (let i = 0; i < tong.length; i++) {
        if (tong[i] !== '' && /^[^a-zA-Z가-힣0-9\.]/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (tong[i] !== '' && /^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (frontEnd) {
          backText += tong[i].replace(/^[^a-zA-Z가-힣]/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim() + "\n";
        } else {
          frontText += tong[i].trim() + " ";
          if (frontText.length > 500) {
            frontEnd = true;
          }
        }
      }
      frontText = frontText.trim();
      if (frontText === "") {
        frontText = "고객의 이야기를 적어주세요!";
      }
      backArr = backText.split("\n").map((str) => { return str.trim() }).filter((str) => { return str !== "" });
      infoIndex = backArr.findIndex((s) => { return /^[0-9]?\.?[ ]?공간[ ]?정보/gi.test(s.trim()) });
      if (infoIndex !== -1) {
        backArr = backArr.slice(0, infoIndex);
      }
      backArr = backArr.filter((str) => { return str.length >= 5 }).map((str) => { return str.trim(); });
      if (backArr.length > 3) {
        backArr[backArr.length - 2] = backArr[backArr.length - 2] + "\n\n" + backArr[backArr.length - 1];
        backArr = backArr.slice(0, -1);
      }

      addressArr = client.requests[0].request.space.address.split(" ").map((s) => { return s.trim() });
      subjectInput = "제목을 입력해주세요";
      apartInput = "아파트 아파트명";
      regionInput = addressArr[0].slice(0, 2) + " " + addressArr[1];

      await back.mongoUpdate(rawCollection, [ { proid }, {
        addition: {
          pid,
          subject: subjectInput.trim(),
          apart: apartInput.trim(),
          region: regionInput.trim(),
          pyeong: client.requests[0].request.space.pyeong,
          text: {
            front: frontText,
            back: backText,
            backArr,
          },
        }
      } ], { selfMongo: selfSecondMongo });

    } else {

      proid = individualKey;

      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } })).data.map(({ fileName }) => { return fileName });
      thisFolderName = ghostPhotos.find((a) => { return (new RegExp("^" + pid)).test(a) })
      thisDesignerName = thisFolderName.split("_")[1].trim();
      [ thisDesigner ] = await back.mongoRead("designer", { designer: thisDesignerName }, { selfMongo: selfCoreMongo });
      thisDesid = thisDesigner.desid;
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });

      contents = targetRaw.contents.body.trim();

      tong = [];
      targetBody = contents.split("\n").filter((s) => {
        return !/고객 상황에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/고객이 원하는 스타일에 대한 이야기/gi.test(s);
      }).filter((s) => {
        return !/디자이너의 공간별 디자인 의도 이야기/gi.test(s);
      }).filter((s) => {
        return !/^[0-9][ ]*\./gi.test(s.trim());
      }).join("\n").trim().split("\n");
  
      thisBlank = false;
      tong = [];
      for (let i = 0; i < targetBody.length; i++) {
        targetText = targetBody[i].trim();
        if (targetText === '') {
          if (thisBlank) {
            // pass
          } else {
            tong.push(targetText);
          }
          thisBlank = true;
        } else {
          tong.push(targetText);
          thisBlank = false;
        }
      }
      frontText = '';
      backText = '';
      frontEnd = false;
      backEnd = false;
      for (let i = 0; i < tong.length; i++) {
        if (tong[i] !== '' && /^[^a-zA-Z가-힣0-9\.]/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (tong[i] !== '' && /^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)/gi.test(tong[i])) {
          frontEnd = true;
        }
        if (frontEnd) {
          backText += tong[i].replace(/^[^a-zA-Z가-힣]/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim().replace(/[^a-zA-Z가-힣0-9\.\,\?\!\~]$/gi, '').trim() + "\n";
        } else {
          frontText += tong[i].trim() + " ";
          if (frontText.length > 500) {
            frontEnd = true;
          }
        }
      }
      frontText = frontText.trim();
      if (frontText === "") {
        frontText = "고객의 이야기를 적어주세요!";
      }
      
      backArr = backText.split("\n").map((str) => { return str.trim() }).filter((str) => { return str !== "" });
      infoIndex = backArr.findIndex((s) => { return /^[0-9]?\.?[ ]?공간[ ]?정보/gi.test(s.trim()) });
      if (infoIndex !== -1) {
        backArr = backArr.slice(0, infoIndex);
      }
      backArr = backArr.filter((str) => { return str.length >= 5 }).map((str) => { return str.trim(); });
      if (backArr.length > 3) {
        backArr[backArr.length - 2] = backArr[backArr.length - 2] + "\n\n" + backArr[backArr.length - 1];
        backArr = backArr.slice(0, -1);
      }

      subjectInput = "제목을 입력해주세요";
      apartInput = "아파트 아파트명";
      regionInput = "서울시 관악구";
      pyeongInput = String(34);

      await back.mongoUpdate(rawCollection, [ { proid }, {
        addition: {
          pid,
          subject: subjectInput.trim(),
          apart: apartInput.trim(),
          region: regionInput.trim(),
          pyeong: 34,
          text: {
            front: frontText,
            back: backText,
            backArr,
          },
        }
      } ], { selfMongo: selfSecondMongo });
    }

    await sleep(500);
    await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3000/rawToContents", {
      pid,
      proid
    }, { headers: { "Content-Type": "application/json" } });
    await sleep(500);

    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    return true;

  } catch (e) {
    console.log(e);
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    return false;
  }
}

PortfolioFilter.prototype.rawToContents = async function (pid, justOrderMode = false, forceProid = null) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const image = this.image;
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongoofficeinfo, mongosecondinfo } = this.mother;
  const notePath = process.env.HOME + "/note/portfolio";
  const selfMongo = new mongo(mongoofficeinfo);
  const selfCoreMongo = new mongo(mongoinfo);
  const selfSecondMongo = new mongo(mongosecondinfo);
  const photoFolderConst = "사진_등록_포트폴리오";
  const GaroseroParser = require(`${process.cwd()}/apps/garoseroParser/garoseroParser.js`);
  const garoseroParser = new GaroseroParser();
  const ResourceMaker = require(process.cwd() + "/apps/resourceMaker/resourceMaker.js");
  const portfolioLink = "https://" + this.address.frontinfo.host + "/portdetail.php?pid=";
  const resource = new ResourceMaker();
  try {
    await selfMongo.connect();
    await selfCoreMongo.connect();
    await selfSecondMongo.connect();
    const collection = "foreContents";
    const rawCollection = "designerRawContents";
    const channel = "#502_sns_contents";
    const toNormal = true;
    let targetFores;
    let targetRaw;
    let proid;
    let thisProject, thisClient, thisDesigner;
    let ghostPhotos;
    let ghostPhotosFiles;
    let tempObject;
    let num;
    let targetPhotoDir;
    let finalGsTong;
    let seroIn;
    let noteContents;
    let noteArr;
    let thisDesignerName;
    let thisDesid;
    let thisFolderName;
    let targetContents;

    if (/^p/gi.test(pid.trim())) {

      [ targetFores ] = await back.mongoRead(collection, { pid }, { selfMongo });
      if (targetFores === undefined) {
        [ targetContents ] = await back.mongoPick("contents", [ { "contents.portfolio.pid": pid }, { proid: 1 } ], { selfMongo: selfCoreMongo });
        if (targetContents === undefined) {
          proid = forceProid;
        } else {
          proid = targetContents.proid;
        }
      } else {
        proid = targetFores.proid;
      }
      [ targetRaw ] = await back.mongoRead(rawCollection, { proid }, { selfMongo: selfSecondMongo });
  
      console.log(proid);

      thisProject = await back.getProjectById(proid, { selfMongo: selfCoreMongo, toNormal });
      thisClient = await back.getClientById(thisProject.cliid, { selfMongo: selfCoreMongo, toNormal });
      thisDesigner = await back.getDesignerById(thisProject.desid, { selfMongo: selfCoreMongo, toNormal });
  
      this.clientName = thisClient.name;
      this.designer = thisDesigner.designer;
      this.apartName = "아파트";
      this.pid = pid;
  
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotos = ghostPhotos.data.filter((o) => { return (new RegExp("^" + pid + "_")).test(o.fileName) });
      ghostPhotos = ghostPhotos[0].fileName;
  
      ghostPhotosFiles = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + ghostPhotos + "/" + pid }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotosFiles = ghostPhotosFiles.data.map((o) => { return o.fileName });
  
      await tempDelete();
      if (await fileSystem("exist", [ process.cwd() + "/temp/" + pid ])) {
        await shellExec("rm", [ "-rf", process.cwd() + "/temp/" + pid ]);
      }
      await shellExec("mkdir", [ process.cwd() + "/temp/" + pid ]);
  
      num = 1;
      for (let fileName of ghostPhotosFiles) {
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + global.encodeURI(ghostPhotos) + "/" + pid + "/" + global.encodeURI(fileName.split(".").slice(0, -1).join(".")) + "." + fileName.split(".").slice(-1).join("."));
        await fileSystem(`writeBinary`, [ process.cwd() + "/temp/" + pid + "/thisContentsTarget" + String(num) + ".jpg", tempObject ]);
        console.log(`download success`);
        num++;
      }
  
      targetPhotoDir = await garoseroParser.queryDirectory(process.cwd() + "/temp/" + pid);
      finalGsTong = [];
      seroIn = false;
      for (let i = 0; i < targetPhotoDir.length; i++) {
        if (targetPhotoDir[i].gs === "g") {
          finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
          seroIn = false;
        } else {
          if (!seroIn) {
            if (targetPhotoDir[i + 1] !== undefined && targetPhotoDir[i + 1].gs === "s") {
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i + 1])));
              seroIn = true;
            }
          } else {
            seroIn = false;
          }
        }
      }

      if (!justOrderMode) {    
        await shellExec("rm", [ "-rf", this.options.photo_dir ]);
        await shellExec("mkdir", [ this.options.photo_dir ]);
        for (let obj of finalGsTong) {
          await shellExec("mv", [ obj.file, this.options.photo_dir ])
        }
    
        await this.total_make(false);
    
        console.log(finalGsTong);
      } else {
        await back.mongoDelete("contents", { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
      }
  
      noteContents = pid + "\n";
      noteContents += thisDesigner.designer + " 실장님 " + thisClient.name + " 고객님";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " " + String(targetRaw.addition.pyeong) + "py " + "홈스타일링";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.text.front.trim();
      noteContents += "\n\n\n";
      if (Array.isArray(targetRaw.addition.text.backArr)) {
        for (let textStr of targetRaw.addition.text.backArr) {
          if (textStr !== '' && !/^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)$/gi.test(textStr)) {
            noteContents += "\n\n\n";
            noteContents += "1 - " + String(finalGsTong.length);
            noteContents += "\n\n\n";
            noteContents += "Space\n\n" + textStr.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
            noteContents += "\n\n\n";
          }
        }
      } else {
        noteContents += "1 - " + String(finalGsTong.length);
        noteContents += "\n\n\n";
        noteContents += "Space\n\n" + targetRaw.addition.text.back.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
        noteContents += "\n\n\n";
      }
      noteContents += "_info\n\n"
      noteContents += thisDesigner.desid + "\n\n"
      noteContents += "_portfolio\n\n"
      noteContents += "_1\n\n"
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " 홈스타일링\n\n"
      noteContents += targetRaw.addition.region.trim() + "\n\n"
      noteContents += "아파트 홈스타일링\n\n"
      noteContents += "_2\n\n"
      noteContents += "세로 / 가로\n\n"
      noteContents += String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "s" }).realIndex + 1) + " " + String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "g" }).realIndex + 1) + "\n\n";
      noteContents += "슬라이드\n\n"
      noteContents += "1 2 3 4 5 6 7 8 9\n\n"
      noteContents += "태그\n\n"
      noteContents += "all,아파트,수루배,블루,모던,화이트,세종,세종시,서재,거실\n\n"
      noteContents += "서비스\n\n"
      noteContents += "홈스타일링\n\n"
      noteContents += "Key8\n\n"
      noteContents += "820\n\n"
      noteContents += "Key9\n\n"
      noteContents += dateToString(new Date(), true).slice(2).replace(/[^0-9]/gi, '') + "\n\n"
      noteContents += "\n\n\n";
  
      await fileSystem("write", [ notePath + "/" + pid + ".txt", noteContents ]);
      noteArr = noteContents.split("\n").map((s) => { return s.trim() }).filter((s) => { return s !== "" });
      resource.p_id = pid;
      console.log("write sucess");
  
      await resource.launching(noteArr);
  
      await messageSend({ text: `${thisDesigner.designer} 디자이너 ${thisClient.name} 고객님 포트폴리오 컨텐츠를 자동으로 웹에 업로드하였습니다. 편집을 시작해주세요! 편집이 완료되어야 발행이 정상적으로 완료됩니다.\nlink : ${portfolioLink + pid}&edit=true`, channel });
      await requestSystem("https://" + address.officeinfo.ghost.host + ":3000/syncEvaluationContents", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
  
    } else {

      [ targetRaw ] = await back.mongoRead(rawCollection, { "addition.pid": pid }, { selfMongo: selfSecondMongo });
      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotos = ghostPhotos.data.filter((o) => { return (new RegExp("^" + pid + "_")).test(o.fileName) });
      
      thisFolderName = ghostPhotos[0].fileName;
      thisDesignerName = thisFolderName.split("_")[1].trim()

      ghostPhotos = ghostPhotos[0].fileName;
      ghostPhotosFiles = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst + "/" + ghostPhotos + "/" + pid }, { headers: { "Content-Type": "application/json" } }));
      ghostPhotosFiles = ghostPhotosFiles.data.map((o) => { return o.fileName });

      [ thisDesigner ] = await back.mongoRead("designer", { designer: thisDesignerName }, { selfMongo: selfCoreMongo });
      thisDesid = thisDesigner.desid;

      this.clientName = "없음"
      this.designer = thisDesigner.designer;
      this.apartName = "아파트";
      this.pid = pid;
  
      await tempDelete();
      if (await fileSystem("exist", [ process.cwd() + "/temp/" + pid ])) {
        await shellExec("rm", [ "-rf", process.cwd() + "/temp/" + pid ]);
      }
      await shellExec("mkdir", [ process.cwd() + "/temp/" + pid ]);
  
      num = 1;
      for (let fileName of ghostPhotosFiles) {
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + global.encodeURI(ghostPhotos) + "/" + pid + "/" + global.encodeURI(fileName.split(".").slice(0, -1).join(".")) + "." + fileName.split(".").slice(-1).join("."));
        await fileSystem(`writeBinary`, [ process.cwd() + "/temp/" + pid + "/thisContentsTarget" + String(num) + ".jpg", tempObject ]);
        console.log(`download success`);
        num++;
      }
  
      targetPhotoDir = await garoseroParser.queryDirectory(process.cwd() + "/temp/" + pid);
      finalGsTong = [];
      seroIn = false;
      for (let i = 0; i < targetPhotoDir.length; i++) {
        if (targetPhotoDir[i].gs === "g") {
          finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
          seroIn = false;
        } else {
          if (!seroIn) {
            if (targetPhotoDir[i + 1] !== undefined && targetPhotoDir[i + 1].gs === "s") {
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i])));
              finalGsTong.push(equalJson(JSON.stringify(targetPhotoDir[i + 1])));
              seroIn = true;
            }
          } else {
            seroIn = false;
          }
        }
      }

      if (!justOrderMode) {
  
        await shellExec("rm", [ "-rf", this.options.photo_dir ]);
        await shellExec("mkdir", [ this.options.photo_dir ]);
        for (let obj of finalGsTong) {
          await shellExec("mv", [ obj.file, this.options.photo_dir ])
        }
        await this.total_make(false);
      } else {
        await back.mongoDelete("contents", { "contents.portfolio.pid": pid }, { selfMongo: selfCoreMongo });
      }
    
      noteContents = pid + "\n";
      noteContents += thisDesigner.designer + " 실장님";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " " + String(targetRaw.addition.pyeong) + "py " + "홈스타일링";
      noteContents += "\n\n\n";
      noteContents += targetRaw.addition.text.front.trim();
      if (Array.isArray(targetRaw.addition.text.backArr)) {
        for (let textStr of targetRaw.addition.text.backArr) {
          if (textStr !== '' && !/^(현관|거실|복도|주방|침실|안방|Entrance|entrance|living|Living|kitchen|Kitchen)$/gi.test(textStr)) {
            noteContents += "\n\n\n";
            noteContents += "1 - " + String(finalGsTong.length);
            noteContents += "\n\n\n";
            noteContents += "Space\n\n" + textStr.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
            noteContents += "\n\n\n";
          }
        }
      } else {
        noteContents += "\n\n\n";
        noteContents += "1 - " + String(finalGsTong.length);
        noteContents += "\n\n\n";
        noteContents += "Space\n\n" + targetRaw.addition.text.back.trim().replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/  /gi, ' ').replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n").replace(/\n\n\n/gi, "\n\n");
        noteContents += "\n\n\n";
      }
      noteContents += "_info\n\n"
      noteContents += thisDesigner.desid + "\n\n"
      noteContents += "_portfolio\n\n"
      noteContents += "_1\n\n"
      noteContents += targetRaw.addition.subject.trim() + ", " + targetRaw.addition.apart.trim() + " 홈스타일링\n\n"
      noteContents += targetRaw.addition.region.trim() + "\n\n"
      noteContents += "아파트 홈스타일링\n\n"
      noteContents += "_2\n\n"
      noteContents += "세로 / 가로\n\n";
      try {
        noteContents += String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "s" }).realIndex + 1) + " " + String(finalGsTong.map((o, index) => { o.realIndex = index; return o; }).find((o) => { return o.gs === "g" }).realIndex + 1) + "\n\n";
      } catch {
        noteContents += "1 2" + "\n\n";
      }
      noteContents += "슬라이드\n\n"
      noteContents += "1 2 3 4 5 6 7 8 9\n\n"
      noteContents += "태그\n\n"
      noteContents += "all,아파트,모던,화이트,서재,거실\n\n"
      noteContents += "서비스\n\n"
      noteContents += "홈스타일링\n\n"
      noteContents += "Key8\n\n"
      noteContents += "820\n\n"
      noteContents += "Key9\n\n"
      noteContents += dateToString(new Date(), true).slice(2).replace(/[^0-9]/gi, '') + "\n\n"
      noteContents += "\n\n\n";
  
      await fileSystem("write", [ notePath + "/" + pid + ".txt", noteContents ]);
      noteArr = noteContents.split("\n").map((s) => { return s.trim() }).filter((s) => { return s !== "" });
      resource.p_id = pid;
      console.log("write sucess");
  
      await resource.launching(noteArr);
  
      await messageSend({ text: `${thisDesigner.designer} 디자이너 포트폴리오 컨텐츠를 자동으로 웹에 업로드하였습니다. 편집을 시작해주세요! 편집이 완료되어야 발행이 정상적으로 완료됩니다.\nlink : ${portfolioLink + pid}&edit=true`, channel });
      if (forceProid !== null) {
        await requestSystem("https://" + instance.address.secondinfo.host + ":3000/projectDesignerRaw", {
          mode: "delete",
          desid: thisDesigner.desid,
          proid: forceProid,
          cliid: forceProid,
        }, {
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();

    return thisDesigner.desid;
  } catch (e) {
    console.log(e);
    await selfMongo.close();
    await selfCoreMongo.close();
    await selfSecondMongo.close();
    return false;
  }
}

PortfolioFilter.prototype.setDesignerSetting = async function (desid, pid) {
  const instance = this;
  const back = this.back;
  const address = this.address;
  const { objectDeepCopy, requestSystem, sleep } = this.mother;
  try {
    let thisDesigner;
    let proposalArr, dummy, filesArr;
    let description;
    let files, index;
    let thisContents;
    let garoPhoto;

    [ thisContents ] = (await back.getContentsArrByQuery({ "contents.portfolio.pid": pid })).toNormal();
    thisDesigner = await back.getDesignerById(desid);
    description = objectDeepCopy(thisDesigner.setting.description);

    garoPhoto = thisContents.photos.detail.filter((o) => { return o.gs === "g" });
    files = [
      { porlid: pid, index: garoPhoto[0].index },
      { porlid: pid, index: thisContents.contents.portfolio.detailInfo.photodae[0] },
      { porlid: pid, index: garoPhoto[1].index },
      { porlid: pid, index: garoPhoto[2].index },
      { porlid: pid, index: garoPhoto[3].index }
    ];
    filesArr = [];
    for (let { porlid, index } of files) {
      if (porlid !== "ghost") {
        filesArr.push(`/corePortfolio/listImage/${porlid}/t${String(index)}${porlid}.jpg`);
      } else {
        filesArr.push(`/rawDesigner/ghost/${desid}/g${String(index)}.jpg`);
      }
    }

    dummy = () => {
      return { name: "기본 세팅", photo: [
        {
            "position" : "0",
            "sgTrue" : "g",
            "unionPo" : "union",
            "styleText" : "width: 66.5%; height: 66%; top: 0%; left: 0%; background-image: url(\"" + filesArr[0] + "\");",
            "imgSrc" : filesArr[0]
        },
        {
            "position" : "1",
            "sgTrue" : "s",
            "unionPo" : "right",
            "styleText" : "width: 32.8%; height: 66%; top: 0%; left: 67.2%; background-image: url(\"" + filesArr[1] + "\");",
            "imgSrc" : filesArr[1]
        },
        {
            "position" : "2",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[2],
            "styleText" : "top: 67%; left: 0%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[2] + "\");"
        },
        {
            "position" : "3",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[3],
            "styleText" : "top: 67%; left: 33.5%; width: 33%; height: 33%; background-image: url(\"" + filesArr[3] + "\");"
        },
        {
            "position" : "4",
            "sgTrue" : "g",
            "unionPo" : "union",
            "imgSrc" : filesArr[4],
            "styleText" : "top: 67%; left: 67.2%; width: 32.8%; height: 33%; background-image: url(\"" + filesArr[4] + "\");"
        }
      ], description };
    }

    proposalArr = [];
    for (let i = 0; i < 5; i++) {
      proposalArr.push(objectDeepCopy(dummy()));
    }

    await back.updateDesigner([ { desid }, { "setting.proposal": proposalArr } ]);
    await back.updateDesigner([ { desid }, { "setting.front.methods": [ "mth0", "mth7" ] } ]);
    await back.updateDesigner([ { desid }, { "setting.front.photo": { porlid: pid, index: "t" + String(garoPhoto[0].index) } } ]);

    await sleep(500);

    await requestSystem("https://" + address.testinfo.host + ":3000/frontReflection", { data: null }, { headers: { "Content-Type": "application/json" } });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

PortfolioFilter.prototype.chmodReload = async function () {
  const instance = this;
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongosecondinfo } = this.mother;
  try {
    await shellExec("chmod", [ "-R", "777", process.env.HOME + "/samba/corePortfolio" ]);
    await shellExec("chmod", [ "-R", "777", process.env.HOME + "/samba/list_image" ]);
  } catch (e) {
    console.log(e);
  }
}

module.exports = PortfolioFilter;
