const PorfolioFilter = function (clientName, apartName) {
  const Mother = require("../mother.js");
  this.mother = new Mother();
  this.generator = {
    factory: require("./factory/generator.js"),
  }
  this.clientName = clientName;

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
}

PorfolioFilter.prototype.options = {
  home_dir: `${process.env.HOME}/porfolioFilter/`,
  photo_dir: `${process.env.HOME}/porfolioFilter/resource/`,
  result_dir: `${process.env.HOME}/porfolioFilter/result/`,
}

PorfolioFilter.prototype.static_setting = async function () {
  const instance = this;
  try {
    let staticFolderBoo = await this.mother.fileSystem(`readDir`, [ process.env.HOME ]);
    let staticFolderBootr = false;
    for (let i of staticFolderBoo) {
      if (/^porfolioFilter/.test(i)) { staticFolderBootr = true; }
    }
    if (!staticFolderBootr) {
      this.mother.shell.exec(`mkdir ${this.options.home_dir};mkdir ${this.options.home_dir}script;mkdir ${this.options.home_dir}result;mkdir ${this.options.home_dir}resource`);
    } else {
      let staticFolderscriptBoo = await this.mother.fileSystem(`readDir`, [ this.options.home_dir ]);
      let staticFolderscriptBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^script$/.test(i)) { staticFolderscriptBootr = true; }
      }
      if (!staticFolderscriptBootr) { this.mother.shell.exec(`mkdir ${this.options.home_dir}script`); }

      let staticFolderresultBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^result$/.test(i)) { staticFolderresultBootr = true; }
      }
      if (!staticFolderresultBootr) { this.mother.shell.exec(`mkdir ${this.options.home_dir}result`); }

      let staticFolderresourceBootr = false;
      for (let i of staticFolderscriptBoo) {
        if (/^resource$/.test(i)) { staticFolderresourceBootr = true; }
      }
      if (!staticFolderresourceBootr) { this.mother.shell.exec(`mkdir ${this.options.home_dir}resource`); }
    }

    let folderList = [ "factory" ];
    for (let f of folderList) {
      this.mother.shell.exec(`cp -r ./apps/porfolioFilter/${f} ${this.options.home_dir}`);
    }
  } catch (e) {
    console.log(e.message);
  }
}

