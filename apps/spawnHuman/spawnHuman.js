const SpawnHuman = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);
  this.dir = process.cwd() + "/apps/spawnHuman";
  this.applicationName = "human";
  this.appDir = this.dir + "/" + this.applicationName;
}

SpawnHuman.prototype.spawnLaunching = async function (setupMode = false) {
  const instance = this;
  const { applicationName, appDir } = this;
  const { equalJson, shellExec, shellLink, fileSystem, uniqueValue } = this.mother;
  try {
    const homeFolder = process.env.HOME;
    const homeFolderList = await fileSystem("readFolder", [ homeFolder ]);
    const homeTarget = homeFolder + "/" + applicationName;
    const tempFolderName = "human_temp_python_folder_" + uniqueValue("hex");
    const tempFolderPath = homeFolder + "/" + tempFolderName;
    let moveTargets;
    let moveBoo;

    moveTargets = [
      "temp",
      "python_modules",
      ".git",
    ]

    await shellExec("mkdir", [ tempFolderPath ]);

    if (homeFolderList.includes(applicationName)) {
      for (let target of moveTargets) {
        await shellExec("mv", [ homeTarget + "/" + target, tempFolderPath + "/" ])
      }
      await shellExec("rm", [ "-rf", homeTarget ]);
      moveBoo = true;
    } else {
      moveBoo = false;
    }

    await shellExec("cp", [ "-r", appDir, homeTarget ]);

    if (moveBoo) {
      for (let target of moveTargets) {
        await shellExec("mv", [ tempFolderPath + "/" + target, homeTarget + "/" ]);
      }

      if (setupMode) {
        await shellExec("rm", [ "-rf", homeTarget + "/python_modules" ]);
        await shellExec(`cd ${shellLink(homeTarget)};python3 ./human.py;`);
      }

    } else {
      await shellExec("mkdir", [ homeTarget + "/temp" ]);
      await shellExec(`cd ${shellLink(homeTarget)};git init;`);
      await shellExec(`cd ${shellLink(homeTarget)};python3 ./human.py;`);
    }

    await shellExec("rm", [ "-rf", tempFolderPath ]);

    return true;

  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = SpawnHuman;
