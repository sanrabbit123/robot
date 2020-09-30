const GoogleSheet = function (credentials = "default") {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.sheets = {};
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
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
    range += this.abc[startPoint[0] + values[0].length - 1] + String(startPoint[1] + 1 + values.length - 1);

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


GoogleSheet.prototype.get_value_inPython = async function (id, range) {
  const instance = this;
  const mother = this.general;
  try {
    let result = await mother.pythonExecute(this.pythonApp, [ "sheets", "get" ], { id, range });
    return result;
  } catch (e) {
    console.log(e.message);
  }
}


GoogleSheet.prototype.update_value_inPython = async function (id, sheetName, values, startPoint) {
  const instance = this;
  const mother = this.general;
  try {
    let range = sheetName + "!";
    range += this.abc[startPoint[0]] + String(startPoint[1] + 1) + ':';
    range += this.abc[startPoint[0] + values[0].length - 1] + String(startPoint[1] + 1 + values.length - 1);

    let result = await mother.pythonExecute(this.pythonApp, [ "sheets", "update" ], { id, range, values });
    return result;

  } catch (e) {
    console.log(e.message);
  }
}


GoogleSheet.prototype.total_make = async function () {
  const instance = this;
  try {
    //pass
  } catch (e) {
    console.log(e.message);
  }
}


module.exports = GoogleSheet;
