const AppleNotes = function (obj) {
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

AppleNotes.prototype.setFolder = function (folder) {
  this.folder = folder;
}

AppleNotes.prototype.setSubject = function (subject) {
  this.subject = subject;
}

AppleNotes.prototype.text_filter_lite = function (str) {
  for (let i = 0; i < 5; i++) {
    str = str.trim();
    str = str.replace(/^\n/g, '').replace(/^ /g, '').replace(/ $/g, '').replace(/ /g, ' ').replace(/  /g, ' ').replace(/ /g, ' ').replace(/\t/g, ' ').replace(/​/g, '');
  }
  return str;
}

AppleNotes.prototype.readNoteScript = function () {
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

AppleNotes.prototype.updateNoteScript = function (body = "new") {
  let text;
  text = 'tell application "Notes"\n';
  text += '\ttell account "iCloud"\n';
  text += '\t\ttell folder "' + this.folder + '"\n';
  text += `\t\t\tset body of note "${this.subject}" to "${this.subject}<br>${body}"\n`;
  text += '\t\tend tell\n';
  text += '\tend tell\n';
  text += 'end tell';
  return { name: "writeNote", contents: text }
}

AppleNotes.prototype.createNoteScript = function (body = "new") {
  let text;
  text = 'tell application "Notes"\n';
  text += '\ttell account "iCloud"\n';
  text += '\t\ttell folder "' + this.folder + '"\n';
  text += `\t\t\tmake new note with properties {name:"${this.subject}", body:"${body}"}\n`;
  text += '\t\tend tell\n';
  text += '\tend tell\n';
  text += 'end tell';
  return { name: "createNote", contents: text }
}

AppleNotes.prototype.readNote = async function (dir = null, clean = true) {
  try {
    let { name, contents } = this.readNoteScript();
    let output = await this.mother.appleScript(name, contents, dir, clean, true);
    let temp_string = output.replace(/<div>/gi, "__split__").replace(/<[^>]+>/gi, '').replace(/\n/g, "");
    let arr = temp_string.split("__split__");
    let resultArr = [];
    for (let i of arr) {
      if (i.trim() !== '') {
        resultArr.push(this.text_filter_lite(i));
      }
    }
    let final = [];
    for (let i of resultArr) {
      if (i.length !== 0) {
        final.push(i);
      }
    }
    return final;
  } catch (e) {
    console.log(e);
  }
}

AppleNotes.prototype.createNote = async function (newBody = "new", dir = null, clean = true) {
  try {
    let { name, contents } = this.createNoteScript(newBody);
    await this.mother.appleScript(name, contents, dir, clean, true);
    return "done";
  } catch (e) {
    console.log(e);
  }
}

AppleNotes.prototype.updateNote = async function (newBody = "new", dir = null, clean = true) {
  try {
    let { name, contents } = this.updateNoteScript(newBody);
    await this.mother.appleScript(name, contents, dir, clean, true);
    return "done";
  } catch (e) {
    console.log(e);
  }
}

module.exports = AppleNotes;
