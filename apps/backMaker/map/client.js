module.exports = {
  structure: {
    name: "",
    phone: "",
    email: "",
    cliid: "",
    requests: [
      {
        request: {
          timeline: "9999-09-09",
          notionId: "",
          budget: "알 수 없음",
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
              expected: "9999-09-09",
            },
          },
          etc: {
            comment: "",
            channel: "",
          },
        },
        analytics: {
          googleAnalytics: {
            timeline: "9999-09-09",
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
            history: [
              { time: "9999-09-09", page: "", page_raw: "" },
            ],
          },
          response: {
            status: "응대중",
            outreason: [],
          },
          date: {
            callHistory: [],
            space: {
              precheck: "9999-09-09",
              empty: "9999-09-09",
              movein: "9999-09-09",
            },
          },
          picture: {
            space: false,
            prefer: false,
          },
        },
        proposal: {
          proid: "",
        },
      },
    ],
  },
}
