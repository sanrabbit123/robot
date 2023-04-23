const MicrosoftAPIs = function (mother = null, back = null, address = null) {
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
  this.dir = process.cwd() + "/apps/microsoftAPIs";
  this.tokenDir = this.dir + "/token";
  this.tokenFileName = "accessToken.dat";

  this.tenant = "consumers";
  this.clientId = "ee656079-c22a-46ae-9081-ceb06c1d54c9";
  this.redirectUri = "https://home-liaison.serveftp.com/microsoft";
  this.clientSecret = "Ufr8Q~cQxarROQ6YD9~4oQ02Rvno2vJGLY2tKdCo";
  this.loginUrl = "https://login.microsoftonline.com";

  this.schoolTenantId = "161b815d-7df2-4663-b9ae-883f18f6a4ff";
  this.schoolClientId = "2be47b0a-0076-4252-9504-c8ec2586382e";
  this.schoolRedirectUri = "https://home-liaison.serveftp.com/microsoft";
  this.schoolClientSecret = "bRX8Q~Lvraflo50A0YzNK4wXXkbcKSGX.EZimbQ1";
  this.schoolUserId = "5b8991a0-62b3-4b66-a286-9f2d0164f8e1";

  this.scope = [
    "email",
    "files.read",
    "files.read.all",
    "files.read.selected",
    "files.readwrite",
    "files.readwrite.all",
    "files.readwrite.appfolder",
    "files.readwrite.selected",
    "openid",
    "profile",
    "user.read",
    "devicemanagementmanageddevices.read.all",
    "devicemanagementmanageddevices.readwrite.all",
    "device.read",
    "device.command",
    "device.read.all",
    "directory.read.all",
    "directory.readwrite.all",
  ];

  this.accessToken = null;

  this.oneDriveUrl = "https://onedrive.live.com";
  this.graphUrl = "https://graph.microsoft.com";
  this.version = "v1.0";
  this.driveId = "46518f7e2f1ac0c3";

  this.excelFolderId = "46518F7E2F1AC0C3!126";
  this.defaultExcelId = "46518F7E2F1AC0C3!127";

  this.wordFolderId = "46518F7E2F1AC0C3!159";
  this.defaultWordId = "46518F7E2F1AC0C3!160";

  this.powerFolderId = "46518F7E2F1AC0C3!202";
  this.defaultPowerId = "46518F7E2F1AC0C3!203";

  this.exe = {
    excel: "xlsx",
    word: "docx",
    power: "pptx",
  };
  this.odExe = {
    excel: "odxlsx",
    word: "oddocx",
    power: "odpptx",
  };
  this.statusJson = {
    past: "pastStatus.json",
    now: "nowStatus.json",
  }

  this.folderNameToken = "______folderName______";
}

