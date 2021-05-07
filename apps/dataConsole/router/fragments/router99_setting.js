//ROUTING ----------------------------------------------------------------------

DataRouter.prototype.setMembers = async function () {
  const instance = this;
  const { pythonExecute } = this.mother;
  try {
    const { members } = JSON.parse(await pythonExecute(this.pythonApp, [ "getMembers" ], {}));
    this.members = members;
  } catch (e) {
    instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
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
