const GoogleSlides = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

GoogleSlides.prototype.parsingId = function (link) {
  let linkArr, target;
  if (/^http/i.test(link)) {
    linkArr = (link.split('?'))[0].split('/');
    for (let i of linkArr) {
      if (!/docs/gi.test(i) && !/document/gi.test(i) && !/spreadsheets/gi.test(i) && !/drive/gi.test(i) && !/google/gi.test(i) && !/file/gi.test(i) && !/folders/gi.test(i) && !/view/gi.test(i) && !/presentation/gi.test(i) && !/forms/gi.test(i)) {
        if (i.length > 12) {
          target = i;
        }
      }
    }
  } else {
    target = link;
  }
  return target;
}

GoogleSlides.prototype.create_newSlides_inPython = async function (title, parent) {
  const instance = this;
  const mother = this.mother;
  try {
    const { id } = await mother.pythonExecute(this.pythonApp, [ "slides", "createSlides" ], { title });
    await mother.pythonExecute(this.pythonApp, [ "drive", "moveFolder" ], { targetId: id, parent: parent });
    return id;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleSlides;
