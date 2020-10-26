module.exports = {
  exec: function (options) {
    let h = `


ExecMain.prototype.start = function () {
  var options = ${JSON.stringify(options)};
  var fileObj, pngSaveOptions;

  function open_andPaste(doc, fileName) {
    var f;
    var curr_file = app.open(new File(options.photo_dir + "/" + fileName));
    if (Number(String(curr_file.width).slice(0, -3)) > Number(String(curr_file.height).slice(0, -3))) {
      f = [ 1500, 1060 ];
    } else {
      f = [ 749, 1060 ];
    }
    curr_file.resizeImage(new UnitValue(f[0], "px"), new UnitValue(f[1], "px"), 300);
    curr_file.selection.selectAll();
    curr_file.selection.copy();
    curr_file.close(SaveOptions.DONOTSAVECHANGES);
    doc.paste();
  }

  var i = 0;
  var j = 0;
  var doc, photo, left_photo, right_photo, this_doc, photo_sg;
  while (i < options.photo_list.length) {
    this_doc = app.open(new File(options.photo_dir + "/" + options.photo_list[i]));
    photo_sg = (Number(String(this_doc.width).slice(0, -3)) > Number(String(this_doc.height).slice(0, -3))) ? "g" : "s";
    this_doc.close();
    app.documents.add(new UnitValue(1500, "px"), new UnitValue(1060, "px"), 300);
    doc = app.activeDocument;
    if (photo_sg === "g") {
      open_andPaste(doc, options.photo_list[i]);
      photo = doc.artLayers[0];
      photo.merge();
      i = i + 1;
      j = j + 1;
    } else {
      if (i < options.photo_list.length - 1) {
        open_andPaste(doc, options.photo_list[i]);
        left_photo = doc.artLayers[0];
        left_photo.translate(new UnitValue(-378, "px"), new UnitValue(0, "px"))
        left_photo.merge();
        open_andPaste(doc, options.photo_list[i + 1]);
        right_photo = doc.artLayers[0];
        right_photo.translate(new UnitValue(378, "px"), new UnitValue(0, "px"))
        right_photo.merge();
        i = i + 2;
        j = j + 1;
      } else {
        alert("numbering error!");
      }
    }
    pngSaveOptions = new PNGSaveOptions();
    fileObj = new File(options.result_dir + "/" + options.apart_name + String(j));
    doc.saveAs(fileObj, pngSaveOptions);
    doc.close();
  }

}

    `;
    return h;
  }
}
