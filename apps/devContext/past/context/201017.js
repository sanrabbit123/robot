const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AppleAPIs = require(APP_PATH + "/appleAPIs/appleAPIs.js");
const ContentsMaker = require(APP_PATH + "/contentsMaker/contentsMaker.js");

class Dev201017 extends Array {

  constructor() {
    super();
    this.mother = new Mother();
    const { mongo, mongoinfo } = this.mother;
    this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }

  async reviewUpdate(subject) {
    const MONGOC = this.MONGOC;
    const queryObj = { porlid: subject };
    const collections = [
      "FP1_porlist",
      "FP2_pordeta",
      "FR1_revlist",
      "FR2_revdeta",
    ];
    let rows, note, note2, arr;
    let portfolioArr, reviewArr;
    let updateArr;
    let output;
    let revid;
    let tempArr;

    rows = [];
    for (let i of collections) {
      rows.push(await MONGOC.db("miro81").collection(i).find(queryObj).toArray());
    }
    const [ [ porlist ], [ pordeta ], [ revlist ], [ revdeta ] ] = rows;
    note = new AppleAPIs({ folder: "portfolio", subject: subject });
    portfolioArr = await note.readNote();

    if (revlist !== undefined) {
      revid = revlist.revid;
      note2 = new AppleAPIs({ folder: "review", subject: revid });
      reviewArr = await note2.readNote();
    }

    if (Array.isArray(reviewArr) && reviewArr.length > 0) {
      updateArr = portfolioArr.concat(reviewArr);
      updateArr.shift();
      await note.updateNote(updateArr.join('<br><br><br>'));
      console.log(`porfolio ${subject} success`);
    } else {
      if (revlist !== undefined) {
        console.log(`porfolio ${subject} needs ${revid}`);
        tempArr = this.getFromReviewJson(subject);
        updateArr = portfolioArr.concat(tempArr);
        updateArr.shift();
        await note.updateNote(updateArr.join('<br><br><br>'));
      } else {
        console.log(`porfolio ${subject} no review`);
        console.log(porlist)
      }
    }
  }

  getFromReviewJson (subject) {
    const resourceLink = `${process.cwd()}/apps/contentsMaker/resource`;
    const { sub_titles: { rev_main_title }, r_id, reviews } = require(resourceLink + "/" + subject + ".js");
    let finalArr = [];

    for (let { photos, contents } of reviews) {
      finalArr.push(String(photos.join(" ")));
      for (let { quest, answer } of contents) {
        if (!/^Q\. /.test(quest)) {
          finalArr.push("Q. " + quest);
        } else {
          finalArr.push(quest);
        }
        finalArr.push(answer);
      }
    }

    finalArr.shift();
    finalArr.shift();
    finalArr.unshift(rev_main_title.replace(/\n/, ", "));
    finalArr.unshift(r_id);

    return finalArr;
  }

  async getFromAi(subject) {
    const app = new ContentsMaker();
    const { fileSystem, appleScript } = this.mother;
    try {
      let tempArr;
      let newWebLink, targetLink;
      let targetDetail, targetAis;
      let getTextScript;
      let response, responseArr;
      let finalTong = [];
      let titleName = "";

      tempArr = process.cwd().split("/");
      tempArr.pop();
      tempArr.pop();
      newWebLink = tempArr.join("/") + "/_NewWeb";

      if (/^[ap]/i.test(subject)) {
        targetLink = `${newWebLink}/_PortfolioDetail/${subject}code/portp${subject}/svg`;
      } else {
        targetLink = `${newWebLink}/_Review/${subject}code/${subject}`;
      }

      targetDetail = await fileSystem(`readDir`, [ targetLink ]);

      targetAis = [];
      for (let i of targetDetail) {
        if (/\.ai$/.test(i)) {
          if (!/^mo/.test(i)) {
            if (!/00\.ai$/.test(i)) {
              if (!/^title/.test(i)) {
                if (/word/.test(i)) {
                  targetAis.push(i);
                }
              }
            }
          }
        }
      }

      targetAis.sort((a, b) => { return Number(a.split('_')[1].replace(/\.ai$/, '')) - Number(b.split('_')[1].replace(/\.ai$/, '')) });

      if (/^[ap]/i.test(subject)) {
        titleName = "title" + subject + ".ai";
      } else {
        titleName = "retitle" + subject + ".ai";
      }

      targetAis.unshift(titleName);
      console.log(targetAis);

      for (let i = 0; i < targetAis.length; i++) {
        responseArr = await app.getTextFromAi(targetLink + "/" + targetAis[i]);
        for (let j of responseArr) {
          finalTong.push(j.replace(/\n/g, '<br>'));
        }
      }

      finalTong.unshift(subject);

      return finalTong;
    } catch (e) {
      console.log(e);
    }
  }

