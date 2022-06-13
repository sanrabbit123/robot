module.exports = {
  main: function () {
    let dummy;
    dummy = {
      structure: {
        useid: "",
        desid: "",
        name: "",
        phone: "",
        email: "",
        service: {
          serid: "",
          xValue: "",
          online: true,
        },
        request: {
          timeline: new Date(1800, 0, 1),
          status: "",
          complete: false,
          alarm: false,
          space: {
            address: "",
            targets: 0,
          },
          comments: {
            init: "",
            style: "",
            budget: "",
            size: "",
            etc: "",
          },
          photo: [],
          payment: {
            date: new Date(1800, 0, 1),
            cancel: new Date(1800, 0, 1),
            oid: "",
            amount: {
              supply: 0,
              vat: 0,
              consumer: 0,
            },
            info: {
              method: "",
              proof: "",
              to: "",
              data: [],
            },
            refund: 0,
          }
        },
        response: {
          timeline: new Date(1800, 0, 1),
          status: "",
          complete: false,
          alarm: false,
          history: [],
          design: [],
          consulting: [],
          calculation: {
            date: new Date(1800, 0, 1),
            cancel: new Date(1800, 0, 1),
            method: "",
            percentage: 0,
            amount: 0,
            info: {
              account: "",
              proof: "",
              to: "",
            },
            refund: 0,
          }
        }
      },
    };
    return dummy;
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "request.photo") {
      dummy = {
        date: new Date(1800, 0, 1),
        key: "",
      };
    } else if (subject === "response.history") {
      dummy = {
        send: new Date(1800, 0, 1),
        read: new Date(1800, 0, 1),
      };
    } else if (subject === "response.design") {
      dummy = {
        concept: [],
        proposal: [],
        photo: [],
        list: [],
      };
    } else if (subject === "response.design.concept") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: new Date(1800, 0, 1),
        key: "",
        target: 0,
        comments: {
          designer: "",
          client: "",
          homeliaison: "",
        }
      };
    } else if (subject === "response.design.proposal") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: new Date(1800, 0, 1),
        key: "",
        target: 0,
        comments: {
          designer: "",
          client: "",
          homeliaison: "",
        }
      };
    } else if (subject === "response.design.photo") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: new Date(1800, 0, 1),
        key: "",
        target: 0,
        comments: {
          designer: "",
          client: "",
          homeliaison: "",
        }
      };
    } else if (subject === "response.design.list") {
      dummy = {
        date: new Date(1800, 0, 1),
        confirm: new Date(1800, 0, 1),
        target: 0,
        detail: [],
        comments: {
          designer: "",
          client: "",
          homeliaison: "",
        }
      };
    } else if (subject === "response.design.list.detail") {
      dummy = {
        image: "",
        name: "",
        number: 0,
        price: {
          unit: 0,
          delivery: 0
        },
        detail: "",
        where: {
          name: "",
          link: "",
        }
      };
    } else if (subject === "response.consulting") {
      dummy = {
        date: new Date(1800, 0, 1),
        comments: {
          designer: "",
          client: "",
          homeliaison: "",
        }
      };
    }
    return dummy;
  }
}
