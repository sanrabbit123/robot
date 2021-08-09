module.exports = {
  collection: "taxBill",
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;
    map = {
      main: {
        id: "",
        date: new Date(1800, 0, 1),
        who: {
          from: {
            business: "",
            company: "",
            name: "",
            address: "",
            status: "",
            detail: "",
            email: ""
          },
          to: {
            business: "",
            company: "",
            name: "",
            address: "",
            status: "",
            detail: "",
            email: ""
          }
        },
        items: [],
        sum: {
          total: 0,
          supply: 0,
          vat: 0
        }
      },
      items: {
        month: 0,
        date: 0,
        name: "",
        ea: "",
        amount: 0,
        unit: 0,
        supply: 0,
        vat: 0,
        etc: ""
      }
    };

    return [];
  },
  alive: function (mother) {
    const { dateToString, autoComma } = mother;
    class TaxBill {
      constructor(id, date) {
        if (id === undefined || date === undefined) {
          throw new Error("invaild input");
        }
        this.id = id;
        this.date = date;
        this.who = {};
        this.who.from = {};
        this.who.to = {};
        this.items = [];
        this.sum = {
          total: 0,
          supply: 0,
          vat: 0
        };
      }
      toMessage() {
        const zeroAddition = (num) => { return ((num < 10) ? '0' + String(num) : String(num)); }
        const { id, date, who, items, sum } = this;
        let message = '';
        message += "전자 세금 계산서(" + this.id + ") " + dateToString(date, true) + "\n";
        message += "\n";
        message += "발신자\n";
        message += "- 상호 : " + who.from.company + " (" + who.from.business + ")" + "\n";
        message += "- 이름 : " + who.from.name + "\n";
        message += "- 이메일 : " + who.from.email + "\n";
        message += "\n";
        message += "수신자\n";
        message += "- 상호 : " + who.to.company + " (" + who.to.business + ")" + "\n";
        message += "- 이름 : " + who.to.name + "\n";
        message += "- 이메일 : " + who.to.email + "\n";
        message += "\n";
        message += "내용\n";
        for (let item of items) {
          message += "- 날짜 : " + String((new Date()).getFullYear()) + "-" + zeroAddition(item.month) + "-" + zeroAddition(item.date) + "\n";
          message += "- 품목 : " + item.name + "\n";
          message += "- 공급가 : " + autoComma(item.supply) + "원" + "\n";
          message += "- 세액 : " + autoComma(item.vat) + "원" + "\n";
          message += "\n";
        }
        message += "합계\n";
        message += "- 소비자가 : " + autoComma(sum.total) + "원" + "\n";
        message += "- 공급가 : " + autoComma(sum.supply) + "원" + "\n";
        return message;
      }
    }
    return { TaxBill };
  }
}
