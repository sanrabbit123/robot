const AppleCalendar = function () {
  const Mother = require(process.cwd() + "/apps/mother.js");
  this.mother = new Mother();
}

AppleCalendar.prototype.calendarRead = async function (link) {
  if (typeof link !== "string") {
    throw new Error("invaild input");
  }
  const instance = this;
  const { requestSystem } = this.mother;
  try {
    const { data } = await requestSystem(link);
    const dataArr_raw = data.split("\n").map((s) => { return s.trim(); }).filter((s) => { return s !== '' });
    const firstUidIndex = dataArr_raw.findIndex((s) => { return /^UID/gi.test(s); });
    const dataArr = dataArr_raw.slice(firstUidIndex);
    let tong, tempArr;

    tong = [];
    tempArr = [];
    for (let str of dataArr) {
      if (/^UID/gi.test(str)) {
        tong.push(tempArr);
        tempArr = [];
      }
      tempArr.push(str);
    }

    tong = tong.filter((a) => { return Array.isArray(a); }).filter((a) => { return a.length > 0 }).map((arr) => {
      let obj, temp, index;
      obj = {};
      for (let i of arr) {
        index = i.split('').findIndex((a) => { return a === ":" });
        obj[i.slice(0, index)] = i.slice(index + 1);
      }
      return obj;
    }).map((obj) => {
      const toDate = (str) => {
        return new Date(Number(str.slice(0, 4)), Number(str.slice(4, 6)) - 1, Number(str.slice(6, 8)), Number(str.slice(8, 10)), Number(str.slice(10, 12)), Number(str.slice(12, 14)));
      }
      let keys, values;
      let map;
      let uidIndex, startIndex, endIndex;

      keys = Object.keys(obj);
      values = Object.values(obj).map((s) => { return s.trim(); });

      uidIndex = keys.findIndex((s) => { return /^UID/gi.test(s); });
      startIndex = keys.findIndex((s) => { return /^DTSTART/gi.test(s); });
      endIndex = keys.findIndex((s) => { return /^DTEND/gi.test(s); });

      map = {};
      map.uid = values[uidIndex];
      map.name = obj["SUMMARY"].trim().replace(/\\/gi, '');
      map.start = toDate(values[startIndex].replace(/[^0-9]/gi, ''));
      map.end = toDate(values[endIndex].replace(/[^0-9]/gi, ''));

      return map;
    });

    tong.sort((a, b) => { return a.start.valueOf() - b.start.valueOf(); });

    return tong;

  } catch (e) {
    console.log(e);
  }
}



module.exports = AppleCalendar;
