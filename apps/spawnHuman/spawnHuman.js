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

SpawnHuman.prototype.spawnLaunching = async function (serverName = "constructLounge", setupMode = false) {
  const instance = this;
  const address = this.address;
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
    let infoArr;
    let intend;
    let infoPythonScript;
    let startPointPython;
    let startScript;

    moveTargets = [
      "temp",
      "python_modules",
      ".git",
    ];
    intend = "    ";

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
        await shellExec(`cd ${shellLink(homeTarget)};python3 ./setup.py;`);
      }

    } else {
      await shellExec("mkdir", [ homeTarget + "/temp" ]);
      await shellExec(`cd ${shellLink(homeTarget)};git init;`);
      await shellExec(`cd ${shellLink(homeTarget)};python3 ./setup.py;`);
    }

    await shellExec("rm", [ "-rf", tempFolderPath ]);

    infoArr = JSON.stringify(address, null, 2).split("\n")
    infoArr = infoArr.map((str) => { return intend + str })
    infoArr[0] = intend + "infoAddress = {";
    infoArr.unshift("def returnAddress():")
    infoArr.push(intend + "return infoAddress");
    infoPythonScript = infoArr.join("\n").replace(/\"\: null/gi, "\": None").replace(/\"\: true/gi, "\": True").replace(/\"\: false/gi, "\": False");

    await fileSystem("write", [ homeTarget + "/apps/infoObj.py", infoPythonScript ]);
    await shellExec("cp", [ "-r", process.cwd() + "/pems", homeTarget ]);

    if (serverName === "constructLounge") {
      startPointPython = await fileSystem("readString", [ appDir + "/human.py" ]);
      startPointPython += "\n";
      startPointPython += "from apps.constructLounge.constructLounge import ConstructLounge";
      startPointPython += "\n";
      startPointPython += "\n";
      startPointPython += "server = ConstructLounge()";
      startPointPython += "\n";
      startPointPython += "app = server.returnApp()";
      startPointPython += "\n";
      await fileSystem("write", [ homeTarget + "/human.py", startPointPython ]);
  
      startScript = `#!/bin/bash\nhypercorn human:app -b 0.0.0.0:8000 -w 2 --certfile ./pems/${address.constructinfo.host}/cert/cert1.pem --keyfile ./pems/${address.constructinfo.host}/key/privkey1.pem --ca-certs ./pems/${address.constructinfo.host}/ca/chain1.pem --ca-certs ./pems/${address.constructinfo.host}/ca/fullchain1.pem`;
      await fileSystem("write", [ homeTarget + "/start.sh", startScript ]);
      await shellExec("chmod", [ "+x", homeTarget + "/start.sh" ]);
    } else {
      throw new Error("invalid server name");
    }
    
    return true;

  } catch (e) {
    console.log(e);
    return false;
  }
}

SpawnHuman.prototype.reverseUpdate = async function () {
  const instance = this;
  const address = this.address;
  const { applicationName, appDir, dir } = this;
  const { equalJson, shellExec, shellLink, fileSystem, uniqueValue } = this.mother;
  try {
    const homeFolder = process.env.HOME;
    const homeFolderList = await fileSystem("readFolder", [ homeFolder ]);
    const homeTarget = homeFolder + "/" + applicationName;
    const tempFolderName = "human_temp_python_folder_" + uniqueValue("hex");
    const tempFolderPath = homeFolder + "/" + tempFolderName;
    let moveTargets;
    let humanScriptBuffer;

    if (!homeFolderList.includes(applicationName)) {
      throw new Error("human must be")
    } 

    moveTargets = [
      "temp",
      "python_modules",
      ".git",
      "pems",
      "start.sh",
      "human.py",
    ];

    await shellExec("mkdir", [ tempFolderPath ]);

    await shellExec("rm", [ "-rf", homeTarget + "/.DS_Store" ]);
    for (let target of moveTargets) {
      await shellExec("mv", [ homeTarget + "/" + target, tempFolderPath + "/" ]);
    }
    await shellExec("mv", [ homeTarget + "/apps/infoObj.py", tempFolderPath + "/" ]);

    humanScriptBuffer = await fileSystem("readString", [ appDir + "/human.py" ]);

    await shellExec("rm", [ "-rf", appDir ]);
    await shellExec("cp", [ "-r", homeTarget, dir + "/" ]);
    await fileSystem("write", [ appDir + "/human.py", humanScriptBuffer ]);

    for (let target of moveTargets) {
      await shellExec("mv", [ tempFolderPath + "/" + target, homeTarget + "/" ]);
    }
    await shellExec("mv", [ tempFolderPath + "/infoObj.py", homeTarget + "/apps/" ]);
    await shellExec("rm", [ "-rf", tempFolderPath ]);
    
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = SpawnHuman;
