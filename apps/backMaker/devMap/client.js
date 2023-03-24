module.exports = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        name: "",
        phone: "",
        email: "",
        cliid: "",
        requests: [],
      },
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "requests") {
      dummy = {
        request: {
          timeline: new Date(1800, 0, 1),
          notionId: "",
          budget: "알 수 없음",
          furniture: "알 수 없음",
          family: "",
          space: {
            address: "",
            contract: "알 수 없음",
            pyeong: 0,
            spec: {
              room: 0,
              bathroom: 0,
              valcony: false
            },
            resident: {
              living: false,
              expected: new Date(1800, 0, 1),
            },
            partial: {
              boo: false,
              pyeong: 0,
              detail: ""
            }
          },
          etc: {
            comment: "",
            channel: "",
          },
        },
        analytics: {
          googleAnalytics: {
            timeline: new Date(1800, 0, 1),
            userType: "",
            referrer: {
              name: "",
              detail: {
                host: null,
                queryString: {},
              },
            },
            device: {
              type: "",
              os: "",
              mobileDevice: "",
            },
            region: {
              country: "",
              city: "",
              latitude: 0,
              longitude: 0,
            },
            personalInfo: {
              age: null,
              gender: null
            },
            campaign: "",
            history: [],
          },
          response: {
            status: "응대중",
            action: "1차 응대 예정",
            outreason: [],
            kakao: false,
            service: {
              serid: "s2011_aa02s",
              xValue: "B",
              online: false,
            },
            designers: [],
          },
          date: {
            call: {
              next: new Date(1800, 0, 1),
              history: [],
              recommend: new Date(1800, 0, 1),
            },
            space: {
              precheck: new Date(1800, 0, 1),
              empty: new Date(1800, 0, 1),
              movein: new Date(1800, 0, 1),
            },
            calendar: {
              call: {
                mother: "clientCalendar",
                id: "",
              },
              precheck: {
                mother: "clientCalendar",
                id: "",
              },
              empty: {
                mother: "clientCalendar",
                id: "",
              },
              movein: {
                mother: "clientCalendar",
                id: "",
              }
            },
          },
          picture: {
            space: {
              boo: false,
              file: [],
            },
            prefer: {
              boo: false,
              file: [],
            },
          },
          proposal: [],
        },
      };
    } else if (subject === "analytics.date.history") {
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
    } else if (subject === "analytics.picture.space.file") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: [],
        folderId: ""
      };
    } else if (subject === "analytics.picture.prefer.file") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: [],
        folderId: ""
      };
    } else if (subject === "analytics.picture.space.file.confirm") {
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
    } else if (subject === "analytics.picture.prefer.file.confirm") {
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
    } else if (subject === "analytics.proposal") {
      dummy = {
        proid: "",
        date: new Date(1800, 0, 1),
        contract: false,
      };
    }
    return dummy;
  }
}
