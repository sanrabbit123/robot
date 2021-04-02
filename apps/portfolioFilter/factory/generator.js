module.exports = {
  to_portfolio: function (text, options) {
    let h = '';
    h += require("./script/general.js").exec(text, options);
    h += require("./script/to_portfolio/portfolio.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
  to_png: function (text, options) {
    let h = '';
    h += require("./script/general.js").exec(text, options);
    h += require("./script/to_portfolio/png.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
  ghostFilter: function (text, options) {
    let h = '';
    h += require("./script/general.js").exec(text, options);
    h += require("./script/to_portfolio/ghost.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
  rawFilter: function (text, options) {
    let h = '';
    h += require("./script/general.js").exec(text, options);
    h += require("./script/to_portfolio/raw.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
  whiteFilter: function (text, options) {
    let h = '';
    h += require("./script/general.js").exec(text, options);
    h += require("./script/to_portfolio/white.js").exec(options);
    h += "\nvar main = new ExecMain(text, \"" + options.home_dir + "\");";
    h += "\nmain.start();\n";
    return h;
  },
}
