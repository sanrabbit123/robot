ExecMain.prototype.generalTitle = function (obj) {
	const mother = this.mother;
	const nameList = [ "title", "main", "sub" ];
	const exceptionList = [
		{ color: "#ffffff", font: "Futura-Medium", fontSize: 11.5, },
		{ color: "#ffffff" },
		{ color: "#ffffff", font: "SDGothicNeoa-eMd", fontSize: 10.5, },
	];
	let this_ai, from, to, contents, temp;

	//create doc
	let nameArr = [];
	this_ai = this.createDoc();
	from = "general";

	//set contents
	obj.text.unshift("Portfolio");
	for (let i = 0; i < nameList.length; i++) {
		to = "subtitle" + obj.list + nameList[i];
		contents = obj.text[i];
		this.setCreateSetting({ from: from, to: to, exception: exceptionList[i] });
		this.setParagraph({ from: contents, to: to, });
		nameArr.push(this.createElements(this_ai, this.createSetting[to]));
	}

	//position
	let [ title, main, sub ] = nameArr;
  let title_bottom = mother.return_bottom(title);
  main.top = title_bottom - mother.convertMillimeters(3.8);
  sub.top = mother.return_bottom(main) - mother.convertMillimeters(3);

	//make line
  let line = this_ai.pathItems.add();
  line.stroked = true;
  line.setEntirePath([ [ mother.return_left(title), (title_bottom - 2.2) ], [ mother.return_right(title), (title_bottom - 2.2) ] ]);
  line.fillColor = new NoColor();
  line.strokeColor = mother.colorpick("#ffffff");
  line.strokeWidth = 0.5;

	//end
	app.doScript("expandall", "contents_maker");
	mother.fit_box();
	this.saveSvg(this_ai, obj.list + "subtitle");
}


ExecMain.prototype.generalBelow = function (obj) {
	const mother = this.mother;
  let this_ai, from, to, contents, temp;

	//create doc
	let upDom = [];
  let downDom = [];
	if (obj.text.length > 0) { this_ai = this.createDoc(); }
	from = "general";

	//set contents
  for (let i = 0; i < obj.text.length; i++) {

		to = "below" + obj.list + "up";
		contents = obj.text[i][0];
    this.setCreateSetting({ from: from, to: to });
    this.setParagraph({ from: contents, to: to });
    upDom.push(this.createElements(this_ai, this.createSetting[to]).createOutline());

		to = "below" + obj.list + "down";
		contents = obj.text[i][1];
    this.setCreateSetting({ from: from, to: to, exception: { color: "#d3d2d0", font: "Futura-Medium", fontSize: 18 } });
    this.setParagraph({ from: contents, to: to });
    downDom.push(this.createElements(this_ai, this.createSetting[to]).createOutline());

  }

	//position
	if (upDom.length > 2) {
		upDom[0].left = mother.return_left(upDom[1]) - 200 - upDom[0].width;
	  upDom[2].left = mother.return_right(upDom[1]) + 200;

	  for (let i = 0; i < downDom.length; i++) {
	    downDom[i].top = mother.return_bottom(upDom[1]) - 9;
	    downDom[i].left = upDom[i].left + (upDom[i].width / 2) - (downDom[i].width / 2);
	  }
	  mother.lineMaker([ [ mother.return_left(upDom[1]) - 100, mother.return_top(upDom[1]) ], [ mother.return_left(upDom[1]) - 100, mother.return_bottom(downDom[1]) ] ], {
	    strokeColor: mother.colorpick("#d3d2d0"),
	    strokeWidth: 1.5,
	  });
	  mother.lineMaker([ [ mother.return_right(upDom[1]) + 100, mother.return_top(upDom[1]) ], [ mother.return_right(upDom[1]) + 100, mother.return_bottom(downDom[1]) ] ], {
	    strokeColor: mother.colorpick("#d3d2d0"),
	    strokeWidth: 1.5,
	  });

	  mother.fit_box(true);
	  this.saveSvg(this_ai, obj.list + "below");
	}
}


ExecMain.prototype.arrowMaker = function () {
	let this_ai = this.createDoc();
	this.mother.return_arrow();
	app.doScript("expandall", "contents_maker");
	this.mother.fit_box();
	this.saveSvg(this_ai, "arrow");
}

