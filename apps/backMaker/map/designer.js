module.exports = {
  structure: {
    designer: "",
    desid: "",
    information: {
      contract: {
        status: "",
        date: "9999-09-09",
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
              pyeong: [
                [ 0, 0, 0 ],
                [ 0, 0, 0 ],
                [ 0, 0, 0 ],
                [ 0, 0, 0 ],
              ],
              availables: [
                [ false, false, false ],
                [ false, false, false ],
                [ false, false, false ],
                [ false, false, false ],
              ]
            },
            percentage: 0,
            percentageHistory: [
              {
                date: { start: "9999-09-09", end: "9999-09-09" },
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
