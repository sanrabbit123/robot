const GoogleCalendar = function (credentials = "default") {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.calendar = {};
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

GoogleCalendar.prototype.makeSchedule = async function (title, description, start, end = null) {
  const instance = this;
  const zeroAddition = function (num) {
    if (num < 10) {
      return `0${String(num)}`;
    } else {
      return String(num);
    }
  }
  try {
    this.calendar = await this.general.get_app("calendar");
    let eventObj, runEvent;
    let finalStart, finalEnd;
    let temp, temp2, temp3, tempObj;

    if (end === null || end === undefined) {
      end = start;
    }

    if (typeof start === "string") {
      if (start.length === 10) {
        temp = start.split("-");
        tempObj = new Date(Number(temp[0]), (Number(temp[1]) - 1), Number(temp[2]));
      } else {
        temp = start.split(" ");
        temp2 = temp[0].split("-");
        temp3 = temp[1].split(":");
        tempObj = new Date(Number(temp2[0]), (Number(temp2[1]) - 1), Number(temp2[2]), Number(temp3[0]), Number(temp3[1]), Number(temp3[2]));
      }
      finalStart = JSON.stringify(tempObj).slice(1, -1);
    } else if (typeof start === "object") {
      finalStart = JSON.stringify(start).slice(1, -1);
    }

    if (typeof end === "string") {
      if (end.length === 10) {
        temp = end.split("-");
        tempObj = new Date(Number(temp[0]), (Number(temp[1]) - 1), Number(temp[2]));
      } else {
        temp = end.split(" ");
        temp2 = temp[0].split("-");
        temp3 = temp[1].split(":");
        tempObj = new Date(Number(temp2[0]), (Number(temp2[1]) - 1), Number(temp2[2]), Number(temp3[0]), Number(temp3[1]), Number(temp3[2]));
      }
      finalEnd = JSON.stringify(tempObj).slice(1, -1);
    } else if (typeof end === "object") {
      finalEnd = JSON.stringify(end).slice(1, -1);
    }

    eventObj = {
      summary: title,
      description: description,
      start: {
        dateTime: finalStart,
        timeZone: 'Asia/Seoul',
      },
      end: {
        dateTime: finalEnd,
        timeZone: 'Asia/Seoul',
      },
      recurrence: [],
      attendees: [],
      reminders: {
        useDefault: false,
        overrides: [],
      },
    };

    runEvent = function () {
      return new Promise(function (resolve, reject) {
        instance.calendar.events.insert({
          auth: instance.general.oAuth2Client,
          calendarId: 'primary',
          resource: eventObj,
        }, function (err, event) {
          if (!err) {
            resolve('Event created');
          } else {
            reject(err);
          }
        });
      });
    }

    return (await runEvent());

  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleCalendar;
