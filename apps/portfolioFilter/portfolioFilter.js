const PortfolioFilter = function (clientName, apartName, designer, pid = "g0") {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();

  this.dir = `${process.cwd()}/apps/portfolioFilter`;
  this.generator = {
    factory: require(this.dir + "/factory/generator.js"),
  }
  this.clientName = clientName;
  this.designer = designer;
  function apart(str) {
    let arr = str.split(' ');
    let new_string = '';
    for (let i of arr) {
      new_string += i + '_';
    }
    new_string += "홈스타일링_";
    return new_string;
  }
  this.apartName = apart(apartName);
  this.pid = pid;
  this.options = {
    home_dir: `${process.env.HOME}/portfolioFilter`,
    photo_dir: `${process.env.HOME}/portfolioFilter/resource`,
    result_dir: `${process.env.HOME}/portfolioFilter/result`,
  }
}

PortfolioFilter.prototype.static_setting = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  try {
    let staticFolderBoo, staticFolderBootr;
    let order;
    let staticFolderscriptBoo, staticFolderscriptBootr;
    let staticFolderresultBootr, staticFolderresourceBootr;
    let folderList;

    staticFolderBoo = await this.mother.fileSystem(`readDir`, [ process.env.HOME ]);
    staticFolderBootr = false;
    for (let i of staticFolderBoo) {
      if (/^portfolioFilter/.test(i)) {
        staticFolderBootr = true;
      }
    }
    if (!staticFolderBootr) {
      order = ``;
      order += `mkdir ${shellLink(this.options.home_dir)};`;
      order += `mkdir ${shellLink(this.options.home_dir)}/script;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/result;`;
      order += `mkdir ${shellLink(this.options.home_dir)}/resource;`;
      shell.exec(order);
    } else {
      staticFolderscriptBoo = await fileSystem(`readDir`, [ this.options.home_dir ]);
      staticFolderscriptBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^script$/.test(i)) {
          staticFolderscriptBootr = true;
        }
      }
      if (!staticFolderscriptBootr) {
        shell.exec(`mkdir ${shellLink(this.options.home_dir)}/script`);
      }
      staticFolderresultBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^result$/.test(i)) {
          staticFolderresultBootr = true;
        }
      }
      if (!staticFolderresultBootr) {
        shell.exec(`mkdir ${shellLink(this.options.home_dir)}/result`);
      }
      staticFolderresourceBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^resource$/.test(i)) {
          staticFolderresourceBootr = true;
        }
      }
      if (!staticFolderresourceBootr) {
        shell.exec(`mkdir ${shellLink(this.options.home_dir)}/resource`);
      }
    }

    folderList = [ "factory" ];
    for (let f of folderList) {
      shell.exec(`cp -r ${shellLink(process.cwd())}/apps/portfolioFilter/${f} ${shellLink(this.options.home_dir)}`);
    }

  } catch (e) {
    console.log(e.message);
  }
}

PortfolioFilter.prototype.image_filter = function (str, size) {
  let date = new Date();
  let datestring = String(date.getFullYear()).slice(2);
  if (date.getMonth() + 1 < 10) {
    datestring += '0' + String(date.getMonth() + 1);
  } else {
    datestring += String(date.getMonth() + 1);
  }
  if (date.getDate() < 10) {
    datestring += '0' + String(date.getDate());
  } else {
    datestring += String(date.getDate());
  }
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
  str = str.replace(/[^0-9]/g, '');
  str = str.replace(/^0/g, '');
  if (str.length === 1) {
    str = '0' + str;
  }
  str = this.clientName + '_' + size + '_' + str + '_' + datestring + '.jpg';
  return str;
}

PortfolioFilter.prototype.just_filter = function (str) {
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
  str = str.replace(/[^0-9]/g, '');
  str = str.replace(/^0/g, '');
  return str;
}

