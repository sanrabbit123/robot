const NotionAPIs = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/notionAPIs";
  this.token = "secret_nRqIZDBqTijLgE01MdXowOUUpb16Idaqi44tlbJLECd";
  this.url = "https://api.notion.com/v1";
  this.headers = {
    "Authorization": "Bearer " + this.token,
    "Content-Type": "application/json",
    "Notion-Version": "2021-08-16"
  };
}

NotionAPIs.pageDictionay = {
  commandLineInterface: "8a226148-4cec-4260-b880-1fbc65e99976"
}

NotionAPIs.prototype.hexToId = function (hex) {
  if (typeof hex !== "string") {
    throw new Error("invaild input");
  }
  if (/\-/g.test(hex) && hex.split('-').length === 5) {
    return hex;
  } else if (!/\-/g.test(hex)) {
    let f1, f2, f3, f4, f5;
    f1 = hex.slice(0, 8);
    f2 = hex.slice(8, 12);
    f3 = hex.slice(12, 16);
    f4 = hex.slice(16, 20);
    f5 = hex.slice(20);
    return ([ f1, f2, f3, f4, f5 ]).join('-');
  } else {
    throw new Error("invaild input");
  }
}

NotionAPIs.prototype.readPageByName = async function (page) {
  if (typeof page !== "string") {
    throw new Error("invaild input");
  }
  if (NotionAPIs.pageDictionay[page] === undefined) {
    throw new Error("invaild page name");
  }
  const instance = this;
  try {
    return await this.readPageById(NotionAPIs.pageDictionay[page]);
  } catch (error) {
    console.log(error)
  }
}

NotionAPIs.prototype.readPageById = async function (id) {
  if (typeof id !== "string") {
    throw new Error("invaild input");
  }
  id = this.hexToId(id);
  const instance = this;
  const { headers } = this;
  const { requestSystem } = this.mother;
  try {
    let url, res, result;

    result = {};

    url = this.url + "/blocks/" + id;
    res = await requestSystem(url, {}, { headers });

    result.id = res.data.id;
    result.created = new Date(res.data.created_time);
    result.lastEdited = new Date(res.data.last_edited_time);
    result.title = res.data.child_page.title;

    url = this.url + "/blocks/" + id + "/children?page_size=100";
    res = await requestSystem(url, {}, { headers });
    result.contents = res.data.results;

    return result;
  } catch (error) {
    console.log(error)
  }
}

module.exports = NotionAPIs;
