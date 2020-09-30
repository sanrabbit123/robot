module.exports = {
  exec: function (options) {
    let h = `

ExecMain.prototype.start = function () {
  let options = ${JSON.stringify(options)};
  let fileObj0, fileObj;
  let origin_photo, this_photo;
  let jpgSaveOptions;

  if (this.text.r_id !== "re999") {
    fileObj0 = new File(options.photo_dir + "/" + options.photo_list[this.text.r_info.photodae[1] - 1]);
    origin_photo = fileObj0.get_file();
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12;
    origin_photo.saveAs(new File(this.folder_list.portp.string + "/b1" + this.text.p_id + ".jpg"), jpgSaveOptions);
    origin_photo.close();
    fileObj = new File(this.folder_list.portp.string + "/b1" + this.text.p_id + ".jpg");
    this_photo = fileObj.get_file();
    app.doAction("image_b","contents_maker");
    this_photo.saveAs(new File(this.folder_list.portp.string + "/b1" + this.text.p_id), jpgSaveOptions);
    this_photo.close();
  }

  for (let i = 0; i < options.photo_list.length; i++) {

    fileObj0 = new File(options.photo_dir + "/" + options.photo_list[i]);
    origin_photo = fileObj0.get_file();
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 12;
    origin_photo.saveAs(new File(this.folder_list.portp.string + '/' + options.new_photo_list[i]), jpgSaveOptions);
    origin_photo.close();

    fileObj0 = new File(options.photo_dir + "/" + options.photo_list[i]);
    origin_photo = fileObj0.get_file();
    origin_photo.saveAs(new File(this.folder_list.mobile.string + '/mo' + options.new_photo_list[i]), jpgSaveOptions);
    origin_photo.close();

    fileObj = new File(this.folder_list.portp.string + '/' + options.new_photo_list[i]);
    this_photo = fileObj.get_file();
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 11;
    if (Number(String(this_photo.width).slice(0, -3)) > Number(String(this_photo.height).slice(0, -3))) {
      app.doAction("image_garo","contents_maker");
    } else {
      app.doAction("image_sero","contents_maker");
    }
    this_photo.saveAs(new File(this.folder_list.portp.string + '/' + options.new_photo_list[i]), jpgSaveOptions);
    this_photo.close();
    fileObj = new File(this.folder_list.mobile.string + '/mo' + options.new_photo_list[i]);
    this_photo = fileObj.get_file();
    jpgSaveOptions = new JPEGSaveOptions();
    jpgSaveOptions.quality = 8;
    if (Number(String(this_photo.width).slice(0, -3)) > Number(String(this_photo.height).slice(0, -3))) {
      app.doAction("image_mogaro","contents_maker");
    } else {
      app.doAction("image_mosero","contents_maker");
    }
    this_photo.saveAs(new File(this.folder_list.mobile.string + '/mo' + options.new_photo_list[i]), jpgSaveOptions);
    this_photo.close();
  }
}

    `;
    return h;
  }
}
