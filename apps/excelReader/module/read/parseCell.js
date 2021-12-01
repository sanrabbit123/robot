"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseCell;

var _parseCellValue = _interopRequireDefault(require("./parseCellValue"));

var _coordinates = require("./coordinates");

var _xlsx = require("../xml/xlsx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parseCell(node, sheet, xml, values, styles, properties, options) {
  var coords = (0, _coordinates.parseCellCoordinates)(node.getAttribute('r'));
  var valueElement = (0, _xlsx.getCellValue)(sheet, node);

  var value = valueElement && valueElement.textContent;
  var type;

  if (node.hasAttribute('t')) {
    type = node.getAttribute('t');
  }

  return {
    row: coords[0],
    column: coords[1],
    value: (0, _parseCellValue["default"])(value, type, {
      getInlineStringValue: function getInlineStringValue() {
        return (0, _xlsx.getCellInlineStringValue)(sheet, node);
      },
      getStyleId: function getStyleId() {
        return node.getAttribute('s');
      },
      styles: styles,
      values: values,
      properties: properties,
      options: options
    })
  };
}
