module.exports = async function (Mother) {
  /*
  {
    lines: [
      {
        name: "",
        values: [
          { name: "", value: { add: [], subtract: [] } },
          { name: "", value: { add: [], subtract: [] } },
        ]
      },
    ],
    circle: []
  }
  */
  const { fileSystem } = Mother;
  const GoogleSheet = require(process.cwd() + "/apps/googleAPIs/googleSheet.js");
  const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");
  const sheet = new GoogleSheet();
  const analytics = new GoogleAnalytics();
  const numberFilter = function (str) {
    let newStr = str.replace(/[^0-9\-]/g, '');
    if (newStr === "-" || newStr === "") { return 0; }
    else { return Number(newStr); }
  }

  let rawArr = {};
  let resultObj = { lines: [], circle: [] };
  let tempObj, tempObj2;
  let rawObj;

  try {
    rawArr.first = await sheet.get_value_inPython("152PKTPNhEfRX31JiKmDqUSaiburcXBcwGdK3lYHOQWg", "시트1!B1:V12");
    rawArr.second = await analytics.getUsers();
    rawArr.third = await sheet.get_value_inPython("10diBorehqlUtLCetbJ6tBirL0ONTZFmyh-VYEuxFhnE", "지표!A1:R55");
    const { first, second, third } = rawArr;

    //first : in and out
    const [ firstStandard ] = first;
    tempObj = {};
    tempObj.name = "inOut";
    tempObj.values = [];
    for (let i = 0; i < firstStandard.length; i++) {
      tempObj2 = {};
      tempObj2.add = [];
      tempObj2.add.push(numberFilter(first[4][i]));
      tempObj2.add.push(numberFilter(first[5][i]));
      tempObj2.subtract = [];
      tempObj2.subtract.push(numberFilter(first[11][i]));
      tempObj.values.push({ name: firstStandard[i], value: tempObj2 })
    }
    resultObj.lines.push(tempObj);
    await fileSystem(`write`, [ `${process.cwd()}/temp/secondIR0.json`, JSON.stringify(resultObj, null, 2) ]);

    //second
    rawObj = await analytics.getUsers();
    tempObj = {};
    tempObj.name = "users";
    tempObj.values = [];
    



    //third




    return resultObj;
  } catch (e) {
    console.log(e);
  }
}
