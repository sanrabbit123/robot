module.exports = {
  exec: function (options) {
    let h = `


ExecMain.prototype.start = function () {
  var options = ${JSON.stringify(options)};

  var fileObj, pngSaveOptions;

  function open_andPaste(doc, fileName) {
    var curr_file = app.open(new File(options.photo_dir + "/" + fileName));
    if (Number(String(curr_file.width).slice(0, -3)) > Number(String(curr_file.height).slice(0, -3))) {
      curr_file.resizeImage(new UnitValue(1500, "px"), null, 300);
      if (Number(String(curr_file.height).replace(/ px$/g, '')) < 1060) {
        curr_file.resizeImage(null, new UnitValue(1060, "px"), 300);
      }
    } else {
      curr_file.resizeImage(null, new UnitValue(1500, "px"), 300);
      if (Number(String(curr_file.width).replace(/ px$/g, '')) < 1060) {
        curr_file.resizeImage(new UnitValue(1060, "px"), null, 300);
      }
    }
    curr_file.selection.selectAll();
    curr_file.selection.copy();
    curr_file.close(SaveOptions.DONOTSAVECHANGES);
    doc.paste();
  }

  var i = 0;
  var j = Number(options.start_num);
  var doc, photo, left_photo, right_photo, this_doc, photo_sg;

  while (i < options.photo_list.length) {
    this_doc = app.open(new File(options.photo_dir + "/" + options.photo_list[i]));
    photo_sg = (Number(String(this_doc.width).slice(0, -3)) > Number(String(this_doc.height).slice(0, -3))) ? "g" : "s";
    this_doc.close();
    if (photo_sg === "g") {
      app.documents.add(new UnitValue(1500, "px"), new UnitValue(1060, "px"), 300);
      doc = app.activeDocument;
      open_andPaste(doc, options.photo_list[i]);
    } else {
      app.documents.add(new UnitValue(1060, "px"), new UnitValue(1500, "px"), 300);
      doc = app.activeDocument;
      open_andPaste(doc, options.photo_list[i]);
    }
    photo = doc.artLayers[0];
    photo.merge();
    i = i + 1;
    j = j + 1;
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12;
    fileObj = new File(options.result_dir + "/" + 'g' + String(j));
    doc.saveAs(fileObj, jpgSaveOptions);
    doc.close();
  }


}

    `;
    return h;
  }
}
