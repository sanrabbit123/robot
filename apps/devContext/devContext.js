const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AppleAPIs = require(APP_PATH + "/appleAPIs/appleAPIs.js");

class DevContext extends Array {

  constructor() {
    super();
    this.mother = new Mother();
    const { mongo, mongoinfo } = this.mother;
    this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }


  async main0() {
    let back = new BackMaker();
    // let client = await back.getClientById("c2010_aa35s");
    // console.log(client);
    // console.log(client.google);

    let tong = await back.getLatestClients(5, { withTools: true });
    console.log(tong);
    // console.log(await back.launching("project"));
  }


  async main1() {
    const fobot = new AiGraph();
    fobot.launching();
  }


  async main2() {
    const analytics = new GoogleAnalytics();
    const sheet = new GoogleSheet();
    const sheetTarget = { id: "1ESI1wf8Zj17s6hYHkEJhDOeLutEvC5iDvtSUN3qjpZc", sheet: "분석", xyz: [ 0, 1 ] };

    const clients = await analytics.getClientsInfoByNumber(1);
    console.log(clients);


    const pastData = await sheet.get_value_inPython(sheetTarget.id, sheetTarget.sheet + "!A2:T101");
    const finalArr = clients.toGoogleAnalyticsSheet().concat(pastData);
    console.log(await sheet.update_value_inPython(sheetTarget.id, sheetTarget.sheet, finalArr, sheetTarget.xyz));

    for (let client of clients) {
      await this.mother.fileSystem(`write`, [ `${process.cwd()}/temp/googleAnalytics_${client.name}_${this.mother.todayMaker()}.json`, client.death ]);
    }

    console.log("success");
  }


  async main3(subject) {
    const MONGOC = this.MONGOC;
    const queryObj = { porlid: subject };
    const collections = [
      "FP1_porlist",
      "FP2_pordeta",
      "FR1_revlist",
      "FR2_revdeta",
    ];
    let rows, note, arr;

    rows = [];
    for (let i of collections) {
      rows.push(await MONGOC.db("miro81").collection(i).find(queryObj).toArray());
    }
    const [ porlist, pordeta, revlist, revdeta ] = rows;

    note = new AppleAPIs({ folder: "portfolio", subject });

    arr = await note.readNote();

    console.log(arr);
    console.log(rows);


    // arr.shift();
    // output = await note2.updateNote(temp.join('<br><br><br>'));
  }


  async launching() {
    try {
      await this.MONGOC.connect();

      // await this.main0();
      // await this.main1();
      // await this.main2();
      await this.main3("p42");
    } catch (e) {
      console.log(e);
    } finally {
      this.MONGOC.close();
    }
  }

}

module.exports = DevContext;
