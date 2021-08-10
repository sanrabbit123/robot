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
      comments: [],
      links: [],
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
    } else if (subject === "requests") {
      dummy = {
        date: new Date(),
        status: "결제 요청",
        info: [],
        items: [],
        pay: new Date(1800, 0, 1),
        cancel: new Date(1800, 0, 1),
      };
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
    }
    return dummy;
  },
  alive: function (mother) {
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

    class Request {
      constructor(json) {
        this.date = json.date;
        this.status = json.status;
        this.info = new SeachArray(json.info);
        this.items = new Items(json.items);
        this.pay = json.pay;
        this.cancel = json.cancel;
      }
      toNormal() {
        let obj = {};
        obj.date = this.date;
        obj.info = this.info.toNormal();
        obj.items = this.items.toNormal();
        obj.pay = this.pay;
        obj.cancel = this.cancel;
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
        obj.managers = this.managers;
        obj.customer = this.customer;
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
        this.comments = new SeachArray(json.comments);
        this.links = new SeachArray(json.links);
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
        obj.comments = this.comments.toNormal();
        obj.links = this.links;
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
