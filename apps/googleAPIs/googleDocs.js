const GoogleDocs = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

GoogleDocs.prototype.parsingId = function (link) {
  let linkArr, target;
  if (/^http/i.test(link)) {
    linkArr = (link.split('?'))[0].split('/');
    for (let i of linkArr) {
      if (!/docs/gi.test(i) && !/document/gi.test(i) && !/spreadsheets/gi.test(i) && !/drive/gi.test(i) && !/google/gi.test(i) && !/file/gi.test(i) && !/folders/gi.test(i) && !/view/gi.test(i)) {
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

GoogleDocs.prototype.text_filter = function (str) {
  for (let i = 0; i < 5; i++) {
    str = str.replace(/\n/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/&/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\:/g, '').replace(/=/g, '').replace(/ /g, ' ').replace(/  /g, ' ').replace(/ /g, ' ').replace(/\t/g, ' ').replace(/​/g, '');
  }
  return str;
}

GoogleDocs.prototype.text_filter_lite = function (str) {
  for (let i = 0; i < 5; i++) {
    str = str.replace(/\n/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/=/g, '').replace(/&/g, '').replace(/ /g, ' ').replace(/  /g, ' ').replace(/ /g, ' ').replace(/\t/g, ' ').replace(/​/g, '');
  }
  return str;
}

GoogleDocs.prototype.create_newDocs_inPython = async function (title, parent) {
  const instance = this;
  const mother = this.mother;
  try {
    const { id } = await mother.pythonExecute(this.pythonApp, [ "docs", "createDocs" ], { title });
    console.log(id);
    await mother.pythonExecute(this.pythonApp, [ "drive", "moveFolder" ], { targetId: id, parent: parent });
    return id;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.get_value_inPython = async function (id) {
  const instance = this;
  const mother = this.mother;
  try {
    id = this.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "docs", "readDocs" ], { id });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.read_value_inPython = async function (id) {
  const instance = this;
  const mother = this.mother;
  try {

    id = this.parsingId(id);

    const result = await mother.pythonExecute(this.pythonApp, [ "docs", "readDocs" ], { id });
    let past;
    let elements;

    past = "";
    for (let obj of result.body.content) {
      if (obj.paragraph !== undefined) {
        if (obj.paragraph.elements !== undefined) {
          elements = obj.paragraph.elements;
          for (let obj2 of elements) {
            if (obj2.textRun !== undefined) {
              past += obj2.textRun.content;
            }
          }
        }
      }
    }

    return past;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.update_value_inPython = async function (id, longText) {
  const instance = this;
  const mother = this.mother;
  try {
    if (id === undefined || typeof longText !== "string") {
      throw new Error("invaild input");
    }
    id = this.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "docs", "insertText" ], { id, longText });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.update_image_inPython = async function (id, index, url) {
  const instance = this;
  const mother = this.mother;
  try {
    if (id === undefined || typeof index !== "number" || typeof url !== "string") {
      throw new Error("invaild input");
    }
    id = this.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "docs", "insertImage" ], { id, index, url });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.update_contents_inPython = async function (id, contentsArr) {
  const instance = this;
  const mother = this.mother;
  try {
    if (id === undefined || !Array.isArray(contentsArr)) {
      throw new Error("invaild input");
    }
    let result;
    id = this.parsingId(id);
    result = await mother.pythonExecute(this.pythonApp, [ "docs", "insertContents" ], { id, contents: contentsArr });
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleDocs;
