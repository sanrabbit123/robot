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
        showRoom: [],
        webPage: [],
        sns: [
          { kinds: "", link: "" },
        ],
      },
      business: {
        career: "",
        account: [],
        cashReceipt: false,
        businessInfo: {
          classification: "",
          businessNumber: "",
          files: {
            businessRegistration: false,
            bnakBook: false,
            registrationCard: false
          },
        },
        service: {
          cost: {
            maxtrix: [
              [ 0, 0, 0 ],
              [ 0, 0, 0 ],
              [ 0, 0, 0 ],
              [ 0, 0, 0 ],
            ],
            exception: [
              { condition: "", cost: "", },
            ],
            percentage: 0,
            percentageHistory: [
              {
                date: { start: "9999-09-09", end: "9999-09-09" },
                percentage: 0,
              }
            ]
          },
          availables: {
            area: [],
            style: [],
            service: [],
            tech: [],
            make: {
              furniture: false,
              fabric: false,
            },
            purchaseAgent: false,
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
      proposal: [
        {
          name: "",
          photo: [
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
      ],
      ghost: [
        {
          link: "",
          sgTrue: ""
        },
      ],
    }
  },
}
