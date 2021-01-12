const GoogleDocs = function (credentials = "default") {
  const GoogleAPIs = require("./googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.docs = {};
}

GoogleDocs.prototype.get_docs = function (id) {
  let instance = this;
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
  let instance = this;
  try {
    this.docs = await this.general.get_app("docs");
    let result = await callback(this);
    return result;
  } catch (e) {
    console.log(e.message);
  }
}

GoogleDocs.prototype.total_make = async function () {
  let instance = this;
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

module.exports = GoogleDocs;
