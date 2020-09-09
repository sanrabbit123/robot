var text = ["/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_01_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_10_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_11_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_12_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_13_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_14_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_15_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_16_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_17_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_18_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_19_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_02_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_20_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_21_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_22_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_23_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_24_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_25_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_26_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_27_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_28_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_29_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_03_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_30_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_04_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_05_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_06_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_07_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_08_200416.jpg","/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/result/원본/김정남_원본_09_200416.jpg"];

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
  this.filename = {};
    
}

    

ExecMain.prototype.start = function () {
  var options = {"home_dir":"/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/","size":"원본"};
  var fileObj0, fileObj;
  var origin_photo, this_photo;
  var jpgSaveOptions;

  if (options.size !== "원본") {
    for (var i = 0; i < this.text.length; i++) {
      fileObj = new File(this.text[i]);
      this_photo = fileObj.get_file();
      jpgSaveOptions = new JPEGSaveOptions();
      jpgSaveOptions.quality = 12;
      if (Number(String(this_photo.width).slice(0, -3)) > Number(String(this_photo.height).slice(0, -3))) {
        app.doAction("to" + options.size + "_garo","to_portfolio");
      } else {
        app.doAction("to" + options.size + "_sero","to_portfolio");
      }
      this_photo.saveAs(new File(this.text[i]), jpgSaveOptions);
      this_photo.close();
    }
  }

}

    
var main = new ExecMain(text, "/Users/baechang-gyu/Library/Mobile Documents/com~apple~CloudDocs/uragen/_BackRobot/contents_maker/");
main.start();
