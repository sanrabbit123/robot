module.exports = {
  exec: function (options, boo) {
    let h = `
let Titles = function (text) {
  this.text = "기본값 설정";
  if (text) {
    this.text = text;
  }
}

Titles.prototype.mother = new Mother();

Titles.prototype.createSetting = {}

Titles.prototype.setCreateSetting = function () {
  this.createSetting = {
    ${(boo === 'P') ? '' : "rev_"}main_title: {
      width: 135.3687,
      height: 25.6722,
      title: ("${(boo === 'P') ? '' : "re"}title" + this.text.${(boo === 'P') ? "p_id" : "r_id"}),
      color: [67, 67, 67],
      fontSize: 21.323,
      font: "SDGothicNeoa-gBd",
      leading: 33.448,
      horizontalScale : 98,
      tracking : -25,
      xy: [[151.185, 0.6], [232.515, 0.6]],
      linecolor: [204,204,204],
      linewidth: 1,
    },
    main_color_title: {
      xy: [],
      linecolor: [211,210,208],
      linewidth: 0.75,
    },
    name_card: {
      xy: [],
      linecolor: [221,221,221],
      linewidth: 1,
    },
  }
}


Titles.prototype.createElements = function (doc, obj) {
  let rectRef = doc.pathItems.rectangle(this.mother.convertMillimeters(obj.height), 0, this.mother.convertMillimeters(obj.width), this.mother.convertMillimeters(obj.height));
  let areaTextRef = doc.textFrames.areaText(rectRef);
  areaTextRef.contents = this.text.sub_titles.${(boo === 'P') ? '' : "rev_"}main_title;
  for (let i = 0; i < areaTextRef.paragraphs.length; i++) {
    areaTextRef.paragraphs[i].paragraphAttributes.justification = Justification.CENTER;
  }
  areaTextRef.textRange.characterAttributes.size = obj.fontSize;
  areaTextRef.textRange.characterAttributes.textFont = textFonts.getByName(obj.font);
  areaTextRef.textRange.characterAttributes.fillColor = this.mother.colorpick(obj);
  areaTextRef.textRange.characterAttributes.autoLeading = false;
  areaTextRef.textRange.characterAttributes.leading = obj.leading;
  areaTextRef.textRange.characterAttributes.horizontalScale = obj.horizontalScale;
  areaTextRef.textRange.characterAttributes.tracking = obj.tracking;
  areaTextRef.selected = true;
}

Titles.prototype.createLines = function (doc, obj) {
  let myLine = doc.pathItems.add();
  myLine.stroked = true;
  myLine.setEntirePath(obj.xy);
  myLine.strokeWidth = obj.linewidth;
  myLine.fillColor = (new NoColor());
  myLine.strokeColor = this.mother.colorpick({ color: obj.linecolor });
  myLine.strokeCap = StrokeCap.ROUNDENDCAP;
}

Titles.prototype.newdoc_setting = function (obj) {
  let newdoc_setting = new DocumentPreset();
  newdoc_setting.colorMode = DocumentColorSpace.RGB;
  newdoc_setting.units = RulerUnits.Millimeters;
  newdoc_setting.rasterResolution = DocumentRasterResolution.HighResolution;
  newdoc_setting.title = obj.title;
  newdoc_setting.height = this.mother.convertMillimeters(obj.height);
  newdoc_setting.width = this.mother.convertMillimeters(obj.width);
  newdoc_setting.numArtboards = 1;
  return newdoc_setting;
}

Titles.prototype.resultXLine = function (targetnode, boo) {
  let title_copy = targetnode.duplicate();
  let title_group = title_copy.createOutline();
  let resultX;
  let compoundsDetailIn = [];
  for (let i = 0; i < title_group.compoundPathItems.length; i++) { if (i !== title_group.compoundPathItems.length - 1) {
    compoundsDetailIn.push(Math.floor(title_group.compoundPathItems[i+1].visibleBounds[1]) - Math.floor(title_group.compoundPathItems[i].visibleBounds[1]));
  }}
  compoundsDetailIn.sort(function (a, b) { return b - a; });
  if (boo === "left") {
    for (let i = 0; i < title_group.compoundPathItems.length; i++) { if (i !== title_group.compoundPathItems.length - 1) { if (Math.floor(title_group.compoundPathItems[i+1].visibleBounds[1]) - Math.floor(title_group.compoundPathItems[i].visibleBounds[1]) === compoundsDetailIn[0]) {
      resultX = title_group.compoundPathItems[i].visibleBounds[0];
    }}}
  } else {
    resultX = title_group.compoundPathItems[0].visibleBounds[2];
  }
  title_group.remove();
  return resultX;
}

ExecMain.prototype.mother = new Mother();

ExecMain.prototype.createDoc = function () {
  app.documents.addDocument("", this.titles.newdoc_setting(this.titles.createSetting["${(boo === 'P') ? '' : "rev_"}main_title"]));
  let this_ai = app.activeDocument;
  this.titles.createElements(this_ai, this.titles.createSetting["${(boo === 'P') ? '' : "rev_"}main_title"]);
  this.titles.createLines(this_ai, this.titles.createSetting["${(boo === 'P') ? '' : "rev_"}main_title"]);
  return this_ai;
}

    `;
    if (boo === 'P') { h += `
ExecMain.prototype.copyDoc = function (target) {
  let templateObj = new File(this.dir + "factory/template/portfolio/subtitles/" + target + ".ai");
  let template_ai = templateObj.get_file();
  let new_file_string = ((target === "word1003") ? this.folder_list.svg.string + "/word1003" + this.text.p_id + "_00" : this.folder_list.main.string + '/' + target + this.text.p_id);
  template_ai.saveAs(new File(new_file_string + ".ai"));
  template_ai.close();
  let fileObj = new File(new_file_string + ".ai");
  let this_ai = fileObj.get_file();
  let general_arr;
  if (target === "word1003") {
    this_ai.layer_select("active").textFrames.getByName("main_color_title").contents = this.text.sub_titles["main_color_title"];
    this.titles.createSetting["main_color_title"].xy = [[this.titles.resultXLine(this_ai.layer_select("active").textFrames.getByName("main_color_title"), "left") - 0.1, 5910.52], [1627, 5910.52]];
    this.titles.createLines(this_ai, this.titles.createSetting["main_color_title"]);
    this_ai.layer_select("active").pathItems.getByName("main_color_objectmain").fillColor = this.mother.colorpick(this.text.sub_titles["main_color_object"]["main"]);
    this.mother.compoundColor(this_ai.layer_select("active").compoundPathItems.getByName("main_color_objectsub"), this.mother.colorpick(this.text.sub_titles["main_color_object"]["sub"]));
    general_arr = this_ai.layer_select("active").textFrames.getByName("homestyling").textRanges;
    for (let z = 0; z < general_arr.length; z++) { general_arr[z].characterAttributes.fillColor = this.mother.colorpick(this.text.sub_titles["main_color_object"]["title"]); }
  } else if (target === "moportivec" || target === "moportivecgaro") {
    this_ai.layer_select("active").textFrames.getByName("portivecmain").contents = this.text.sub_titles["portivec"]["main"];
    this_ai.layer_select("active").textFrames.getByName("portivecregionmethod").contents = this.text.sub_titles["portivec"]["region"] + "  |  " + this.text.sub_titles["portivec"]["method"];
  } else if (target === "porhovec" || target === "porhovecgaro") {
    this_ai.layer_select("active").textFrames.getByName("portivecmain").contents = this.text.sub_titles["portivec"]["main"];
  } else if (target === "portivec" || target === "portivecgaro") {
    this_ai.layer_select("active").textFrames.getByName("portivecmain").contents = this.text.sub_titles["portivec"]["main"];
    this_ai.layer_select("active").textFrames.getByName("portivecsub").contents = this.text.sub_titles["portivec"]["sub"];
    this_ai.layer_select("active").textFrames.getByName("portivecregionmethod").contents = this.text.sub_titles["portivec"]["region"] + "  |  " + this.text.sub_titles["portivec"]["method"];
    this_ai.layer_select("active").textFrames.getByName("portivecregionmethod").textRanges[this.text.sub_titles["portivec"]["region"].length + 2].characterAttributes.fillColor = this.mother.colorpick("#59af89");
  } else if (target === "name" || target === "name2") {
    this_ai.layer_select("active").textFrames.getByName("name_cardmain").contents = this.text.sub_titles["name_card"]["main"];
    this_ai.layer_select("active").textFrames.getByName("name_cardsub").contents = this.text.sub_titles["name_card"]["sub"];
    if (target === "name") {
      this.titles.createSetting["name_card"].xy = [[this.titles.resultXLine(this_ai.layer_select("active").textFrames.getByName("name_cardmain"), "left") + 0.1, -120], [281.157784114166,-120]];
    } else {
      this.titles.createSetting["name_card"].xy = [[0.5,-114], [this.titles.resultXLine(this_ai.layer_select("active").textFrames.getByName("name_cardmain"), "right") + 0.3,-114]];
    }
    this.titles.createLines(this_ai, this.titles.createSetting["name_card"]);
  }
  this_ai.save();
  app.doScript("expandall","contents_maker");
  let exportOptions = new ExportOptionsSVG();
  exportOptions.coordinatePrecision = 7;
  if (target === "name" || target === "name2") {
    new_file_string = this.folder_list.main.string + "/portp" + this.text.p_id + '/' + target + this.text.p_id
  }
  this_ai.exportFile(new File(new_file_string + ".svg"), ExportType.SVG, exportOptions);
  this_ai.close();
}

ExecMain.prototype.start = function () {
  this.titles = new Titles(this.text);
  this.titles.setCreateSetting();

  let this_ai = this.createDoc();
  this_ai.saveAs(new File(this.folder_list.svg.string + '/' + this.titles.createSetting["main_title"].title + ".ai"));
  app.doScript("expandall","contents_maker");
  let exportOptions = new ExportOptionsSVG();
  exportOptions.coordinatePrecision = 7;
  this_ai.exportFile(new File(this.folder_list.svg.string + '/' + this.titles.createSetting["main_title"].title + ".svg"), ExportType.SVG, exportOptions);
  this_ai.close();
  let sub_list = [ "word1003","moportivec","moportivecgaro","porhovec","porhovecgaro","portivec","portivecgaro","name","name2" ];
  for (let i = 0; i < sub_list.length; i++) {
    this.copyDoc(sub_list[i]);
  }
}

    `; }
    else if (boo === 'R') { h += `
ExecMain.prototype.copyDoc = function (target) {
  let templateObj = new File(this.dir + "factory/template/review/subtitles/" + target + ".ai");
  let template_ai = templateObj.get_file();
  let new_file_string;
  if (target === "name2" || target === "resubti") { new_file_string = this.folder_list.rev.string + '/' + target + this.text.r_id; }
  else { new_file_string = this.folder_list.main.string + '/' + target + this.text.r_id; }
  template_ai.saveAs(new File(new_file_string + ".ai"));
  template_ai.close();
  let fileObj = new File(new_file_string + ".ai");
  let this_ai = fileObj.get_file();

  function to_right(dom) {
    let c = dom.duplicate();
    let g = c.createOutline();
    let a = app.activeDocument.artboards[0].artboardRect;
    dom.left = a[2] - g.width - Math.abs(dom.left - g.left);
    g.remove();
  }

  if (target === "morevtivec") {
    this_ai.layer_select("active").textFrames.getByName("revivec_mobile").contents = this.text.sub_titles.revivec.mobile;
  } else if (target === "name2") {
    this_ai.layer_select("active").textFrames.getByName("rev_name_card_main").contents = this.text.sub_titles.rev_name_card.main;
    this_ai.layer_select("active").textFrames.getByName("rev_name_card_sub").contents = this.text.sub_titles.rev_name_card.sub;
    this.titles.createSetting["name_card"].xy = [[0.24,-114], [this.titles.resultXLine(this_ai.layer_select("active").textFrames.getByName("rev_name_card_main"), "right") + 0.3,-114]];
    this.titles.createLines(this_ai, this.titles.createSetting["name_card"]);
  } else if (target === "nu") {
    this_ai.layer_select("active").textFrames.getByName("number").contents = "Review " + ((this.text.r_id.slice(2).slice(0, 1) === '0') ? this.text.r_id.slice(3) : this.text.r_id.slice(2));
    to_right(this_ai.layer_select("active").textFrames.getByName("number"));
  } else if (target === "resubti") {
    this_ai.layer_select("active").textFrames.getByName("rev_name_card_subsub").contents = this.text.sub_titles.rev_name_card.subsub;
    to_right(this_ai.layer_select("active").textFrames.getByName("rev_name_card_subsub"));
  } else if (target === "revhovec") {
    this_ai.layer_select("active").textFrames.getByName("revivec_hover").contents = this.text.sub_titles.revivec.hover;
  } else if (target === "revtivec") {
    this_ai.layer_select("active").textFrames.getByName("revivec_main").contents = this.text.sub_titles.revivec.main;
    this_ai.layer_select("active").textFrames.getByName("revivec_sub").contents = this.text.sub_titles.revivec.sub;
  }
  this_ai.save();
  app.doScript("expandall","contents_maker");
  let exportOptions = new ExportOptionsSVG();
  exportOptions.coordinatePrecision = 7;
  this_ai.exportFile(new File(new_file_string + ".svg"), ExportType.SVG, exportOptions);
  this_ai.close();
}

ExecMain.prototype.start = function () {
  this.titles = new Titles(this.text);
  this.titles.setCreateSetting();

  let this_ai = this.createDoc();
  this_ai.saveAs(new File(this.folder_list.rev.string + '/' + this.titles.createSetting["rev_main_title"].title + ".ai"));
  app.doScript("expandall","contents_maker");
  let exportOptions = new ExportOptionsSVG();
  exportOptions.coordinatePrecision = 7;
  this_ai.exportFile(new File(this.folder_list.rev.string + '/' + this.titles.createSetting["rev_main_title"].title + ".svg"), ExportType.SVG, exportOptions);
  this_ai.close();
  let sub_list = [ "morevtivec", "name2", "nu", "resubti", "revhovec", "revtivec" ];
  for (let i = 0; i < sub_list.length; i++) {
    this.copyDoc(sub_list[i]);
  }
}

    `; }
    return h;
  }
}
