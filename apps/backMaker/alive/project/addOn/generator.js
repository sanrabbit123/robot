const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/project";
const Project = require(PROJECT_DIR + "/project.js");

class Projects extends Array {

}

const widthTools = function (Project) {

  return Project;
}

const widthToolsArr = function (Projects) {

  return Projects;
}

const Tools = function () {}
Tools.widthTools = widthTools;
Tools.widthToolsArr = widthToolsArr;

module.exports = { Project, Projects, Tools };
