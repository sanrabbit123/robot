module.exports = {
  to_portfolio: function (target, options) {
    let h = '';
    h += require("./script/general.js").exec(target, options);
    h += require("./script/to_portfolio/portfolio.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
  to_png: function (target, options) {
    let h = '';
    h += require("./script/general.js").exec(target, options);
    h += require("./script/to_portfolio/png.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
  ghostFilter: function (target, options) {
    let h = '';
    h += require("./script/general.js").exec(target, options);
    h += require("./script/to_portfolio/ghost.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
}
