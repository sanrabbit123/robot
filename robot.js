const Robot = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
}

Robot.prototype.consoleQ = function (question) {
  const readline = require(`readline`);
  const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
  return new Promise(function(resolve, reject) {
    rL.question(question, function (input) {
      resolve(input);
      rL.close();
    });
  });
}

Robot.prototype.dataConsole = function () {
  const DataConsole = require(process.cwd() + "/apps/dataConsole/dataConsole.js");
  let app = new DataConsole();
  app.connect();
}

Robot.prototype.contentsMaker = function (button, arg) {
  const ContentMaker = require(process.cwd() + "/apps/contentsMaker/contentsMaker.js");
  const ResourceMaker = require(process.cwd() + "/apps/resourceMaker/resourceMaker.js");
  let app;
  if (button === "make" || button === "1") {
    app = new ContentMaker(arg);
    app.total_make();
  } else if (button === "mysql" || button === "2") {
    app = new ContentMaker();
    app.to_mysql(arg);
  } else if (button === "poo" || button === "3") {
    app = new ContentMaker();
    app.to_poo();
  } else if (button === "resource" || button === "4") {
    app = new ResourceMaker(arg);
    app.launching();
  } else if (button === "front" || button === "5") {
    app = new ContentMaker();
    app.front_maker(arg);
  }
}

Robot.prototype.proposalMaker = function (button, arg) {
  const ContentMaker = require(process.cwd() + "/apps/contentsMaker/contentsMaker.js");
  let app;
  if (button === "make" || button === "1") {
    app = new ContentMaker(arg);
    app.proposal_launching();
  }
}

Robot.prototype.porfolioFilter = function (boo, clientName, apartName, exceptionId = 0) {
  const PorfolioFilter = require(process.cwd() + "/apps/porfolioFilter/porfolioFilter.js");
  let app = new PorfolioFilter(clientName, apartName);
  if (boo === "portfolio") {
    app.total_make();
  } else if (boo === "ghost") {
    app.ghost_make(exceptionId);
  }
}

Robot.prototype.googleAPIs = function (button) {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");
  let app;
  if (button === "token" || button === "1") {
    app = new GoogleAPIs();
    app.generate_tokens();
  } else if (button === "analytics" || button === "2") {
    app = new GoogleAnalytics();
    app.getClients();
  }
}

Robot.prototype.frontMaker = function (webpack) {
  const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
  let fobot = new FrontMaker();
  fobot.totalLaunching(webpack);
}

Robot.prototype.frontUpdate = function () {
  const FrontMaker = require(process.cwd() + "/apps/frontMaker/frontMaker.js");
  let fobot = new FrontMaker();
  fobot.totalUpdate();
}

Robot.prototype.getConsulting = async function (sw = "1") {
  try {
    const NotionAPIs = require(`${process.cwd()}/apps/notionAPIs/notionAPIs.js`);
    const GetConsulting = require(`${process.cwd()}/apps/getConsulting/getConsulting.js`);

    let app;

    if (sw === "notion" || sw === "1") {
      app = new NotionAPIs();
      await app.launching();
    } else {
      app = new GetConsulting();
      await app.launching(false);
    }

  } catch (e) {
    console.log(e);
  }
}

