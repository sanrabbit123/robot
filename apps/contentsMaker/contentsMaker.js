const ContentMaker = function (arg = "g00") {
	const Mother = require(`${process.cwd()}/apps/mother.js`);
	this.mother = new Mother();
	this.text = {};
	this.portfolioNum = arg;

	this.queryObj = {
		revdeta_query: '',
		revlist_query: '',
		pordeta_query: '',
		porlist_query: '',
	};

	this.options = {
		os_home_dir: process.env.HOME,
		home_dir: `${process.env.HOME}/contentsMaker/`,
		photo_dir: `${process.env.HOME}/contentsMaker/resource/photo/`,
		script_dir: ``,
		photo_list: [],
		new_photo_list: [],
		new_photo_sg: [],
		fileSystem: this.mother.fileSystem,
		dayString: (this.mother.todayMaker()),
	};

	this.motherLink = {
		mainBinary: `${this.mother.returnUragenPath()}/_NewWeb/poo`,
		webPath: `${this.mother.returnUragenPath()}/_NewWeb`,
		portfoiloBinary: `${this.mother.returnUragenPath()}/_Portfolio`,
		proposalBinary: `${process.env.HOME}/static`,
		googleBinary: `${process.env.HOME}/google/static`,
	};

	this.links = {
		app: `${process.cwd()}/apps/contentsMaker`,
		factory: `${process.cwd()}/apps/contentsMaker/factory`,
		mapMaker: `${process.cwd()}/apps/mapMaker`,
		map: `${process.cwd()}/apps/mapMaker/map`,
		svgTong: `${process.cwd()}/apps/mapMaker/map/svgTong`,
	};

	this.generator = require(`${this.links.app}/factory/generator.js`);

}

ContentMaker.prototype.startAdobe = async function (obj) {
	try {
		if (obj.app === undefined) {
			obj.app = `Adobe Illustrator`;
		}
		let adobe = `Adobe Illustrator`;
		if (/photo/gi.test(obj.app)) {
			adobe = `Adobe Photoshop 2020`;
		}
		let targetJs = `${this.options.home_dir}script/${obj.name}.js`;
		let appleScript = `tell application "${adobe}"`;
		appleScript += `\n`;
		appleScript += `\twith timeout of 3000 seconds`;
		appleScript += `\n`;
		appleScript += `\t\tactivate`;
		appleScript += `\n`;
		appleScript += `\t\tdo javascript "#include ${targetJs}"`;
		appleScript += `\n`;
		appleScript += `\tend timeout`;
		appleScript += `\n`;
		appleScript += `end tell`;

		let temp_scriptString = `var text = ${JSON.stringify(obj.data, null, 2)};\n`;
		temp_scriptString += await this.mother.fileSystem(`readString`, [ `${this.options.home_dir}factory/script/polyfill.js` ]);
		temp_scriptString += `\n`;
		temp_scriptString += await this.mother.babelSystem(obj.script);

		await this.mother.fileSystem(`write`, [ targetJs, temp_scriptString ]);
		let boo, boo2;
		if (obj.end === undefined && obj.noclean === undefined) {
			boo = false;
			boo2 = true;
		} else if (obj.end === true && obj.noclean === undefined) {
			boo = false;
			boo2 = true;
		} else if (obj.end === false && obj.noclean === undefined) {
			boo = true;
			boo2 = true;
		} else if (obj.end === undefined && obj.noclean === true) {
			boo = false;
			boo2 = false;
		} else if (obj.end === undefined && obj.noclean === false) {
			boo = false;
			boo2 = true;
		} else if (obj.end !== undefined && obj.noclean !== undefined) {
			boo = !obj.end;
			boo2 = !obj.noclean;
		}
		await this.mother.appleScript(obj.name, appleScript, `${this.options.home_dir}temp`, boo);
		if (!boo) {
			let endScript = `tell application "${adobe}"`;
			endScript += `\n`;
			endScript += `\tquit`;
			endScript += `\n`;
			endScript += `end tell`;
			await this.mother.appleScript(`${obj.name}_end`, endScript, `${this.options.home_dir}temp`, boo2);
		}

	} catch (e) {
		console.log(e);
	} finally {
		console.log(`appleScript done`);
	}
}

ContentMaker.prototype.image_filter = function (str) {
	str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
	str = str.replace(/[^0-9]/g, '');
	str = str.replace(/^0/g, '');
	return str;
}

