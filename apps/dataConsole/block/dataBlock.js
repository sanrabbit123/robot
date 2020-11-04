const DataBlock = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/dataConsole";
}

DataBlock.prototype.baseMaker = function (target) {
  let html = '';
  html = `
  <!DOCTYPE html>
  <html lang="ko" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
      <link href="/font/fonts.css" rel="stylesheet">
      <style></style>
    </head>
    <body>
      <div id="totalcontents"></div>
      <script src="${target}.js"></script>
    </body>
  </html>`
  return html;
}

module.exports = DataBlock;
