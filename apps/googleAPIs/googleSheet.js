const GoogleSheet = function (credentials = "default") {
	const GoogleAPIs = require("./googleAPIs.js");
	this.general = new GoogleAPIs(credentials);
	this.sheets = {};
	const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	this.abc = [];
	for (let i of alphabet) { this.abc.push(i); }
	for (let i of alphabet) { for (let j of alphabet) { this.abc.push(i + j); } }
}


GoogleSheet.prototype.set_id = async function () {
	let instance = this;
	try {




	} catch (e) {
		console.log(e.message);
	}
}


GoogleSheet.prototype.set_range = async function () {
	let instance = this;
	try {




	} catch (e) {
		console.log(e.message);
	}
}


GoogleSheet.prototype.get_value = async function (id, range) {
	let instance = this;
	try {
		this.sheets = await this.general.get_app("sheets");
		let res = (await this.sheets.spreadsheets.values.get({ spreadsheetId: id, range: range })).data;
		return res.values;
	} catch (e) {
		console.log(e.message);
	}
}


GoogleSheet.prototype.update_value = async function () {
	let instance = this;
	try {


		// await sheets.spreadsheets.values.update({
    //   spreadsheetId: "1B0C-oYPKp29zI3TjAGRWYruQpnG9jfX86PiAbXo6N_g",
    //   range: range,
    //   valueInputOption: "RAW",
    //   resource: { range: range, values: total_col_val },
    // });


	} catch (e) {
		console.log(e.message);
	}
}


GoogleSheet.prototype.to_mongo = async function () {
	let instance = this;
	try {




	} catch (e) {
		console.log(e.message);
	}
}


GoogleSheet.prototype.to_mysql = async function () {
	let instance = this;
	try {




	} catch (e) {
		console.log(e.message);
	}
}


GoogleSheet.prototype.total_make = async function () {
	let instance = this;
	try {

		const rows = await this.get_value('1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', 'Class Data!A2:E');
		console.log(rows);









	} catch (e) {
		console.log(e.message);
	}
}


module.exports = GoogleSheet;
