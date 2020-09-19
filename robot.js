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
	let app;
	if (button === "token" || button === "1") {
		app = new GoogleAPIs();
		app.generate_tokens();
	} else if (button === "sheets" || button === "2") {
		app = this.mother.googleSystem("sheets");
		app.total_make();
	} else if (button === "docs" || button === "3") {
		app = this.mother.googleSystem("docs");
		app.total_make();
	} else if (button === "drive" || button === "4") {
		app = this.mother.googleSystem("analytics");
		app.total_make();
	} else if (button === "analytics" || button === "5") {
		app = this.mother.googleSystem("drive");
		app.total_make();
	} else if (button === "gmail" || button === "6") {
		app = this.mother.googleSystem("gmail");
		app.total_make();
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

Robot.prototype.getConsulting = async function (webpack = false) {
  try {
    const GetConsulting = require(`${process.cwd()}/apps/getConsulting/getConsulting.js`);
    let app = new GetConsulting();
    await app.launching(webpack);
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
				re2 = await this.consoleQ(`Choose commands : 1.token 2.sheets 3.docs 4.drive 5.analytics 6.gmail\n`);
				this.googleAPIs(re2);

			//front
			} else if (re === "front" || re === "6") {
				this.frontMaker(false);

			//consulting
		} else if (re === "consulting" || re === "7") {
				await this.getConsulting(false);

			//exit
			} else if (re === "exit" || re === "8") {
				process.exit();
			}
		}
	} catch (e) {
		console.log(e);
	}
}

const app = new Robot();
app.launching();

//development

/*

async function main() {
	const Mother = require(process.cwd() + "/apps/mother.js");
	let mother = new Mother();
	function newObj() {
	  return {
	    first_WebRequest: {
	      timeline: [],
	      cliid: "",
	      name: "",
	      phone: "",
	      email: [],
	      address: [],
	      family: [],
	      budget: [],
	      pyeong: [],
	      resident: [],
	      contract: [],
	      space: [],
				// [
				// 	{
				// 		rooms: 0,
				// 		bathrooms: 0,
				// 		valcony: false,
				// 	},
				// ],
	      etc: [],
	      channel: [],
	    },
	    second_Analysis: {
	      response: {
	        status: [],
	        outreason: [],
	      },
	      date: {
	        phonecall: {
	          history: [],
	          channel: [],
	        },
	        space: {
	          precheck: [],
	          empty: [],
	          movein: [],
	        }
	      },
	      picture: {
	        space: [],
	        style: [],
	      },
	      history: {
	        general: "",
	        space: "",
	        contruct: "",
	        styling: "",
	        budget: "",
	        etc: ""
	      }
	    },
	    third_Proposal: {
	      service: [],
	      proid: [],
	      send: [],
	    },
	  };
	}

	const { shell, shellLink, fileSystem, mongo, bridgeinfo, mongoinfo } = mother;

  const MONGOC = new mongo(mongoinfo, { useUnifiedTopology: true });

  await MONGOC.connect();

	let row = await MONGOC.db("miro81").collection("BC1_conlist").find({ a4_customernumber: "c2009_aa12s" }).limit(1).toArray();

	let first_WebRequest, second_Analysis, third_Proposal;
	let tempObj;
	let spaceArr;

	console.log(row);

	for (let past of row) {
	  tempObj = newObj();

	  first_WebRequest = tempObj.first_WebRequest
	  first_WebRequest.timeline.push(past.a18_timeline);
	  first_WebRequest.cliid = past.a4_customernumber;
	  first_WebRequest.name = past.a19_name;
	  first_WebRequest.phone = past.a20_phone;
	  // first_WebRequest.email = emailFilter(past.a35_aboutetc);
	  first_WebRequest.address = past.a21_address;
	  first_WebRequest.family = past.a22_family;
	  first_WebRequest.budget = past.a23_budget;
	  first_WebRequest.pyeong = Number(past.a24_pyeong.replace(/[^0-9]/g, ''));
	  first_WebRequest.resident = past.a25_due_date;
	  first_WebRequest.contract = past.a27_contract;
		if (/\//g.test(past.a28_space)) {
			spaceArr = past.a28_space.split(" / ");
			first_WebRequest.space.rooms = Number(spaceArr[0].replace(/[^0-9]/g, ''));
			first_WebRequest.space.bathrooms = Number(spaceArr[1].replace(/[^0-9]/g, ''));
			first_WebRequest.space.valcony = (/없음/g.test(spaceArr[2]) ? false : true);
		}

	  first_WebRequest.etc = past.a29_etc;
	  first_WebRequest.channel = past.a30_channel;

	  second_Analysis = tempObj.second_Analysis;
	  second_Analysis.response.status = past.a1_class1;
	  second_Analysis.response.outreason = past.a3_reason;

	  if (past.a5_call !== '' && past.a5_call !== '-') {
	    second_Analysis.date.phonecall.history.push(past.a5_call);
	  }
	  if (past.a10_comfirmcall !== '' && past.a10_comfirmcall !== '-') {
	    second_Analysis.date.phonecall.history.push(past.a10_comfirmcall);
	  }
	  if (past.a11_next !== '' && past.a11_next !== '-') {
	    second_Analysis.date.phonecall.history.push(past.a11_next);
	  }
	  if (past.a7_channelenroll !== '' && past.a7_channelenroll !== '-') {
	    second_Analysis.date.phonecall.channel.push(past.a7_channelenroll);
	  }

	  if (past.a13_sajeon !== '' && past.a13_sajeon !== '-') {
	    second_Analysis.date.space.precheck.push(past.a13_sajeon);
	  }
	  if (past.a14_emptyday !== '' && past.a14_emptyday !== '-') {
	    second_Analysis.date.space.empty.push(past.a14_emptyday);
	  }
	  if (past.a25_due_date !== '' && past.a25_due_date !== '-') {
	    second_Analysis.date.space.movein.push(past.a25_due_date);
	  }

	  second_Analysis.picture.space = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);
	  second_Analysis.picture.style = ((past.a8_image !== '' && past.a8_image !== '-') ? true : false);

	  second_Analysis.history.general = past.a12_history;
	  second_Analysis.history.space = past.a31_aboutsite;
	  second_Analysis.history.contruct = past.a32_aboutcom;
	  second_Analysis.history.styling = past.a33_aboutsty;
	  second_Analysis.history.budget = past.a34_aboutmon;
	  second_Analysis.history.etc = past.a35_aboutetc;

	  third_Proposal = tempObj.third_Proposal;
	  if (past.a16_service !== '' && past.a16_service !== '-') {
	    third_Proposal.service.push(past.a16_service);
	  }
	  if (past.a9_proposal !== '' && past.a9_proposal !== '-') {
	    third_Proposal.send.push([ past.a9_proposal ]);
	  }

		console.log(tempObj)

	}


	await MONGOC.close();



}

main();

*/

async function main2() {
	const NotionAPIs = require(process.cwd() + "/apps/notionAPIs/notionAPIs.js");
	let notion = new NotionAPIs();
	await notion.launching();
}

// main2();
