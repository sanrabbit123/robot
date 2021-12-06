module.exports = {
  collection: "constructInvoice",
  main: function () {
    return {
      invid: "",
      title: "",
      date: new Date(),
      organizer: {
        name: "",
        businessNumber: "",
        phone: "",
        address: "",
      },
      requests: [],
      links: {},
    };
  },
  sub: function (subject) {
    let dummy = null;
    if (subject === "requests") {
      dummy = {
        id: "",
        date: new Date(),
        period: {
          from: new Date(1800, 0, 1),
          to: new Date(1800, 0, 1),
        },
        name: "",
        status: "작성중",
        address: "",
        pyeong: 0,
        items: [],
        commission: {
          supply: 0,
          vat: 0,
          consumer: 0,
        },
        info: [],
        comments: [],
      };
    } else if (subject === "items") {
      dummy = {
        id: "",
        name: "",
        detail: [],
      };
    } else if (subject === "detail") {
      dummy = {
        id: "",
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

    class Commission {
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

    class ItemDetail {
      constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.description = json.description;
        this.info = new SeachArray(json.info);
        this.unit = new Unit(json.unit);
        this.amount = new Amount(json.amount);
      }
      toNormal() {
        let obj = {};
        obj.id = this.id;
        obj.name = this.name;
        obj.description = this.description;
        obj.info = this.info.toNormal();
        obj.unit = this.unit.toNormal();
        obj.amount = this.amount.toNormal();
        return obj;
      }
    }

    class ItemDetailArray extends Array {
      constructor(jsonArr) {
        super();
        for (let obj of jsonArr) {
          this.push(new ItemDetail(obj));
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

    class Item {
      constructor(json) {
        this.id = json.id;
        this.name = json.name;
        this.detail = new ItemDetailArray(json.detail);
      }
      toNormal() {
        let obj = {};
        obj.id = this.id;
        obj.name = this.name;
        obj.detail = this.detail.toNormal();
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

    class Period {
      constructor(json) {
        this.from = json.from;
        this.to = json.to;
      }
      toNormal() {
        let obj = {};
        obj.from = this.from;
        obj.to = this.to;
        return obj;
      }
    }

    class Request {
      constructor(json) {
        this.id = json.id;
        this.date = json.date;
        this.period = new Period(json.period);
        this.name = json.name;
        this.status = json.status;
        this.address = json.address;
        this.pyeong = json.pyeong;
        this.items = new Items(json.items);
        this.commission = new Commission(json.commission);
        this.info = new SeachArray(json.info);
        this.comments = new SeachArray(json.comments);
      }
      toNormal() {
        let obj = {};
        obj.id = this.id;
        obj.date = this.date;
        obj.period = this.period.toNormal();
        obj.name = this.name;
        obj.status = this.status;
        obj.address = this.address;
        obj.pyeong = this.pyeong;
        obj.items = this.items.toNormal();
        obj.commission = this.commission.toNormal();
        obj.info = this.info.toNormal();
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

    class Organizer {
      constructor(json) {
        this.name = json.name;
        this.businessNumber = json.businessNumber;
        this.phone = json.phone;
        this.address = json.address;
      }
      toNormal() {
        let obj;
        obj = {};
        obj.name = this.name;
        obj.businessNumber = this.businessNumber;
        obj.phone = this.phone;
        obj.address = this.address;
        return obj;
      }
    }

    class Invoice {
      constructor(json) {
        this.invid = json.invid;
        this.title = json.title;
        this.date = json.date;
        this.organizer = new Organizer(json.organizer);
        this.requests = new Requests(json.requests);
        this.links = new Links(json.links);
      }
      toNormal() {
        let obj;
        obj = {};
        obj.invid = this.invid;
        obj.title = this.title;
        obj.date = this.date;
        obj.organizer = this.organizer.toNormal();
        obj.requests = this.requests.toNormal();
        obj.links = this.links.toNormal();
        return obj;
      }
    }

    return { Invoice };
  },
  wrap: function (alive, jsonArr, mother) {
    const { Invoice } = alive(mother);
    class Invoices extends Array {
      search(id) {
        let target;
        target = null;
        for (let o of this) {
          if (o.invid === id) {
            target = o;
            break;
          }
        }
        return target;
      }
    }
    let arr;
    arr = new Invoices();
    for (let json of jsonArr) {
      arr.push(new Invoice(json));
    }
    return arr;
  }
}
