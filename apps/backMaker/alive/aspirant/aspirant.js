const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const AspirantMeeting = require(PROJECT_DIR + "/aspirantMeeting/aspirantMeeting.js");
const AspirantCalendar = require(PROJECT_DIR + "/aspirantCalendar/aspirantCalendar.js");
const AspirantPortfolio = require(PROJECT_DIR + "/aspirantPortfolio/aspirantPortfolio.js");
const AspirantSubmit = require(PROJECT_DIR + "/aspirantSubmit/aspirantSubmit.js");
const AspirantInformation = require(PROJECT_DIR + "/aspirantInformation/aspirantInformation.js");

const Aspirant = function (json) {
  this.aspid = json.aspid;
  this.designer = json.designer;
  this.phone = json.phone;
  this.address = json.address;
  this.email = json.email;
  this.meeting = new AspirantMeeting(json.meeting);
  this.calendar = new AspirantCalendar(json.calendar);
  this.portfolio = new AspirantPortfolio(json.portfolio);
  this.submit = new AspirantSubmit(json.submit);
  this.information = new AspirantInformation(json.information);
}

Aspirant.prototype.toNormal = function () {
  let obj = {};
  obj.aspid = this.aspid;
  obj.designer = this.designer;
  obj.phone = this.phone;
  obj.address = this.address;
  obj.email = this.email;
  obj.meeting = this.meeting.toNormal();
  obj.calendar = this.calendar.toNormal();
  obj.portfolio = this.portfolio.toNormal();
  obj.submit = this.submit.toNormal();
  obj.information = this.information.toNormal();
  return obj;
}

Aspirant.prototype.firstRequest = function () {
  return this.submit.firstRequest.date;
}

module.exports = Aspirant;
