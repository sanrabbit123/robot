const Pages = function () {

}

Pages.prototype.render = async function (target) {
  const instance = this;
  try {
    const A1 = require("/thirdIR/pages/a1.js");
    let result;

    result = [];
    result.push(A1.render());

    return result;

  } catch (e) {
    console.log(e);
  }
};

module.exports = Pages;
