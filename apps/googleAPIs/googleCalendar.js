/**
 * CalendarDate 클래스는 시작 날짜와 종료 날짜를 관리하며,
 * 날짜 간의 기간을 계산하는 기능을 제공합니다.
 */
class CalendarDate {
  /**
   * CalendarDate 클래스의 생성자입니다.
   * 
   * @param {string} startString - 시작 날짜를 나타내는 문자열입니다.
   * @param {string} endString - 종료 날짜를 나타내는 문자열입니다.
   */
  constructor(startString, endString) {
    let temp, tempArr;

    // 시작 날짜와 종료 날짜가 'YYYY-MM-DD' 형식인 경우
    if (startString.length === 10) {
      // 시작 날짜를 '-'로 분리하여 배열로 만듭니다.
      tempArr = startString.split('-');
      // 시작 날짜를 Date 객체로 변환하여 this.start에 저장합니다.
      this.start = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      // 종료 날짜를 '-'로 분리하여 배열로 만듭니다.
      tempArr = endString.split('-');
      // 종료 날짜를 Date 객체로 변환하여 this.end에 저장합니다.
      this.end = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
    } else {
      // 날짜 형식이 다른 경우, 문자열을 그대로 Date 객체로 변환하여 저장합니다.
      this.start = new Date(startString);
      this.end = new Date(endString);
    }
  }

  /**
   * 시작 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 시작 날짜를 반환합니다.
   */
  get from() {
    return this.start;
  }

  /**
   * 시작 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 시작 날짜를 반환합니다.
   */
  get value() {
    return this.start;
  }

  /**
   * 종료 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 종료 날짜를 반환합니다.
   */
  get to() {
    return this.start;
  }

  /**
   * 시작 날짜와 종료 날짜 간의 기간(밀리초 단위)을 계산하여 반환하는 getter입니다.
   * 
   * @returns {number} - 시작 날짜와 종료 날짜 간의 기간을 반환합니다.
   */
  get length() {
    return this.end.valueOf() - this.start.valueOf();
  }
}

/**
 * CalendarEvent 클래스는 개별 캘린더 이벤트를 관리하며,
 * 이벤트의 다양한 세부 정보를 포함합니다.
 */
class CalendarEvent {
  /**
   * CalendarEvent 클래스의 생성자입니다.
   * 
   * @param {object} data - 이벤트 데이터를 포함한 객체입니다.
   */
  constructor(data) {
    // 이벤트의 주최자 이메일을 저장합니다.
    this.calendarId = data.organizer.email;
    // 이벤트 ID를 저장합니다.
    this.eventId = data.id;
    // 이벤트 생성자의 이메일을 저장합니다.
    this.creator = data.creator.email;
    // 이벤트 제목을 저장합니다.
    this.title = data.summary;
    // 이벤트 링크를 저장합니다.
    this.link = data.htmlLink;

    // 이벤트 시작과 종료 날짜가 시간 정보(dateTime)를 포함하는지 확인합니다.
    if (data.start.dateTime !== undefined) {
      // 시간 정보가 포함된 경우, CalendarDate 인스턴스를 생성하여 저장합니다.
      this.date = new CalendarDate(data.start.dateTime, data.end.dateTime);
    } else {
      // 시간 정보가 없는 경우, 날짜 정보만 사용하여 CalendarDate 인스턴스를 생성합니다.
      this.date = new CalendarDate(data.start.date, data.end.date);
    }

    // 이벤트 설명을 초기화하고, 존재할 경우 설정합니다.
    this.description = null;
    this.location = null;
    if (data.description !== undefined) {
      this.description = data.description;
    }

    // 이벤트 위치를 초기화하고, 존재할 경우 설정합니다.
    if (data.location !== undefined) {
      this.location = data.location;
    }
  }

  /**
   * 이벤트의 시작 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 이벤트의 시작 날짜를 반환합니다.
   */
  get startDate() {
    return this.date.from;
  }

  /**
   * 이벤트의 종료 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 이벤트의 종료 날짜를 반환합니다.
   */
  get endDate() {
    return this.date.to;
  }