ContentMaker.prototype.photo_clean = async function () {
	try {
		let photo_list = await this.mother.fileSystem(`readDir`, [ this.options.photo_dir ]);
		if (photo_list.length !== 0) {
			for (let i of photo_list) { if (i !== ".DS_Store") {
				this.mother.shell.exec(`rm -f ${this.mother.shellLink(this.options.photo_dir)}${i};`);
			}}
			console.log(`clean success`);
		} else {
			console.log(`already clean`);
		}
	} catch (e) {
		console.log(e);
	}
}

ContentMaker.prototype.photo_search = async function () {
	try {
		await this.photo_clean();
		let portfolio_rawList, portfolio_target, portfolio_targetList;
		let target = "none";

		if (/^p/.test(this.portfolioNum)) {
			portfolio_rawList = await this.mother.fileSystem(`readDir`, [ this.motherLink.portfoiloBinary ]);
			for (let i of portfolio_rawList) { if (i !== ".DS_Store" && i !== "_A") {
				if (this.image_filter(i) === this.portfolioNum.replace(/[^0-9]/g, '')) {
					target = i;
				};
			}}
			portfolio_target = `${this.motherLink.portfoiloBinary}/${target}/원본`;

		} else if (/^a/.test(this.portfolioNum)) {
			portfolio_rawList = await this.mother.fileSystem(`readDir`, [ this.motherLink.portfoiloBinary + "/_A" ]);
			for (let i of portfolio_rawList) { if (i !== ".DS_Store") {
				if (this.image_filter(i) === this.portfolioNum.replace(/[^0-9]/g, '')) {
					target = i;
				};
			}}
			portfolio_target = `${this.motherLink.portfoiloBinary}/_A/${target}/원본`;

		} else {
			throw new Error("photo error");
			process.exit();
		}

		if (target === "none") {
			throw new Error("There is no photo");
			process.exit();
		}

		portfolio_targetList = await this.mother.fileSystem(`readDir`, [ portfolio_target ]);
		for (let i of portfolio_targetList) { if (i !== ".DS_Store") {
			this.mother.shell.exec(`cp ${this.mother.shellLink(portfolio_target)}/${i} ${this.mother.shellLink(this.options.photo_dir)};`);
			console.log(`copy success`);
		}}
	} catch (e) {
		console.log(e);
	}
}

ContentMaker.prototype.photo_sort = async function () {
	const instance = this;
	try {
		let photo_list = [];
		let file_list = await this.mother.fileSystem(`readDir`, [ this.options.photo_dir ]);
		if (file_list.length === 0) {
			console.log(`there is no photo`);
			process.exit();
		}
		for (let i = 0; i < file_list.length; i++) { if (file_list[i] === '.DS_Store') { file_list.splice(i, 1); } }
		file_list.sort(function (a, b) {
			return Number(instance.image_filter(a)) - Number(instance.image_filter(b));
		});
		for (let i = 0; i < file_list.length; i++) {
			this.mother.shell.exec(`mv ${this.options.photo_dir}${file_list[i]} ${this.options.photo_dir}photo${String(i + 1)}.jpg`);
			photo_list.push("photo" + String(i + 1) + ".jpg");
		}
		console.log(photo_list);
		console.log(`sort success`);
		return photo_list;
	} catch (e) {
		console.log(e);
	}
}

ContentMaker.prototype.photo_list = async function () {
	const instance = this;
	try {
		let photo_list = await this.photo_sort();
		let new_item, dimensions;
		let photoshopScript = function (argv) {
			let text = '';
			text += 'tell application "Adobe Photoshop 2020"\n';
			text += '\tactivate\n';
			text += '\topen file "' + argv + '"\n';
			text += '\tset docheight to height of document 1\n';
			text += '\tset docWidth to width of document 1\n';
			text += '\tclose document 1\n';
			text += '\tif docheight < docWidth then\n';
			text += '\t\treturn "g"\n';
			text += '\telse\n';
			text += '\t\treturn "s"\n';
			text += '\tend if\n';
			text += 'end tell';
			return text;
		}

		this.options.photo_list = photo_list;
		for (let item of photo_list) {
			dimensions = await this.mother.appleScript(`photosg_${item.replace(/[^0-9]/g, '')}`, photoshopScript(this.options.photo_dir + item), `${this.options.home_dir}temp`, false);
			new_item = item;
			new_item = this.image_filter(new_item);
			new_item = 't' + new_item + this.text.p_id + ".jpg";
			this.options.new_photo_list.push(new_item);
			this.options.new_photo_sg.push(dimensions.replace(/[^gs]/g, ''));
		}

	} catch (e) {
		console.log(e.message);
	}
}

