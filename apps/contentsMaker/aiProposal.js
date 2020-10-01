const AiProposal = function (proid = "none") {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();

  this.text = {};
  this.proid = proid;

  this.options = this.general.options;
  this.options.static_dir = this.general.motherLink.proposalBinary;
}

AiProposal.prototype.proposal_make = async function () {
  const instance = this;
  const { shell, shellLink, fileSystem, babelSystem } = this.mother;
  const { home_dir } = this.general.options;
  let temp_scriptString, result_dir;
  try {
    temp_scriptString = `var text = ${JSON.stringify(this.text, null, 2)};\n`;
    temp_scriptString += await fileSystem(`readString`, [ `${home_dir}/factory/script/polyfill.js` ]);
    temp_scriptString += `\n`;
    temp_scriptString += await babelSystem(this.general.generator.proposal_maker.proposal(this.options));

    await fileSystem(`write`, [ `${home_dir}/script/proposal.js`, temp_scriptString ]);

    result_dir = await fileSystem(`readDir`, [ `${home_dir}/result` ]);
    for (let i of result_dir) { if (i !== ".DS_Store") {
      shell.exec(`rm -rf ${shellLink(home_dir)}/result/${i};`);
    }}
    shell.exec(`osascript ${shellLink(home_dir)}/factory/applescript/start_adobe.scpt proposal`);
    // shell.exec(`osascript ${shellLink(home_dir)}/factory/applescript/return_terminal.scpt`);

  } catch (e) {
    console.log(e);
  }
}

AiProposal.prototype.proposal_launching = async function () {
  const instance = this;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await this.general.static_setting();

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
    await this.proposal_make();

    const gd = this.mother.googleSystem("drive");
    let gres, resultDir;
    resultDir = await this.mother.fileSystem("readDir", [ this.options.home_dir + "/result" ]);
    for (let i of resultDir) { if (!/^\.DS_Store/g.test(i)) {
      gres = await gd.upload_andView("1ofHfJmGJJ6TCk5qP_VttNvIvHt2IVZ21", this.options.home_dir + "/result/" + i);
    }}
    await this.mother.slack_bot.chat.postMessage({ text: `${this.text.client} 고객님의 제안서가 완료되었습니다! 확인부탁드립니다! : ${gres}`, channel: `#403_proposal` });
    await MONGOC.db("miro81").collection(`Project`).updateOne({ proid: this.text.proid }, { $set: { status: "발송 대기" } });
    console.log(`done`);
  } catch (e) {
    console.log(e);
  } finally {
    MONGOC.close();
    process.exit();
  }
}

module.exports = AiProposal;
