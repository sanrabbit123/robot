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
  const back = this.back;
  const address = this.address;
  const members = await back.setMemberObj({ getMode: true, selfMongo: null });
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
    let memberArr;
    let memberPythonScript;
    let startPointPython;
    let startScript;
    let startPointPython_constructLounge, startScript_constructLounge;
    let startPointPython_localLounge, startScript_localLounge;
    let startPointPython_localObserver, startScript_localObserver;

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

    memberArr = JSON.stringify(members, null, 2).split("\n")
    memberArr = memberArr.map((str) => { return intend + str })
    memberArr[0] = intend + "memberArray = [";
    memberArr.unshift("def returnMembers():")
    memberArr.push(intend + "return memberArray");
    memberPythonScript = memberArr.join("\n").replace(/\"\: null/gi, "\": None").replace(/\"\: true/gi, "\": True").replace(/\"\: false/gi, "\": False");
    await fileSystem("write", [ homeTarget + "/apps/memberObj.py", memberPythonScript ]);

    await shellExec("cp", [ "-r", process.cwd() + "/pems", homeTarget ]);

    // 1

    startPointPython_constructLounge = await fileSystem("readString", [ appDir + "/human.py" ]);
    startPointPython_constructLounge += "\n";
    startPointPython_constructLounge += "from apps.constructLounge.constructLounge import ConstructLounge";
    startPointPython_constructLounge += "\n";
    startPointPython_constructLounge += "\n";
    startPointPython_constructLounge += "server = ConstructLounge()";
    startPointPython_constructLounge += "\n";
    startPointPython_constructLounge += "app = server.returnApp()";
    startPointPython_constructLounge += "\n";
    await fileSystem("write", [ homeTarget + "/human_constructLounge.py", startPointPython_constructLounge ]);
    startScript_constructLounge = `#!/bin/bash\nhypercorn human_constructLounge:app -b 0.0.0.0:8000 -w 2 --certfile ./pems/${address.constructinfo.host}/cert/cert1.pem --keyfile ./pems/${address.constructinfo.host}/key/privkey1.pem --ca-certs ./pems/${address.constructinfo.host}/ca/chain1.pem --ca-certs ./pems/${address.constructinfo.host}/ca/fullchain1.pem`;
    await fileSystem("write", [ homeTarget + "/start_constructLounge.sh", startScript_constructLounge ]);
    await shellExec("chmod", [ "+x", homeTarget + "/start_constructLounge.sh" ]);

    // 2
    startPointPython_localLounge = await fileSystem("readString", [ appDir + "/human.py" ]);
    startPointPython_localLounge += "\n";
    startPointPython_localLounge += "from apps.localLounge.localLounge import LocalLounge";
    startPointPython_localLounge += "\n";
    startPointPython_localLounge += "\n";
    startPointPython_localLounge += "server = LocalLounge()";
    startPointPython_localLounge += "\n";
    startPointPython_localLounge += "app = server.returnApp()";
    startPointPython_localLounge += "\n";
    await fileSystem("write", [ homeTarget + "/human_localLounge.py", startPointPython_localLounge ]);
    startScript_localLounge = `#!/bin/bash\nhypercorn human_localLounge:app -b 0.0.0.0:8000 -w 2`;
    await fileSystem("write", [ homeTarget + "/start_localLounge.sh", startScript_localLounge ]);
    await shellExec("chmod", [ "+x", homeTarget + "/start_localLounge.sh" ]);

    // 3
    startPointPython_localObserver = await fileSystem("readString", [ appDir + "/human.py" ]);
    startPointPython_localObserver += "\n";
    startPointPython_localObserver += "from apps.localObserver.localObserver import LocalObserver";
    startPointPython_localObserver += "\n";
    startPointPython_localObserver += "\n";
    startPointPython_localObserver += "server = LocalObserver()";
    startPointPython_localObserver += "\n";
    startPointPython_localObserver += "app = server.returnApp()";
    startPointPython_localObserver += "\n";
    await fileSystem("write", [ homeTarget + "/human_localObserver.py", startPointPython_localObserver ]);
    startScript_localObserver = `#!/bin/bash\nhypercorn human_localObserver:app -b 0.0.0.0:43000 -w 2 --certfile ./pems/${address.officeinfo.gitlab.host}/cert/cert1.pem --keyfile ./pems/${address.officeinfo.gitlab.host}/key/privkey1.pem --ca-certs ./pems/${address.officeinfo.gitlab.host}/ca/chain1.pem --ca-certs ./pems/${address.officeinfo.gitlab.host}/ca/fullchain1.pem`;
    await fileSystem("write", [ homeTarget + "/start_localObserver.sh", startScript_localObserver ]);
    await shellExec("chmod", [ "+x", homeTarget + "/start_localObserver.sh" ]);
    
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
      "human.py",
      "human_constructLounge.py",
      "human_localLounge.py",
      "human_localObserver.py",
      "start_constructLounge.sh",
      "start_localLounge.sh",
      "start_localObserver.sh",
    ];

    await shellExec("mkdir", [ tempFolderPath ]);

    await shellExec("rm", [ "-rf", homeTarget + "/.DS_Store" ]);
    for (let target of moveTargets) {
      await shellExec("mv", [ homeTarget + "/" + target, tempFolderPath + "/" ]);
    }
    await shellExec("mv", [ homeTarget + "/apps/infoObj.py", tempFolderPath + "/" ]);
    await shellExec("mv", [ homeTarget + "/apps/memberObj.py", tempFolderPath + "/" ]);

    humanScriptBuffer = await fileSystem("readString", [ appDir + "/human.py" ]);

    await shellExec("rm", [ "-rf", appDir ]);
    await shellExec("cp", [ "-r", homeTarget, dir + "/" ]);
    await fileSystem("write", [ appDir + "/human.py", humanScriptBuffer ]);

    for (let target of moveTargets) {
      await shellExec("mv", [ tempFolderPath + "/" + target, homeTarget + "/" ]);
    }
    await shellExec("mv", [ tempFolderPath + "/infoObj.py", homeTarget + "/apps/" ]);
    await shellExec("mv", [ tempFolderPath + "/memberObj.py", homeTarget + "/apps/" ]);
    await shellExec("rm", [ "-rf", tempFolderPath ]);
    
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = SpawnHuman;