  /**
   * 이벤트의 시작 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 이벤트의 시작 날짜를 반환합니다.
   */
  get start() {
    return this.date.from;
  }

  /**
   * 이벤트의 종료 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 이벤트의 종료 날짜를 반환합니다.
   */
  get end() {
    return this.date.to;
  }

  /**
   * 이벤트의 시작 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 이벤트의 시작 날짜를 반환합니다.
   */
  get from() {
    return this.date.from;
  }

  /**
   * 이벤트의 종료 날짜를 반환하는 getter입니다.
   * 
   * @returns {Date} - 이벤트의 종료 날짜를 반환합니다.
   */
  get to() {
    return this.date.to;
  }
}

/**
 * CalendarEvents 클래스는 여러 개의 CalendarEvent 객체를 관리하는 배열 클래스입니다.
 */
class CalendarEvents extends Array {
  /**
   * 주어진 이벤트 데이터 배열을 사용하여 CalendarEvent 객체로 변환하고,
   * 해당 객체들을 배열에 추가합니다.
   * 
   * @param {Array} arr - 이벤트 데이터를 포함한 배열입니다.
   */
  setEvents(arr) {
    for (let i of arr) {
      // 각 이벤트 데이터를 CalendarEvent 인스턴스로 변환하여 배열에 추가합니다.
      this.push(new CalendarEvent(i));
    }
  }
}

/**
 * GoogleCalendar 클래스는 Google Calendar API와 상호작용하는 클래스입니다.
 */
const GoogleCalendar = function () {
  // Mother 클래스를 로드하고 인스턴스를 생성합니다.
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();  // Mother 클래스의 인스턴스를 this.mother에 할당합니다.
  this.dir = process.cwd() + "/apps/googleAPIs";  // Google API 관련 디렉토리 경로를 설정합니다.
  this.pythonApp = this.dir + "/python/app.py";  // Python 스크립트 경로를 설정합니다.
}

/**
 * Google Calendar ID를 반환하는 메서드입니다.
 * 
 * @returns {object} - 각 Google Calendar의 ID를 포함한 객체를 반환합니다.
 */
GoogleCalendar.prototype.returnCalendarIds = function () {
  // 캘린더 ID를 포함한 객체를 정의합니다.
  const obj = {
    photographing: "d5qo2jf12banfo2m66us9qhcp4@group.calendar.google.com",  // 촬영 일정 캘린더 ID
    designerMeeting: "gb87kl84fejja1h4gggh8in6gc@group.calendar.google.com",  // 디자이너 미팅 캘린더 ID
    newDesigner: "67t0gdlj7on3nnfmrnb69n9700@group.calendar.google.com",  // 신규 디자이너 캘린더 ID
    homeliaisonContents: "fiqo0dfple02l1ucajb827g9dg@group.calendar.google.com",  // 홈리에종 콘텐츠 캘린더 ID
  };
  return obj;  // 캘린더 ID 객체를 반환합니다.
}

/**
 * 주어진 버튼 값에 해당하는 Google Calendar ID를 반환하는 메서드입니다.
 * 
 * @param {string} button - 버튼 값에 해당하는 캘린더 ID를 조회합니다.
 * @returns {string} - 해당하는 Google Calendar ID를 반환합니다.
 */
GoogleCalendar.prototype.findCalendarId = function (button) {
  // Google Calendar ID를 포함한 객체를 반환하는 메서드를 호출합니다.
  const dictionary = this.returnCalendarIds();
  // 버튼 값에 해당하는 캘린더 ID를 반환합니다.
  return dictionary[button];
}

