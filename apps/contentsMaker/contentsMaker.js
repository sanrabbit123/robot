const ContentsMaker = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();

  this.motherLink = {
    mainBinary: `${this.mother.returnUragenPath()}/_NewWeb/poo`,
    webPath: `${this.mother.returnUragenPath()}/_NewWeb`,
    portfoiloBinary: `${this.mother.returnUragenPath()}/_Portfolio`,
    proposalBinary: `${process.env.HOME}/static`,
  };

  this.options = {
    os_home_dir: process.env.HOME,
    home_dir: `${process.env.HOME}/contentsMaker`,
    photo_dir: `${process.env.HOME}/contentsMaker/resource/photo`,
    fileSystem: this.mother.fileSystem,
    dayString: (this.mother.todayMaker()),
  };

  this.links = {
    app: `${process.cwd()}/apps/contentsMaker`,
    factory: `${process.cwd()}/apps/contentsMaker/factory`,
    mapMaker: `${process.cwd()}/apps/mapMaker`,
    map: `${process.cwd()}/apps/mapMaker/map`,
    svgTong: `${process.cwd()}/apps/mapMaker/map/svgTong`,
  };

  this.generator = require(`${this.links.app}/factory/generator.js`);

}

ContentsMaker.prototype.startAdobe = async function (obj) {
  try {
    if (obj.app === undefined) {
      obj.app = `Adobe Illustrator`;
    }
    let adobe = `Adobe Illustrator`;
    if (/photo/gi.test(obj.app)) {
      adobe = `Adobe Photoshop 2020`;
    }
    let targetJs = `${this.options.home_dir}/script/${obj.name}.js`;
    let appleScript = `tell application "${adobe}"`;
    appleScript += `\n`;
    appleScript += `\twith timeout of 3000 seconds`;
    appleScript += `\n`;
    appleScript += `\t\tactivate`;
    appleScript += `\n`;
    appleScript += `\t\tdo javascript "#include ${targetJs}"`;
    appleScript += `\n`;
    appleScript += `\tend timeout`;
    appleScript += `\n`;
    appleScript += `end tell`;

    let temp_scriptString = `var text = ${JSON.stringify(obj.data, null, 2)};\n`;
    temp_scriptString += await this.mother.fileSystem(`readString`, [ `${this.options.home_dir}/factory/script/polyfill.js` ]);
    temp_scriptString += `\n`;
    temp_scriptString += await this.mother.babelSystem(obj.script);

    await this.mother.fileSystem(`write`, [ targetJs, temp_scriptString ]);
    let boo, boo2;
    if (obj.end === undefined && obj.noclean === undefined) {
      boo = false;
      boo2 = true;
    } else if (obj.end === true && obj.noclean === undefined) {
      boo = false;
      boo2 = true;
    } else if (obj.end === false && obj.noclean === undefined) {
      boo = true;
      boo2 = true;
    } else if (obj.end === undefined && obj.noclean === true) {
      boo = false;
      boo2 = false;
    } else if (obj.end === undefined && obj.noclean === false) {
      boo = false;
      boo2 = true;
    } else if (obj.end !== undefined && obj.noclean !== undefined) {
      boo = !obj.end;
      boo2 = !obj.noclean;
    }
    await this.mother.appleScript(obj.name, appleScript, `${this.options.home_dir}/temp`, boo);
    if (!boo) {
      let endScript = `tell application "${adobe}"`;
      endScript += `\n`;
      endScript += `\tquit`;
      endScript += `\n`;
      endScript += `end tell`;
      await this.mother.appleScript(`${obj.name}_end`, endScript, `${this.options.home_dir}/temp`, boo2);
    }

  } catch (e) {
    console.log(e);
  } finally {
    console.log(`appleScript done`);
  }
}

ContentsMaker.prototype.static_setting = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    let staticFolderBoo, staticFolderBootr;
    let staticFolderscriptBoo, staticFolderscriptBootr, staticFolderresultBootr, staticFoldertempBootr;

    staticFolderBoo = await fileSystem(`readDir`, [ process.env.HOME ]);
    staticFolderBootr = false;
    for (let i of staticFolderBoo) {
      if (/^contentsMaker/.test(i)) { staticFolderBootr = true; }
    }

    if (!staticFolderBootr) {

      shell.exec(`mkdir ${this.options.home_dir};mkdir ${this.options.home_dir}/script;mkdir ${this.options.home_dir}/result;mkdir ${this.options.home_dir}/temp`);

    } else {

      staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);
      staticFolderscriptBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^script$/.test(i)) { staticFolderscriptBootr = true; }
      }
      if (!staticFolderscriptBootr) { shell.exec(`mkdir ${this.options.home_dir}/script`); }
      staticFolderresultBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^result$/.test(i)) { staticFolderresultBootr = true; }
      }
      if (!staticFolderresultBootr) { shell.exec(`mkdir ${this.options.home_dir}/result`); }
      staticFoldertempBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^temp/.test(i)) { staticFoldertempBootr = true; }
      }
      if (!staticFoldertempBootr) { shell.exec(`mkdir ${this.options.home_dir}/temp`); }

    }

    let folderList = [ "factory", "resource" ];
    for (let f of folderList) {
      shell.exec(`cp -r ${shellLink(this.links.app)}/${f} ${this.options.home_dir}`);
    }

  } catch (e) {
    console.log(e.message);
  }
}

module.exports = ContentsMaker;
