const AiContents = function (arg = "g00") {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();
  this.back = new BackMaker();

  this.text = {};
  this.portfolioNum = arg;

  this.queryObj = {
    revdeta_query: '',
    revlist_query: '',
    pordeta_query: '',
    porlist_query: '',
  };

  this.motherLink = this.general.motherLink;

  this.options = this.general.options;
  this.options.photo_list = [];
  this.options.new_photo_list = [];
  this.options.new_photo_sg = [];

}

AiContents.prototype.image_filter = function (str) {
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
  str = str.replace(/[^0-9]/g, '');
  str = str.replace(/^0/g, '');
  return str;
}

AiContents.prototype.photo_clean = async function () {
  const { fileSystem, shell, shellLink } = this.mother;
  const { photo_dir } = this.options;
  try {
    let photo_list;

    photo_list = await fileSystem(`readDir`, [ photo_dir ]);
    if (photo_list.length !== 0) {
      for (let i of photo_list) { if (i !== ".DS_Store") {
        shell.exec(`rm -f ${shellLink(photo_dir)}/${i};`);
      }}
      console.log(`clean success`);
    } else {
      console.log(`already clean`);
    }

  } catch (e) {
    console.log(e);
  }
}

AiContents.prototype.photo_search = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, binaryRequest } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  try {
    await this.photo_clean();
    let targetContents, targetPathArr;
    let tempObject, tempName;

    targetContents = await this.back.getContentsByPid(this.portfolioNum);
    targetPathArr = targetContents.toOriginalPath();
    for (let i of targetPathArr) {
      tempName = (i.split('/'))[i.split('/').length - 1];
      tempObject = await binaryRequest(ADDRESS.s3info.host + i);
      await fileSystem(`writeBinary`, [ this.options.photo_dir + "/" + tempName, tempObject ]);
      console.log(`download success`);
    }

  } catch (e) {
    console.log(e);
  }
}

AiContents.prototype.photo_sort = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const { photo_dir } = this.options;
  const sortFilter = function (str) {
    str = str.replace(/\.jpg$/, '');
    str = str.replace(/_[0-9][0-9][0-9][0-9][0-9][0-9]$/, '');
    str = str.replace(/[ap][0-9]+$/, '');
    str = str.replace(/[^0-9]/g, '');
    str = str.replace(/^0/, '');
    return Number(str);
  }
  try {
    let photo_list = [];
    let file_list = await fileSystem(`readDir`, [ photo_dir ]);
    if (file_list.length === 0) {
      console.log(`there is no photo`);
      process.exit();
    }

    for (let i = 0; i < file_list.length; i++) { if (file_list[i] === '.DS_Store') {
      file_list.splice(i, 1);
    }}

    file_list.sort((a, b) => { return sortFilter(a) - sortFilter(b); });

    for (let i = 0; i < file_list.length; i++) {
      shell.exec(`mv ${shellLink(photo_dir)}/${file_list[i]} ${shellLink(photo_dir)}/photo${String(i + 1)}.jpg`);
      photo_list.push("photo" + String(i + 1) + ".jpg");
    }

    console.log(photo_list);
    console.log(`sort success`);

    return photo_list;
  } catch (e) {
    console.log(e);
  }
}

