const SnsParsing = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  const BackMaker = require(`${process.cwd()}/apps/backMaker/backMaker.js`);
  const GoogleSheet = require(`${process.cwd()}/apps/googleAPIs/googleSheet.js`);
  this.mother = new Mother();
  this.back = new BackMaker();
  this.dir = process.cwd() + "/apps/snsParsing";
  this.sheets = new GoogleSheet();
}

SnsParsing.prototype.viewBasicModel = function () {
  return {
    conid: "",
    form: {
      long: {
        make: true,
        date: new Date(),
        link: "",
        targets: [
          {
            name: "naverBlog",
            method: "portfolio",
            title: "",
            description: "",
            date: "",
            href: "",
          },
          {
            name: "naverBlog",
            method: "review",
            title: "",
            description: "",
            date: "",
            href: "",
          },
        ],
      },
      short: {
        make: false,
        date: new Date(1800, 0, 1),
        link: "",
        targets: [
          {
            name: "instagram",
            method: "portfolio",
            title: "",
            description: "",
            date: "",
            href: "",
          },
        ],
      },
      movie: {
        make: false,
        date: new Date(1800, 0, 1),
        link: "",
        targets: [
          {
            name: "youtube",
            method: "review",
            title: "",
            description: "",
            date: "",
            href: "",
          },
        ],
      },
    }
  };
}

SnsParsing.prototype.makeDummy = function (contents) {
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  return {
    conid: contents.conid,
    form: {
      long: {
        make: true,
        date: contents.contents.portfolio.date,
        link: "https://" + address.backinfo.host + "/contents?conid=" + contents.conid,
        targets: [],
      },
      short: {
        make: false,
        date: new Date(1800, 0, 1),
        link: "",
        targets: [],
      },
      movie: {
        make: false,
        date: new Date(1800, 0, 1),
        link: "",
        targets: [],
      },
    }
  };
}

SnsParsing.prototype.makeFactor = function (type, method, title, description, date, href) {
  if (type === undefined || method === undefined || title === undefined || description === undefined || date === undefined || href === undefined) {
    throw new Error("invaild input : must be { type, method, title, description, date, href }");
  }
  const instance = this;
  let finalType;

  finalType = '';
  if (/blog/gi.test(type)) {
    finalType = "naverBlog";
  } else if (/insta/gi.test(type)) {
    finalType = "instagram";
  } else if (/you/gi.test(type)) {
    finalType = "youtube";
  } else if (/fac/gi.test(type)) {
    finalType = "facebook";
  } else {
    throw new Error("invaild type");
  }

  return { name: finalType, method, title, description, date, href };
}

SnsParsing.prototype.refreshDummies = async function (force = false) {
  const instance = this;
  const back = this.back;
  try {
    const contentsArr = await back.getContentsArrAll();
    let temp, tempArr;
    let whereQuery, updateQuery;

    for (let contents of contentsArr) {
      tempArr = await back.mongoRead("contentsSns", { conid: contents.conid }, { home: true });
      if (tempArr.length === 0) {
        await back.mongoCreate("contentsSns", this.makeDummy(contents), { home: true });
      } else if (force) {
        temp = this.makeDummy(contents);
        whereQuery = { conid: contents.conid };
        updateQuery = { form: temp.form };
        await back.mongoUpdate("contentsSns", [ whereQuery, updateQuery ], { home: true });
      }
    }

  } catch (e) {
    console.log(e);
  }
}

SnsParsing.prototype.updateNaverBlogFactors = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const back = this.back;
  try {
    const target = process.cwd() + "/apps/naverAPIs/blog/result/finalParsing.json";
    const blogJson = JSON.parse(await fileSystem(`readString`, [ target ]));
    const { portfolio, review } = blogJson;
    let tempJson;
    let thisSns;
    let whereQuery, updateQuery;

    //portfolio
    for (let { href, title, date, conid } of portfolio.data) {
      if (conid !== null) {
        thisSns = await back.mongoRead("contentsSns", { conid }, { home: true });
        thisSns = thisSns[0];
        tempJson = this.makeFactor("blog", "portfolio", title, "", (new Date(date)), href);
        thisSns.form.long.targets.push(tempJson);

        whereQuery = { conid };
        updateQuery = { "form.long.targets": thisSns.form.long.targets };

        await back.mongoUpdate("contentsSns", [ whereQuery, updateQuery ], { home: true });
      }
    }

    //review
    for (let { href, title, date, conid } of review.data) {
      if (conid !== null) {
        thisSns = await back.mongoRead("contentsSns", { conid }, { home: true });
        thisSns = thisSns[0];
        tempJson = this.makeFactor("blog", "review", title, "", (new Date(date)), href);
        thisSns.form.long.targets.push(tempJson);

        whereQuery = { conid };
        updateQuery = { "form.long.targets": thisSns.form.long.targets };

        await back.mongoUpdate("contentsSns", [ whereQuery, updateQuery ], { home: true });
      }
    }

  } catch (e) {
    console.log(e);
  }
}

