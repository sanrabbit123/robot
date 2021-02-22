class CalendarDate {
  constructor(startString, endString) {
    let temp, tempArr;

    if (startString.length === 10) {
      tempArr = startString.split('-');
      this.start = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      tempArr = endString.split('-');
      this.end = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
    } else {
      this.start = new Date(startString);
      this.end = new Date(endString);
    }
  }

  get from() {
    return this.start;
  }

  get value() {
    return this.start;
  }

  get to() {
    return this.start;
  }

  get length() {
    return this.end.valueOf() - this.start.valueOf();
  }
}

class CalendarEvent {
  constructor(data) {
    this.calendarId = data.organizer.email;
    this.eventId = data.id;
    this.creator = data.creator.email;
    this.title = data.summary;
    this.link = data.htmlLink;
    if (data.start.dateTime !== undefined) {
      this.date = new CalendarDate(data.start.dateTime, data.end.dateTime);
    } else {
      this.date = new CalendarDate(data.start.date, data.end.date);
    }
    this.description = null;
    this.location = null;
    if (data.description !== undefined) {
      this.description = data.description;
    }
    if (data.location !== undefined) {
      this.location = data.location;
    }
  }

  get startDate() {
    return this.date.from;
  }

  get endDate() {
    return this.date.to;
  }

  get start() {
    return this.date.from;
  }

  get end() {
    return this.date.to;
  }

  get from() {
    return this.date.from;
  }

  get to() {
    return this.date.to;
  }
}

class CalendarEvents extends Array {
  setEvents(arr) {
    for (let i of arr) {
      this.push(new CalendarEvent(i));
    }
  }
}

const GoogleCalendar = function (credentials = "default") {
  const GoogleAPIs = require(process.cwd() + "/apps/googleAPIs/googleAPIs.js");
  this.general = new GoogleAPIs(credentials);
  this.calendar = {};
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
  this.readyState = 0;
}

GoogleCalendar.prototype.returnCalendarIds = function () {
  const obj = {
    photographing: "85bu1rdpu930d1bqmhvlu5c70k@group.calendar.google.com",
    designerMeeting: "67t0gdlj7on3nnfmrnb69n9700@group.calendar.google.com",
    blogContents: "kju44o2oej8n15tv0tlhq2ieqo@group.calendar.google.com",
    projectCalendar: "61l8ieh4alq01846pjjqsq0o34@group.calendar.google.com",
    clientCalendar: "khdeun9s66a70279um2n58a6no@group.calendar.google.com",
  };
  return obj;
}

GoogleCalendar.prototype.findCalendarId = function (button) {
  const dictionary = this.returnCalendarIds();
  return dictionary[button];
}

GoogleCalendar.prototype.ready = async function () {
  const instance = this;
  try {
    this.calendar = await this.general.get_app("calendar");
    this.readyState = 1;
  } catch (e) {
    console.log(e);
  }
}

GoogleCalendar.prototype.makeSchedule = async function (to, title, description, start, end = null) {
  const instance = this;
  const zeroAddition = function (num) {
    if (num < 10) {
      return `0${String(num)}`;
    } else {
      return String(num);
    }
  }
  try {
    if (this.readyState === 0) {
      this.calendar = await this.general.get_app("calendar");
    }
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
          calendarId: instance.findCalendarId(to),
          resource: eventObj,
        }, function (err, event) {
          if (!err) {
            const { id, htmlLink } = event.data;
            resolve({ calendarId: instance.findCalendarId(to), eventId: id, link: htmlLink });
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

GoogleCalendar.prototype.getSchedule = async function (from, id) {
  const instance = this;
  try {
    if (this.readyState === 0) {
      this.calendar = await this.general.get_app("calendar");
    }

    let resultObj;

    const { data, status, statusText } = await this.calendar.events.get({
      calendarId: this.findCalendarId(from),
      eventId: id,
      timeZone: 'Asia/Seoul',
    });

    if (status === 200) {
      resultObj = new CalendarEvent(data);
      return resultObj;
    } else {
      throw new Error(statusText);
    }

  } catch (e) {
    console.log(e);
  }
}

GoogleCalendar.prototype.listEvents = async function (from, search = null) {
  const instance = this;
  try {
    if (this.readyState === 0) {
      this.calendar = await this.general.get_app("calendar");
    }
    let requestObj, resultObj;

    requestObj = {
      calendarId: this.findCalendarId(from),
      showDeleted: false,
      showHiddenInvitations: true,
      singleEvents: true,
      timeZone: 'Asia/Seoul'
    };

    if (search !== null) {
      requestObj.q = search;
    }

    const { data: { items }, status, statusText } = await this.calendar.events.list(requestObj);

    if (status === 200) {
      resultObj = new CalendarEvents();
      if (items.length > 0) {
        resultObj.setEvents(items);
      }
      return resultObj;
    } else {
      throw new Error(statusText);
    }

  } catch (e) {
    console.log(e);
  }
}

GoogleCalendar.prototype.updateSchedule = async function (from, id, updateQuery) {
  const instance = this;
  try {
    if (this.readyState === 0) {
      this.calendar = await this.general.get_app("calendar");
    }

    const past = await this.getSchedule(from, id);

    let queryObj;
    let startDate, endDate;

    if (updateQuery.end !== undefined) {
      startDate = new Date(updateQuery.start.getFullYear(), updateQuery.start.getMonth(), updateQuery.start.getDate(), updateQuery.start.getHours() + 12);
      endDate = new Date(updateQuery.end.getFullYear(), updateQuery.end.getMonth(), updateQuery.end.getDate(), updateQuery.end.getHours() + 12);
    } else {
      startDate = updateQuery.start;
      endDate = updateQuery.start;
    }


    queryObj = {};
    queryObj.start = {};
    queryObj.start.dateTime = startDate;
    queryObj.end = {};
    queryObj.end.dateTime = endDate;

    if (updateQuery.title !== undefined) {
      queryObj.summary = updateQuery.title;
    } else {
      queryObj.summary = past.title;
    }

    await this.calendar.events.update({
      calendarId: this.findCalendarId(from),
      eventId: id,
      requestBody: queryObj
    });

  } catch (e) {
    console.log(e);
  }
}

GoogleCalendar.prototype.deleteSchedule = async function (from, id) {
  const instance = this;
  try {
    if (this.readyState === 0) {
      this.calendar = await this.general.get_app("calendar");
    }
    if (Array.isArray(id)) {
      for (let i of id) {
        try {
          await this.calendar.events.delete({
            calendarId: this.findCalendarId(from),
            eventId: i
          });
        } catch (e) {}
      }
    } else {
      await this.calendar.events.delete({
        calendarId: this.findCalendarId(from),
        eventId: id
      });
    }
    return 'done';
  } catch (e) {
    return 'done';
  }
}

module.exports = GoogleCalendar;
