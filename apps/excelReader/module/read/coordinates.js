"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateDimensions = calculateDimensions;
exports.parseCellCoordinates = parseCellCoordinates;
var LETTERS = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function calculateDimensions(cells) {
  var comparator = function comparator(a, b) {
    return a - b;
  };

  var allRows = cells.map(function (cell) {
    return cell.row;
  }).sort(comparator);
  var allCols = cells.map(function (cell) {
    return cell.column;
  }).sort(comparator);
  var minRow = allRows[0];
  var maxRow = allRows[allRows.length - 1];
  var minCol = allCols[0];
  var maxCol = allCols[allCols.length - 1];
  return [{
    row: minRow,
    column: minCol
  }, {
    row: maxRow,
    column: maxCol
  }];
}
function columnLettersToNumber(columnLetters) {
  var n = 0;
  var i = 0;

  while (i < columnLetters.length) {
    n *= 26;
    n += LETTERS.indexOf(columnLetters[i]);
    i++;
  }

  return n;
}

function parseCellCoordinates(coords) {
  // Coordinate examples: "AA2091", "R988", "B1".
  coords = coords.split(/(\d+)/);
  return [// Row.
  parseInt(coords[1]), // Column.
  columnLettersToNumber(coords[0].trim())];
}
