const GoogleCloud = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.tokenDir = this.dir + "/python/google/tokens";
  this.iamSecrets = this.tokenDir + "/iam_secrets.json";
  this.envConst = "GOOGLE_APPLICATION_CREDENTIALS";
  this.projectId = "";
  this.location = "global";
  this.ready = false;
}

GoogleCloud.prototype.setCredentials = async function () {
  const instance = this;
  const { envConst, iamSecrets } = this;
  const { fileSystem } = this.mother;
  try {
    let jsonContents;

    process.env[envConst] = iamSecrets;
    jsonContents = await fileSystem(`readJson`, [ iamSecrets ]);
    this.projectId = jsonContents["project_id"];
    this.ready = true;

  } catch (e) {
    console.log(e);
  }
}

GoogleCloud.prototype.textTranslation = async function (input) {
  const instance = this;
  const { TranslationServiceClient } = require('@google-cloud/translate');
  try {
    const translationClient = new TranslationServiceClient();
    let parent, request, mimeType;
    let sourceLanguageCode, targetLanguageCode;
    let response;

    if (!this.ready) {
      await this.setCredentials();
    }

    parent = `projects/${this.projectId}/locations/${this.location}`;
    mimeType = "text/plain";

    request = { parent, content: input };
    [ response ] = await translationClient.detectLanguage(request);

    if (response.languages.map((o) => { return o.languageCode }).includes("ko")) {
      sourceLanguageCode = "ko";
      targetLanguageCode = "en";
    } else {
      sourceLanguageCode = "en";
      targetLanguageCode = "ko";
    }

    request = { parent, contents: [ input ], mimeType, sourceLanguageCode, targetLanguageCode };
    [ response ] = await translationClient.translateText(request);

    return response.translations.map((obj) => { return obj.translatedText }).join("\n");

  } catch (e) {
    console.log(e);
  }
}

GoogleCloud.prototype.isKorean = async function (input) {
  const instance = this;
  const { TranslationServiceClient } = require('@google-cloud/translate');
  try {
    const translationClient = new TranslationServiceClient();
    let parent, request, mimeType;
    let response;

    if (!this.ready) {
      await this.setCredentials();
    }

    parent = `projects/${this.projectId}/locations/${this.location}`;
    mimeType = "text/plain";

    request = { parent, content: input };
    [ response ] = await translationClient.detectLanguage(request);

    return response.languages.map((o) => { return o.languageCode }).includes("ko");

  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleCloud;
