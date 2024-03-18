/<%metaStart%>/; async function metaFunction (req, mongo, host) { 
  try {
    let pageName, titleString, descriptionString, hiddenHtml;
    let imagePath;
    let fullLink;

    pageName = "abstractIndex";
    titleString = "Home | AbstractRabbit";
    descriptionString = "Abstart world for abstract ideal by abstract rabbit";
    hiddenHtml = ``;
    imagePath = "/index/og_image.jpg";
    fullLink = "https://" + host + "/index";

    return {
      name: pageName,
      title: titleString,
      description: descriptionString,
      hidden: hiddenHtml,
      image: imagePath,
      link: fullLink,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}; /<%metaEnd%>/;

const AbstractIndexJs = function () {
  this.mother = new GeneralJs();
}

AbstractIndexJs.prototype.launching = async function (loading) {
  const instance = this;
  const { totalContents, ea } = this;
  try {
    const { returnGet, colorChip } = GeneralJs;
    let getObj;
    getObj = returnGet();


    
    










    loading.parentElement.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
