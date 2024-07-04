const GoogleDrive = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
  this.tokenDir = this.dir + "/python/google/tokens";
}

GoogleDrive.prototype.getClient_inNode = async function () {
  const instance = this;
  const { authenticate } = require("@google-cloud/local-auth");
  const { google } = require("googleapis");
  const { fileSystem } = this.mother;
  const { tokenDir } = this;
  try {
    const credentials = `${tokenDir}/client_secrets.json`;
    const driveToken = `${tokenDir}/driveToken.json`;
    const scopes = [ "https://www.googleapis.com/auth/drive" ];
    const loadSavedCredentialsIfExist = async function () {
      try {
        const credentials = await fileSystem(`readJson`, [ driveToken ]);
        return google.auth.fromJSON(credentials);
      } catch (err) {
        return null;
      }
    }
    const saveCredentials = async function (client) {
      try {
        const keys = await fileSystem(`readJson`, [ credentials ]);
        const key = keys.installed || keys.web;
        await fileSystem(`writeJson`, [ driveToken, {
          type: "authorized_user",
          client_id: key.client_id,
          client_secret: key.client_secret,
          refresh_token: client.credentials.refresh_token,
        } ]);
      } catch (e) {
        return null;
      }
    }
    const authorize = async function () {
      let client;
      client = await loadSavedCredentialsIfExist();
      if (client) {
        return client;
      }
      client = await authenticate({
        scopes,
        keyfilePath: credentials,
      });
      if (client.credentials) {
        await saveCredentials(client);
      }
      return client;
    }

    const authClient = await authorize();
    const drive = google.drive({version: 'v3', auth: authClient});

    return drive;
  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleDrive.prototype.get_file_inPython = async function (file_id, target_folder) {
  const instance = this;
  const { pythonExecute } = this.mother;
  try {
    const res = await pythonExecute(instance.pythonApp, [ "drive", "downloadFile" ], { targetId: file_id, targetFolder: target_folder });
    return res;
  } catch (e) {
    console.log("error : " + e.message);
  }
}

GoogleDrive.prototype.get_targetInfo_inPython = async function (id) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep, pythonExecute } = this.mother;
  try {
    const target_info = await pythonExecute(this.pythonApp, [ "drive", "getTargetAbsolute" ], { targetId: id });
    if (typeof target_info !== "object" || target_info === null) {
      throw new Error("invalid id");
    }
    target_info.isFolder = /google\-apps\.folder/gi.test(target_info.mimeType);
    return target_info;
  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleDrive.prototype.get_folder_inPython = async function (folder_id, folder_name = null, is_photo = false) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep, pythonExecute } = this.mother;
  const fileSave = async function (file_id, file_name, target_folder) {
    try {
      await sleep(500);
      const res = await pythonExecute(instance.pythonApp, [ "drive", "downloadFile" ], { targetId: file_id, targetFolder: target_folder });
      await sleep(500);
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
    let tempObj;

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
    console.log(files);
    index = 0;
    for (let { id, name } of files) {
      await sleep(3 * 1000);
      tempObj = await fileSave(id, name, folderPath);
      while (typeof tempObj !== "object" || tempObj === null || tempObj === undefined || typeof tempObj === "string") {
        console.log("error => ", id, index);
        await sleep(10 * 1000);
        tempObj = await fileSave(id, name, folderPath);
        await sleep(500);
      }
      console.log(index, "success", tempObj);
      index = index + 1;
    }

    if (is_photo) {
      folderInside = await fileSystem(`readFolder`, [ folderPath ]);
      for (let i = 0; i < folderInside.length; i++) {
        if (/\.(jpg|jpeg)$/i.test(folderInside[i])) {
          thisExec = ".jpg";
        } else if (/\.(png)$/i.test(folderInside[i])) {
          thisExec = ".png";
        } else {
          console.log(`remove ${shellLink(folderPath + "/" + folderInside[i])}`);
          await shellExec(`rm -rf ${shellLink(folderPath + "/" + folderInside[i])}`);
        }
        await shellExec(`mv ${shellLink(folderPath + "/" + folderInside[i])} ${shellLink(folderPath)}/pictureFromDrive${String(i + 1)}${thisExec}`);
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
    return null;
  }
}

GoogleDrive.prototype.searchFolderId_inPython = async function (name, parentId) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "searchFolderId" ], { name, parentId });
    return result.id;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

GoogleDrive.prototype.searchFileId_inPython = async function (name, parentId) {
  const instance = this;
  const mother = this.mother;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "searchFileId" ], { name, parentId });
    return result.id;
  } catch (e) {
    console.log(e.message);
    return null;
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
      throw new Error(result);
    }
  } catch (e) {
    console.log(e);
    try {
      const id = await this.upload_inNode(folder_id, file);
      if (typeof id !== "string") {
        throw new Error("upload fail");
      }
      return id;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

GoogleDrive.prototype.upload_inNode = async function (folder_id, file) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const drive = await this.getClient_inNode();
    let fileArr;
    let metaData;
    let fileStream;
    let media;

    fileArr = file.split("/");
    metaData = {
      name: fileArr[fileArr.length - 1],
      fields: folder_id
    };

    fileStream = await fileSystem(`readStream`, [ file ]);
    media = { body: fileStream };

    const result = await drive.files.create({
      requestBody: metaData,
      media,
    });

    console.log(result);
    return result.data.id;

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

GoogleDrive.prototype.listFiles_inPython = async function (folder_id) {
  const instance = this;
  const { fileSystem, shellExec, shellLink, sleep, pythonExecute } = this.mother;
  if (/^http/.test(folder_id) || /google/gi.test(folder_id)) {
    folder_id = this.parsingId(folder_id);
  }
  try {
    const files = await pythonExecute(this.pythonApp, [ "drive", "readFolderFiles" ], { targetId: folder_id });
    return files;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleDrive;
