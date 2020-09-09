module.exports = {
  contents_maker: {
    portfolio_contents: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'P');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += require("./script/contents_maker/contents.js").exec(options, 'P');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      return h;
    },
    portfolio_titles: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'P');
      h += require("./script/contents_maker/titles.js").exec(options, 'P');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      return h;
    },
    portfolio_photo: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'P');
      h += require("./script/contents_maker/photo.js").exec(options);
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      return h;
    },
    review_contents: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'R');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += require("./script/contents_maker/contents.js").exec(options, 'R');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      return h;
    },
    review_titles: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'R');
      h += require("./script/contents_maker/titles.js").exec(options, 'R');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      return h;
    },
  },
  proposal_maker: {
    proposal: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'N');
      h += require("./script/proposal_maker/proposal.js").exec(options);
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      return h;
    }
  },
  front_maker: {
    general: async function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'N');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += await options.fileSystem(`readString`, [ `${options.script_dir}/general.js` ]);
      h += "\nconst main = new ExecMain(text, \"" + options.home_dir + "result/general" + "\", " + JSON.stringify(options.etc) + ");";
      h += "\nmain.start(\"" + options.dayString + "\");\n";
      return h;
    },
    about: async function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'N');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += await options.fileSystem(`readString`, [ `${options.script_dir}/about.js` ]);
      h += "\nconst main = new ExecMain(text, \"" + options.home_dir + "result/about" + "\", " + JSON.stringify(options.etc) + ");";
      h += "\nmain.start(\"" + options.dayString + "\");\n";
      return h;
    },
    index: async function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'N');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += await options.fileSystem(`readString`, [ `${options.script_dir}/index.js` ]);
      h += "\nconst main = new ExecMain(text, \"" + options.home_dir + "result/index" + "\", " + JSON.stringify(options.etc) + ");";
      h += "\nmain.start(\"" + options.dayString + "\");\n";
      return h;
    },
    consulting: async function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'N');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += await options.fileSystem(`readString`, [ `${options.script_dir}/consulting.js` ]);
      h += "\nconst main = new ExecMain(text, \"" + options.home_dir + "result/consulting" + "\", " + JSON.stringify(options.etc) + ");";
      h += "\nmain.start(\"" + options.dayString + "\");\n";
      return h;
    },
  }
}