  async reviewSync() {
    const { fileSystem } = this.mother;
    try {
      let tempArr, tempArr2, newWebLink, targetLink;
      let dirArr;
      let reviewList = [];
      let rows, targetPortfolio;
      let note, noteArr, note2, noteArr2;
      let appendList, appendList0, appendList1;
      let portfolioArr, reviewArr;
      let updateArr;

      tempArr = process.cwd().split("/");
      tempArr.pop();
      tempArr.pop();
      newWebLink = tempArr.join("/") + "/_NewWeb";
      targetLink = `${newWebLink}/_Review`;
      dirArr = await fileSystem(`readDir`, [ targetLink ]);
      for (let i of dirArr) {
        if (/^re0/.test(i)) {
          reviewList.push(i.replace(/code$/, ''));
        }
      }

      rows = [], targetPortfolio = [];
      for (let i of reviewList) {
        rows.push(await this.MONGOC.db("miro81").collection("FR2_revdeta").find({ revid: i }).project({ porlid: 1, revid: 1 }).toArray());
      }
      for (let i of rows) {
        if (i.length > 0) {
          for (let { porlid, revid } of i) {
            if (!/^r/.test(porlid)) {
              targetPortfolio.push({ porlid, revid });
            }
          }
        }
      }

      appendList = {};
      appendList0 = [];
      appendList1 = [];

      for (let i of targetPortfolio) {
        note = new AppleAPIs({ folder: "portfolio", subject: i.porlid });
        noteArr = await note.readNote();
        if (!noteArr.includes(i.revid)) {
          if (noteArr.length > 1) {
            appendList0.push({ porlid: i.porlid, revid: i.revid });
          } else {
            appendList1.push({ porlid: i.porlid, revid: i.revid });
          }
        }
      }

      appendList = { appendList0, appendList1 };
      console.log(appendList);

      for (let { porlid, revid } of appendList0) {
        note = new AppleAPIs({ folder: "portfolio", subject: porlid });
        portfolioArr = await note.readNote();
        reviewArr = await this.getFromAi(revid);
        updateArr = portfolioArr.concat(reviewArr);
        updateArr.shift();
        await note.updateNote(updateArr.join('<br><br><br>'));
      }

      for (let { porlid, revid } of appendList1) {
        note = new AppleAPIs({ folder: "portfolio", subject: porlid });
        portfolioArr = await this.getFromAi(porlid);
        reviewArr = await this.getFromAi(revid);
        updateArr = portfolioArr.concat(reviewArr);
        updateArr.shift();
        await note.updateNote(updateArr.join('<br><br><br>'));
      }

    } catch (e) {
      console.log(e);
    } finally {
      console.log("done");
    }
  }

  async portfolioSync() {
    const { fileSystem } = this.mother;
    try {
      let tempArr, tempArr2, newWebLink, targetLink;
      let dirArr, targetArr;
      let targetPortfolioList = [];
      let rows, targetPortfolio;
      let note, noteArr, note2, noteArr2;
      let appendList, appendList0, appendList1;
      let portfolioArr, reviewArr;
      let updateArr;

      tempArr = process.cwd().split("/");
      tempArr.pop();
      tempArr.pop();
      newWebLink = tempArr.join("/") + "/_NewWeb";
      targetLink = `${newWebLink}/_PortfolioDetail`;
      dirArr = await fileSystem(`readDir`, [ targetLink ]);
      for (let i of dirArr) {
        if (/^[ap][0-9]/.test(i)) {
          targetPortfolioList.push(i.replace(/code$/, ''));
        }
      }

      targetArr = [];
      for (let i of targetPortfolioList) {
        note = new AppleAPIs({ folder: "portfolio", subject: i });
        noteArr = await note.readNote();
        if (noteArr.length === 1) {
          targetArr.push({ porlid: i, arr: noteArr });
        }
      }

      console.log(targetArr);

      for (let { porlid } of targetArr) {
        note = new AppleAPIs({ folder: "portfolio", subject: porlid });
        portfolioArr = await this.getFromAi(porlid);
        portfolioArr.shift();
        await note.updateNote(portfolioArr.join('<br><br><br>'));
      }

    } catch (e) {
      console.log(e);
    } finally {
      console.log("done");
    }
  }

  async portfolioAppend() {
    const { fileSystem } = this.mother;
    try {
      let tempArr, tempArr2, newWebLink, targetLink;
      let dirArr, targetArr;
      let targetPortfolioList = [];
      let rows, targetPortfolio;
      let note, noteArr, note2, noteArr2;
      let appendList, appendList0, appendList1;
      let portfolioArr, reviewArr;
      let updateArr;

      targetArr = [
        { porlid: "p07" },
        { porlid: "p08" },
        { porlid: "p09" }
      ];

      console.log(targetArr);

      for (let { porlid } of targetArr) {
        note = new AppleAPIs({ folder: "portfolio", subject: porlid });
        portfolioArr = await this.getFromAi(porlid);
        reviewArr = await note.readNote();
        updateArr = portfolioArr.concat(reviewArr);
        updateArr.shift();
        await note.updateNote(updateArr.join('<br><br><br>'));
      }

    } catch (e) {
      console.log(e);
    } finally {
      console.log("done");
    }
  }

  async launching() {
    try {
      await this.MONGOC.connect();

    } catch (e) {
      console.log(e);
    } finally {
      this.MONGOC.close();
    }
  }

}

module.exports = Dev201017;
