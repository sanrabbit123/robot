const AiFront = function () {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();

  this.text = {};
  this.options = this.general.options;
  this.links = this.general.links;
}

AiFront.prototype.renderSvgPng = async function (sw) {
  if (/\.js$/.test(sw)) {
    sw = sw.replace(/\.js$/, '');
  }
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const { home_dir } = this.options;
  const binaryTotalPathParent = process.cwd() + "/binary/frontMaker/ai/";
  const binaryTotalPath = binaryTotalPathParent + sw;
  let binaryTotalDirParent, binaryTotalDir, targetAIList;
  try {

    //init setting
    let mapMaker, temp_scriptString;
    const MapMaker = require(`${this.links.mapMaker}/mapMaker.js`);
    mapMaker = new MapMaker(sw);
    shell.exec(`mkdir ${shellLink(home_dir)}/result/${sw}`);

    //get map object
    this.text = await mapMaker.mapGenerator();

    //if ai file exist, add ai file info
    binaryTotalDirParent = await fileSystem("readDir", [ binaryTotalPathParent ]);
    if (!binaryTotalDirParent.includes(sw)) {
      shell.exec(`mkdir ${shellLink(binaryTotalPathParent)}/${sw}`);
    }
    binaryTotalDir = await fileSystem("readDir", [ binaryTotalPath ]);
    targetAIList = [];
    for (let i of binaryTotalDir) { if (/\.ai$/.test(i)) {
      targetAIList.push(i);
    }}
    this.options.etc = {};
    if (targetAIList.length > 0) {
      targetAIList.sort((a, b) => { return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, '')) });
      this.options.etc.targetFile = [];
      for (let i of targetAIList) {
        this.options.etc.targetFile.push(binaryTotalPath + "/" + i);
      }
      if (this.options.etc.targetFile.length > 0) {
        console.log(this.options.etc.targetFile);
      }
    }

    //start aiScript
    temp_scriptString = await this.general.generator.front_maker.exec(this.options, sw);
    await this.general.startAdobe({
      name: `front_${sw}`,
      data: this.text,
      script: temp_scriptString,
      app: "Illustrator",
      end: false,
    });

    //make svgTong files and make map with source written
    await mapMaker.writeMap_makeTong();

    //copy binary
    let resDir;
    let resBinaryDirPathMother, resBinaryDirPath;
    let resBinaryDirMother, resBinaryDir;
    resDir = await fileSystem(`readDir`, [ `${home_dir}/result/${sw}` ]);
    resBinaryDirPathMother = `${process.cwd()}/binary/frontMaker`;
    resBinaryDirPath = `${resBinaryDirPathMother}/${sw}`;
    resBinaryDirMother = await fileSystem(`readDir`, [ resBinaryDirPathMother ]);
    if (!resBinaryDirMother.includes(sw)) {
      shell.exec(`mkdir ${shellLink(resBinaryDirPathMother)}/${sw};`);
    }
    resBinaryDir = await fileSystem(`readDir`, [ resBinaryDirPath ]);
    for (let i of resBinaryDir) {
      if (/\.png$/.test(i)) {
        shell.exec(`rm -rf ${shellLink(resBinaryDirPath)}/${i};`);
      }
    }
    for (let i of resDir) {
      if (/\.png$/.test(i)) {
        shell.exec(`cp ${shellLink(home_dir)}/result/${sw}/${i} ${shellLink(resBinaryDirPath)};`);
      }
    }

  } catch (e) {
    console.log(e);
  }
}

AiFront.prototype.front_maker = async function (target) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await this.general.static_setting();

    //delete result folder
    const resDir = await fileSystem(`readDir`, [ this.options.home_dir + "/result" ]);
    for (let i of resDir) {
      shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${i}`);
    }

    //init setting
    this.options.script_dir = `${this.links.factory}/script/front_maker`;

    //if map exist, make source files
    const mapDir = await fileSystem("readDir", [ this.links.map ]);

    // image and svg make
    if (target === undefined) {
      await this.renderSvgPng("general");
    } else {
      if (target === "entire") {
        for (let i of mapDir) { if (i !== ".DS_Store") {
          await this.renderSvgPng(i.replace(/\.js$/, ''));
        }}
      } else if (mapDir.includes(target + ".js")) {
        await this.renderSvgPng(target);
      } else {
        throw new Error("invaild target");
      }
    }

  } catch (e) {
    console.log(e);
  } finally {
    console.log(`done`);
    MONGOC.close();
    process.exit();
  }
}

module.exports = AiFront;