/**
 * GoogleCalendar 클래스에 일정(Schedule)을 추가하는 메서드입니다.
 * 주어진 파라미터를 사용하여 Google Calendar에 새로운 일정을 생성합니다.
 *
 * @param {string} to - 일정을 추가할 대상 캘린더의 키 값입니다.
 * @param {string} title - 일정의 제목입니다.
 * @param {string} description - 일정의 설명입니다.
 * @param {string|Date} start - 일정의 시작 시간입니다. 문자열 또는 Date 객체 형식입니다.
 * @param {string|Date|null} [end=null] - 일정의 종료 시간입니다. 문자열, Date 객체, 또는 null 형식입니다. 기본값은 null로, 이 경우 시작 시간과 동일하게 설정됩니다.
 * @param {boolean} [allDay=false] - 하루 종일 일정인지 여부를 나타냅니다. 기본값은 false입니다.
 * @returns {Promise<Object|null>} - 생성된 일정의 ID와 링크를 포함한 객체를 반환하거나, 오류가 발생하면 null을 반환합니다.
 */
GoogleCalendar.prototype.makeSchedule = async function (to, title, description, start, end = null, allDay = false) {
  // GoogleCalendar 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;
  
  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  // zeroAddition: 숫자를 두 자리 문자열로 변환하는 메서드
  // dateToString: Date 객체를 문자열로 변환하는 메서드
  const { pythonExecute, errorLog, zeroAddition, dateToString } = this.mother;
  
  try {
    let eventObj, runEvent;  // 이벤트 객체와 실행할 이벤트 데이터를 저장할 변수입니다.
    let finalStart, finalEnd;  // 최종적으로 사용할 시작 시간과 종료 시간을 저장할 변수입니다.
    let temp, temp2, temp3, tempObj;  // 임시 변수를 선언합니다.
    let res;  // API 응답 데이터를 저장할 변수입니다.

    // 종료 시간이 null 또는 undefined일 경우, 시작 시간과 동일하게 설정합니다.
    if (end === null || end === undefined) {
      end = start;
    }

    // 시작 시간이 문자열 형식인 경우 처리합니다.
    if (typeof start === "string") {
      if (start.length === 10) {  // 날짜만 포함된 문자열인 경우
        temp = start.split("-");  // 문자열을 '-'로 분리하여 배열로 만듭니다.
        tempObj = new Date(Number(temp[0]), (Number(temp[1]) - 1), Number(temp[2]));  // Date 객체로 변환합니다.
      } else {  // 시간까지 포함된 문자열인 경우
        temp = start.split(" ");  // 날짜와 시간을 분리합니다.
        temp2 = temp[0].split("-");  // 날짜 부분을 분리합니다.
        temp3 = temp[1].split(":");  // 시간 부분을 분리합니다.
        tempObj = new Date(Number(temp2[0]), (Number(temp2[1]) - 1), Number(temp2[2]), Number(temp3[0]), Number(temp3[1]), Number(temp3[2]));  // Date 객체로 변환합니다.
      }
      finalStart = JSON.stringify(tempObj).slice(1, -1);  // 최종 시작 시간을 문자열로 변환하여 저장합니다.
    } else if (typeof start === "object") {  // 시작 시간이 Date 객체인 경우
      finalStart = JSON.stringify(start).slice(1, -1);  // Date 객체를 문자열로 변환하여 저장합니다.
    }

    // 종료 시간이 문자열 형식인 경우 처리합니다.
    if (typeof end === "string") {
      if (end.length === 10) {  // 날짜만 포함된 문자열인 경우
        temp = end.split("-");  // 문자열을 '-'로 분리하여 배열로 만듭니다.
        tempObj = new Date(Number(temp[0]), (Number(temp[1]) - 1), Number(temp[2]));  // Date 객체로 변환합니다.
      } else {  // 시간까지 포함된 문자열인 경우
        temp = end.split(" ");  // 날짜와 시간을 분리합니다.
        temp2 = temp[0].split("-");  // 날짜 부분을 분리합니다.
        temp3 = temp[1].split(":");  // 시간 부분을 분리합니다.
        tempObj = new Date(Number(temp2[0]), (Number(temp2[1]) - 1), Number(temp2[2]), Number(temp3[0]), Number(temp3[1]), Number(temp3[2]));  // Date 객체로 변환합니다.
      }
      finalEnd = JSON.stringify(tempObj).slice(1, -1);  // 최종 종료 시간을 문자열로 변환하여 저장합니다.
    } else if (typeof end === "object") {  // 종료 시간이 Date 객체인 경우
      finalEnd = JSON.stringify(end).slice(1, -1);  // Date 객체를 문자열로 변환하여 저장합니다.
    }

    // 하루 종일 일정인지 여부에 따라 이벤트 객체를 구성합니다.
    if (!allDay) {
      // 하루 종일 일정이 아닌 경우, 날짜와 시간을 설정합니다.
      eventObj = {
        summary: title,  // 일정의 제목을 설정합니다.
        description: description,  // 일정의 설명을 설정합니다.
        start: {
          dateTime: finalStart,  // 시작 시간을 설정합니다.
          timeZone: 'Asia/Seoul',  // 시간대를 설정합니다.
        },
        end: {
          dateTime: finalEnd,  // 종료 시간을 설정합니다.
          timeZone: 'Asia/Seoul',  // 시간대를 설정합니다.
        },
        recurrence: [],  // 반복 설정을 초기화합니다.
        attendees: [],  // 참석자 목록을 초기화합니다.
        reminders: {
          useDefault: false,  // 기본 알림을 사용하지 않습니다.
          overrides: [],  // 사용자 정의 알림을 설정할 수 있는 배열을 초기화합니다.
        },
      };
    } else {
      // 하루 종일 일정인 경우, 날짜만 설정합니다.
      eventObj = {
        summary: title,  // 일정의 제목을 설정합니다.
        description: description,  // 일정의 설명을 설정합니다.
        start: {
          date: dateToString(new Date(finalStart)),  // 시작 날짜를 설정합니다.
          timeZone: 'Asia/Seoul',  // 시간대를 설정합니다.
        },
        end: {
          date: dateToString(new Date(finalEnd)),  // 종료 날짜를 설정합니다.
          timeZone: 'Asia/Seoul',  // 시간대를 설정합니다.
        },
        recurrence: [],  // 반복 설정을 초기화합니다.
        attendees: [],  // 참석자 목록을 초기화합니다.
        reminders: {
          useDefault: false,  // 기본 알림을 사용하지 않습니다.
          overrides: [],  // 사용자 정의 알림을 설정할 수 있는 배열을 초기화합니다.
        },
      };
    }

    // Python 스크립트를 실행하여 Google Calendar에 이벤트를 생성합니다.
    res = await pythonExecute(this.pythonApp, [ "calendar", "makeSchedule" ], { targetId: this.findCalendarId(to), body: eventObj });
    if (typeof res !== "object") {
      throw new Error(res);  // 결과가 객체가 아니면 오류를 발생시킵니다.
    }
    
    // 성공적으로 생성된 일정의 ID와 링크를 포함한 객체를 반환합니다.
    return {
      calendarId: instance.findCalendarId(to),
      id: res.id,
      link: res.link
    };

  } catch (e) {
    // 오류 발생 시 콘솔에 오류 메시지를 출력하고, null을 반환합니다.
    console.log(e);
    return null;
  }
}