MicrosoftAPIs.prototype.renewAccessToken = async function () {
  const instance = this;
  const address = this.address;
  const { tenant, clientId, redirectUri, clientSecret, loginUrl, scope } = this;
  const { requestSystem, linkToString } = this.mother;
  try {
    let response;

    response = await requestSystem(loginUrl + "/" + tenant + "/oauth2/v2.0/authorize", {
      client_id: clientId,
      scope: scope.join(" "),
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      response_type: "code",
      response_mode: "query",
    }, {
      method: "get",
    });

    response = await requestSystem("https://" + address.secondinfo.host + "/browserRequest", { link: linkToString(response.request.res.responseUrl) }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

  } catch (e) {
    console.log(e);
  }
}

MicrosoftAPIs.prototype.codeToAccessToken = async function (code) {
  const instance = this;
  const address = this.address;
  const { tenant, clientId, redirectUri, clientSecret, loginUrl, scope, tokenDir, tokenFileName } = this;
  const { requestSystem, fileSystem } = this.mother;
  try {
    let response, accessToken;
    
    response = await requestSystem(loginUrl + "/" + tenant + "/oauth2/v2.0/token", {
      client_id: clientId,
      scope: scope.join(" "),
      code: code,
      redirect_uri: redirectUri,
      client_secret: clientSecret,
      grant_type: "authorization_code",
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })

    accessToken = response.data.access_token;
    await fileSystem(`writeJson`, [ `${tokenDir}/${tokenFileName}`, { accessToken } ]);

    return accessToken;

  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.getAccessTokenInServer = async function () {
  const instance = this;
  const address = this.address;
  const { tenant, clientId, redirectUri, clientSecret, loginUrl, scope, tokenDir, tokenFileName } = this;
  const { fileSystem } = this.mother;
  try {
    let rawJson, accessToken;
    rawJson = await fileSystem(`readJson`, [ `${tokenDir}/${tokenFileName}` ]);
    accessToken = rawJson.accessToken;
    return accessToken;
  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.getAccessToken = async function () {
  const instance = this;
  const address = this.address;
  const { tenant, clientId, redirectUri, clientSecret, loginUrl, scope, tokenDir, tokenFileName } = this;
  const { requestSystem } = this.mother;
  try {
    let response;
    response = await requestSystem("https://" + address.officeinfo.ghost.host + "/getMicrosoftAccessToken", { data: null }, { headers: { "Content-Type": "application/json" } });
    return response.data.accessToken;
  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.getSchoolAccessToken = async function () {
  const instance = this;
  const address = this.address;
  const { schoolTenantId, schoolClientId, schoolRedirectUri, schoolClientSecret, schoolUserId, loginUrl } = this;
  const { requestSystem } = this.mother;
  try {
    let res;
    let accessToken;

    res = await requestSystem(loginUrl + "/" + schoolTenantId + "/oauth2/v2.0/token", {
      client_id: schoolClientId,
      client_secret: schoolClientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials"
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    })
    accessToken = res.data.access_token

    return accessToken;
  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.isMicrosoftFile = function (fileName) {
  const instance = this;
  const { exe } = this;
  let boo;
  boo = false;
  if (typeof fileName !== "string") {
    throw new Error("invalid input");
  }
  for (let key in exe) {
    if ((new RegExp("." + exe[key] + "$")).test(fileName)) {
      boo = true;
      break;
    }
  }
  return boo;
}

MicrosoftAPIs.prototype.localToOneDriveName = function (fileName) {
  const instance = this;
  const { exe, odExe } = this;
  if (typeof fileName !== "string") {
    throw new Error("invalid input");
  }
  if (!this.isMicrosoftFile(fileName)) {
    throw new Error("invalid input");
  }
  if ((new RegExp("." + exe.excel + "$")).test(fileName)) {
    return fileName.split(".").slice(0, -1).join(".") + "." + odExe.excel;
  } else if ((new RegExp("." + exe.word + "$")).test(fileName)) {
    return fileName.split(".").slice(0, -1).join(".") + "." + odExe.word;
  } else if ((new RegExp("." + exe.power + "$")).test(fileName)) {
    return fileName.split(".").slice(0, -1).join(".") + "." + odExe.power;
  } else {
    throw new Error("invalid input 2");
  }
}

MicrosoftAPIs.prototype.listOnedrive = async function (id = "root") {
  if (typeof id !== "string") {
    throw new Error("invalid input");
  }
  const instance = this;
  const { graphUrl, version, driveId } = this;
  const { requestSystem } = this.mother;
  try {
    let response;
    let accessToken;

    accessToken = await this.getAccessToken();

    if (id === "root") {
      response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/" + id + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      });
    } else {
      response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + id + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      });
    }

    return response.data.value;
    
  } catch (e) {
    await instance.renewAccessToken();
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.createExcel = async function (name = "default", safeLinkMode = false) {
  if (typeof name !== "string") {
    throw new Error("invalid input");
  }
  const instance = this;
  const { graphUrl, version, driveId, excelFolderId, defaultExcelId, exe, folderNameToken, oneDriveUrl } = this;
  const { requestSystem, uniqueValue, sleep, linkToString } = this.mother;
  try {
    let response;
    let newFolderId;
    let accessToken;
    let editUrl;

    name = name.trim().replace(/ /gi, "_").replace(/[\=\+\?\/\\\|\!\#\$\%\^\&\*\~\n\t\.]/gi, '').replace(/ /gi, "_");
    accessToken = await this.getAccessToken();

    response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + excelFolderId + "/children", {
      name: uniqueValue("hex") + folderNameToken + name,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename"
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })
    newFolderId = response.data.id;

    await sleep(500);

    response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + defaultExcelId + "/copy", {
      parentReference: {
        driveId,
        id: newFolderId
      },
      name: name + "." + exe.excel,
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })

    do {
      await sleep(500);
      response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      })
    } while (response.data.value.length !== 1)

    await sleep(1000);

    editUrl = oneDriveUrl + "/edit.aspx?resid=" + globalThis.encodeURIComponent(response.data.value[0].id);

    return {
      name: name + "." + exe.excel,
      id: response.data.value[0].id,
      cTag: response.data.value[0].cTag,
      eTag: response.data.value[0].eTag,
      webUrl: safeLinkMode ? linkToString(response.data.value[0].webUrl) : response.data.value[0].webUrl,
      editUrl: safeLinkMode ? linkToString(editUrl) : editUrl,
    };

  } catch (e) {
    await instance.renewAccessToken();
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.createWord = async function (name = "default", safeLinkMode = false) {
  if (typeof name !== "string") {
    throw new Error("invalid input");
  }
  const instance = this;
  const { graphUrl, version, driveId, wordFolderId, defaultWordId, exe, folderNameToken, oneDriveUrl } = this;
  const { requestSystem, uniqueValue, sleep, linkToString } = this.mother;
  try {
    let response;
    let newFolderId;
    let accessToken;
    let editUrl;

    name = name.trim().replace(/ /gi, "_").replace(/[\=\+\?\/\\\|\!\#\$\%\^\&\*\~\n\t\.]/gi, '').replace(/ /gi, "_");
    accessToken = await this.getAccessToken();

    response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + wordFolderId + "/children", {
      name: uniqueValue("hex") + folderNameToken + name,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename"
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })
    newFolderId = response.data.id;

    await sleep(500);

    response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + defaultWordId + "/copy", {
      parentReference: {
        driveId,
        id: newFolderId
      },
      name: name + "." + exe.word,
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })

    do {
      await sleep(500);
      response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      })
    } while (response.data.value.length !== 1)

    await sleep(1000);

    editUrl = oneDriveUrl + "/edit.aspx?resid=" + globalThis.encodeURIComponent(response.data.value[0].id);

    return {
      name: name + "." + exe.word,
      id: response.data.value[0].id,
      cTag: response.data.value[0].cTag,
      eTag: response.data.value[0].eTag,
      webUrl: safeLinkMode ? linkToString(response.data.value[0].webUrl) : response.data.value[0].webUrl,
      editUrl: safeLinkMode ? linkToString(editUrl) : editUrl,
    };

  } catch (e) {
    await instance.renewAccessToken();
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.createPowerPoint = async function (name = "default", safeLinkMode = false) {
  if (typeof name !== "string") {
    throw new Error("invalid input");
  }
  const instance = this;
  const { graphUrl, version, driveId, powerFolderId, defaultPowerId, exe, folderNameToken, oneDriveUrl } = this;
  const { requestSystem, uniqueValue, sleep, linkToString } = this.mother;
  try {
    let response;
    let newFolderId;
    let accessToken;
    let editUrl;

    name = name.trim().replace(/ /gi, "_").replace(/[\=\+\?\/\\\|\!\#\$\%\^\&\*\~\n\t\.]/gi, '').replace(/ /gi, "_");
    accessToken = await this.getAccessToken();

    response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + powerFolderId + "/children", {
      name: uniqueValue("hex") + folderNameToken + name,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename"
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })
    newFolderId = response.data.id;

    await sleep(500);

    response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + defaultPowerId + "/copy", {
      parentReference: {
        driveId,
        id: newFolderId
      },
      name: name + "." + exe.power,
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })

    do {
      await sleep(500);
      response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      })
    } while (response.data.value.length !== 1)

    await sleep(1000);

    editUrl = oneDriveUrl + "/edit.aspx?resid=" + globalThis.encodeURIComponent(response.data.value[0].id);

    return {
      name: name + "." + exe.power,
      id: response.data.value[0].id,
      cTag: response.data.value[0].cTag,
      eTag: response.data.value[0].eTag,
      webUrl: safeLinkMode ? linkToString(response.data.value[0].webUrl) : response.data.value[0].webUrl,
      editUrl: safeLinkMode ? linkToString(editUrl) : editUrl,
    };

  } catch (e) {
    await instance.renewAccessToken();
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.getDownloadUrl = async function (id, safeLinkMode = false) {
  const instance = this;
  const { graphUrl, version, driveId } = this;
  const { requestSystem, linkToString } = this.mother;
  try {
    let response, accessToken;
    accessToken = await this.getAccessToken();
    response = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + id, {}, {
      method: "get",
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
    if (safeLinkMode) {
      return linkToString(response.data["@microsoft.graph.downloadUrl"]);
    } else {
      return response.data["@microsoft.graph.downloadUrl"];
    }
  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.uploadExcel = async function (filePath, safeLinkMode = false) {
  const instance = this;
  const axios = require("axios");
  const { graphUrl, driveId, version, exe, excelFolderId, folderNameToken, oneDriveUrl } = this;
  const { fileSystem, requestSystem, uniqueValue, sleep, linkToString } = this.mother;
  try {
    let buffer;
    let res;
    let filePathArr;
    let fileName, fileName_full;
    let thisExe;
    let accessToken;
    let newFileName;
    let newFileNamePure;
    let newFolderId;
    let editUrl;

    if (typeof filePath !== "string") {
      throw new Error("invalid input 1");
    }
    if (!(new RegExp(exe.excel + "$")).test(filePath)) {
      throw new Error("invalid input 2");
    }

    filePathArr = filePath.split("/");
    fileName_full = filePathArr[filePathArr.length - 1];
    thisExe = fileName_full.split(".")[fileName_full.split(".").length - 1];
    if (thisExe !== exe.excel) {
      throw new Error("invalid input 3");
    }
    fileName = fileName_full.split(".").slice(0, -1).join(".");
    newFileNamePure = fileName.trim().replace(/[\?\/\\\!\@\#\$\%\^\&\*\=\+\!\:\;\`\~\.]/gi, '').replace(/ /gi, "_").replace(/\t/gi, "_");
    newFileName = newFileNamePure + "." + thisExe;

    accessToken = await this.getAccessToken();
    buffer = await fileSystem(`readBuffer`, [ filePath ]);


    res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + excelFolderId + "/children", {
      name: uniqueValue("hex") + folderNameToken + newFileNamePure,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename"
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })
    newFolderId = res.data.id;

    await sleep(500);

    res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + ":/" + newFileName + ":/createUploadSession", {
      "@microsoft.graph.conflictBehavior": "replace",
      name: newFileName,
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })

    res = await axios.put(res.data.uploadUrl, buffer, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
    
    do {
      await sleep(500);
      res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      })
    } while (res.data.value.length !== 1)

    await sleep(1000);

    editUrl = oneDriveUrl + "/edit.aspx?resid=" + globalThis.encodeURIComponent(res.data.value[0].id);

    return {
      name: newFileName,
      id: res.data.value[0].id,
      cTag: res.data.value[0].cTag,
      eTag: res.data.value[0].eTag,
      webUrl: safeLinkMode ? linkToString(res.data.value[0].webUrl) : res.data.value[0].webUrl,
      editUrl: safeLinkMode ? linkToString(editUrl) : editUrl,
    };

  } catch (e) {
    console.log(e);
  }
}

MicrosoftAPIs.prototype.uploadWord = async function (filePath, safeLinkMode = false) {
  const instance = this;
  const axios = require("axios");
  const { graphUrl, driveId, version, exe, wordFolderId, folderNameToken, oneDriveUrl } = this;
  const { fileSystem, requestSystem, uniqueValue, sleep, linkToString } = this.mother;
  try {
    let buffer;
    let res;
    let filePathArr;
    let fileName, fileName_full;
    let thisExe;
    let accessToken;
    let newFileName;
    let newFileNamePure;
    let newFolderId;
    let editUrl;

    if (typeof filePath !== "string") {
      throw new Error("invalid input 1");
    }
    if (!(new RegExp(exe.word + "$")).test(filePath)) {
      throw new Error("invalid input 2");
    }

    filePathArr = filePath.split("/");
    fileName_full = filePathArr[filePathArr.length - 1];
    thisExe = fileName_full.split(".")[fileName_full.split(".").length - 1];
    if (thisExe !== exe.word) {
      throw new Error("invalid input 3");
    }
    fileName = fileName_full.split(".").slice(0, -1).join(".");
    newFileNamePure = fileName.trim().replace(/[\?\/\\\!\@\#\$\%\^\&\*\=\+\!\:\;\`\~\.]/gi, '').replace(/ /gi, "_").replace(/\t/gi, "_");
    newFileName = newFileNamePure + "." + thisExe;

    accessToken = await this.getAccessToken();
    buffer = await fileSystem(`readBuffer`, [ filePath ]);

    res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + wordFolderId + "/children", {
      name: uniqueValue("hex") + folderNameToken + newFileNamePure,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename"
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })
    newFolderId = res.data.id;

    await sleep(500);

    res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + ":/" + newFileName + ":/createUploadSession", {
      "@microsoft.graph.conflictBehavior": "replace",
      name: newFileName,
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })

    res = await axios.put(res.data.uploadUrl, buffer, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
    
    do {
      await sleep(500);
      res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      })
    } while (res.data.value.length !== 1)

    await sleep(1000);

    editUrl = oneDriveUrl + "/edit.aspx?resid=" + globalThis.encodeURIComponent(res.data.value[0].id);

    return {
      name: newFileName,
      id: res.data.value[0].id,
      cTag: res.data.value[0].cTag,
      eTag: res.data.value[0].eTag,
      webUrl: safeLinkMode ? linkToString(res.data.value[0].webUrl) : res.data.value[0].webUrl,
      editUrl: safeLinkMode ? linkToString(editUrl) : editUrl,
    };

  } catch (e) {
    console.log(e);
  }
}

MicrosoftAPIs.prototype.uploadPowerPoint = async function (filePath, safeLinkMode = false) {
  const instance = this;
  const axios = require("axios");
  const { graphUrl, driveId, version, exe, powerFolderId, folderNameToken, oneDriveUrl } = this;
  const { fileSystem, requestSystem, uniqueValue, sleep, linkToString } = this.mother;
  try {
    let buffer;
    let res;
    let filePathArr;
    let fileName, fileName_full;
    let thisExe;
    let accessToken;
    let newFileName;
    let newFileNamePure;
    let newFolderId;
    let editUrl;

    if (typeof filePath !== "string") {
      throw new Error("invalid input 1");
    }
    if (!(new RegExp(exe.power + "$")).test(filePath)) {
      throw new Error("invalid input 2");
    }

    filePathArr = filePath.split("/");
    fileName_full = filePathArr[filePathArr.length - 1];
    thisExe = fileName_full.split(".")[fileName_full.split(".").length - 1];
    if (thisExe !== exe.power) {
      throw new Error("invalid input 3");
    }
    fileName = fileName_full.split(".").slice(0, -1).join(".");
    newFileNamePure = fileName.trim().replace(/[\?\/\\\!\@\#\$\%\^\&\*\=\+\!\:\;\`\~\.]/gi, '').replace(/ /gi, "_").replace(/\t/gi, "_");
    newFileName = newFileNamePure + "." + thisExe;

    accessToken = await this.getAccessToken();
    buffer = await fileSystem(`readBuffer`, [ filePath ]);

    res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + powerFolderId + "/children", {
      name: uniqueValue("hex") + folderNameToken + newFileNamePure,
      folder: {},
      "@microsoft.graph.conflictBehavior": "rename"
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })
    newFolderId = res.data.id;

    await sleep(500);

    res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + ":/" + newFileName + ":/createUploadSession", {
      "@microsoft.graph.conflictBehavior": "replace",
      name: newFileName,
    }, {
      headers: {
        "Authorization": "Bearer " + accessToken,
        "Content-Type": "application/json",
      }
    })

    res = await axios.put(res.data.uploadUrl, buffer, {
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    });
    
    do {
      await sleep(500);
      res = await requestSystem(graphUrl + "/" + version + "/drives/" + driveId + "/items/" + newFolderId + "/children", {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      })
    } while (res.data.value.length !== 1)

    await sleep(1000);

    editUrl = oneDriveUrl + "/edit.aspx?resid=" + globalThis.encodeURIComponent(res.data.value[0].id);

    return {
      name: newFileName,
      id: res.data.value[0].id,
      cTag: res.data.value[0].cTag,
      eTag: res.data.value[0].eTag,
      webUrl: safeLinkMode ? linkToString(res.data.value[0].webUrl) : res.data.value[0].webUrl,
      editUrl: safeLinkMode ? linkToString(editUrl) : editUrl,
    };

  } catch (e) {
    console.log(e);
  }
}

MicrosoftAPIs.prototype.uploadDocument = async function (filePath) {
  const instance = this;
  const { exe } = this;
  try {
    let thisResult;

    if (typeof filePath !== "string") {
      throw new Error("invalid input 0");
    }
    if (!this.isMicrosoftFile(filePath)) {
      throw new Error("invalid input");
    }
    if ((new RegExp("." + exe.excel + "$")).test(filePath)) {
      thisResult = await this.uploadExcel(filePath, false);
    } else if ((new RegExp("." + exe.word + "$")).test(filePath)) {
      thisResult = await this.uploadWord(filePath, false);
    } else if ((new RegExp("." + exe.power + "$")).test(filePath)) {
      thisResult = await this.uploadPowerPoint(filePath, false);
    } else {
      throw new Error("invalid input 2");
    }

    return thisResult;
  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.storeDevicesStatusOneTime = async function (members = []) {
  const instance = this;
  const address = this.address;
  const { graphUrl, version, tokenDir, statusJson } = this;
  const { fileSystem, sleep, requestSystem, equalJson } = this.mother;
  try {
    const deltaTime = 0;
    const agoMinutesDelta = 120;
    let res, accessToken;
    let url;
    let syncDate;
    let deviceList;
    let lastSyncDateTime;
    let now;
    let finalObject;
    let path;
    let previousObject;
    let syncAgo;

    if (members.length === 0) {
      members = (await requestSystem("https://" + address.backinfo.host + "/getMembers", { type: "get" }, {
        headers: {
          "Content-Type": "application/json",
        }
      })).data;
    }

    accessToken = await this.getSchoolAccessToken();
    path = "/deviceManagement/managedDevices";

    url = graphUrl + "/" + version + path;
    res = await requestSystem(url, {}, {
      method: "get",
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    })

    deviceList = res.data.value.map((obj) => {
      let thisMember;
      thisMember = members.find((member) => { return member.computer.id === obj.id });
      return {
        id: obj.id,
        name: obj.deviceName,
        os: {
          type: obj.operatingSystem,
          version: obj.osVersion,
        },
        storage: {
          total: obj.totalStorageSpaceInBytes,
          free: obj.freeStorageSpaceInBytes
        },
        mac: thisMember.computer.mac,
        member: {
          id: thisMember.id,
          name: thisMember.name,
        }
      }
    });

    syncDate = new Date();
    syncAgo = new Date(JSON.stringify(syncDate).slice(1, -1));
    syncAgo.setMinutes(syncAgo.getMinutes() - agoMinutesDelta);
    for (let { id } of deviceList) {
      url = graphUrl + "/" + version + path + "/" + id + "/syncDevice";
      res = await requestSystem(url, { data: null }, {
        headers: {
          "Authorization": "Bearer " + accessToken,
          "Content-Type": "application/json",
        }
      });
    }

    await sleep(deltaTime * 1000);
    now = new Date();

    for (let obj of deviceList) {
      url = graphUrl + "/" + version + path + "/" + obj.id;
      res = await requestSystem(url, {}, {
        method: "get",
        headers: {
          "Authorization": "Bearer " + accessToken,
        }
      });
      lastSyncDateTime = new Date(res.data.lastSyncDateTime);

      console.log(res.data);

      obj.online = (syncAgo.valueOf() <= lastSyncDateTime.valueOf());

      


      console.log(obj.name, syncAgo, lastSyncDateTime);
    }

    finalObject = {
      date: new Date(),
      devices: deviceList,
    };
    previousObject = equalJson(JSON.stringify(await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.now}` ])));

    await fileSystem(`writeJson`, [ `${tokenDir}/${statusJson.past}`, previousObject ]);
    await fileSystem(`writeJson`, [ `${tokenDir}/${statusJson.now}`, finalObject ]);

    return {
      from: previousObject,
      to: finalObject
    };

  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.storeDevicesStatus = async function (members = []) {
  const instance = this;
  const { sleep } = this.mother;
  try {
    let result;
    result = await this.storeDevicesStatusOneTime(members);
    while (result === null) {
      await sleep(1000);
      result = await this.storeDevicesStatusOneTime(members);
    }
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
}

MicrosoftAPIs.prototype.getDevicesStatus = async function () {
  const instance = this;
  const { graphUrl, version, tokenDir, statusJson } = this;
  const { fileSystem, equalJson } = this.mother;
  try {
    let nowObject;
    nowObject = equalJson(JSON.stringify(await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.now}` ])));
    return nowObject;
  } catch (e) {
    console.log(e);
  }
}

MicrosoftAPIs.prototype.schoolTokenAdminConsent = async function () {
  const instance = this;
  const { loginUrl, schoolTenantId, schoolClientId, schoolRedirectUri, schoolClientSecret } = this;
  const { requestSystem } = this.mother;
  try {
    let url;
    let res;

    url = `${loginUrl}/${schoolTenantId}/adminconsent`;

    res = await requestSystem(url, {
      client_id: schoolClientId,
      redirect_uri: schoolRedirectUri,
    }, {
      method: "get",
    })

    console.log(res.request.res.responseUrl);

  } catch (e) {
    console.log(e);
  }
}

MicrosoftAPIs.prototype.getDevicesFlow = async function (result = null, members = []) {
  const instance = this;
  const address = this.address;
  const { tokenDir, statusJson } = this;
  const { equalJson, fileSystem, requestSystem, messageSend } = this.mother;
  try {
    if (typeof result !== "object" || result === null) {
      result = {};
      result.from = await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.past}` ]);
      result.to = await fileSystem(`readJson`, [ `${tokenDir}/${statusJson.now}` ]);
    }
    const { from: fromStatus, to: toStatus } = result;
    const fromDevices = fromStatus.devices;
    const toDevices = toStatus.devices;
    const deathKeyword = "death";
    const aliveKeyword = "alive";
    const toToken = "_____to_____";
    const channel = "#general";
    let devicesArr;
    let thisObject;
    let toObject;
    let statusObject;
    let deathToAliveTargets;
    let aliveToDateTargets;
    let tempObj;
    let thisMember;
    let helloMember;
    let goodByeMember;
    let messageArr;

    helloMember = (slack, name, title) => {
      return `<@${slack}> 안녕하세요, ${name} ${title}님! 좋은 아침입니다!`;
    }
    goodByeMember = (slack, name, title) => {
      return `<@${slack}> ${name} ${title}님! 오늘도 수고하셨습니다. 안녕히 가세요!`;
    }

    devicesArr = [];
    for (let obj of fromDevices) {
      thisObject = equalJson(JSON.stringify(obj));
      toObject = toDevices.find((o) => { return o.id === obj.id });
      thisObject.fromOnline = obj.online;
      thisObject.toOnline = toObject.online;
      thisObject.flow = (thisObject.fromOnline ? aliveKeyword : deathKeyword) + toToken + (thisObject.toOnline ? aliveKeyword : deathKeyword);
      devicesArr.push(thisObject);
    }

    statusObject = {
      raw: equalJson(JSON.stringify(devicesArr)),
      keywords: {
        alive: aliveKeyword,
        death: deathKeyword,
        token: toToken,
      },
      summary: {}
    }

    statusObject.summary[aliveKeyword + toToken + aliveKeyword] = [];
    statusObject.summary[aliveKeyword + toToken + deathKeyword] = [];
    statusObject.summary[deathKeyword + toToken + aliveKeyword] = [];
    statusObject.summary[deathKeyword + toToken + deathKeyword] = [];

    for (let obj of devicesArr) {
      statusObject.summary[obj.flow].push({
        id: obj.id,
        member: obj.member,
      })
    }

    if (members.length === 0) {
      members = (await requestSystem("https://" + address.backinfo.host + "/getMembers", { type: "get" }, { headers: { "Content-Type": "application/json" } })).data;
    }

    deathToAliveTargets = [];
    aliveToDateTargets = [];

    for (let obj of statusObject.summary[deathKeyword + toToken + aliveKeyword]) {
      tempObj = {};
      thisMember = members.find((o) => { return o.id === obj.member.id });
      tempObj.id = thisMember.id;
      tempObj.name = thisMember.name;
      tempObj.title = thisMember.title;
      tempObj.slackId = thisMember.slack.id;
      tempObj.message = helloMember(thisMember.slack.id, thisMember.name, thisMember.title);
      deathToAliveTargets.push(tempObj);
    }

    for (let obj of statusObject.summary[aliveKeyword + toToken + deathKeyword]) {
      tempObj = {};
      thisMember = members.find((o) => { return o.id === obj.member.id });
      tempObj.id = thisMember.id;
      tempObj.name = thisMember.name;
      tempObj.title = thisMember.title;
      tempObj.slackId = thisMember.slack.id;
      tempObj.message = goodByeMember(thisMember.slack.id, thisMember.name, thisMember.title);
      aliveToDateTargets.push(tempObj);
    }

    messageArr = deathToAliveTargets.map((o) => { return o.message }).concat(aliveToDateTargets.map((o) => { return o.message }));

    for (let text of messageArr) {
      await messageSend({ text, channel, voice: true });
    }

    return statusObject;

  } catch (e) {
    console.log(e);
    return null;
  }
}

module.exports = MicrosoftAPIs;
