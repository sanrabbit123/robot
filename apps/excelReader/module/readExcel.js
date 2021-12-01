const _xml = require("./xml/xml.js");
const _fs = require("fs");
const _stream = require("stream");
const _unzipper = require("./unzipper/index.js");
const _parseProperties = require("./read/parseProperties.js");
const _parseFilePaths = require("./read/parseFilePaths.js");
const _parseStyles = require("./read/parseStyles.js");
const _parseSharedStrings = require("./read/parseSharedStrings.js");
const _parseSheet = require("./read/parseSheet.js");

const unpackXlsxFile = function (input) {
  let entries = {};
  let stream = input instanceof _stream ? input : _fs.createReadStream(input);
  return new Promise(function (resolve, reject) {
    let entryPromises = [];
    stream.on('error', reject).pipe(_unzipper.Parse()).on('error', reject).on('close', function () {
      return Promise.all(entryPromises).then(function () { return resolve(entries); });
    }).on('entry', function (entry) {
      let contents = '';
      entryPromises.push(new Promise(function (resolve) {
        entry.on('data', function (data) {
          return contents += data.toString();
        }).on('end', function () {
          return resolve(entries[entry.path] = contents);
        });
      }));
    });
  });
}

const getData = function (sheet, options) {
  const _createForOfIteratorHelperLoose = function (o, allowArrayLike) { let it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (it) return (it = it.call(o)).next.bind(it); if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; let i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  const _unsupportedIterableToArray = function (o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); let n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
  const _arrayLikeToArray = function (arr, len) { if (len == null || len > arr.length) len = arr.length; for (let i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
  const _nonIterableRest = function () { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
  const _iterableToArrayLimit = function (arr, i) { let _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; let _arr = []; let _n = true; let _d = false; let _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
  const _arrayWithHoles = function (arr) { if (Array.isArray(arr)) return arr; }
  const _slicedToArray = function (arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
  const dropEmptyRows = function (data) {
    let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        rowMap = _ref.rowMap,
        _ref$accessor = _ref.accessor,
        accessor = _ref$accessor === void 0 ? function (_) {
      return _;
    } : _ref$accessor,
        onlyTrimAtTheEnd = _ref.onlyTrimAtTheEnd;

    let i = data.length - 1;

    while (i >= 0) {
      let empty = true;

      for (let _iterator = _createForOfIteratorHelperLoose(data[i]), _step; !(_step = _iterator()).done;) {
        let cell = _step.value;

        if (accessor(cell) !== null) {
          empty = false;
          break;
        }
      }

      if (empty) {
        data.splice(i, 1);

        if (rowMap) {
          rowMap.splice(i, 1);
        }
      } else if (onlyTrimAtTheEnd) {
        break;
      }

      i--;
    }

    return data;
  }
  const dropEmptyColumns = function (data) {
    let _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$accessor = _ref.accessor,
        accessor = _ref$accessor === void 0 ? function (_) {
      return _;
    } : _ref$accessor,
        onlyTrimAtTheEnd = _ref.onlyTrimAtTheEnd;

    let i = data[0].length - 1;

    while (i >= 0) {
      let empty = true;

      for (let _iterator = _createForOfIteratorHelperLoose(data), _step; !(_step = _iterator()).done;) {
        let row = _step.value;

        if (accessor(row[i]) !== null) {
          empty = false;
          break;
        }
      }

      if (empty) {
        let j = 0;

        while (j < data.length) {
          data[j].splice(i, 1);
          j++;
        }
      } else if (onlyTrimAtTheEnd) {
        break;
      }

      i--;
    }

    return data;
  }
  let dimensions = sheet.dimensions,
      cells = sheet.cells;

  if (cells.length === 0) {
    return [];
  }

  let _dimensions = _slicedToArray(dimensions, 2),
      leftTop = _dimensions[0],
      rightBottom = _dimensions[1];

  let colsCount = rightBottom.column;
  let rowsCount = rightBottom.row;

  let data = new Array(rowsCount);
  let i = 0;

  while (i < rowsCount) {
    data[i] = new Array(colsCount);
    let j = 0;

    while (j < colsCount) {
      data[i][j] = null;
      j++;
    }

    i++;
  }

  for (let _iterator = _createForOfIteratorHelperLoose(cells), _step; !(_step = _iterator()).done;) {
    let cell = _step.value;
    let rowIndex = cell.row - 1;
    let columnIndex = cell.column - 1;
    data[rowIndex][columnIndex] = cell.value;
  }

  let rowMap = options.rowMap;

  if (rowMap) {
    let _i2 = 0;

    while (_i2 < data.length) {
      rowMap[_i2] = _i2;
      _i2++;
    }
  }

  data = dropEmptyRows(dropEmptyColumns(data, {
    onlyTrimAtTheEnd: true
  }), {
    onlyTrimAtTheEnd: true,
    rowMap: rowMap
  });
  if (options.transformData) {
    data = options.transformData(data);
  }

  return data;
};

const readXlsx = function (contents, xml) {
  let options = { sheet: 1 };
  let getXmlFileContent = (filePath) => { return contents[filePath]; };
  let filePaths = _parseFilePaths.default(getXmlFileContent('xl/_rels/workbook.xml.rels'), xml);
  let values = filePaths.sharedStrings ? _parseSharedStrings.default(getXmlFileContent(filePaths.sharedStrings), xml) : [];
  let styles = filePaths.styles ? _parseStyles.default(getXmlFileContent(filePaths.styles), xml) : {};
  let properties = _parseProperties.default(getXmlFileContent('xl/workbook.xml'), xml);
  if (options.getSheets) {
    return properties.sheets.map(function (_ref) {
      let name = _ref.name;
      return {
        name: name
      };
    });
  }
  const getSheetId = (sheet, sheets) => {
    let _sheet = sheets[sheet - 1];
    return _sheet && _sheet.relationId;
  }
  let sheetId = getSheetId(options.sheet, properties.sheets);
  let sheet = _parseSheet.default(getXmlFileContent(filePaths.sheets[sheetId]), xml, values, styles, properties, options);
  let data = getData(sheet, options);
  if (options.properties) {
    return {
      data: data,
      properties: properties
    };
  }
  return data;
}

module.exports = (input) => {
  return unpackXlsxFile(input).then((entries) => {
    return readXlsx(entries, _xml.default);
  });
};
