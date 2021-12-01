"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseFilePaths;

var _xlsx = require("../xml/xlsx");

function parseFilePaths(content, xml) {
  var document = xml.createDocument(content);
  var filePaths = {
    sheets: {},
    sharedStrings: undefined,
    styles: undefined
  };

  var addFilePathInfo = function addFilePathInfo(relationship) {
    var filePath = relationship.getAttribute('Target');
    var fileType = relationship.getAttribute('Type');

    switch (fileType) {
      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles':
        filePaths.styles = getFilePath(filePath);
        break;

      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings':
        filePaths.sharedStrings = getFilePath(filePath);
        break;

      case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet':
        filePaths.sheets[relationship.getAttribute('Id')] = getFilePath(filePath);
        break;
    }
  };

  (0, _xlsx.getRelationships)(document).forEach(addFilePathInfo);

  return filePaths;
}

function getFilePath(path) {
  if (path[0] === '/') {
    return path.slice('/'.length);
  }


  return 'xl/' + path;
}
