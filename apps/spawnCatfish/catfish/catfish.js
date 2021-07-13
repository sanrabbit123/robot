const { seq, normalize } = require(`path`);
const { query, print } = require(normalize(`${__dirname}/tools/basicTools.js`));


query("SELECT * FROM client;");
