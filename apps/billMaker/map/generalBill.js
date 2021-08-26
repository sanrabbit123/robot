module.exports = {
  collection: "taxBill",
  main: function () {
    return {
      bilid: "",
      class: "",
      name: "",
      date: new Date(),
      participant: {
        managers: [],
        customer: {
          name: "",
          phone: "",
          email: "",
        },
      },
      requests: [],
      responses: [],
      links: {},
    };
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "managers") {
      dummy = {
        name: "",
        phone: "",
        email: "",
      };
    } else if (subject === "requests" || subject === "responses") {
      dummy = {
        id: "",
        date: new Date(),
        removal: new Date(1800, 0, 1),
        name: "",
        status: (subject === "requests" ? "결제 요청" : "정산 대기"),
        info: [],
        items: [],
        pay: [],
        cancel: [],
        proofs: [],
        comments: [],
      };
      if (subject === "response") {
        dummy.target = {
          name: "",
          phone: ""
        };
      }
    } else if (subject === "items") {
      dummy = {
        id: "",
        class: "",
        name: "",
        description: "",
        info: [],
        unit: {
          ea: "",
          price: 0,
          number: 0,
        },
        amount: {
          supply: 0,
          vat: 0,
          consumer: 0,
        }
      };
    } else if (subject === "responseItems") {
      dummy = {
        id: "",
        class: "",
        name: "",
        description: "",
        info: [],
        unit: {
          ea: "",
          price: 0,
          number: 0,
        },
        amount: {
          pure: 0,
          commission: 0,
        }
      };
    } else if (subject === "proofs") {
      dummy = {
        date: new Date(),
        method: "",
        proof: "",
        to: "",
      };
    } else if (subject === "pay") {
      dummy = {
        date: new Date(),
        amount: 0
      };
    }
    return dummy;
  },
  alive: function (mother) {
    class Pay {
      constructor(json) {
        this.date = json.date;
        this.amount = json.amount;
      }
      toNormal() {
        let obj = {};
        obj.date = this.date;
        obj.amount = this.amount;
        return obj;
      }
    }

    class PayArray extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Pay(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class SeachArray extends Array {
      constructor(arr) {
        super();
        for (let i of arr) {
          if (typeof i === "object") {
            for (let key in i) {
              Object.defineProperty(this, key, {
                value: i[key],
                configurable: true,
                enumerable: false,
                writable: true
              });
            }
          }
          this.push(i);
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i);
        }
        return arr;
      }
    }

    class Links {
      constructor(obj) {
        for (let key in obj) {
          this[key] = obj[key];
        }
      }
      toNormal() {
        let obj = {};
        for (let key in this) {
          obj[key] = this[key];
        }
        return obj;
      }
    }

    class Proof {
      constructor(json) {
        this.date = json.date;
        this.method = json.method;
        this.proof = json.proof;
        this.to = json.to;
      }
      toNormal() {
        let obj = {};
        obj.date = this.date;
        obj.method = this.method;
        obj.proof = this.proof;
        obj.to = this.to;
        return obj;
      }
    }

    class Proofs extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Proof(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class Who {
      constructor(json) {
        this.name = json.name;
        this.phone = json.phone;
        this.email = json.email;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.name = this.name;
        obj.phone = this.phone;
        obj.email = this.email;
        return obj;
      }
    }

    class Amount {
      constructor(json) {
        this.supply = json.supply;
        this.vat = json.vat;
        this.consumer = json.consumer;
      }
      toNormal() {
        let obj = {};
        obj.supply = this.supply;
        obj.vat = this.vat;
        obj.consumer = this.consumer;
        return obj;
      }
    }

    class Unit {
      constructor(json) {
        this.ea = json.ea;
        this.price = json.price;
        this.number = json.number;
      }
      toNormal() {
        let obj = {};
        obj.ea = this.ea;
        obj.price = this.price;
        obj.number = this.number;
        return obj;
      }
    }

    class Item {
      constructor(json) {
        this.id = json.id;
        this.class = json.class;
        this.name = json.name;
        this.description = json.description;
        this.info = new SeachArray(json.info);
        this.unit = new Unit(json.unit);
        this.amount = new Amount(json.amount);
      }
      toNormal() {
        let obj = {};
        obj.id = this.id;
        obj.class = this.class;
        obj.name = this.name;
        obj.description = this.description;
        obj.info = this.info.toNormal();
        obj.unit = this.unit.toNormal();
        obj.amount = this.amount.toNormal();
        return obj;
      }
    }

    class Items extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Item(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class ResponseAmount {
      constructor(json) {
        this.pure = json.pure;
        this.commission = json.commission;
      }
      toNormal() {
        let obj = {};
        obj.pure = this.pure;
        obj.commission = this.commission;
        return obj;
      }
    }

    class ResponseItem {
      constructor(json) {
        this.id = json.id;
        this.class = json.class;
        this.name = json.name;
        this.description = json.description;
        this.info = new SeachArray(json.info);
        this.unit = new Unit(json.unit);
        this.amount = new ResponseAmount(json.amount);
      }
      toNormal() {
        let obj = {};
        obj.id = this.id;
        obj.class = this.class;
        obj.name = this.name;
        obj.description = this.description;
        obj.info = this.info.toNormal();
        obj.unit = this.unit.toNormal();
        obj.amount = this.amount.toNormal();
        return obj;
      }
    }

    class ResponseItems extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new ResponseItem(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class ResponseTarget {
      constructor(json) {
        this.name = json.name;
        this.phone = json.phone;
      }
      toNormal() {
        let obj = {};
        obj.name = this.name;
        obj.phone = this.phone;
        return obj;
      }
    }

    class Response {
      constructor(json) {
        this.id = json.id;
        this.date = json.date;
        this.removal = json.removal;
        this.name = json.name;
        this.status = json.status;
        this.info = new SeachArray(json.info);
        this.items = new ResponseItems(json.items);
        this.pay = new PayArray(json.pay);
        this.cancel = new PayArray(json.cancel);
        this.proofs = new Proofs(json.proofs);
        this.comments = new SeachArray(json.comments);
        this.target = new ResponseTarget(json.target);
      }
      toNormal() {
        let obj = {};
        obj.id = this.id;
        obj.date = this.date;
        obj.removal = this.removal;
        obj.name = this.name;
        obj.info = this.info.toNormal();
        obj.items = this.items.toNormal();
        obj.pay = this.pay.toNormal();
        obj.cancel = this.cancel.toNormal();
        obj.proofs = this.proofs.toNormal();
        obj.comments = this.comments.toNormal();
        obj.target = this.target.toNormal();
        return obj;
      }
    }

    class Responses extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Response(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class Request {
      constructor(json) {
        this.id = json.id;
        this.date = json.date;
        this.removal = json.removal;
        this.name = json.name;
        this.status = json.status;
        this.info = new SeachArray(json.info);
        this.items = new Items(json.items);
        this.pay = new PayArray(json.pay);
        this.cancel = new PayArray(json.cancel);
        this.proofs = new Proofs(json.proofs);
        this.comments = new SeachArray(json.comments);
      }
      toNormal() {
        let obj = {};
        obj.id = this.id;
        obj.date = this.date;
        obj.removal = this.removal;
        obj.name = this.name;
        obj.info = this.info.toNormal();
        obj.items = this.items.toNormal();
        obj.pay = this.pay.toNormal();
        obj.cancel = this.cancel.toNormal();
        obj.proofs = this.proofs.toNormal();
        obj.comments = this.comments.toNormal();
        return obj;
      }
    }

    class Requests extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Request(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class Managers extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new Who(obj));
        }
      }
      toNormal() {
        let arr = [];
        for (let i of this) {
          arr.push(i.toNormal());
        }
        return arr;
      }
    }

    class Participant {
      constructor(json) {
        this.managers = new Managers(json.managers);
        this.customer = new Who(json.customer);
      }
      toNormal() {
        let obj;
        obj = {};
        obj.managers = this.managers.toNormal();
        obj.customer = this.customer.toNormal();
        return obj;
      }
    }

    class Bill {
      constructor(json) {
        this.bilid = json.bilid;
        this.class = json.class;
        this.name = json.name;
        this.date = json.date;
        this.participant = new Participant(json.participant);
        this.requests = new Requests(json.requests);
        this.responses = new Responses(json.responses);
        this.links = new Links(json.links);
      }
      toNormal() {
        let obj;
        obj = {};
        obj.bilid = this.bilid;
        obj.class = this.class;
        obj.name = this.name;
        obj.date = this.date;
        obj.participant = this.participant.toNormal();
        obj.requests = this.requests.toNormal();
        obj.responses = this.responses.toNormal();
        obj.links = this.links.toNormal();
        return obj;
      }
    }

    return { Bill };
  },
  wrap: function (alive, jsonArr, mother) {
    const { Bill } = alive(mother);
    class Bills extends Array {
      search(id) {
        let target;
        target = null;
        for (let o of this) {
          if (o.bilid === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }
    let arr;
    arr = new Bills();
    for (let json of jsonArr) {
      arr.push(new Bill(json));
    }
    return arr;
  }
}
