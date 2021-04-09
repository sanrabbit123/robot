const GoogleDrive = function (credentials = "default") {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.drive = {};
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

GoogleDrive.prototype.read_folder = function (folder_id) {
  const instance = this;
  if (/^http/.test(folder_id) || /google/gi.test(folder_id)) {
    folder_id = this.general.parsingId(folder_id);
  }
  return new Promise(function (resolve, reject) {
    instance.general.get_app("drive").then(function (drive) {
      drive.files.list({ q: `'${folder_id}' in parents` }, (err, res) => {
        if (err) {
          return reject(err);
        } else {
          resolve(res.data.files);
        }
      });
    });
  });
}

GoogleDrive.prototype.get_file = function (file_id) {
  const instance = this;
  const fs = require("fs");
  if (/^http/.test(file_id) || /google/gi.test(file_id)) {
    file_id = this.general.parsingId(file_id);
  }
  return new Promise(function (resolve, reject) {
    let fileName, saveFile, drive, dest;
    instance.general.get_app("drive").then(function (thisApp) {
      drive = thisApp;
      return drive.files.get({ fileId: file_id });
    }).then(function (file) {
      fileName = file.data.name;
      saveFile = process.cwd() + "/temp/" + fileName;
      dest = fs.createWriteStream(saveFile);
      drive.files.get({
        fileId: file_id,
        alt: "media"
      }, {
        responseType: "stream"
      }).then(function (stream) {
        stream.data.on("end", function () {
          resolve(saveFile);
        }).on("error", function (err) {
          reject(err);
        }).pipe(dest);
      }).catch(function (err) {
        reject(err);
      });
    }).catch(function (err) {
      reject(err);
    });
  });
}

GoogleDrive.prototype.get_folder = async function (folder_id, folder_name = null, is_photo = false) {
  const instance = this;
  const { fileSystem, shellLink } = this.general;
  const shell = require("shelljs");
  const fileSave = function (drive, file_id, file_name, target_folder) {
    const fs = require("fs");
    let saveFile, dest;
    return new Promise(function (resolve, reject) {
      saveFile = target_folder + "/" + file_name;
      dest = fs.createWriteStream(saveFile);
      drive.files.get({
        fileId: file_id,
        alt: "media"
      }, {
        responseType: "stream"
      }).then(function (stream) {
        stream.data.on("end", function () {
          resolve(saveFile);
        }).on("error", function (err) {
          reject(err);
        }).pipe(dest);
      }).catch(function (err) {
        reject(err);
      });
    });
  }
  if (/^http/.test(folder_id) || /google/gi.test(folder_id)) {
    folder_id = this.general.parsingId(folder_id);
  }
  try {
    const drive = await this.general.get_app("drive");
    const { data: { name: folderName } } = await drive.files.get({ fileId: folder_id });
    const { data: { files } } = await drive.files.list({ q: `'${folder_id}' in parents` });
    const targetFolderNameConst = "drive";
    const tempFolder = process.cwd() + "/temp";
    const tempFolderDir = await fileSystem(`readDir`, [ tempFolder ]);
    const folderPath = tempFolder + "/" + targetFolderNameConst + "/" + folderName.replace(/[\\\/\&\= ]/g, '_');
    let driveFolderDir, index;
    let folderInside;
    let thisExec;

    //init setting
    if (!tempFolderDir.includes(targetFolderNameConst)) {
      shell.exec(`mkdir ${shellLink(tempFolder + "/" + targetFolderNameConst)}`);
    }
    driveFolderDir = await fileSystem(`readDir`, [ tempFolder + "/" + targetFolderNameConst ]);
    for (let i of driveFolderDir) {
      shell.exec(`rm -rf ${shellLink(tempFolder + "/" + targetFolderNameConst + "/" + i)}`);
    }

    //make folder in process temp folder
    shell.exec(`mkdir ${shellLink(folderPath)}`);

    //download files
    index = 0;
    for (let { id, name } of files) {
      await this.sleep(500);
      console.log(index, await fileSave(drive, id, name, folderPath));
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
          shell.exec(`mv ${shellLink(folderPath + "/" + folderInside[i])} ${shellLink(folderPath)}/photo${String(i + 1)}${thisExec}`);
        }
      }
    }

    if (folder_name !== null) {
      shell.exec(`mv ${shellLink(folderPath)} ${shellLink(folderPath.split("/").slice(0, -1).join("/"))}/${shellLink(folder_name)}`);
    }
    shell.exec(`open ${shellLink(folderPath.split("/").slice(0, -1).join("/"))}`);
    console.log(`total: ${String(index)}`);
    return folderPath;
  } catch (e) {
    console.log(e);
  }
}

