module.exports = {
  structure: {
    name: "",
    phone: "",
    email: "",
    cliid: "",
    requests: [
      {
        request: {
          timeline: new Date(1800, 0, 1),
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
              expected: new Date(1800, 0, 1),
            },
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
            history: [
              { time: new Date(1800, 0, 1), page: "", page_raw: "" },
            ],
          },
          response: {
            status: "응대중",
            action: "해당 없음",
            outreason: [],
            outspot: "해당 없음",
            kakao: false,
          },
          date: {
            call: {
              next: new Date(),
              history: [
                {
                  date: new Date(),
                  who: "",
                }
              ],
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
            space: [
              {
                date: new Date(),
                confirm: [
                  {
                    date: new Date(),
                    who: "",
                  }
                ],
                folderId: "1j-mLXZszbWNqq_xhXVPtm4MW5QOm5sZ2"
              }
            ],
            prefer: [
              {
                date: new Date(),
                confirm: [
                  {
                    date: new Date(),
                    who: "",
                  }
                ],
                folderId: "1j-mLXZszbWNqq_xhXVPtm4MW5QOm5sZ2"
              }
            ],
          },
          proposal: [
            {
              proid: "",
              generate: {
                date: new Date(),
                who: "",
              },
              complete: {
                date: new Date(),
                who: "",
                designers: [
                  { desid: "", amount: 0 }
                ],
              },
              send: {
                date: new Date(),
                who: "",
              },
              feedback: {
                date: new Date(),
                choice: "",
              },
            }
          ],
        },
      },
    ],
  },
}
