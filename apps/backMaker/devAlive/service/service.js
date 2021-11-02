const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const SERVICE_DIR = process.cwd() + "/apps/backMaker/alive/service";
const { DateParse } = require(GENERAL_DIR + "/generator.js");
const CoreSetting = require(SERVICE_DIR + "/serviceCore/serviceCore.js");
const ChecklistSetting = require(SERVICE_DIR + "/serviceChecklist/serviceChecklist.js");

const Service = function (json) {
  this.serid = json.serid;
  this.key = json.key;
  this.date = new DateParse(json.date);
  this.kind = json.kind;
  if (this.kind === "service") {
    this.setting = new CoreSetting(json.setting);
  } else if (this.kind === "checklist") {
    this.setting = new ChecklistSetting(json.setting);
  } else {
    throw new Error("invaild kind");
  }
}

Service.prototype.toNormal = function () {
  let obj = {};
  obj.serid = this.serid;
  obj.key = this.key;
  obj.date = this.date.toNormal();
  obj.kind = this.kind;
  obj.setting = this.setting.toNormal();
  return obj;
}

Service.prototype.toMatrix = function () {
  const { title, checklist } = this.setting.contents;
  let matrix;
  let num;

  matrix = [ [ title, "" ] ];
  num = 0;
  for (let { title, children } of checklist) {
    matrix.push([ String(num + 1), title ]);
    for (let obj of children) {
      matrix.push([ obj.title, obj.contents.replace(/\<[ub]\%/gi, '').replace(/\%[ub]\>/gi, '') ]);
    }
    num++;
  }

  return matrix;
}

Service.prototype.uploadAppleNote = async function () {
  if (this.kind !== "checklist") {
    throw new Error("only available in checklist");
  }
  const AppleNotes = require(`${process.cwd()}/apps/appleAPIs/appleNotes.js`);
  const br = "<br><br>";
  const colon = ". ";
  const { title, checklist } = this.setting.contents;
  let body;
  let num;
  let note;
  try {
    body = '';
    body += title;
    body += br;

    body += this.setting.target.collection;
    body += br;
    body += this.setting.target.action;
    body += br;

    num = 0;
    for (let { title, children } of checklist) {
      body += "_" + String(num + 1) + " " + title;
      body += br;
      for (let { title, contents } of children) {
        body += "T" + colon + title;
        body += "<br>";
        body += "C" + colon + contents.replace(/\<b\%/gi, "[").replace(/\%b\>/gi, "]");
        body += br;
      }
      num++;
    }

    note = new AppleNotes({ folder: "checklist", subject: this.key });
    await note.createNote(body);
  } catch (e) {
    console.log(e);
  }
}

module.exports = Service;
