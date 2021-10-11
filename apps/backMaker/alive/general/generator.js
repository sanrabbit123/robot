const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";

module.exports = {
  DateParse: require(GENERAL_DIR + "/dateParse.js"),
  Menu: require(GENERAL_DIR + "/menu.js"),
  Address: require(GENERAL_DIR + "/address.js"),
  Flow: require(GENERAL_DIR + "/flow.js"),
};