/**
 * GoogleCalendar 클래스의 일정(Schedule)을 가져오는 메서드입니다.
 * 특정 캘린더에서 주어진 ID에 해당하는 일정을 조회합니다.
 *
 * @param {string} from - 일정을 조회할 대상 캘린더의 키 값입니다.
 * @param {string} id - 조회할 일정의 ID입니다.
 * @returns {Promise<CalendarEvent|null>} - 조회된 일정 객체를 반환하거나, 해당 일정이 없으면 null을 반환합니다.
 */
GoogleCalendar.prototype.getSchedule = async function (from, id) {
  // GoogleCalendar 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;
  
  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  const { pythonExecute, errorLog } = this.mother;

  try {
    let requestObj, resultObj;  // 요청 객체와 결과 객체를 저장할 변수입니다.
    let index;  // 조회된 일정 목록에서 해당 일정의 인덱스를 저장할 변수입니다.

    // Python 스크립트를 실행하여 특정 캘린더의 모든 이벤트를 조회합니다.
    const items = await pythonExecute(this.pythonApp, ["calendar", "listEvents"], { targetId: this.findCalendarId(from), query: "" });

    // 조회 결과가 배열이 아닌 경우, 에러를 발생시킵니다.
    if (!Array.isArray(items)) {
      throw new Error("google calendar error : python error(getSchedule) " + String(items));
    }

    // 조회된 일정 목록에서 주어진 ID와 일치하는 일정의 인덱스를 찾습니다.
    index = items.findIndex((obj) => { return obj.id === id });

    // 해당 일정이 없으면 null을 반환하고, 있으면 CalendarEvent 객체로 변환하여 반환합니다.
    if (index === -1) {
      return null;
    } else {
      return new CalendarEvent(items[index]);
    }

  } catch (e) {
    // 오류 발생 시 에러 로그를 기록하고, 콘솔에 오류 메시지를 출력한 후 null을 반환합니다.
    await errorLog(e);
    return null;
  }
}

