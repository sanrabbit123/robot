const PublicSector = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = ADDRESS;
  this.dir = process.cwd() + "/apps/publicSector";
  this.home = process.env.HOME;
  this.name = "sector";
  this.staticName = "static";
  this.serverDir = this.dir + "/" + this.name;
  this.spawnDir = this.home + "/" + this.name;
  this.staticDir = this.home + "/" + this.staticName;
  this.moduleName = "python_modules";
}

PublicSector.prototype.staticRender = async function () {
  const instance = this;
  const { home, name, spawnDir, serverDir, staticName, staticDir } = this;
  const { fileSystem, shellExec } = this.mother;
  try {




    console.log("this")





  } catch (e) {
    console.log(e);
  }
}

PublicSector.prototype.spawnSector = async function () {
  const instance = this;
  const { home, name, spawnDir, serverDir, moduleName } = this;
  const { fileSystem, shellExec, shellLink } = this.mother;
  try {
    const homeDir = await fileSystem(`readDir`, [ home ]);
    const package = await fileSystem(`readJson`, [ serverDir + "/package.json" ]);
    let order;

    if (homeDir.includes(name)) {
      await shellExec(`rm`, [ `-rf`, spawnDir ]);
    }
    await shellExec(`cp`, [ `-r`, serverDir, home ]);

    order = `cd ${shellLink(spawnDir)};mkdir ${moduleName};`;
    for (let moduleName of package.dependencies) {
      order += `pip3 install ${moduleName} --target="${shellLink(spawnDir)}/${moduleName}";`;
    }
    await shellExec(order);

    await shellExec(`cp`, [ `-r`, `${process.cwd()}/pems`, spawnDir ]);

    await this.staticRender();

  } catch (e) {
    console.log(e);
  }
}

module.exports = PublicSector;
