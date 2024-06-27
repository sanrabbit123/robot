const GoogleCloud = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.tokenDir = this.dir + "/python/google/tokens";
  this.iamSecrets = process.cwd() + "/temp/iam_secrets.json";
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

    const hex = `91e007520eb387eb42be0e118488daba8d200e311919099f9577c44baf4b79c972f9dc75825287e8a26de40d5c450587785ab48f4096d57e0310b377def4481497308512a915f7bd79c5caa6c6163b999f5183e2365572727f99c86e90e129f80d253dc1578aa9aa390f4eb20a7054b14cb64769bf7f7b1d7c7ed43d8f69d531691ece8e467bb1abfdce9437e252cb413e5b68cf6cbcc83c866b321bc86031c429d81c2f2b61c659b7eab8840ecb2b45ba7fe0a707ba60f24db22142bda41f8ca154b1501a4f72bb14f9608ea2dbdfcf2214b2d28479686e3de62c79cb23241c2f5b906212cd549c561ba64e5ffe66b817836e456e7e2f5bbe894eee462b4e5d2760978e91a8d96b3c3ffd7c773fb54e71087b1373b0abb2393c91a128a4c5f99a4d78469d16441db66cefe32714a3beca096b7e98e3b422697eae9dfd31db4eeecef4387ee5eba85643670835e51931e7efa10bc2aeaf39f9f1da59762506d93bfa587f91b224ab0ca521a8900144a9cf0df602c89b08cbdddb58f40386e12a125b8dacb40e6281014599d1b545e8a5253499beb158c88214dcd09617a5049a0a7b4e53b60703744aace1a84bb98ab60a1adc8537c931c180a10faa41f1dbbe65400105d9d495c232750dc9ca4f3769ad4fb05626f3ed9a6ef61bb74eae51705a40a18dca70958dcdd300746046b3df51c6d171460b5d6ff79ffe3f8c93143413cdc0f43477543b6752c72ac11e9d7e2369201a9a2345745e60659b4e851b2442c8811957602b3dbbc00a80353c875424bf8933fe1ba91527c04fda01eff39c1e1264d828511f92db0edb7b34f0737d48452814a6505dab6760c430173b51d1ba24a2b3c5a5d369aa2c5a0c0b57b8cdb1cf20015862e4c249334d57f12779237264df9bc6104b33cc5adba4d660ff95e328a3b19dde53701c01d10dd7736a04fd31502cbf1448341be9ab86ed6b7f21b3040927658bfbb0de8ce425a8b43e5ada9c7c81fd20c9fd6fdec689f060955285c64616de2bccda0c3723791bde33bc89359e7a6ef41a7754909d151f9adc0c3bf330eff40454b817e71dd9b98e4463ef43ad33d4981c953a3861a6488056a712f76840438aee095208e154e62da080c664876907f28b669abce976b2ed0b70e70453bceaf8c04c0da93ec8c4fba6c74600bd05ee320547d1a25bf79067539338f6ed26a02bc6545a7cf0ec4a89897c8962394c9c51477b4b5059612c2e5f9975fb3aa8204384ecbb3424c4f633e91ea8fd4e631c78145e4046c57f3102c0e9926594fd8d5fd4713d6cc606059332b7a9506094fda4649b2b5c7e50ecaed0d83444ab9ea478bdb3b23b9b33d4bf53637d88f3abf0f68ee548a7714f3f0b9570cb5d3228452f1293733d65df187f2b6bb72906961ee6c6d6bc245d7946262d1be597ff8a9e50df7c337444edb8e38a27312e56bbacf481383e50777b806a1dfd2bbf8eb92823bf6247007a7ef60c253ded2ccad82f440a8537a9e569f1d332abb033e291621b672254712218132093303210bb8edb74f5db4965a5f71cdaf190a488cb7afd512c34b22218cedd146531632c734d45f2d2f87723e0aa853cea787ac4dbc7cda034d07220cdef8dfef49304d74a1db490e2b14433a8a20b0d0977df4f5fb07d62e7a373f52ee46979c3598156d35b2ac2cc7864561ecf2eb041d74e9231371ca7f99d53de4dfb1bcd24b76f9886bc1712296d1d385d63e58a7ea644b6527e1b6534c58679a33677157c03988e38ca4253ca33f9bc2a75870ee8c021e265724cbb479aec31296d8bef03ff223f8ec9b353ea9995794ed59dc3fe44842f740a6466ea959abc2272aa0533babaea695b49186a9d9dc4f3db3033c1524d92c1e4c3649d574c11def62642c1412ef4694cfdf4ed1d9709dd285582d346d2863b2bbea6bdfa055a7e3ad4c01ac751705998970ebfcd815425981d186e9cda09aa83abe52e24f01dd55a93232ab9b2c43f18edae531fefaf3479385ec8f439e0b6009d282f5cfe1e17f8dfac08324cb7eb9236820496392196f248e66d3b1c0f4b0acff6012bfd11771849e173881c13b7aad9db18c68c38cb4c20f0aafc203ba818783f1e788fb4faec44b0af3cb80f8266b92e96778d907377e167dfb02aa73a3573561974cb07b717e889aa4a8f4700c589113e2394bf8c2b5e0d5e0370f696f2fd70e7d58fb38990ab5a448b97a2a2cec1af89ae74bc0f4bf70fbde25022a9ce30a1baa14adf9a0d166dcce2339d0e039bbbe7e859287ab2792b0ab5dfdb71a6ad03053574fe1a92bbc2d228b77bd862c9a1664c73e119277fe293bc41fb8f69dcdee2eb25c72a9af1ea549fe930ac68208398b45c54a364486b1656fffb4ee9c1098a7c180ef1c792ca336156135bd40ab395f5342c2360e5b29ceadf86f3bf97e174b944f10f1a43e88e2f21584cca5a4e90076f965a4a10c7a8e155db51e8f5a770e0d1514a1e0524704b3acf4371ea9e9fb7db91238ee445a4aa3f1793477374d0b61d7234728e5c94dc8ac97f72a24ccdd65b9ed05c927ff30f6d2673f9e7e12c364224223b161d1e1b5682043e6d5e0f60700591c1aacc809cde103a33f11ab8b970da08e294c63e34334738abd75093f2225529e54b0cfe48a3d54af3ecbcbb43d008b7b5e80d328b4a33d3e04fd15422257c09a3a7e9472d432398aa5f1e38e27a92fc39169f33e8f1f0f2671bb2dcd936913bad18fb094515738a8c00a85daa5db919a108b4ec409c14462233687e2d44060435b1e5b0f4067642a9dd95b0d24951433776432339d9366f0a604e72ff6d7621592baf57e7a6638bb606c211c044e5fd4deca12713e1740ffe511a312e5efebe0d4316fa484df18ec2483bcd78184c744ee977b1a800002b7275509f2c8921feb739b1b09325dcf1a01104d4ffb29b7a623692529d4c42332c820f6266871d9323014e169d02d6d0b88feaf3f2b53d4c38de2531c49e5d87f12ad8e74b83274f4b26d667e943f1980ff9704b012a5264997ee6bd15cc707d1c095fa3854aef21c842e258ca171649b73cc162f92f906fbad6df78a43fd844e8a42c4fe9efa9a239136bd4a935bce747803fdc5f359f13522ce2e9a2f902294a165b603630c69266edf76eda8f5a43dc62b4e890678a6acfa7a512e101a4f1e38f2a2f0a66dbd9e499d77e405a3233fbf30f90d7cd2cf48403a2a9855cf63406d10efb2b8252fbc787fbae24f8316645f8e5fe5a10e83903deeaad77b75f1b93811f4514a1943d7bbe9ef5913f9d0be41f2fc7deffa6c77dc8c2d14dc3c1ec6ee3e6db0bd0b7596d2ed9a96974d16642e2d7206de6c0570529687c5a025ffb07c8a12a167b1affa1e82b2d61e16bb55e944b3a7164c36d64c1c41885`;
    const jsonString = (await decryptoHash("homeliaison", hex)).replace(/\n/gi, "\\n").replace(/,\\n/gi, ",").replace(/\\n[ ]*\}/, "}").replace(/\{\\n/, "{");
    await fileSystem(`writeString`, [ iamSecrets, jsonString ]);
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
