module.exports = {
  structure: {
    conid: "",
    desid: "",
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
          detail: [
            {
              photoKey: 0,
              title: "",
              contents: "",
              smallTalk: {
                title: "",
                contents: "",
              },
            },
          ],
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
          detail: [
            {
              type: "",
              photos: [],
              contents: [
                {
                  question: "",
                  answer: "",
                }
              ]
            },
          ],
        }
      }
    },
    photos: {
      first: 0,
      last: 0,
      detail: [
        { index: 1, gs: 'g' },
      ],
    }
  }
}
