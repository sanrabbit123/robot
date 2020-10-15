class QueryString extends Object {}

class ReferrerDetail {

  constructor(detail) {
    if (Boolean(detail.host)) {
      this.host = detail.host;
    } else {
      this.host = null;
    }
    this.queryString = new QueryString();
    for (let i in detail.queryString) {
      this.queryString[i] = detail.queryString[i];
    }
  }

  toNormal() {
    let obj = {};
    obj.host = this.host;
    obj.queryString = {};
    for (let i in this.queryString) {
      obj.queryString[i] = this.queryString[i];
    }
    return obj;
  }

}

class Referrer {

  constructor(referrer) {
    this.name = referrer.name;
    this.detail = new ReferrerDetail(referrer.detail);
  }

  get host() {
    if (this.detail.host === null) {
      return null;
    } else {
      return this.detail.host;
    }
  }

  toNormal() {
    let obj = {};
    obj.name = this.name;
    obj.detail = this.detail.toNormal();
    return obj;
  }

}

module.exports = Referrer;
