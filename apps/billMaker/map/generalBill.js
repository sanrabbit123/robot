module.exports = {
  collection: "taxBill",
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;
    map = {
      main: {
        bilid: "",
        class: "",
        name: "",
        generate: {
          date: new Date(),
          who: {
            name: "",
            phone: "",
            email: "",
          },
        },
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
      },
      managers: {
        name: "",
        phone: "",
        email: "",
      },
      requests: {
        date: new Date(),
        info: [],
        items: []
      },
      items: {
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
      }
    };
    return [];
  },
  alive: function (mother) {
    const { dateToString, autoComma } = mother;

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

    class Request {
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

    class Generate {
      constructor(json) {
        this.date = json.date;
        this.who = new Who(json.who);
      }
      toNormal() {
        let obj;
        obj = {};
        obj.date = this.date;
        obj.who = this.who.toNormal();
        return obj;
      }
    }

    class Bill {
      constructor(json) {
        this.bilid = json.bilid;
        this.class = json.class;
        this.name = json.name;
        this.generate = new Generate(json.generate);
        this.participant = new Participant(json.participant);
        this.requests = new Requests(json.requests);
        this.comments = new Comments(json.comments);
        this.links = new Links(json.links);
      }
      toNormal() {
        let obj;
        obj = {};
        obj.bilid = this.bilid;
        obj.class = this.class;
        obj.name = this.name;
        obj.generate = this.generate.toNormal();
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
    const { TaxBill } = alive(mother);
    class TaxBills extends Array {
      search(id) {
        let target;
        target = null;
        for (let o of this) {
          if (o.id === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }
    let arr;
    arr = new TaxBills();
    for (let json of jsonArr) {
      arr.push(new TaxBill(json));
    }
    return arr;
  }
}
