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
          budget: "알 수 없음", // [ '500만원 이하', '1,000만원', '1,500만원', '2,000만원', '2,500만원', '3,000만원', '3,500만원', '4,000만원', '4,500만원', '5,000만원 이상' ]
          family: "",
          space: {
            address: "",
            contract: "알 수 없음", // [ '전월세', '자가' ]
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
            timeline: 0,
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
              { time: "", page: "", page_raw: "" },
            ],
          },
          response: {
            status: "응대중", // [ '드랍', '진행', '응대중', '완료' ]
            outreason: [], // [ '연결 안 됨', '가벼운 문의', '타사 계약', '비용 문제', '의견 조정 안 됨', '직접 진행' ]
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
