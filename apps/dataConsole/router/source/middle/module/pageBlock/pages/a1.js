const Page = function () {
  this.hello = "nice to meet you";
}

Page.prototype.hello = function () {
  console.log(app.hello);
};

module.exports = Page;
