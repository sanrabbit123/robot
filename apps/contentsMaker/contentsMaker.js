const ContentsMaker = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();

  this.motherLink = {
    mainBinary: `${this.mother.returnUragenPath()}/_NewWeb/poo`,
    webPath: `${this.mother.returnUragenPath()}/_NewWeb`,
    proposalBinary: `${process.env.HOME}/static`,
  };

  this.options = {
    os_home_dir: process.env.HOME,
    home_dir: `${process.env.HOME}/contentsMaker`,
    resource_dir: `${process.env.HOME}/contentsMaker/resource`,
    photo_dir: `${process.env.HOME}/contentsMaker/resource/photo`,
    result_dir: `${process.env.HOME}/contentsMaker/result`,
    fileSystem: this.mother.fileSystem,
    dayString: (this.mother.todayMaker()),
    etc: {},
  };

  this.links = {
    app: `${process.cwd()}/apps/contentsMaker`,
    factory: `${process.cwd()}/apps/contentsMaker/factory`,
    lambda: `${process.cwd()}/apps/contentsMaker/lambda`,
    mapMaker: `${process.cwd()}/apps/mapMaker`,
    map: `${process.cwd()}/apps/mapMaker/map`,
    svgTong: `${process.cwd()}/apps/mapMaker/map/svgTong`,
  };

  this.generator = require(`${this.links.app}/factory/generator.js`);

  this.dir = `${process.cwd()}/apps/contentsMaker`;
  this.factory = `${this.dir}/factory`;
}

ContentsMaker.prototype.startAdobe = async function (obj) {
  const instance = this;
  const { fileSystem, appleScript } = this.mother;
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
  if (obj.app === undefined || /Illustrator/gi.test(obj.app)) {
    obj.app = `Adobe Illustrator`;
  }
  try {
    let adobe, tempAppList;
    let targetJs, appleScriptText;
    let temp_scriptString, endScript;
    let output;

    tempAppList = await fileSystem(`readDir`, [ `/Applications` ]);
    adobe = `Adobe Illustrator`;
    if (/photo/gi.test(obj.app)) {
      for (let i of tempAppList) {
        if (/Photoshop/gi.test(i)) {
          adobe = i;
        }
      }
    }

    targetJs = `${this.options.home_dir}/script/${obj.name}.js`;
    appleScriptText = `tell application "${adobe}"`;
    appleScriptText += `\n`;
    appleScriptText += `\twith timeout of 4000 seconds`;
    appleScriptText += `\n`;
    appleScriptText += `\t\tactivate`;
    appleScriptText += `\n`;
    appleScriptText += `\t\tdo javascript "#include ${targetJs}"`;
    appleScriptText += `\n`;
    appleScriptText += `\tend timeout`;
    appleScriptText += `\n`;
    appleScriptText += `end tell`;

    temp_scriptString = '';
    temp_scriptString += `var SAFEAPPLESCRIPTUNICODEINITIALWORD = "유니코드 안전망"`;
    temp_scriptString += `\n`;
    temp_scriptString += `try {\n`;
    temp_scriptString += `var text = ${JSON.stringify(obj.data, null, 2)};\n`;
    temp_scriptString += await fileSystem(`readString`, [ `${this.factory}/script/polyfill.js` ]);
    temp_scriptString += `\n`;
    temp_scriptString += obj.script;
    temp_scriptString += `} catch (e) { e; }`;

    await fileSystem(`write`, [ targetJs, temp_scriptString ]);
    output = await appleScript(obj.name, appleScriptText, `${this.options.home_dir}/temp`, boo, true);
    if (!boo) {
      endScript = `tell application "${adobe}"`;
      endScript += `\n`;
      endScript += `\tquit`;
      endScript += `\n`;
      endScript += `end tell`;
      await appleScript(`${obj.name}_end`, endScript, `${this.options.home_dir}/temp`, boo2, true);
    }

    if (obj.silent !== true) {
      console.log(output);
    }
    return output;

  } catch (e) {
    console.log(e);
  }
}

ContentsMaker.prototype.static_setting = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    let staticFolderBoo, staticFolderBootr;
    let staticFolderscriptBoo, staticFolderscriptBootr, staticFolderresultBootr, staticFoldertempBootr;
    let order;

    staticFolderBoo = await fileSystem(`readDir`, [ process.env.HOME ]);
    staticFolderBootr = false;
    for (let i of staticFolderBoo) {
      if (/^contentsMaker/.test(i)) { staticFolderBootr = true; }
    }

    if (!staticFolderBootr) {

      order = `mkdir ${shellLink(this.options.home_dir)};`;
      order += `mkdir ${shellLink(this.options.home_dir)}/script;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/result;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/temp;`;
      shell.exec(order);

    } else {

      staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);
      staticFolderscriptBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^script$/.test(i)) { staticFolderscriptBootr = true; }
      }
      if (!staticFolderscriptBootr) { shell.exec(`mkdir ${shellLink(this.options.home_dir)}/script`); }
      staticFolderresultBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^result$/.test(i)) { staticFolderresultBootr = true; }
      }
      if (!staticFolderresultBootr) { shell.exec(`mkdir ${shellLink(this.options.home_dir)}/result`); }
      staticFoldertempBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^temp/.test(i)) { staticFoldertempBootr = true; }
      }
      if (!staticFoldertempBootr) { shell.exec(`mkdir ${shellLink(this.options.home_dir)}/temp`); }

    }

    let folderList = [ "factory", "resource" ];
    for (let f of folderList) {
      shell.exec(`cp -r ${shellLink(this.links.app)}/${f} ${shellLink(this.options.home_dir)}`);
    }

    let resourceFolderBoo, resourceFolderBootr;

    resourceFolderBoo = await fileSystem(`readDir`, [ this.options.home_dir + "/resource" ]);
    resourceFolderBootr = false;
    for (let i of resourceFolderBoo) {
      if (/^photo/.test(i)) { resourceFolderBootr = true; }
    }
    if (!resourceFolderBootr) {
      shell.exec(`mkdir ${shellLink(this.options.home_dir)}/resource/photo`);
    }

  } catch (e) {
    console.log(e.message);
  }
}

