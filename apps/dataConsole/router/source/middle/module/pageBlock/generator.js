const Generator = function () {
  this.tong = [];
  this.name = "generator.js";
}

Generator.prototype.generatePages = async function (target) {
  const instance = this;
  try {
    const current = $CURRENT_DIR_ARRAY;
    let targets;

    targets = [];

    for (let name of current) {
      if (name !== ".DS_Store" && name !== this.name) {
        targets.push(name.replace(/\.(js|mjs)$/i, ''));
      }
    }

    if (!targets.includes(target)) {
      return null;
    }
    const Pages = require("/" + target + "/index.js");
    if (Pages.prototype.launching === undefined || Pages.prototype.launching === null) {
      return null;
    } else {
      const pages = new Pages();
      return pages;
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = Generator;
