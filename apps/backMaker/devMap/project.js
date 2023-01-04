module.exports = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        proid: "",
        cliid: "",
        desid: "",
        service: {
          serid: "",
          xValue: "",
          online: false,
        },
        proposal: {
          status: "",
          date: new Date(1800, 0, 1),
          detail: [],
        },
        process: {
          status: "대기",
          action: "계약금 안내",
          detail: [],
          outreason: [],
          call: {
            next: new Date(1800, 0, 1),
            history: [],
          },
          contract: {
            first: {
              guide: new Date(1800, 0, 1),
              date: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: 0,
                info: {
                  method: "",
                  proof: "",
                  to: "",
                },
                refund: 0,
              },
            },
            remain: {
              guide: new Date(1800, 0, 1),
              date: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
              calculation: {
                amount: {
                  supply: 0,
                  vat: 0,
                  consumer: 0,
                },
                info: {
                  method: "",
                  proof: "",
                  to: "",
                },
                refund: 0,
                discount: 0,
              },
            },
            form: {
              id: "",
              guide: new Date(1800, 0, 1),
              date: {
                from: new Date(1800, 0, 1),
                to: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
              }
            },
            meeting: {
              date: new Date(1800, 0, 1),
              pastDesigners: []
            },
          },
          design: {
            proposal: {
              provided: false,
              limit: null,
              detail: []
            },
            construct: null,
            purchase: {
              provided: false,
              detail: [],
            },
          },
          calculation: {
            method: "",
            percentage: 0,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            payments: {
              totalAmount: 0,
              first: {
                amount: 0,
                date: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              },
              remain: {
                amount: 0,
                date: new Date(1800, 0, 1),
                cancel: new Date(1800, 0, 1),
                refund: 0,
              }
            }
          },
        },
        contents: {
          conid: "",
          photo: {
            boo: true,
            status: "세팅 대기",
            date: new Date(3800, 0, 1),
            info: {
              photographer: "미정",
              interviewer: "미정",
            }
          },
          payment: {
            status: "결제 대기",
            date: new Date(1800, 0, 1),
            cancel: new Date(1800, 0, 1),
            calculation: {
              amount: 165000,
              info: {
                method: "",
                proof: "",
                to: "",
              },
              refund: 0,
            },
          },
          raw: {
            portfolio: {
              status: "해당 없음",
              link: "",
            },
            interview: {
              status: "해당 없음",
              link: "",
            },
            photo: {
              status: "해당 없음",
              link: "",
            },
          },
          share: {
            client: {
              photo: new Date(3800, 0, 1),
              contents: new Date(3800, 0, 1),
            },
            designer: {
              photo: new Date(3800, 0, 1),
              contents: new Date(3800, 0, 1),
            }
          },
          sns: {
            portfolio: {
              long: new Date(3800, 0, 1),
              short: new Date(3800, 0, 1),
            },
            interview: {
              long: new Date(3800, 0, 1),
              short: new Date(3800, 0, 1),
            },
          }
        },
      }
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "process.call.history") {
      dummy = {
        date: new Date(1800, 0, 1),
        who: "",
      };
    } else if (subject === "process.contract.meeting.pastDesigners") {
      dummy = {
        date: new Date(1800, 0, 1),
        desid: "",
      };
    } else if (subject === "process.design.construct") {
      dummy = {
        status: "대기",
        request: new Date(1800, 0, 1),
        estimate: [],
        contract: {
          partner: "",
          form: {
            id: "",
            guide: new Date(1800, 0, 1),
            date: {
              from: new Date(1800, 0, 1),
              to: new Date(1800, 0, 1),
              cancel: new Date(1800, 0, 1),
            }
          },
          payments: {
            first: null,
            start: null,
            middle: null,
            remain: null
          },
          after: {
            expired: new Date(1800, 0, 1),
            history: [],
          }
        }
      };
    } else if (subject === "process.design.construct.estimate") {
      dummy = {
        invid: "",
        date: new Date(1800, 0, 1),
      };
    } else if (subject === "process.design.construct.contract.after.history") {
      dummy = {
        from: new Date(1800, 0, 1),
        to: new Date(1800, 0, 1),
        amount: 0,
      };
    } else if (subject === "process.design.construct.contract.payments") {
      dummy = {
        guide: new Date(1800, 0, 1),
        date: new Date(1800, 0, 1),
        cancel: new Date(1800, 0, 1),
        calculation: {
          amount: {
            supply: 0,
            vat: 0,
            consumer: 0,
          },
          info: {
            method: "",
            proof: "",
            to: "",
          },
          refund: 0,
        },
      };
    }
    return dummy;
  }
}
