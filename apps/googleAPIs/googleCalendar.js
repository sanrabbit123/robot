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

const GoogleCalendar = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
  this.dir = process.cwd() + "/apps/googleAPIs";
  this.pythonApp = this.dir + "/python/app.py";
}

GoogleCalendar.prototype.returnCalendarIds = function () {
  const obj = {
    photographing: "d5qo2jf12banfo2m66us9qhcp4@group.calendar.google.com",
    designerMeeting: "gb87kl84fejja1h4gggh8in6gc@group.calendar.google.com",
    newDesigner: "67t0gdlj7on3nnfmrnb69n9700@group.calendar.google.com",
    homeliaisonContents: "fiqo0dfple02l1ucajb827g9dg@group.calendar.google.com",
  };
  return obj;
}

GoogleCalendar.prototype.findCalendarId = function (button) {
  const dictionary = this.returnCalendarIds();
  return dictionary[button];
}

GoogleCalendar.prototype.makeSchedule = async function (to, title, description, start, end = null, allDay = false) {
  const instance = this;
  const { pythonExecute, errorLog, zeroAddition, dateToString } = this.mother;
  try {
    let eventObj, runEvent;
    let finalStart, finalEnd;
    let temp, temp2, temp3, tempObj;
    let res;

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

    if (!allDay) {
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
    } else {
      eventObj = {
        summary: title,
        description: description,
        start: {
          date: dateToString(new Date(finalStart)),
          timeZone: 'Asia/Seoul',
        },
        end: {
          date: dateToString(new Date(finalEnd)),
          timeZone: 'Asia/Seoul',
        },
        recurrence: [],
        attendees: [],
        reminders: {
          useDefault: false,
          overrides: [],
        },
      };
    }

    res = await pythonExecute(this.pythonApp, [ "calendar", "makeSchedule" ], { targetId: this.findCalendarId(to), body: eventObj });
    if (typeof res !== "object") {
      throw new Error(res);
    }
    return {
      calendarId: instance.findCalendarId(to),
      id: res.id,
      link: res.link
    };

  } catch (e) {
    console.log(e);
    return null;
  }
}

GoogleCalendar.prototype.getSchedule = async function (from, id) {
  const instance = this;
  const { pythonExecute, errorLog } = this.mother;
  try {
    let requestObj, resultObj;
    let index;

    const items = await pythonExecute(this.pythonApp, [ "calendar", "listEvents" ], { targetId: this.findCalendarId(from), query: "" });
    if (!Array.isArray(items)) {
      throw new Error("google calendar error : python error(getSchedule)");
    }

    index = items.findIndex((obj) => { return obj.id === id })
    if (index === -1) {
      return null;
    } else {
      return new CalendarEvent(items[index]);
    }

  } catch (e) {
    await errorLog("google calendar api error(getSchedule) : " + e.message);
    console.log(e);
    return null;
  }
}

GoogleCalendar.prototype.listEvents = async function (from, search = null) {
  const instance = this;
  const { pythonExecute, errorLog } = this.mother;
  try {
    let requestObj, resultObj;

    const items = await pythonExecute(this.pythonApp, [ "calendar", "listEvents" ], { targetId: this.findCalendarId(from), query: search === null ? "" : search });
    if (!Array.isArray(items)) {
      throw new Error("google calendar error : python error(listEvents)");
    }

    resultObj = new CalendarEvents();
    if (items.length > 0) {
      resultObj.setEvents(items);
    }
    return resultObj;

  } catch (e) {
    await errorLog("google calendar api error(listEvents) : " + e.message);
    console.log(e);
    return [];
  }
}

GoogleCalendar.prototype.listEventsNonePast = async function (from, search = null) {
  const instance = this;
  const { pythonExecute, errorLog } = this.mother;
  try {
    let requestObj, resultObj;

    const items = await pythonExecute(this.pythonApp, [ "calendar", "listEventsNonePast" ], { targetId: this.findCalendarId(from), query: search === null ? "" : search });
    if (!Array.isArray(items)) {
      throw new Error("google calendar error : python error(listEvents)");
    }

    resultObj = new CalendarEvents();
    if (items.length > 0) {
      resultObj.setEvents(items);
    }
    return resultObj;

  } catch (e) {
    await errorLog("google calendar api error(listEvents) : " + e.message);
    console.log(e);
    return [];
  }
}


GoogleCalendar.prototype.updateSchedule = async function (from, id, updateQuery) {
  const instance = this;
  const { pythonExecute, errorLog } = this.mother;
  try {
    let queryObj;
    let startDate, endDate;
    let res;

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

    queryObj.summary = updateQuery.title;

    res = await pythonExecute(this.pythonApp, [ "calendar", "updateSchedule" ], { targetId: this.findCalendarId(from), eventId: id, body: queryObj });
    return res;

  } catch (e) {
    console.log(e);
  }
}

GoogleCalendar.prototype.deleteSchedule = async function (from, id) {
  const instance = this;
  const { pythonExecute, errorLog } = this.mother;
  try {
    let res;
    if (Array.isArray(id)) {
      for (let i of id) {
        await pythonExecute(this.pythonApp, [ "calendar", "deleteSchedule" ], { targetId: this.findCalendarId(from), eventId: i });
      }
      res = { message: "done" };
    } else {
      res = await pythonExecute(this.pythonApp, [ "calendar", "deleteSchedule" ], { targetId: this.findCalendarId(from), eventId: id });
    }
    return res;
  } catch (e) {
    console.log(e);
  }
}

module.exports = GoogleCalendar;
