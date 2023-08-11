module.exports = {
  exec: function (options) {
    let h = `

ExecMain.prototype.start = function () {
  var options = ${JSON.stringify(options)};
  var fileObj0, fileObj;
  var origin_photo, this_photo;
  var jpgSaveOptions;
  for (var i = 0; i < this.text.length; i++) {
    fileObj = new File(this.text[i]);
    this_photo = fileObj.get_file();
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12;
    if (options.size !== "3508") {
      if (Number(String(this_photo.width).slice(0, -3)) > Number(String(this_photo.height).slice(0, -3))) {
        app.doAction("to" + options.size + "_garo","to_portfolio");
      } else {
        app.doAction("to" + options.size + "_sero","to_portfolio");
      }
    }
    this_photo.saveAs(new File(this.text[i]), jpgSaveOptions);
    this_photo.close();
  }
}

    `;
    return h;
  }
}