GoogleDrive.prototype.read_webView = function (file_id) {
  const instance = this;
  return new Promise(function (resolve, reject) {
    instance.drive.files.get({ fileId: file_id, fields: 'webViewLink' }, (err, res) => {
      if (err) { return reject(err) };
      resolve(res.data.webViewLink);
    });
  });
}

GoogleDrive.prototype.permissions_on = function (file_id) {
  const instance = this;
  return new Promise(function (resolve, reject) {
    instance.drive.permissions.create({ fileId: file_id, requestBody: { role: 'reader', type: 'anyone', } }, (err) => {
      if (err) { return reject(err) };
      resolve('success');
    });
  });
}

GoogleDrive.prototype.upload = function (folder_id, file) {
  const instance = this;
  let fs = require('fs');
  return new Promise(function (resolve, reject) {
    instance.drive.files.create({
      resource: { name: (file.split('/'))[file.split('/').length - 1], parents: [ folder_id ], },
      media: { body: fs.createReadStream(file), },
      fields: 'id',
    }, (err, file) => {
      if (err) { reject(err); }
      else {
        resolve(file.data.id);
      }
    });
  });
}

GoogleDrive.prototype.upload_andView = async function (folder_id, file) {
  const instance = this;
  try {
    this.drive = await this.general.get_app("drive");
    let id = await this.upload(folder_id, file);
    await this.permissions_on(id);
    return (await this.read_webView(id));
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.makeFolder = function (folderName) {
  const instance = this;
  let fileMetadata = {
    'name': folderName,
    'mimeType': 'application/vnd.google-apps.folder'
  };
  return new Promise(function (resolve, reject) {
    instance.drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        reject(err);
      } else {
        resolve(file.data.id);
      }
    });
  });
}

GoogleDrive.prototype.moveFolder = function (targetId, parent) {
  const instance = this;
  return new Promise(function (resolve, reject) {
      let fileId = targetId;
      let folderId = parent;
      instance.drive.files.get({
        fileId: fileId,
        fields: 'parents'
      }, function (err, file) {
        if (err) {
          reject(err);
        } else {
          let previousParents = file.data.parents.join(',');
          instance.drive.files.update({
            fileId: fileId,
            addParents: folderId,
            removeParents: previousParents,
            fields: 'id, parents'
          }, function (err, file) {
            if (err) {
              reject(err);
            } else {
              resolve(targetId);
            }
          });
        }
      });
  });
}

GoogleDrive.prototype.moveFile = async function (targetId, parent) {
  const instance = this;
  try {
    this.drive = await this.general.get_app("drive");
    return (await this.moveFolder(targetId, parent));
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.makeFolder_andMove = async function (folderName, parent) {
  const instance = this;
  try {
    this.drive = await this.general.get_app("drive");
    let id = await this.makeFolder(folderName);
    return (await this.moveFolder(id, parent));
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.upload_inPython = async function (folder_id, file) {
  const instance = this;
  const mother = this.general;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "fileUpload" ], { folder_id, file });
    return result.id;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.makeFolder_inPython = async function (folderName) {
  const instance = this;
  const mother = this.general;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "makeFolder" ], { folderName });
    return result.id;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.moveFolder_inPython = async function (targetId, parent) {
  const instance = this;
  const mother = this.general;
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
  const mother = this.general;
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
  const mother = this.general;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "drive", "webPublish" ], { targetId });
    return result.link;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDrive.prototype.sleep = function (time) {
  const instance = this;
  return new Promise(function (resolve, reject) {
    setTimeout(function(){
      resolve('awake');
    }, time);
  });
}

module.exports = GoogleDrive;
