/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": false,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return ('styleEstimation');"
    ],
    "description": [
      "thisPerson",
      "return ('styleEstimation');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ],
    "module": false
  }
} %/%/g

const StyleEstimationJs = function () {
  this.mother = new GeneralJs();
  this.totalContents = document.getElementById("totalcontents");
}

StyleEstimationJs.prototype.baseMaker = async function (loading) {
  const instance = this;
  try {

  } catch (e) {
    console.log(e);
  }
}

StyleEstimationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const { returnGet, ajaxPromise } = GeneralJs;
    const getObj = returnGet();
    const allImages = JSON.parse(await ajaxPromise("/styleEstimation_getImageList"));

    console.log(allImages);


  } catch (e) {
    console.log(e);
  }
}
