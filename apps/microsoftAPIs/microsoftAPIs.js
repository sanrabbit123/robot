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
  this.clientId = "64d37228-e5f4-491c-9da5-9fe553de04ea";
  this.redirectUri = "https://home-liaison.serveftp.com/microsoft";
  this.clientSecret = "Oew8Q~M4Z.inZBSW5oufwjvpwUE9~LRp7ej3hcfE";
  this.loginUrl = "https://login.microsoftonline.com";
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

module.exports = MicrosoftAPIs;
