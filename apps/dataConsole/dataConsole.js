const DataConsole = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.data = {};
  this.setting = {};
  this.dir = process.cwd() + "/apps/dataConsole";
}

DataConsole.prototype.block_template = function () {
  let instance = this;
  const Blockstyle = require('./block_data/Blockstyle.js');
  function first_render(mete, mete2) {
    const block = new Blockstyle(mete);
    let h = block.headhead();
    h += block.navinavi(mete2);
    h += block.demain();
    return h;
  }
  function second_render(mete, rows) {
    const block = new Blockstyle(mete);
    block.setrowsdata(rows);
    let h = block.headhead(true, 'second');
    h += block.secondbody();
    return h;
  }
  function mongo_render(monSet) {
    const block = new Blockstyle(monSet, "mongo");
    let h = block.mongohead();
    h += block.navinavi("mongo");
    h += block.mongobody();
    return h;
  }
  return { first_render: first_render, second_render: second_render, mongo_render: mongo_render };
}

DataConsole.prototype.connect = async function () {
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);
  let localMongoUrl_Arr, localMongoUrl;
  localMongoUrl_Arr = this.mother.mongoinfo.split('@');
  localMongoUrl = localMongoUrl_Arr[0] + '@' + "localhost" + ':' + (localMongoUrl_Arr[1].split(':'))[1];
  const sessionStore = new MongoStore({
    url: localMongoUrl,
    dbName: "miro81",
    collection: "sessions"
  });

  const useragent = require('express-useragent');
  app.use(useragent.express());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(session({
    key: 'session_cookie_name',
    HttpOnly: true,
    secret: 'weufhD@ao34ehvgawegv!@RFG',
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: (2 * 365 * 24 * 60 * 60 * 1000) }
  }));
  const MongoClient = this.mother.mongo;
  const MONGOC = new MongoClient(this.mother.mongoinfo, { useUnifiedTopology: true });

  try {
    //database on
    await MONGOC.connect();

    //static file sync
    this.mother.shell.exec(`cp -r ./apps/dataConsole/static ${process.env.HOME};`);
    console.log(`static update success`);

    //data file sync
    let tables_file = await this.mother.fileSystem(`readDir`, [`${process.cwd()}/apps/dataConsole/block_data/data`]);
    let tables = [];
    for (let i = 0; i < tables_file.length; i++) {
      if (tables_file[i] !== '.DS_Store' && tables_file[i] !== 'sql' && tables_file[i] !== 'mongo') {
        tables.push(tables_file[i].slice(0,-8));
      }
    }
    console.log(tables);

    //data to mongo
    let temp_obj = {};
    for (let i of tables) { temp_obj[i] = require(`./block_data/data/${i}_data.js`); }
    await MONGOC.db("miro81").collection("data_settings").deleteMany({});
    await MONGOC.db("miro81").collection("data_settings").insertOne({dbtitles:tables});
    await MONGOC.db("miro81").collection("data_settings").insertOne(temp_obj);
    console.log(`mongo update success`);

    //data update
    this.data = (await MONGOC.db("miro81").collection("data_settings").find({}).toArray())[1];
    delete this.data._id;
    for (let i of tables) {
      this.setting[i] = {};
      this.setting[i]['onoff'] = {};
      this.setting[i]['order'] = [];
      for (let data of this.data[i].colcol_arr) {
        this.setting[i]['onoff'][data] = 1;
      }
      for (let data of this.data[i].colleft_arr) {
        this.setting[i]['order'].push(data);
      }
    }

    //set router
    const Router = require('./router/router.js');
    let rouArr = [ MONGOC, this.data, this.setting, this.block_template() ];
    let rou = new Router(rouArr);
    let rouObj = rou.getAll();
    for (let obj of rouObj.get) { app.get(obj.link, obj.func); }
    for (let obj of rouObj.post) { app.post(obj.link, obj.func); }

    //server on
    const http = require('http').createServer(app);
    http.listen(3000, () => { console.log(`connect 3000`) });
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = DataConsole;
