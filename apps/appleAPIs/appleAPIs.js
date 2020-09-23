const AppleAPIs = function (obj) {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
  if (obj !== undefined) {
    this.folder = obj.folder;
    this.subject = obj.subject;
  } else {
    this.folder = "";
    this.subject = "";
  }
}

AppleAPIs.prototype.setFolder = function (folder) {
  this.folder = folder;
}

AppleAPIs.prototype.setSubject = function (subject) {
  this.subject = subject;
}

AppleAPIs.prototype.text_filter_lite = function (str) {
  for (let i = 0; i < 5; i++) {
    str = str.trim();
    str = str.replace(/^\n/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/ /g, ' ').replace(/  /g, ' ').replace(/ /g, ' ').replace(/\t/g, ' ').replace(/​/g, '');
  }
  return str;
}

AppleAPIs.prototype.readNoteScript = function () {
  let text;
  text = 'tell application "Notes"\n';
  text += '\ttell account "iCloud"\n';
  text += '\t\ttell folder "' + this.folder + '"\n';
  text += '\t\t\tget body of note "' + this.subject + '"\n';
  text += '\t\tend tell\n';
  text += '\tend tell\n';
  text += 'end tell';
  return { name: "readNote", contents: text }
}

AppleAPIs.prototype.readNote = async function (dir = null, clean = true) {
  try {
    let { name, contents } = this.readNoteScript();
    let output = await this.mother.appleScript(name, contents, dir, clean);
    let temp_string = output.replace(/<div>/gi, "__split__").replace(/<[^>]+>/gi, '').replace(/\n/g, "");
    let arr = temp_string.split("__split__");
    let resultArr = [];
    for (let i of arr) {
      if (i !== '') {
        resultArr.push(this.text_filter_lite(i));
      }
    }
    return resultArr;
  } catch (e) {
    console.log(e);
  }
}

module.exports = AppleAPIs;