/**
 * GoogleCalendar 클래스의 이벤트 목록을 조회하는 메서드입니다.
 * 특정 캘린더에서 주어진 검색어에 해당하는 모든 일정을 조회합니다.
 *
 * @param {string} from - 일정을 조회할 대상 캘린더의 키 값입니다.
 * @param {string|null} [search=null] - 일정 검색어입니다. 기본값은 null이며, 이 경우 모든 일정을 조회합니다.
 * @returns {Promise<CalendarEvents|Array>} - 조회된 일정 목록을 CalendarEvents 객체로 반환하거나, 오류가 발생하면 빈 배열을 반환합니다.
 */
GoogleCalendar.prototype.listEvents = async function (from, search = null) {
  // GoogleCalendar 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  const { pythonExecute, errorLog } = this.mother;

  try {
    let requestObj, resultObj;  // 요청 객체와 결과 객체를 저장할 변수입니다.

    // Python 스크립트를 실행하여 특정 캘린더에서 검색어에 해당하는 모든 일정을 조회합니다.
    const items = await pythonExecute(this.pythonApp, ["calendar", "listEvents"], {
      targetId: this.findCalendarId(from),  // 캘린더 ID를 조회합니다.
      query: search === null ? "" : search  // 검색어가 없으면 빈 문자열을 사용하고, 있으면 검색어를 사용합니다.
    });

    // 조회 결과가 배열이 아닌 경우, 에러를 발생시킵니다.
    if (!Array.isArray(items)) {
      throw new Error("google calendar error : python error(listEvents) " + String(items));
    }

    // CalendarEvents 객체를 생성하여 결과 객체에 할당합니다.
    resultObj = new CalendarEvents();
    if (items.length > 0) {
      // 조회된 일정 목록이 있을 경우, 각 일정을 CalendarEvent 객체로 변환하여 resultObj에 추가합니다.
      resultObj.setEvents(items);
    }
    
    // 최종적으로 일정 목록을 포함한 CalendarEvents 객체를 반환합니다.
    return resultObj;

  } catch (e) {
    // 오류 발생 시 에러 로그를 기록하고, 콘솔에 오류 메시지를 출력한 후 빈 배열을 반환합니다.
    await errorLog(e);
    return [];
  }
}

/**
 * GoogleCalendar 클래스의 과거가 아닌 이벤트 목록을 조회하는 메서드입니다.
 * 특정 캘린더에서 주어진 검색어에 해당하는 현재 및 미래의 일정을 조회합니다.
 *
 * @param {string} from - 일정을 조회할 대상 캘린더의 키 값입니다.
 * @param {string|null} [search=null] - 일정 검색어입니다. 기본값은 null이며, 이 경우 모든 현재 및 미래 일정을 조회합니다.
 * @returns {Promise<CalendarEvents|Array>} - 조회된 일정 목록을 CalendarEvents 객체로 반환하거나, 오류가 발생하면 빈 배열을 반환합니다.
 */
