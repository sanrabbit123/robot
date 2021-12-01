const _xmldom = require("../xmldom/index.js");
module.exports.default = {
  createDocument: function createDocument(content) {
    return new _xmldom.DOMParser().parseFromString(content);
  }
};
