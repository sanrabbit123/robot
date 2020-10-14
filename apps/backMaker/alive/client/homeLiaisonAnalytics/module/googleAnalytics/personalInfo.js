class PersonalInfo {

  constructor(json) {
    this.age = json.age;
    this.gender = json.gender;
  }

  toNormal() {
    let obj = {};
    obj.age = this.age;
    obj.gender = this.gender;
    return obj;
  }

}

module.exports = PersonalInfo;
