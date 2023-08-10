module.exports = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        aspid: "",
        designer: "",
        phone: "",
        gender: "여성",
        birth: new Date(1800, 0, 1),
        address: "",
        email: "",
        meeting: {
          date: new Date(1800, 0, 1),
          status: "",
          memo: "",
          common: {
            date: new Date(1800, 0, 1),
            status: "",
          }
        },
        calendar: {
          mother: "designerMeeting",
          id: "",
        },
        portfolio: [],
        submit: {
          presentation: {
            date: new Date(1800, 0, 1),
            boo: false
          },
          partnership: {
            date: new Date(1800, 0, 1),
            boo: false
          },
          firstRequest: {
            date: new Date(1800, 0, 1),
            method: "",
          },
          documents: {
            date: new Date(1800, 0, 1),
            boo: false,
          },
          registration: {
            date: new Date(1800, 0, 1),
            boo: false,
          },
          meeting: {
            date: new Date(1800, 0, 1),
            boo: false,
          },
          comeFrom: "",
        },
        information: {
          company: {
            name: "",
            classification: "",
            businessNumber: "",
            representative: "",
            start: new Date(1800, 0, 1),
          },
          account: {
            bank: "",
            number: "",
            to: "",
            etc: "",
          },
          career: {
            interior: {
              year: 0,
              month: 0
            },
            styling: {
              year: 0,
              month: 0
            },
            detail: [],
            school: [],
            about: "",
          },
          channel: {
            web: [],
            sns: [],
            cloud: []
          }
        },
        response: {
          date: new Date(1800, 0, 1),
          long: "",
          outreason: "",
          manager: "",
          first: {
            status: "검토중",
            reason: "",
          },
          portfolio: {
            summary: "",
            proper: {
              status: 0,
              remodeling: false,
              styling: false,
            },
            ready: {
              home: false,
              furnishing: false,
              set: false,
            },
            plus: {
              needs: false,
              request: new Date(1800, 0, 1),
              photo: new Date(1800, 0, 1),
            }
          },
        }
      }
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "portfolio") {
      dummy = {
        date: new Date(),
        confirm: [
          {
            date: new Date(),
            who: "",
          }
        ],
        folderId: "1j-mLXZszbWNqq_xhXVPtm4MW5QOm5sZ2"
      };
    }
    return dummy;
  }
}
