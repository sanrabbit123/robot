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
  const { fileSystem, shell, shellLink, binaryRequest } = this.mother;
  const MapMaker = require(`${this.links.mapMaker}/mapMaker.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  const { home_dir } = this.options;
  try {

    let mapMaker, temp_scriptString, tempObject;
    let binaryTotalDir, targetAIList;
    let resDir;

    //init setting and get map object
    mapMaker = new MapMaker(sw);
    this.text = await mapMaker.mapGenerator();

    //result folder setting
    shell.exec(`mkdir ${shellLink(home_dir)}/result/${sw}`);
    shell.exec(`mkdir ${shellLink(home_dir)}/result/ai`);
    shell.exec(`mkdir ${shellLink(home_dir)}/result/binary`);

    //ai files download
    tempObject = await binaryRequest(ADDRESS.s3info.host + "/frontMaker/ai/" + sw + ".zip");
    await fileSystem(`writeBinary`, [ home_dir + "/result/ai/" + sw + ".zip", tempObject ]);
    console.log(`download success`);

    shell.exec(`unzip ${shellLink(home_dir)}/result/ai/${sw}.zip -d ${shellLink(home_dir)}/result/ai`);
    shell.exec(`rm -rf ${shellLink(home_dir)}/result/ai/${sw}.zip`);
    console.log(`unzip success`);

    //add ai file-info
    binaryTotalDir = await fileSystem("readDir", [ `${home_dir}/result/ai/${sw}` ]);
    targetAIList = [];
    for (let i of binaryTotalDir) {
      if (/\.ai$/.test(i)) {
        targetAIList.push(i);
      }
    }

    this.options.etc = {};
    if (targetAIList.length > 0) {
      targetAIList.sort((a, b) => {
        return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, ''));
      });
      this.options.etc.targetFile = [];
      for (let i of targetAIList) {
        this.options.etc.targetFile.push(`${home_dir}/result/ai/${sw}/${i}`);
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
      end: true,
    });

    //make svgTong files and make map with source written
    await mapMaker.writeMap_makeTong();

    //binary files download
    tempObject = await binaryRequest(ADDRESS.s3info.host + "/frontMaker/binary/" + sw + ".zip");
    await fileSystem(`writeBinary`, [ home_dir + "/result/binary/" + sw + ".zip", tempObject ]);
    console.log(`download success`);

    shell.exec(`unzip ${shellLink(home_dir)}/result/binary/${sw}.zip -d ${shellLink(home_dir)}/result/binary`);
    shell.exec(`rm -rf ${shellLink(home_dir)}/result/binary/${sw}.zip`);
    shell.exec(`rm -rf ${shellLink(home_dir)}/result/binary/__MACOSX`);
    console.log(`unzip success`);

    //binary setting
    resDir = await fileSystem(`readDir`, [ `${home_dir}/result/${sw}` ]);
    for (let i of resDir) {
      if (!/\.png$/.test(i)) {
        // shell.exec(`rm -rf ${shellLink(home_dir)}/result/${sw}/${i};`);
      } else {
        shell.exec(`mv ${shellLink(home_dir)}/result/${sw}/${i} ${shellLink(home_dir)}/result/binary/${sw}/${i};`);
      }
    }

    //end
    shell.exec(`rm -rf ${shellLink(home_dir)}/result/ai`);
    // shell.exec(`rm -rf ${shellLink(home_dir)}/result/${sw}`);

  } catch (e) {
    console.log(e);
  }
}

AiFront.prototype.front_maker = async function (target) {
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
    this.options.script_dir = `${this.links.factory}/script/front_maker`;

    //if map exist, make source files
    const mapDir = await fileSystem("readDir", [ this.links.map ]);

    // image and svg make
    if (target === undefined) {
      await this.renderSvgPng("general");
    } else {
      if (target === "entire") {
        for (let i of mapDir) {
          if (i !== ".DS_Store") {
            await this.renderSvgPng(i.replace(/\.js$/, ''));
          }
        }
      } else if (mapDir.includes(target + ".js")) {
        await this.renderSvgPng(target);
      } else {
        throw new Error("invaild target");
      }
    }

  } catch (e) {
    console.log(e);
  }
}

module.exports = AiFront;
