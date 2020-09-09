const FrontMaker = function () {
	const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.csso = require("csso");
	this.strings = {};
	this.dir = `${process.cwd()}/apps/frontMaker`;
}

FrontMaker.prototype.links = {
  app: `${process.cwd()}/apps/frontMaker`,
  source: `${process.cwd()}/apps/frontMaker/source`,
  binary: `${process.cwd()}/binary/frontMaker`,
  server: `${process.env.HOME}/poo`,
  server_raw: `${process.env.HOME}`,
  server_name: `poo`,
	map: `${process.cwd()}/apps/contentsMaker/module/frontMaker/map`,
	svgTong: `${process.cwd()}/apps/contentsMaker/module/frontMaker/svgTong`,
}

FrontMaker.prototype.startChrome = async function (link, newBoo = true) {
	try {
		const { exec } = require("child_process");
		const chromePath = `/Applications/'Google Chrome.app'/Contents/MacOS/'Google Chrome' ${newBoo ? "--new-window " : ""}${link}`;
		return new Promise(function (resolve, reject) {
			exec(chromePath, (err, stdout, stderr) => {
			  if (err) {
			    reject(err);
			    return;
			  }
			  resolve(stdout);
			});
		});
	} catch (e) {
		console.log(e);
	}
}

FrontMaker.prototype.setStrings = async function () {
	const { fileSystem } = this.mother;
	try {
		const stringDir = await fileSystem(`readDir`, [ `${this.dir}/string` ]);
		let strings;
		for (let i of stringDir) { if (i !== `.DS_Store`) {
			strings = await fileSystem(`readString`, [ `${this.dir}/string/${i}` ]);
			this.strings[i.replace(/\..+$/g, '') + 'String'] = strings;
		}}
	} catch (e) {
		console.log(e);
	}
}

