module.exports = {
  exec: function (options, boo) {
    let h = `
ExecMain.prototype.mother = new Mother();
    `;
    if (boo === 'P') { h += `

ExecMain.prototype.create_init = function (order) {
  let list = this.list;
  let new_file_name = {};
  let fileObj_temp = {};
  let this_ai_temp = {};
  for (let i = 0; i < list.length; i++) {
    new_file_name[list[i]] = ((list[i] === "desktop") ? '' : "mo") + "word1003" + this.text.p_id + '_' + '0' + String(order + 1);
    fileObj_temp[list[i]] = new File(this.dir + "factory/template/portfolio/" + list[i] + "/template.ai");
    this_ai_temp[list[i]] = fileObj_temp[list[i]].get_file();
    this_ai_temp[list[i]].saveAs(new File(this.folder_list.svg.string + '/' + new_file_name[list[i]] + ".ai"));
    this_ai_temp[list[i]].close();
  }
  this.filename = new_file_name;
}

ExecMain.prototype.create = function (order, boo) {
  let fileObj = new File(this.folder_list.svg.string + '/' + this.filename[boo] + ".ai");
  let this_ai = fileObj.get_file();
  let margin = {
    desktop_hs_up: 35,
    desktop_hs_down: 17.9,
  }

  let contents_obj = {};
  for (let sub in this.text.contents[order]) { if (sub !== "title" && sub !== "photo_key") {
    contents_obj[sub] = new Mileo(this.text.contents[order][sub], this_ai.layer_select("contents").pageItems.getByName(sub), boo);
  }}
  contents_obj.main_contents.execute();
  let past_art, past_rect;
  past_art = this_ai.artboard_select("art1").artboardRect;
  past_rect = this_ai.layer_select("contents").pathItems.rectangle(past_art[0], past_art[1], past_art[2], -1 * past_art[3]);

  if (boo === "desktop") {
    this_ai.layer_select("contents").pageItems.getByName("designer").contents = this.text.suggestion;
  }
  if (this.text.contents[order].smalltalk_yn === "+ HomeLiaison's small talk" && boo === "desktop") {
    contents_obj.smalltalk_contents.execute();
    contents_obj.smalltalk_yn.nameItem.top = contents_obj.main_contents.return_bottom() + 1 - margin.desktop_hs_up;
    contents_obj.smalltalk_contents.nameItem.top = contents_obj.smalltalk_yn.return_bottom() + 1 - margin.desktop_hs_down;
    past_rect.height = Math.abs(contents_obj.smalltalk_contents.return_bottom());
  } else {
    contents_obj.smalltalk_yn.nameItem.remove();
    contents_obj.smalltalk_contents.nameItem.remove();
    past_rect.height = Math.abs(contents_obj.main_contents.return_bottom());
  }

  let new_art = this_ai.artboards.add(past_rect.geometricBounds);
  past_rect.remove();
  this_ai.artboard_select("art1").remove();
  this_ai.artboards[0].name = "art1";

  this_ai.save();
  for (let i = 0; i < this_ai.layer_select("contents").pageItems.length; i++) { this_ai.layer_select("contents").pageItems[i].createOutline(); }
  let exportOptions = new ExportOptionsSVG();
  exportOptions.coordinatePrecision = 7;
  app.activeDocument.exportFile(new File(this.folder_list.svg.string + '/' + this.filename[boo] + ".svg"), ExportType.SVG, exportOptions);
  this_ai.close();
}

ExecMain.prototype.start = function () {
  for (let b = 0; b < this.text.contents.length; b++) {
    this.create_init(b);
    for (let j = 0; j < this.list.length; j++) { this.create(b, this.list[j]); }
  }
}

    `; }
    else if (boo === 'R') { h += `
ExecMain.prototype.create_init = function (order) {
  let list = this.list;
  let new_file_name = {};
  let fileObj_temp = {};
  let this_ai_temp = {};
  for (let i = 0; i < list.length; i++) {
    new_file_name[list[i]] = ((list[i] === "desktop") ? '' : "mo") + "reword" + this.text.r_id + '_' + '0' + String(order + 1);
    fileObj_temp[list[i]] = new File(this.dir + "factory/template/review/" + list[i] + "/template" + ((order === 0) ? '' : 'p') +  ".ai");
    this_ai_temp[list[i]] = fileObj_temp[list[i]].get_file();
    this_ai_temp[list[i]].saveAs(new File(this.folder_list.rev.string + '/' + new_file_name[list[i]] + ".ai"));
    this_ai_temp[list[i]].close();
  }
  this.filename = new_file_name;
}

ExecMain.prototype.create = function (order, boo) {
  let fileObj = new File(this.folder_list.rev.string + '/' + this.filename[boo] + ".ai");
  let this_ai = fileObj.get_file();
  let margin = {
    desktop: {
      qa: 20.2763139294984,
      mun: 52.39212348109538,
    },
    mobile: {
      qa: 27.53133711473618,
      mun: 38.59394451040314,
    }
  }
  let nodes_name;
  if (order !== 0) { nodes_name = [ "mark_q", "mark_a", "quest", "answer" ]; }
  else { nodes_name = [ "answer" ]; }

  let temp_node, nodes = [];
  for (let i = 0; i < this.text.reviews[order].contents.length; i++) {
    nodes.push({});
    for (let j = 0; j < nodes_name.length; j++) {
      temp_node = this_ai.pageItems.getByName(nodes_name[j]).duplicate();
      temp_node.name = nodes_name[j] + String(i);
      nodes[i][nodes_name[j]] = {};
      nodes[i][nodes_name[j]]["node"] = temp_node;
    }
  }
  for (let j = 0; j < nodes_name.length; j++) {
    this_ai.pageItems.getByName(nodes_name[j]).remove();
  }
  for (let i = 0; i < nodes.length; i++) {
    for (let j = 0; j < nodes_name.length; j++) { if (nodes_name[j] !== "mark_q" && nodes_name[j] !== "mark_a") {
      nodes[i][nodes_name[j]]["instance"] = new Mileo(this.text.reviews[order].contents[i][nodes_name[j]], nodes[i][nodes_name[j]]["node"], boo);
      nodes[i][nodes_name[j]]["instance"].execute();
    }}
  }

  if (order !== 0) {
    for (let i = 0; i < nodes.length; i++) {
      if (i !== 0) {
        nodes[i]["quest"]["node"].top = (Math.abs(nodes[i-1]["answer"]["instance"].return_bottom()) + margin[boo].mun) * -1;
        nodes[i]["mark_q"]["node"].top = (Math.abs(nodes[i-1]["answer"]["instance"].return_bottom()) + margin[boo].mun + 1.4) * -1;
      }
      nodes[i]["answer"]["node"].top = (Math.abs(nodes[i]["quest"]["instance"].return_bottom()) + margin[boo].qa) * -1;
      nodes[i]["mark_a"]["node"].top = (Math.abs(nodes[i]["quest"]["instance"].return_bottom()) + margin[boo].qa + 1.4) * -1;
    }
  }

  let past_art, past_rect;
  past_art = this_ai.artboard_select("art1").artboardRect;
  past_rect = this_ai.layer_select("contents").pathItems.rectangle(past_art[0], past_art[1], past_art[2], -1 * past_art[3]);
  past_rect.height = Math.abs(nodes[nodes.length - 1]["answer"]["instance"].return_bottom());

  let new_art = this_ai.artboards.add(past_rect.geometricBounds);
  past_rect.remove();
  this_ai.artboard_select("art1").remove();
  this_ai.artboards[0].name = "art1";

  this_ai.save();
  app.doScript("expandall","contents_maker");
  let exportOptions = new ExportOptionsSVG();
  exportOptions.coordinatePrecision = 7;
  app.activeDocument.exportFile(new File(this.folder_list.rev.string + '/' + this.filename[boo] + ".svg"), ExportType.SVG, exportOptions);
  this_ai.close();
}

ExecMain.prototype.start = function () {
  for (let b = 0; b < this.text.reviews.length; b++) {
    this.create_init(b);
    for (let j = 0; j < this.list.length; j++) { this.create(b, this.list[j]); }
  }
}
    `; }
    return h;
  }
}
