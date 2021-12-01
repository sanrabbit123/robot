"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseProperties;

var _xlsx = require("../xml/xlsx");

function parseProperties(content, xml) {
  var book = xml.createDocument(content);
  var properties = {};

  var workbookProperties = (0, _xlsx.getWorkbookProperties)(book);

  if (workbookProperties && workbookProperties.getAttribute('date1904') === '1') {
    properties.epoch1904 = true;
  }
  properties.sheets = [];

  var addSheetInfo = function addSheetInfo(sheet) {
    if (sheet.getAttribute('name')) {
      properties.sheets.push({
        id: sheet.getAttribute('sheetId'),
        name: sheet.getAttribute('name'),
        relationId: sheet.getAttribute('r:id')
      });
    }
  };

  (0, _xlsx.getSheets)(book).forEach(addSheetInfo);
  return properties;
}
