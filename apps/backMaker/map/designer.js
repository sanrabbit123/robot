module.exports = {
  structure: {
    designer: "",
    desid: "",
    information: {
      contract: {
        status: "",
        date: new Date(1800, 0, 1),
      },
      phone: "",
      email: "",
      did: "",
      address: [],
      personalSystem: {
        showRoom: false,
        webPage: [],
        sns: [
          { kind: "", href: "" },
        ],
      },
      business: {
        career: {
          startY: 0,
          startM: 0,
        },
        account: [
          {
            bankName: "",
            accountNumber: "",
            to: "",
          }
        ],
        businessInfo: {
          classification: "",
          businessNumber: "",
          files: {
            businessRegistration: false,
            bankBook: false,
            registrationCard: false
          },
        },
        service: {
          cost: {
            matrix: {
              service: [
                {
                  serid: "s2011_aa01s",
                  case: 9
                },
                {
                  serid: "s2011_aa02s",
                  case: 11
                },
                {
                  serid: "s2011_aa03s",
                  case: 9
                }
              ],
              online: true
            },
            percentage: 0,
            percentageHistory: [
              {
                date: { start: new Date(1800, 0, 1), end: new Date(1800, 0, 1) },
                percentage: 0,
              }
            ]
          },
          construct: {
            partner: "",
            method: "",
          },
        },
      }
    },
    analytics: {
      region: {
        available: [ "서울", "경기" ],
        transportation: {
          method: "자동차",
          expenses: {
            actual: {
              boo: true
            },
            unit: {
              boo: true,
              amount: 0,
            }
          },
        },
      },
      meeting: {
        measure: {
          direct: false,
          furniture: false,
        },
        team: false,
        style: "",
      },
      project: {
        index: false,
        budget: {
          resultOffer: false,
          method: "문서",
        },
        time: {
          first: 7,
          entire: 30,
        },
        paperWork: [],
        communication: {
          method: "",
          count: 0,
        },
        retouch: {
          partial: 3,
          entire: 4
        }
      },
      construct: {
        level: 1,
        possible: {
          supervision: true,
          partialSupervision: true,
          others: true
        },
        contract: {
          method: "협업사 계약",
          othersFinishing: "",
          communication: "",
        }
      },
      styling: {
        level: 0,
        method: "",
        tendency: {
          style: {
            modern: 0,
            glam: 0,
            antique: 0,
            natural: 0,
            minimum: 0,
            vintage: 0,
            feminine: 0,
            exotic: 0,
          },
          texture: {
            darkWood: 0,
            whiteWood: 0,
            coating: 0,
            metal: 0
          },
          color: {
            darkWood: 0,
            whiteWood: 0,
            highContrast: 0,
            vivid: 0,
            white: 0,
            mono: 0
          },
          density: {
            maximun: 0,
            minimum: 0,
          }
        },
        furniture: {
          builtin: true,
          design: true
        },
        fabric: {
          manufacture: false,
          method: "",
        }
      },
      purchase: {
        agencies: {
          boo: true,
          fee: 0,
        },
        setting: {
          takeIn: false,
          install: true,
          storage: true,
          detail: "",
        },
        detail: "",
      },
      etc: {
        matrix: [],
        operationBudget: {
          min: 5000000,
          max: 10000000
        },
        personality: {
          fast: true,
          careful: true,
          lead: true
        },
        relation: ""
      }
    },
    realTime: {
      availableDate: [
        {
          startDate: "",
          endDate: "",
        }
      ],
    },
    setting: {
      front: {
        introduction: {
          desktop: [],
          mobile: [],
        },
        methods: [],
        photo: {
          porlid: "",
          index: "",
        },
        order: 0,
      },
      proposal: [
        {
          name: "",
          photo: [
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
      ghost: [
        {
          link: "",
          sgTrue: ""
        },
      ],
    },
  },
}
