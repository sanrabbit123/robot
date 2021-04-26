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
  this.ea = "px";
  this.totalContents = document.getElementById("totalcontents");
  this.ratio = (14 / 9);
  this.base = {};
  this.images = null;
}

StyleEstimationJs.prototype.baseMaker = function () {
  const instance = this;
  const { ea, totalContents, ratio } = this;
  const { createNodes, styleInjection, colorChip, withOut } = GeneralJs;
  let height;
  let margin;
  let total, photo, info;

  margin = 40;
  height = window.innerHeight - (margin * 2);

  styleInjection(totalContents, {
    background: colorChip.gray2,
    position: "relative",
  });

  [ total, photo, info ] = createNodes([
    {
      mother: totalContents,
      style: {
        display: "inline-block",
        position: "relative",
        height: String(height) + ea,
        width: String(height * ratio) + ea,
        marginTop: String(margin) + ea,
        marginLeft: String((window.innerWidth - (height * ratio)) / 2) + ea,
      },
    },
    {
      mother: -1,
      style: {
        display: "inline-block",
        position: "relative",
        background: colorChip.white,
        borderRadius: String(5) + ea,
        height: String(height) + ea,
        width: String(height) + ea,
        boxShadow: "0px 3px 15px -9px " + colorChip.gray4,
      }
    },
    {
      mother: -2,
      style: {
        display: "inline-block",
        position: "relative",
        background: colorChip.white,
        borderRadius: String(5) + ea,
        height: String(height) + ea,
        width: withOut(height + (margin / 4), ea),
        marginLeft: String(margin / 4) + ea,
        boxShadow: "0px 3px 15px -9px " + colorChip.gray4,
      }
    },
  ]);

  this.base.total = total;
  this.base.photo = photo;
  this.base.info = info;

}

StyleEstimationJs.prototype.photoMaker = function (index = 7) {
  const instance = this;
  const { ea, totalContents, ratio, base: { photo } } = this;
  const { createNodes, cssInjection, colorChip, withOut } = GeneralJs;
  const { photos } = this.images[index];
  let nodeArr;
  let margin;
  let photoWidth, photoHeight;
  let topMargin;
  let cssString;
  let photoNumber;

  photoNumber = photos.length;
  photoNumber = (photoNumber >= 5) ? 5 : photoNumber;

  for (let i = 0; i < 2; i++) {
    cssString = "";
    if (photoNumber !== 1) {
      cssString += `
      @keyframes ${i === 0 ? "photo" : "gray"}_order0 {
        from { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
        ${String((100 / photoNumber) - 0.1)}% { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
        ${String(100 / photoNumber)}% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
        99.9% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
        to { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
      }
      `;
      for (let j = 1; j < photoNumber; j++) {
        cssString += `
        @keyframes ${i === 0 ? "photo" : "gray"}_order${String(j)} {
          from { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
          ${String(((100 / photoNumber) * j) - 0.1)}% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
          ${String((100 / photoNumber) * j)}% { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
          ${String(((100 / photoNumber) * (j + 1)) - 0.1)}% { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
          ${String((100 / photoNumber) * (j + 1))}% { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
          to { ${i === 0 ? "opacity: 0.15; " : ""}z-index: 0 }
        }
        `;
      }
    } else {
      cssString = `
      @keyframes ${i === 0 ? "photo" : "gray"}_order0 {
        from { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
        to { ${i === 0 ? "opacity: 1; " : ""}z-index: 1 }
      }
      `;
    }
    cssInjection(cssString);
  }

  margin = 50;
  photoWidth = Number(photo.style.width.replace(/[^0-9\.\-]/gi, '')) - (margin * 2);
  photoHeight = photoWidth * (210 / 297);
  topMargin = (Number(photo.style.height.replace(/[^0-9\.\-]/gi, '')) - (margin * 2) - photoHeight) / (photoNumber - 1);

  nodeArr = [];
  for (let i = 0; i < photoNumber; i++) {
    nodeArr.push({
      mother: photo,
      style: {
        position: "absolute",
        width: String(photoWidth) + ea,
        height: String(photoHeight) + ea,
        backgroundSize: "auto 100%",
        backgroundPosition: "50% 50%",
        backgroundImage: "url('" + S3HOST + photos[i].path + "')",
        backgroundRepeat: "no-repeat",
        top: String(margin + (topMargin * i)) + ea,
        left: String(margin) + ea,
        borderRadius: String(5) + ea,
        backgroundColor: colorChip.gray1,
        opacity: String(i ? 0.15 : 1),
        boxShadow: "0px 7px 10px -10px " + colorChip.black,
        zIndex: String(0),
        animation: `photo_order${String(i)} ${String(3 * photoNumber)}s linear infinite`,
      }
    });
    nodeArr.push({
      mother: photo,
      style: {
        position: "absolute",
        width: String(photoWidth) + ea,
        height: String(photoHeight) + ea,
        top: String(margin + (topMargin * i)) + ea,
        left: String(margin) + ea,
        borderRadius: String(5) + ea,
        backgroundColor: colorChip.deactive,
        zIndex: String(0),
        animation: `gray_order${String(i)} ${String(3 * photoNumber)}s linear infinite`,
      }
    });
  }

  nodeArr.reverse();

  createNodes(nodeArr);

}

StyleEstimationJs.prototype.launching = async function (loading) {
  const instance = this;
  try {
    const { returnGet, ajaxPromise } = GeneralJs;
    const getObj = returnGet();
    this.images = JSON.parse(await ajaxPromise("/styleEstimation_getImageList"));

    this.baseMaker();
    this.photoMaker();

    loading.parentNode.removeChild(loading);

  } catch (e) {
    console.log(e);
  }
}