GoogleCalendar.prototype.listEventsNonePast = async function (from, search = null) {
  // GoogleCalendar 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  const { pythonExecute, errorLog } = this.mother;

  try {
    let requestObj, resultObj;  // 요청 객체와 결과 객체를 저장할 변수입니다.

    // Python 스크립트를 실행하여 특정 캘린더에서 현재 및 미래의 모든 일정을 조회합니다.
    const items = await pythonExecute(this.pythonApp, ["calendar", "listEventsNonePast"], {
      targetId: this.findCalendarId(from),  // 캘린더 ID를 조회합니다.
      query: search === null ? "" : search  // 검색어가 없으면 빈 문자열을 사용하고, 있으면 검색어를 사용합니다.
    });

    // 조회 결과가 배열이 아닌 경우, 오류 메시지를 출력하고 에러를 발생시킵니다.
    if (!Array.isArray(items)) {
      throw new Error("google calendar error : python error(listEvents) " + String(items));  // 오류 발생
    }

    // CalendarEvents 객체를 생성하여 결과 객체에 할당합니다.
    resultObj = new CalendarEvents();
    if (items.length > 0) {
      // 조회된 일정 목록이 있을 경우, 각 일정을 CalendarEvent 객체로 변환하여 resultObj에 추가합니다.
      resultObj.setEvents(items);
    }

    // 최종적으로 일정 목록을 포함한 CalendarEvents 객체를 반환합니다.
    return resultObj;

  } catch (e) {
    // 오류 발생 시 에러 로그를 기록하고, 콘솔에 오류 메시지를 출력한 후 빈 배열을 반환합니다.
    await errorLog(e);
    console.log(e);
    return [];
  }
}

/**
 * GoogleCalendar 클래스의 일정을 업데이트하는 메서드입니다.
 * 특정 캘린더에서 주어진 ID에 해당하는 일정을 업데이트합니다.
 *
 * @param {string} from - 일정을 업데이트할 대상 캘린더의 키 값입니다.
 * @param {string} id - 업데이트할 일정의 ID입니다.
 * @param {object} updateQuery - 업데이트할 일정 정보가 포함된 객체입니다.
 * @returns {Promise<Object|null>} - 업데이트된 일정의 결과를 반환하거나, 오류가 발생하면 null을 반환합니다.
 */
GoogleCalendar.prototype.updateSchedule = async function (from, id, updateQuery) {
  // GoogleCalendar 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  const { pythonExecute, errorLog } = this.mother;

  try {
    let queryObj;  // 요청 객체를 저장할 변수입니다.
    let startDate, endDate;  // 시작 날짜와 종료 날짜를 저장할 변수입니다.
    let res;  // Python 스크립트 실행 결과를 저장할 변수입니다.

    // 업데이트 쿼리에 종료 시간이 포함된 경우
    if (updateQuery.end !== undefined) {
      // 시작 날짜와 종료 날짜를 설정합니다. (시작/종료 시간에 12시간을 더해줍니다)
      startDate = new Date(updateQuery.start.getFullYear(), updateQuery.start.getMonth(), updateQuery.start.getDate(), updateQuery.start.getHours() + 12);
      endDate = new Date(updateQuery.end.getFullYear(), updateQuery.end.getMonth(), updateQuery.end.getDate(), updateQuery.end.getHours() + 12);
    } else {
      // 종료 시간이 없는 경우, 시작 시간만을 사용합니다.
      startDate = updateQuery.start;
      endDate = updateQuery.start;
    }

    // 요청 객체를 초기화합니다.
    queryObj = {};
    queryObj.start = {};
    queryObj.start.dateTime = startDate;  // 시작 시간을 요청 객체에 추가합니다.
    queryObj.end = {};
    queryObj.end.dateTime = endDate;  // 종료 시간을 요청 객체에 추가합니다.

    // 일정 제목을 요청 객체에 추가합니다.
    queryObj.summary = updateQuery.title;

    // Python 스크립트를 실행하여 일정을 업데이트합니다.
    res = await pythonExecute(this.pythonApp, ["calendar", "updateSchedule"], {
      targetId: this.findCalendarId(from),  // 캘린더 ID를 조회하여 추가합니다.
      eventId: id,  // 일정 ID를 추가합니다.
      body: queryObj  // 요청 객체를 추가합니다.
    });

    // 업데이트된 일정의 결과를 반환합니다.
    return res;

  } catch (e) {
    // 오류 발생 시 콘솔에 오류 메시지를 출력하고 null을 반환합니다.
    console.log(e);
    return null;
  }
}