PortfolioFilter.prototype.to_portfolio = async function () {
  const instance = this;
  const { fileSystem, shell, shellLink, todayMaker } = this.mother;
  let options = {
    home_dir: this.options.home_dir,
    apart_name: this.apartName,
    photo_dir: this.options.photo_dir,
    result_dir: this.options.result_dir,
    photo_list: [],
  };

  try {
    let file_list, resultFolderBoo;
    let new_photo_name, new_photo_name_list;
    let photo_sizes;
    let resultFolder;

    file_list = await fileSystem(`readDir`, [ this.options.photo_dir ]);
    resultFolderBoo = await fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i = 0; i < file_list.length; i++) {
      if (file_list[i] === '.DS_Store') {
        file_list.splice(i, 1);
      }
    }

    if (file_list.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
      process.exit();
    }

    file_list.sort((a, b) => { return Number(instance.just_filter(a)) - Number(instance.just_filter(b)); });
    for (let i = 0; i < file_list.length; i++) {
      shell.exec(`mv ${shellLink(this.options.home_dir)}/resource/${file_list[i]} ${shellLink(this.options.home_dir)}/resource/photo${String(i + 1)}.jpg`);
      file_list[i] = "photo" + String(i + 1) + ".jpg";
    }
    console.log(file_list);
    options.photo_list = file_list;

    photo_sizes = [ "780", "원본" ];

    for (let i of resultFolderBoo) {
      shell.exec(`rm -rf ${shellLink(this.options.home_dir)}/result/${i};`);
    }

    resultFolder = `${this.options.result_dir}/${this.pid}_${this.designer}_${this.clientName}_${todayMaker("year")}`;
    shell.exec(`mkdir ${shellLink(resultFolder)}`);

    for (let i of photo_sizes) {
      new_photo_name_list = [];
      shell.exec(`mkdir ${shellLink(resultFolder)}/${i}`);
      for (let photo of file_list) {
        new_photo_name = this.image_filter(photo, i);
        shell.exec(`cp ${shellLink(this.options.photo_dir)}/${photo} ${shellLink(resultFolder)}/${i}/${new_photo_name}`);
        new_photo_name_list.push(`${resultFolder}/${i}/${new_photo_name}`);
      }
      options.size = i;
      await fileSystem(`write`, [ `${this.options.home_dir}/script/to_portfolio.js`, this.generator.factory.to_portfolio(new_photo_name_list, options) ]);
      shell.exec(`osascript ${this.options.home_dir}/factory/applescript/to_portfolio.scpt`);
    }

    await fileSystem(`write`, [ `${this.options.home_dir}/script/to_png.js`, this.generator.factory.to_png({}, options) ]);
    shell.exec(`osascript ${this.options.home_dir}/factory/applescript/to_png.scpt`);

  } catch (e) {
    console.log(e.message);
  }
}

PortfolioFilter.prototype.ghost_filter = async function (start_num) {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  let options = {
    home_dir: this.options.home_dir,
    photo_dir: this.options.photo_dir,
    result_dir: this.options.result_dir,
    photo_list: [],
    start_num: start_num,
  };

  try {
    let past_list, file_list;

    past_list = await fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i of past_list) {
      shell.exec(`rm -rf ${shellLink(this.options.result_dir)}/${i};`)
    }

    file_list = await fileSystem(`readDir`, [ this.options.photo_dir ]);
    for (let i = 0; i < file_list.length; i++) {
      if (file_list[i] === '.DS_Store') {
        file_list.splice(i, 1);
      }
    }

    if (file_list.length === 0) {
      throw new Error(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
      process.exit();
    }

    file_list.sort((a, b) => { return Number(a.replace(/^g/g, '').replace(/\.jpg$/, '')) - Number(b.replace(/^g/g, '').replace(/\.jpg$/, '')); });
    console.log(file_list);

    options.photo_list = file_list;
    await fileSystem(`write`, [ `${shellLink(this.options.home_dir)}/script/ghostFilter.js`, this.generator.factory.ghostFilter({}, options) ]);
    shell.exec(`osascript ${shellLink(this.options.home_dir)}/factory/applescript/ghostFilter.scpt`);

    return { result_folder: `${this.options.home_dir}/result`, script_folder: `${this.options.home_dir}/factory/applescript` };

  } catch (e) {
    console.log(e.message);
  }
}

PortfolioFilter.prototype.total_make = async function () {
  const instance = this;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  try {
    await MONGOC.connect();
    await this.static_setting();
    await this.to_portfolio();

    

    console.log(`done`);
  } catch (e) {
    console.log(e.message);
  } finally {
    MONGOC.close();
    process.exit();
  }
}

