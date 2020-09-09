module.exports = function (d) {
//Inline js
let js = `
const funcs_arr = [
  function (m1, m2) { console.log('Callbacks : ', m1, m2); },
];
const funcs_obj = {};
`;
//Inline css
let css = [ 1200, `` ];

//Second
let second = `

`;
return { inlinejs: js, inlinecss: css, second: second };
}
