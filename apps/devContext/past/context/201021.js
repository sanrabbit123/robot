const ROBOT_PATH = process.cwd();
const APP_PATH = ROBOT_PATH + "/apps";
const Mother = require(APP_PATH + "/mother.js");
const BackMaker = require(APP_PATH + "/backMaker/backMaker.js");
const GoogleAnalytics = require(APP_PATH + "/googleAPIs/googleAnalytics.js");
const GoogleSheet = require(APP_PATH + "/googleAPIs/googleSheet.js");
const AiGraph = require(APP_PATH + "/contentsMaker/aiGraph.js");
const AppleAPIs = require(APP_PATH + "/appleAPIs/appleAPIs.js");
const ContentsMaker = require(APP_PATH + "/contentsMaker/contentsMaker.js");

class Dev201021 extends Array {

  constructor() {
    super();
    this.mother = new Mother();
    const { mongo, mongoinfo } = this.mother;
    this.MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });
  }

  async reviveText(porlid) {
    const dir = `${process.cwd()}/apps/contentsMaker/resource`;
    const target = dir + "/" + porlid + ".js";
    const targetJson = require(target);
    let newArr = [];
    let note, noteArr;
    let photoKeyNum;
    let photoString;

    note = new AppleAPIs({ folder: "portfolio", subject: porlid });
    noteArr = await note.readNote();

    const { contents } = targetJson;

    newArr.push(porlid);
    newArr.push(noteArr[1]);
    newArr.push(targetJson.title);

    photoKeyNum = 1;
    for (let { photo_key, title, main_contents, smalltalk_yn, smalltalk_contents } of contents) {
      if (title === "init") {
        newArr.push(main_contents.replace(/\n/g, "<br>"));
        if (smalltalk_yn !== "") {
          newArr.push(smalltalk_yn);
          newArr.push(smalltalk_contents.replace(/\n/g, "<br>"));
        }
      } else {
        newArr.push(String(photoKeyNum) + " - " + String(photo_key));
        photoKeyNum = photo_key + 1;

        newArr.push(title);
        newArr.push(main_contents.replace(/\n/g, "<br>"));
        if (smalltalk_yn !== "") {
          newArr.push(smalltalk_yn);
          newArr.push(smalltalk_contents.replace(/\n/g, "<br>"));
        }

      }
    }

    const { sub_titles: { rev_main_title }, r_id, reviews } = targetJson;
    if (r_id !== "re999") {

      newArr.push(r_id);
      newArr.push(rev_main_title.replace(/\n/g, ", "));

      for (let { type, photos, contents } of reviews) {
        if (type === "init") {
          for (let { quest, answer } of contents) {
            newArr.push(answer.replace(/\n/g, "<br>"))
          }
        } else {
          photoString = '';
          for (let i of photos) {
            photoString += String(i) + ' ';
          }
          photoString = photoString.slice(0, -1);

          newArr.push(photoString);
          for (let { quest, answer } of contents) {
            newArr.push("Q. " + quest.replace(/\n/g, "<br>"))
            newArr.push(answer.replace(/\n/g, "<br>"))
          }
        }
      }

    }

    const { sub_titles: { portivec: { sub, region, method } }, designer, p_info: { photodae, slide, tag, service, key8, key9 } } = targetJson;

    newArr.push("_info");
    newArr.push(designer);
    newArr.push("_portfolio");
    newArr.push("_1");
    newArr.push(sub);
    newArr.push(region);
    newArr.push(method);
    newArr.push("_2");
    newArr.push("세로 / 가로");
    newArr.push(String(photodae[0]) + " " + String(photodae[1]));
    newArr.push("슬라이드");
    newArr.push(slide);
    newArr.push("태그");
    newArr.push(tag);
    newArr.push("서비스");
    newArr.push(service);
    newArr.push("Key8");
    newArr.push(key8);
    newArr.push("Key9");
    newArr.push(key9);

    if (r_id !== "re999") {

      const { sub_titles: { rev_name_card: { main: reviewSubTitle } }, r_info: { photodae: reviewPhotodae, order } } = targetJson;
      newArr.push("_review");
      newArr.push("_1");
      newArr.push(reviewSubTitle.replace(/\n/g, ", "));
      newArr.push("_2");
      newArr.push("세로 / 가로");
      newArr.push(String(reviewPhotodae[0]) + " " + String(reviewPhotodae[1]));
      newArr.push("순서");
      newArr.push(String(order));

    }

    console.log(newArr);
    newArr.shift();
    await note.updateNote(newArr.join('<br><br><br>'));

  }

  async getFromAiReview(subject) {
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

      targetLink = `${newWebLink}/_Review/${subject}code/${subject}`;

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

      for (let i = 0; i < targetAis.length; i++) {
        responseArr = await app.getTextFromAi(targetLink + "/" + targetAis[i]);
        finalTong.push(responseArr);
      }

      finalTong.shift();

      return finalTong;
    } catch (e) {
      console.log(e);
    }
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

  async getFromAiTitle(subject) {
    const app = new ContentsMaker();
    const { fileSystem, appleScript } = this.mother;
    try {
      let tempArr;
      let newWebLink, targetLink;
      let target;
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
        target = `${newWebLink}/_PortfolioDetail/${subject}code/portivec${subject}.ai`;
      } else {
        target = `${newWebLink}/_Review/${subject}code/${subject}/name2${subject}.ai`;
      }

      console.log(target)

      responseArr = await app.getTextFromAi(target);

      return responseArr;
    } catch (e) {
      console.log(e);
    }
  }

  async appendOptions(target) {
    const MONGOC = this.MONGOC;
    const collections = [
      "FP1_porlist",
      "FP2_pordeta",
      "FR1_revlist",
      "FR2_revdeta",
    ];

    let row, targetRow;
    let model;
    let portfolioModel, reviewModel;
    let note, noteArr;
    let ifReview = false, reviewIndex = 0, reviewTitle = '';
    let apartMethod = "아파트 홈스타일링";
    let title;
    let apartArr, apartText, pyIndex;
    let updateArr, finalArr;
    let regionString, regionArr;


    row = await MONGOC.db("miro81").collection(collections[0]).find({ porlid: target }).toArray();
    targetRow = row[0];

    const { photodae_s, photodae_d, desid, region, method, key8, key9, tag } = targetRow;


    if (!/[시구]$/.test(region)) {
      regionArr = region.split(' ');
      if (/서울/.test(regionArr[0]) || /인천/.test(regionArr[0]) || /대전/.test(regionArr[0]) || /부산/.test(regionArr[0]) || /광주/.test(regionArr[0]) || /대구/.test(regionArr[0]) || /울산/.test(regionArr[0])) {
        regionString = region + "구";
      } else {
        regionString = region + "시";
      }
    } else {
      regionString = region;
    }

    row = await MONGOC.db("miro81").collection(collections[1]).find({ porlid: target }).toArray();
    targetRow = row[0];

    const { slide } = targetRow;

    note = new AppleAPIs({ folder: "portfolio", subject: target });
    noteArr = await note.readNote();
    title = noteArr[2];

    let [ subject, apart ] = title.split(", ");

    apartArr = apart.split(' ');
    for (let i = 0; i < apartArr.length; i++) {
      if (/py/gi.test(apartArr[i])) {
        pyIndex = i;
      }
    }

    apartText = '';
    for (let i = 0; i < pyIndex; i++) {
      apartText += apartArr[i] + ' ';
    }
    apartText = apartText.slice(0, -1);

    if (/빌라/g.test(apartText)) {
       apartMethod = "빌라 홈스타일링";
    } else if (/타운하우스/g.test(apartText)) {
      apartMethod = "타운하우스 홈스타일링";
    } else if (/오피스텔/g.test(apartText)) {
      apartMethod = "오피스텔 홈스타일링";
    } else if (/주택/g.test(apartText)) {
      apartMethod = "주택 홈스타일링";
    }

    portfolioModel = [
      "_info",
      desid,
      "_portfolio",
      "_1",
      (subject + ", " + apartText + " " + "홈스타일링"),
      regionString,
      apartMethod,
      "_2",
      "세로 / 가로",
      (photodae_s + " " + photodae_d),
      "슬라이드",
      slide,
      "태그",
      tag,
      "서비스",
      method,
      "Key8",
      key8,
      "Key9",
      key9,
    ];

    for (let i = 0; i < noteArr.length; i++) {
      if (/^re[0-9]/.test(noteArr[i])) {
        ifReview = true;
        reviewIndex = i;
      }
    }

    if (ifReview) {

      reviewTitle = noteArr[reviewIndex + 1];

      row = await MONGOC.db("miro81").collection(collections[2]).find({ porlid: target }).toArray();
      targetRow = row[0];

      const { order_function } = targetRow;

      row = await MONGOC.db("miro81").collection(collections[3]).find({ porlid: target }).toArray();
      targetRow = row[0];

      const { photodae } = targetRow;

      reviewModel = [
        "_review",
        "_1",
        reviewTitle.split(', ')[1],
        "_2",
        "세로 / 가로",
        photodae,
        "순서",
        order_function,
      ];
      model = portfolioModel.concat(reviewModel);
    } else {
      model = portfolioModel;
    }

    updateArr = noteArr.concat(model);

    finalArr = [];

    for (let i of updateArr) {
      finalArr.push(i.replace(/\}$/g, ''));
    }

    console.log(finalArr);
    finalArr.shift();
    await note.updateNote(finalArr.join('<br><br><br>'));
  }

  async injectPhotos(target) {
    const MONGOC = this.MONGOC;
    const collections = [
      "FP2_pordeta",
      "FR2_revdeta",
    ];

    let row, targetRow;
    let titles, keys;
    let keyStrings;
    let note, noteArr, updateArr;
    let number;
    let ifReview = false;
    let reviewMatrix;
    let qArr, aArr, qNumber, aNumber;
    let phototnumArr, reviewWordingkeyArr, reviewKeyStrings, reviewFinal;
    let reviewStartPoint, integration;

    row = await MONGOC.db("miro81").collection(collections[0]).find({ porlid: target }).toArray();
    targetRow = row[0];

    const { wordingtitle, wordingkey } = targetRow;

    titles = wordingtitle.split(' ');
    keys = wordingkey.split(' ');

    keyStrings = [ "1 - " + keys[0] ];
    for (let i = 1; i < keys.length; i++) {
      keyStrings.push(String(Number(keys[i - 1]) + 1) + " - " + keys[i]);
    }

    note = new AppleAPIs({ folder: "portfolio", subject: target });
    noteArr = await note.readNote();

    updateArr = [];
    number = 0;

    for (let i = 0; i < noteArr.length; i++) {

      if (noteArr[i] === "{photo}") {
        updateArr.push(keyStrings[number]);
        updateArr.push(titles[number]);
        number++;
      } else {
        updateArr.push(noteArr[i]);
      }

      if (/^re/.test(noteArr[i])) {
        ifReview = true;
      }

    }

    /* if review  */
    if (ifReview) {

      row = await MONGOC.db("miro81").collection(collections[1]).find({ porlid: target }).toArray();
      targetRow = row[0];

      const { revid, phototnum, wordingkey: reviewWordingkey } = targetRow;

      reviewMatrix = await this.getFromAiReview(revid);

      qArr = [];
      aArr = [];
      for (let i of reviewMatrix) {
        qNumber = 0;
        aNumber = 0;
        for (let j of i) {
          if (/^Q\./i.test(j)) {
            qNumber++;
          } else if (/\n\n/g.test(j)) {
            aNumber = ([ ...j.matchAll(/\n/g) ]).length / 2;
          }
        }
        qArr.push(qNumber);
        aArr.push(qNumber + Math.floor(aNumber));
      }

      phototnumArr = phototnum.split(' ');
      reviewWordingkeyArr = reviewWordingkey.split(' ');
      reviewKeyStrings = new Array(reviewWordingkeyArr.length);

      reviewFinal = [];

      for (let i = 0; i < reviewWordingkeyArr.length; i++) {
        reviewKeyStrings[i] = '';
        if (i === 0) {
          for (let j = 0; j < Number(reviewWordingkeyArr[i]); j++) {
            reviewKeyStrings[i] += phototnumArr[j] + ' ';
          }
        } else {
          for (let j = Number(reviewWordingkeyArr[i - 1]); j < Number(reviewWordingkeyArr[i]); j++) {
            reviewKeyStrings[i] += phototnumArr[j] + ' ';
          }
        }
        reviewKeyStrings[i] = reviewKeyStrings[i].slice(0, -1);
        reviewFinal.push(reviewKeyStrings[i]);
      }

      for (let i = 0; i < updateArr.length; i++) {
        if (/^re[0-9]/.test(updateArr[i])) {
          reviewStartPoint = i;
        }
      }

      integration = reviewStartPoint + 3;

      for (let i = 0; i < reviewFinal.length; i++) {
        updateArr.splice(integration, 0, reviewFinal[i]);
        integration = integration + (qArr[i] + aArr[i]) + 1;
      }

    }

    console.log(updateArr);
    updateArr.shift();
    await note.updateNote(updateArr.join('<br><br><br>'));

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

module.exports = Dev201021;