PortfolioFilter.prototype.ghost_make = async function (exceptionId) {
  //this.clientName => designer;
  const instance = this;
  const { shell, shellLink } = this.mother;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  const get_num = function (obj) { return Number(obj.link.slice(1).replace(/\.jpg$/g, '').split('/')[2].replace(/^g/g,'')); }
  const cloud_folder = this.mother.ghostPath() + "/binary/rawDesigner";
  const static_folder = `${process.env.HOME}/static`;

  try {
    await MONGOC.connect();
    await this.static_setting();

    //Designer --------------------------------------------------------------------------------------------------
    let target_obj, ghost_arr, designer_arr;

    //find designer and set designer object
    designer_arr = await MONGOC.db("miro81").collection("Designer").find({ designer: this.clientName }).toArray();
    if (designer_arr.length > 1) {
      if (exceptionId === 0) {
        console.log(`Exception occur : `);
        for (let i = 0; i < designer_arr.length; i++) {
          console.log(`exceptionId : ${String(i+1)} => designer : ${i.designer} / past_desid : ${i.past_desid}`);
        }
      } else {
        target_obj = designer_arr[exceptionId - 1];
      }
    } else {
      target_obj = designer_arr[0];
    }

    //set ghost array
    ghost_arr = target_obj.picture.ghost;


    //Save File --------------------------------------------------------------------------------------------------
    let start_num;
    let result_files, dimensions, to_server;
    let cloud_folder_ghost, cloud_folder_boo;
    let static_folder_ghost, static_folder_boo;

    //find start number of ghost-picture
    if (ghost_arr.length === 0) {
      start_num = 0;
    } else {
      ghost_arr.sort(function (a, b) { return get_num(b) - get_num(a); });
      start_num = get_num(ghost_arr[0]);
    }

    //run ghost filter
    const { result_folder, script_folder } = await this.ghost_filter(start_num);
    result_files = await this.mother.fileSystem(`readDir`, [ result_folder ]);
    to_server = ``;
    console.log(result_files);

    //set ghost folders
    cloud_folder_ghost = await this.mother.fileSystem(`readDir`, [ `${cloud_folder}/ghost` ]);
    cloud_folder_boo = false;
    static_folder_ghost = await this.mother.fileSystem(`readDir`, [ `${static_folder}/ghost` ]);
    static_folder_boo = false;

    //mkdir designer folder
    for (let dir of cloud_folder_ghost) { if (dir === target_obj.past_desid) { cloud_folder_boo = true; } }
    for (let dir of static_folder_ghost) { if (dir === target_obj.past_desid) { static_folder_boo = true; } }
    if (!cloud_folder_boo) { shell.exec(`mkdir ${shellLink(cloud_folder)}/ghost/${target_obj.past_desid}`); }
    if (!static_folder_boo) { shell.exec(`mkdir ${shellLink(static_folder)}/ghost/${target_obj.past_desid}`); }

    //copy image to ghost folder
    for (let file of result_files) { if (file !== ".DS_Store") {
      //copy image
      shell.exec(`cp ${shellLink(result_folder)}/${file} ${shellLink(static_folder)}/ghost/${target_obj.past_desid}`);
      shell.exec(`cp ${shellLink(result_folder)}/${file} ${shellLink(cloud_folder)}/ghost/${target_obj.past_desid}`);

      //find sero / garo
      dimensions = shell.exec(`osascript ${shellLink(script_folder)}/photo_sg.scpt ~/static/ghost/${target_obj.past_desid}/${file}`);
      ghost_arr.unshift({
        link: `/ghost/${target_obj.past_desid}/${file}`,
        sgTrue: dimensions.replace(/[^gs]/g, ''),
      });

      //make scp message
      to_server += `scp -i ${process.env.HOME}/database.pem ${result_folder}/${file} centos@homeliaison-dashboard.xyz:/home/centos/static/ghost/${target_obj.past_desid};`;
    }}
    console.log(ghost_arr);

    await MONGOC.db("miro81").collection(`Designer`).updateOne({ past_desid: target_obj.past_desid }, { $set: { "picture.ghost": ghost_arr } });
    console.log(`done`);
    console.log(to_server);
  } catch (e) {
    console.log(e.message);
  } finally {
    MONGOC.close();
    process.exit();
  }
}


module.exports = PortfolioFilter;
