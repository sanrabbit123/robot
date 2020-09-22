const GoogleAPIs = function (credentials = "default") {
	this.google = require('googleapis').google;
	this.oAuth2Info = {
		credentials: {"installed":{"client_id":"362492126666-f7srgs4cn84fl57aeasp140sp18ttt60.apps.googleusercontent.com","project_id":"rich-chiller-250415","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"GWoPEinE7kaTkJfN1JrMvUVQ","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}},
	  access_token: {
			sheets: {},
			docs: {},
			analytics: {},
			drive: {},
			calendar: {},
			gmail: {},
		},
	}
	if (credentials !== "default") { this.oAuth2Info.credentials = credentials; }
	this.oAuth2Client = new this.google.auth.OAuth2(this.oAuth2Info.credentials.installed.client_id, this.oAuth2Info.credentials.installed.client_secret, this.oAuth2Info.credentials.installed.redirect_uris[0]);
}

GoogleAPIs.prototype.fileSystem = function (sw, arr) {
	const fs = require('fs');
	switch (sw) {
		case "read":
			return new Promise(function (resolve, reject) {
				fs.readFile(arr[0], (err, data) => {
					if (err) { reject(err); }
					else { resolve(data); }
				});
			});
			break;
		case "readString":
			return new Promise(function (resolve, reject) {
				fs.readFile(arr[0], "utf8", (err, data) => {
					if (err) { reject(err); }
					else { resolve(data); }
				});
			});
			break;
		case "readDir":
			return new Promise(function (resolve, reject) {
				fs.readdir(arr[0], function (err, filelist) {
					if (err) { reject(err); }
					else { resolve(filelist); }
				});
			});
			break;
		case "write":
			return new Promise(function (resolve, reject) {
				fs.writeFile(arr[0], arr[1], "utf8", (err) => {
					if (err) { reject(err); }
					else { resolve("success"); }
				});
			});
			break;
	}
}

GoogleAPIs.prototype.consoleQ = function (question) {
	const readline = require(`readline`);
	const rL = readline.createInterface({ input : process.stdin, output : process.stdout });
	return new Promise(function(resolve, reject) {
		rL.question(question, function (input) {
			resolve(input);
			rL.close();
		});
	});
}

GoogleAPIs.prototype.sleeping = function (time) {
	let instance = this;
	return new Promise(function (resolve, reject) {
		setTimeout(function(){
			resolve('awake');
		}, time);
	});
}

GoogleAPIs.prototype.get_token = function (code) {
	let instance = this;
	return new Promise(function(resolve, reject) {
		instance.oAuth2Client.getToken(code, (err, token) => {
			if (err) { reject(err); }
			resolve(token);
		});
	});
}

GoogleAPIs.prototype.setting_access = async function () {
	for (let token in this.oAuth2Info.access_token) {
		this.oAuth2Info.access_token[token] = JSON.parse(await this.fileSystem(`readString`, [ `${process.cwd()}/apps/googleAPIs/tokens/${token}.json` ]));
	}
}

GoogleAPIs.prototype.get_newToken = async function (key, SCOPE) {
	try {
		const authUrl = this.oAuth2Client.generateAuthUrl({ access_type: 'offline', scope: SCOPE, });
	  console.log(authUrl);
		let code = await this.consoleQ(`Enter the code from that page here : `);
		let token = await this.get_token(code);
		await this.fileSystem(`write`, [ `${process.cwd()}/apps/googleAPIs/tokens/${key}.json`, JSON.stringify(token) ]);
		console.log(`success`);
	} catch (e) {
		console.log(e.message);
	}
}

GoogleAPIs.prototype.generate_tokens = async function () {
	function* scopes() {
		yield [ "sheets", [ "https://www.googleapis.com/auth/spreadsheets", ], ];
		yield [ "docs", [ "https://www.googleapis.com/auth/documents", ], ];
		yield [ "analytics", [ "https://www.googleapis.com/auth/analytics", ], ];
		yield [ "drive", [ "https://www.googleapis.com/auth/drive", ], ];
		yield [ "calendar", [ "https://www.googleapis.com/auth/calendar", ], ];
		yield [ "gmail", [ "https://mail.google.com/", 'https://www.googleapis.com/auth/gmail.modify', 'https://www.googleapis.com/auth/gmail.compose', 'https://www.googleapis.com/auth/gmail.send', ], ];
	}
	let scopes_all = new Map(scopes());
	for (let key in this.oAuth2Info.access_token) {
		await this.get_newToken(key, scopes_all.get(key));
	}
}

GoogleAPIs.prototype.get_app = async function (app) {
	await this.setting_access();
	this.oAuth2Client.setCredentials(this.oAuth2Info.access_token[app]);
	let return_app;
	switch (app) {
		case "sheets":
			return_app = this.google.sheets({ version: 'v4', auth: this.oAuth2Client });
			break;
		case "docs":
			return_app = this.google.docs({ version: 'v1', auth: this.oAuth2Client });
			break;
		case "drive":
			return_app = this.google.drive({ version: 'v3', auth: this.oAuth2Client });
			break;
		case "analytics":
			return_app = this.google.analytics({ version: 'v3', auth: this.oAuth2Client });
			break;
		case "gmail":
			return_app = this.google.gmail({ version: 'v1', auth: this.oAuth2Client });
			break;
	}
	return return_app;
}

module.exports = GoogleAPIs;
