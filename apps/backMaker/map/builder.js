module.exports = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        buiid: "",
        builder: "",
        information: {
          contract: {
            status: "협약 완료",
            date: new Date(1800, 0, 1),
          },
          phone: "",
          email: "",
          address: [],
          business: {
            company: "",
            career: {
              relatedY: 0,
              relatedM: 0,
              startY: 0,
              startM: 0,
            },
            account: [],
            businessInfo: {
              classification: "개인사업자(일반)",
              businessNumber: "",
            },
            service: {
              cost: {
                percentage: 5,
                percentageHistory: []
              },
              designer: {
                partner: "",
              },
            }
          }
        },
        analytics: {
          region: {
            transportation: "자동차",
            range: 40,
            expenses: 50,
          },
          construct: {
            level: 1,
            cost: 1,
            available: [],
          }
        }
      }
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "") {
      dummy = {};
    }
    return dummy;
  }
}
