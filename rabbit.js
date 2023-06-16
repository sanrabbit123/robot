const Rabbit = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
}

Rabbit.prototype.mongoToJson = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  try {
    const today = new Date();
    const zeroAddition = function (number) {
      if (number < 10) {
        return `0${String(number)}`;
      } else {
        return String(number);
      }
    }
    const backFolderName = "backup";
    const mongoTargets = [
      [ "mongoinfo", "mongo" ],
      [ "backinfo", "console" ],
      [ "pythoninfo", "python" ],
      [ "testinfo", "log" ],
      [ "secondinfo", "second" ],
    ];
    const robotDirArr = process.cwd().split("/");
    robotDirArr.pop();
    const robotDirMother = robotDirArr.join("/");
    const robotDirMotherDetail = await fileSystem(`readDir`, [ robotDirMother ]);
    if (!robotDirMotherDetail.includes(backFolderName)) {
      await shellExec(`mkdir ${shellLink(robotDirMother)}/${backFolderName}`);
    }
    const backDir = robotDirMother + "/" + backFolderName;
    let tempInfo, timeString;

    timeString = `${String(today.getFullYear())}${zeroAddition(today.getMonth() + 1)}${zeroAddition(today.getDate())}${zeroAddition(today.getHours())}${zeroAddition(today.getMinutes())}${zeroAddition(today.getSeconds())}`;

    for (let [ infoName, dbName ] of mongoTargets) {
      tempInfo = this.address[infoName];
      await shellExec(`mongodump --uri="mongodb://${tempInfo["host"]}/${tempInfo["database"]}" --username=${tempInfo["user"]} --password=${tempInfo["password"]} --port=${String(tempInfo["port"])} --out="${shellLink(backDir)}/${timeString}/${dbName}${timeString}" --authenticationDatabase admin`);
    }

    await shellExec(`cd ${shellLink(backDir)};zip -r ./${timeString}.zip ./${timeString};rm -rf ${shellLink(backDir)}/${timeString}`);

    return `mongo exports done`;
  } catch (e) {
    console.log(e);
  }
}

Rabbit.prototype.launching = async function () {
  try {

    console.log("rabbit ready");


  } catch (e) {
    console.log(e);
  }
}

// EXE --------------------------------------------------------------------------------------

const rabbit = new Rabbit();
rabbit.launching().catch((err) => { console.log(err); });