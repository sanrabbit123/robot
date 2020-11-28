const MapMaker = function (app) {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.sourceDir = `${process.env.HOME}/contentsMaker/result`;
  this.dir = `${process.cwd()}/apps/mapMaker`;
  this.app = app;
  this.svgTong = {};
  this.pngTong = {};
}

MapMaker.prototype.mapGenerator = async function () {
  const { fileSystem } = this.mother;
  try {
    let textObj = require(`${this.dir}/map/${this.app}.js`);
    await fileSystem(`write`, [ `${this.dir}/map/${this.app}.js`, ("module.exports = " + JSON.stringify(textObj, null, 2)) ]);
    return textObj;
  } catch (e) {
    console.log(e);
  }
}

MapMaker.prototype.makeSvgTong = async function (notDefault = null) {
  const { fileSystem } = this.mother;
  try {
    let svgApp_sync, svgApp_async;
    let fileArr_sync = [], fileArr_async = [];
    let svgStrings_sync = {}, svgStrings_async = {};

    let svgTongSyncFile, svgTongAsyncFile;
    if (notDefault === null) {
      svgTongSyncFile = `${this.dir}/svgTong/${this.app}.js`;
      svgTongAsyncFile = `${this.dir}/svgTong/${this.app}_async.js`;
    } else if (notDefault.svgTong !== undefined) {
      svgTongSyncFile = notDefault.svgTong;
      svgTongAsyncFile = notDefault.svgTong.replace(/\.js$/, '') + "_async.js";
    }

    for (let i of this.svgTong[this.app].sync) {
      fileArr_sync.push(this.sourceDir + "/" + this.app + "/" + i);
    }
    for (let i of this.svgTong[this.app].async) {
      fileArr_async.push(this.sourceDir + "/" + this.app + "/" + i);
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
    await fileSystem("write", [ svgTongSyncFile, finalText_sync ]);

    finalText_async = "";
    for (let i in svgStrings_async) {
      finalText_async += "SvgTongAsync." + i + " = " + "'" + svgStrings_async[i].replace(/'/g, "\'").replace(/\n$/g, '') + "';";
      finalText_async += "\n\n";
    }
    await fileSystem("write", [ svgTongAsyncFile, finalText_async ]);

  } catch (e) {
    console.log(e);
  }
}

MapMaker.prototype.writeMap_makeTong = async function (notDefault = null) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let writeMapFuncFile, mapFile;
    if (notDefault === null) {
      writeMapFuncFile = `${this.dir}/writeMap/${this.app}.js`;
      mapFile = `${this.dir}/map/${this.app}.js`;
    } else if (notDefault.writeMap !== undefined && notDefault.map !== undefined) {
      writeMapFuncFile = notDefault.writeMap;
      mapFile = notDefault.map;
    }

    //run write-map-function
    const writeFunction = require(writeMapFuncFile);
    let textObj = require(mapFile);
    let source_rawArr = await fileSystem(`readDir`, [ `${this.sourceDir}/${this.app}` ]);
    let { map, svgTong, pngTong } = writeFunction(textObj, source_rawArr);

    //rewrite map
    textObj = map;
    this.svgTong[this.app] = svgTong;
    this.pngTong[this.app] = pngTong;
    await fileSystem("write", [ mapFile, ("module.exports = " + JSON.stringify(textObj, null, 2)) ]);
    console.log(this.svgTong[this.app]);
    console.log(this.pngTong[this.app]);
    console.log(`source write done`);

    //write svgTong javascript
    await this.makeSvgTong(notDefault);
    console.log(`svg tong make done`);

    return textObj;
  } catch (e) {
    console.log(e);
  }
}

module.exports = MapMaker;
