const GoogleDrive = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

GoogleDrive.prototype.get_folder_inPython = async function (folder_id, folder_name = null, is_photo = false) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep, pythonExecute } = this.mother;
  const fileSave = async function (file_id, file_name, target_folder) {
    try {
      const res = await pythonExecute(instance.pythonApp, [ "drive", "downloadFile" ], { targetId: file_id, targetFolder: target_folder });
      return res;
    } catch (e) {
      console.log(file_name, "error : " + e.message);
    }
  }
  if (/^http/.test(folder_id) || /google/gi.test(folder_id)) {
    folder_id = this.parsingId(folder_id);
  }
  try {
    const folder_info = await pythonExecute(this.pythonApp, [ "drive", "getTargetInfo" ], { targetId: folder_id });
    const folderName = folder_info.name;
    const files = await pythonExecute(this.pythonApp, [ "drive", "readFolderFiles" ], { targetId: folder_id });
    const targetFolderNameConst = "drive";
    const tempFolder = process.cwd() + "/temp";
    const tempFolderDir = await fileSystem(`readDir`, [ tempFolder ]);
    const folderPath = tempFolder + "/" + targetFolderNameConst + "/" + folderName.replace(/[\\\/\&\= ]/g, '_');
    let driveFolderDir, index;
    let folderInside;
    let thisExec;
    let tempArr, motherPath, length;

    //init setting
    if (!tempFolderDir.includes(targetFolderNameConst)) {
      await shellExec(`mkdir ${shellLink(tempFolder + "/" + targetFolderNameConst)}`);
    }
    driveFolderDir = await fileSystem(`readDir`, [ tempFolder + "/" + targetFolderNameConst ]);
    for (let i of driveFolderDir) {
      await shellExec(`rm -rf ${shellLink(tempFolder + "/" + targetFolderNameConst + "/" + i)}`);
    }

    //make folder in process temp folder
    await shellExec(`mkdir ${shellLink(folderPath)}`);

    //download files
    index = 0;
    for (let { id, name } of files) {
      await sleep(1000);
      console.log(index, await fileSave(id, name, folderPath));
      index = index + 1;
    }

    if (is_photo) {
      folderInside = await fileSystem(`readDir`, [ folderPath ]);
      for (let i = 0; i < folderInside.length; i++) {
        if (folderInside[i] !== ".DS_Store") {
          if (/\.(jpg|jpeg)$/i.test(folderInside[i])) {
            thisExec = ".jpg";
          } else if (/\.(png)$/i.test(folderInside[i])) {
            thisExec = ".png";
          } else {
            throw new Error("must be photo");
          }
          await shellExec(`mv ${shellLink(folderPath + "/" + folderInside[i])} ${shellLink(folderPath)}/photo${String(i + 1)}${thisExec}`);
        }
      }
    }

    tempArr = folderPath.split("/");
    motherPath = '';
    length = (tempArr[tempArr.length - 1] === '' ? tempArr.length - 2 : tempArr.length - 1);
    for (let i = 0; i < length; i++) {
      motherPath += tempArr[i];
      motherPath += '/';
    }
    motherPath = motherPath.slice(0, -1);

    if (folder_name !== null) {
      if (shellLink(folderPath) !== shellLink(motherPath + "/" + folder_name)) {
        await shellExec(`mv ${shellLink(folderPath)} ${shellLink(motherPath)}/${shellLink(folder_name)}`);
      }
    }
    await shellExec(`open ${shellLink(motherPath)}`);
    console.log(`total: ${String(index)}`);
    if (folder_name !== null) {
      return `${motherPath}/${folder_name}`;
    } else {
      return folderPath;
    }

  } catch (e) {
    console.log(e);
  }
}

GoogleDrive.prototype.searchId_inPython = async function (name) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "searchId" ], { name });
    return result.id;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.upload_inPython = async function (folder_id, file) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "fileUpload" ], { folder_id, file });
    if (typeof result === "object" && result.id !== undefined) {
      return result.id;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleDrive.prototype.delete_inPython = async function (id) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "delete" ], { targetId: this.parsingId(id) });
    return result.id;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.makeFolder_inPython = async function (folderName) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "makeFolder" ], { folderName });
    return result.id;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.moveFolder_inPython = async function (targetId, parent) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "moveFolder" ], { targetId, parent });
    return result.message;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.makeFolder_andMove_inPython = async function (folderName, parent) {
  const instance = this;
  try {
    let id = await this.makeFolder_inPython(folderName);
    await this.moveFolder_inPython(id, parent);
    return id;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.read_webView_inPython = async function (targetId) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "permissionsOn" ], { targetId });
    let resultObj = JSON.parse(result.slice(/\{/.exec(result).index, /\}/.exec(result).index + 1));
    return resultObj.link;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.webPublish_inPython = async function (targetId) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "webPublish" ], { targetId });
    return result.link;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.parsingId = function (link) {
  let linkArr, target;
  if (/^http/i.test(link)) {
    linkArr = (link.split('?'))[0].split('/');
    for (let i of linkArr) {
      if (!/docs/gi.test(i) && !/document/gi.test(i) && !/spreadsheets/gi.test(i) && !/drive/gi.test(i) && !/google/gi.test(i) && !/file/gi.test(i) && !/folders/gi.test(i) && !/view/gi.test(i)) {
        if (i.length > 12) {
          target = i;
        }
      }
    }
  } else {
    target = link;
  }
  return target;
}

module.exports = GoogleDrive;
