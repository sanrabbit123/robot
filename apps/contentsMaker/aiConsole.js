const AiConsole = function () {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();
  this.text = {};
  this.options = this.general.options;
  this.consoleSource = `${process.cwd()}/apps/dataConsole/router/source/svg`;
  this.links = this.general.links;
  this.links.svgTong = `${this.consoleSource}/svgTong`;
  this.links.writeMap = `${this.consoleSource}/writeMap`;
  this.links.map = `${this.consoleSource}/map`;
}

AiConsole.prototype.renderSvgPng = async function (sw) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const { home_dir } = this.options;
  try {
    let mapMaker, temp_scriptString;
    const MapMaker = require(`${this.links.mapMaker}/mapMaker.js`);
    mapMaker = new MapMaker(sw);
    shell.exec(`mkdir ${shellLink(home_dir)}/result/${sw}`);

    //get map object
    this.text = require(`${this.links.map}/${sw}`);

    //start aiScript
    temp_scriptString = await this.general.generator.console_maker.exec(this.options, sw);
    await this.general.startAdobe({
      name: `console_${sw}`,
      data: this.text,
      script: temp_scriptString,
      app: "Illustrator",
      end: false,
    });

    await mapMaker.writeMap_makeTong({
      writeMap: `${this.links.writeMap}/${sw}.js`,
      map: `${this.links.map}/${sw}.js`,
      svgTong: `${this.links.svgTong}/${sw}.js`,
    });

    shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${sw}`);

  } catch (e) {
    console.log(e);
  }
}

AiConsole.prototype.console_maker = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    await this.general.static_setting();

    //delete result folder
    const resDir = await fileSystem(`readDir`, [ this.options.home_dir + "/result" ]);
    for (let i of resDir) {
      shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${i}`);
    }

    //init setting
    this.options.script_dir = `${this.links.factory}/script/console_maker`;

    const mapDir = await fileSystem("readDir", [ this.links.map ]);
    for (let i of mapDir) {
      if (i !== `.DS_Store`) {
        await this.renderSvgPng(i.replace(/\.js$/i, ''));
      }
    }

  } catch (e) {
    console.log(e);
  } finally {
    console.log(`done`);
    process.exit();
  }
}

module.exports = AiConsole;
