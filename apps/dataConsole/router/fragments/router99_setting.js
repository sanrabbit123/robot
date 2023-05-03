//ROUTING ----------------------------------------------------------------------

DataRouter.prototype.setMembers = async function () {
  const instance = this;
  const back = this.back;
  const { errorLog } = this.mother;
  try {
    this.members = await back.setMemberObj({ getMode: true, selfMongo: instance.mongo });
  } catch (e) {
    await errorLog("Console 서버 문제 생김 (setMembers): " + e.message);
    console.log(e);
  }
}

DataRouter.prototype.getAll = function () {
  let result, result_arr;

  result = { get: [], post: [] };
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