/**
 * GoogleCalendar 클래스의 단일 또는 다수의 일정을 삭제하는 메서드입니다.
 * 특정 캘린더에서 주어진 ID에 해당하는 일정을 삭제합니다.
 *
 * @param {string} from - 일정을 삭제할 대상 캘린더의 키 값입니다.
 * @param {string|string[]} id - 삭제할 일정의 ID 또는 ID 배열입니다.
 * @returns {Promise<Object|undefined>} - 삭제 작업의 결과 메시지를 반환하거나, 오류가 발생하면 undefined를 반환합니다.
 */
GoogleCalendar.prototype.deleteSchedule = async function (from, id) {
  // GoogleCalendar 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  const { pythonExecute, errorLog } = this.mother;

  try {
    let res;  // 결과를 저장할 변수입니다.

    // ID가 배열인지 확인합니다.
    if (Array.isArray(id)) {
      // ID가 배열인 경우, 각 ID에 대해 일정 삭제 작업을 수행합니다.
      for (let i of id) {
        await pythonExecute(this.pythonApp, ["calendar", "deleteSchedule"], {
          targetId: this.findCalendarId(from),  // 캘린더 ID를 조회합니다.
          eventId: i  // 현재 일정 ID를 추가합니다.
        });
      }
      // 모든 일정 삭제 작업이 완료되면 완료 메시지를 설정합니다.
      res = { message: "done" };
    } else {
      // ID가 단일 문자열인 경우, 해당 일정만 삭제합니다.
      res = await pythonExecute(this.pythonApp, ["calendar", "deleteSchedule"], {
        targetId: this.findCalendarId(from),  // 캘린더 ID를 조회합니다.
        eventId: id  // 삭제할 일정 ID를 추가합니다.
      });
    }
    // 삭제 작업 결과를 반환합니다.
    return res;

  } catch (e) {
    // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    // 오류가 발생한 경우 undefined를 반환합니다.
  }
}

/**
 * GoogleCalendar 클래스의 여러 일정을 삭제하는 메서드입니다.
 * 특정 캘린더에서 주어진 ID 배열에 해당하는 모든 일정을 삭제합니다.
 *
 * @param {string} from - 일정을 삭제할 대상 캘린더의 키 값입니다.
 * @param {string[]} idArr - 삭제할 일정의 ID 배열입니다.
 * @returns {Promise<Object|undefined>} - 삭제 작업의 결과 메시지를 반환하거나, 오류가 발생하면 undefined를 반환합니다.
 */
GoogleCalendar.prototype.deleteSchedules = async function (from, idArr) {
  // GoogleCalendar 클래스의 인스턴스를 instance 변수에 할당하여 내부에서 참조할 수 있게 합니다.
  const instance = this;

  // Mother 클래스에서 제공하는 유틸리티 메서드를 destructuring으로 할당합니다.
  // pythonExecute: Python 스크립트를 실행하는 유틸리티 메서드
  // errorLog: 에러 로그를 기록하는 메서드
  const { pythonExecute, errorLog } = this.mother;

  try {
    let res;  // 결과를 저장할 변수입니다.

    // Python 스크립트를 실행하여 여러 일정을 삭제합니다.
    await pythonExecute(this.pythonApp, ["calendar", "deleteSchedules"], {
      targetId: this.findCalendarId(from),  // 캘린더 ID를 조회합니다.
      eventId: JSON.stringify(idArr)  // 삭제할 일정 ID 배열을 JSON 문자열로 변환하여 추가합니다.
    });

    // 모든 일정 삭제 작업이 완료되면 완료 메시지를 설정합니다.
    res = { message: "done" };

    // 삭제 작업 결과를 반환합니다.
    return res;

  } catch (e) {
    // 오류 발생 시 콘솔에 오류 메시지를 출력합니다.
    console.log(e);
    // 오류가 발생한 경우 undefined를 반환합니다.
  }
}

module.exports = GoogleCalendar;