ContentMaker.prototype.static_setting = async function () {
	const instance = this;
	const { fileSystem, shell, shellLink } = this.mother;
	try {
		let staticFolderBoo, staticFolderBootr;
		let staticFolderscriptBoo, staticFolderscriptBootr, staticFolderresultBootr, staticFoldertempBootr;

		staticFolderBoo = await fileSystem(`readDir`, [ process.env.HOME ]);
		staticFolderBootr = false;
		for (let i of staticFolderBoo) {
			if (/^contentsMaker/.test(i)) { staticFolderBootr = true; }
		}

		if (!staticFolderBootr) {

			shell.exec(`mkdir ${this.options.home_dir};mkdir ${this.options.home_dir}script;mkdir ${this.options.home_dir}result;mkdir ${this.options.home_dir}temp`);

		} else {

			staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);
			staticFolderscriptBootr = false;
			for (let i of staticFolderscriptBoo) {
				if (/^script$/.test(i)) { staticFolderscriptBootr = true; }
			}
			if (!staticFolderscriptBootr) { shell.exec(`mkdir ${this.options.home_dir}script`); }
			staticFolderresultBootr = false;
			for (let i of staticFolderscriptBoo) {
				if (/^result$/.test(i)) { staticFolderresultBootr = true; }
			}
			if (!staticFolderresultBootr) { shell.exec(`mkdir ${this.options.home_dir}result`); }
			staticFoldertempBootr = false;
			for (let i of staticFolderscriptBoo) {
				if (/^temp/.test(i)) { staticFoldertempBootr = true; }
			}
			if (!staticFoldertempBootr) { shell.exec(`mkdir ${this.options.home_dir}temp`); }

		}

		let folderList = [ "factory", "resource" ];
		for (let f of folderList) {
			shell.exec(`cp -r ${shellLink(this.links.app)}/${f} ${this.options.home_dir}`);
		}

	} catch (e) {
		console.log(e.message);
	}
}

ContentMaker.prototype.makeAnd_execute = async function () {
	try {
		//orders
		let orders = [ "portfolio_contents", "portfolio_titles", "portfolio_photo" ];
		let review_orders = [ "review_contents", "review_titles" ];

		//script maker
		let temp_scriptString = '';
		for (let i of orders) {
			temp_scriptString = `var text = ${JSON.stringify(this.text, null, 2)};\n`;
			temp_scriptString += await this.mother.fileSystem(`readString`, [ `${this.options.home_dir}factory/script/polyfill.js` ]);
			temp_scriptString += `\n`;
			temp_scriptString += await this.mother.babelSystem(this.generator.contents_maker[i](this.options));
			await this.mother.fileSystem(`write`, [ `${this.options.home_dir}script/${i}.js`, temp_scriptString ]);
		}
		if (this.text.r_id !== "re999") {
			for (let i of review_orders) {
				temp_scriptString = `var text = ${JSON.stringify(this.text, null, 2)};\n`;
				temp_scriptString += await this.mother.fileSystem(`readString`, [ `${this.options.home_dir}factory/script/polyfill.js` ]);
				temp_scriptString += `\n`;
				temp_scriptString += await this.mother.babelSystem(this.generator.contents_maker[i](this.options));
				await this.mother.fileSystem(`write`, [ `${this.options.home_dir}script/${i}.js`, temp_scriptString ]);
			}
		}

		//folder maker
		let resultFolderBoo = await this.mother.fileSystem(`readDir`, [ `${this.options.home_dir}result` ]);
		for (let i of resultFolderBoo) {
			this.mother.shell.exec(`rm -rf ${this.options.home_dir}result/${i}`);
		}
		this.mother.shell.exec(`mkdir ${this.options.home_dir}result/${this.text.p_id}code`);
		this.mother.shell.exec(`mkdir ${this.options.home_dir}result/${this.text.p_id}code/portp${this.text.p_id}`);
		this.mother.shell.exec(`mkdir ${this.options.home_dir}result/${this.text.p_id}code/portp${this.text.p_id}/svg`);
		this.mother.shell.exec(`mkdir ${this.options.home_dir}result/${this.text.p_id}code/portp${this.text.p_id}/mobile`);

		if (this.text.r_id !== "re999") {
			this.mother.shell.exec(`mkdir ${this.options.home_dir}result/${this.text.r_id}code`);
			this.mother.shell.exec(`mkdir ${this.options.home_dir}result/${this.text.r_id}code/${this.text.r_id}`);
		}

		//execute
		for (let i of orders) {
			this.mother.shell.exec(`osascript ${this.options.home_dir}factory/applescript/start_adobe.scpt ${i}`);
		}
		if (this.text.r_id !== "re999") {
			for (let i of review_orders) {
				this.mother.shell.exec(`osascript ${this.options.home_dir}factory/applescript/start_adobe.scpt ${i}`);
			}
		}
		this.mother.shell.exec(`osascript ${this.options.home_dir}factory/applescript/return_terminal.scpt`);

	} catch (e) {
		console.log(e.message);
	}
}