Robot.prototype.launching = async function () {
  try {
    let re, re2, re3, re4;
    if (process.argv[2] === "proposal" && process.argv[3] !== undefined) {
      this.proposalMaker("make", process.argv[3]);

    } else if (process.argv[2] === "back") {
      this.dataConsole();

    } else if (process.argv[2] === "front" && process.argv[3] !== "--webpack") {
      this.frontMaker(false);

    } else if (process.argv[2] === "front" && process.argv[3] === "--webpack") {
      this.frontMaker(true);

    } else if (process.argv[2] === "frontsource") {

      if (process.argv[3] !== undefined) {
        this.contentsMaker("front", process.argv[3].replace(/-/g, ''));
      } else {
        this.contentsMaker("front", "general");
      }

    } else if (process.argv[2] === "frontupdate") {
      this.frontUpdate();

    } else if (process.argv[2] === "consulting") {
      if (process.argv[3] !== "pack" && process.argv[3] !== "webpack") {
        await this.getConsulting(false);
      } else {
        await this.getConsulting(true);
      }

    } else {
      re = await this.consoleQ(`Choose commands : 1.back 2.contents 3.portfolio 4.proposal 5.google 6.front 7.consulting 8.exit\n`);

      //console server
      if (re === "back" || re === "1") {
        this.dataConsole();

      //contents maker
      } else if (re === "contents" || re === "2") {
        re2 = await this.consoleQ(`Choose commands : 1.make 2.mysql 3.poo 4.resource 5.front\n`);
        if (re2 === "make" || re2 === "1") {
          re3 = await this.consoleQ(`Porfolio number?\n`);
        } else if (re2 === "mysql" || re2 === "2") {
          re3 = await this.consoleQ(`Custom exist? (no : "none")\n`);
        } else if (re2 === "poo" || re2 === "3") {
          re3 = ``;
        } else if (re2 === "resource" || re2 === "4") {
          re3 = await this.consoleQ(`Porfolio number?\n`);
        } else if (re2 === "front" || re2 === "5") {
          re3 = ``;
        }
        this.contentsMaker(re2, re3);

      //portfolio filter
      } else if (re === "portfolio" || re === "3") {
        re2 = await this.consoleQ(`Choose commands : 1.portfolio 2.ghost\n`);
        if (re2 === "portfolio" || re2 === "1") {
          re3 = await this.consoleQ(`Client name what?\n`);
          re4 = await this.consoleQ(`Apart name what? (ex : "강서 크라운 팰리스")\n`);
          this.porfolioFilter("portfolio", re3, re4, 0);
        } else if (re2 === "ghost" || re2 === "2") {
          re3 = await this.consoleQ(`Designer name what?\n`);
          re4 = await this.consoleQ(`Exception id what? (must be Number, ex : 1, default: 0)\n`);
          this.porfolioFilter("ghost", re3, "", Number(re4));
        }

      //proposal
      } else if (re === "proposal" || re === "4") {
        re3 = await this.consoleQ(`Project number? (default: latest, if you want press 'none')\n`);
        this.proposalMaker("1", re3);

      //google
      } else if (re === "google" || re === "5") {
        re2 = await this.consoleQ(`Choose commands : 1.token 2.analytics\n`);
        this.googleAPIs(re2);

      //front
      } else if (re === "front" || re === "6") {
        this.frontMaker(false);

      //consulting
      } else if (re === "consulting" || re === "7") {
        re2 = await this.consoleQ(`Choose commands : 1.notion 2.junk\n`);
        await this.getConsulting(re2);

      //exit
      } else if (re === "exit" || re === "8") {
        process.exit();
      }
    }
  } catch (e) {
    console.log(e);
  }
}

// const app = new Robot();
// app.launching();

//development

async function main3() {
  const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
  let back = new BackMaker();
  await back.launching("client");
}

// main3();

async function main4() {
  // const Mother = require(process.cwd() + "/apps/mother.js");
  // const mother = new Mother();
  // const { fileSystem } = mother;
  //
  // const tempDir = process.cwd() + "/temp";
  //
  // let json = await fileSystem(`readString`, [ tempDir + "/analytics.json" ]);
  // let js = JSON.parse(json);
  //
  // console.log(js.length);
  // let ad = [];
  // for (let obj of js) {
  //   if (obj.info.campaign !== null) { ad.push(obj); }
  // }
  // console.log(ad.length);
  //
  // let real = [];
  // let tempBoo = false;
  // for (let obj of ad) {
  //   tempBoo = false;
  //   for (let page of obj.info.pageHistory) {
  //     if (/consulting/gi.test(page.page)) { tempBoo = true; }
  //   }
  //   if (tempBoo) {
  //     real.push(obj);
  //   }
  //   console.log(obj.info.pageHistory);
  // }
  //
  // console.log(real.length);
  const GoogleAnalytics = require(process.cwd() + "/apps/googleAPIs/googleAnalytics.js");

  app = new GoogleAnalytics();
  app.getClients();

}

main4();
