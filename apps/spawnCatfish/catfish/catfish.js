const { seq, normalize } = require(`path`);
const { query } = require(normalize(`${__dirname}/tools/basicTools.js`));


console.log(query("SELECT name FROM client;"))