PorfolioFilter.prototype.image_filter = function (str, size) {
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

PorfolioFilter.prototype.just_filter = function (str) {
  str = str.replace(/\_([0-9][0-9][0-9][0-9][0-9][0-9])/gi, '');
  str = str.replace(/[^0-9]/g, '');
  str = str.replace(/^0/g, '');
  return str;
}

PorfolioFilter.prototype.to_portfolio = async function () {
  const instance = this;
  try {
    let options = {
      home_dir: this.options.home_dir,
      apart_name: this.apartName,
      photo_dir: this.options.photo_dir,
      result_dir: this.options.result_dir,
      photo_list: [],
    };

    let file_list = await this.mother.fileSystem(`readDir`, [ this.options.photo_dir ]);
    let resultFolderBoo = await this.mother.fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i = 0; i < file_list.length; i++) { if (file_list[i] === '.DS_Store') { file_list.splice(i, 1); } }
    if (file_list.length === 0) {
      console.log(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
      process.exit();
    }
    file_list.sort(function (a, b) {
      return Number(instance.just_filter(a)) - Number(instance.just_filter(b));
    });
    for (let i = 0; i < file_list.length; i++) {
      this.mother.shell.exec(`mv ${this.options.home_dir}resource/${file_list[i]} ${this.options.home_dir}resource/photo${String(i + 1)}.jpg`);
      file_list[i] = "photo" + String(i + 1) + ".jpg";
    }
    console.log(file_list);
    options.photo_list = file_list;

    let new_photo_name, new_photo_name_list;
    let photo_sizes = [ "780", "원본" ];
    let photo_sizes_reg = [ /780/g, /원본/g ];
    for (let re of resultFolderBoo) {
      this.mother.shell.exec(`rm -rf ${this.options.home_dir}result/${re};`);
    }
    for (let j = 0; j < photo_sizes.length; j++) {
      new_photo_name_list = [];
      this.mother.shell.exec(`mkdir ${this.options.result_dir}${photo_sizes[j]}`);
      for (let photo of file_list) {
        new_photo_name = this.image_filter(photo, photo_sizes[j]);
        this.mother.shell.exec(`cp ${this.options.photo_dir}${photo} ${this.options.result_dir}${photo_sizes[j] + '/'}${new_photo_name}`);
        new_photo_name_list.push(`${this.options.result_dir}${photo_sizes[j]}/${new_photo_name}`);
      }
      options.size = photo_sizes[j];
      await this.mother.fileSystem(`write`, [ `${this.options.home_dir}script/to_portfolio.js`, this.generator.factory.to_portfolio(new_photo_name_list, options) ]);
      this.mother.shell.exec(`osascript ${this.options.home_dir}factory/applescript/to_portfolio.scpt`);
    }
    await this.mother.fileSystem(`write`, [ `${this.options.home_dir}script/to_png.js`, this.generator.factory.to_png({}, options) ]);
    this.mother.shell.exec(`osascript ${this.options.home_dir}factory/applescript/to_png.scpt`);

  } catch (e) {
    console.log(e.message);
  }
}

PorfolioFilter.prototype.ghost_filter = async function (start_num) {
  const instance = this;
  try {
    let options = {
      home_dir: this.options.home_dir,
      photo_dir: this.options.photo_dir,
      result_dir: this.options.result_dir,
      photo_list: [],
      start_num: start_num,
    };

    let past_list = await this.mother.fileSystem(`readDir`, [ this.options.result_dir ]);
    for (let i of past_list) {
      this.mother.shell.exec(`rm -rf ${this.options.result_dir}${i};`)
    }

    let file_list = await this.mother.fileSystem(`readDir`, [ this.options.photo_dir ]);
    for (let i = 0; i < file_list.length; i++) { if (file_list[i] === '.DS_Store') { file_list.splice(i, 1); } }
    if (file_list.length === 0) {
      console.log(`There is no photo.\nPlease give me photos. in : ${this.options.photo_dir}`);
      process.exit();
    }

    file_list.sort(function (a, b) {
      return Number(a.replace(/^g/g, '').replace(/\.jpg$/, '')) - Number(b.replace(/^g/g, '').replace(/\.jpg$/, ''));
    });
    console.log(file_list);

    options.photo_list = file_list;
    await this.mother.fileSystem(`write`, [ `${this.options.home_dir}script/ghostFilter.js`, this.generator.factory.ghostFilter({}, options) ]);
    this.mother.shell.exec(`osascript ${this.options.home_dir}factory/applescript/ghostFilter.scpt`);

    return { result_folder: `${this.options.home_dir}result`, script_folder: `${this.options.home_dir}factory/applescript` };

  } catch (e) {
    console.log(e.message);
  }
}

PorfolioFilter.prototype.total_make = async function () {
  let instance = this;
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

PorfolioFilter.prototype.ghost_make = async function (exceptionId) {
  //this.clientName => designer;
  const instance = this;
  const { shell, shellLink } = this.mother;
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });
  const get_num = function (obj) { return Number(obj.link.slice(1).replace(/\.jpg$/g, '').split('/')[2].replace(/^g/g,'')); }
  const cloud_folder = this.mother.returnUragenPath();
  const static_folder = `${process.env.HOME}/static`;
  const google_folder = `${process.env.HOME}/google/static`;

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
    let google_folder_ghost, google_folder_boo;

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
    cloud_folder_ghost = await this.mother.fileSystem(`readDir`, `${cloud_folder}/ghost`);
    cloud_folder_boo = false;
    static_folder_ghost = await this.mother.fileSystem(`readDir`, `${static_folder}/ghost`);
    static_folder_boo = false;
    google_folder_ghost = await this.mother.fileSystem(`readDir`, `${google_folder}/ghost`);
    google_folder_boo = false;

    //mkdir designer folder
    for (let dir of cloud_folder_ghost) { if (dir === target_obj.past_desid) { cloud_folder_boo = true; } }
    for (let dir of static_folder_ghost) { if (dir === target_obj.past_desid) { static_folder_boo = true; } }
    for (let dir of google_folder_ghost) { if (dir === target_obj.past_desid) { google_folder_boo = true; } }
    if (!cloud_folder_boo) { shell.exec(`mkdir ${shellLink(cloud_folder)}/ghost/${target_obj.past_desid}`); }
    if (!static_folder_boo) { shell.exec(`mkdir ${shellLink(static_folder)}/ghost/${target_obj.past_desid}`); }
    if (!google_folder_boo) { shell.exec(`mkdir ${shellLink(google_folder)}/ghost/${target_obj.past_desid}`); }

    //copy image to ghost folder
    for (let file of result_files) { if (file !== ".DS_Store") {
      //copy image
      shell.exec(`cp ${shellLink(result_folder)}/${file} ${shellLink(static_folder)}/ghost/${target_obj.past_desid}`);
      shell.exec(`cp ${shellLink(result_folder)}/${file} ${shellLink(cloud_folder)}/ghost/${target_obj.past_desid}`);
      shell.exec(`cp ${shellLink(result_folder)}/${file} ${shellLink(google_folder)}/ghost/${target_obj.past_desid}`);

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


module.exports = PorfolioFilter;
