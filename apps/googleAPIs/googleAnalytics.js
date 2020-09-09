const GoogleAnalytics = function (credentials = "default") {
	const GoogleAPIs = require("./googleAPIs.js");
	this.analytics = {}
	this.general = new GoogleAPIs(credentials);
}


GoogleAnalytics.prototype.total_make = async function () {
	let instance = this;
	try {
		this.analytics = await this.general.get_app("analytics");
		// console.log(this.analytics);
		let result = await this.analytics.data.ga.get({
	    'ids': 'ga:148670049',
	    'start-date': 'today',
	    'end-date': 'today',
	    'metrics': 'ga:sessions'
	  });
		console.log(result);

		// 148670049


	} catch (e) {
		console.log(e.message);
	}
}


module.exports = GoogleAnalytics;
