module.exports = {
  collection: "cashReceipt",
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;
    map = {
      out: {
        id: "",
        date: new Date(1800, 0, 1),
        deal: false,
        method: 0,
        amount: {
          supply: 0,
          vat: 0,
          service: 0,
          total: 0
        },
        etc: {
          business: "",
          remark: "",
          issuance: ""
        }
      },
      in: {
        id: "",
        date: new Date(1800, 0, 1),
        deal: false,
        method: 1,
        who: {
          business: "",
          company: ""
        },
        amount: {
          supply: 0,
          vat: 0,
          service: 0,
          total: 0
        },
        etc: {
          item: "",
          remark: "",
          issuance: ""
        }
      },
      find: {
        out: (fresh) => { return { $and: [ { method: 0 }, { id: fresh.id } ] }; },
        in: (fresh) => { return { $and: [ { method: 1 }, { id: fresh.id } ] }; }
      },
      graphic: {
        out: {
          method: "",
          time: new Date(1800, 0, 1),
          supply: 0,
          vat: 0,
          service: 0,
          total: 0,
          id: "",
          issuance: "",
          deal: false,
          etc: "",
        },
        in: {
          time: new Date(1800, 0, 1),
          business: "",
          from: "",
          item: "",
          supply: 0,
          vat: 0,
          service: 0,
          total: 0,
          id: "",
          issuance: "",
          deal: false,
          etc: "",
        }
      }
    };
    const { CashOut, CashIn } = alive(mother);
    tong = [];
    for (let updateQuery of updateQueryArr) {
      if (updateQuery.method !== undefined) {
        fresh = new CashOut(null);
        fresh.make(updateQuery);
        findQuery = map.find.out(fresh);
        insertEvent = async function (fresh) {}
      } else {
        fresh = new CashIn(null);
        fresh.make(updateQuery);
        findQuery = map.find.in(fresh);
        insertEvent = async function (fresh) {
          try {
            await mother.slack_bot.chat.postMessage(fresh.toMessage());
          } catch (e) {
            console.log(e);
          }
        }
      }
      tong.push({ fresh, findQuery, insertEvent });
    }
    return tong;
  },
  alive: function (mother) {
    const { dateToString, autoComma } = mother;
    class CashOut {
      constructor(o) {
        if (o !== null) {
          if (typeof o === "object") {
            this.id = o.id;
            this.date = o.date;
            this.deal = o.deal;
            this.method = 0;
            this.amount = o.amount;
            this.etc = o.etc;
          }
        }
      }
      make(o) {
        this.id = o.id;
        this.date = o.time;
        this.deal = o.deal;
        this.method = 0;
        this.amount = {
          supply: o.supply,
          vat: o.vat,
          service: o.service,
          total: o.total,
        };
        this.etc = {
          business: o.method,
          remark: o.etc,
          issuance: o.issuance
        };
      }
      toMessage() {
        let arr;
        arr = [
          `현금 영수증(${this.id}) ${dateToString(this.date, true)}`,
          ``,
          `- 종류 : ${this.method === 0 ? "매출" : "매입"}`,
          `- 금액 : ${autoComma(this.amount.total)}원`,
        ];
        return { text: arr.join("\n"), channel: "#701_taxbill" };
      }
    }
    class CashIn {
      constructor(o) {
        if (o !== null) {
          if (typeof o === "object") {
            this.id = o.id;
            this.date = o.date;
            this.deal = o.deal;
            this.method = 1;
            this.who = o.who;
            this.amount = o.amount;
            this.etc = o.etc;
          }
        }
      }
      make(o) {
        this.id = o.id;
        this.date = o.time;
        this.deal = o.deal;
        this.method = 1;
        this.who = {
          business: o.business,
          company: o.from
        };
        this.amount = {
          supply: o.supply,
          vat: o.vat,
          service: o.service,
          total: o.total,
        };
        this.etc = {
          item: o.item,
          remark: o.etc,
          issuance: o.issuance
        };
      }
      toMessage() {
        let arr;
        arr = [
          `현금 영수증(${this.id}) ${dateToString(this.date, true)}`,
          ``,
          `- 종류 : ${this.method === 0 ? "매출" : "매입"}`,
          `- 발신자 : ${this.who.company} (${this.who.business})`,
          `- 품목 : ${this.etc.item}`,
          `- 금액 : ${autoComma(this.amount.total)}원`,
        ];
        return { text: arr.join("\n"), channel: "#701_taxbill" };
      }
    }
    return { CashOut, CashIn };
  },
  wrap: function (alive, jsonArr, mother) {
    const { CashOut, CashIn } = alive(mother);
    class Cash extends Array {
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
    let arr, tempObj;
    arr = new Cash();
    for (let json of jsonArr) {
      if (json.method === 1) {
        tempObj = new CashIn(json);
      } else {
        tempObj = new CashOut(json);
      }
      arr.push(tempObj);
    }
    return arr;
  }
}
