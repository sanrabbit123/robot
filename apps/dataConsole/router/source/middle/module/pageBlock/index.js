const Generator = function () {

}

Generator.prototype.sayHello = async function () {
  const Page = require("/pages/a1.js");
  const app = new Page();
  console.log(app.hello);
};

module.exports = Generator;
