const FrontMaker = function (app, options) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.options = options;
  this.fileSystem = options.fileSystem;
  this.dir = `${process.cwd()}/apps/contentsMaker/module/frontMaker`;
  this.app = app;
  this.svgTong = {}
  this.pngTong = {}
}

FrontMaker.prototype.mapGenerator = async function () {
  try {
    let textObj = require(`${this.dir}/map/${this.app}.js`);
    await this.fileSystem("write", [ `${this.dir}/map/${this.app}.js`, ("module.exports = " + JSON.stringify(textObj, null, 2)) ]);
    return textObj;
  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.makeSvgTong = async function () {
  try {
    let svgApp_sync, svgApp_async, fileArr_sync = [], fileArr_async = [], svgStrings_sync = {}, svgStrings_async = {};
    for (let i of this.svgTong[this.app].sync) {
      fileArr_sync.push(process.env.HOME + "/contentsMaker/result/" + this.app + "/" + i);
    }
    for (let i of this.svgTong[this.app].async) {
      fileArr_async.push(process.env.HOME + "/contentsMaker/result/" + this.app + "/" + i);
    }

    const SvgOptimizer = require(`${process.cwd()}/apps/svgOptimizer/svgOptimizer.js`);

    //sync and async
    svgApp_sync = new SvgOptimizer(fileArr_sync);
    svgApp_sync.setDcimal(3);
    svgStrings_sync = await svgApp_sync.launching();

    svgApp_async = new SvgOptimizer(fileArr_async);
    svgApp_async.setDcimal(3);
    svgStrings_async = await svgApp_async.launching();

    //result
    let finalText_sync, finalText_async;

    finalText_sync = "";
    for (let i in svgStrings_sync) {
      finalText_sync += "SvgTong." + i + " = " + "'" + svgStrings_sync[i].replace(/'/g, "\'").replace(/\n$/g, '') + "';";
      finalText_sync += "\n\n";
    }
    await this.fileSystem("write", [ `${this.dir}/svgTong/${this.app}.js`, finalText_sync ]);

    finalText_async = "";
    for (let i in svgStrings_async) {
      finalText_async += "SvgTongAsync." + i + " = " + "'" + svgStrings_async[i].replace(/'/g, "\'").replace(/\n$/g, '') + "';";
      finalText_async += "\n\n";
    }
    await this.fileSystem("write", [ `${this.dir}/svgTong/${this.app}_async.js`, finalText_async ]);

  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.writeMap_makeTong = async function () {
  const instance = this;
  try {
    const writeFunction = require(`${this.dir}/writeMap/${this.app}.js`);
    let textObj = require(`${this.dir}/map/${this.app}.js`);
    let source_rawArr = await this.fileSystem(`readDir`, [ `${this.options.home_dir}result/${this.app}` ]);
    let { map, svgTong, pngTong } = writeFunction(textObj, source_rawArr);
    textObj = map;
    this.svgTong[this.app] = svgTong;
    this.pngTong[this.app] = pngTong;
    await this.fileSystem("write", [ `${this.dir}/map/${this.app}.js`, ("module.exports = " + JSON.stringify(textObj, null, 2)) ]);
    console.log(this.svgTong[this.app]);
    console.log(this.pngTong[this.app]);
    console.log(`source write done`);
    await this.makeSvgTong();
    console.log(`svg tong make done`);
    return textObj;
  } catch (e) {
    console.log(e);
  }
}

module.exports = FrontMaker;
