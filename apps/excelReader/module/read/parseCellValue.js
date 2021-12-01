"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getCellValue;

function parseExcelDate(excelSerialDate, options) {
  if (options && options.epoch1904) {
    excelSerialDate += 1462;
  }
  var daysBeforeUnixEpoch = 70 * 365 + 19;

  var hour = 60 * 60 * 1000;
  return new Date(Math.round((excelSerialDate - daysBeforeUnixEpoch) * 24 * hour));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var BUILT_IN_DATE_NUMBER_FORMAT_IDS = [14, 15, 16, 17, 18, 19, 20, 21, 22, 27, 30, 36, 45, 46, 47, 50, 57];

function getCellValue(value, type, _ref) {
  var getInlineStringValue = _ref.getInlineStringValue,
      getStyleId = _ref.getStyleId,
      styles = _ref.styles,
      values = _ref.values,
      properties = _ref.properties,
      options = _ref.options;

  if (!type) {
    type = 'n';
  }

  switch (type) {
    case 'str':
      value = value.trim();

      if (value === '') {
        value = undefined;
      }

      break;

    case 'inlineStr':
      value = getInlineStringValue();

      if (value === undefined) {
        throw new Error("Unsupported \"inline string\" cell value structure"); // : ${cellNode.textContent}`)
      }

      value = value.trim();

      if (value === '') {
        value = undefined;
      }

      break;

    case 's':
      value = values[parseInt(value)];
      value = value.trim();

      if (value === '') {
        value = undefined;
      }

      break;

    case 'b':
      value = value === '1' ? true : false;
      break;

    case 'z':
      value = undefined;
      break;

    case 'e':
      value = decodeError(value);
      break;

    case 'd':
      if (value === undefined) {
        break;
      }

      value = new Date(value);
      break;

    case 'n':
      if (value === undefined) {
        break;
      }

      value = parseFloat(value);

      var styleId = getStyleId();

      if (styleId) {
        // styleId = parseInt(styleId)
        var style = styles[styleId];

        if (!style) {
          throw new Error("Cell style not found: ".concat(styleId));
        }

        if (BUILT_IN_DATE_NUMBER_FORMAT_IDS.indexOf(parseInt(style.numberFormat.id)) >= 0 || options.dateFormat && style.numberFormat.template === options.dateFormat || options.smartDateParser !== false && style.numberFormat.template && isDateTemplate(style.numberFormat.template)) {
          value = parseExcelDate(value, properties);
        }
      }

      break;

    default:
      throw new TypeError("Cell type not supported: ".concat(type));
  } // Convert empty values to `null`.


  if (value === undefined) {
    value = null;
  }

  return value;
}
function decodeError(errorCode) {
  switch (errorCode) {
    case 0x00:
      return '#NULL!';

    case 0x07:
      return '#DIV/0!';

    case 0x0F:
      return '#VALUE!';

    case 0x17:
      return '#REF!';

    case 0x1D:
      return '#NAME?';

    case 0x24:
      return '#NUM!';

    case 0x2A:
      return '#N/A';

    case 0x2B:
      return '#GETTING_DATA';

    default:
      // Such error code doesn't exist. I made it up.
      return "#ERROR_".concat(errorCode);
  }
}

function isDateTemplate(template) {
  var tokens = template.split(/\W+/);

  for (var _iterator = _createForOfIteratorHelperLoose(tokens), _step; !(_step = _iterator()).done;) {
    var token = _step.value;

    if (['MM', 'DD', 'YY', 'YYYY'].indexOf(token) < 0) {
      return false;
    }
  }

  return true;
}
