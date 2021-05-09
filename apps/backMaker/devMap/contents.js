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
        }
      }
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "contents.portfolio.contents.detail") {
      dummy = {
        photoKey: 0,
        title: "",
        contents: "",
        smallTalk: {
          title: "",
          contents: "",
        },
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
