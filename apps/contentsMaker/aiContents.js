const AiContents = function (arg = "g00") {
  const ContentsMaker = require(`${process.cwd()}/apps/contentsMaker/contentsMaker.js`);
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  this.general = new ContentsMaker();
  this.mother = new Mother();
  this.back = new BackMaker();
  this.address = require(`${process.cwd()}/apps/infoObj.js`);

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
      // tempObject = await binaryRequest(ADDRESS.s3info.host + i);
      tempObject = await binaryRequest("https://" + ADDRESS.officeinfo.ghost.host + i);
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
  const { fileSystem, shell, shellLink } = this.mother;
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
      temp_scriptString += this.general.generator.contents_maker[i](this.options);
      await fileSystem(`write`, [ `${home_dir}/script/${i}.js`, temp_scriptString ]);
    }
    if (this.text.r_id !== "re999") {
      for (let i of review_orders) {
        temp_scriptString = `var text = ${JSON.stringify(this.text, null, 2)};\n`;
        temp_scriptString += await fileSystem(`readString`, [ `${home_dir}/factory/script/polyfill.js` ]);
        temp_scriptString += `\n`;
        temp_scriptString += this.general.generator.contents_maker[i](this.options);
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
    this.queryObj.pordeta_query += `'${result.past_desid}',`;
    this.queryObj.pordeta_query += `'${result.designer}',`;
    this.queryObj.pordeta_query += `'${this.text.sub_titles.portivec.main}',`;
    this.queryObj.pordeta_query += `'',`;
    this.queryObj.pordeta_query += `'${this.text.r_id}');`;

    this.queryObj.porlist_query = `INSERT INTO porlist (porlid,photodae_s,photodae_d,desid,designer,region,method,key8,key9,tag,title,subtitle,apart,pyeong) VALUES (`;
    this.queryObj.porlist_query += `'${this.text.p_id}',`;
    this.queryObj.porlist_query += `'${String(this.text.p_info.photodae[0])}',`;
    this.queryObj.porlist_query += `'${String(this.text.p_info.photodae[1])}',`;
    this.queryObj.porlist_query += `'${result.past_desid}',`;
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
      this.queryObj.revdeta_query += `'${result.past_desid}',`;
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
  const Filter = this.back.idFilter("designer");
  try {
    let targetContents = await this.back.getContentsByPid(this.portfolioNum);
    this.text = targetContents.toAiState();

    await this.general.static_setting();
    await this.photo_search();
    await this.photo_list();
    await this.makeAnd_execute();

    let result;
    if (/^de/.test(this.text.designer)) {
      result = await this.back.getDesignerById(Filter.pastToNew(this.text.designer));
    } else {
      result = await this.back.getDesignerById(this.text.designer);
    }

    result.past_desid = Filter.newToPast(this.text.designer);

    await this.query_maker(result);
    console.log(`done`);

  } catch (e) {
    console.log(e);
  }
}


// mysql -----------------------------------------------------------------------------------------------------------------------

AiContents.prototype.to_mysql = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const { home_dir } = this.options;
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
  const transQueryObj = function (obj) {
    const insertToUpdateSelect = function (insertQuery) {
      let tempArr, updateQuery, selectQuery, porlid;
      let thisTable, columnArr, valueArr;

      if (insertQuery === "") {
        return { update: "", select: "" };
      }

      tempArr = insertQuery.split("(");
      for (let i = 0; i < tempArr.length; i++) {
        tempArr[i] = tempArr[i].split(")")[0].trim();
      }

      thisTable = tempArr[0].split(" ")[2].trim();
      columnArr = tempArr[1].split(',');
      valueArr = tempArr[2].slice(1, -1).split("','");

      updateQuery = `UPDATE ${thisTable} SET `;
      for (let i = 0; i < columnArr.length; i++) {
        if (columnArr[i] !== "porlid" && columnArr[i] !== "revid") {
          updateQuery += columnArr[i];
          updateQuery += " = '";
          updateQuery += valueArr[i];
          updateQuery += "', ";
        } else if (columnArr[i] === "porlid") {
          porlid = valueArr[i];
        }
      }
      updateQuery = updateQuery.slice(0, -2);
      updateQuery += " WHERE porlid = '";
      updateQuery += porlid;
      updateQuery += "';";

      selectQuery = `SELECT * FROM ${thisTable} WHERE porlid = '${porlid}';`;

      return { update: updateQuery, select: selectQuery };
    }
    let result;
    result = {};
    for (let i in obj) {
      result[i] = insertToUpdateSelect(obj[i]);
    }
    return result;
  }

  try {
    let pidResultarr, p_id, queryObj;
    let subQueryObj;
    let tempResult, row;

    pidResultarr = await fileSystem(`readDir`, [ `${home_dir}/result` ]);
    p_id = null;
    for (let i = 0; i < pidResultarr.length; i++) {
      if (/^[a|p][0-9]+/g.test(pidResultarr[i])) {
        p_id = pidResultarr[i].replace(/code/g, '');
      }
    }

    if (p_id === null) {
      throw new Error("cannot found pid");
    }

    queryObj = JSON.parse(await fileSystem(`readString`, [ `${home_dir}/result/query_${p_id}.js` ]));
    subQueryObj = transQueryObj(queryObj);

    const POOL = this.mother.mysql.createPool(this.mother.frontinfo);
    const PPOOL = POOL.promise();
    console.log(`mysql connect success`);

    tempResult = await PPOOL.query(subQueryObj.pordeta_query.select);
    row = tempResult[0];
    if (row.length === 0) {
      await PPOOL.query(queryObj.pordeta_query);
      console.log(`insert pordeta done`);
    } else {
      await PPOOL.query(subQueryObj.pordeta_query.update);
      console.log(`update pordeta done`);
    }

    tempResult = await PPOOL.query(subQueryObj.porlist_query.select);
    row = tempResult[0];
    if (row.length === 0) {
      await PPOOL.query(queryObj.porlist_query);
      console.log(`insert porlist done`);
    } else {
      await PPOOL.query(subQueryObj.porlist_query.update);
      console.log(`update porlist done`);
    }

    if (queryObj.revdeta_query !== '') {
      tempResult = await PPOOL.query(subQueryObj.revdeta_query.select);
      row = tempResult[0];
      if (row.length === 0) {
        await PPOOL.query(queryObj.revdeta_query);
        console.log(`insert revdeta done`);
      } else {
        await PPOOL.query(subQueryObj.revdeta_query.update);
        console.log(`update revdeta done`);
      }
      tempResult = await PPOOL.query(subQueryObj.revlist_query.select);
      row = tempResult[0];
      if (row.length === 0) {
        await PPOOL.query(queryObj.revlist_query);
        console.log(`insert revlist done`);
      } else {
        await PPOOL.query(subQueryObj.revlist_query.update);
        console.log(`update revlist done`);
      }
    }

    await this.to_google(p_id);

  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}


// poo -----------------------------------------------------------------------------------------------------------------------

AiContents.prototype.to_poo = async function () {
  const instance = this;
  const { fileSystem, shellExec, shellLink, ghostFileUpload, copyToClipboard } = this.mother;
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  try {

    const front_www = `${ADDRESS["frontinfo"]["user"]}@${ADDRESS["frontinfo"]["host"]}:/${ADDRESS["frontinfo"]["user"]}/www`;
    const image = `list_image`;
    const porporpor = `list_svg/porporpor`;
    const revrevrev = `list_svg/revrevrev`;
    let p_path_server, r_path_server;
    let order;
    let arr;
    let p_id, r_id;
    let p_path, r_path;
    let svgAis, revAis;
    let delete_arr = [];
    let revdelete_arr = [];
    let ghostTargetDir, ghostTargetDirList;
    let fromArr, toArr;

    //set p_id and r_id
    arr = await fileSystem(`readDir`, [ `${this.options.home_dir}/result` ]);
    p_id = `none`;
    r_id = `none`;
    for (let i = 0; i < arr.length; i++) {
      if (/^[ap][0-9]+/g.test(arr[i])) {
        p_id = arr[i].replace(/code/g, '');
      } else if (/^re[0-9]+/g.test(arr[i])) {
        r_id = arr[i].replace(/code/g, '');
      }
    }

    //move svgs and ai delete
    p_path = `${this.options.home_dir}/result/${p_id}code`;
    p_path_server = `${front_www}/${porporpor}`;

    order = ``;
    order += `scp ${shellLink(p_path)}/moportivecgaro${p_id}.svg ${p_path_server}/mobile/motitlegaro/;`;
    order += `scp ${shellLink(p_path)}/portivecgaro${p_id}.svg ${p_path_server}/titlegaro/;`;
    order += `scp ${shellLink(p_path)}/porhovecgaro${p_id}.svg ${p_path_server}/titlehovergaro/;`;
    order += `scp ${shellLink(p_path)}/moportivec${p_id}.svg ${p_path_server}/mobile/motitlesero/;`;
    order += `scp ${shellLink(p_path)}/portivec${p_id}.svg ${p_path_server}/titlesero/;`;
    order += `scp ${shellLink(p_path)}/porhovec${p_id}.svg ${p_path_server}/titlehoversero/;`;

    svgAis = await fileSystem(`readDir`, [ `${p_path}/portp${p_id}/svg` ]);
    delete_arr = [];
    for (let i of svgAis) {
      if (/\.ai$/g.test(i)) {
        delete_arr.push(i);
      }
    }
    for (let ai of delete_arr) {
      order += `rm -f ${shellLink(p_path)}/portp${p_id}/svg/${ai};`;
    }

    //review version
    if (r_id !== `none`) {
      r_path = `${this.options.home_dir}/result/${r_id}code`;
      r_path_server = `${front_www}/${revrevrev}`;

      order += `scp ${shellLink(r_path)}/morevtivec${r_id}.svg ${r_path_server}/morevivector/;`;
      order += `scp ${shellLink(r_path)}/revhovec${r_id}.svg ${r_path_server}/revhovector/;`;
      order += `scp ${shellLink(r_path)}/revtivec${r_id}.svg ${r_path_server}/revivector/;`;
      order += `scp ${shellLink(r_path)}/nu${r_id}.svg ${r_path_server}/detail/number;`;
      order += `scp -r ${shellLink(r_path)}/${r_id} ${r_path_server}/detail/;`;

      revAis = await fileSystem(`readDir`, [ `${r_path}/${r_id}` ]);
      for (let i of revAis) {
        if (/\.ai$/g.test(i)) {
          revdelete_arr.push(i);
        }
      }
      for (let ai of revdelete_arr) {
        order += `rm -f ${shellLink(r_path)}/${r_id}/${ai};`;
      }

    }

    order += `scp -r ${shellLink(p_path)}/portp${p_id} ${front_www}/${image}/;`;

    await shellExec(order);

    // ghostTargetDir = `${this.options.home_dir}/result/${p_id}code/portp${p_id}`;
    // ghostTargetDirList = await fileSystem(`readDir`, [ ghostTargetDir ]);
    //
    // fromArr = [];
    // toArr = [];
    // for (let i of ghostTargetDirList) {
    //   if (i !== `.DS_Store` && /^[bt]/.test(i)) {
    //     fromArr.push(ghostTargetDir + "/" + i);
    //     toArr.push(`corePortfolio/listImage/${p_id}/${i}`);
    //   }
    // }
    //
    // ghostTargetDir = `${this.options.home_dir}/result/${p_id}code/portp${p_id}/mobile`;
    // ghostTargetDirList = await fileSystem(`readDir`, [ ghostTargetDir ]);
    //
    // for (let i of ghostTargetDirList) {
    //   if (i !== `.DS_Store`) {
    //     fromArr.push(ghostTargetDir + "/" + i);
    //     toArr.push(`corePortfolio/listImage/${p_id}/mobile/${i}`);
    //   }
    // }
    //
    // console.log(fromArr);
    // console.log(toArr);
    //
    // await ghostFileUpload(fromArr, toArr);

  } catch (e) {
    console.log(e.message);
  } finally {
    process.exit();
  }
}

AiContents.prototype.to_google = async function (pid) {
  const instance = this;
  const { mongo, mongoinfo, dateToString, errorLog, messageSend } = this.mother;
  const back = this.back;
  try {
    if (typeof pid !== "string") {
      throw new Error("invaild input");
    }
    const GoogleDocs = require(`${process.cwd()}/apps/googleAPIs/googleDocs.js`);
    const GoogleDrive = require(`${process.cwd()}/apps/googleAPIs/googleDrive.js`);
    const selfMongo = new mongo(mongoinfo);
    const motherId = "1dr47rrgppRWa3-u0Tl28GgJ4rpjhwD52";
    const docs = new GoogleDocs();
    const drive = new GoogleDrive();
    const today = new Date();
    const server = "https://" + this.address.officeinfo.ghost.host;
    const portfolioLink = "https://" + this.address.frontinfo.host + "/portdetail.php?pid=";
    const reviewLink = "https://" + this.address.frontinfo.host + "/revdetail.php?pid=";
    const makeLink = (id) => { return `https://docs.google.com/document/d/${id}/edit?usp=sharing`; };
    const KakaoTalk = require(`${process.cwd()}/apps/kakaoTalk/kakaoTalk.js`);
    const kakaoInstance = new KakaoTalk();
    let cliid, desid;
    let client, designer;
    let portfolioId, reviewId;
    let contents, contentsArr;
    let motherObj;
    let portfolio, review;
    let portfolioTitle, reviewTitle;
    let rid;
    let channel;
    let photoFolderId;
    let photoLink;
    let proid;
    let project;

    await selfMongo.connect();

    contentsArr = await back.getContentsArrByQuery({ "contents.portfolio.pid": pid }, { selfMongo });
    contents = contentsArr[0];

    rid = contents.contents.review.rid;
    desid = contents.desid;
    cliid = null;
    if (contents.cliid !== '') {
      cliid = contents.cliid;
    }
    proid = contents.proid;

    designer = await back.getDesignerById(desid, { selfMongo });
    client = null;
    if (cliid !== null) {
      client = await back.getClientById(cliid, { selfMongo });
    }

    photoFolderId = await drive.searchId_inPython(pid + "_" + designer.designer + "_");
    photoLink = await drive.read_webView_inPython(photoFolderId);

    portfolioTitle = pid + "_" + designer.designer + "D_";
    if (client !== null) {
      portfolioTitle += client.name + "C_";
    }
    reviewTitle = portfolioTitle;
    portfolioTitle += "디자이너글_";
    reviewTitle += "고객리뷰_";
    portfolioTitle += dateToString(today).replace(/-/g, '').slice(2);
    reviewTitle += dateToString(today).replace(/-/g, '').slice(2);

    motherObj = contents.getGoogleDocsDetail(server);
    portfolio = motherObj.portfolio;
    review = motherObj.review;

    // portfolioId = await docs.create_newDocs_inPython(portfolioTitle, motherId);
    // console.log(portfolioId);
    // await docs.update_contents_inPython(portfolioId, portfolio);

    portfolioId = "";

    if (review.length !== 0) {
      // reviewId = await docs.create_newDocs_inPython(reviewTitle, motherId);
      // console.log(reviewId);
      // await docs.update_contents_inPython(reviewId, review);
      reviewId = "";
    } else {
      reviewId = null;
    }

    channel = "#502_sns_contents";

    if (reviewId !== null && client !== null) {

      // await messageSend({ text: `${client.name} 고객님, ${designer.designer} 디자이너 포트폴리오 글의 세팅을 완료하였습니다! 확인부탁드립니다. link : ${makeLink(portfolioId)}`, channel });
      // await messageSend({ text: `${client.name} 고객님의 고객 인터뷰 글의 세팅을 완료하였습니다! 확인부탁드립니다. link : ${makeLink(reviewId)}`, channel });
      await messageSend({ text: `${client.name} 고객님 세팅 사진 원본 link : ${photoLink}`, channel });

      channel = "#200_web";
      await messageSend({ text: `${client.name} 고객님 디자이너 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${portfolioLink + pid}`, channel });
      await messageSend({ text: `${client.name} 고객님 고객 인터뷰 컨텐츠를 웹에 업로드하였습니다! link : ${reviewLink + pid}`, channel });

      await kakaoInstance.sendTalk("contentsShareClient", client.name, client.phone, {
        client: client.name,
        host: instance.address.frontinfo.host,
        pid
      });
      await kakaoInstance.sendTalk("contentsShareDesigner", designer.designer, designer.information.phone, {
        client: client.name,
        designer: designer.designer,
        host: instance.address.frontinfo.host,
        pid,
        proid,
      });
      await messageSend({ text: `${client.name} 고객님에게 컨텐츠 공유 링크를 보냈어요.`, channel: "#502_sns_contents", voice: true });

      project = await back.getProjectById(proid, { selfMongo });
      if (project !== null) {
        await back.updateProject([ { proid }, { "contents.share.client.contents": new Date(),  "contents.share.designer.contents": new Date() } ]);
      }

    } else {
      if (client === null) {

        // await messageSend({ text: `${designer.designer} 디자이너 포트폴리오 글의 세팅을 완료하였습니다! 확인부탁드립니다. link : ${makeLink(portfolioId)}`, channel });
        await messageSend({ text: `${designer.designer} 디자이너 포트폴리오 사진 원본 link : ${photoLink}`, channel });
  
        channel = "#200_web";
        await messageSend({ text: `${designer.designer} 디자이너 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${portfolioLink + pid}`, channel });
  
        if (proid !== '') {
          // await kakaoInstance.sendTalk("contentsShareDesigner", designer.designer, designer.information.phone, {
          //   client: client.name,
          //   designer: designer.designer,
          //   host: instance.address.frontinfo.host,
          //   pid,
          //   proid,
          // });
          // await messageSend({ text: `${designer.designer} 디자이너님에게 컨텐츠 공유 링크를 보냈어요.`, channel: "#502_sns_contents", voice: true });
  
          project = await back.getProjectById(proid, { selfMongo });
          if (project !== null) {
            await back.updateProject([ { proid }, { "contents.share.designer.contents": new Date() } ]);
          }
        }

      } else {

        // await messageSend({ text: `${client.name} 고객님, ${designer.designer} 디자이너 포트폴리오 글의 세팅을 완료하였습니다! 확인부탁드립니다. link : ${makeLink(portfolioId)}`, channel });
        await messageSend({ text: `${client.name} 고객님 세팅 사진 원본 link : ${photoLink}`, channel });
  
        channel = "#200_web";
        await messageSend({ text: `${client.name} 고객님 디자이너 포트폴리오 컨텐츠를 웹에 업로드하였습니다! link : ${portfolioLink + pid}`, channel });
  
        // await kakaoInstance.sendTalk("contentsShareDesigner", designer.designer, designer.information.phone, {
        //   client: client.name,
        //   designer: designer.designer,
        //   host: instance.address.frontinfo.host,
        //   pid,
        //   proid,
        // });
  
        project = await back.getProjectById(proid, { selfMongo });
        if (project !== null) {
          await back.updateProject([ { proid }, { "contents.share.client.contents": new Date(),  "contents.share.designer.contents": new Date() } ]);
        }

      }
    }

    await selfMongo.close();

  } catch (e) {
    console.log(e);
  }
}

module.exports = AiContents;
