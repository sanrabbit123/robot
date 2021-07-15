const { query, print, view, request, read, write, exist, sleep, tree, shell, mongo, comma, date, sheets, sheet } = require(process.cwd() + "/tools/basicTools.js");
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------


let x;

x = query("SELECT timeline, cliid, name, outreason FROM client LIMIT 200");
print(x);
print(x.from("2021-07-01"));
