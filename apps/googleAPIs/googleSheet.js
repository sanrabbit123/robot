const GoogleSheet = function (credentials = "default") {
  const GoogleAPIs = require("./googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.sheets = {};
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  this.abc = [];
  for (let i of alphabet) { this.abc.push(i); }
  for (let i of alphabet) { for (let j of alphabet) { this.abc.push(i + j); } }
}

GoogleSheet.prototype.get_value = async function (id, range) {
  const instance = this;
  try {
    this.sheets = await this.general.get_app("sheets");
    let res = (await this.sheets.spreadsheets.values.get({ spreadsheetId: id, range: range })).data;
    return res.values;
  } catch (e) {
    console.log(e.message);
  }
}


GoogleSheet.prototype.update_value = async function (id, sheetName, values, startPoint) {
  const instance = this;
  try {
    this.sheets = await this.general.get_app("sheets");

    let range = sheetName + "!";
    range += this.abc[startPoint[0]] + String(startPoint[1] + 1) + ':';
    range += this.abc[values[0].length - 1] + String(values.length + 1);

    await this.sheets.spreadsheets.values.update({
      spreadsheetId: id,
      range: range,
      valueInputOption: "RAW",
      resource: { range: range, values: values },
    });

  } catch (e) {
    console.log(e.message);
  }
}


GoogleSheet.prototype.total_make = async function () {
  let instance = this;
  try {

    // const rows = await this.get_value('1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', 'sheet1!A2:E');
    // console.log(rows);

  } catch (e) {
    console.log(e.message);
  }
}


module.exports = GoogleSheet;