AiContents.prototype.photo_list = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  try {
    let adobe, tempAppList;
    tempAppList = await fileSystem(`readDir`, [ `/Applications` ]);
    for (let i of tempAppList) {
      if (/Photoshop/gi.test(i)) {
        adobe = i;
      }
    }
    const photo_list = await this.photo_sort();
    const photoshopScript = function (argv, app) {
      let text = '';
      text += 'tell application "' + app + '"\n';
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
    let new_item, dimensions;

    this.options.photo_list = photo_list;
    for (let item of photo_list) {
      dimensions = await this.mother.appleScript(`photosg_${item.replace(/[^0-9]/g, '')}`, photoshopScript(`${this.options.photo_dir}/${item}`, adobe), `${this.options.home_dir}/temp`, false);
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

AiContents.prototype.makeAnd_execute = async function () {
  const instance = this;
  const { fileSystem, babelSystem, shell, shellLink } = this.mother;
  const { home_dir } = this.options;
  try {
    const orders = [ "portfolio_contents", "portfolio_titles", "portfolio_photo" ];
    const review_orders = [ "review_contents", "review_titles" ];

    //script maker
    let temp_scriptString = '';
    for (let i of orders) {
      temp_scriptString = `var text = ${JSON.stringify(this.text, null, 2)};\n`;
      temp_scriptString += await fileSystem(`readString`, [ `${home_dir}/factory/script/polyfill.js` ]);
      temp_scriptString += `\n`;
      temp_scriptString += await babelSystem(this.general.generator.contents_maker[i](this.options));
      await fileSystem(`write`, [ `${home_dir}/script/${i}.js`, temp_scriptString ]);
    }
    if (this.text.r_id !== "re999") {
      for (let i of review_orders) {
        temp_scriptString = `var text = ${JSON.stringify(this.text, null, 2)};\n`;
        temp_scriptString += await fileSystem(`readString`, [ `${home_dir}/factory/script/polyfill.js` ]);
        temp_scriptString += `\n`;
        temp_scriptString += await babelSystem(this.general.generator.contents_maker[i](this.options));
        await fileSystem(`write`, [ `${home_dir}/script/${i}.js`, temp_scriptString ]);
      }
    }

    //folder maker
    let resultFolderLink = `${shellLink(home_dir)}/result`;
    let resultFolderBoo = await fileSystem(`readDir`, [ `${home_dir}/result` ]);
    for (let i of resultFolderBoo) {
      shell.exec(`rm -rf ${resultFolderLink}/${i}`);
    }
    shell.exec(`mkdir ${resultFolderLink}/${this.text.p_id}code`);
    shell.exec(`mkdir ${resultFolderLink}/${this.text.p_id}code/portp${this.text.p_id}`);
    shell.exec(`mkdir ${resultFolderLink}/${this.text.p_id}code/portp${this.text.p_id}/svg`);
    shell.exec(`mkdir ${resultFolderLink}/${this.text.p_id}code/portp${this.text.p_id}/mobile`);

    if (this.text.r_id !== "re999") {
      shell.exec(`mkdir ${resultFolderLink}/${this.text.r_id}code`);
      shell.exec(`mkdir ${resultFolderLink}/${this.text.r_id}code/${this.text.r_id}`);
    }

    //execute
    let factoryFolderLink = `${shellLink(home_dir)}/factory`;
    for (let i of orders) {
      shell.exec(`osascript ${factoryFolderLink}/applescript/start_adobe.scpt ${i}`);
    }
    if (this.text.r_id !== "re999") {
      for (let i of review_orders) {
        shell.exec(`osascript ${factoryFolderLink}/applescript/start_adobe.scpt ${i}`);
      }
    }
    shell.exec(`osascript ${factoryFolderLink}/applescript/return_terminal.scpt`);

  } catch (e) {
    console.log(e.message);
  }
}

AiContents.prototype.query_maker = async function (result) {
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
    await this.mother.fileSystem(`write`, [ `${this.options.home_dir}/result/query_${this.portfolioNum}.js`, JSON.stringify(this.queryObj) ]);

  } catch (e) {
    console.log(e.message);
  }
}

AiContents.prototype.total_make = async function () {
  const instance = this;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  try {
    let targetContents = await this.back.getContentsByPid(this.portfolioNum);
    this.text = targetContents.toAiState();

    await MONGOC.connect();

    await this.general.static_setting();
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

AiContents.prototype.to_mysql = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const { home_dir } = this.options;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  const sliceQuery = function (str) {
    if (str.search(/\(/g) === -1) {
      return "nothing";
    } else {
      let columns = str.slice(str.search(/\(/g) + 1, str.search(/\)/g)).split(',');
      let values = str.slice(str.search(/VALUES \(/g) + 8, str.search(/\)\;/g)).replace(/^'/, '').replace(/'$/, '').split("','");
      let obj = {}
      for (let i = 0; i < columns.length; i++) {
        obj[columns[i]] = values[i];
      }
      return obj;
    }
  }
  const mongoList = { FP1_porlist: "porlist_query", FP2_pordeta: "pordeta_query", FR1_revlist: "revlist_query", FR2_revdeta: "revdeta_query" };

  try {
    let pidResultarr, p_id, queryObj;

    pidResultarr = await fileSystem(`readDir`, [ `${home_dir}/result` ]);
    for (let i = 0; i < pidResultarr.length; i++) {
      if (/^[a|p][0-9]+/g.test(pidResultarr[i])) {
        p_id = pidResultarr[i].replace(/code/g, '');
      }
    }
    queryObj = JSON.parse(await fileSystem(`readString`, [ `${home_dir}/result/query_${p_id}.js` ]));

    await MONGOC.connect();
    console.log(`mongo connect success`);
    for (let coll in mongoList) {
      if (sliceQuery(queryObj[mongoList[coll]]) !== "nothing") {
        await MONGOC.db(`miro81`).collection(coll).insertOne(sliceQuery(queryObj[mongoList[coll]]));
        console.log(`insert to ${coll} success`);
        console.log(sliceQuery(queryObj[mongoList[coll]]));
      }
    }

    const POOL = this.mother.mysql.createPool(this.mother.frontinfo);
    const PPOOL = POOL.promise();
    console.log(`mysql connect success`);
    await PPOOL.query(queryObj.pordeta_query);
    await PPOOL.query(queryObj.porlist_query);
    if (queryObj.revdeta_query !== '') {
      await PPOOL.query(queryObj.revdeta_query);
      await PPOOL.query(queryObj.revlist_query);
    }
    console.log("insert success");

  } catch (e) {
    console.log(e.message);
  } finally {
    MONGOC.close();
    process.exit();
  }
}


// poo -----------------------------------------------------------------------------------------------------------------------

AiContents.prototype.to_poo = async function () {
  const instance = this;
  const mother = this.mother;
  try {

    //setting binary folders -------------------------------------------------------------------------------------------------
    let pooPath_mother, pooPath;
    let webPath_mother, webPath;
    let staticPath_mother, staticPath;

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

    //setting ids -----------------------------------------------------------------------------------------------------------
    let arr;
    let p_id, r_id;
    let p_path, r_path;
    let svgAis, revAis;
    let delete_arr = [];
    let revdelete_arr = [];

    //set p_id and r_id
    arr = await mother.fileSystem(`readDir`, [ `${this.options.home_dir}/result` ]);
    p_id = `none`;
    r_id = `none`;
    for (let i = 0; i < arr.length; i++) {
      if (/^[ap][0-9]+/g.test(arr[i])) { p_id = arr[i].replace(/code/g, ''); }
      else if (/^re[0-9]+/g.test(arr[i])) { r_id = arr[i].replace(/code/g, ''); }
    }

    //move svgs and ai delete
    p_path = `${this.options.home_dir}/result/${p_id}code`;
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

    //review version
    if (r_id !== `none`) {
      r_path = `${this.options.home_dir}/result/${r_id}code`;
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

module.exports = AiContents;
