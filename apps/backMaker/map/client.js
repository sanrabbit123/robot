module.exports = {
  structure: {
    name: "",
    phone: "",
    email: "",
    cliid: "",
    requests: [
      {
        request: {
          timeline: new Date("1800-01-01"),
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
              expected: new Date("1800-01-01"),
            },
          },
          etc: {
            comment: "",
            channel: "",
          },
        },
        analytics: {
          googleAnalytics: {
            timeline: new Date("1800-01-01"),
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
              { time: new Date("1800-01-01"), page: "", page_raw: "" },
            ],
          },
          response: {
            status: "응대중",
            outreason: [],
          },
          date: {
            callHistory: [],
            space: {
              precheck: new Date("1800-01-01"),
              empty: new Date("1800-01-01"),
              movein: new Date("1800-01-01"),
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
