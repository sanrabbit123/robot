const AiConsole = function () {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();
  this.back = new BackMaker();
  this.notion = new NotionAPIs();
  this.text = {};
  this.options = this.general.options;
  this.consoleSource = `${process.cwd()}/apps/dataConsole/router/source/svg`;
  this.links = this.general.links;
  this.links.svgTong = `${this.consoleSource}/svgTong`;
  this.links.writeMap = `${this.consoleSource}/writeMap`;
  this.links.map = `${this.consoleSource}/map`;
}

AiConsole.prototype.extractJson = async function (id) {
  const instance = this;
  try {
    const notionCard = await this.notion.getElementById(id, true);
    notionCard.original = (await this.back.getClientById(notionCard.cliid)).toNormal();
    return notionCard;
  } catch (e) {
    console.log(e);
  }
}

AiConsole.prototype.cardToAi = async function (id) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const { home_dir } = this.options;
  try {
    let tempDir;
    let json;
    let temp_scriptString;
    let sw = "notioncard";

    tempDir = await fileSystem(`readDir`, [ `${process.cwd()}/temp` ]);
    if (tempDir.includes(`tempNotionCard_${id}.json`)) {
      json = JSON.parse(await fileSystem("readString", [ `${process.cwd()}/temp/tempNotionCard_${id}.json`, JSON.stringify(json, null, 2) ]));
    } else {
      json = await this.extractJson(id);
      console.log(json);
      await fileSystem("write", [ `${process.cwd()}/temp/tempNotionCard_${id}.json`, JSON.stringify(json, null, 2) ]);
    }

    shell.exec(`mkdir ${shellLink(this.options.home_dir)}/result/${sw}`);

    this.options.script_dir = `${this.links.factory}/script/console_maker`;
    temp_scriptString = await this.general.generator.console_maker.exec(this.options, sw);
    await this.general.startAdobe({
      name: `cardToAi_${id}`,
      data: json,
      script: temp_scriptString,
      app: "Illustrator",
      end: false,
    });

    shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${sw}`);

  } catch (e) {
    console.log(e);
  }
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
