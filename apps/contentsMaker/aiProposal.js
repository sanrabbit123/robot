const AiProposal = function (proid = "none") {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();
  this.text = {};
  this.proid = proid;
  this.options = this.general.options;
  this.options.static_dir = `${this.options.home_dir}/result/static`;
  this.operationStacks = [];
}

AiProposal.prototype.saveStatic = async function (path) {
  const instance = this;
  const { shell, shellLink, fileSystem, binaryRequest } = this.mother;
  try {
    let targetHost, targetPath, targetName;
    let tempArr, tempArr2, tempObject, tempString;

    tempArr = path.split('/');
    targetHost = tempArr.shift();
    targetPath = '/' + tempArr.join('/');
    targetName = tempArr.pop();

    tempArr2 = [];
    for (let i = 0; i < tempArr.length; i++) {
      tempArr2.push(tempArr[i]);
      tempString = `${shellLink(this.options.static_dir)}/${tempArr2.join('/')}`;
      if (this.operationStacks.indexOf(tempString) === -1) {
        shell.exec(`mkdir ${tempString}`);
      }
      this.operationStacks.push(tempString);
    }

    tempObject = await binaryRequest(path);
    await fileSystem(`writeBinary`, [ this.options.static_dir + targetPath, tempObject ]);

  } catch (e) {
    console.log(e);
  }
}

AiProposal.prototype.proposalLaunching = async function () {
  const instance = this;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const http = require('http');
  const { shell, shellLink, fileSystem, binaryRequest } = this.mother;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await this.general.static_setting();

    let result_dir;
    result_dir = await fileSystem(`readDir`, [ `${this.options.home_dir}/result` ]);
    for (let i of result_dir) { if (i !== ".DS_Store") {
      shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${i};`);
    }}
    shell.exec(`mkdir ${shellLink(this.options.static_dir)};`);

    let text_raw;
    if (this.proid !== "none") {
      text_raw = await MONGOC.db(`miro81`).collection(`Project`).find({ proid: this.proid }).toArray();
    } else {
      text_raw = await MONGOC.db(`miro81`).collection(`Project`).find({}).toArray();
    }
    text_raw.sort(function (a,b) {
      return Number(b.proid.replace(/[^0-9]/g, '')) - Number(a.proid.replace(/[^0-9]/g, ''));
    })
    this.text = text_raw[0];

    let tempObject;
    for (let j = 0; j < this.text.proposal.length; j++) {
      for (let i = 0; i < this.text.proposal[j].picture_settings.length - 1; i++) {
        await this.saveStatic(ADDRESS.consoleinfo.host + this.text.proposal[j].picture_settings[i].imgSrc);
      }
    }

    let temp_scriptString = this.general.generator.proposal_maker.proposal(this.options);
    await this.general.startAdobe({
      name: `proposal`,
      data: this.text,
      script: temp_scriptString,
      app: `Illustrator`,
      end: false,
    });

    const gd = this.mother.googleSystem("drive");
    let gres, resultDir;
    resultDir = await this.mother.fileSystem("readDir", [ this.options.home_dir + "/result" ]);
    for (let i of resultDir) { if (i !== `.DS_Store` && i !== `static`) {
      gres = await gd.upload_andView("1ofHfJmGJJ6TCk5qP_VttNvIvHt2IVZ21", this.options.home_dir + "/result/" + i);
    }}
    await this.mother.slack_bot.chat.postMessage({ text: `${this.text.client} 고객님의 제안서가 완료되었습니다! 확인부탁드립니다! : ${gres}`, channel: `#403_proposal` });
    await MONGOC.db("miro81").collection(`Project`).updateOne({ proid: this.text.proid }, { $set: { status: "발송 대기" } });
    console.log(`done`);

  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
  }
}

module.exports = AiProposal;
