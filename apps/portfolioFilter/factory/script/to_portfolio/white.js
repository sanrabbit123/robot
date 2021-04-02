module.exports = {
  exec: function (options) {
    let h = `

ExecMain.prototype.start = function () {
  var CONSTWIDTH = 3508;
  var CONSTHEIGHT = 2480;
  var CONSTDENSITY = 300;
  var CONSTEA = "px";
  var FILES = this.text;
  var moveLayer = function (layer, x, y) {
    var position = layer.bounds;
    position[0] = x - position[0];
    position[1] = y - position[1];
    layer.translate((-1 * position[0]), (-1 * position[1]));
  }

  var newPhoto, thisPhoto;
  var newPhoto_ratio;
  var thisPhoto_width, thisPhoto_height, thisPhoto_ratio;
  var fixBoo;
  var moveDirection, moveAmount;
  var psdSaveOptions;
  var newFile, newFileArr, newFileName;
  var pastFileName;

  for (var i = 0; i < FILES.length; i++) {
    thisPhoto = app.open(new File(FILES[i]));
    thisPhoto_width = Number(String(thisPhoto.width).slice(0, -3));
    thisPhoto_height = Number(String(thisPhoto.height).slice(0, -3));
    thisPhoto_ratio = thisPhoto_width / thisPhoto_height;

    fixBoo = true;
    if (thisPhoto_ratio > 1) {

      newPhoto = app.documents.add(new UnitValue(CONSTWIDTH, CONSTEA), new UnitValue(CONSTHEIGHT, CONSTEA), CONSTDENSITY);
      newPhoto_ratio = CONSTWIDTH / CONSTHEIGHT;
      thisPhoto.close(SaveOptions.DONOTSAVECHANGES);
      thisPhoto = app.open(new File(FILES[i]));

      if (thisPhoto_ratio > newPhoto_ratio) {
        moveDirection = "x";
        moveAmount = (CONSTWIDTH - (CONSTHEIGHT * thisPhoto_ratio)) / 2;
        thisPhoto.resizeImage(new UnitValue((CONSTHEIGHT * thisPhoto_ratio), CONSTEA));
      } else {
        moveDirection = "y";
        moveAmount = (CONSTHEIGHT - (CONSTWIDTH / thisPhoto_ratio)) / 2;
        thisPhoto.resizeImage(new UnitValue(CONSTWIDTH, CONSTEA));
      }

    } else if (thisPhoto_ratio < 1) {

      newPhoto = app.documents.add(new UnitValue(CONSTHEIGHT, CONSTEA), new UnitValue(CONSTWIDTH, CONSTEA), CONSTDENSITY);
      newPhoto_ratio = CONSTHEIGHT / CONSTWIDTH;
      thisPhoto.close(SaveOptions.DONOTSAVECHANGES);
      thisPhoto = app.open(new File(FILES[i]));

      if (thisPhoto_ratio > newPhoto_ratio) {
        moveDirection = "x";
        moveAmount = (CONSTHEIGHT - (CONSTWIDTH * thisPhoto_ratio)) / 2;
        thisPhoto.resizeImage(new UnitValue((CONSTWIDTH * thisPhoto_ratio), CONSTEA));
      } else {
        moveDirection = "y";
        moveAmount = (CONSTWIDTH - (CONSTHEIGHT / thisPhoto_ratio)) / 2;
        thisPhoto.resizeImage(new UnitValue(CONSTHEIGHT, CONSTEA));
      }

    }

    thisPhoto.selection.selectAll();
    thisPhoto.selection.copy();
    thisPhoto.close(SaveOptions.DONOTSAVECHANGES);
    newPhoto.paste();
    if (moveDirection === "x") {
      moveLayer(newPhoto.artLayers[0], moveAmount, 0);
    } else {
      moveLayer(newPhoto.artLayers[0], 0, moveAmount);
    }
    // newPhoto.artLayers[0].merge();
    psdSaveOptions = new PhotoshopSaveOptions();
    psdSaveOptions.embedColorProfile = true;
    psdSaveOptions.alphaChannels = true;

    newFileArr = FILES[i].split("/");
    newFileArr[newFileArr.length - 2] = newFileArr[newFileArr.length - 2].replace(/resource/gi, "result");
    pastFileName = newFileArr.pop();
    pastFileName = pastFileName.replace(/jpg/gi, "psd").replace(/jpeg/gi, "psd");
    newFileArr.push('A');
    newFileArr.push(pastFileName);
    newFileName = newFileArr.join("/");
    newFile = new File(newFileName);

    newPhoto.saveAs(newFile, psdSaveOptions);
    newPhoto.close();
  }

}

    `;
    return h;
  }
}
