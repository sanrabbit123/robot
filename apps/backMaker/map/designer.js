module.exports = {
  structure: {
    designer: "",
    desid: "",
    information: {
      contract: {
        status: "",
        date: new Date("1800-01-01"),
      },
      phone: "",
      email: "",
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
                date: { start: new Date("1800-01-01"), end: new Date("1800-01-01") },
                percentage: 0,
              }
            ]
          },
          contruct: {
            partner: "",
            method: "",
          },
        },
      }
    },
    analytics: {
      personality: 0,
      grade: 0,
      reliability: 0,
      availables: {
        area: [],
        style: [],
        service: [],
        tech: [],
        make: {
          furniture: false,
          fabric: false,
        },
      },
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
