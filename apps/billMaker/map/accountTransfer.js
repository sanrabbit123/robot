module.exports = {
  collection: "accountTransfer",
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;
    map = {
      structure: {
        bilid: "",
        requestNumber: 0,
        proid: "",
        cliid: "",
        desid: "",
        goodname: "",
        date: new Date(),
        name: "",
        phone: "",
        amount: 0,
        accountInfo: {}
      },
      find: (fresh) => { return { bilid: fresh.bilid } }
    };
    const { AccountTransfer } = alive(mother);
    tong = [];
    for (let json of updateQueryArr) {
      fresh = new AccountTransfer(null);
      fresh.make(json);
      findQuery = map.find(fresh);
      insertEvent = async function (fresh) {}
      tong.push({ fresh, findQuery, insertEvent });
    }
    return tong;
  },
  alive: function (mother) {
    class AccountTransfer {
      constructor(json) {
        if (json !== null) {
          if (typeof json === "object") {
            this.bilid = json.bilid;
            this.requestNumber = json.requestNumber;
            this.proid = json.proid;
            this.cliid = json.cliid;
            this.desid = json.desid;
            this.goodname = json.goodname;
            this.date = json.date;
            this.name = json.name;
            this.phone = json.phone;
            this.amount = json.amount;
            this.accountInfo = json.accountInfo;
          }
        }
      }
    }
    return { AccountTransfer };
  },
  wrap: function (alive, jsonArr, mother) {
    const { AccountTransfer } = alive(mother);
    class AccountTransfers extends Array {
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
    arr = new AccountTransfers();
    for (let json of jsonArr) {
      arr.push(new AccountTransfer(json));
    }
    return arr;
  }
}