ContentMaker.prototype.query_maker = async function (result) {
	try {
		let query_wording = '', query_wordingkey = '', query_wordingsg = '';
		for (let words of this.text.contents) { if (words.title !== "init") {
			query_wording += words.title + ' ';
			query_wordingkey += String(words.photo_key) + ' ';
		}}
		for (let i = this.text.p_info.photosg.first - 1; i < this.text.p_info.photosg.last - this.text.p_info.photosg.first + 1; i++) {
			query_wordingsg += this.options.new_photo_sg[i] + ' ';
		}
		query_wording = query_wording.slice(0, -1);
		query_wordingkey = query_wordingkey.slice(0, -1);
		query_wordingsg = query_wordingsg.slice(0, -1);

		this.queryObj.pordeta_query = `INSERT INTO pordeta (porlid,photosg,photodae,slide,wordingtitle,wordingkey,desid,designer,apartname,description,revid) VALUES (`;
		this.queryObj.pordeta_query += `'${this.text.p_id}',`;
		this.queryObj.pordeta_query += `'${query_wordingsg}',`;
		this.queryObj.pordeta_query += `'${String(this.text.p_info.photodae[0])} ${String(this.text.p_info.photodae[1])}',`;
		this.queryObj.pordeta_query += `'${this.text.p_info.slide}',`;
		this.queryObj.pordeta_query += `'${query_wording}',`;
		this.queryObj.pordeta_query += `'${query_wordingkey}',`;
		this.queryObj.pordeta_query += `'${this.text.designer}',`;
		this.queryObj.pordeta_query += `'${result.designer}',`;
		this.queryObj.pordeta_query += `'${this.text.sub_titles.portivec.main}',`;
		this.queryObj.pordeta_query += `'',`;
		this.queryObj.pordeta_query += `'${this.text.r_id}');`;

		this.queryObj.porlist_query = `INSERT INTO porlist (porlid,photodae_s,photodae_d,desid,designer,region,method,key8,key9,tag,title,subtitle,apart,pyeong) VALUES (`;
		this.queryObj.porlist_query += `'${this.text.p_id}',`;
		this.queryObj.porlist_query += `'${String(this.text.p_info.photodae[0])}',`;
		this.queryObj.porlist_query += `'${String(this.text.p_info.photodae[1])}',`;
		this.queryObj.porlist_query += `'${this.text.designer}',`;
		this.queryObj.porlist_query += `'${result.designer}',`;
		this.queryObj.porlist_query += `'${this.text.sub_titles.portivec.region}',`;
		this.queryObj.porlist_query += `'${this.text.p_info.service}',`;
		this.queryObj.porlist_query += `'${this.text.p_info.key8}',`;
		this.queryObj.porlist_query += `'${this.text.p_info.key9}',`;
		this.queryObj.porlist_query += `'${this.text.p_info.tag}',`;
		this.queryObj.porlist_query += `'${this.text.sub_titles.portivec.main}',`;
		this.queryObj.porlist_query += `'${this.text.title}',`;
		this.queryObj.porlist_query += `'${this.text.space}',`;
		this.queryObj.porlist_query += `'${this.text.pyeong}');`;

		if (this.text.r_id !== "re999") {
			let review_photo_setting = {};
			review_photo_setting.id = '';
			review_photo_setting.gs = '';
			review_photo_setting.key = '';
			let review_total_length = 0;
			for (let g of this.text.reviews) {
				if (g.photos.length !== 0) {
					for (let i = 0; i < g.photos.length; i++) {
						review_photo_setting.id += String(g.photos[i]) + ' ';
						review_photo_setting.gs += this.options.new_photo_sg[g.photos[i] - 1] + ' ';
					}
					review_total_length += g.photos.length;
					review_photo_setting.key += review_total_length + ' ';
				}
			}
			review_photo_setting.id = review_photo_setting.id.slice(0, -1);
			review_photo_setting.gs = review_photo_setting.gs.slice(0, -1);
			review_photo_setting.key = review_photo_setting.key.slice(0, -1);

			this.queryObj.revdeta_query = `INSERT INTO revdeta (revid,porlid,phototnum,photosg,photodae,wordingkey,desid,retitle,description) VALUES (`;
			this.queryObj.revdeta_query += `'${this.text.r_id}',`;
			this.queryObj.revdeta_query += `'${this.text.p_id}',`;
			this.queryObj.revdeta_query += `'${review_photo_setting.id}',`;
			this.queryObj.revdeta_query += `'${review_photo_setting.gs}',`;
			this.queryObj.revdeta_query += `'${String(this.text.r_info.photodae[0])} ${String(this.text.r_info.photodae[1])}',`;
			this.queryObj.revdeta_query += `'${review_photo_setting.key}',`;
			this.queryObj.revdeta_query += `'${this.text.designer}',`;
			this.queryObj.revdeta_query += `'${this.text.sub_titles.revivec.main}',`;
			this.queryObj.revdeta_query += `'');`;
			this.queryObj.revlist_query = `INSERT INTO revlist (revid,porlid,review_photo,order_function) VALUES ('${this.text.r_id}','${this.text.p_id}','${String(this.text.r_info.photodae[1])}','${String(this.text.r_info.order)}');`;
		}
		await this.mother.fileSystem(`write`, [ `${this.options.home_dir}result/query_${this.portfolioNum}.js`, JSON.stringify(this.queryObj) ]);

	} catch (e) {
		console.log(e.message);
	}
}

