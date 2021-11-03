const AiConsole = function () {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();
  this.back = new BackMaker();
  this.text = {};
  this.options = this.general.options;
  this.options.dayString = this.mother.todayMaker("year");
  this.consoleSource = `${process.cwd()}/apps/dataConsole/router/source/svg`;
  this.links = this.general.links;
  this.links.svgTong = `${this.consoleSource}/svgTong`;
  this.links.writeMap = `${this.consoleSource}/writeMap`;
  this.links.map = `${this.consoleSource}/map`;
}

AiConsole.prototype.cardToRequest = async function (cliid) {
  const instance = this;
  const { fileSystem, shell, shellLink, messageSend } = this.mother;
  const { home_dir } = this.options;
  try {
    const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
    const gDrive = new GoogleDrive();
    const folderId = "1yFU5RpFklRAqSwQDnVOL61IKFY7Y9Voa";
    let resultDir;
    let resultDirSw;
    let temp_scriptString;
    let sw = "stylingrequest";
    let client;
    let projects, project;
    let resultLink;

    await this.general.static_setting();

    clientOriginal = await this.back.getClientById(cliid);
    if (clientOriginal === null) {
      return { "alert": "확인되는 고객이 없습니다!" };
    }
    client = clientOriginal.toNormal();
    projects = await this.back.getProjectsByQuery({ cliid });
    project = null;
    for (let p of projects) {
      if (p.desid !== '') {
        project = p;
        break;
      }
    }
    if (project === null) {
      return { "alert": "확인되는 프로젝트가 없습니다!" };
    }
    if (project.process.contract.meeting.date.getFullYear() < 1900) {
      return { "alert": "현장 미팅에 대한 정보가 없습니다!" };
    }

    client.project = project.toNormal();
    client.designer = (await this.back.getDesignerById(project.desid)).toNormal();
    client.history = await this.back.getHistoryById("client", cliid, { fromConsole: true });

    resultDir = await fileSystem(`readDir`, [ `${this.options.home_dir}/result` ]);
    if (!resultDir.includes(sw)) {
      shell.exec(`mkdir ${shellLink(this.options.home_dir)}/result/${sw}`);
    } else {
      resultDirSw = await fileSystem(`readDir`, [ `${this.options.home_dir}/result/${sw}` ]);
      for (let i of resultDirSw) {
        shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${sw}/${i}`);
      }
    }

    this.options.script_dir = `${this.links.factory}/script/console_maker`;
    temp_scriptString = await this.general.generator.console_maker.exec(this.options, sw);
    await this.general.startAdobe({
      name: "homestylingRequestFrom" + cliid + "To" + project.desid,
      data: client,
      script: temp_scriptString,
      app: "Illustrator",
      end: false,
    });

    resultDir = await this.mother.fileSystem("readDir", [ this.options.home_dir + "/result/" + sw ]);
    for (let i of resultDir) { if (i !== `.DS_Store`) {
      resultLink = await gDrive.upload_andView(folderId, this.options.home_dir + "/result/" + sw + "/" + i);
    }}

    await messageSend({ text: `${client.designer.designer} 실장님께 보낼, ${client.name} 고객님 홈스타일링 의뢰서가 완료되었습니다! 확인부탁드립니다! : ${resultLink}`, channel: `#300_designer` });

    shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${sw}`);

    return { "alert": "의뢰서가 제작되었습니다!", "link": resultLink };

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

    const mapDir = await fileSystem(`readDir`, [ this.links.map ]);
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
