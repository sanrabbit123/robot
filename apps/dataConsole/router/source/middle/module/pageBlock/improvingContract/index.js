const ImprovingContract = function () {
  this.mother = new GeneralJs();
  this.name = "improvingContract";
  this.binaryIndex = [];
  this.ratio = (297 / 210);
  this.length = 10;
  this.pdfName = "큐레이션 계획";
}

ImprovingContract.prototype.render = async function (target) {
  const instance = this;
  try {
    const ea = "px";
    const folders = [
      "https://drive.google.com/drive/folders/1_sRhqKgby0C3-H0UncZNdRe3Y20N7wiF?usp=sharing",
      "https://drive.google.com/drive/folders/1qCV0eFiEAhELHVbyqMQ4DzEZtAx0f9rm?usp=sharing",
      "https://drive.google.com/drive/folders/1QpYPG0e2E4S2F_T9TQSgvd5d8P7UIL1r?usp=sharing",
      "https://drive.google.com/drive/folders/1Zdx9FXLAZaY4bM7M3rcaMP2UqrMiWHtn?usp=sharing",
      "https://drive.google.com/drive/folders/1aunGFoQh0yWC8HuFQfkbLlWvOMN-wXRo?usp=sharing",
      "https://drive.google.com/drive/folders/1VZ7OJCBePCHr178os-vnxtbMKidXNYwD?usp=sharing",
    ];
    const thisPage = {
      binaryIndex: instance.binaryIndex,
      ratio: instance.ratio,
      length: instance.length,
      name: instance.name,
      pdfName: instance.pdfName,
      html: {
        a1: function (mother, width, height) {
          instance.mother.greenAlert("각 제목을 누르면 해당 폴더로 이동합니다!", true);
          return [];
        },
        a2: function (mother, width, height) {
          let resultArr;
          resultArr = [
            {
              mother: mother,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[0]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.4553) + ea,
                left: String(width * 0.2462) + ea,
                width: String(width * 0.08) + ea,
                height: String(height * 0.095) + ea,
                background: "#f0f0f0",
              }
            },
            {
              mother: mother - 1,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[1]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.806) + ea,
                left: String(width * 0.212) + ea,
                width: String(width * 0.146) + ea,
                height: String(height * 0.095) + ea,
                background: "#f7f7f7",
              }
            },
            {
              mother: mother - 2,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[2]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.4553) + ea,
                left: String(width * 0.352) + ea,
                width: String(width * 0.097) + ea,
                height: String(height * 0.095) + ea,
                background: "#f0f0f0",
              }
            },
            {
              mother: mother - 3,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[3]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.806) + ea,
                left: String(width * 0.502) + ea,
                width: String(width * 0.14) + ea,
                height: String(height * 0.095) + ea,
                background: "#f7f7f7",
              }
            },
            {
              mother: mother - 4,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[4]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.4553) + ea,
                left: String(width * 0.502) + ea,
                width: String(width * 0.14) + ea,
                height: String(height * 0.095) + ea,
                background: "#f0f0f0",
              }
            },
            {
              mother: mother - 5,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[1]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.806) + ea,
                left: String(width * 0.662) + ea,
                width: String(width * 0.1264) + ea,
                height: String(height * 0.095) + ea,
                background: "#f7f7f7",
              }
            },
            {
              mother: mother - 6,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[5]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.4553) + ea,
                left: String(width * 0.662) + ea,
                width: String(width * 0.1264) + ea,
                height: String(height * 0.095) + ea,
                background: "#f0f0f0",
              }
            },
          ];
          return resultArr;
        },
        a3: function (mother, width, height) {
          let resultArr;
          resultArr = [
            {
              mother: mother,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[0]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.108) + ea,
                left: String(width * 0.064) + ea,
                width: String(width * 0.3571) + ea,
                height: String(height * 0.055) + ea,
                background: "#f7f7f7",
              }
            }
          ];
          return resultArr;
        },
        a4: function (mother, width, height) {
          let resultArr;
          resultArr = [
            {
              mother: mother,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[1]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.108) + ea,
                left: String(width * 0.064) + ea,
                width: String(width * 0.3571) + ea,
                height: String(height * 0.055) + ea,
                background: "#f7f7f7",
              }
            }
          ];
          return resultArr;
        },
        a5: function (mother, width, height) {
          let resultArr;
          resultArr = [
            {
              mother: mother,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[2]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.108) + ea,
                left: String(width * 0.064) + ea,
                width: String(width * 0.3571) + ea,
                height: String(height * 0.055) + ea,
                background: "#f7f7f7",
              }
            }
          ];
          return resultArr;
        },
        a6: function (mother, width, height) {
          let resultArr;
          resultArr = [
            {
              mother: mother,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[3]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.108) + ea,
                left: String(width * 0.064) + ea,
                width: String(width * 0.3571) + ea,
                height: String(height * 0.055) + ea,
                background: "#f7f7f7",
              }
            }
          ];
          return resultArr;
        },
        a7: function (mother, width, height) {
          let resultArr;
          resultArr = [
            {
              mother: mother,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[4]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.108) + ea,
                left: String(width * 0.064) + ea,
                width: String(width * 0.3571) + ea,
                height: String(height * 0.055) + ea,
                background: "#f7f7f7",
              }
            }
          ];
          return resultArr;
        },
        a8: function (mother, width, height) {
          let resultArr;
          resultArr = [
            {
              mother: mother,
              mode: "aside",
              class: [ "hoverdefault_reverse" ],
              events: [
                {
                  type: "click",
                  event: function (e) {
                    GeneralJs.blankHref(folders[5]);
                  }
                }
              ],
              style: {
                position: "absolute",
                top: String(height * 0.108) + ea,
                left: String(width * 0.064) + ea,
                width: String(width * 0.3571) + ea,
                height: String(height * 0.055) + ea,
                background: "#f7f7f7",
              }
            }
          ];
          return resultArr;
        },
      }
    };
    return thisPage;
  } catch (e) {
    console.log(e);
  }
}

module.exports = ImprovingContract;
