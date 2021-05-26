const { seq, normalize } = require(`path`);
const { query } = require(normalize(`${__dirname}/tools/basicTools.js`));


query("SELECT * FROM client;");
