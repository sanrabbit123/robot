module.exports = {
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
      detail: [
        {
          desid: "",
          fee: [
            {
              method: "offline",
              partial: false,
              amount: 0
            }
          ],
          pictureSettings: [
            {
              position: "",
              sgTrue: "",
              unionPo: "",
              styleText: "",
              imgSrc: ""
            },
          ],
          description: [
            "",
            "",
            "",
          ]
        }
      ],
    },
    process: {
      status: "드랍", // [ '드랍', '진행', '응대중', '완료' ]
      contract: {
        first: {
          guide: new Date(1800, 0, 1), // alimtalk api in button in notion (to mongo / to notion)
          date: new Date(1800, 0, 1), // bank api in button in notion (to mongo / to notion)
          calculation: {
            amount: 0, // from contract
            info: {
              method: "", // from contract
              proof: "", // from contract
              to: "", // from contract
            }
          },
        },
        remain: {
          guide: new Date(1800, 0, 1), // alimtalk api in button in notion (to mongo / to notion)
          date: new Date(1800, 0, 1), // bank api in button in notion (to mongo / to notion)
          calculation: {
            amount: {
              supply: 0, // from contract
              vat: 0, // from contract
              consumer: 0, // from contract
            },
            info: {
              method: "", // from contract
              proof: "", // from contract
              to: "", // from contract
            }
          },
        },
        form: {
          id: "", // eform api in button in notion (to mongo / to notion)
          guide: new Date(1800, 0, 1), // alimtalk api in button in notion (to mongo / to notion)
          date: {
            from: new Date(1800, 0, 1), // from contract
            to: new Date(1800, 0, 1), // from contract
          }
        },
        meeting: {
          date: new Date(1800, 0, 1), // alimtalk api (to client + to designer) in button in notion (to mongo / to notion)
          pastDesigners: [
            { desid: "" },
          ]
        },
      },
      design: {
        proposal: {
          provided: false,
          limit: null,
          detail: [
            {
              date: new Date(1800, 0, 1),
            }
          ]
        },
        construct: {
          provided: false,
          detail: [
            {
              name: "",
              provider: "HomeLiaison",
              form: {
                id: "",
                date: {
                  from: new Date(1800, 0, 1),
                  to: new Date(1800, 0, 1),
                }
              },
              calculation: {
                amount: {
                  detail: [
                    {
                      name: "",
                      amount: 0,
                    }
                  ],
                  total: 0,
                },
                percentage: 5,
                info: {
                  account: "",
                  proof: "",
                  to: "",
                }
              }
            },
          ],
        },
        purchase: {
          provided: false,
          detail: [
            {
              name: "",
              provider: "HomeLiaison",
              link: "",
              calculation: {
                amount: 0,
              }
            },
          ],
        },
      },
      calculation: {
        method: "",
        percentage: 0,
        info: {
          account: "", // from contract
          proof: "", // from contract
          to: "", // from contract
        },
        payments: {
          totalAmount: 0,
          first: {
            amount: 0,
            date: new Date(1800, 0, 1),
          },
          remain: {
            amount: 0,
            date: new Date(1800, 0, 1),
          }
        }
      },
    },
    contents: {
      photo: {
        date: new Date(1800, 0, 1),
        info: {
          photographer: "",
          interviewer: "",
        }
      },
      conid: "",
    },
  }
}
