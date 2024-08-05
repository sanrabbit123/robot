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
    await messageSend({ text: `${this.folderName} 사진을 처리하였습니다!`, channel: `#502_sns_contents` });

    //ghost upload
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
  const { fileSystem, shellExec, shellLink, sleep, messageSend, requestSystem, ghostFileUpload, mongo, mongocontentsinfo, mongoinfo } = this.mother;
  const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
  const GaroseroParser = require(`${process.cwd()}/apps/garoseroParser/garoseroParser.js`);
  const notePath = process.env.HOME + "/note/portfolio";
  const errorMessage = `argument must be => [ { client: "", designer: "", link: "" } ... ]`;
  const photoFolderConst = "사진_등록_포트폴리오";
  const foreCastContant = `/corePortfolio/forecast`;
  const forecastPath = this.address.officeinfo.ghost.file.static + foreCastContant;
  class RawArray extends Array {
    constructor(arr) {
      super();
      if (arr.length === 0) {
        throw new Error(errorMessage);
      }
      for (let i of arr) {
        if (i.client === undefined || i.designer === undefined) {
          if (typeof i.cliid === "string" && typeof i.desid === "string" && typeof i.proid === "string") {
            i.client = i.cliid;
            i.designer = i.desid;
          } else {
            throw new Error(errorMessage);
          }
        }
        this.push(i);
      }
    }
  }
  const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
  const kakaoInstance = new KakaoTalk();
  const drive = new GoogleDrive();
  const collection = "foreContents";
  const selfCoreMongo = new mongo(mongoinfo);
  const selfMongo = new mongo(mongocontentsinfo);
  const garoseroParser = new GaroseroParser();
  let nextPid;

  nextPid = null;

  try {
    if (!Array.isArray(arr)) {
      throw new Error(errorMessage);
    }
    arr = new RawArray(arr);
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

    await this.static_setting();

    for (let rawObj of arr) {

      client = rawObj.client;
      designer = rawObj.designer;

      if (/^c[0-9]/.test(client) && /^d[0-9]/.test(designer)) {

        [ targetClient ] = await back.mongoRead("client", { cliid: client }, { selfMongo: selfCoreMongo });
        [ targetDesigner ] = await back.mongoRead("designer", { desid: designer }, { selfMongo: selfCoreMongo });

        await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ])
        await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);

        nextPid = null;
        foreRows = await back.mongoRead(collection, {}, { selfMongo });
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

        await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3001/zipPhoto", { pid: nextPid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });

        await shellExec(`rm -rf ${shellLink(folderPath)};`);

        await requestSystem("https://" + instance.address.contentsinfo.host + ":3000/evaluationNotice", { mode: "send", cliid: clientObj.cliid, desid: designerObj.desid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });
        await kakaoInstance.sendTalk("photoShareClient", clientObj.name, clientObj.phone, { client: clientObj.name, host: instance.address.frontinfo.host, path: "evaluation", proid: project.proid });
        await kakaoInstance.sendTalk("photoShareDesigner", designerObj.designer, designerObj.information.phone, { client: clientObj.name, designer: designerObj.designer, host: instance.address.frontinfo.host, proid: project.proid });
        await messageSend({ text: `${designerObj.designer} 디자이너, ${clientObj.name} 고객님께 사진 공유 알림톡을 전송하였습니다!`, channel: `#502_sns_contents` });

      } else {

        designers = await back.getDesignersByQuery({ designer: designer });
        if (designers.length > 1) {
          console.log(`Exception occur : `);
          for (let i = 0; i < designers.length; i++) {
            console.log(`exceptionId : ${String(i + 1)} => designer : ${i.designer} / desid : ${i.desid}`);
          }
          consoleInput = "1"
          targetDesigner = designers[Number(consoleInput.replace(/[^0-9]/g, '')) - 1].toNormal();
        } else {
          targetDesigner = designers[0].toNormal();
        }
  
        await shellExec("rm", [ "-rf", `${process.cwd()}/temp/resource` ])
        await shellExec("cp", [ "-r", this.options.photo_dir, `${process.cwd()}/temp/` ]);
  
        if (client !== null) {
  
          nextPid = null;
          foreRows = await back.mongoRead(collection, {}, { selfMongo });
          foreRows.sort((a, b) => {
            return Number(b.pid.replace(/[^0-9]/gi, '')) - Number(a.pid.replace(/[^0-9]/gi, ''));
          });
          if (foreRows.length === 0) {
            throw new Error("invaild foreRows");
          }
          nextPid = 'p' + String(Number(foreRows[0].pid.replace(/[^0-9]/gi, '')) + 1);
          if (nextPid === null) {
            throw new Error("invaild pid");
          }
  
          await fileSystem("write", [ `${notePath}/${nextPid} (발행대기)`, `${nextPid}\n${designer} 실장님 ${client} 고객님` ]);
  
          folderPath = `${process.cwd()}/temp/resource`;
  
          this.clientName = client;
          this.designer = designer;
          this.pid = nextPid;
          this.apartName = "";
          totalMakeResult = await this.total_make(true);
          console.log(totalMakeResult);
  
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
          await ghostFileUpload(fromArr, toArr);
          console.log(`forecast copy done`);
  
          await sleep(100);
  
          allContentsArr = (await back.getContentsArrByQuery({})).toNormal();
          allProjects = (await back.getProjectsByQuery({ desid: targetDesigner.desid })).toNormal();
          allClients = (await back.getClientsByQuery({ name: client.trim() })).toNormal();
  
          projects = allProjects.filter((obj) => {
            return allClients.map((client) => { return client.cliid }).includes(obj.cliid);
          }).filter((obj) => {
            return !allContentsArr.filter((c) => { return c.proid !== '' }).map(({ proid }) => { return proid }).includes(obj.proid);
          });
          if (projects.length > 1) {
            projects = projects.filter((obj) => {
              return !foreRows.filter((o) => { return typeof o.proid === "string" }).map(({ proid }) => { return proid }).includes(obj.proid);
            });
            if (projects.length > 1) {
              projects = projects.filter((obj) => {
                return obj.contents.photo.date.valueOf() <= (new Date()).valueOf()
              });
              projects.sort((a, b) => { return a.contents.photo.date.valueOf() - b.contents.photo.date.valueOf() });
            }
          }
  
          if (projects.length > 0) {
            project = projects[0];
            console.log("find proid => " + project.proid);
  
            await back.updateProject([
              { proid: project.proid },
              {
                "contents.raw.photo.status": "원본 보정 완료",
                "contents.share.client.photo": new Date(),
                "contents.share.designer.photo": new Date(),
              }
            ]);
            await back.mongoUpdate(collection, [ { pid: nextPid }, { proid: project.proid } ], { selfMongo });
            await back.mongoUpdate(collection, [ { pid: nextPid }, { exception: false } ], { selfMongo });
  
            clientObj = await back.getClientById(project.cliid);
            designerObj = await back.getDesignerById(project.desid);
  
            zipPhotoRes = await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3001/zipPhoto", { pid: nextPid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });
            zipIdDesigner = zipPhotoRes.data.googleId.designer;
            zipIdClient = zipPhotoRes.data.googleId.client;
  
            console.log(zipIdDesigner);
            console.log(zipIdClient);
  
            await requestSystem("https://" + instance.address.contentsinfo.host + ":3000/shareGoogleId", {
              mode: "store",
              proid: project.proid,
              cliid: project.cliid,
              desid: project.desid,
              pid: nextPid,
              zipIdDesigner,
              zipIdClient,
            }, {
              headers: { "Content-Type": "application/json" }
            });
  
            await shellExec(`rm -rf ${shellLink(folderPath)};`);
  
            if (clientObj !== null && designerObj !== null) {
              await requestSystem("https://" + instance.address.contentsinfo.host + ":3000/evaluationNotice", { mode: "send", cliid: clientObj.cliid, desid: designerObj.desid, proid: project.proid }, { headers: { "Content-Type": "application/json" } });
              await kakaoInstance.sendTalk("photoShareClient", clientObj.name, clientObj.phone, { client: clientObj.name, host: instance.address.frontinfo.host, path: "evaluation", proid: project.proid });
              await sleep(2000);
              await kakaoInstance.sendTalk("photoShareDesigner", designerObj.designer, designerObj.information.phone, { client: clientObj.name, designer: designerObj.designer, host: instance.address.frontinfo.host, proid: project.proid });
              await messageSend({ text: `${designerObj.designer} 디자이너, ${clientObj.name} 고객님께 사진 공유 알림톡을 전송하였습니다!`, channel: `#502_sns_contents` });
            }
          }
  
          console.log(`${client}C ${designer}D raw to raw done`);
  
        } else {
  
          nextPid = null;
  
          contentsRows = await back.getContentsArrByQuery({});
          contentsRows = contentsRows.toNormal().filter((obj) => { return /^a/i.test(obj.contents.portfolio.pid); });
          contentsRows.sort((a, b) => {
            return Number(b.contents.portfolio.pid.replace(/[^0-9]/gi, '')) - Number(a.contents.portfolio.pid.replace(/[^0-9]/gi, ''));
          });
          if (contentsRows.length === 0) {
            throw new Error("invaild contentsRows");
          }
          nextPid = 'a' + String(Number(contentsRows[0].contents.portfolio.pid.replace(/[^0-9]/gi, '')) + 1);
          if (nextPid === null) {
            throw new Error("invaild pid");
          }
  
          await fileSystem("write", [ `${notePath}/${nextPid} (발행대기)`, `${nextPid}\n${designer} 실장님` ]);
  
          folderPath = `${process.cwd()}/temp/resource`;
  
          this.clientName = "없음";
          this.designer = targetDesigner.designer;
          this.pid = nextPid;
          this.apartName = "";
          totalMakeResult = await this.total_make(true);
          googleFolderName = totalMakeResult.folderName;
  
          folderPathList_raw = await fileSystem(`readDir`, [ folderPath ]);
          folderPathList = folderPathList_raw.filter((name) => { return (name !== ".DS_Store"); });
          fromArr = [];
          toArr = [];
  
          console.log(folderPath, folderPathList);
  
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
  
          await sleep(500);
  
          console.log(`${designer}D raw to raw done`);
  
        }

      }
    }
    await selfMongo.close();
    await selfCoreMongo.close();
    return true;
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
  const { mongo, mongoinfo, mongocontentsinfo, fileSystem, shellExec, shellLink, consoleQ, sleep, messageSend, requestSystem, ghostFileUpload } = this.mother;
  const errorMessage = `argument must be => [ { client: "", designer: "" } ... ]`;
  const selfMongo = new mongo(mongoinfo);
  const selfContentsMongo = new mongo(mongocontentsinfo);
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