FrontMaker.prototype.mediaLoad = function (code) {
	let media_mother, media_arr0, media_arr1, media_arr2, media_temp, media_temp_result, media_plus, media_temp2, media_temp3;
	let media_mother_indexArr = [];
	let media_result_indexArr = [];
	let media_temp_string = '';
	let media_temp_string2 = '';

	media_mother = [ ...code.matchAll(/\/<%media%>\//g) ];
	for (let i of media_mother) {
		media_mother_indexArr.push(i.index);
	}
	if (/%\/%\/g/.test(code)) {
		media_plus = [ ...code.matchAll(/%\/%\/g/g) ];
		media_temp_string = '';
		media_temp_string2 = '';
		for (let i = 0; i < media_plus.length; i++) {
			for (let j = 0; j < media_mother.length; j++) {
				if (j !== media_mother.length - 1) {
					if ((media_plus[i].index > media_mother_indexArr[j]) && (media_plus[i].index < media_mother_indexArr[j + 1])) {
						media_result_indexArr.push(media_mother_indexArr[j]);
					}
				} else {
					if (media_plus[i].index > media_mother_indexArr[j]) {
						media_result_indexArr.push(media_mother_indexArr[j]);
					}
				}
			}
		}
		for (let i of media_result_indexArr) {
			code = code.slice(0, i) + `/<%aidem%>/` + code.slice(i + 11);
		}
		media_mother = [ ...code.matchAll(/\/<%aidem%>\//g) ];
		for (let i = 0; i < media_mother.length; i++) {
			media_arr0 = code.match(/\/<%aidem%>\//);
			media_arr1 = code.match(/%\/%\/g/);

			media_temp = code.slice(media_arr0.index + 11, media_arr1.index).split("%/%/i");
			for (let j of media_temp) {
				media_temp2 = j.split("%/%/+");
				for (let z of media_temp2) {
					if (/=/.test(z)) {
						media_temp3 = z.split("%/%/%");
						media_temp_string += media_temp3[0];
						media_temp_string2 += media_temp3[0].split('=')[0] + '=' + media_temp3[1];
					}
				}
				media_temp_string += ";";
				media_temp_string2 += ";";
			}
			code = code.slice(0, media_arr0.index) + `if (window.matchMedia("(min-width:1611px)").matches) { ${media_temp_string} } else if (window.matchMedia("(max-width:1610px)").matches) { ${media_temp_string2} }` + code.slice(media_arr1.index + 5);
			media_temp_string = '';
			media_temp_string2 = '';
		}
	}
	media_mother = [ ...code.matchAll(/\/<%media%>\//g) ];
	for (let i = 0; i < media_mother.length; i++) {
		media_arr0 = code.match(/\/<%media%>\//);
		media_arr1 = code.match(/%\/%\/%/);
		media_arr2 = code.match(/%\/%\/i/);
		media_temp = code.slice(media_arr0.index + 11, media_arr1.index).split('=');
		media_temp_result = `if (window.matchMedia("(min-width:1611px)").matches) {`;
		media_temp_result += media_temp[0] + `=` + media_temp[1];
		media_temp_result += `} else if (window.matchMedia("(max-width:1610px)").matches) {`;
		media_temp_result += media_temp[0] + `=` + code.slice(media_arr1.index + 5, media_arr2.index) + `}`;
		code = code.slice(0, media_arr0.index) + media_temp_result + code.slice(media_arr2.index + 5);
	}

	return code;
}

FrontMaker.prototype.jsToPoo = async function (dayString, webpack = false) {
  try {
    let code, generalCode, result, svg_result, async_result, temp_string, exec_string, css_code, css_string, css_string_general, css_string_final, svgTong, svgDirBoo;
    let list = await this.mother.fileSystem(`readDir`, [ `${this.links.source}/javascript` ]);
    let past = await this.mother.fileSystem(`readDir`, [ `${this.links.server}/js` ]);
    let map = await this.mother.fileSystem(`readDir`, [ this.links.map ]);
    let mapObj = {}, generalObj, generalObj_clone;

    for (let i of map) { if (i !== ".DS_Store") {
      temp_string = i.replace(/\.js/g, '');
      mapObj[temp_string] = require(`${this.links.map}/${i}`);
    }}
		generalObj = mapObj['general'];

    for (let i of past) {
      this.mother.shell.exec(`rm -f ${this.mother.shellLink(`${this.links.server}/js`)}/${i}`);
    }
    for (let i of list) { if (i !== ".DS_Store") {

			//copy general map
			generalObj_clone = JSON.parse(JSON.stringify(generalObj));

			//code start
      code = await this.mother.fileSystem(`readString`, [ `${this.links.source}/javascript/${i}` ]);

			if (/\/<%media%>\//.test(code)) {
				code = this.mediaLoad(code);
			}

			if (/\/<%contents%>\//.test(code)) {
        code = code.replace(/(\/<%contents%>\/)/g, (await this.mother.fileSystem(`readString`, [ `${this.links.source}/jsGeneral/contents.js` ])));
      }

      if (/\/<%map%>\//.test(code)) {
        code = code.replace(/(\/<%map%>\/)/g, function (match, p1, offset, string) {
					return JSON.stringify(mapObj[i.replace(/\.js/g, '')], null, 2);
        });
      }

			//unshift general
			generalCode = await this.mother.fileSystem(`readString`, [ `${this.links.source}/jsGeneral/general.js` ]);
			generalCode = generalCode.replace(/\/<%generalMap%>\//, function (match, p1, offset, string) {
				for (let j in generalObj_clone.main.interaction) {
					if (j !== i.replace(/\.js/g, '')) {
						delete generalObj_clone.main.interaction[j];
					}
				}
				return JSON.stringify(generalObj_clone, null, 2);
			});

			code = generalCode + "\n\n" + code;
			if (!webpack) {
				code = (await this.mother.fileSystem(`readString`, [ `${this.links.source}/jsGeneral/polyfill.js` ])) + "\n\n" + code;
			}
			exec_string = (await this.mother.fileSystem(`readString`, [ `${this.links.source}/jsGeneral/exec.js` ])).replace(/\/<%name%>\//g, (i.replace(/\.js$/g, '').charAt(0).toUpperCase() + i.replace(/\.js$/g, '').slice(1)));
			code = code + "\n\n" + exec_string;

			//babel compile
      result = await this.mother.babelSystem(code, webpack);

			//css general
			css_code = require(`${this.links.source}/cssGeneral/general.js`);
			css_string_general = this.csso.minify(css_code()).css;
			css_string_general = css_string_general.replace(/"/g, '\\"');

			//css local
			css_code = require(`${this.links.source}/css/${i}`);
      css_string = this.csso.minify(css_code()).css;
			css_string = css_string.replace(/"/g, '\\"');
			css_string_final = this.strings.cssRenderString.replace(/\/<%css%>\//g, ('"' + css_string_general + css_string + '";'));

			//svgTong - init
			svgTong = await this.mother.fileSystem(`readDir`, [ this.links.svgTong ]);
			svgDirBoo = false;
			for (let j of svgTong) { if (j === i) {
				svgDirBoo = true;
			}}

	    svg_result = await this.mother.babelSystem(css_string_final + this.strings.svgTongString + "\n\n" + "const SvgTongGeneral = {};", false, true);
	    svg_result += "\n\n";

	    async_result = await this.mother.babelSystem(this.strings.svgTongString, false, true);
	    async_result = async_result.replace(/SvgTong/g, "SvgTongAsync");
	    async_result += "\n\n";

			//svgTong - general
			svg_result += await this.mother.fileSystem(`readString`, [ `${this.links.svgTong}/general.js` ]);
			svg_result += "\n\n";
			async_result += await this.mother.fileSystem(`readString`, [ `${this.links.svgTong}/general_async.js` ]);
	    async_result += "\n\n";

			//svgTong - local
			if (svgDirBoo) {
				svg_result += await this.mother.fileSystem(`readString`, [ `${this.links.svgTong}/${i}` ]);
				async_result += await this.mother.fileSystem(`readString`, [ `${this.links.svgTong}/${i.replace(/\.js$/g, '')}_async.js` ]);
				await this.mother.fileSystem(`write`, [ `${this.links.server}/js/${i.replace(/\.js$/g, '')}_svg_${dayString}.js`, svg_result ]);
				await this.mother.fileSystem(`write`, [ `${this.links.server}/js/${i.replace(/\.js$/g, '')}_async_${dayString}.js`, async_result ]);
				console.log(`js svg ${i} success`);
				console.log(`js async ${i} success`);
			} else {
				svg_result += '';
				async_result += '';
				await this.mother.fileSystem(`write`, [ `${this.links.server}/js/${i.replace(/\.js$/g, '')}_svg_${dayString}.js`, svg_result ]);
				await this.mother.fileSystem(`write`, [ `${this.links.server}/js/${i.replace(/\.js$/g, '')}_async_${dayString}.js`, async_result ]);
				console.log(`js svg ${i} success (none)`);
				console.log(`js async ${i} success (none)`);
			}

			//final
			if (webpack) {
				await this.mother.fileSystem(`write`, [ `${process.cwd()}/temp/${i}`, result ]);
				await this.mother.webpackSystem(`${i.replace(/\.js$/g, '')}.js`, `${this.links.server}/js/${i.replace(/\.js$/g, '')}_${dayString}.js`);
			} else {
				await this.mother.fileSystem(`write`, [ `${this.links.server}/js/${i.replace(/\.js$/g, '')}_${dayString}.js`, result ]);
			}
			console.log(`js ${i} success`);
    }}
  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.phpExecToPoo = async function () {
  try {
    let code;
    let list = await this.mother.fileSystem(`readDir`, [ `${this.links.source}/phpExec` ]);
    for (let i of list) { if (i !== ".DS_Store") {
      code = await this.mother.fileSystem(`readString`, [ `${this.links.source}/phpExec/${i}` ]);
      await this.mother.fileSystem(`write`, [ `${this.links.server}/${i.replace(/\.php$/g, '')}.php`, code ]);
      console.log(`phpExec ${i} success`);
    }}
  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.phpFunctionToPoo = async function () {
  try {
    let code;
    let list = await this.mother.fileSystem(`readDir`, [ `${this.links.source}/phpFunctions` ]);
    for (let i of list) { if (i !== ".DS_Store") {
      code = await this.mother.fileSystem(`readString`, [ `${this.links.source}/phpFunctions/${i}` ]);
      await this.mother.fileSystem(`write`, [ `${this.links.server}/engine/functions/${i.replace(/\.php$/g, '')}_f.php`, code ]);
      console.log(`phpFunction ${i} success`);
    }}
  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.phpGeneralToPoo = async function (dayString) {
	const infoObj = require(`${process.cwd()}/apps/infoObj.js`);
	const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
	const { fileSystem } = this.mother;
  try {
		const exceptions = [ 'Alimtalk' ];

		//general php
    let code, result;
    let list = await fileSystem(`readDir`, [ `${this.links.source}/phpGeneral` ]);
    for (let i of list) { if (i !== ".DS_Store" && !exceptions.includes(i.replace(/\.js$/g, ''))) {
      code = require(`${this.links.source}/phpGeneral/${i}`);
      result = code(dayString);
      await fileSystem(`write`, [ `${this.links.server}/engine/${i.replace(/\.js$/g, '')}.php`, result ]);
      console.log(`phpGeneral ${i} success`);
    }}

		//set alimtalk
		let template;
		const kakao = new KakaoTalk();
		await kakao.ready();
		template = await kakao.setTalk("complete", "\".$name.\"", "$phone");
		code = require(`${this.links.source}/phpGeneral/Alimtalk.js`);
		result = code(dayString, template);
		await fileSystem(`write`, [ `${this.links.server}/engine/Alimtalk.php`, result ]);
		console.log(`alimtalk success`);

		//set alphasector
    let infoBoo = true;
    if (/real/gi.test(process.argv[3]) || /server/gi.test(process.argv[3]) || /www/gi.test(process.argv[3])) { infoBoo = false; }
    let alpha = {}
    alpha.name = `Alphasector`;
    alpha.code = `<?php\n`;
    alpha.code += `class Alphasector {\n\n`;
    alpha.code += `\tprotected $dbarr = array(\n`;
    alpha.code += `\t\t"dbhost" => "${(infoBoo ? infoObj.myinfo.host : 'localhost')}",\n`;
    alpha.code += `\t\t"dbid" => "${(infoBoo ? infoObj.myinfo.user : infoObj.frontinfo.user)}",\n`;
    alpha.code += `\t\t"dbpw" => "${(infoBoo ? infoObj.myinfo.password : infoObj.frontinfo.password)}",\n`;
    alpha.code += `\t\t"dbname" => "miro81",\n`;
    alpha.code += `\t);\n\n`;
    alpha.code += `\tfunction __construct() {}\n\n`;
    alpha.code += `}\n`;
    alpha.code += `?>`;
    await fileSystem(`write`, [ `${this.links.server}/engine/${alpha.name}.php`, alpha.code ]);
    console.log(`alpha success`);

  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.tokenToPoo = async function () {
  try {
    let code;
    let list = await this.mother.fileSystem(`readDir`, [ `${this.links.source}/token` ]);
    for (let i of list) { if (i !== ".DS_Store") {
      code = await this.mother.fileSystem(`readString`, [ `${this.links.source}/token/${i}` ]);
      await this.mother.fileSystem(`write`, [ `${this.links.server}/engine/token/${i}`, code ]);
      console.log(`token ${i} success`);
    }}
  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.imageToStatic = async function () {
  try {
		let list = await this.mother.fileSystem(`readDir`, [ `${this.links.binary}` ]);
		let list_image = await this.mother.fileSystem(`readDir`, [ `${this.links.server}/list_image` ]);
		for (let i of list_image) { if (list.indexOf(i) !== -1 && i !== ".DS_Store" && i !== "poo") {
			this.mother.shell.exec(`rm -rf ${this.mother.shellLink(`${this.links.server}/list_image/${i}`)};`);
      console.log(`delete image ${i} success`);
		}}
    for (let i of list) { if (i !== ".DS_Store" && i !== "poo" && i !== "www") {
      this.mother.shell.exec(`cp -r ${this.mother.shellLink(`${this.links.binary}/${i}`)} ${this.mother.shellLink(`${this.links.server}/list_image`)};`);
      console.log(`image copy ${i} success`);
    }}
  } catch (e) {
    console.log(e);
  }
}

FrontMaker.prototype.staticSetting = async function () {
	try {
		console.log(`staticSetting...`);
		let home = await this.mother.fileSystem(`readDir`, [ this.links.server_raw ]);
		let pooBoo = true;
		for (let i of home) { if (i === this.links.server_name) {
			pooBoo = false;
		}}
		if (pooBoo) { this.mother.shell.exec(`mkdir ${this.links.server};`); }

		let server = await this.mother.fileSystem(`readDir`, [ this.links.server ]);
		if (server.indexOf(`js`) === -1) { this.mother.shell.exec(`mkdir ${this.links.server}/js`); }
		if (server.indexOf(`list_image`) === -1) { this.mother.shell.exec(`mkdir ${this.links.server}/list_image`); }
		if (server.indexOf(`engine`) === -1) { this.mother.shell.exec(`mkdir ${this.links.server}/engine`); }

		let engine = await this.mother.fileSystem(`readDir`, [ this.links.server + "/engine" ]);
		if (engine.indexOf(`functions`) === -1) { this.mother.shell.exec(`mkdir ${this.links.server}/engine/functions`); }
		if (engine.indexOf(`token`) === -1) { this.mother.shell.exec(`mkdir ${this.links.server}/engine/token`); }

		this.mother.shell.exec(`cp -r ${this.mother.shellLink(`${this.links.binary}/poo`)} ${this.mother.shellLink(this.links.server_raw)};`);
		console.log(`static done`);
		await this.imageToStatic();
	} catch (e) {
		console.log(e);
	}
}

FrontMaker.prototype.totalLaunching = async function (webpack) {
  try {
    const dayString = this.mother.todayMaker();

		await this.setStrings();
    await this.staticSetting();
    await this.jsToPoo(dayString, webpack);
    await this.phpFunctionToPoo();
    await this.phpExecToPoo();
    await this.phpGeneralToPoo(dayString);
    await this.tokenToPoo();
		await this.startChrome(`http://127.0.0.1`, false);

  } catch (e) {
    console.log(e);
  } finally {
    console.log(`done`);
    process.exit();
  }
}

module.exports = FrontMaker;
