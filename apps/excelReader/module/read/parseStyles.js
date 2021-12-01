"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseStyles;

var _xlsx = require("../xml/xlsx");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseStyles(content, xml) {
  if (!content) {
    return {};
  }

  var doc = xml.createDocument(content);
  var baseStyles = (0, _xlsx.getBaseStyles)(doc).map(parseCellStyle);
  var numberFormats = (0, _xlsx.getNumberFormats)(doc).map(parseNumberFormatStyle).reduce(function (formats, format) {
    formats[format.id] = format;
    return formats;
  }, []);

  var getCellStyle = function getCellStyle(xf) {
    if (xf.hasAttribute('xfId')) {
      return _objectSpread(_objectSpread({}, baseStyles[xf.xfId]), parseCellStyle(xf, numberFormats));
    }

    return parseCellStyle(xf, numberFormats);
  };

  return (0, _xlsx.getCellStyles)(doc).map(getCellStyle);
}

function parseNumberFormatStyle(numFmt) {
  return {
    id: numFmt.getAttribute('numFmtId'),
    template: numFmt.getAttribute('formatCode')
  };
}
function parseCellStyle(xf, numFmts) {
  var style = {};

  if (xf.hasAttribute('numFmtId')) {
    var numberFormatId = xf.getAttribute('numFmtId');

    if (numFmts[numberFormatId]) {
      style.numberFormat = numFmts[numberFormatId];
    } else {
      style.numberFormat = {
        id: numberFormatId
      };
    }
  }

  return style;
}
