const Router = function (arr) {
  const Mother = require("../../mother.js");
  this.mother = new Mother();
  this.mongo = arr[0];
  this.data = arr[1];
  this.setting = arr[2];
  this.template = arr[3];
}

//GET---------------------------------------------------------------------------

Router.prototype.rou_get_Root = function () {
  let instance = this;
  let obj = { link: '/' }
  obj.func = function (req, res) {
    try {
      res.redirect(`/first/BC1_conlist`);
    } catch (e) {
      console.log(e.message);
    }
  }
  return obj;
}

Router.prototype.rou_get_First = function () {
  let instance = this;
  let obj = { link: '/first/:id' }
  obj.func = function (req, res) {
    try {
      if (!req.session[req.params.id]) { req.session[req.params.id] = instance.setting[req.params.id]; }
      console.log(req.session);
      res.set('Content-Type', 'text/html');
      res.send(instance.template.first_render(instance.data[req.params.id], req.session[req.params.id]['order']));
    } catch (e) {
      console.log(e.message);
    }
  }
  return obj;
}

Router.prototype.rou_get_Second = function () {
  let instance = this;
  let obj = { link: '/second/:id' }
  obj.func = async function (req, res) {
    try {
      let sort_obj = {};
      sort_obj[instance.data[req.params.id].standard] = -1;
      let rows = await instance.mongo.db("miro81").collection(req.params.id).find({}).project({}).sort(sort_obj).toArray();
      res.set('Content-Type', 'text/html');
      res.send(instance.template.second_render(instance.data[req.params.id], rows));
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_get_SessionDelete = function () {
  let instance = this;
  let obj = { link: '/session_delete' }
  obj.func = function (req, res) {
    req.session.destroy(function () {
      req.session;
      res.send(`success!`);
      // sessionStore.close();
    });
  }
  return obj;
}

Router.prototype.rou_get_Mongo = function () {
  let instance = this;
  let obj = { link: '/mongo/:id' }
  obj.func = async function (req, res) {
    let mongoSetting, mongoRoot, plugins, plugins_raw;
    try {
      mongoRoot = `${process.cwd()}/apps/dataConsole/block_data/mongo`;
      mongoSetting = require(`${mongoRoot}/${req.params.id}/${req.params.id}_data.js`);

      //set css
      if (/Mac/g.test(req.useragent.platform)) {
        mongoSetting.css = await instance.mother.fileSystem(`readString`, [ `${mongoRoot}/${mongoSetting.dbtitle}/${mongoSetting.dbtitle}.css` ]);
      } else if (/Window/g.test(req.useragent.platform)) {
        mongoSetting.css = await instance.mother.fileSystem(`readString`, [ `${mongoRoot}/${mongoSetting.dbtitle}/${mongoSetting.dbtitle}_windows.css` ]);
      }

      //set js general
      mongoSetting.js = await instance.mother.fileSystem(`readString`, [ `${mongoRoot}/genemongo.js` ]);

      //set js local
      mongoSetting.js += await instance.mother.fileSystem(`readString`, [ `${mongoRoot}/${mongoSetting.dbtitle}/${mongoSetting.dbtitle}.js` ]);

      //set js plugins
      plugins = await instance.mother.fileSystem(`readDir`, [ `${mongoRoot}/${mongoSetting.dbtitle}/plugins` ]);
      for (let i of plugins) { if (i !== `.DS_Store`) {
        mongoSetting.js += await instance.mother.fileSystem(`readString`, [ `${mongoRoot}/${mongoSetting.dbtitle}/plugins/${i}` ]);
      }}

      //set query
      mongoSetting.query = req.query;

      //end
      res.set('Content-Type', 'text/html');
      res.send(instance.template.mongo_render(mongoSetting));

    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}


//POST--------------------------------------------------------------------------

//DIAGRAM-----------------------------------------------------------------------

Router.prototype.rou_post_diagramR = function () {
  let instance = this;
  let obj = { link: '/diagram_setting_reading' }
  obj.func = async function (req, res) {
    try {
      let qquery = { row_title: req.body.qquery };
      let search = await instance.mongo.db("miro81").collection("BS2_diagram").find(qquery).toArray();
      let data = search[0].row_contents;
      res.send(JSON.stringify(data));
    } catch (e) { console.error("error", e.message); }
  }
  return obj;
}

Router.prototype.rou_post_diagramU = function () {
  let instance = this;
  let obj = { link: '/diagram_setting_update' }
  obj.func = async function (req, res) {
    try {
      let set_query;
      let qquery = { row_title: req.body.qquery };
      let search = await instance.mongo.db("miro81").collection("BS2_diagram").find(qquery).toArray();
      if (Number(req.body.itemsboo)) {
        search[0]["row_contents"][req.body.where0][req.body.where1].items[Number(req.body.where2)] = Number(req.body.value);
      } else {
        search[0]["row_contents"][req.body.where0][req.body.where1][req.body.where2] = req.body.value;
      }
      await instance.mongo.db("miro81").collection("BS2_diagram").updateOne(qquery, { $set: search[0] });
      res.send("success");
    } catch (e) { console.error("error", e.message); }
  }
  return obj;
}



//MONGO CRUD--------------------------------------------------------------------

Router.prototype.rou_post_mongoFind = function () {
  let instance = this;
  let obj = { link: '/post_mfind' }
  obj.func = async function (req, res) {
    try {
      let rows = await instance.mongo.db("miro81").collection(req.body.collection).find(JSON.parse(req.body.find1)).project(JSON.parse(req.body.find2)).toArray();
      res.send(JSON.stringify(rows));
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_post_mongoInsert = function () {
  let instance = this;
  let obj = { link: '/post_minsert' }
  obj.func = async function (req, res) {
    try {
      await instance.mongo.db("miro81").collection(req.body.collection).insertOne(JSON.parse(req.body.obj));
      console.log(`insert success`);
      res.send(`insert success`);
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}


Router.prototype.rou_post_mongoUpdate = function () {
  let instance = this;
  let obj = { link: '/post_mupdate' }
  obj.func = async function (req, res) {
    try {
      let whereQuery = {}
      whereQuery[req.body.st] = req.body.i;
      let updateQuery = {}
      if ((/\[/g.test(req.body.v) && /\]/g.test(req.body.v)) || (/\{/g.test(req.body.v) && /\}/g.test(req.body.v))) {
        updateQuery[req.body.c] = JSON.parse(req.body.v);
      } else {
        updateQuery[req.body.c] = req.body.v;
      }
      console.log(updateQuery)
      await instance.mongo.db("miro81").collection(req.body.table).updateOne(whereQuery, { $set: updateQuery });
      res.send("success");
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_post_mongoDelete = function () {
  let instance = this;
  let obj = { link: '/post_mdelete' }
  obj.func = async function (req, res) {
    try {
      let whereQuery = {}
      whereQuery[req.body.st] = req.body.i;
      await instance.mongo.db("miro81").collection(req.body.table).deleteOne(whereQuery);
      res.send("delete success");
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}



//CRUD--------------------------------------------------------------------------

Router.prototype.rou_post_update = function () {
  let instance = this;
  let obj = { link: '/post_update' }
  obj.func = async function (req, res) {
    try {
      let whereQuery = {}
      whereQuery[req.body.st] = req.body.i;
      let updateQuery = {}
      if ((/\[/g.test(req.body.v) && /\]/g.test(req.body.v)) || (/\{/g.test(req.body.v) && /\}/g.test(req.body.v))) {
        updateQuery[req.body.c] = JSON.parse(req.body.v);
      } else {
        updateQuery[req.body.c] = req.body.v;
      }
      await instance.mongo.db("miro81").collection(req.body.table).updateOne(whereQuery, { $set: updateQuery });
      res.send("success");

    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_post_select = function () {
  let instance = this;
  let obj = { link: '/post_select' }
  obj.func = async function (req, res) {
    try {
      let col_arr, temp, temp2, find_obj, where_obj, or_arr, rows, sort_obj;
      col_arr = {}
      if (req.body.col_arr !== 'all') {
        temp = req.body.col_arr.split(',');
        for (let i of temp) {
          col_arr[i] = 1;
        }
      }
      find_obj = {}
      if (req.body.standard !== 'all' && req.body.standard !== 'multi') {
        temp = {}
        temp["$regex"] = new RegExp(req.body.where, 'gi');
        find_obj[req.body.standard] = temp;
      } else if (req.body.standard === 'multi') {
        or_arr = []
        where_obj = JSON.parse(req.body.where);
        for (let z in where_obj) {
          temp = {}
          temp2 = {}
          temp["$regex"] = new RegExp(where_obj[z], 'gi');
          temp2[z] = temp;
          or_arr.push(temp2);
        }
        find_obj["$or"] = or_arr;
      }
      sort_obj = {}
      if (req.body.sort !== undefined && req.body.limit === undefined) {
        sort_obj[req.body.sortStandard] = (req.body.sort === "DESC") ? -1 : 1;
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).sort(sort_obj).toArray();
      } else if (req.body.sort === undefined && req.body.limit !== undefined) {
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).limit(Number(req.body.limit)).toArray();
      } else if (req.body.sort !== undefined && req.body.limit !== undefined) {
        sort_obj[req.body.sortStandard] = (req.body.sort === "DESC") ? -1 : 1;
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).sort(sort_obj).limit(Number(req.body.limit)).toArray();
      } else {
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).toArray();
      }
      res.send(JSON.stringify(rows));
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_post_selectAll = function () {
  let instance = this;
  let obj = { link: '/post_select_all' }
  obj.func = async function (req, res) {
    try {
      let temp;
      let col_arr = {}
      if (req.body.col_arr !== 'all') {
        temp = req.body.col_arr.split(',');
        for (let i of temp) {
          col_arr[i] = 1;
        }
      }
      let rows = await instance.mongo.db("miro81").collection(req.body.title).find({}).project(col_arr).toArray();
      res.send(JSON.stringify(rows));
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_post_delete = function () {
  let instance = this;
  let obj = { link: '/post_delete' }
  obj.func = async function (req, res) {
    try {
      let whereQuery = {}
      whereQuery[instance.data[req.body.title].standard] = req.body.v;
      await instance.mongo.db("miro81").collection(req.body.title).deleteOne(whereQuery);
      res.send("delete success");
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_post_create = function () {
  let instance = this;
  let obj = { link: '/post_create' }
  obj.func = async function (req, res) {
    try {
      let obj = {}
      let keys, values;
      keys = req.body.col_arr.split(',');
      values = req.body.val_arr.split(',');
      for (let i = 0; i < keys.length; i++) {
        if (values[i] === undefined) {
          obj[keys[i]] = '';
        } else {
          obj[keys[i]] = values[i];
        }
      }
      await instance.mongo.db("miro81").collection(req.body.title).insertOne(obj);
      console.log(`insert success`);
      res.send(`insert success`);
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

//FUNCTIONS---------------------------------------------------------------------

Router.prototype.rou_post_slackBot = function () {
  let instance = this;
  let slack = this.mother.slack_bot;
  let url = require('url');
  let obj = { link: '/slack' }
  obj.func = function (req, res) {
    let link = '';
    let link_index = 0;
    let row_message = '', new_message = '';
    let query = JSON.parse(req.body.query);
    if (req.body.linkmake !== undefined) {
      let requrl = url.format({
          protocol: req.protocol,
          host: req.get('host'),
          pathname: req.body.link,
      });
      link += requrl + '?';
      for (let i of query) {
        link += i.standard + '=' + i.value + '&'
      }
      link = link.slice(0, -1);
      row_message = req.body.message;
      link_index = row_message.search(/link:/g);
      new_message = row_message.slice(0, link_index) + "link: " + link + row_message.slice(link_index + 6);
      slack.chat.postMessage({ text: new_message, channel: req.body.channel });
    } else {
      slack.chat.postMessage({ text: req.body.message, channel: req.body.channel });
    }
    res.send('');
  }
  return obj;
}

Router.prototype.rou_post_sendMail = function () {
  let instance = this;
  let gmail = this.mother.googleSystem("gmail");
  let obj = { link: '/gmail' }
  obj.func = async function (req, res) {
    try {
      let to;
      if (req.body.to === undefined || req.body.to === "default") {
        to = "homeliaisonserver@gmail.com";
      } else {
        to = req.body.to;
      }
      let statusCode = await gmail.send_mail(to, req.body.subject, req.body.message);
      res.sendStatus(statusCode);
      res.send('');
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

Router.prototype.rou_post_polling = function () {
  const instance = this;
  const { fileSystem, shell, shellLink } = this.mother;
  const execFolder = `${process.cwd()}/apps/officePolling/exec`;
  const OfficePolling = require(`${process.cwd()}/apps/officePolling/officePolling.js`);
  const ADDRESS = require(`${process.cwd()}/apps/infoObj.js`);
  let obj = { link: '/polling' }
  obj.func = async function (req, res) {
    try {
      let execFolderList = await fileSystem(`readDir`, execFolder);
      for (let i of execFolderList) {
        shell.exec(`rm -rf ${shellLink(execFolder)}/i`);
      }
      await fileSystem(`write`, [ `${execFolder}/0_proposal.js`, `await Mother.requestSystem("http://172.30.1.50:3000/proposalMake", { proid: "${req.body.proid}" });return 0;` ]);
      const app = new OfficePolling();
      await app.injectionLaunching();

      res.sendStatus(200);
      res.send('done');
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}


//SESSION-----------------------------------------------------------------------

Router.prototype.rou_post_colorSetting = function () {
  let instance = this;
  let obj = { link: '/session_color' }
  obj.func = async function (req, res) {
    try {
      let table_id = req.body.title;
      let table_standard = instance.data[table_id].standard;
      let order_colleft = req.session[req.body.title]['order'];
      let col_arr, temp, temp2, find_obj, where_obj, or_arr, rows, sort_obj;
      col_arr = {}
      if (req.body.col_arr !== 'all') {
        temp = req.body.col_arr.split(',');
        for (let i of temp) {
          col_arr[i] = 1;
        }
      }
      find_obj = {}
      if (req.body.standard !== 'all' && req.body.standard !== 'multi') {
        temp = {}
        temp["$regex"] = new RegExp(req.body.where, 'gi');
        find_obj[req.body.standard] = temp;
      } else if (req.body.standard === 'multi') {
        or_arr = []
        where_obj = JSON.parse(req.body.where);
        for (let z in where_obj) {
          temp = {}
          temp2 = {}
          temp["$regex"] = new RegExp(where_obj[z], 'gi');
          temp2[z] = temp;
          or_arr.push(temp2);
        }
        find_obj["$or"] = or_arr;
      }
      sort_obj = {}
      if (req.body.sort !== undefined && req.body.limit === undefined) {
        sort_obj[req.body.sortStandard] = (req.body.sort === "DESC") ? -1 : 1;
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).sort(sort_obj).toArray();
      } else if (req.body.sort === undefined && req.body.limit !== undefined) {
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).limit(Number(req.body.limit)).toArray();
      } else if (req.body.sort !== undefined && req.body.limit !== undefined) {
        sort_obj[req.body.sortStandard] = (req.body.sort === "DESC") ? -1 : 1;
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).sort(sort_obj).limit(Number(req.body.limit)).toArray();
      } else {
        rows = await instance.mongo.db("miro81").collection(req.body.title).find(find_obj).project(col_arr).toArray();
      }

      if (!req.session[req.body.title]['color']) { req.session[req.body.title]['color'] = {}; }
      for (let i = 0; i < rows.length; i++) { if (!req.session[req.body.title]['color'][rows[i][table_standard]]) {
        req.session[req.body.title]['color'][rows[i][table_standard]] = {};
        for (let c of instance.data[table_id].classify.setting) { if (rows[i][instance.data[table_id].classify.column_title] === c[0]) {
          req.session[req.body.title]['color'][rows[i][table_standard]]['color_palettes_backdiv_standard'] = c[1];
        }}
        for (let m of order_colleft) { req.session[req.body.title]['color'][rows[i][table_standard]][m] = 'transparent'; }
      }}

      res.send("color setting success");
    } catch (e) {
      console.error("error", e.message);
    }
  }
  return obj;
}

Router.prototype.rou_post_sessionOn = function () {
  let instance = this;
  let obj = { link: '/session_on' }
  obj.func = function (req, res) {
    if (req.session[req.body.title] !== undefined) {
      if (req.session[req.body.title][req.body.method] !== undefined) {
        res.send(JSON.stringify(req.session[req.body.title][req.body.method]));
      } else {
        res.send("nothing");
      }
    } else {
      res.send("nothing");
    }
  }
  return obj;
}

Router.prototype.rou_post_sessionUpdate = function () {
  let instance = this;
  let obj = { link: '/session_update' }
  obj.func = function (req, res) {
    instance.setting[req.body.title][req.body.method] = JSON.parse(req.body.obj);
    req.session[req.body.title][req.body.method] = JSON.parse(req.body.obj);
    req.session.save(function () { res.send(`success`); });
  }
  return obj;
}

Router.prototype.rou_post_sessionUpdate2 = function () {
  let instance = this;
  let obj = { link: '/session_update2' }
  obj.func = function (req, res) {
    req.session[req.body.title][req.body.method][req.body.thisid] = req.body.value;
    req.session.save(function () { res.send(`success`); });
  }
  return obj;
}

Router.prototype.rou_post_sessionUpdate3 = function () {
  let instance = this;
  let obj = { link: '/session_update3' }
  obj.func = function (req, res) {
    if (req.session[req.body.title] && req.session[req.body.title][req.body.method] && req.session[req.body.title][req.body.method][req.body.thisid] && req.session[req.body.title][req.body.method][req.body.thisid][req.body.thisid2]) {
      req.session[req.body.title][req.body.method][req.body.thisid][req.body.thisid2] = req.body.value;
      req.session.save(function () { res.send(`success`); });
    } else {
      res.send(`nothing`);
    }
  }
  return obj;
}

Router.prototype.getAll = function () {
  let result = { get: [], post: [] }
  let result_arr = Object.keys(Router.prototype);
  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}
  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}
  return result;
}


module.exports = Router;
