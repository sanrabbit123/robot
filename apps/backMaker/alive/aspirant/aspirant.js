const GENERAL_DIR = process.cwd() + "/apps/backMaker/alive/general";
const PROJECT_DIR = process.cwd() + "/apps/backMaker/alive/aspirant";
const AspirantMeeting = require(PROJECT_DIR + "/aspirantMeeting/aspirantMeeting.js");
const AspirantCalendar = require(PROJECT_DIR + "/aspirantCalendar/aspirantCalendar.js");
const AspirantPortfolio = require(PROJECT_DIR + "/aspirantPortfolio/aspirantPortfolio.js");
const AspirantSubmit = require(PROJECT_DIR + "/aspirantSubmit/aspirantSubmit.js");
const AspirantInformation = require(PROJECT_DIR + "/aspirantInformation/aspirantInformation.js");
const AspirantResponse = require(PROJECT_DIR + "/aspirantResponse/aspirantResponse.js");
const { DateParse } = require(GENERAL_DIR + "/generator.js");

const Aspirant = function (json) {
  this.aspid = json.aspid;
  this.designer = json.designer;
  this.phone = json.phone;
  this.gender = json.gender;
  this.birth = new DateParse(json.birth);
  this.address = json.address;
  this.email = json.email;
  this.meeting = new AspirantMeeting(json.meeting);
  this.calendar = new AspirantCalendar(json.calendar);
  this.portfolio = new AspirantPortfolio(json.portfolio);
  this.submit = new AspirantSubmit(json.submit);
  this.information = new AspirantInformation(json.information);
  this.response = new AspirantResponse(json.response);
}

Aspirant.prototype.toNormal = function () {
  let obj = {};
  obj.aspid = this.aspid;
  obj.designer = this.designer;
  obj.phone = this.phone;
  obj.gender = this.gender;
  obj.birth = this.birth.toNormal();
  obj.address = this.address;
  obj.email = this.email;
  obj.meeting = this.meeting.toNormal();
  obj.calendar = this.calendar.toNormal();
  obj.portfolio = this.portfolio.toNormal();
  obj.submit = this.submit.toNormal();
  obj.information = this.information.toNormal();
  obj.response = this.response.toNormal();
  return obj;
}

Aspirant.prototype.firstRequest = function () {
  return this.submit.firstRequest.date;
}

Aspirant.prototype.meetingAlarm = function () {
  const today = new Date();
  const dayConvert = [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ];
  const dateToString = function (dateObject) {
    return `${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일 ${dayConvert[dateObject.getDay()]} ${dateObject.getHours()}시`;
  }
  let obj, standard;

  if (today.getDay() === 4) {
    standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 4));
  } else if (today.getDay() === 5) {
    standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 4));
  } else if (today.getDay() === 6) {
    standard = null;
  } else if (today.getDay() === 0) {
    standard = null;
  } else {
    standard = new Date(today.valueOf() + (1000 * 60 * 60 * 24 * 2));
  }

  obj = {
    name: this.designer,
    phone: this.phone,
    date: this.meeting.date,
    status: ((this.meeting.date.valueOf() <= today.valueOf()) ? "미팅 완료" : "미팅 대기"),
    dateString: dateToString(this.meeting.date),
  };

  if (standard !== null) {
    obj.alarm = (standard.getFullYear() === this.meeting.date.getFullYear() && standard.getMonth() === this.meeting.date.getMonth() && standard.getDate() === this.meeting.date.getDate());
  } else {
    obj.alarm = false;
  }

  if (this.meeting.date.getFullYear() < 2000) {
    return null;
  } else {
    return obj;
  }
}


module.exports = Aspirant;
