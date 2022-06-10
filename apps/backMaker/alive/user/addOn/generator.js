const USER_DIR = process.cwd() + "/apps/backMaker/alive/user";
const User = require(USER_DIR + "/user.js");

class Users extends Array {

  toNormal() {
    let tong;
    tong = [];
    for (let i of this) {
      tong.push(i.toNormal());
    }
    return tong;
  }

}

const withTools = function (User) {
  return User;
}

const withToolsArr = function (Users) {
  return Users;
}

const Tools = function () {}
Tools.withTools = withTools;
Tools.withToolsArr = withToolsArr;

module.exports = { User, Users, Tools };