ExecMain.prototype.searchTitle = function (obj) {
	const { contents, xyz, flatform } = obj;
	let this_ai, from, to, temp, colon;

	//wording
	this_ai = this.createDoc();
	from = "general";
	to = "searchTitle_" + flatform + "_" + String(xyz[0]) + String(xyz[1]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "Graphik-Medium" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]).createOutline();

	//green colon
	colon = "<g%:%g>";
	this.setCreateSetting({ from: from, to: to + "_col", exception: { font: "Graphik-Medium", color: "#505050" } });
	this.setParagraph({ from: colon, to: to + "_col" });
	colon = this.createElements(this_ai, this.createSetting[to + "_col"]).createOutline();

	//colon position
	colon.left = this.mother.return_right(temp) + 12;
	colon.top = this.mother.return_middle(temp) + (colon.height / 2);

	app.doScript("expandall", "contents_maker");
	this.mother.fit_box();
	this.saveSvg(this_ai, to);
}

ExecMain.prototype.searchFactor = function (obj) {
	const { contents, xyz, flatform } = obj;
	let this_ai, from, to, temp;

	from = "general";

	//off
	this_ai = this.createDoc();
	to = "searchFactor_" + flatform + "_off_" + String(xyz[0]) + String(xyz[1]);
  this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: "#505050" } });
  this.setParagraph({ from: contents, to: to });
  temp = this.createElements(this_ai, this.createSetting[to]).createOutline();
	app.doScript("expandall", "contents_maker");
	this.mother.fit_box();
	this.saveSvg(this_ai, to);

	//on
	this_ai = this.createDoc();
	to = "searchFactor_" + flatform + "_on_" + String(xyz[0]) + String(xyz[1]);
	this.setCreateSetting({ from: from, to: to, exception: { font: "SDGothicNeoa-eMd", color: "#2fa678" } });
	this.setParagraph({ from: contents, to: to });
	temp = this.createElements(this_ai, this.createSetting[to]).createOutline();
	app.doScript("expandall", "contents_maker");
	this.mother.fit_box();
	this.saveSvg(this_ai, to);
}

ExecMain.prototype.searchMaker = function () {
	const { search: { option: { sort, type } } } = this.text.main;
	let titleTarget = [];
	let factorTarget = [];

	//title target
	titleTarget.push({ contents: sort.wording, xyz: [ 0, 0 ], flatform: "desktop" });
	titleTarget.push({ contents: sort.wording, xyz: [ 0, 0 ], flatform: "mobile" });
	titleTarget.push({ contents: type.wording, xyz: [ 1, 0 ], flatform: "desktop" });
	titleTarget.push({ contents: type.wording, xyz: [ 1, 0 ], flatform: "mobile" });

	//factor target
	for (let i = 0; i < sort.children.length; i++) {
		factorTarget.push({ contents: sort.children[i].wording, xyz: [ 0, i ], flatform: "desktop" });
		factorTarget.push({ contents: sort.children[i].wording, xyz: [ 0, i ], flatform: "mobile" });
	}
	for (let i = 0; i < type.children.length; i++) {
		factorTarget.push({ contents: type.children[i].wording, xyz: [ 1, i ], flatform: "desktop" });
		factorTarget.push({ contents: type.children[i].wording, xyz: [ 1, i ], flatform: "mobile" });
	}

	//make words
	for (let i = 0; i < titleTarget.length; i++) {
		this.searchTitle(titleTarget[i]);
	}
	for (let i = 0; i < factorTarget.length; i++) {
		this.searchFactor(factorTarget[i]);
	}

}


ExecMain.prototype.listTitleMaker = function () {
	const { listTitle: { wording, icons, details } } = this.text.main;
	let this_ai, from, to, contents, temp;






}


ExecMain.prototype.start = function (dayString) {
	const list = [ "desktop", "mobile" ];
	let temp;
	this.dayString = dayString;

	this.searchMaker();
	this.listTitleMaker();

	// general make
	const { sub } = this.text;
	for (let d of list) {
		temp = {};
		temp.text = sub.title[d].words.contents;
		temp.list = d;
		this.generalTitle(temp);
		temp = {};
		temp.text = sub.below[d].words.contents;
		temp.list = d;
		this.generalBelow(temp);
	}
	this.arrowMaker();

}
