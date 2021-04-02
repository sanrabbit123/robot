class GaroseroArray extends Array {

  toSimple() {
    let arr = [];
    for (let { gs } of this) {
      arr.push(gs);
    }
    return arr;
  }

  get simple() {
    return this.toSimple();
  }

}

const GaroseroParser = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/garoseroParser";
  const JpegImage = require(`${this.dir}/module/jpegImage.js`);
  this.JpegImage = JpegImage;
  this.decoder = new JpegImage();
  this.defaultOpts = {
    colorTransform: undefined,
    useTArray: false,
    formatAsRGBA: true,
    tolerantDecoding: true,
    maxResolutionInMP: 100,
    maxMemoryUsageInMB: 512,
  };
}

GaroseroParser.prototype.jpegDecode = function (jpegData, userOpts = {}) {
  const instance = this;
  let opts = { ...this.defaultOpts, ...userOpts };
  let arr = new Uint8Array(jpegData);

  this.decoder.opts = opts;
  this.JpegImage.resetMaxMemoryUsage(opts.maxMemoryUsageInMB * 1024 * 1024);
  this.decoder.parse(arr);

  let channels = (opts.formatAsRGBA) ? 4 : 3;
  let bytesNeeded = this.decoder.width * this.decoder.height * channels;
  let image;

  try {
    this.JpegImage.requestMemoryAllocation(bytesNeeded);
    image = {
      width: this.decoder.width,
      height: this.decoder.height,
      exifBuffer: this.decoder.exifBuffer,
      data: (opts.useTArray ? new Uint8Array(bytesNeeded) : Buffer.alloc(bytesNeeded))
    };
    if (this.decoder.comments.length > 0) {
      image["comments"] = this.decoder.comments;
    }
  } catch (err) {
    if (err instanceof RangeError) {
      throw new Error("Could not allocate enough memory for the image. Required: " + bytesNeeded);
    } else {
      throw err;
    }
  }

  this.decoder.copyToImageData(image, opts.formatAsRGBA);
  return image;
}

GaroseroParser.prototype.queryImage = async function (image) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    const target = await fileSystem(`read`, [ image ]);
    const { width, height } = this.jpegDecode(target);
    if (width > height) {
      return 'g';
    } else if (width < height) {
      return 's';
    } else {
      return 'c';
    }
  } catch (e) {
    console.log(e);
  }
}

GaroseroParser.prototype.queryImages = async function (imageArr) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let target, width, height, resultObj;
    let totalTong = new GaroseroArray();
    let number = 0;

    for (let i of imageArr) {
      target = await fileSystem(`read`, [ i ]);
      resultObj = this.jpegDecode(target);
      width = resultObj.width;
      height = resultObj.height;
      if (width > height) {
        totalTong.push({ index: number, gs: 'g' });
      } else if (width < height) {
        totalTong.push({ index: number, gs: 's' });
      } else {
        totalTong.push({ index: number, gs: 'c' });
      }
      number++;
    }

    return totalTong;
  } catch (e) {
    console.log(e);
  }
}

GaroseroParser.prototype.queryDirectory = async function (dir) {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let tongRaw, tong = [], result;
    let numberBoo = [];

    const sortFunc = function (str) {
      return Number(str.replace(/_[0-9][0-9][0-9][0-9][0-9][0-9]$/, '').replace(/[^0-9]/g, ''));
    }
    tongRaw = await fileSystem(`readDir`, [ dir ]);
    for (let i of tongRaw) {
      if (i !== `.DS_Store`) {
        tong.push(dir + "/" + i);
        if (/[0-9]/g.test(i)) {
          numberBoo.push("number");
        } else {
          numberBoo.push("string");
        }
      }
    }

    if (numberBoo.includes("string")) {
      tong.sort();
    } else {
      tong.sort((a, b) => { return sortFunc(a) - sortFunc(b); });
    }
    result = await this.queryImages(tong);
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GaroseroParser;
