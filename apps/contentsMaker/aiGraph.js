const AiGraph = function () {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();

  this.text = {};
  this.options = this.general.options;
  this.links = this.general.links;
}

AiGraph.prototype.parsingValues = async function () {
  try {
    const lambdaFunc = require(this.links.lambda + "/graph_maker/" + (await this.general.lambdaLatest("graph_maker")));
    const res = await lambdaFunc(this.mother);
    return res;
  } catch (e) {
    console.log(e);
  }
}

AiGraph.prototype.launching = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    let temp_scriptString;
    await this.general.static_setting();

    //delete result folder
    const resDir = await fileSystem(`readDir`, [ this.options.home_dir + "/result" ]);
    for (let i of resDir) {
      shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${i}`);
    }

    //init setting
    this.options.script_dir = `${this.links.factory}/script/graph_maker`;

    //set text
    this.text = await this.parsingValues();

    console.log(this.text);

    /*

    //start aiScript
    temp_scriptString = await this.general.generator.graph_maker.exec(this.options);
    await this.general.startAdobe({
      name: `graph_maker`,
      data: this.text,
      script: temp_scriptString,
      app: "Illustrator",
      end: true,
    });

    */

  } catch (e) {
    console.log(e);
  } finally {
    console.log(`done`);
  }
}


module.exports = AiGraph;
