const ThirdIR = function () {
  this.name = "thirdIR";
  this.binaryIndex = [ 5, 21, 27, 30, 31, 43 ];
  this.ratio = (297 / 210);
  this.length = 45;
}

ThirdIR.prototype.render = async function (target) {
  const instance = this;
  try {
    const movieMaker = function (link) {
      return function (mother, width, height) {
        const ea = "px";
        const visualSpecific = 1;
        let resultArr;
        let leftMargin, bottomMargin, boxHeight;

        leftMargin = width * (0.07);
        bottomMargin = height * (0.115);
        boxHeight = height * (0.5973);

        resultArr = [
          {
            mother,
            mode: "aside",
            style: {
              position: "absolute",
              width: String(width - (leftMargin * 2) + (visualSpecific * 2)) + ea,
              height: String(boxHeight + (visualSpecific * 2)) + ea,
              bottom: String(bottomMargin - visualSpecific) + ea,
              left: String(leftMargin - visualSpecific) + ea,
              background: GeneralJs.colorChip.realBlack,
              borderRadius: String(5) + ea,
            }
          },
          {
            mother: mother - 1,
            mode: "iframe",
            attribute: [
              { src: link }
            ],
            style: {
              position: "absolute",
              width: String((boxHeight + (visualSpecific * 2)) * (1920 / 1080)) + ea,
              height: String(boxHeight + (visualSpecific * 2)) + ea,
              bottom: String(bottomMargin - visualSpecific) + ea,
              left: String(leftMargin - visualSpecific + ((width - (leftMargin * 2) + (visualSpecific * 2) - ((boxHeight + (visualSpecific * 2)) * (1920 / 1080))) / 2)) + ea,
              border: String(0),
              outline: String(0),
            }
          },
        ];
        return resultArr;
      }
    }
    const thisPage = {
      binaryIndex: instance.binaryIndex,
      ratio: instance.ratio,
      length: instance.length,
      name: instance.name,
      html: {
        a38: movieMaker("https://drive.google.com/file/d/1dW3KPjygGgTWdifH_rdafukUKcoBwV1J/preview"),
        a39: movieMaker("https://drive.google.com/file/d/1InIWrXP9ZcT51g_KMzysOBCiSAhAJC74/preview"),
        a40: movieMaker("https://drive.google.com/file/d/1ry96-m8IXvq7ChaJcmkCXkh0Eg_DRqY-/preview"),
      }
    };
    return thisPage;
  } catch (e) {
    console.log(e);
  }
}

module.exports = ThirdIR;
