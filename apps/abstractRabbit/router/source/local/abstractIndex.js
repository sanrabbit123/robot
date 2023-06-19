/<%metaStart%>/; async function metaFunction (req, mongo, host) { 
  try {
    let pageName, titleString, descriptionString, hiddenHtml;
    let imagePath;
    let fullLink;

    pageName = "abstractIndex";
    titleString = "Home | Abstract rabbit";
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
  this.totalContents = this.mother.totalContents;
  this.ea = <%% "px", "px", "px", "px", "vw" %%>;
}

AbstractIndexJs.prototype.launching = async function () {
  const instance = this;
  try {
    const { returnGet, colorChip, totalContents } = GeneralJs;
    let getObj;
    getObj = returnGet();

    console.log(totalContents);

  } catch (e) {
    console.log(e);
  }
}
