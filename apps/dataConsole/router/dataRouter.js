const DataRouter = function () {
  this.dir = process.cwd() + "/apps/dataConsole";
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const DataBlock = require(`${this.dir}/block/dataBlock.js`);
  const DataFlat = require(`${this.dir}/flat/dataFlat.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.block = new DataBlock();
  this.flat = new DataFlat();
}

//GET --------------------------------------------------------------------------

DataRouter.prototype.rou_get_Root = function () {
  const instance = this;
  let obj = {};
  obj.link = '/';
  obj.func = function (req, res) {
    try {
      res.set("Content-Type", "text/html");
      res.send("hello?");
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_get_First = function () {
  const instance = this;
  const block = this.block;
  let obj = {};
  obj.link = "/:id";
  obj.func = function (req, res) {
    try {
      const html = block.baseMaker(req.params.id);
      res.set("Content-Type", "text/html");
      res.send(html);
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

DataRouter.prototype.rou_post_getClients = function () {
  const instance = this;
  const block = this.block;
  let obj = {};
  obj.link = "/getClients";
  obj.func = async function (req, res) {
    try {
      const result = await instance.flat.getClients(req.body.limit);
      res.send(JSON.stringify(result));
    } catch (e) {
      console.log(e);
    }
  }
  return obj;
}

//ROUTING ----------------------------------------------------------------------

DataRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] }
  result_arr = Object.keys(DataRouter.prototype);

  for (let i of result_arr) { if (/^rou_get/g.test(i)) {
    result.get.push((this[i])());
  }}

  for (let i of result_arr) { if (/^rou_post/g.test(i)) {
    result.post.push((this[i])());
  }}

  return result;
}

module.exports = DataRouter;
