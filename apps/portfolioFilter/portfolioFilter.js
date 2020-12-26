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
  this.options = {
    home_dir: `${process.env.HOME}/portfolioFilter`,
    photo_dir: `${process.env.HOME}/portfolioFilter/resource`,
    result_dir: `${process.env.HOME}/portfolioFilter/result`,
  }
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
  str = this.clientName + '_' + size + '_' + str + '_' + datestring + '.jpg';
  return str;
}

PortfolioFilter.prototype.just_filter = function (str) {
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
  str = str.replace(/[^0-9]/g, '');
  str = str.replace(/^0/g, '');
  return str;
}

PortfolioFilter.prototype.to_portfolio = async function () {
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
    let new_photo_name, new_photo_name_list;
    let photo_sizes;
    let resultFolder;

    file_list = await fileSystem(`readDir`, [ this.options.photo_dir ]);
    resultFolderBoo = await fileSystem(`readDir`, [ this.options.result_dir ]);
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
      shell.exec(`mv ${shellLink(this.options.home_dir)}/resource/${file_list[i]} ${shellLink(this.options.home_dir)}/resource/photo${String(i + 1)}.jpg`);
      file_list[i] = "photo" + String(i + 1) + ".jpg";
    }
    console.log(file_list);
    options.photo_list = file_list;

    photo_sizes = [ "780", "원본" ];

    for (let i of resultFolderBoo) {
      shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${i};`);
    }

    this.folderName = `${this.pid}_${this.designer}_${this.clientName}_${todayMaker("year")}`;
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

    await fileSystem(`write`, [ `${this.options.home_dir}/script/to_png.js`, this.generator.factory.to_png({}, options) ]);
    shell.exec(`osascript ${this.options.home_dir}/factory/applescript/to_png.scpt`);

    shell.exec(`osascript ${this.options.home_dir}/factory/applescript/return_terminal.scpt`);

    return resultFolder;

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.parsing_fileList = async function (resultFolder) {
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
    fileList_original_raw = await fileSystem(`readDir`, [ `${resultFolder}/원본` ]);
    fileList_png_raw = await fileSystem(`readDir`, [ resultFolderParent ]);

    for (let i of fileList_780_raw) {
      if (i !== `.DS_Store`) {
        fileList_780.push(resultFolder + "/780/" + i);
      }
    }
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

    file_list.sort((a, b) => { return Number(a.replace(/^g/g, '').replace(/\.jpg$/, '')) - Number(b.replace(/^g/g, '').replace(/\.jpg$/, '')); });
    console.log(file_list);

    options.photo_list = file_list;
    await fileSystem(`write`, [ `${shellLink(this.options.home_dir)}/script/ghostFilter.js`, this.generator.factory.ghostFilter({}, options) ]);
    shell.exec(`osascript ${shellLink(this.options.home_dir)}/factory/applescript/ghostFilter.scpt`);

    return { result_folder: `${this.options.home_dir}/result`, script_folder: `${this.options.home_dir}/factory/applescript` };

  } catch (e) {
    console.log(e);
  }
}

PortfolioFilter.prototype.total_make = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, slack_bot } = this.mother;
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
    await this.static_setting();

    let thisFolderId, folderId_780, folderId_original;
    let pidFolder, fromArr, toArr;
    let webViewLink;
    let resultFolder;

    resultFolder = await this.to_portfolio();
    const { fileList_780, fileList_original, fileList_png } = await this.parsing_fileList(resultFolder);
    console.log(fileList_780, fileList_original, fileList_png);

    thisFolderId = await drive.makeFolder_andMove_inPython(this.folderName, "1KUt6DHSVtHBsknsKcIo8Woc2t1vyPd21");
    await drive.sleep(1000);
    console.log(`make folder ${this.folderName} done`);
    folderId_780 = await drive.makeFolder_andMove_inPython("780", thisFolderId);
    await drive.sleep(1000);
    console.log(`make folder ${this.folderName}/780 done`);
    folderId_original = await drive.makeFolder_andMove_inPython("원본", thisFolderId);
    await drive.sleep(1000);
    console.log(`make folder ${this.folderName}/원본 done`);

    for (let f of fileList_780) {
      await drive.upload_inPython(folderId_780, f);
      await drive.sleep(400);
      console.log(`upload file ${f} done`);
    }
    for (let f of fileList_original) {
      await drive.upload_inPython(folderId_original, f);
      await drive.sleep(400);
      console.log(`upload file ${f} done`);
    }
    for (let f of fileList_png) {
      await drive.upload_inPython(thisFolderId, f);
      await drive.sleep(400);
      console.log(`upload file ${f} done`);
    }

    //this is problem
    webViewLink = await drive.read_webView_inPython(thisFolderId);
    await slack_bot.chat.postMessage({ text: `${this.folderName} 사진을 공유하였습니다! : \n${webViewLink}`, channel: `#502_sns_contents` });

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

    await this.mother.s3FileUpload(fromArr, toArr);

    console.log(`s3 upload done`);
  } catch (e) {
    console.log(e);
  } finally {
    process.exit();
  }
}

