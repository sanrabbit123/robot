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
		app.front_maker();
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
			this.contentsMaker("front");

		} else {
			re = await this.consoleQ(`Choose commands : 1.back 2.contents 3.portfolio 4.proposal 5.google 6.front 7.exit\n`);

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

			//exit
			} else if (re === "exit" || re === "7") {
				process.exit();
			}
		}
	} catch (e) {
		console.log(e);
	}
}

const app = new Robot();
app.launching();

// development

// /*
async function main() {
	const Mother = require(process.cwd() + "/apps/mother.js");
	let mother = new Mother();


	const toGoogle = {
		"entry.1330142163": "성함",
		"entry.113799560": "핸드폰",
		"entry.2114079722": "주소",
		"entry.132869049": "가족 구성원",
		"entry.1481370131": "이메일",
		"entry.795490298": "예산",
		"entry.1040328027": "평수",
		"entry.2088583577": "입주일",
		"entry.2069033904": "계약형태",
		"entry.1127622227": "공간 상태",
		"entry.462371043": "요청 사항",
		"entry.795957898": "유입 경로",
		"entry.1749939672": "타임 라인",
	};

	let data = await mother.requestSystem("https://docs.google.com/forms/u/0/d/e/1FAIpQLSfqd1Q-En9K7YbQpknPE3OkqobzCMJaSO9G33W6KRodoE0I8g/formResponse", toGoogle);

	console.log(data);

}

// main();

// */
