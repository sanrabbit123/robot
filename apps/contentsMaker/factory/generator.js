module.exports = {
  contents_maker: {
    portfolio_contents: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'P');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += require("./script/contents_maker/contents.js").exec(options, 'P');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      h += "\nmain.echo();\n";
      return h;
    },
    portfolio_titles: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'P');
      h += require("./script/contents_maker/titles.js").exec(options, 'P');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      h += "\nmain.echo();\n";
      return h;
    },
    portfolio_photo: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'P');
      h += require("./script/contents_maker/photo.js").exec(options);
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      h += "\nmain.echo();\n";
      return h;
    },
    review_contents: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'R');
      h += require("./script/contents_maker/mileo.js").exec(options);
      h += require("./script/contents_maker/contents.js").exec(options, 'R');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      h += "\nmain.echo();\n";
      return h;
    },
    review_titles: function (options) {
      let h = '';
      h += require("./script/general.js").exec(options, 'R');
      h += require("./script/contents_maker/titles.js").exec(options, 'R');
      h += "\nlet main = new ExecMain(text, \"" + options.home_dir + "\");";
      h += "\nmain.start();\n";
      h += "\nmain.echo();\n";
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
      h += "\nmain.echo();\n";
      return h;
    }
  },
  front_maker: {
    exec: async function (options, sw) {
      let h = '';
      h += require(`${process.cwd()}/apps/contentsMaker/factory/script/general.js`).exec(options, 'N');
      h += require(`${process.cwd()}/apps/contentsMaker/factory/script/contents_maker/mileo.js`).exec(options);
      h += await options.fileSystem(`readString`, [ `${options.script_dir}/${sw}.js` ]);
      h += "\nconst main = new ExecMain(text, \"" + options.home_dir + "/result/" + sw + "\", " + JSON.stringify(options.etc) + ");";
      h += "\nmain.start(\"" + options.dayString + "\");\n";
      h += "\nmain.echo();\n";
      return h;
    },
  },
  graph_maker: {
    exec: async function (options) {
      let h = '';
      h += require(`${process.cwd()}/apps/contentsMaker/factory/script/general.js`).exec(options, 'N');
      h += require(`${process.cwd()}/apps/contentsMaker/factory/script/contents_maker/mileo.js`).exec(options);
      h += await options.fileSystem(`readString`, [ `${options.script_dir}/graph.js` ]);
      h += "\nconst main = new ExecMain(text, \"" + options.home_dir + "/result" + "\");";
      h += "\nmain.start(\"" + options.dayString + "\");\n";
      h += "\nmain.echo();\n";
      return h;
    },
  },
  console_maker: {
    exec: async function (options, sw) {
      let h = '';
      h += require(`${process.cwd()}/apps/contentsMaker/factory/script/general.js`).exec(options, 'N');
      h += require(`${process.cwd()}/apps/contentsMaker/factory/script/contents_maker/mileo.js`).exec(options);
      h += await options.fileSystem(`readString`, [ `${options.script_dir}/${sw}.js` ]);
      h += "\nconst main = new ExecMain(text, \"" + options.home_dir + "/result/" + sw + "\", " + JSON.stringify(options.etc) + ");";
      h += "\nmain.start(\"" + options.dayString + "\");\n";
      h += "\nmain.echo();\n";
      return h;
    },
  },
}
