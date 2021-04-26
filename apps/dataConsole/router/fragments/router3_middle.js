// MIDDLE ROUTER

DataRouter.prototype.rou_post_styleEstimation_getImageList = function () {
  const instance = this;
  const back = this.back;
  let obj = {};
  obj.link = "/styleEstimation_getImageList";
  obj.func = async function (req, res) {
    try {
      const contentsArr = await back.getContentsArrByQuery({}, { selfMongo: this.mongo, withTools: true });
      const imagePath = contentsArr.imagePath();
      const allImages = imagePath.flatListImage();
      res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": '*',
      });
      res.send(JSON.stringify(allImages));
    } catch (e) {
      instance.mother.slack_bot.chat.postMessage({ text: "Console 서버 문제 생김 : " + e, channel: "#error_log" });
      console.log(e);
    }
  }
  return obj;
}
