const GoogleDocs = function (credentials = "default") {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.docs = {};
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

GoogleDocs.prototype.get_docs = function (id) {
  const instance = this;
  id = this.general.parsingId(id);
  return new Promise(function (resolve, reject) {
    instance.docs.documents.get({
        documentId: id,
      }, (err, res) => {
        if (err) { reject(err); }
        resolve(res.data.body.content);
      });
  });
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

GoogleDocs.prototype.callback_execute = async function (callback) {
  const instance = this;
  try {
    this.docs = await this.general.get_app("docs");
    let result = await callback(this);
    return result;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDocs.prototype.total_make = async function () {
  const instance = this;
  try {
    let arr = [];
    this.docs = await this.general.get_app("docs");
    const rows = await this.get_docs('1VXNQntTBUJWT7rMVGM1oew5d6kjhDdNLMG4hJPVO6-c');
    let temp;
    for (let i of rows) {
      if (i.paragraph !== undefined) {
        for (let j of i.paragraph.elements) {
          if (j.textRun !== undefined && j.textRun.content !== undefined && j.textRun.content !== '\n' && j.textRun.content !== ' \n' && /^[ ]+\n$/.test(j.textRun.content)) {
            arr.push(this.text_filter_lite(j.textRun.content));
          }
        }
      }
    }
    console.log(arr);
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDocs.prototype.create_newDocs_inPython = async function (title, parent) {
  const instance = this;
  const mother = this.general;
  try {
    const { id } = await mother.pythonExecute(this.pythonApp, [ "docs", "createDocs" ], { title });
    await mother.pythonExecute(this.pythonApp, [ "drive", "moveFolder" ], { targetId: id, parent: parent });
    return id;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.get_value_inPython = async function (id) {
  const instance = this;
  const mother = this.general;
  try {
    id = this.general.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "docs", "readDocs" ], { id });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.read_value_inPython = async function (id) {
  const instance = this;
  const mother = this.general;
  try {
    const result = await mother.pythonExecute(this.pythonApp, [ "docs", "readDocs" ], { id });
    let past;
    let elements;

    id = this.general.parsingId(id);
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
  const mother = this.general;
  try {
    if (id === undefined || typeof longText !== "string") {
      throw new Error("invaild input");
    }
    id = this.general.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "docs", "insertText" ], { id, longText });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.update_image_inPython = async function (id, index, url) {
  const instance = this;
  const mother = this.general;
  try {
    if (id === undefined || typeof index !== "number" || typeof url !== "string") {
      throw new Error("invaild input");
    }
    id = this.general.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "docs", "insertImage" ], { id, index, url });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleDocs.prototype.update_contents_inPython = async function (id, contentsArr) {
  const instance = this;
  const mother = this.general;
  try {
    if (id === undefined || !Array.isArray(contentsArr)) {
      throw new Error("invaild input");
    }
    id = this.general.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "docs", "insertContents" ], { id, contents: contentsArr });
    return result;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleDocs;