ContentsMaker.prototype.lambdaLatest = async function (target) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let lambdaList_raw, lambdaList_number, final_target;

    lambdaList_raw = await fileSystem(`readDir`, [ this.links.lambda + "/" + target ]);
    lambdaList_number = [];
    for (let i of lambdaList_raw) { if (i !== `.DS_Store`) {
      lambdaList_number.push(Number((i.split('_'))[0]));
    }}
    lambdaList_number.sort((a, b) => { return b - a; });

    for (let i of lambdaList_raw) { if (i !== `.DS_Store`) {
      if ((new RegExp("^" + String(lambdaList_number[0]))).test(i)) {
        final_target = i;
      }
    }}

    return final_target;
  } catch (e) {
    console.log(e);
  }
}

ContentsMaker.prototype.getTextFromAi = async function (fileFullPath) {
  const instance = this;
  const { fileSystem, appleScript, todayMaker } = this.mother;
  const orderFunc = `
  var targets = app.activeDocument.textFrames;
  var arr = [];
  for (var i = 0; i < targets.length; i++) { arr.push({ dom: targets[i], top: targets[i].top }); }
  arr.sort(function (a, b) { return b.top - a.top });
  for (var i = 0; i < arr.length; i++) { arr[i].dom.zOrder(ZOrderMethod.SENDTOBACK); }`;
  try {
    let getTextScript;
    let response, responseArr;
    let name, orderFuncName;

    orderFuncName = "getTextFromAiJavascriptTempFile.js";
    await fileSystem(`write`, [ process.env.HOME + "/" + orderFuncName, orderFunc ]);
    name = fileFullPath.split('/').pop().replace(/\.ai$/, '');

    getTextScript = `tell application "Adobe Illustrator"\n`;
    getTextScript += `\tactivate\n`;
    getTextScript += `\topen POSIX file "${fileFullPath}" without dialogs\n`;
    getTextScript += `\tdo javascript "#include ~/${orderFuncName}"\n`;
    getTextScript += `\tset textArtItemCount to count text frames in document 1\n`;
    getTextScript += `\tset finalResult to ""\n`;
    getTextScript += `\trepeat with x from 1 to textArtItemCount\n`;
    getTextScript += `\t\tset target to text frame x of document 1\n`;
    getTextScript += `\t\tset finalResult to finalResult & "_____split_____" & the contents of target\n`;
    getTextScript += `\tend repeat\n`;
    getTextScript += `\tclose current document saving no\n`;
    getTextScript += `\treturn finalResult\n`;
    getTextScript += `end tell`;
    response = await appleScript(name, getTextScript, null, true, true);
    responseArr = response.replace(/\n$/, '').replace(/\r/g, "\n").split("_____split_____");
    responseArr.shift();

    return responseArr;
  } catch (e) {
    console.log(e);
  }
}

ContentsMaker.prototype.generalLaunching = async function (file, mainName = "$_$") {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    if (mainName === "console" || mainName === "$" || mainName === "_") {
      mainName = "$_$";
    }
    let fileString, scriptString, options, resultList;

    await this.static_setting();

    options = { ...this.options };
    options.etc.template = this.options.home_dir + "/factory/template";
    fileString = await fileSystem(`readString`, [ file ]);
    scriptString = await this.generator.general_maker.exec(options, `ExecMain.prototype.start = function (dayString) {
      for (let func in Mother.prototype) {
        this[func] = this.mother[func];
      }
      this.open = function () {
        let orders = [ ...arguments ];
        let fileObj = arguments[0];
        let result;
        if (typeof fileObj === "string") {
          result = app.open(new File(fileObj));
        } else {
          result = app.open(...orders);
        }
        return result;
      };
      this.doScript = function () {
        let orders = [ ...arguments ];
        let result;
        if (orders.length === 0) {
          orders = [ "expandall", "contents_maker" ];
        }
        result = app.doScript(...orders);
        return result;
      };
      this.expandAll = this.doScript;
      this.activeDocument = function () {
        return app.activeDocument;
      };
      const console = this;
      const $ = this;
      const _ = this;
      const ${mainName} = this;
      this.dayString = dayString;
      ${fileString}
    };`);
    await this.startAdobe({
      name: `tempAi_launching`,
      data: {},
      script: scriptString,
      app: "Illustrator",
      end: false,
    });

    resultList = await fileSystem(`readDir`, [ this.options.result_dir ]);

    return { resultFolder: this.options.result_dir, resultList };

  } catch (e) {
    console.log(e);
  }
}

module.exports = ContentsMaker;
