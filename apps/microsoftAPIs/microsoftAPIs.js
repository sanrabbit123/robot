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


module.exports = MicrosoftAPIs;
