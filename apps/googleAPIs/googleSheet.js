const GoogleSheet = function (credentials = "default") {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.sheets = {};
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";

  let alphabet, temp0, temp1;
  temp0 = 'A'.charCodeAt();
  temp1 = 'Z'.charCodeAt();
  alphabet = [];
  for (let i = temp0; i < temp1 + 1; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  this.abc = [];
  for (let i of alphabet) {
    this.abc.push(i);
  }
  for (let i of alphabet) {
    for (let j of alphabet) {
      this.abc.push(i + j);
    }
  }
}

GoogleSheet.prototype.createSheets_promise = function (title) {
  const instance = this;
  return new Promise(function(resolve, reject) {
    instance.sheets.spreadsheets.create({
      resource: {
        properties: {
          title: title
        }
      },
      fields: 'spreadsheetId',
    }, function (err, spreadsheets) {
      if (err) {
        reject(err);
      } else {
        resolve(spreadsheets.data.spreadsheetId);
      }
    });
  });
}

GoogleSheet.prototype.create_newSheets = async function (title, parent) {
  const instance = this;
  const GoogleDrive = require(process.cwd() + "/apps/googleAPIs/googleDrive.js");
  const drive = new GoogleDrive();
  try {
    this.sheets = await this.general.get_app("sheets");
    const sheetsId = await this.createSheets_promise(title);
    await drive.moveFile(sheetsId, parent);
    return sheetsId;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.get_value = async function (id, range) {
  const instance = this;
  try {
    this.sheets = await this.general.get_app("sheets");
    id = this.general.parsingId(id);
    let res = (await this.sheets.spreadsheets.values.get({ spreadsheetId: id, range: range })).data;
    return res.values;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.update_value = async function (id, sheetName, values, startPoint) {
  const instance = this;
  try {
    this.sheets = await this.general.get_app("sheets");
    id = this.general.parsingId(id);
    let range;

    if (values.length > 0) {
      range = sheetName + "!";
      range += this.abc[startPoint[0]] + String(startPoint[1] + 1) + ':';
      range += this.abc[startPoint[0] + values[0].length - 1] + String(startPoint[1] + 1 + values.length - 1);
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: id,
        range: range,
        valueInputOption: "RAW",
        resource: { range: range, values: values },
      });
      return "success";
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.setting_cleanView = async function (id) {
  const instance = this;
  id = this.general.parsingId(id);
  try {
    this.sheets = await this.general.get_app("sheets");
    const request = {
      spreadsheetId: id,
      resource: {
        requests: [
          {
            "updateDimensionProperties": {
              "range": {
                "dimension": "COLUMNS",
                "startIndex": 0,
              },
              "properties": {
                "pixelSize": 120
              },
              "fields": "pixelSize"
            }
          },
          {
            "updateDimensionProperties": {
              "range": {
                "dimension": "ROWS",
                "startIndex": 0,
              },
              "properties": {
                "pixelSize": 30
              },
              "fields": "pixelSize"
            }
          },
          {
            "repeatCell": {
              "range": {
                "startRowIndex": 1,
              },
              "cell": {
                "userEnteredFormat": {
                  "backgroundColor": {
                    "red": 1.0,
                    "green": 1.0,
                    "blue": 1.0
                  },
                  "horizontalAlignment" : "CENTER",
                  "verticalAlignment": "MIDDLE",
                  "textFormat": {
                    "fontSize": 10,
                  }
                }
              },
              "fields": "userEnteredFormat(textFormat,backgroundColor,horizontalAlignment,verticalAlignment)"
            }
          },
          {
            "repeatCell": {
              "range": {
                "startRowIndex": 0,
                "endRowIndex": 1
              },
              "cell": {
                "userEnteredFormat": {
                  "backgroundColor": {
                    "red": 166,
                    "green": 120,
                    "blue": 47
                  },
                  "horizontalAlignment" : "CENTER",
                  "verticalAlignment": "MIDDLE",
                  "textFormat": {
                    "foregroundColor": {
                      "red": 1.0,
                      "green": 1.0,
                      "blue": 1.0
                    },
                    "fontSize": 10,
                    "bold": true
                  }
                }
              },
              "fields": "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)"
            }
          }
        ]
      }
    };
    await this.sheets.spreadsheets.batchUpdate(request);
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.create_newSheets_inPython = async function (title, parent) {
  const instance = this;
  const mother = this.general;
  try {
    const { id } = await mother.pythonExecute(this.pythonApp, [ "sheets", "create" ], { title });
    await mother.pythonExecute(this.pythonApp, [ "drive", "moveFolder" ], { targetId: id, parent: parent });
    return id;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.setting_cleanView_inPython = async function (id) {
  const instance = this;
  const mother = this.general;
  try {
    id = this.general.parsingId(id);
    const result = await mother.pythonExecute(this.pythonApp, [ "sheets", "cleanView" ], { id });
    return result.message;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.update_defaultSheetName_inPython = async function (id, title) {
  const instance = this;
  const mother = this.general;
  try {
    id = this.general.parsingId(id);
    const result = await mother.pythonExecute(this.pythonApp, [ "sheets", "updateDefaultSheetName" ], { id, title });
    return result.message;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.add_newSheet_inPython = async function (id, nameArr) {
  const instance = this;
  const mother = this.general;
  try {
    id = this.general.parsingId(id);
    const result = await mother.pythonExecute(this.pythonApp, [ "sheets", "addSheet" ], { id, nameArr });
    return result.message;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.get_value_inPython = async function (id, range) {
  const instance = this;
  const mother = this.general;
  try {
    id = this.general.parsingId(id);
    let result = await mother.pythonExecute(this.pythonApp, [ "sheets", "get" ], { id, range });
    return result;
  } catch (e) {
    console.log(e);
  }
}

GoogleSheet.prototype.update_value_inPython = async function (id, sheetName, values, startPoint) {
  const instance = this;
  const mother = this.general;
  try {
    let range, result;
    if (values.length > 0) {
      range = sheetName + "!";
      range += this.abc[startPoint[0]] + String(startPoint[1] + 1) + ':';
      range += this.abc[startPoint[0] + values[0].length - 1] + String(startPoint[1] + 1 + values.length - 1);
      id = this.general.parsingId(id);
      result = await mother.pythonExecute(this.pythonApp, [ "sheets", "update" ], { id, range, values });
      return result;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleSheet;