PortfolioFilter.prototype.ghost_make = async function (exceptionId) {
  //this.clientName => designer
  const instance = this;
  const { shell, shellLink } = this.mother;
  const get_num = function (obj) {
    return Number(obj.link.slice(1).replace(/\.jpg$/g, '').split('/')[2].replace(/^g/g,''));
  }
  try {
    await this.static_setting();

    //Designer --------------------------------------------------------------------------------------------------
    let target_obj, ghost_arr, designer_arr;

    //find designer and set designer object
    designer_arr = await this.back.getDesignersByQuery({ designer: this.clientName });
    if (designer_arr.length > 1) {
      if (exceptionId === 0) {
        console.log(`Exception occur : `);
        for (let i = 0; i < designer_arr.length; i++) {
          console.log(`exceptionId : ${String(i + 1)} => designer : ${i.designer} / desid : ${i.desid}`);
        }
      } else {
        target_obj = designer_arr[exceptionId - 1].toNormal();
      }
    } else {
      target_obj = designer_arr[0].toNormal();
    }

    //set ghost array
    ghost_arr = target_obj.setting.ghost;

    //Save File --------------------------------------------------------------------------------------------------
    let start_num;
    let result_files, dimensions;
    let fromArr, toArr;

    //find start number of ghost-picture
    if (ghost_arr.length === 0) {
      start_num = 0;
    } else {
      ghost_arr.sort((a, b) => { return get_num(b) - get_num(a); });
      start_num = get_num(ghost_arr[0]);
    }

    //run ghost filter
    const { result_folder, script_folder } = await this.ghost_filter(start_num);
    result_files = await this.mother.fileSystem(`readDir`, [ result_folder ]);

    fromArr = [];
    toArr = [];

    for (let file of result_files) {
      if (file !== ".DS_Store") {
        fromArr.push(result_folder + "/" + file);
        toArr.push(`rawDesigner/ghost/${target_obj.desid}/${file}`);
        dimensions = shell.exec(`osascript ${shellLink(script_folder)}/photo_sg.scpt ${shellLink(result_folder)}/${file}`);
        ghost_arr.unshift({
          link: `/rawDesigner/ghost/${target_obj.desid}/${file}`,
          sgTrue: dimensions.replace(/[^gs]/g, ''),
        });
      }
    }

    console.log(ghost_arr);
    console.log(fromArr);
    console.log(toArr);

    await this.back.updateDesigner([ { desid: target_obj.desid }, { "setting.ghost": ghost_arr } ]);
    await this.mother.s3FileUpload(fromArr, toArr);

  } catch (e) {
    console.log(e.message);
  }
}

PortfolioFilter.prototype.addtionalRepair = async function (pid, tNumber) {
  const instance = this;
  const { fileSystem, shell, shellLink, s3FileUpload, todayMaker } = this.mother;
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
    shell.exec(`rm -rf ${shellLink(home)}/${tempFolderName}`);
    
  } catch (e) {
    console.log(e);
  }
}

module.exports = PortfolioFilter;
