const NotionAPIs = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/notionAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

NotionAPIs.prototype.addNewRow = async function (obj) {
  const instance = this;
  try {
    return (await this.mother.pythonExecute(this.pythonApp, obj, [ "single" ]));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.addNewRows = async function (arr) {
  const instance = this;
  try {
    if (!Array.isArray(arr)) { throw new Error("invaild type") }
    return (await this.mother.pythonExecute(this.pythonApp, arr, [ "multiple" ]));
  } catch (e) {
    console.log(e);
  }
}

NotionAPIs.prototype.launching = async function () {
  const instance = this;
  try {

    // let obj = {
    //   title: "title38",
    //   multi: [ "m1", "m4", "m1" ],
    //   select: "s4",
    //   number: 200,
    //   email: "uragenbooks@gmail.com",
    //   text: "hello?",
    //   phone: "010-2747-3403",
    //   day: "2020-04-01"
    // };
    // console.log(await this.addNewRow(obj));


    let obj = [
      {
        title: "title40",
        multi: [ "m1", "m4", "m1" ],
        select: "s4",
        number: 200,
        email: "uragenbooks@gmail.com",
        text: "hello?",
        phone: "010-2747-3403",
        day: "2020-04-01"
      },
      {
        title: "title41",
        multi: [ "m1", "m4", "m1" ],
        select: "s4",
        number: 200,
        email: "uragenbooks@gmail.com",
        text: "hello?",
        phone: "010-2747-3403",
        day: "2020-04-01"
      },
      {
        title: "title42",
        multi: [ "m1", "m4", "m1" ],
        select: "s4",
        number: 200,
        email: "uragenbooks@gmail.com",
        text: "hello?",
        phone: "010-2747-3403",
        day: "2020-04-01"
      },
      {
        title: "title43",
        multi: [ "m1", "m4", "m1" ],
        select: "s4",
        number: 200,
        email: "uragenbooks@gmail.com",
        text: "hello?",
        phone: "010-2747-3403",
        day: "2020-04-01"
      },
      {
        title: "title44",
        multi: [ "m1", "m4", "m1" ],
        select: "s4",
        number: 200,
        email: "uragenbooks@gmail.com",
        text: "hello?",
        phone: "010-2747-3403",
        day: "2020-04-01"
      },
    ];


    console.log(await this.addNewRows(obj));


  } catch (e) {
    console.log(e);
  }
}

module.exports = NotionAPIs;
