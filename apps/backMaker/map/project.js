module.exports = {
  structure: {
    proid: "",
    client: "",
    cliid: "",
    desid: "",
    service: "",
    proposal: {
      status: "",
      detail: [
        {
          desid: "",
          fee: [
            {
              method: "offline",
              partial: false,
              money: 0
            }
          ],
          pictureSettings: [
            {
              position: "",
              sgTrue: "",
              unionPo: "",
              styleText: ""
            },
          ],
          description: [
            "",
            "",
            "",
          ]
        }
      ]
    },
    process: {
      status: "진행중", // [ '드랍', '진행', '응대중', '완료' ]
      contract: {
        guide: "9999-09-09", // alimtalk api in button in notion (to mongo / to notion)
        date: "9999-09-09", // bank api in button in notion (to mongo / to notion)
        calculation: {
          amount: 0, // from contract
          info: {
            account: "", // from contract
            proof: "", // from contract
            to: "", // from contract
          }
        },
        form: {
          id: "", // eform api in button in notion (to mongo / to notion)
          guide: "9999-09-09", // alimtalk api in button in notion (to mongo / to notion)
          date: {
            from: "9999-09-09", // from contract
            to: "9999-09-09", // from contract
          }
        },
        meeting: {
          date: "9999-09-09", // alimtalk api (to client + to designer) in button in notion (to mongo / to notion)
          pastDesigners: [
            { desid: "" }
          ]
        },
        remain: {
          guide: "9999-09-09", // alimtalk api in button in notion (to mongo / to notion)
          date: "9999-09-09", // bank api in button in notion (to mongo / to notion)
          calculation: {
            amount: {
              supply: 0, // from contract
              vat: 0, // from contract
              consumer: 0, // from contract
            },
            info: {
              account: "", // from contract
              proof: "", // from contract
              to: "", // from contract
            }
          },
        },
      },
      design: {
        proposal: {
          limit: null,
          detail: [
            {
              date: "9999-09-09", // ?
            }
          ]
        },
        construct: {
          provided: true,
          detail: [
            {
              name: "",
              provider: "HomeLiaison",
              form: {
                id: "",
                date: {
                  from: "9999-09-09",
                  to: "9999-09-09",
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
          provided: true,
          detail: [
            /<%if(fabrication === true)%>/
            {
              name: "",
              provider: "HomeLiaison",
              form: {
                id: "",
                date: {
                  from: "9999-09-09",
                  to: "9999-09-09",
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
              }
            },
            /<%else%>/
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
    },
    contents: {
      photo: {
        date: "9999-09-09",
        info: {
          photographer: "",
          interviewer: "",
        }
      },
      space: {
        region: "",
        method: "",
      },
      portfolio: {
        pid: "",
        date: "9999-09-09",
        title: {
          main: "",
          sub: "",
          simple: "",
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
          key8: 0,
          key9: 0,
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
        date: "9999-09-09",
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
              type: 0,
              photo: [],
              contents: [
                {
                  quest: "",
                  answer: "",
                }
              ]
            },
          ],
        }
      }
    },
  }
}
