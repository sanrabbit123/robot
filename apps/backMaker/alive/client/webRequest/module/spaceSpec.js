class SpaceSpec {
  constructor(spec) {
    this.room = Number(spec.room);
    this.bathroom = Number(spec.bathroom);
    this.valcony = Boolean(spec.valcony);
  }

  toNormal() {
    let obj = {};
    obj.room = this.room;
    obj.bathroom = this.bathroom;
    obj.valcony = this.valcony;
    return obj;
  }
}

module.exports = SpaceSpec;
