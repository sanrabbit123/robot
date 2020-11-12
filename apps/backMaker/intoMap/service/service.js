module.exports = function (tools) {
  const { map, Mother, Notion, Filters } = tools;
  const { emailFilter, dateFilter, selectionFilter, hypenFilter, emptyDate } = Filters;
  const EMPTYDATE = new Date(1800, 0, 1);
  const dateToNumberArr = function (str, detail = false) {
    let strArr, strArr2, strArr3;
    let year, month, date, hour, minute, second;
    if (!detail) {
      strArr = str.split("-");
      year = Number(strArr[0]);
      month = Number(strArr[1].replace(/^0/, '')) - 1;
      date = Number(strArr[2].replace(/^0/, ''));
      return [ year, month, date ];
    } else {
      strArr = str.split(' ');
      strArr2 = strArr[0].split("-");
      strArr3 = strArr[1].split(":");
      year = Number(strArr2[0]);
      month = Number(strArr2[1].replace(/^0/, '')) - 1;
      date = Number(strArr2[2].replace(/^0/, ''));
      hour = Number(strArr3[0].replace(/^0/, ''));
      minute = Number(strArr3[1].replace(/^0/, ''));
      second = Number(strArr3[2].replace(/^0/, ''));
      return [ year, month, date, hour, minute, second ];
    }
  }
  return async function (row) {
    try {
      let tempObj, tempObjDetail, tempObjDetail2;
      let tempArr;
      let totalTong;

      totalTong = [];

      return totalTong;

    } catch (e) {
      console.log(e);
    }
  }
}