SnsParsing.prototype.contentsSheets = async function () {
  const instance = this;
  const back = this.back;
  const sheets = this.sheets;
  const dateToString = function (dateObject) {
    const zeroAddition = function (num) {
      if (num < 10) {
        return `0${String(num)}`;
      } else {
        return String(num);
      }
    }
    return `${String(dateObject.getFullYear())}-${zeroAddition(dateObject.getMonth() + 1)}-${zeroAddition(dateObject.getDate())}`;
  }
  const address = require(`${process.cwd()}/apps/infoObj.js`);
  try {
    const allContents = await back.getContentsArrAll();
    const web = `https://home-liaison.com`;
    let sheetsId;
    let matrix;
    let titles, tempArr;
    let targets;
    let snsObject;
    let portfolioDate, portfolioTitle, portfolioLink;
    let reviewDate, reviewTitle, reviewLink;

    matrix = [];
    sheetsId = "1tL3KeWYzY3SmJXkzuxReXxod1CrDrNCK_gLJ9IrCl08";
    titles = [
      "아이디",
      "별칭",
      "제목",
      "DB 링크",
      "웹 발행일",
      "웹 포트폴리오 링크",
      "웹 리뷰 링크",
      "블로그 포트폴리오 발행일",
      "블로그 포트폴리오 제목",
      "블로그 포트폴리오 링크",
      "블로그 리뷰 발행일",
      "블로그 리뷰 제목",
      "블로그 리뷰 링크",
    ];

    for (let contents of allContents) {
      tempArr = [];

      portfolioDate = '';
      portfolioTitle = '';
      portfolioLink = '';
      reviewDate = '';
      reviewTitle = '';
      reviewLink = '';

      snsObject = await back.mongoRead("contentsSns", { conid: contents.conid }, { home: true });
      snsObject = snsObject[0];
      targets = snsObject.form.long.targets;

      tempArr.push(contents.conid);
      tempArr.push(contents.contents.portfolio.pid);
      tempArr.push(contents.contents.portfolio.title.main);
      tempArr.push("https://" + address.backinfo.host + "/contents?conid=" + contents.conid);

      tempArr.push(dateToString(contents.contents.portfolio.date));
      tempArr.push(web + "/portdetail.php?qqq=" + contents.contents.portfolio.pid);
      if (contents.contents.review.rid !== "re999") {
        tempArr.push(web + "/revdetail.php?qqq=" + contents.contents.review.rid);
      } else {
        tempArr.push("");
      }

      for (let obj of targets) {
        if (obj.method === "portfolio") {
          portfolioDate = dateToString(new Date(obj.date));
          portfolioTitle = obj.title;
          portfolioLink = obj.href;
        } else if (obj.method === "review") {
          reviewDate = dateToString(new Date(obj.date));
          reviewTitle = obj.title;
          reviewLink = obj.href;
        }
      }

      tempArr.push(portfolioDate);
      tempArr.push(portfolioTitle);
      tempArr.push(portfolioLink);
      tempArr.push(reviewDate);
      tempArr.push(reviewTitle);
      tempArr.push(reviewLink);

      matrix.push(tempArr);
    }

    matrix.sort((a, b) => {
      return Number(b[0].replace(/[^0-9]/g, '')) - Number(a[0].replace(/[^0-9]/g, ''));
    });
    matrix.unshift(titles);

    await sheets.update_value_inPython(sheetsId, '', matrix, [ 0, 0 ]);
    await sheets.setting_cleanView_inPython(sheetsId);

  } catch (e) {
    console.log(e);
  }
}

SnsParsing.prototype.fromToFix = async function (from, to, method) {
  const instance = this;
  const back = this.back;
  try {
    let contents;
    let snsObj;
    let toContents;
    let toSnsObj;
    let taget;
    let targetIndex, index;
    let migration, migrationArr;
    let whereQuery, updateQuery;

    contents = await back.getContentsByPid(from);
    snsObj = await back.mongoRead("contentsSns", { conid: contents.conid }, { home: true });
    snsObj = snsObj[0];

    toContents = await back.getContentsByPid(to);
    toSnsObj = await back.mongoRead("contentsSns", { conid: toContents.conid }, { home: true });
    toSnsObj = toSnsObj[0];

    targetIndex = 0;
    index = 0;
    for (let obj of snsObj.form.long.targets) {
      if (method === obj.method) {
        targetIndex = index;
      }
      index++;
    }

    migrationArr = snsObj.form.long.targets.splice(targetIndex, 1);
    migration = migrationArr[0];
    toSnsObj.form.long.targets.push(migration);

    whereQuery = {};
    updateQuery = {};
    whereQuery["conid"] = contents.conid;
    updateQuery["form.long.targets"] = snsObj.form.long.targets;
    await back.mongoUpdate("contentsSns", [ whereQuery, updateQuery ], { home: true });

    whereQuery = {};
    updateQuery = {};
    whereQuery["conid"] = toContents.conid;
    updateQuery["form.long.targets"] = toSnsObj.form.long.targets;
    await back.mongoUpdate("contentsSns", [ whereQuery, updateQuery ], { home: true });

  } catch (e) {
    console.log(e);
  }
}


module.exports = SnsParsing;
