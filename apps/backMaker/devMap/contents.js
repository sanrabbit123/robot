module.exports = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        conid: "",
        desid: "",
        cliid: "",
        proid: "",
        contents: {
          portfolio: {
            pid: "",
            date: new Date(1800, 0, 1),
            spaceInfo: {
              space: "",
              pyeong: 0,
              region: "",
              method: "",
              budget: "3,000만원",
            },
            title: {
              main: "",
              sub: "",
            },
            color: {
              main: "",
              sub: "",
              title: "",
            },
            detailInfo: {
              photodae: [],
              photosg: {
                first: 0,
                last: 0,
              },
              slide: [],
              tag: [],
              service: "",
              sort: {
                key8: 0,
                key9: 0,
              },
              tendency: {
                style: {
                  modern: 0,
                  classic: 0,
                  natural: 0,
                  mixmatch: 0,
                  scandinavian: 0,
                  vintage: 0,
                  oriental: 0,
                  exotic: 0,
                },
                texture: {
                  darkWood: 0,
                  whiteWood: 0,
                  coating: 0,
                  metal: 0
                },
                color: {
                  darkWood: 0,
                  whiteWood: 0,
                  highContrast: 0,
                  vivid: 0,
                  white: 0,
                  mono: 0,
                  bright: 0,
                  dark: 0,
                },
                density: {
                  maximun: 0,
                  minimum: 0,
                }
              },
            },
            contents: {
              suggestion: "Designer's\nSuggestion",
              detail: [],
            }
          },
          review: {
            rid: "",
            date: new Date(1800, 0, 1),
            title: {
              main: "",
              sub: "",
            },
            detailInfo: {
              photodae: [],
              order: 0,
            },
            contents: {
              detail: [],
            }
          }
        },
        photos: {
          first: 0,
          last: 0,
          detail: [],
        },
        service: {
          serid: "s2011_aa02s",
          xValue: "B",
          online: false,
        },
      }
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "contents.portfolio.contents.detail") {
      dummy = {
        photo: [],
        title: "",
        contents: "",
      };
    } else if (subject === "contents.review.contents.detail") {
      dummy = {
        type: "",
        photos: [],
        contents: [
          {
            question: "",
            answer: "",
          }
        ]
      };
    } else if (subject === "photos.detail") {
      dummy = { index: 0, gs: 'g' };
    }
    return dummy;
  }
}
