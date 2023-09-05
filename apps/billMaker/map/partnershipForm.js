module.exports = {
  collection: "partnershipForm",
  main: function (alive, updateQueryArr, mother) {
    let map, fresh, findQuery, tong, insertEvent;
    map = {
      structure: {
        id: "",
        date: new Date(),
        name: "",
        aspid: "",
      },
      find: (fresh) => { return { aspid: fresh.aspid } }
    };
    const { PartnershipForm } = alive(mother);
    tong = [];
    for (let json of updateQueryArr) {
      fresh = new PartnershipForm(null);
      fresh.make(json);
      findQuery = map.find(fresh);
      insertEvent = async function (fresh) {}
      tong.push({ fresh, findQuery, insertEvent });
    }
    return tong;
  },
  alive: function (mother) {
    class PartnershipForm {
      constructor(json) {
        if (json !== null) {
          if (typeof json === "object") {
            this.id = json.id;
            this.date = json.date;
            this.name = json.name;
            this.aspid = json.aspid;
          }
        }
      }
      make(json) {
        this.id = json.id;
        this.date = new Date();
        this.name = json.name;
        this.aspid = json.aspid;
      }
    }
    return { PartnershipForm };
  },
  wrap: function (alive, jsonArr, mother) {
    const { PartnershipForm } = alive(mother);
    class PartnershipForms extends Array {
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
    arr = new PartnershipForms();
    for (let json of jsonArr) {
      arr.push(new PartnershipForm(json));
    }
    return arr;
  }
}
