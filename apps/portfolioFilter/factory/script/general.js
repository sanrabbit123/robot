module.exports = {
  exec: function (text, options) {
    let h = `var text = ${JSON.stringify(text)};

String.prototype.splice = function(start, newStr) { return this.slice(0, start) + newStr + this.slice(start); }

Folder.prototype.get_file = function (index) {
  var ka = this.getFiles();
  var file = app.open(ka[index]);
  file.layer_select = function (m) { return this.layers.getByName(m); }
  file.artboard_select = function (m) { return this.artboards.getByName(m); }
  return file;
}

File.prototype.get_file = function () {
  var file = app.open(this);
  file.layer_select = function (m) { return this.layers.getByName(m); }
  file.artboard_select = function (m) { return this.artboards.getByName(m); }
  return file;
}

var ExecMain = function (text, dir) {
  this.list = [ "desktop", "mobile" ];
  if (dir.slice(-1) !== '/') {
    this.dir = dir + '/';
  } else {
    this.dir = dir;
  }
  this.text = text;
}

var Mother = function () {
}

    `;
    return h;
  }
}