PortfolioFilter.prototype.updateSubject = async function (pid = null) {
  const instance = this;
  const address = this.address;
  const back = this.back;
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongocontentsinfo, mongosecondinfo } = this.mother;
  const selfMongo = new mongo(mongocontentsinfo);
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

    if (typeof pid !== "string") {
      throw new Error("invalid input");
    }

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

      ghostPhotos = (await requestSystem("https://" + instance.address.officeinfo.ghost.host + "/listFiles", { path: instance.address.officeinfo.ghost.file.office + "/" + photoFolderConst }, { headers: { "Content-Type": "application/json" } })).data.map(({ fileName }) => { return fileName });
      thisFolderName = ghostPhotos.find((a) => { return (new RegExp("^" + pid)).test(a) })
      thisDesignerName = thisFolderName.split("_")[1].trim();
      [ thisDesigner ] = await back.mongoRead("designer", { designer: thisDesignerName }, { selfMongo: selfCoreMongo });
      thisDesid = thisDesigner.desid;

      contents = await fileSystem("readString", [ `${process.cwd()}/temp/target.txt` ]);
      contents = contents.trim();

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

      await back.mongoCreate(rawCollection, {
        proid: "",
        desid: thisDesid,
        cliid: "",
        date: new Date(),
        contents: {
          type: "web",
          body: contents,
        },
        addition: {
          pid,
          subject: subjectInput.trim(),
          apart: apartInput.trim(),
          region: regionInput.trim(),
          pyeong: Number(pyeongInput.trim()),
          text: {
            front: frontText,
            back: backText,
            backArr
          },
        }
      }, { selfMongo: selfSecondMongo });

    }

    await sleep(500);
    await requestSystem("https://" + instance.address.officeinfo.ghost.host + ":3001/rawToContents", {
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
  const { fileSystem, binaryRequest, tempDelete, dateToString, shellExec, equalJson, shellLink, sleep, messageSend, mongoinfo, requestSystem, ghostFileUpload, mongo, mongocontentsinfo, mongosecondinfo } = this.mother;
  const notePath = process.env.HOME + "/note/portfolio";
  const selfMongo = new mongo(mongocontentsinfo);
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
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + global.encodeURI(ghostPhotos) + "/" + pid + "/" + fileName);
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
  
      await messageSend({ text: `${thisClient.name} 고객님 디자이너 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${portfolioLink + pid}`, channel });
      await requestSystem("https://" + address.officeinfo.ghost.host + ":3001/syncEvaluationContents", { message: "do it" }, { headers: { "Content-Type": "application/json" } });
  
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
        tempObject = await binaryRequest("https://" + instance.address.officeinfo.ghost.host + instance.address.officeinfo.ghost.file.office + "/" + global.encodeURI(photoFolderConst) + "/" + global.encodeURI(ghostPhotos) + "/" + pid + "/" + fileName);
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
  
      await messageSend({ text: `${thisDesigner.designer} 디자이너 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${portfolioLink + pid}`, channel });
    
    }

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

module.exports = PortfolioFilter;
