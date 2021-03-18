/<%patch%>/ {
  "patch": {
    "entire": false,
    "client": false,
    "designer": true,
    "project": false,
    "contents": false,
    "service": false,
    "photo": false
  },
  "meta": {
    "title": [
      "thisPerson",
      "return (thisPerson.name + ' 디자이너님 리포트');"
    ],
    "description": [
      "thisPerson",
      "return (thisPerson.name + ' 디자이너님 리포트 페이지입니다.');"
    ],
    "image": [
      "thisPerson",
      "return ('https://__thisHost__/hlimage.jpg');"
    ]
  }
} %/%/g

const DesignerReportJs = function () {
  this.mother = new GeneralJs();
  this.margin = 0;
  this.mode = "desktop";
  this.sero = false;
  this.totalContents = document.getElementById("totalcontents");
}

DesignerReportJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const getObj = GeneralJs.returnGet();

    await GeneralJs.sleep(500);
    loading.parentNode.removeChild(loading);




  } catch (e) {
    console.log(e);
  }
}
