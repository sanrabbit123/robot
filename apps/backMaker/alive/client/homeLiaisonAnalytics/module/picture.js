class Picture {

  constructor(picture) {
    this.space = picture.space;
    this.prefer = picture.prefer;
  }

  toNormal() {
    let obj = {};
    obj.space = this.space;
    obj.prefer = this.prefer;
    return obj;
  }

}

module.exports = Picture;
