const ImmovablesServer = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/immovablesServer";
  this.jsonDir = this.dir + "/json";
  this.pythonApp = this.dir + "/python/app.py";
  this.serveFolderName = "immovablesServerStaticFolder";
}

ImmovablesServer.prototype.getAllImmovables = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    //static setting
    const home = process.env.HOME;
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const tempFolderName = "immovablesServerTempFolder";
    const targetPath = home + "/" + tempFolderName;
    if (homeDir.includes(tempFolderName)) {
      shell.exec(`rm -rf ${shellLink(targetPath)}`);
    }
    if (!homeDir.includes(this.serveFolderName)) {
      shell.exec(`mkdir ${shellLink(home)}/${this.serveFolderName}`);
    }
    shell.exec(`mkdir ${shellLink(targetPath)}`);

    //date matrix setting
    const dateMatrix = [
      [ "202009" ]
    ];
    let dateMatrix_flat = [];
    for (let i of dateMatrix) {
      for (let j of i) {
        dateMatrix_flat.push(j);
      }
    }
    const serveFolderDir = await fileSystem(`readDir`, [ home + "/" + this.serveFolderName ]);
    for (let i of dateMatrix_flat) {
      shell.exec(`mkdir ${shellLink(targetPath)}/d${i}`);
      if (!serveFolderDir.includes(`d${i}`)) {
        shell.exec(`mkdir ${shellLink(home)}/${this.serveFolderName}/d${i}`);
      }
    }

    await this.mother.pythonExecute(this.pythonApp, [ "getAll" ], { dateMatrix, targetPath });

    let fileListRAW_P, fileListRAW, fileList;
    let arr;
    let filter;
    let result;
    let temp;
    let totalTong;
    let dateName;

    fileListRAW_P = await fileSystem(`readDir`, [ targetPath ]);

    for (let p of fileListRAW_P) {
      if (p !== `.DS_Store`) {

        fileListRAW = await fileSystem(`readDir`, [ targetPath + "/" + p ]);
        fileList = [];
        for (let i of fileListRAW) {
          if (i !== `.DS_Store`) {
            fileList.push(i);
          }
        }

        for (let i = 0; i < fileList.length; i++) {
          dateName = ((fileList[i].split("_"))[fileList[i].split("_").length - 1]).replace(/\.json$/, '');

          arr = JSON.parse(await fileSystem(`readString`, [ targetPath + "/d" + dateName + "/" + fileList[i] ]));
          totalTong = [];
          for (let i of arr) {
            filter = [];
            result = [];
            for (let j of i.replace(/\&lt/g, '').replace(/\&gt/g, '').split(";")) {
              if (/\!--/g.test(j)) {
                filter.push(j);
              }
            }
            for (let i of filter) {
              temp = i.split("<!--");
              result.push({ subject: temp[1].replace(/--\>/g, '').replace(/\<[^\>]+\>/g, ''), value: temp[0].trim().replace(/ /g, '') });
            }
            totalTong.push(result);
          }
          await fileSystem(`write`, [ (home + "/" + this.serveFolderName + "/d" + dateName + "/" + fileList[i]), JSON.stringify(totalTong, null, 2) ]);
        }

      }
    }
    shell.exec(`rm -rf ${shellLink(targetPath)}`);

    return "done";

  } catch (e) {
    console.log(e);
  }
}

ImmovablesServer.prototype.launching = async function (cliid = "latest") {
  const instance = this;
  try {

    console.log(await this.getAllImmovables());

  } catch (e) {
    console.log(e);
  }
}

module.exports = ImmovablesServer;