ContentMaker.prototype.total_make = async function () {
	const instance = this;
	const MongoClient = this.mother.mongo;
	const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
	try {
		this.text = require(`${this.links.app}/resource/${this.portfolioNum}.js`);

		await MONGOC.connect();
		await this.static_setting();
		await this.photo_search();
		await this.photo_list();
		await this.makeAnd_execute();

		const result = await MONGOC.db(`miro81`).collection(`Designer`).findOne({ past_desid: this.text.designer });
		await this.query_maker(result);
		console.log(`done`);

	} catch (e) {
		console.log(e);
	} finally {
		MONGOC.close();
		process.exit();
	}
}


// mysql -----------------------------------------------------------------------------------------------------------------------

ContentMaker.prototype.to_mysql = async function (custom = "none") {
	let instance = this;
	const MongoClient = this.mother.mongo;
	const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
	try {
		const pidResultarr = await this.mother.fileSystem(`readDir`, [ `${this.options.home_dir}result` ]);
		let p_id;
		for (let i = 0; i < pidResultarr.length; i++) {
			if (/^[a|p][0-9]+/g.test(pidResultarr[i])) {
				p_id = pidResultarr[i].replace(/code/g, '');
			}
		}
		console.log(p_id);
		const queryObj = JSON.parse(await this.mother.fileSystem(`readString`, [ `${this.options.home_dir}result/query_${p_id}.js` ]));
		function sliceQuery(str) {
			if (str.search(/\(/g) === -1) { return "nothing"; }
			else {
				let columns = str.slice(str.search(/\(/g) + 1, str.search(/\)/g)).split(',');
				let values = str.slice(str.search(/VALUES \(/g) + 8, str.search(/\)\;/g)).replace(/^'/, '').replace(/'$/, '').split("','");
				let obj = {}
				for (let i = 0; i < columns.length; i++) {
					obj[columns[i]] = values[i];
				}
				return obj;
			}
		}
		let mongoList = { FP1_porlist: "porlist_query", FP2_pordeta: "pordeta_query", FR1_revlist: "revlist_query", FR2_revdeta: "revdeta_query" };
		await MONGOC.connect();
		console.log(`mongo connect success`);
		for (let coll in mongoList) {
			if (sliceQuery(queryObj[mongoList[coll]]) !== "nothing") {
				await MONGOC.db(`miro81`).collection(coll).insertOne(sliceQuery(queryObj[mongoList[coll]]));
				console.log(`insert to ${coll} success`);
				console.log(sliceQuery(queryObj[mongoList[coll]]));
			}
		}
		const mysql_info = {
			host: 'home-liaison.com',
			user: 'miro81',
			password: 'Gha-Fldpwhd83!',
			port: 3306,
			database: 'miro81'
		};
		const POOL = this.mother.mysql.createPool(mysql_info);
		const PPOOL = POOL.promise();
		console.log(`mysql connect success`);
		await PPOOL.query(queryObj.pordeta_query);
		await PPOOL.query(queryObj.porlist_query);
		if (queryObj.revdeta_query !== '') {
			await PPOOL.query(queryObj.revdeta_query);
			await PPOOL.query(queryObj.revlist_query);
		}
		console.log("insert success");
		if (custom !== "none") {
			let query = custom;
			await PPOOL.query(query);
			console.log("custom query success");
		}
	} catch (e) {
		console.log(e.message);
	} finally {
		MONGOC.close();
		process.exit();
	}
}


// poo -----------------------------------------------------------------------------------------------------------------------

ContentMaker.prototype.to_poo = async function () {
	const instance = this;
	const mother = this.mother;
	try {

		//setting binary folders -------------------------------------------------------------------------------------------------
		let pooPath_mother, pooPath;
		let webPath_mother, webPath;
		let staticPath_mother, staticPath;
		let googlePath_mother, googlePath;

		//set icloud main poo folder
		pooPath_mother = mother.shellLink(this.motherLink.mainBinary);
		pooPath = {
			list_image: pooPath_mother + "/list_image",
			porpor: pooPath_mother + "/list_svg/porporpor",
			revrev: pooPath_mother + "/list_svg/revrevrev",
		};

		//set new-web folder
		webPath_mother = mother.shellLink(this.motherLink.webPath);
		webPath = {
			porpor: webPath_mother + "/_PortfolioDetail",
			revrev: webPath_mother + "/_Review",
		};

		//set ~/static folder
		staticPath_mother = mother.shellLink(this.motherLink.proposalBinary);
		staticPath = {
			list_image: staticPath_mother + "/list_image",
		};

		//set google static sync folder
		googlePath_mother = mother.shellLink(this.motherLink.googleBinary);
		googlePath = {
			list_image: googlePath_mother + "/list_image",
		};


		//setting ids -----------------------------------------------------------------------------------------------------------
		let arr;
		let p_id, r_id;
		let p_path, r_path;
		let svgAis, revAis;
		let delete_arr = [];
		let revdelete_arr = [];

		//set p_id and r_id
		arr = await mother.fileSystem(`readDir`, [ `${this.options.home_dir}result` ]);
		p_id = `none`;
		r_id = `none`;
		for (let i = 0; i < arr.length; i++) {
			if (/^[ap][0-9]+/g.test(arr[i])) { p_id = arr[i].replace(/code/g, ''); }
			else if (/^re[0-9]+/g.test(arr[i])) { r_id = arr[i].replace(/code/g, ''); }
		}

		//move svgs and ai delete
		p_path = `${this.options.home_dir}result/${p_id}code`;
		svgAis = await mother.fileSystem(`readDir`, [ `${p_path}/portp${p_id}/svg` ]);
		for (let i of svgAis) { if (/\.ai$/g.test(i)) {
			delete_arr.push(i);
		}}
		mother.shell.exec(`cp -r ${p_path} ${webPath.porpor}`);
		mother.shell.exec(`cp ${p_path}/moportivecgaro${p_id}.svg ${pooPath.porpor}/mobile/motitlegaro/`);
		mother.shell.exec(`cp ${p_path}/portivecgaro${p_id}.svg ${pooPath.porpor}/titlegaro/`);
		mother.shell.exec(`cp ${p_path}/porhovecgaro${p_id}.svg ${pooPath.porpor}/titlehovergaro/`);
		mother.shell.exec(`cp ${p_path}/moportivec${p_id}.svg ${pooPath.porpor}/mobile/motitlesero/`);
		mother.shell.exec(`cp ${p_path}/portivec${p_id}.svg ${pooPath.porpor}/titlesero/`);
		mother.shell.exec(`cp ${p_path}/porhovec${p_id}.svg ${pooPath.porpor}/titlehoversero/`);
		for (let ai of delete_arr) {
			mother.shell.exec(`rm -f ${p_path}/portp${p_id}/svg/${ai}`);
		}

		//image copy to poo
		mother.shell.exec(`cp -r ${p_path}/portp${p_id} ${pooPath.list_image}`);

		//image copy to static
		mother.shell.exec(`cp -r ${p_path}/portp${p_id} ${staticPath.list_image}`);

		//image copy to google static
		mother.shell.exec(`cp -r ${p_path}/portp${p_id} ${googlePath.list_image}`);

		//review version
		if (r_id !== `none`) {
			r_path = `${this.options.home_dir}result/${r_id}code`;
			revAis = await this.mother.fileSystem(`readDir`, [ `${r_path}/${r_id}` ]);
			for (let i of revAis) { if (/\.ai$/g.test(i)) {
				revdelete_arr.push(i);
			}}
			mother.shell.exec(`cp -r ${r_path} ${webPath.revrev}`);
			mother.shell.exec(`cp ${r_path}/morevtivec${r_id}.svg ${pooPath.revrev}/morevivector/`);
			mother.shell.exec(`cp ${r_path}/revhovec${r_id}.svg ${pooPath.revrev}/revhovector/`);
			mother.shell.exec(`cp ${r_path}/revtivec${r_id}.svg ${pooPath.revrev}/revivector/`);
			mother.shell.exec(`cp ${r_path}/nu${r_id}.svg ${pooPath.revrev}/detail/number`);
			for (let ai of revdelete_arr) {
				mother.shell.exec(`rm -f ${r_path}/${r_id}/${ai}`);
			}
			mother.shell.exec(`cp -r ${r_path}/${r_id} ${pooPath.revrev}/detail/`);
		}


		//setting scp message -----------------------------------------------------------------------------------------------------------
		let scpMsg = '';
		scpMsg += `scp -r ${pooPath.porpor} miro81@home-liaison.com:/miro81/www/list_svg/;`;
		scpMsg += `scp -r ${pooPath.list_image}/portp${p_id} miro81@home-liaison.com:/miro81/www/list_image/;`;
		scpMsg += `scp -i ${process.env.HOME}/database.pem -r ${pooPath.porpor} centos@homeliaison-dashboard.xyz:/home/centos/static/list_svg/;`;
		scpMsg += `scp -i ${process.env.HOME}/database.pem -r ${pooPath.list_image}/portp${p_id} centos@homeliaison-dashboard.xyz:/home/centos/static/list_image/;`;
		if (r_id !== `none`) {
			scpMsg += `scp -r ${pooPath.revrev} miro81@home-liaison.com:/miro81/www/list_svg/;`;
			scpMsg += `scp -i ${process.env.HOME}/database.pem -r ${pooPath.revrev} centos@homeliaison-dashboard.xyz:/home/centos/static/list_svg/;`;
		}

		//view scp
		console.log(scpMsg);

	} catch (e) {
		console.log(e.message);
	} finally {
		process.exit();
	}
}


// proposal -----------------------------------------------------------------------------------------------------------------------

ContentMaker.prototype.proposal_make = async function () {
	const instance = this;
	const { shell, shellLink, fileSystem, babelSystem } = this.mother;
	const { home_dir } = this.options;
	let temp_scriptString, result_dir;
	try {
		temp_scriptString = `var text = ${JSON.stringify(this.text, null, 2)};\n`;
		temp_scriptString += await fileSystem(`readString`, [ `${shellLink(home_dir)}factory/script/polyfill.js` ]);
		temp_scriptString += `\n`;
		temp_scriptString += await babelSystem(this.generator.proposal_maker.proposal(this.options));

		await fileSystem(`write`, [ `${this.options.home_dir}script/proposal.js`, temp_scriptString ]);

		result_dir = await fileSystem(`readDir`, [ `${shellLink(home_dir)}result` ]);
		for (let i of result_dir) { if (i !== ".DS_Store") {
			shell.exec(`rm -rf ${shellLink(home_dir)}result/${i};`);
		}}
		shell.exec(`osascript ${shellLink(home_dir)}factory/applescript/start_adobe.scpt proposal`);
		shell.exec(`osascript ${shellLink(home_dir)}factory/applescript/return_terminal.scpt`);

	} catch (e) {
		console.log(e);
	}
}

ContentMaker.prototype.proposal_launching = async function () {
	const instance = this;
	const MongoClient = this.mother.mongo;
	const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
	try {
		await MONGOC.connect();
		await this.static_setting();
		let text_raw;
		if (this.portfolioNum !== "none") {
			text_raw = await MONGOC.db(`miro81`).collection(`Project`).find({ proid: this.portfolioNum }).toArray();
		} else {
			text_raw = await MONGOC.db(`miro81`).collection(`Project`).find({}).toArray();
		}
		text_raw.sort(function (a,b) {
			return Number(b.proid.replace(/[^0-9]/g, '')) - Number(a.proid.replace(/[^0-9]/g, ''));
		})
		this.text = text_raw[0];
		await this.proposal_make();

		const gd = this.mother.googleSystem("drive");
		let gres, resultDir;
		resultDir = await this.mother.fileSystem("readDir", [ this.options.home_dir + "result" ]);
		for (let i of resultDir) { if (!/^\.DS_Store/g.test(i)) {
			gres = await gd.upload_andView("1ofHfJmGJJ6TCk5qP_VttNvIvHt2IVZ21", this.options.home_dir + "result/" + i);
		}}
		await this.mother.slack_bot.chat.postMessage({ text: `${this.text.client} 고객님의 제안서가 완료되었습니다! 확인부탁드립니다! : ${gres}`, channel: `#403_proposal` });
		await MONGOC.db("miro81").collection(`Project`).updateOne({ proid: this.text.proid }, { $set: { status: "발송 대기" } });
		console.log(`done`);
	} catch (e) {
		console.log(e);
	} finally {
		MONGOC.close();
		process.exit();
	}
}


// front -----------------------------------------------------------------------------------------------------------------------

ContentMaker.prototype.renderSvgPng = async function (sw) {
	if (/\.js$/.test(sw)) { sw = sw.replace(/\.js$/, ''); }

	const instance = this;
	const { fileSystem, shell, shellLink } = this.mother;

	const binaryTotalPath = process.cwd() + "/binary/frontMaker/ai/" + sw;
	let binaryTotalDir, targetAIList;
	try {

		//init setting
		let mapMaker, temp_scriptString, front_options;
		const MapMaker = require(`${this.links.mapMaker}/mapMaker.js`);
		mapMaker = new MapMaker(sw);
		shell.exec(`mkdir ${shellLink(this.options.home_dir + "result")}/${sw}`);

		//get map object
		this.text = await mapMaker.mapGenerator();

		//if ai file exist, add ai file info
		binaryTotalDir = await fileSystem("readDir", [ binaryTotalPath ]);
		targetAIList = [];
		for (let i of binaryTotalDir) { if (/\.ai$/.test(i)) {
			targetAIList.push(i);
		}}
		if (targetAIList.length > 0) {
			targetAIList.sort((a, b) => { return Number(a.replace(/[^0-9]/g, '')) - Number(b.replace(/[^0-9]/g, '')) });
			this.options.etc = {};
			this.options.etc.targetFile = [];
			for (let i of targetAIList) {
				this.options.etc.targetFile.push(binaryTotalPath + "/" + i);
			}
			if (this.options.etc.targetFile.length > 0) {
				console.log(this.options.etc.targetFile);
			}
		}

		//start aiScript
		temp_scriptString = await this.generator.front_maker.exec(this.options, sw);
		await this.startAdobe({
			name: `front_${sw}`,
			data: this.text,
			script: temp_scriptString,
			app: "Illustrator",
			end: true,
		});

		//make svgTong files and make map with source written
		await mapMaker.writeMap_makeTong();

		//remove binary
		let resDir = await fileSystem(`readDir`, [ `${this.options.home_dir}result/${sw}` ]);
		let resBinaryDirPath = `${process.cwd()}/binary/frontMaker/${sw}`;
		let resBinaryDir = await fileSystem(`readDir`, [ resBinaryDirPath ]);
		for (let i of resBinaryDir) {
			if (/\.png$/.test(i)) {
				shell.exec(`rm -rf ${shellLink(resBinaryDirPath)}/${i};`);
			}
		}
		for (let i of resDir) {
			if (/\.svg$/.test(i)) {
				shell.exec(`rm -rf ${shellLink(this.options.home_dir + "result")}/${sw}/${i};`);
			} else if (/\.png$/.test(i)) {
				shell.exec(`mv ${shellLink(this.options.home_dir + "result")}/${sw}/${i} ${shellLink(resBinaryDirPath)};`);
			}
		}

		//remove confirm
		resDir = await fileSystem(`readDir`, [ `${this.options.home_dir}result` ]);
		for (let i of resDir) {
			shell.exec(`rm -rf ${shellLink(this.options.home_dir + "result")}/${i}`);
		}

	} catch (e) {
		console.log(e);
	}
}

ContentMaker.prototype.front_maker = async function (target) {
	const instance = this;
	const { fileSystem, shell, shellLink } = this.mother;
	const MongoClient = this.mother.mongo;
	const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
	try {
		await MONGOC.connect();
		await this.static_setting();

		//delete result folder
		const resDir = await fileSystem(`readDir`, [ this.options.home_dir + "result" ]);
		for (let i of resDir) {
			shell.exec(`rm -rf ${shellLink(this.options.home_dir + "result")}/${i}`);
		}

		//init setting
		this.options.script_dir = `${this.links.factory}/script/front_maker`;

		//if map exist, make source files
		const mapDir = await fileSystem("readDir", [ this.links.map ]);

		// image and svg make
		if (target === undefined) {
			await this.renderSvgPng("general");
		} else {
			if (target === "entire") {
				for (let i of mapDir) { if (i !== ".DS_Store") {
					await this.renderSvgPng(i.replace(/\.js$/, ''));
				}}
			} else if (mapDir.includes(target + ".js")) {
				await this.renderSvgPng(target);
			} else {
				throw new Error("invaild target");
			}
		}

	} catch (e) {
		console.log(e);
	} finally {
		console.log(`done`);
		MONGOC.close();
		process.exit();
	}
}


module.exports = ContentMaker;
