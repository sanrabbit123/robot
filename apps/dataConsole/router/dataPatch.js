const DataPatch = function () {
  const Mother = require(`${process.cwd()}/apps/mother.js`);
  this.mother = new Mother();
}

//TOOL ------------------------------------------------------------------------------------------

DataPatch.toolsDateFilter = function (value) {
  let filteredValue, temp, tempArr, today;

  if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
    filteredValue = "20" + value;
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
    today = new Date();
    filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));
  } else {
    filteredValue = value;
  }

  return filteredValue;
}

DataPatch.prototype.toolsDateFilter = function (value) {
  let filteredValue, temp, tempArr, today;

  if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
    filteredValue = "20" + value;
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
    tempArr = value.split("-");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
    tempArr = value.split(".");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
    tempArr = value.split("/");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(value)) {
    tempArr = value.split(" ");
    filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
  } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\-[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("-");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\.[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(".");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9]\/[0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split("/");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
  } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[0-9] [0-9]$/.test(value)) {
    today = new Date();
    temp = String(today.getFullYear());
    tempArr = value.split(" ");
    filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
  } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
    today = new Date();
    filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));
  } else {
    filteredValue = value;
  }

  return filteredValue;
}

DataPatch.prototype.toolsGrayLeftStandard = function (button) {
  let resultObj;
  resultObj = {};
  if (button === "client") {
    resultObj.targetColumn = "action";
    resultObj.barWidth = 239;
    resultObj.barLeft = 8;
    resultObj.updateWidth = 115;
    resultObj.columnIndent = 93;
    resultObj.secondWidth = 900;
    resultObj.secondLeft = 200;
    resultObj.secondUpdateWidth = 660;
  } else if (button === "designer") {
    resultObj.targetColumn = "status";
    resultObj.barWidth = 214;
    resultObj.barLeft = 8;
    resultObj.updateWidth = 115;
    resultObj.columnIndent = 96;
    resultObj.secondWidth = 900;
    resultObj.secondLeft = 200;
    resultObj.secondUpdateWidth = 660;
  } else if (button === "project") {
    resultObj.targetColumn = "designer";
    resultObj.barWidth = 211;
    resultObj.barLeft = 8;
    resultObj.updateWidth = 115;
    resultObj.columnIndent = 96;
    resultObj.secondWidth = 900;
    resultObj.secondLeft = 200;
    resultObj.secondUpdateWidth = 660;
  } else if (button === "contents") {
    resultObj.targetColumn = "rid";
    resultObj.barWidth = 211;
    resultObj.barLeft = 8;
    resultObj.updateWidth = 115;
    resultObj.columnIndent = 96;
    resultObj.secondWidth = 900;
    resultObj.secondLeft = 200;
    resultObj.secondUpdateWidth = 660;
  }
  return resultObj;
}

DataPatch.prototype.toolsDashboard = function (button) {
  let resultObj;

  resultObj = {};
  resultObj.vaildTargets = [
    "client",
    "project"
  ];

  switch (button) {
    case "client":
      resultObj.standardColumn = [ "status", "action" ];
      resultObj.titleStandard = "응대중";
      resultObj.buttons = [
        "1차 응대 예정",
        "1차 응대 후 대기",
        "선호 사진 대기",
        "제안 발송 예정",
        "제안 피드백 예정",
        "제안 피드백 완료",
        "계약금 안내",
        "연결 안 됨",
        "응대 종료",
        "해당 없음"
      ];
      break;
    case "project":
      resultObj.standardColumn = [ "status", "action" ];
      resultObj.titleStandard = "진행중";
      resultObj.buttons = [ "응대 대기", "현장 미팅", "1차 제안", "수정 제안", "시공 진행", "제품 구매", "배송중", "촬영 컨택", "촬영 대기", "사진 대기", "사진 공유", "컨텐츠 공유", "응대 종료", "해당 없음" ];
      break;
  }

  return resultObj;
}

//CLIENT ----------------------------------------------------------------------------------------

DataPatch.prototype.clientDropPoint = function () {
  return { column: "status", map: "requests.0.analytics.response.status", values: [ "드랍" ] };
}

DataPatch.prototype.clientRedPoint = function () {
  return { column: "status", map: "requests.0.analytics.response.status", values: [ "장기" ] };
}

DataPatch.prototype.clientStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    cliid: {
      name: "아이디",
      left: 35,
    },
    name: {
      name: "성함",
      left: 128,
    }
  };
  model.info = {
    status: {
      name: "상태",
      width: 50,
      left: 30,
    },
    action: {
      name: "응대",
      width: 115,
    },
    outreason: {
      name: "유출 이유",
      width: 100,
    },
    kakao: {
      name: "채널 등록",
      width: 100,
    },
    service: {
      name: "예상 서비스",
      width: 180,
    },
    next: {
      name: "전화 예정",
      width: 100,
    },
    callHistory: {
      name: "연락 기록",
      width: 100,
    },
    timeline: {
      name: "문의일",
      width: 100,
    },
    spacePicture: {
      name: "현장 사진",
      width: 100,
    },
    preferPicture: {
      name: "선호 사진",
      width: 100,
    },
    phone: {
      name: "연락처",
      width: 120,
    },
    email: {
      name: "이메일",
      width: 180,
    },
    budget: {
      name: "예산",
      width: 120,
    },
    address: {
      name: "주소",
      width: 250,
    },
    contract: {
      name: "계약 상태",
      width: 80,
    },
    pyeong: {
      name: "평수",
      width: 60,
    },
    living: {
      name: "거주중",
      width: 60,
    },
    precheck: {
      name: "사전 점검일",
      width: 100,
    },
    empty: {
      name: "집 비는 날",
      width: 100,
    },
    movein: {
      name: "입주 예정일",
      width: 100,
    },
    room: {
      name: "방",
      width: 60,
    },
    bathroom: {
      name: "화장실",
      width: 60,
    },
    valcony: {
      name: "발코니",
      width: 60,
    },
    family: {
      name: "가족 구성원",
      width: 150,
    },
    comment: {
      name: "요청 사항",
      width: 250,
    },
    channel: {
      name: "유입 채널",
      width: 100,
    }
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.clientCardViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "cliid",
    ],
    info: [
      "timeline",
      "phone",
    ],
    exceptionHeight: [
      false,
      false,
    ],
    division: [
      { name: "통화 전", },
      { name: "제안서 전", },
      { name: "제안서 후", },
      { name: "진행", },
      { name: "드랍", },
    ]
  };

  return targetColumns;
}

DataPatch.prototype.clientWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "cliid",
    ],
    info: [
      { name: "상태", target: "status" },
      { name: "응대", target: "action" },
      { name: "문의일", target: "timeline" },
      { name: "연락처", target: "phone" },
      { name: "이메일", target: "email" },
      { name: "채널 등록", target: "kakao" },
      { name: "현장 사진", target: "spacePicture" },
      { name: "선호 사진", target: "preferPicture" },
      { name: "사전 점검일", target: "precheck" },
      { name: "집 비는 날", target: "empty" },
      { name: "입주 예정일", target: "movein" },
      { name: "거주중", target: "living" },
      { name: "예상 서비스", target: "service" },
      { name: "예산", target: "budget" },
      { name: "주소", target: "address" },
      { name: "계약 상태", target: "contract" },
      { name: "평수", target: "pyeong" },
      { name: "방", target: "room" },
      { name: "화장실", target: "bathroom" },
      { name: "발코니", target: "valcony" },
      { name: "가족 구성원", target: "family" },
    ],
  };

  return targetColumns;
}

DataPatch.prototype.clientMap = function () {
  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ '드랍', '진행', '응대중', '장기' ];

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const statusInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ '드랍', '진행', '응대중', '장기' ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "진행") {
        window.location.href = window.location.protocol + "//" + window.location.host + "/" + "proposal" + "?cliid=" + input.parentElement.parentElement.className;
      } else {
        if (finalValue === "드랍") {
          grandMother.setAttribute("drop", "true");
        } else {
          grandMother.setAttribute("drop", "false");
        }
        input.style.transition = "0s all ease";
        input.style.color = "transparent";
        input.value = finalValue;
        input.parentElement.style.transition = "";
        input.parentElement.style.color = "inherit";
        mother.removeChild(document.querySelector(".divTong"));
        callback();
      }
    };

    inputArr = [ '드랍', '진행', '응대중', '장기' ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * (GeneralJs.isMac() ? 0.4 : 0.5)) + ea,
      height: String(height * (GeneralJs.isMac() ? 1.4 : 1.3)) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };

  const callHistoryToObject = function (value, pastValue, vaildMode) {
    const filter = function (value) {
      let filteredValue, temp, tempArr, today;

      if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
        filteredValue = "20" + value;
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
        today = new Date();
        filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));
      } else {
        filteredValue = value;
      }

      return filteredValue;
    };

    let arr = [];
    let filteredValue;
    let filteredArr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    temp = value.split(", ");
    for (let i of temp) {
      filteredValue = filter(i);
      filteredArr.push(filteredValue);
      if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(filteredValue)) {
        boo = true;
      }
    }

    if (!boo) {
      temp = filteredArr;
    } else {
      temp = pastValue.split(", ");
    }

    if (vaildMode) {
      return { boo: !boo, value: filteredArr.join(", ") };
    }

    if (temp[0] === '') {
      return [];
    }

    temp.reverse();

    for (let i of temp) {
      temp2 = i.split("-");
      obj = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '') - 1), Number(temp2[2].replace(/^0/, '')));
      arr.push({ date: obj, who: "" });
    }

    return arr;
  };
  const callHistoryInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;

    endEvent = function (e) {
      let inputs = this.parentElement.parentElement.querySelectorAll(".inputTarget");
      let totalString = '';
      for (let i = inputs.length - 1; i > -1; i--) {
        if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(inputs[i].value))) {
          totalString += DataPatch.toolsDateFilter(inputs[i].value);
          totalString += ", ";
        }
      }
      if (totalString.length > 0) {
        totalString = totalString.slice(0, -2);
      }
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "#2fa678",
      width: String(width) + ea,
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(0) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = length - 1; i > -1; i--) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i];
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    });
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const serviceToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    obj = {};

    if (/홈퍼/g.test(value)) {
      obj.serid = "s2011_aa01s";
    } else if (/홈스/g.test(value)) {
      obj.serid = "s2011_aa02s";
    } else if (/토탈/g.test(value)) {
      obj.serid = "s2011_aa03s";
    }

    if (/mini/gi.test(value)) {
      obj.xValue = 'M';
    } else if (/basic/gi.test(value)) {
      obj.xValue = 'B';
    } else if (/premium/gi.test(value)) {
      obj.xValue = 'P';
    }

    if (/온라인/gi.test(value)) {
      obj.online = true;
    } else {
      obj.online = false;
    }

    return obj;
  };
  const serviceInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let valuesTong;
    let originalValue;
    let online;

    originalValue = input.value;
    if (/온라인/gi.test(originalValue)) {
      online = "온라인";
    } else {
      online = "오프라인";
    }
    valuesTong = [
      [ online, "홈퍼니싱", "mini" ],
      [ online, "홈스타일링", "basic" ],
      [ online, "토탈 스타일링", "premium" ],
    ];

    endEvent = function (e) {
      let onoffLine;
      let inputs0 = document.querySelectorAll(".inputTargetOne");
      let inputs1 = document.querySelectorAll(".inputTargetTwo");
      let totalString = '';

      if (document.querySelector(".inputTargetZero").textContent === "온라인") {
        onoffLine = "온라인";
      } else {
        onoffLine = "오프라인";
      }

      for (let i = 0; i < inputs0.length; i++) {
        if (inputs0[i].getAttribute("switch") === "on") {
          totalString += inputs0[i].getAttribute("target");
          totalString += ' ';
        }
      }
      for (let i = 0; i < inputs1.length; i++) {
        if (inputs1[i].getAttribute("switch") === "on") {
          totalString += inputs1[i].getAttribute("target");
        }
      }

      totalString = onoffLine + " " + totalString;

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 60;
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        left: "calc(28% + " + String(Math.round((height) / 4) * 1) + ea + ")",
        top: String(0) + ea,
        width: "40%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(32% - " + String(Math.round((height) / 4) * 2) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("target", valuesTong[i][z]);
        input_clone.textContent = valuesTong[i][z];

        if (z !== 0) {
          if ((new RegExp(valuesTong[i][z], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = "#2fa678";
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const zeroClass = "inputTargetZero";
            const zIndex = z;
            const thisClass = this.className;
            const divTargets = document.querySelectorAll("." + thisClass.replace(/^input/, "div"));
            const inputTargets = document.querySelectorAll("." + thisClass);
            const zeroDivTargets = document.querySelectorAll("." + zeroClass.replace(/^input/, "div"));
            const zeroInputTargets = document.querySelectorAll("." + zeroClass);

            for (let dom of divTargets) {
              dom.style.background = "#2fa678";
            }

            for (let dom of inputTargets) {
              dom.style.color = "#ffffff";
              dom.setAttribute("switch", "off");
            }

            if (zIndex === 1) {
              for (let dom of zeroDivTargets) {
                dom.style.background = "#2fa678";
              }

              for (let dom of zeroInputTargets) {
                dom.style.color = "#ffffff";
                dom.setAttribute("switch", "off");
              }
            }

            this.parentElement.style.background = "#ececec";
            this.style.color = "#2fa678";

            if (zIndex === 1) {
              this.parentElement.previousElementSibling.style.background = "#ececec";
              this.parentElement.previousElementSibling.children[0].style.color = "#2fa678";
            }

            this.setAttribute("switch", "on");
          });
        } else {
          if ((new RegExp(valuesTong[i][1], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = "#2fa678";
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const thisClass = this.className;
            const inputTargets = document.querySelectorAll("." + thisClass);
            for (let dom of inputTargets) {
              if (dom.textContent === "오프라인") {
                dom.textContent = "온라인";
              } else {
                dom.textContent = "오프라인";
              }
            }
          });
        }

        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const map = {
    name: { name: "성함", position: "name", type: "string", searchBoo: true, },
    cliid: { name: "아이디", position: "cliid", type: "string", searchBoo: true, },
    phone: { name: "연락처", position: "phone", type: "string", searchBoo: true, },
    email: { name: "이메일", position: "email", type: "string", searchBoo: true, },
    timeline: { name: "문의일", position: "requests.0.request.timeline", type: "date", searchBoo: true, },
    budget: { name: "예산", position: "requests.0.request.budget", type: "string", items: [ "500만원 이하", "1,000만원", "1,500만원", "2,000만원", "2,500만원", "3,000만원", "3,500만원", "4,000만원", "4,500만원", "5,000만원 이상" ], searchBoo: true, },
    family: { name: "가족 구성원", position: "requests.0.request.family", type: "string", searchBoo: true, },
    address: { name: "주소", position: "requests.0.request.space.address", type: "string", address: true, searchBoo: true, },
    contract: { name: "계약 상태", position: "requests.0.request.space.contract", type: "string", items: [ "자가", "전월세" ], searchBoo: true, },
    pyeong: { name: "평수", position: "requests.0.request.space.pyeong", type: "number", searchBoo: true, },
    room: { name: "방", position: "requests.0.request.space.spec.room", type: "number", searchBoo: false, },
    bathroom: { name: "화장실", position: "requests.0.request.space.spec.bathroom", type: "number", searchBoo: false, },
    valcony: { name: "발코니", position: "requests.0.request.space.spec.valcony", type: "boolean", items: [ "true", "false" ], searchBoo: false, },
    living: { name: "거주중", position: "requests.0.request.space.resident.living", type: "boolean", items: [ "true", "false" ], searchBoo: false, },
    comment: { name: "요청 사항", position: "requests.0.request.etc.comment", type: "string", searchBoo: false, },
    channel: { name: "유입 채널", position: "requests.0.request.etc.channel", type: "string", searchBoo: true, },
    status: { name: "상태", position: "requests.0.analytics.response.status", type: "object", items: [ "드랍", "진행", "응대중", "장기" ], inputFunction: statusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    action: { name: "응대", position: "requests.0.analytics.response.action", type: "string", items: [
      "1차 응대 예정",
      "1차 응대 후 대기",
      "선호 사진 대기",
      "제안 발송 예정",
      "제안 피드백 예정",
      "제안 피드백 완료",
      "계약금 안내",
      "연결 안 됨",
      "응대 종료",
      "해당 없음",
    ], searchBoo: true, },
    outreason: { name: "유출 이유", position: "requests.0.analytics.response.outreason", type: "array", items: [
      '연결 안 됨',
      '가벼운 문의',
      '타사 계약',
      '비용 문제',
      '의견 조정 안 됨',
      '직접 진행',
      '고객 상황 변동',
      '기간 부적합',
      '디자인비 문제',
      '총 예산 문제',
      '서비스 불일치',
      '프로세스 문제',
      '시공 문제',
      '지역 이슈',
      '제안서 매력도',
      '디자이너 부족',
      '기타 문제'
    ], searchBoo: true, },
    kakao: { name: "채널 등록", position: "requests.0.analytics.response.kakao", type: "boolean", items: [ "등록", "미등록" ], searchBoo: false, },
    service: { name: "예상 서비스", position: "requests.0.analytics.response.service", type: "object", inputFunction: serviceInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: serviceToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    next: { name: "전화 예정일", position: "requests.0.analytics.date.call.next", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    callHistory: { name: "연락 기록", position: "requests.0.analytics.date.call.history", type: "object", inputFunction: callHistoryInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: callHistoryToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, },
    precheck: { name: "사전 점검일", position: "requests.0.analytics.date.space.precheck", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    empty: { name: "집 비는 날", position: "requests.0.analytics.date.space.empty", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    movein: { name: "입주 예정일", position: "requests.0.analytics.date.space.movein", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    spacePicture: { name: "현장 사진", position: "requests.0.analytics.picture.space.boo", type: "boolean", items: [ "제출", "미제출" ], searchBoo: false },
    preferPicture: { name: "선호 사진", position: "requests.0.analytics.picture.prefer.boo", type: "boolean", items: [ "제출", "미제출" ], searchBoo: false },
  };
  return map;
}

//DESIGNER --------------------------------------------------------------------------------------

DataPatch.prototype.designerDropPoint = function () {
  return { column: "status", map: "information.contract.status", values: [ "협약 해지" ] };
}

DataPatch.prototype.designerRedPoint = function () {
  return { column: "status", map: "information.contract.status", values: [ "신청 대기", "컨택중" ] };
}

DataPatch.prototype.designerStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    desid: {
      name: "아이디",
      left: 35,
    },
    designer: {
      name: "성함",
      left: 128,
    }
  };

  model.info = {
    did: {
      name: "별칭",
      width: 50,
      left: 30,
    },
    status: {
      name: "계약 상태",
      width: 80,
      left: 30,
    },
    date: {
      name: "계약일",
      width: 100,
    },
    phone: {
      name: "연락처",
      width: 120,
    },
    email: {
      name: "이메일",
      width: 180,
    },
    address: {
      name: "주소",
      width: 280,
    },
    showRoom: {
      name: "쇼룸",
      width: 80,
    },
    webPage: {
      name: "웹페이지",
      width: 300,
    },
    sns: {
      name: "SNS",
      width: 500,
    },
    career: {
      name: "경력",
      width: 80,
    },
    account: {
      name: "계좌번호",
      width: 250,
    },
    classification: {
      name: "사업자 분류",
      width: 120,
    },
    businessNumber: {
      name: "사업자 등록번호",
      width: 180,
    },
    files: {
      name: "파일 유무",
      width: 300,
    },
    percentage: {
      name: "수수료",
      width: 80,
    },
    partner: {
      name: "시공사",
      width: 120,
    },
    method: {
      name: "시공 방식",
      width: 120,
    },
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.designerCardViewStandard = function () {
  const targetColumns = {
    standard: [
      "designer",
      "desid",
    ],
    info: [],
    exceptionHeight: [],
  };

  return targetColumns;
}

DataPatch.prototype.designerWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "designer",
      "desid",
    ],
    info: [
      { name: "계약 상태", target: "status" },
      { name: "계약일", target: "date" },
      { name: "연락처", target: "phone" },
      { name: "이메일", target: "email" },
      { name: "주소", target: "address" },
      { name: "웹페이지", target: "webPage" },
      { name: "SNS", target: "sns" },
      { name: "경력", target: "career" },
      { name: "계좌번호", target: "account" },
      { name: "사업자 분류", target: "classification" },
      { name: "사업자 등록번호", target: "businessNumber" },
      { name: "파일 유무", target: "files" },
      { name: "수수료", target: "percentage" },
      { name: "시공사", target: "partner" },
      { name: "시공 방식", target: "method" },
    ],
  };

  return targetColumns;
}

DataPatch.prototype.designerMap = function () {
  const snsToObject = function (value, pastValue, vaildMode) {
    let arr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      for (let i of temp) {
        temp2 = i.split(" ");
        if (temp2.length !== 2) {
          boo = true;
        }
      }
    } else {
      temp2 = value.split(" ");
      if (temp2.length !== 2) {
        boo = true;
      }
    }

    if (value === '') {
      boo = false;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (value === '' || temp[0] === '') {
      return [];
    }

    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");
      obj.kind = temp2[0];
      obj.href = temp2[1];
      arr.push(obj);
    }

    return arr;
  };
  const snsInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetProperty");
      let inputs1 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        if (/^http/.test(inputs1[i].value)) {
          if (/유튜/g.test(inputs0[i].value) || /유트/g.test(inputs0[i].value) || /유투/g.test(inputs0[i].value) || /you/gi.test(inputs0[i].value) || /tube/gi.test(inputs0[i].value)) {
            totalString += "Youtube";
            totalString += " ";
          } else if (/인스타/g.test(inputs0[i].value) || /스타/g.test(inputs0[i].value) || /ins/g.test(inputs0[i].value) || /insta/gi.test(inputs0[i].value) || /gram/gi.test(inputs0[i].value)) {
            totalString += "Instagram";
            totalString += " ";
          } else if (/네이버/g.test(inputs0[i].value) || /블로그/g.test(inputs0[i].value) || /blog/g.test(inputs0[i].value) || /naver/gi.test(inputs0[i].value)) {
            totalString += "Naver";
            totalString += " ";
          } else {
            totalString += "etc";
            totalString += " ";
          }
          totalString += inputs1[i].value.trim().replace(/\/$/, '').replace(/[ \n\t]/g, '');
          totalString += " / ";
        }
      }
      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "550";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "16%",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    buttonDetailStyle1 = {
      position: "absolute",
      right: String(0) + ea,
      top: String(0) + ea,
      width: "calc(84% - " + String(Math.floor(height / 4)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetProperty");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      if (tempArr[0] !== undefined) {
        input_clone.value = tempArr[0];
      } else {
        input_clone.value = '';
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle1) {
        button_clone2.style[j] = buttonDetailStyle1[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetValue");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      if (tempArr[1] !== undefined) {
        input_clone.value = tempArr[1];
      } else {
        input_clone.value = '';
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, button_clone2;
      let input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetProperty");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle1) {
        button_clone2.style[j] = buttonDetailStyle1[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetValue");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      div_clone.appendChild(button_clone);
    });

    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const careerToObject = function (value, pastValue, vaildMode) {
    let obj = {};
    let boo = false;
    let temp;

    if (value.split(' ').length === 2) {
      boo = false;
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(' ');
    } else {
      temp = pastValue.split(' ');
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));

    if (Number.isNaN(obj.startY) || Number.isNaN(obj.startM)) {
      boo = true;
    }

    obj = {};

    if (!boo) {
      temp = value.split(' ');
    } else {
      temp = pastValue.split(' ');
    }

    obj.startY = Number(temp[0].replace(/년/g, '').replace(/[^0-9\.\-]/g, ''));
    obj.startM = Number(temp[1].replace(/월/g, '').replace(/[^0-9\.\-]/g, ''));

    return obj;
  };
  const careerInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';
      totalString = inputs0[0].value.replace(/[^0-9]/g, '') + "년 " + inputs0[1].value.replace(/[^0-9]/g, '') + "월";
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "100";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "100" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "100" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "60%",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    buttonDetailStyle1 = {
      position: "absolute",
      right: String(0) + ea,
      top: String(0) + ea,
      width: "calc(40% - " + String(Math.floor(height / 4)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetValue");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i].replace(/[^0-9]/g, '');
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle1) {
        button_clone2.style[j] = buttonDetailStyle1[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = ([ "년", "월" ])[i];
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const accountToObject = function (value, pastValue, vaildMode) {
    let arr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      for (let i of temp) {
        temp2 = i.split(" ");
        if (temp2.length !== 3) {
          boo = true;
        }
      }
    } else {
      temp2 = value.split(" ");
      if (temp2.length !== 3) {
        boo = true;
      }
    }

    if (value === '') {
      boo = false;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (value === '' || temp[0] === '') {
      return [];
    }

    for (let i of temp) {
      obj = {};
      temp2 = i.split(" ");
      obj.bankName = temp2[0];
      obj.accountNumber = temp2[1];
      obj.to = temp2[2];
      arr.push(obj);
    }

    return arr;
  };
  const accountInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetBank");
      let inputs1 = document.querySelectorAll(".inputTargetAccount");
      let inputs2 = document.querySelectorAll(".inputTargetTo");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        totalString += inputs0[i].value.replace(/은행/g, '');
        totalString += ' ';
        totalString += inputs1[i].value;
        totalString += ' ';
        totalString += inputs2[i].value;
        totalString += ' / ';
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "22%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        left: "calc(22% + " + String(Math.round(height / 4)) + ea + ")",
        top: String(0) + ea,
        width: "calc(54% - " + String(Math.round((height * 2) / 4) + 1) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "24%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Bank", "Account", "To" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (tempArr[z] !== undefined) {
          input_clone.value = tempArr[z];
        } else {
          input_clone.value = '';
        }
        input_clone.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
        });
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, button_clone2;
      let input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Bank", "Account", "To" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.addEventListener("contextmenu", function (e) {
          e.preventDefault();
          this.parentElement.parentElement.parentElement.removeChild(this.parentElement.parentElement);
        });
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    });

    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const filesToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;
    let target = [
      "businessRegistration",
      "bankBook",
      "registrationCard",
    ];

    temp = value.split(" / ");
    if (temp.length !== 3) {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj = {};
    for (let i = 0; i < target.length; i++) {
      obj[target[i]] = /유/gi.test(temp[i]) ? true : false;
    }

    return obj;
  };
  const filesInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetBoolean");
      let totalString = '';

      for (let i = 0; i < 3; i++) {
        totalString += ([ "사업자등록증", "통장사본", "신분증사본" ])[i];
        totalString += ' ';
        if (/유/g.test(inputs0[i].value)) {
          totalString += "유";
        } else {
          totalString += "무";
        }
        totalString += ' / ';
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "200";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "200" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "200" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "80%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(20% - " + String(Math.round(height / 4)) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 2; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Name", "Boolean" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (z !== 1) {
          input_clone.value = tempArr[z];
        } else {
          tempArr.shift();
          input_clone.value = tempArr.join("");
        }
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ "협약 완료", "협약 해지", "신청 대기", "컨택중" ];

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const statusInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ "협약 완료", "협약 해지", "신청 대기", "컨택중" ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "협약 해지") {
        grandMother.setAttribute("drop", "true");
      } else {
        grandMother.setAttribute("drop", "false");
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ "협약 완료", "협약 해지", "신청 대기", "컨택중" ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };

  const map = {
    designer: { name: "성함", position: "designer", type: "string", searchBoo: true, },
    desid: { name: "아이디", position: "desid", type: "string", searchBoo: true, },
    did: { name: "별칭", position: "information.did", type: "string", searchBoo: true, },
    status: { name: "계약 상태", position: "information.contract.status", type: "object", items: [ "협약 완료", "협약 해지", "신청 대기", "컨택중" ], inputFunction: statusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    date: { name: "계약일", position: "information.contract.date", type: "date", searchBoo: true, },
    phone: { name: "연락처", position: "information.phone", type: "string", searchBoo: true, },
    email: { name: "이메일", position: "information.email", type: "string", searchBoo: true, },
    address: { name: "주소", position: "information.address", type: "array", address: true, searchBoo: true, },
    showRoom: { name: "쇼룸", position: "information.personalSystem.showRoom", type: "boolean", items: [ "true", "false" ], searchBoo: true, },
    webPage: { name: "웹페이지", position: "information.personalSystem.webPage", type: "array", searchBoo: true, },
    sns: { name: "SNS", position: "information.personalSystem.sns", type: "object", inputFunction: snsInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: snsToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    career: { name: "경력", position: "information.business.career", type: "object", inputFunction: careerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: careerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    account: { name: "계좌번호", position: "information.business.account", type: "object", inputFunction: accountInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    classification: { name: "사업자 분류", position: "information.business.businessInfo.classification", items: [ "법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서" ], type: "string", searchBoo: true, },
    businessNumber: { name: "사업자 등록번호", position: "information.business.businessInfo.businessNumber", type: "string", searchBoo: true, },
    files: { name: "파일 유무", position: "information.business.businessInfo.files", type: "object", inputFunction: filesInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: filesToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    percentage: { name: "수수료", position: "information.business.service.cost.percentage", type: "number", searchBoo: true, },
    partner: { name: "시공사", position: "information.business.service.construct.partner", type: "string", searchBoo: true, },
    method: { name: "시공 방식", position: "information.business.service.construct.method", type: "string", searchBoo: true, },
  };
  return map;
}

DataPatch.prototype.designerRawMap = function () {
  const dictionary = {
    partnership: { name: "partnership", db: "designerPartnershipRaw", kakao: "designerPartnership", opposite: "presentation", oppositeDb: "designerPresentationRaw" },
    presentation: { name: "presentation", db: "designerPresentationRaw", kakao: "designerPresentation", opposite: "partnership", oppositeDb: "designerPartnershipRaw" }
  };
  let portfolioBooArr, updateStandard, alarmStandard, binaryStandard, dbNameMap, titleNameMap, columnRelativeMap, cardViewMap, reportTargetMap, sameStandard, editables, cloudLinkTargets;

  portfolioBooArr = new Array();
  portfolioBooArr.push("portfolioBoo");
  portfolioBooArr.flatColumnName = "portfolioConfirms";
  portfolioBooArr.standardColumnName = "portfolioBoo";
  portfolioBooArr.standardColumnValue = "제출";

  updateStandard = "phone";

  alarmStandard = {
    total: {
      standard: "status",
      value: [ "조정중", "조정 필요" ],
      target: [ "designer", "status" ],
      convertValue: "미팅 대기",
      trigger: "meetingTime",
    },
    presentation: {
      standard: "status",
      value: [ "조정중", "조정 필요" ],
      target: [ "designer", "status" ],
      convertValue: "미팅 대기",
      trigger: "presentationTimes",
    },
    partnership: {
      standard: "status",
      value: [ "조정중", "조정 필요" ],
      target: [ "designer", "status" ],
      convertValue: "미팅 대기",
      trigger: "meetingTime",
    }
  };

  binaryStandard = {
    dbName: "designerPortfolioRaw",
    name: "binary",
    target: "folderId",
  };

  dbNameMap = {
    total: "custom",
    presentation: "designerPresentationRaw",
    partnership: "designerPartnershipRaw",
  };

  titleNameMap = {
    total: "디자이너 신청",
    presentation: "설명회 신청",
    partnership: "파트너십 신청",
  };

  columnRelativeMap = {
    total: {
      designer : { name: "성함", relative: 100, type: "string", sort: "string" },
      phone : { name: "연락처", relative: 100, type: "string", sort: "number" },
      status : { name: "상태", relative: 100, type: "string", sort: "string" },
      meetingTime : { name: "미팅 시간", relative: 120, type: "string", sort: "number" },
      date : { name: "최초 문의일", relative: 150, type: "date", sort: "date" },
      presentationBoo: { name: "설명회", relative: 85, type: "string", sort: "string" },
      partnershipBoo: { name: "파트너십", relative: 85, type: "string", sort: "string" },
      portfolioBoo: { name: "포트폴리오", relative: 85, type: "string", sort: "string" },
      comeFrom : { name: "유입 경로", relative: 120, type: "string", sort: "string" },
      email : { name: "이메일", relative: 160, type: "string", sort: "string" },
      address : { name: "주소", relative: 360, type: "string", sort: "string" },
      webChannel : { name: "홈페이지", relative: 300, type: "array", sort: "string" },
      snsChannel : { name: "SNS", relative: 300, type: "array", sort: "string" },
      cloudChannel : { name: "클라우드", relative: 300, type: "array", sort: "string" },
      classification : { name: "사업자 분류", relative: 160, type: "string", sort: "string" },
      company : { name: "회사명", relative: 120, type: "string", sort: "string" },
      businessNumber : { name: "사업자 등록 번호", relative: 120, type: "string", sort: "number" },
      startDate : { name: "개업일", relative: 120, type: "string", sort: "date" },
      representative : { name: "대표자 성함", relative: 100, type: "string", sort: "string" },
      bankName : { name: "은행명", relative: 100, type: "string", sort: "string" },
      bankAccount : { name: "계좌번호", relative: 160, type: "string", sort: "number" },
      bankTo : { name: "수신자", relative: 100, type: "string", sort: "string" },
      bankEtc : { name: "기타 사항", relative: 120, type: "string", sort: "string" },
      interiorCareer : { name: "인테리어 경력", relative: 120, type: "string", sort: "career" },
      stylingCareer : { name: "스타일링 경력", relative: 120, type: "string", sort: "career" },
      careerDetail : { name: "경력 상세", relative: 540, type: "string", sort: "string" },
    },
    presentation: {
      designer : { name: "성함", relative: 100, type: "string", sort: "string" },
      phone : { name: "연락처", relative: 100, type: "string", sort: "number" },
      status : { name: "상태", relative: 100, type: "string", sort: "string" },
      presentationTimes : { name: "참석 시간", relative: 160, type: "string", sort: "number" },
      address : { name: "주소", relative: 360, type: "string", sort: "string" },
      email : { name: "이메일", relative: 160, type: "string", sort: "string" },
      date : { name: "문의일", relative: 180, type: "date", sort: "date" },
      comeFrom : { name: "유입 경로", relative: 100, type: "string", sort: "string" },
      webChannel : { name: "홈페이지", relative: 300, type: "array", sort: "string" },
      snsChannel : { name: "SNS", relative: 300, type: "array", sort: "string" },
      cloudChannel : { name: "클라우드", relative: 300, type: "array", sort: "string" },
    },
    partnership: {
      designer : { name: "성함", relative: 100, type: "string", sort: "string" },
      phone : { name: "연락처", relative: 100, type: "string", sort: "number" },
      status : { name: "상태", relative: 100, type: "string", sort: "string" },
      meetingTime : { name: "미팅 시간", relative: 160, type: "string", sort: "number" },
      address : { name: "주소", relative: 360, type: "string", sort: "string" },
      email : { name: "이메일", relative: 160, type: "string", sort: "string" },
      date : { name: "문의일", relative: 160, type: "date", sort: "date" },
      classification : { name: "사업자 분류", relative: 160, type: "string", sort: "string" },
      company : { name: "회사명", relative: 120, type: "string", sort: "string" },
      businessNumber : { name: "사업자 등록 번호", relative: 120, type: "string", sort: "number" },
      startDate : { name: "개업일", relative: 120, type: "string", sort: "date" },
      representative : { name: "대표자 성함", relative: 100, type: "string", sort: "string" },
      bankName : { name: "은행명", relative: 100, type: "string", sort: "string" },
      bankAccount : { name: "계좌번호", relative: 160, type: "string", sort: "number" },
      bankTo : { name: "수신자", relative: 100, type: "string", sort: "string" },
      bankEtc : { name: "기타 사항", relative: 120, type: "string", sort: "string" },
      interiorCareer : { name: "인테리어 경력", relative: 120, type: "string", sort: "career" },
      stylingCareer : { name: "스타일링 경력", relative: 120, type: "string", sort: "career" },
      careerDetail : { name: "경력 상세", relative: 540, type: "string", sort: "string" },
      webChannel : { name: "홈페이지", relative: 300, type: "array", sort: "string" },
      snsChannel : { name: "SNS", relative: 300, type: "array", sort: "string" },
      cloudChannel : { name: "클라우드", relative: 300, type: "array", sort: "string" },
      comeFrom : { name: "유입 경로", relative: 120, type: "string", sort: "string" },
    }
  };

  cardViewMap = {
    total: [
      { column: "meetingTime", },
      { column: "email", },
      { column: "classification", },
      { column: "bankName", complex: [ "bankAccount", "bankTo" ] },
      { column: "company", complex: [ "businessNumber" ] },
      { column: "interiorCareer", },
      { column: "stylingCareer", },
      { column: "careerDetail", },
      { column: "webChannel", },
      { column: "snsChannel", },
      { column: "comeFrom", },
      { column: "date", },
    ],
    presentation: [
      { column: "presentationTimes", },
      { column: "email", },
      { column: "address", },
      { column: "comeFrom", },
      { column: "date", },
      { column: "webChannel", },
      { column: "snsChannel", },
    ],
    partnership: [
      { column: "email", },
      { column: "classification", },
      { column: "bankName", complex: [ "bankAccount", "bankTo" ] },
      { column: "company", complex: [ "businessNumber" ] },
      { column: "interiorCareer", },
      { column: "stylingCareer", },
      { column: "careerDetail", },
      { column: "webChannel", },
      { column: "snsChannel", },
      { column: "comeFrom", },
      { column: "date", },
    ]
  };

  reportTargetMap = {
    total: [
      "meetingTime",
    ],
    presentation: [
      "presentationTimes",
      "comeFrom"
    ],
    partnership: [
      "classification",
      "comeFrom"
    ]
  };

  sameStandard = {
    name: "relation",
    value: "phone"
  };

  editables = {
    status: function () {
      const stringToItems = function (str) {
        if (/정중/gi.test(str)) {
          return "조정중";
        } else if (/필요/gi.test(str)) {
          return "조정 필요";
        } else if (/대기/gi.test(str)) {
          return "미팅 대기";
        } else if (/완료/gi.test(str)) {
          return "미팅 완료";
        } else {
          return "알 수 없음";
        }
      };
      const items = function () {
        return [
          "조정중",
          "조정 필요",
          "미팅 대기",
          "미팅 완료",
          "계약서 발송",
          "계약 합의중",
          "계약 완료",
          "메뉴얼 발송",
          "드랍"
        ];
      };
      return { type: "menu", thisColumnName: "status", inputFunction: stringToItems, outputFunction: items };
    },
    presentationTimes: function () {
      const dayConvert = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ];
      const dateToString = function (dateObject) {
        return `${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일 ${dayConvert[dateObject.getDay()]} 14시`;
      };
      const stringToDate = function (str) {
        const today = new Date();
        let result, tempArr;

        if (str !== "기타" && !/^개별/gi.test(str)) {
          tempArr = str.split(' ');
          result = new Date(today.getFullYear(), Number(tempArr[0].replace(/[^0-9]/gi, '')) - 1, Number(tempArr[1].replace(/[^0-9]/gi, '')));
          return result;
        } else {
          return new Date();
        }

      };
      return { type: "calendar", thisColumnName: "presentationTimes", inputFunction: stringToDate, outputFunction: dateToString };
    },
    meetingTime: function () {
      const dayConvert = [
        "일요일",
        "월요일",
        "화요일",
        "수요일",
        "목요일",
        "금요일",
        "토요일"
      ];
      const dateToString = function (dateObject) {
        return `${String(dateObject.getMonth() + 1)}월 ${String(dateObject.getDate())}일 ${dayConvert[dateObject.getDay()]} 14시`;
      };
      const stringToDate = function (str) {
        const today = new Date();
        let result, tempArr;

        if (str !== "기타" && !/^개별/gi.test(str)) {
          tempArr = str.split(' ');
          result = new Date(today.getFullYear(), Number(tempArr[0].replace(/[^0-9]/gi, '')) - 1, Number(tempArr[1].replace(/[^0-9]/gi, '')));
          return result;
        } else {
          return new Date();
        }

      };
      return { type: "calendar", thisColumnName: "meetingTime", inputFunction: stringToDate, outputFunction: dateToString };
    },
  };

  cloudLinkTargets = [
    "snsChannel",
    "webChannel",
    "cloudChannel",
  ];

  return { portfolioBooArr, updateStandard, alarmStandard, binaryStandard, dbNameMap, titleNameMap, columnRelativeMap, cardViewMap, reportTargetMap, sameStandard, editables, cloudLinkTargets };
}

DataPatch.prototype.designerCheckList = function (valueObj = {}) {
  class CheckList extends Array {
    constructor(arr) {
      super();
      for (let i of arr) {
        this.push(i);
      }
    }
    search(column) {
      let result = null;
      for (let { items } of this) {
        for (let obj of items) {
          if (column === obj.column) {
            result = obj;
            break;
          }
        }
      }
      return result;
    }
  }
  class TendencyArray extends Array {
    search(column) {
      let result = null;
      for (let obj of this) {
        if (obj.column === column) {
          result = obj;
          break;
        }
      }
      return result;
    }
  }
  let base = [
    {
      name: "지역",
      column: "region",
      items: [
        {
          type: "string",
          multiple: true,
          name: "서비스 가능 지역",
          column: "available",
          position: function (items, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.region.available"] = items;
              return updateQuery;
            } else {
              return items.region.available;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "서울",
            "인천",
            "경기",
            "강원",
            "충청",
            "대전",
            "세종",
            "전라",
            "경상",
            "제주",
            "부산",
            "대구",
            "울산",
            "광주"
          ]
        },
        {
          type: "string",
          multiple: false,
          name: "이동 수단",
          column: "transportation",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.region.transportation"] = item;
              return updateQuery;
            } else {
              return [ item.region.transportation ];
            }
          },
          dependency: null,
          survey: true,
          items: [
            "자동차",
            "대중교통"
          ]
        },
      ]
    },
    {
      name: "프로젝트 운영",
      column: "project",
      items: [
        {
          type: "number",
          multiple: false,
          name: "1차 제안 소요 시간",
          column: "projectTimeFirst",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              if (/이상/gi.test(item)) {
                updateQuery["analytics.project.time.first"] = 28;
              } else {
                updateQuery["analytics.project.time.first"] = Number(item.replace(/[^0-9]/gi, '')) * 7;
              }
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if ((analytics.project.time.first / 7) > 3) {
                resultArr.push("3주 이상");
              } else {
                resultArr.push(String(analytics.project.time.first / 7) + "주일 이내");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "1주일 이내",
            "2주일 이내",
            "3주일 이내",
            "3주 이상"
          ]
        },
        {
          type: "number",
          multiple: false,
          name: "전체 제안 소요 시간 (디자인 제안 기준)",
          column: "projectTimeEntire",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              if (/이상/gi.test(item)) {
                updateQuery["analytics.project.time.entire"] = 120;
              } else {
                updateQuery["analytics.project.time.entire"] = Number(item.replace(/[^0-9]/gi, '')) * 30;
              }
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if ((analytics.project.time.entire / 30) > 3) {
                resultArr.push("3개월 이상");
              } else {
                resultArr.push(String(analytics.project.time.entire / 30) + "개월 이내");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "1개월 이내",
            "2개월 이내",
            "3개월 이내",
            "3개월 이상"
          ]
        },
        {
          type: "string",
          multiple: true,
          name: "페이퍼 워크",
          column: "paperWork",
          position: function (items, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.project.paperWork"] = items;
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = items;
              resultArr = analytics.project.paperWork;
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "도면",
            "3D",
            "컨셉 제안",
            "마감재 제안",
            "제품 리스트",
            "참고 이미지",
            "드로잉",
          ]
        },
      ]
    },
    {
      name: "시공",
      column: "construct",
      items: [
        {
          type: "number",
          multiple: false,
          name: "시공 능력",
          column: "constructLevel",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.construct.level"] = Number(item.replace(/[^0-9]/g, ''));
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              resultArr.push(String(analytics.construct.level) + "단계");
              return resultArr;
            }
          },
          dependency: null,
          survey: false,
          items: [
            "1단계",
            "2단계",
            "3단계"
          ]
        },
        {
          type: "boolean",
          multiple: false,
          name: "시공 감리 여부",
          column: "constructSupervision",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.construct.possible.supervision"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.construct.possible.supervision) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
        {
          type: "string",
          multiple: true,
          name: "시공 계약 방식",
          column: "constructContractMethod",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.construct.contract"] = item;
              return updateQuery;
            } else {
              let analytics;
              analytics = item;
              return analytics.construct.contract;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "직접 계약, 직접 감리",
            "직접 계약, 외주 감리",
            "협업사 계약",
            "공정별 연결"
          ]
        },
        {
          type: "boolean",
          multiple: false,
          name: "타 시공사 진행 가능 여부",
          column: "outsidePossible",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.construct.possible.others"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.construct.possible.others) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
      ]
    },
    {
      name: "스타일링",
      column: "styling",
      items: [
        {
          type: "number",
          multiple: false,
          name: "스타일링 능력",
          column: "stylingLevel",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.styling.level"] = Number(item.replace(/[^0-9]/g, ''));
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              resultArr.push(String(analytics.styling.level) + "단계");
              return resultArr;
            }
          },
          dependency: null,
          survey: false,
          items: [
            "1단계",
            "2단계",
            "3단계"
          ]
        },
        {
          type: "string",
          multiple: false,
          name: "스타일 제안 방식",
          column: "stylingMethod",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.styling.method"] = item;
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              resultArr.push(analytics.styling.method);
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "순차 제안",
            "한번에 제안"
          ]
        },
        {
          type: "object.multiple",
          multiple: true,
          name: "스타일 선호도",
          column: "stylingTendency",
          position: function (items, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              let motherStringConst, motherString;
              motherStringConst = "analytics.styling.tendency.style.";
              for (let { column, value } of items) {
                motherString = motherStringConst;
                motherString += column;
                updateQuery[motherString] = value;
              }
              return updateQuery;
            } else {
              let analytics, resultArr, tempObj;
              analytics = items;
              resultArr = new TendencyArray();
              for (let i in analytics.styling.tendency.style) {
                tempObj = {};
                tempObj.column = i;
                tempObj.value = analytics.styling.tendency.style[i];
                resultArr.push(tempObj);
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            {
              name: "모던",
              column: "modern",
              value: 10
            },
            {
              name: "클래식",
              column: "classic",
              value: 10
            },
            {
              name: "내추럴",
              column: "natural",
              value: 10
            },
            {
              name: "북유럽",
              column: "scandinavian",
              value: 10
            },
            {
              name: "빈티지",
              column: "vintage",
              value: 10
            },
            {
              name: "글램",
              column: "mixmatch",
              value: 10
            },
            {
              name: "동양",
              column: "oriental",
              value: 10
            },
            {
              name: "엑조틱",
              column: "exotic",
              value: 10
            },
          ]
        },
        {
          type: "object.multiple",
          multiple: true,
          name: "텍스처 선호도",
          column: "textureTendency",
          position: function (items, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              let motherStringConst, motherString;
              motherStringConst = "analytics.styling.tendency.texture.";
              for (let { column, value } of items) {
                motherString = motherStringConst;
                motherString += column;
                updateQuery[motherString] = value;
              }
              return updateQuery;
            } else {
              let analytics, resultArr, tempObj;
              analytics = items;
              resultArr = new TendencyArray();
              for (let i in analytics.styling.tendency.texture) {
                tempObj = {};
                tempObj.column = i;
                tempObj.value = analytics.styling.tendency.texture[i];
                resultArr.push(tempObj);
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            {
              name: "진한 우드",
              column: "darkWood",
              value: 10
            },
            {
              name: "연한 우드",
              column: "whiteWood",
              value: 10
            },
            {
              name: "도장",
              column: "coating",
              value: 10
            },
            {
              name: "금속",
              column: "metal",
              value: 10
            },
          ]
        },
        {
          type: "object.multiple",
          multiple: true,
          name: "컬러톤 선호도",
          column: "colorTendency",
          position: function (items, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              let motherStringConst, motherString;
              motherStringConst = "analytics.styling.tendency.color.";
              for (let { column, value } of items) {
                motherString = motherStringConst;
                motherString += column;
                updateQuery[motherString] = value;
              }
              return updateQuery;
            } else {
              let analytics, resultArr, tempObj;
              analytics = items;
              resultArr = new TendencyArray();
              for (let i in analytics.styling.tendency.color) {
                tempObj = {};
                tempObj.column = i;
                tempObj.value = analytics.styling.tendency.color[i];
                resultArr.push(tempObj);
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            {
              name: "진한 우드",
              column: "darkWood",
              value: 10
            },
            {
              name: "연한 우드",
              column: "whiteWood",
              value: 10
            },
            {
              name: "고대비",
              column: "highContrast",
              value: 10
            },
            {
              name: "비비드",
              column: "vivid",
              value: 10
            },
            {
              name: "화이트",
              column: "white",
              value: 10
            },
            {
              name: "모노톤",
              column: "mono",
              value: 10
            },
            {
              name: "밝은톤",
              column: "bright",
              value: 10
            },
            {
              name: "다크톤",
              column: "dark",
              value: 10
            },
          ]
        },
        {
          type: "object.singular",
          multiple: true,
          name: "밀도 선호도",
          column: "densityTendency",
          position: function (items, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              let motherStringConst, motherString;
              motherStringConst = "analytics.styling.tendency.density.";
              for (let { column, value } of items) {
                motherString = motherStringConst;
                motherString += column;
                updateQuery[motherString] = value;
              }
              return updateQuery;
            } else {
              let analytics, resultArr, tempObj;
              analytics = items;
              resultArr = new TendencyArray();
              for (let i in analytics.styling.tendency.density) {
                tempObj = {};
                tempObj.column = i;
                tempObj.value = analytics.styling.tendency.density[i];
                resultArr.push(tempObj);
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            {
              name: "맥시멈",
              column: "maximun",
              value: 10
            },
            {
              name: "미니멈",
              column: "minimum",
              value: 10
            }
          ]
        },
        {
          type: "boolean",
          multiple: false,
          name: "빌트인 가구 가능",
          column: "builtinAble",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.styling.furniture.builtin"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.styling.furniture.builtin) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
        {
          type: "boolean",
          multiple: false,
          name: "가구 제작 가능",
          column: "makeFurnitureAble",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.styling.furniture.design"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.styling.furniture.design) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
        {
          type: "boolean",
          multiple: false,
          name: "패브릭 직접 발주 가능",
          column: "makeFabricAble",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.styling.fabric.manufacture"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.styling.fabric.manufacture) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
        {
          type: "string",
          multiple: false,
          name: "패브릭 발주 방식",
          column: "makeFabricMethod",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.styling.fabric.method"] = item;
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              resultArr.push(analytics.styling.fabric.method);
              return resultArr;
            }
          },
          dependency: {
            mother: "makeFabricAble",
            includes: "no"
          },
          survey: true,
          items: [
            "업체 연결",
            "기성 제품 추천",
            "직접 제작"
          ]
        }
      ]
    },
    {
      name: "구매",
      column: "purchase",
      items: [
        {
          type: "boolean",
          multiple: false,
          name: "구매 대행 여부",
          column: "agenciesPossible",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.purchase.agencies"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.purchase.agencies) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
        {
          type: "boolean",
          multiple: false,
          name: "조립 및 설치 서비스 제공",
          column: "installPossible",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.purchase.setting.install"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.purchase.setting.install) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
        {
          type: "boolean",
          multiple: false,
          name: "정리수납 서비스 제공",
          column: "storagePossible",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.purchase.setting.storage"] = /yes/gi.test(item);
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              if (analytics.purchase.setting.storage) {
                resultArr.push("yes");
              } else {
                resultArr.push("no");
              }
              return resultArr;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "yes",
            "no"
          ]
        },
      ]
    },
    {
      name: "기타",
      column: "etc",
      items: [
        {
          type: "string",
          multiple: true,
          name: "가능한 고객 예산 운영 범위 (단위: 만원)",
          column: "operationBudget",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              let tempArr;
              let allTong;
              allTong = [];
              for (let i of item) {
                tempArr = i.split('-');
                for (let j = 0; j < tempArr.length; j++) {
                  if (tempArr[j].trim().replace(/[^0-9]/g, '').length > 0) {
                    allTong.push(Number(tempArr[j].trim().replace(/[^0-9]/g, '')) * 10000);
                  } else {
                    allTong.push(10000 * 10000);
                  }
                }
              }
              allTong.sort((a, b) => { return a - b; });
              updateQuery["analytics.etc.operationBudget.min"] = allTong[0];
              updateQuery["analytics.etc.operationBudget.max"] = allTong[allTong.length - 1];
              return updateQuery;
            } else {
              let analytics, resultArr, resultStr;
              analytics = item;
              const convertNumbers = function (min, max) {
                let items = [
                  "0 - 500",
                  "500 - 1000",
                  "1000 - 2000",
                  "2000 - 5000",
                  "5000 - 10000",
                ];
                let result = [], realResult = [];
                for (let i = 0; i < items.length; i++) {
                  if (min === (Number(items[i].split('-')[0].trim().replace(/[^0-9]/g, '')) * 10000)) {
                    result.push(items[i]);
                  }
                  if (max === (Number(items[i].split('-')[1].trim().replace(/[^0-9]/g, '')) * 10000)) {
                    result.push(items[i]);
                  }
                }
                result = Array.from(new Set(result));
                for (let i of result) {
                  if (i === "5000 - 10000") {
                    realResult.push("5000 -");
                  } else {
                    realResult.push(i);
                  }
                }
                return realResult;
              };
              return convertNumbers(analytics.etc.operationBudget.min, analytics.etc.operationBudget.max);
            }
          },
          dependency: null,
          survey: true,
          items: [
            "0 - 500",
            "500 - 1000",
            "1000 - 2000",
            "2000 - 5000",
            "5000 -",
          ]
        },
        {
          type: "string",
          multiple: true,
          name: "디자이너 개인 특징",
          column: "personality",
          position: function (items, reverse = false) {
            if (!reverse) {
              const itemsTong = [
                "고객 미팅 회수에 연연하지 않는 편",
                "현장(최초) 미팅 전 심도 있게 준비하는 편",
                "디자인 제안 속도가 상대적으로 빠른 편",
                "3D 요청시 유료 제공",
                "디자인 기획을 리드하는 편",
                "디자인 기획시 고객에게 맞추는 편",
                "조립 및 설치 서비스 무료 제공",
              ];
              let updateQuery = {};
              updateQuery["analytics.etc.personality"] = [];
              for (let i of itemsTong) {
                updateQuery["analytics.etc.personality"].push({ name: i, value: items.includes(i) });
              }
              return updateQuery;
            } else {
              let analytics = items;
              let result;
              result = [];
              for (let { name, value } of analytics.etc.personality) {
                if (value) {
                  result.push(name);
                }
              }
              return result;
            }
          },
          dependency: null,
          survey: true,
          items: [
            "고객 미팅 회수에 연연하지 않는 편",
            "현장(최초) 미팅 전 심도 있게 준비하는 편",
            "디자인 제안 속도가 상대적으로 빠른 편",
            "3D 요청시 유료 제공",
            "디자인 기획을 리드하는 편",
            "디자인 기획시 고객에게 맞추는 편",
            "조립 및 설치 서비스 무료 제공",
          ]
        },
        {
          type: "string",
          multiple: false,
          name: "홈리에종 관계",
          column: "relationship",
          position: function (item, reverse = false) {
            if (!reverse) {
              let updateQuery = {};
              updateQuery["analytics.etc.relation"] = item;
              return updateQuery;
            } else {
              let analytics, resultArr;
              analytics = item;
              resultArr = [];
              resultArr.push(analytics.etc.relation);
              return resultArr;
            }
          },
          dependency: null,
          survey: false,
          items: [
            "지속가능성 높음",
            "그냥 평범",
            "확인중",
            "좋지 않음"
          ]
        }
      ]
    }
  ];
  if (Object.keys(valueObj).length > 0) {
    for (let { items } of base) {
      for (let obj of items) {
        obj.value = obj.position(valueObj, true);
      }
    }
  } else {
    for (let { items } of base) {
      for (let obj of items) {
        obj.value = [];
      }
    }
  }
  return new CheckList(base);
};

//PROJECT ---------------------------------------------------------------------------------------

DataPatch.prototype.projectDropPoint = function () {
  return { column: "status", map: "process.status", values: [ "드랍" ] };
}

DataPatch.prototype.projectRedPoint = function () {
  return { column: "status", map: "process.status", values: [ "대기", "홀딩" ] };
}

DataPatch.prototype.projectStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    proid: {
      name: "아이디",
      left: 35,
    },
    name: {
      name: "성함",
      left: 128,
    }
  };

  model.info = {
    status: {
      name: "상태",
      width: 50,
      left: 30,
    },
    service: {
      name: "서비스",
      width: 180,
    },
    action: {
      name: "응대",
      width: 80,
    },
    meetingDate: {
      name: "1차 미팅",
      width: 170,
    },
    formDateFrom: {
      name: "시작일",
      width: 100,
    },
    formDateTo: {
      name: "종료일",
      width: 100,
    },
    contentsPhotoDate: {
      name: "촬영일",
      width: 100,
    },
    remainSupply: {
      name: "공급가",
      width: 100,
    },
    remainVat: {
      name: "VAT",
      width: 100,
    },
    remainConsumer: {
      name: "소비자가",
      width: 100,
    },
    firstAmount: {
      name: "계약금",
      width: 100,
    },
    firstDate: {
      name: "계약금 입금",
      width: 100,
    },
    firstInfo: {
      name: "계약금 정보",
      width: 300,
    },
    remainPure: {
      name: "잔금",
      width: 100,
    },
    remainDate: {
      name: "잔금 입금",
      width: 100,
    },
    remainInfo: {
      name: "잔금 정보",
      width: 300,
    },
    designer: {
      name: "디자이너",
      width: 80,
    },
    method: {
      name: "정산 방식",
      width: 100,
    },
    percentage: {
      name: "수수료",
      width: 80,
    },
    paymentsTotalAmount: {
      name: "정산 총금액",
      width: 100,
    },
    paymentsFirstAmount: {
      name: "디자이너 선금",
      width: 100,
    },
    paymentsFirstDate: {
      name: "선금 지급일",
      width: 100,
    },
    paymentsRemainAmount: {
      name: "디자이너 잔금",
      width: 100,
    },
    paymentsRemainDate: {
      name: "잔금 지급일",
      width: 100,
    },
    calculationInfo: {
      name: "정산 정보",
      width: 300,
    },
    next: {
      name: "전화 예정",
      width: 100,
    },
    callHistory: {
      name: "연락 기록",
      width: 100,
    },
    firstCancel: {
      name: "계약금 취소",
      width: 100,
    },
    firstRefund: {
      name: "계약금 환불액",
      width: 100,
    },
    remainCancel: {
      name: "잔금 취소",
      width: 100,
    },
    remainRefund: {
      name: "잔금 환불액",
      width: 100,
    },
    formDateCancel: {
      name: "계약 취소",
      width: 100,
    },
    paymentsFirstCancel: {
      name: "선금 환수일",
      width: 100,
    },
    paymentsFirstRefund: {
      name: "선금 환수액",
      width: 100,
    },
    paymentsRemainCancel: {
      name: "잔금 환수일",
      width: 100,
    },
    paymentsRemainRefund: {
      name: "잔금 환수액",
      width: 100,
    },
    photoStatus: {
      name: "촬영 상태",
      width: 100,
    },
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.projectCardViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "proid",
    ],
    info: [
      "designer",
      "remainDate",
    ],
    exceptionHeight: [
      false,
      false,
    ],
  };

  return targetColumns;
}

DataPatch.prototype.projectWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "proid",
    ],
    info: [
      { name: "진행 상태", target: "status" },
      { name: "서비스", target: "service" },
      { name: "계약금 입금", target: "firstDate" },
      { name: "계약금 정보", target: "firstInfo" },
      { name: "1차 미팅", target: "meetingDate" },
      { name: "잔금 입금", target: "remainDate" },
      { name: "공급가", target: "remainSupply" },
      { name: "소비자가", target: "remainConsumer" },
      { name: "잔금", target: "remainPure" },
      { name: "잔금 정보", target: "remainInfo" },
      { name: "계약", target: "formDateFrom",  subTargets: [ "formDateTo" ], subTitles: [ "시작일", "종료일" ] },
      { name: "정산 방식", target: "method" },
      { name: "수수료", target: "percentage" },
      { name: "정산 정보", target: "calculationInfo" },
      { name: "정산 총금액", target: "paymentsTotalAmount" },
      { name: "디자이너 선금", target: "paymentsFirstAmount" },
      { name: "선금 지급일", target: "paymentsFirstDate" },
      { name: "디자이너 잔금", target: "paymentsRemainAmount" },
      { name: "잔금 지급일", target: "paymentsRemainDate" },
      { name: "촬영", target: "contentsPhotoDate", subTargets: [ "photographer", "interviewer" ], subTitles: [ "촬영일", "작가", "인터뷰어" ] },
    ],
  };
  return targetColumns;
}

DataPatch.prototype.projectChainingTarget = function () {
  const methodFilter = function (supply, method, percentage) {
    let result, ratio, fee;

    if (typeof supply === "string") {
      supply = Number(supply.replace(/[^0-9\.\-]/g, ''));
    }
    fee = percentage / 100;

    if (/일반/gi.test(method)) {
      result = Math.round((supply * 1.1) * (1 - fee));
    } else if (/간이/gi.test(method)) {
      result = Math.round(supply * (1 - fee));
    } else if (/프리/gi.test(method)) {
      ratio = 0.967;
      result = Math.round((supply - (supply * fee)) * ratio);
    } else {
      console.log("사업자 일반으로 계산");
      result = Math.round((supply * 1.1) * (1 - fee));
    }

    return result;
  };

  const chainingMethods = {
    remainSupply: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let remainVat, remainConsumer, remainPure;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      remainVat = Math.round(value * 0.1);
      remainConsumer = Math.round(value * 1.1);
      remainPure = remainConsumer - Number(thisCase.firstAmount.replace(/[^0-9\.\-]/g, ''));

      paymentsTotalAmount = methodFilter(value, thisCase.method, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { remainVat, remainConsumer, remainPure, paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    remainVat: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let remainSupply, remainConsumer, remainPure;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      remainSupply = value * 10;
      remainConsumer = remainSupply + value;
      remainPure = remainConsumer - Number(thisCase.firstAmount.replace(/[^0-9\.\-]/g, ''));

      paymentsTotalAmount = methodFilter(value * 10, thisCase.method, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { remainSupply, remainConsumer, remainPure, paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    remainConsumer: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let remainSupply, remainVat, remainPure;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      remainVat = Math.round(value / 11);
      remainSupply = value - remainVat;
      remainPure = value - Number(thisCase.firstAmount.replace(/[^0-9\.\-]/g, ''));

      paymentsTotalAmount = methodFilter(remainSupply, thisCase.method, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { remainSupply, remainVat, remainPure, paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    remainPure: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let remainSupply, remainVat, remainConsumer;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      remainConsumer = value + Number(thisCase.firstAmount.replace(/[^0-9\.\-]/g, ''));
      remainVat = Math.round(remainConsumer / 11);
      remainSupply = remainConsumer - remainVat;

      paymentsTotalAmount = methodFilter(remainSupply, thisCase.method, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { remainSupply, remainVat, remainConsumer, paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    method: function (thisCase, value) {

      let resultObj;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      paymentsTotalAmount = methodFilter(thisCase.remainSupply, value, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    percentage: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      paymentsTotalAmount = methodFilter(thisCase.remainSupply, thisCase.method, value);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    paymentsTotalAmount: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let paymentsFirstAmount, paymentsRemainAmount;

      paymentsFirstAmount = Math.round(value / 2);
      paymentsRemainAmount = Math.round(value / 2);

      resultObj = { paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    paymentsFirstAmount: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let paymentsRemainAmount;

      paymentsRemainAmount = thisCase.paymentsTotalAmount - value;

      resultObj = { paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    paymentsRemainAmount: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let paymentsFirstAmount;

      paymentsFirstAmount = thisCase.paymentsTotalAmount - value;

      resultObj = { paymentsFirstAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
  };

  const chainingTargets = Object.keys(chainingMethods);

  return { chainingTargets, chainingMethods };
}

DataPatch.prototype.projectMap = function () {
  const accountToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      if (temp.length !== 3) {
        boo = true;
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj = {};
    obj.account = temp[0].replace(/^계좌번호/, '').trim();
    obj.to = temp[1].replace(/^수신자/, '').trim();
    obj.proof = temp[2].replace(/^증빙/, '').trim();

    return obj;
  };
  const accountInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetProperty");
      let inputs1 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        totalString += ([ "계좌번호", "수신자", "증빙" ])[i];
        totalString += ' ';
        totalString += inputs1[i].value.replace(/[ \n\t]/g, '');
        totalString += " / ";
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(72% - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 2; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Property", "Value" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (z !== 1) {
          input_clone.value = tempArr[z];
        } else {
          tempArr.shift();
          input_clone.value = tempArr.join("");
        }
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const methodToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      if (temp.length !== 3) {
        boo = true;
      }
    } else {
      boo = true;
    }

    if (!boo) {
      temp = value.split(" / ");
    } else {
      temp = pastValue.split(" / ");
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (temp[0] === '') {
      throw new Error("invaild value");
    }

    obj = {};
    obj.method = temp[0].replace(/^결제방법/, '').trim();
    obj.to = temp[1].replace(/^수신자/, '').trim();
    obj.proof = temp[2].replace(/^증빙/, '').trim();

    return obj;
  };
  const methodInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let tempArr;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetProperty");
      let inputs1 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';

      for (let i = 0; i < inputs0.length; i++) {
        totalString += ([ "결제방법", "수신자", "증빙" ])[i];
        totalString += ' ';
        totalString += inputs1[i].value.replace(/[ \n\t]/g, '');
        totalString += " / ";
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(72% - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      tempArr = inputArr[i].split(' ');

      for (let z = 0; z < 2; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.input.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Property", "Value" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }
        if (z !== 1) {
          input_clone.value = tempArr[z];
        } else {
          tempArr.shift();
          input_clone.value = tempArr.join("");
        }
        input_clone.addEventListener("keypress", function (e) {
          if (e.keyCode === 13) {
            endEvent.call(this, e);
          }
        });
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const serviceToObject = function (value, pastValue, vaildMode) {
    let obj;
    let temp;
    let boo = false;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    obj = {};

    if (/홈퍼/g.test(value)) {
      obj.serid = "s2011_aa01s";
    } else if (/홈스/g.test(value)) {
      obj.serid = "s2011_aa02s";
    } else if (/토탈/g.test(value)) {
      obj.serid = "s2011_aa03s";
    }

    if (/mini/gi.test(value)) {
      obj.xValue = 'M';
    } else if (/basic/gi.test(value)) {
      obj.xValue = 'B';
    } else if (/premium/gi.test(value)) {
      obj.xValue = 'P';
    }

    if (/온라인/gi.test(value)) {
      obj.online = true;
    } else {
      obj.online = false;
    }

    return obj;
  };
  const serviceInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let valuesTong;
    let originalValue;
    let online;

    originalValue = input.value;
    if (/온라인/gi.test(originalValue)) {
      online = "온라인";
    } else {
      online = "오프라인";
    }
    valuesTong = [
      [ online, "홈퍼니싱", "mini" ],
      [ online, "홈스타일링", "basic" ],
      [ online, "토탈 스타일링", "premium" ],
    ];

    endEvent = function (e) {
      let onoffLine;
      let inputs0 = document.querySelectorAll(".inputTargetOne");
      let inputs1 = document.querySelectorAll(".inputTargetTwo");
      let totalString = '';

      if (document.querySelector(".inputTargetZero").textContent === "온라인") {
        onoffLine = "온라인";
      } else {
        onoffLine = "오프라인";
      }

      for (let i = 0; i < inputs0.length; i++) {
        if (inputs0[i].getAttribute("switch") === "on") {
          totalString += inputs0[i].getAttribute("target");
          totalString += ' ';
        }
      }
      for (let i = 0; i < inputs1.length; i++) {
        if (inputs1[i].getAttribute("switch") === "on") {
          totalString += inputs1[i].getAttribute("target");
        }
      }

      totalString = onoffLine + " " + totalString;

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 60;
    if (width === '' || Number.isNaN(width)) {
      width = "300";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "300" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [
      {
        position: "absolute",
        left: String(0) + ea,
        top: String(0) + ea,
        width: "28%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        left: "calc(28% + " + String(Math.round((height) / 4) * 1) + ea + ")",
        top: String(0) + ea,
        width: "40%",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
      {
        position: "absolute",
        right: String(0) + ea,
        top: String(0) + ea,
        width: "calc(32% - " + String(Math.round((height) / 4) * 2) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      },
    ];

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < 3; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget" + ([ "Zero", "One", "Two" ])[z]);
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("target", valuesTong[i][z]);
        input_clone.textContent = valuesTong[i][z];

        if (z !== 0) {
          if ((new RegExp(valuesTong[i][z], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = "#2fa678";
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const zeroClass = "inputTargetZero";
            const zIndex = z;
            const thisClass = this.className;
            const divTargets = document.querySelectorAll("." + thisClass.replace(/^input/, "div"));
            const inputTargets = document.querySelectorAll("." + thisClass);
            const zeroDivTargets = document.querySelectorAll("." + zeroClass.replace(/^input/, "div"));
            const zeroInputTargets = document.querySelectorAll("." + zeroClass);

            for (let dom of divTargets) {
              dom.style.background = "#2fa678";
            }

            for (let dom of inputTargets) {
              dom.style.color = "#ffffff";
              dom.setAttribute("switch", "off");
            }

            if (zIndex === 1) {
              for (let dom of zeroDivTargets) {
                dom.style.background = "#2fa678";
              }

              for (let dom of zeroInputTargets) {
                dom.style.color = "#ffffff";
                dom.setAttribute("switch", "off");
              }
            }

            this.parentElement.style.background = "#ececec";
            this.style.color = "#2fa678";

            if (zIndex === 1) {
              this.parentElement.previousElementSibling.style.background = "#ececec";
              this.parentElement.previousElementSibling.children[0].style.color = "#2fa678";
            }

            this.setAttribute("switch", "on");
          });
        } else {
          if ((new RegExp(valuesTong[i][1], "gi")).test(originalValue)) {
            input_clone.setAttribute("switch", "on");
            button_clone2.style.background = "#ececec";
            input_clone.style.color = "#2fa678";
          } else {
            input_clone.setAttribute("switch", "off");
          }
          input_clone.addEventListener("click", function (e) {
            const thisClass = this.className;
            const inputTargets = document.querySelectorAll("." + thisClass);
            for (let dom of inputTargets) {
              if (dom.textContent === "오프라인") {
                dom.textContent = "온라인";
              } else {
                dom.textContent = "오프라인";
              }
            }
          });
        }

        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const designerToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValueObj, finalValue;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    finalValueObj = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.exec(value);
    if (finalValueObj === null) {
      finalValue = "";
    } else {
      finalValue = finalValueObj[0];
    }

    return finalValue;
  };
  const designerInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let count;
    let valuesTong;
    let toHtml;
    let originalValue;

    valuesTong = [];
    count = 4;
    tempArr = null;
    toHtml = function (designer, desid) {
      return designer + ' <b style="font-weight:200;font-size:11px;color:white">' + desid + '</b>';
    };
    for (let { designer, desid } of GeneralJs.stacks.allDesignerTong) {
      if (count < 4) {
        tempArr.push(toHtml(designer, desid));
        count++;
      } else {
        if (tempArr !== null) {
          valuesTong.push(tempArr);
        }
        tempArr = [];
        tempArr.push(toHtml(designer, desid));
        count = 0;
      }
    }
    if (Array.isArray(tempArr)) {
      if (tempArr.length > 0) {
        valuesTong.push(tempArr);
      }
    }

    originalValue = input.value;

    endEvent = function (e) {
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = this.getAttribute("target");
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 590;
    if (width === '' || Number.isNaN(width)) {
      width = "600";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: String(0) + ea,
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: String(0) + ea,
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [];
    for (let z = 0; z < 5; z++) {
      buttonDetailStyles.push({
        position: "absolute",
        left: String(20 * z) + '%',
        top: String(0) + ea,
        width: "calc(" + String(20) + '%' + " - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      });
    }

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < valuesTong[i].length; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget");
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("switch", "off");
        input_clone.setAttribute("target", valuesTong[i][z].replace(/\<[^\<\>]+\>/g, ''));
        input_clone.insertAdjacentHTML("beforeend", valuesTong[i][z]);
        input_clone.addEventListener("click", endEvent);
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };

  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ '대기', '진행중', '완료', '홀딩', '드랍' ];

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const statusInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ '대기', '진행중', '완료', '홀딩', '드랍' ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "홀딩" || finalValue === "드랍") {
        grandMother.setAttribute("drop", "true");
      } else {
        grandMother.setAttribute("drop", "false");
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ '대기', '진행중', '완료', '홀딩', '드랍' ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };

  const remainPureToObject = function (value, pastValue, vaildMode) {
    let result;
    let boo = false;
    let num;

    if (typeof value === "string") {
      num = Number(value.replace(/[^0-9\.\-]/g, ''));
    } else {
      num = value;
    }

    if (Number.isNaN(num)) {
      boo = true;
      if (typeof pastValue === "string") {
        result = Number(pastValue.replace(/[^0-9\.\-]/g, ''));
      } else {
        result = pastValue;
      }
    } else {
      boo = false;
      if (typeof value === "string") {
        result = Number(value.replace(/[^0-9\.\-]/g, ''));
      } else {
        result = value;
      }
    }

    if (vaildMode) {
      return { boo: !boo, value: result };
    }

    return Number(result + 330000);
  };

  const callHistoryToObject = function (value, pastValue, vaildMode) {
    const filter = function (value) {
      let filteredValue, temp, tempArr, today;

      if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/g.test(value)) {
        filteredValue = "20" + value;
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9][0-9]/g.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\-[0-9]\-[0-9]$/.test(value)) {
        tempArr = value.split("-");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9][0-9]/g.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9][0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\.[0-9]\.[0-9]$/.test(value)) {
        tempArr = value.split(".");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9][0-9]/g.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9][0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9]\/[0-9]\/[0-9]$/.test(value)) {
        tempArr = value.split("/");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = "20" + tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9][0-9]/g.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9][0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9][0-9][0-9] [0-9] [0-9]$/.test(value)) {
        tempArr = value.split(" ");
        filteredValue = tempArr[0] + '-' + '0' + tempArr[1] + '-' + '0' + tempArr[2];
      } else if (/^[0-9][0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\-[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\-[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("-");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\.[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\.[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(".");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9]\/[0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9]\/[0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split("/");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9] [0-9][0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + tempArr[1];
      } else if (/^[0-9][0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[0-9] [0-9]$/.test(value)) {
        today = new Date();
        temp = String(today.getFullYear());
        tempArr = value.split(" ");
        filteredValue = temp + '-' + '0' + tempArr[0] + '-' + '0' + tempArr[1];
      } else if (/^[ \/\.a-zA-Z]$/.test(value)) {
        today = new Date();
        filteredValue = String(today.getFullYear()) + '-' + ((today.getMonth() + 1 < 10) ? '0' + String(today.getMonth() + 1) : String(today.getMonth() + 1)) + '-' + ((today.getDate() < 10) ? '0' + String(today.getDate()) : String(today.getDate()));
      } else {
        filteredValue = value;
      }

      return filteredValue;
    };

    let arr = [];
    let filteredValue;
    let filteredArr = [];
    let obj;
    let temp, temp2;
    let boo = false;

    temp = value.split(", ");
    for (let i of temp) {
      filteredValue = filter(i);
      filteredArr.push(filteredValue);
      if (!/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]/.test(filteredValue)) {
        boo = true;
      }
    }

    if (!boo) {
      temp = filteredArr;
    } else {
      temp = pastValue.split(", ");
    }

    if (vaildMode) {
      return { boo: !boo, value: filteredArr.join(", ") };
    }

    if (temp[0] === '') {
      return [];
    }

    temp.reverse();

    for (let i of temp) {
      temp2 = i.split("-");
      obj = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '') - 1), Number(temp2[2].replace(/^0/, '')));
      arr.push({ date: obj, who: "" });
    }

    return arr;
  };
  const callHistoryInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;

    endEvent = function (e) {
      let inputs = this.parentElement.parentElement.querySelectorAll(".inputTarget");
      let totalString = '';
      for (let i = inputs.length - 1; i > -1; i--) {
        if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(inputs[i].value))) {
          totalString += DataPatch.toolsDateFilter(inputs[i].value);
          totalString += ", ";
        }
      }
      if (totalString.length > 0) {
        totalString = totalString.slice(0, -2);
      }
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "#2fa678",
      width: String(width) + ea,
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(5) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = length - 1; i > -1; i--) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i];
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone, input_clone;

      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    });
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const map = {
    proid: { name: "아이디", position: "proid", type: "string", searchBoo: true, },
    cliid: { name: "고객", position: "cliid", type: "string", searchBoo: true, },
    desid: { name: "디자이너", position: "desid", type: "string", searchBoo: true, },
    designer: { name: "디자이너", position: "desid", type: "object", inputFunction: designerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: designerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    service: { name: "서비스", position: "service", type: "object", inputFunction: serviceInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: serviceToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    status: { name: "진행 상태", position: "process.status", type: "object", items: [ '대기', '진행중', '완료', '홀딩', '드랍' ], inputFunction: statusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    action: { name: "응대", position: "process.action", type: "string", items: [ "응대 대기", "현장 미팅", "1차 제안", "수정 제안", "시공 진행", "제품 구매", "배송중", "촬영 컨택", "촬영 대기", "사진 대기", "사진 공유", "컨텐츠 공유", "응대 종료", "해당 없음" ], searchBoo: true, },
    next: { name: "전화 예정일", position: "process.call.next", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], },
    callHistory: { name: "연락 기록", position: "process.call.history", type: "object", inputFunction: callHistoryInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: callHistoryToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, },
    firstDate: { name: "계약금 입금", position: "process.contract.first.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    firstCancel: { name: "계약금 취소", position: "process.contract.first.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    firstAmount: { name: "계약금", position: "process.contract.first.calculation.amount", type: "number", searchBoo: true, moneyBoo: true },
    firstInfo: { name: "계약금 정보", position: "process.contract.first.calculation.info", type: "object", inputFunction: methodInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    firstRefund: { name: "계약금 환불액", position: "process.contract.first.calculation.refund", type: "number", searchBoo: true, moneyBoo: true },
    meetingDate: { name: "1차 미팅", position: "process.contract.meeting.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    remainDate: { name: "잔금 입금", position: "process.contract.remain.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    remainCancel: { name: "잔금 취소", position: "process.contract.remain.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    remainSupply: { name: "공급가", position: "process.contract.remain.calculation.amount.supply", type: "number", searchBoo: true, moneyBoo: true },
    remainVat: { name: "VAT", position: "process.contract.remain.calculation.amount.vat", type: "number", searchBoo: true, moneyBoo: true },
    remainConsumer: { name: "소비자가", position: "process.contract.remain.calculation.amount.consumer", type: "number", searchBoo: true, moneyBoo: true },
    remainPure: { name: "잔금", position: "process.contract.remain.calculation.amount.consumer", type: "object", objectFunction: remainPureToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, moneyBoo: true },
    remainInfo: { name: "잔금 정보", position: "process.contract.remain.calculation.info", type: "object", inputFunction: methodInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    remainRefund: { name: "계약금 환불액", position: "process.contract.remain.calculation.refund", type: "number", searchBoo: true, moneyBoo: true },
    formDateFrom: { name: "프로젝트 시작일", position: "process.contract.form.date.from", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    formDateTo: { name: "프로젝트 종료일", position: "process.contract.form.date.to", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    formDateCancel: { name: "계약 취소", position: "process.contract.form.date.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    method: { name: "정산 방식", position: "process.calculation.method", type: "string", items: [ "사업자(일반)", "사업자(간이)", "프리랜서" ], searchBoo: true, },
    percentage: { name: "수수료", position: "process.calculation.percentage", type: "number", searchBoo: true, },
    calculationInfo: { name: "정산 정보", position: "process.calculation.info", type: "object", inputFunction: accountInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    paymentsTotalAmount: { name: "정산 총금액", position: "process.calculation.payments.totalAmount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstAmount: { name: "디자이너 선금", position: "process.calculation.payments.first.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstDate: { name: "선금 지급일", position: "process.calculation.payments.first.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsFirstCancel: { name: "선금 환수일", position: "process.calculation.payments.first.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsFirstRefund: { name: "선금 환수액", position: "process.calculation.payments.first.refund", type: "number", searchBoo: true, moneyBoo: true },
    paymentsRemainAmount: { name: "디자이너 잔금", position: "process.calculation.payments.remain.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsRemainDate: { name: "잔금 지급일", position: "process.calculation.payments.remain.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsRemainCancel: { name: "잔금 환수일", position: "process.calculation.payments.remain.cancel", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    paymentsRemainRefund: { name: "잔금 환수액", position: "process.calculation.payments.remain.refund", type: "number", searchBoo: true, moneyBoo: true },
    photoStatus: { name: "촬영 상태", position: "contents.photo.status", type: "string", items: [ '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ], searchBoo: true, },
    contentsPhotoDate: { name: "촬영일", position: "contents.photo.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
  };
  return map;
}

//CONTENTS --------------------------------------------------------------------------------------

DataPatch.prototype.contentsStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    conid: {
      name: "아이디",
      left: 35,
    },
    pid: {
      name: "별칭",
      left: 128,
    },
  };
  model.info = {
    desid: {
      name: "디자이너",
      width: 90,
      left: 40,
    },
    rid: {
      name: "후기 별칭",
      width: 80,
    },
    portfolioDate: {
      name: "포트폴리오 발행일",
      width: 160,
    },
    reviewDate: {
      name: "고객후기 발행일",
      width: 160,
    },
    titleMain: {
      name: "포트폴리오 제목",
      width: 400,
    },
    titleSub: {
      name: "포트폴리오 부제목",
      width: 320,
    },
    reviewTitleMain: {
      name: "고객 후기 제목",
      width: 440,
    },
    reviewTitleSub: {
      name: "고객 후기 부제목",
      width: 280,
    },
    space: {
      name: "공간",
      width: 120,
    },
    pyeong: {
      name: "평수",
      width: 70,
    },
    region: {
      name: "지역",
      width: 120,
    },
    method: {
      name: "서비스 방식",
      width: 140,
    },
    color: {
      name: "컬러",
      width: 210,
    },
    photodae: {
      name: "대표사진",
      width: 80,
    },
    reviewPhotodae: {
      name: "리뷰사진",
      width: 80,
    },
    photosg: {
      name: "sg 상수",
      width: 80,
    },
    slide: {
      name: "슬라이드",
      width: 180,
    },
    tag: {
      name: "태그",
      width: 360,
    },
    service: {
      name: "서비스",
      width: 110,
    },
    key8: {
      name: "인기순 지수",
      width: 80,
    },
    key9: {
      name: "최근순 지수",
      width: 90,
    },
    order: {
      name: "순서 지수",
      width: 80,
    },
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.contentsCardViewStandard = function () {
  const targetColumns = {
    standard: [
      "pid",
      "conid",
    ],
    info: [
      "portfolioDate",
      "reviewDate",
    ],
    exceptionHeight: [
      false,
      false,
    ],
  };

  return targetColumns;
}

DataPatch.prototype.contentsWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "pid",
      "conid",
    ],
    info: [
      { name: "디자이너", target: "desid" },
      { name: "후기 별칭", target: "rid" },
      { name: "포트폴리오 발행일", target: "portfolioDate" },
      { name: "고객후기 발행일", target: "reviewDate" },
      { name: "포트폴리오 제목", target: "titleMain" },
      { name: "포트폴리오 부제목", target: "titleSub" },
      { name: "고객 후기 제목", target: "reviewTitleMain" },
      { name: "고객 후기 부제목", target: "reviewTitleSub" },
      { name: "공간", target: "space" },
      { name: "평수", target: "pyeong" },
      { name: "지역", target: "region" },
      { name: "서비스 방식", target: "method" },
      { name: "컬러", target: "color" },
      { name: "대표사진", target: "photodae" },
      { name: "리뷰 대표사진", target: "reviewPhotodae" },
      { name: "sg 상수", target: "photosg" },
      { name: "슬라이드", target: "slide" },
      { name: "태그", target: "tag" },
      { name: "서비스", target: "service" },
      { name: "최근순 지수", target: "key9" },
      { name: "리뷰 순서 지수", target: "order" },
    ],
  };

  return targetColumns;
}

DataPatch.prototype.contentsMap = function () {
  const designerToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValueObj, finalValue;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    finalValueObj = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.exec(value);
    if (finalValueObj === null) {
      finalValue = "";
    } else {
      finalValue = finalValueObj[0];
    }

    return finalValue;
  };
  const designerInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let count;
    let valuesTong;
    let toHtml;
    let originalValue;

    valuesTong = [];
    count = 4;
    tempArr = null;
    toHtml = function (designer, desid) {
      return designer + ' <b style="font-weight:200;font-size:11px;color:white">' + desid + '</b>';
    };
    for (let { designer, desid } of GeneralJs.stacks.allDesignerTong) {
      if (count < 4) {
        tempArr.push(toHtml(designer, desid));
        count++;
      } else {
        if (tempArr !== null) {
          valuesTong.push(tempArr);
        }
        tempArr = [];
        tempArr.push(toHtml(designer, desid));
        count = 0;
      }
    }
    if (Array.isArray(tempArr)) {
      if (tempArr.length > 0) {
        valuesTong.push(tempArr);
      }
    }

    originalValue = input.value;

    endEvent = function (e) {
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = this.getAttribute("target");
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 590;
    if (width === '' || Number.isNaN(width)) {
      width = "600";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: String(0) + ea,
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: String(0) + ea,
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [];
    for (let z = 0; z < 5; z++) {
      buttonDetailStyles.push({
        position: "absolute",
        left: String(20 * z) + '%',
        top: String(0) + ea,
        width: "calc(" + String(20) + '%' + " - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      });
    }

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < valuesTong[i].length; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget");
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("switch", "off");
        input_clone.insertAdjacentHTML("beforeend", valuesTong[i][z]);
        input_clone.setAttribute("target", input_clone.querySelector('b').textContent);
        input_clone.addEventListener("click", endEvent);
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };

  const colorToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let selectedValue;
    let temp, tempArr;
    let finalValue;

    if (/ \/ /g.test(value)) {
      temp = value.split(" / ");
      if (temp.length !== 3) {
        boo = true;
      } else {
        for (let i of temp) {
          if (!/^\#/.test(i)) {
            boo = true;
          }
        }
      }
    } else {
      boo = true;
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (boo) {
      selectedValue = pastValue;
    } else {
      selectedValue = value;
    }

    tempArr = selectedValue.split(" / ");
    temp = {
      main: "",
      sub: "",
      title: "",
    };
    temp.main = tempArr[0];
    temp.sub = tempArr[1];
    temp.title = tempArr[2];

    finalValue = temp;

    return finalValue;
  };
  const colorInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;

    endEvent = function (e) {
      let inputs0 = document.querySelectorAll(".inputTargetProperty");
      let inputs1 = document.querySelectorAll(".inputTargetValue");
      let totalString = '';

      for (let i = 0; i < inputs1.length; i++) {
        if (/^\#/.test(inputs1[i].value)) {
          if (inputs1[i].value.length === 7) {
            totalString += inputs1[i].value;
          } else {
            totalString += "#f2f2f2";
          }
        } else {
          if (inputs1[i].value.length === 6) {
            totalString += '#' + inputs1[i].value;
          } else {
            totalString += "#f2f2f2";
          }
        }
        totalString += " / ";
      }

      if (totalString.length > 0) {
        totalString = totalString.slice(0, -3);
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(" / ");
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "550";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "30%",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    buttonDetailStyle1 = {
      position: "absolute",
      right: String(0) + ea,
      top: String(0) + ea,
      width: "calc(70% - " + String(Math.floor(height / 4)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetProperty");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = ([ "main", "sub", "title" ])[i];
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle1) {
        button_clone2.style[j] = buttonDetailStyle1[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetValue");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i];
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);

      div_clone.appendChild(button_clone);
    }

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth + 3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const photodaeToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let selectedValue;
    let temp, tempArr;
    let finalValue;

    if (value !== "") {
      if (/, /g.test(value)) {
        temp = value.split(", ");
        if (temp.length !== 2) {
          boo = true;
        } else {
          for (let i of temp) {
            if (Number.isNaN(Number(i))) {
              boo = true;
            }
          }
        }
      } else {
        boo = true;
      }
    } else {
      boo = false;
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (value !== "") {
      if (boo) {
        selectedValue = pastValue;
      } else {
        selectedValue = value;
      }

      tempArr = selectedValue.split(", ");
      temp = [];
      temp.push(Number(tempArr[0].replace(/[^0-9\.\-]/, '')));
      temp.push(Number(tempArr[1].replace(/[^0-9\.\-]/, '')));

      finalValue = temp;
    } else {
      finalValue = [];
    }

    return finalValue;
  };
  const photodaeInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr;
    let endEvent;

    endEvent = function (e) {
      let inputs0 = document.querySelector(".inputTargetProperty");
      let inputs1 = document.querySelector(".inputTargetValue");
      let totalString = '';

      if (inputs0.value === "" && inputs1.value === "") {
        totalString = "";
      } else {
        if (Number.isNaN(Number(inputs0.value))) {
          totalString += "1";
        } else {
          totalString += inputs0.value;
        }
        totalString += ", ";
        if (Number.isNaN(Number(inputs1.value))) {
          totalString += "1";
        } else {
          totalString += inputs1.value;
        }
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "550";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "calc(50% - " + String(Math.floor(height / 8)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    buttonDetailStyle1 = {
      position: "absolute",
      right: String(0) + ea,
      top: String(0) + ea,
      width: "calc(50% - " + String(Math.floor(height / 8)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    button_clone = GeneralJs.nodes.div.cloneNode(true);
    button_clone.classList.add("removeTarget");
    for (let j in buttonStyle) {
      button_clone.style[j] = buttonStyle[j];
    }

    button_clone2 = GeneralJs.nodes.div.cloneNode(true);
    button_clone2.classList.add("removeTarget");
    for (let j in buttonDetailStyle0) {
      button_clone2.style[j] = buttonDetailStyle0[j];
    }
    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.classList.add("inputTargetProperty");
    for (let j in inputStyle) {
      input_clone.style[j] = inputStyle[j];
    }
    input_clone.value = (inputArr[0] === undefined) ? "" : inputArr[0];
    input_clone.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        endEvent.call(this, e);
      }
    });
    button_clone2.appendChild(input_clone);
    button_clone.appendChild(button_clone2);

    button_clone2 = GeneralJs.nodes.div.cloneNode(true);
    button_clone2.classList.add("removeTarget");
    for (let j in buttonDetailStyle1) {
      button_clone2.style[j] = buttonDetailStyle1[j];
    }
    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.classList.add("inputTargetValue");
    for (let j in inputStyle) {
      input_clone.style[j] = inputStyle[j];
    }
    input_clone.value = (inputArr[1] === undefined) ? "" : inputArr[1];
    input_clone.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        endEvent.call(this, e);
      }
    });
    button_clone2.appendChild(input_clone);
    button_clone.appendChild(button_clone2);

    div_clone.appendChild(button_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const photosgToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let selectedValue;
    let temp, tempArr;
    let finalValue;

    if (value !== "") {
      if (/, /g.test(value)) {
        temp = value.split(", ");
        if (temp.length !== 2) {
          boo = true;
        } else {
          for (let i of temp) {
            if (Number.isNaN(Number(i))) {
              boo = true;
            }
          }
        }
      } else {
        boo = true;
      }
    } else {
      boo = false;
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (value !== "") {
      if (boo) {
        selectedValue = pastValue;
      } else {
        selectedValue = value;
      }
      tempArr = selectedValue.split(", ");
      temp = {
        first: 0,
        last: 0,
      };
      temp.first = Number(tempArr[0].replace(/[^0-9\.\-]/, ''));
      temp.last = Number(tempArr[1].replace(/[^0-9\.\-]/, ''));
      finalValue = temp;
    } else {
      finalValue = {
        first: 0,
        last: 0,
      };
    }

    return finalValue;
  };
  const photosgInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr;
    let endEvent;

    endEvent = function (e) {
      let inputs0 = document.querySelector(".inputTargetProperty");
      let inputs1 = document.querySelector(".inputTargetValue");
      let totalString = '';

      if (inputs0.value === "" && inputs1.value === "") {
        totalString = "";
      } else {
        if (Number.isNaN(Number(inputs0.value))) {
          totalString += "1";
        } else {
          totalString += inputs0.value;
        }
        totalString += ", ";
        if (Number.isNaN(Number(inputs1.value))) {
          totalString += "1";
        } else {
          totalString += inputs1.value;
        }
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "550";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "calc(50% - " + String(Math.floor(height / 8)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    buttonDetailStyle1 = {
      position: "absolute",
      right: String(0) + ea,
      top: String(0) + ea,
      width: "calc(50% - " + String(Math.floor(height / 8)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    button_clone = GeneralJs.nodes.div.cloneNode(true);
    button_clone.classList.add("removeTarget");
    for (let j in buttonStyle) {
      button_clone.style[j] = buttonStyle[j];
    }

    button_clone2 = GeneralJs.nodes.div.cloneNode(true);
    button_clone2.classList.add("removeTarget");
    for (let j in buttonDetailStyle0) {
      button_clone2.style[j] = buttonDetailStyle0[j];
    }
    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.classList.add("inputTargetProperty");
    for (let j in inputStyle) {
      input_clone.style[j] = inputStyle[j];
    }
    input_clone.value = (inputArr[0] === undefined) ? "" : inputArr[0];
    input_clone.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        endEvent.call(this, e);
      }
    });
    button_clone2.appendChild(input_clone);
    button_clone.appendChild(button_clone2);

    button_clone2 = GeneralJs.nodes.div.cloneNode(true);
    button_clone2.classList.add("removeTarget");
    for (let j in buttonDetailStyle1) {
      button_clone2.style[j] = buttonDetailStyle1[j];
    }
    input_clone = GeneralJs.nodes.input.cloneNode(true);
    input_clone.classList.add("inputTargetValue");
    for (let j in inputStyle) {
      input_clone.style[j] = inputStyle[j];
    }
    input_clone.value = (inputArr[1] === undefined) ? "" : inputArr[1];
    input_clone.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        endEvent.call(this, e);
      }
    });
    button_clone2.appendChild(input_clone);
    button_clone.appendChild(button_clone2);

    div_clone.appendChild(button_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const slideToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let selectedValue;
    let temp, tempArr;
    let finalValue;

    if (/, /g.test(value)) {
      temp = value.split(", ");
      if (temp.length !== 9) {
        boo = true;
      } else {
        for (let i of temp) {
          if (Number.isNaN(Number(i))) {
            boo = true;
          }
        }
      }
    } else {
      boo = true;
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (boo) {
      selectedValue = pastValue;
    } else {
      selectedValue = value;
    }

    tempArr = selectedValue.split(", ");
    temp = [];
    for (let i = 0; i < 9; i++) {
      temp.push(Number(tempArr[i].replace(/[^0-9\.\-]/, '')));
    }

    finalValue = temp;

    return finalValue;
  };
  const slideInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr;
    let endEvent;

    endEvent = function (e) {
      let inputs = document.querySelectorAll(".inputTarget");
      let totalString = '';

      for (let i of inputs) {
        if (Number.isNaN(Number(i.value))) {
          totalString += "1";
        } else {
          totalString += i.value;
        }
        totalString += ", ";
      }

      totalString = totalString.slice(0, -2);

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = 300;
    if (width === '' || Number.isNaN(width)) {
      width = "550";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle = {
      position: "absolute",
      left: String(0) + ea,
      top: String(0) + ea,
      width: "calc(calc(100% / 9) - " + String(Math.floor(height / 8)) + ea + ")",
      height: "100%",
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    button_clone = GeneralJs.nodes.div.cloneNode(true);
    button_clone.classList.add("removeTarget");
    for (let j in buttonStyle) {
      button_clone.style[j] = buttonStyle[j];
    }

    for (let i = 0; i < 9; i++) {
      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle) {
        button_clone2.style[j] = buttonDetailStyle[j];
      }
      button_clone2.style.left = "calc(calc(calc(calc(100% / 9) * " + String(i) + ") - " + String(Math.floor(height / 8)) + ea + ") + " + String(Math.floor(height / 8)) + ea + ")";
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTarget");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = (inputArr[i] === undefined) ? "" : inputArr[i];
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);
    }
    div_clone.appendChild(button_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% - " + String(iconWidth / 2) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const tagToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let selectedValue;
    let temp, tempArr;
    let finalValue;

    if (!/, /g.test(value)) {
      boo = true;
    }

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    if (boo) {
      selectedValue = pastValue;
    } else {
      selectedValue = value;
    }

    tempArr = selectedValue.split(", ");
    temp = [];
    for (let i = 0; i < tempArr.length; i++) {
      temp.push(tempArr[i].trim());
    }

    finalValue = temp;

    return finalValue;
  };
  const tagInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyle0, buttonDetailStyle1;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let inputArr;
    let endEvent;

    endEvent = function (e) {
      let inputs = document.querySelectorAll(".inputTargetProperty");
      let totalString = '';
      for (let i of inputs) {
        if (i.value !== '') {
          totalString += i.value;
          totalString += ", ";
        }
      }
      if (totalString.length > 0) {
        totalString = totalString.slice(0, -2);
      }
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = totalString;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = input.value.split(", ");
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), ''));
    if (width === '' || Number.isNaN(width)) {
      width = "550";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "550" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyle0 = {
      position: "relative",
      width: "100%",
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      fontSize: "inherit",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(Math.floor(height / 4)) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? 0 : 2) + ea,
      borderRadius: String(3) + ea,
      outline: String(0),
      border: String(0),
    };

    button_clone = GeneralJs.nodes.div.cloneNode(true);
    button_clone.classList.add("removeTarget");
    for (let j in buttonStyle) {
      button_clone.style[j] = buttonStyle[j];
    }

    for (let i = 0; i < inputArr.length; i++) {
      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetProperty");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.value = inputArr[i];
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);
    }

    div_clone.appendChild(button_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnOk("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left:  "calc(50% - " + String(3 + iconWidth) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", endEvent);
    div_clone.appendChild(svg_clone);

    svg_clone = SvgTong.stringParsing(GeneralJs.prototype.returnPlus("#2fa678"));
    svg_clone.classList.add("removeTarget");
    style = {
      position: "absolute",
      bottom: String(0),
      width: String(iconWidth) + ea,
      left: "calc(50% + " + String(3) + ea + ")",
    };
    for (let i in style) {
      svg_clone.style[i] = style[i];
    }
    svg_clone.addEventListener("click", function (e) {
      let button_clone2, input_clone;

      button_clone2 = GeneralJs.nodes.div.cloneNode(true);
      button_clone2.classList.add("removeTarget");
      for (let j in buttonDetailStyle0) {
        button_clone2.style[j] = buttonDetailStyle0[j];
      }
      input_clone = GeneralJs.nodes.input.cloneNode(true);
      input_clone.classList.add("inputTargetProperty");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.addEventListener("contextmenu", function (e) {
        e.preventDefault();
        this.parentElement.parentElement.removeChild(this.parentElement);
      });
      input_clone.addEventListener("keypress", function (e) {
        if (e.keyCode === 13) {
          endEvent.call(this, e);
        }
      });
      button_clone2.appendChild(input_clone);
      button_clone.appendChild(button_clone2);
    });

    div_clone.appendChild(svg_clone);

    mother.appendChild(div_clone);
  };

  const map = {
    conid: { name: "아이디", position: "conid", type: "string", searchBoo: true, },
    pid: { name: "별칭", position: "contents.portfolio.pid", type: "string", searchBoo: true, },
    desid: { name: "디자이너", position: "desid", type: "object", inputFunction: designerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: designerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    rid: { name: "후기 별칭", position: "contents.review.rid", type: "string", searchBoo: true, },
    portfolioDate: { name: "포트폴리오 발행일", position: "contents.portfolio.date", type: "date", searchBoo: true, },
    reviewDate: { name: "고객후기 발행일", position: "contents.review.date", type: "date", searchBoo: true, },
    titleMain: { name: "포트폴리오 제목", position: "contents.portfolio.title.main", type: "string", searchBoo: true, },
    titleSub: { name: "포트폴리오 부제목", position: "contents.portfolio.title.sub", type: "string", searchBoo: true, },
    reviewTitleMain: { name: "고객 후기 제목", position: "contents.review.title.main", type: "string", searchBoo: true, },
    reviewTitleSub: { name: "고객 후기 부제목", position: "contents.review.title.sub", type: "string", searchBoo: true, },
    space: { name: "공간", position: "contents.portfolio.spaceInfo.space", type: "string", searchBoo: true, },
    pyeong: { name: "평수", position: "contents.portfolio.spaceInfo.pyeong", type: "number", searchBoo: true, },
    region: { name: "지역", position: "contents.portfolio.spaceInfo.region", type: "string", searchBoo: true, },
    method: { name: "서비스 방식", position: "contents.portfolio.spaceInfo.method", type: "string", searchBoo: true, },
    color: { name: "컬러", position: "contents.portfolio.color", type: "object", inputFunction: colorInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: colorToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    photodae: { name: "대표사진", position: "contents.portfolio.detailInfo.photodae", type: "object", inputFunction: photodaeInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: photodaeToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    reviewPhotodae: { name: "리뷰 대표사진", position: "contents.review.detailInfo.photodae", type: "object", inputFunction: photodaeInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: photodaeToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    photosg: { name: "sg 상수", position: "contents.portfolio.detailInfo.photosg", type: "object", inputFunction: photosgInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: photosgToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    slide: { name: "슬라이드", position: "contents.portfolio.detailInfo.slide", type: "object", inputFunction: slideInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: slideToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    tag: { name: "태그", position: "contents.portfolio.detailInfo.tag", type: "object", inputFunction: tagInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: tagToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    service: { name: "서비스", position: "contents.portfolio.detailInfo.service", items: [ "홈퍼니싱", "홈스타일링", "토탈 스타일링", "상업공간 스타일링" ], type: "string", searchBoo: true, },
    key8: { name: "인기순 지수", position: "contents.portfolio.detailInfo.sort.key8", type: "string", searchBoo: true, },
    key9: { name: "최근순 지수", position: "contents.portfolio.detailInfo.sort.key9", type: "string", searchBoo: true, },
    order: { name: "리뷰 순서 지수", position: "contents.review.detailInfo.order", type: "number", searchBoo: true, },
  };

  return map;
}

//PHOTO ---------------------------------------------------------------------------------------

DataPatch.prototype.photoDropPoint = function () {
  return { column: "photoStatus", map: "contents.photo.status", values: [ "해당 없음" ] };
}

DataPatch.prototype.photoRedPoint = function () {
  return { column: "photoStatus", map: "contents.photo.status", values: [ "촬영 홀딩" ] };
}

DataPatch.prototype.photoStandard = function () {
  let model = {};
  let targetArr, margin;

  model.standard = {
    proid: {
      name: "아이디",
      left: 35,
    },
    name: {
      name: "성함",
      left: 128,
    }
  };

  model.info = {
    status: {
      name: "상태",
      width: 50,
      left: 30,
    },
    designer: {
      name: "디자이너",
      width: 80,
    },
    action: {
      name: "응대",
      width: 80,
    },
    photoBoo: {
      name: "촬영 여부",
      width: 100,
    },
    photoStatus: {
      name: "촬영 상태",
      width: 100,
    },
    contentsPhotoDate: {
      name: "촬영일",
      width: 120,
    },
    photographer: {
      name: "포토",
      width: 100,
    },
    interviewer: {
      name: "인터뷰어",
      width: 100,
    },
    rawPortfolioStatus: {
      name: "포트폴리오 상태",
      width: 120,
    },
    rawPortfolioLink: {
      name: "포트폴리오 링크",
      width: 120,
    },
    rawInterviewStatus: {
      name: "고객 후기 상태",
      width: 120,
    },
    rawInterviewLink: {
      name: "고객 후기 링크",
      width: 120,
    },
    rawPhotoStatus: {
      name: "원본 사진 상태",
      width: 120,
    },
    rawPhotoLink: {
      name: "원본 사진 링크",
      width: 120,
    },
    blogPortfolio: {
      name: "포트폴리오 B",
      width: 120,
    },
    blogReview: {
      name: "고객 후기 B",
      width: 120,
    },
    instagramPortfolio: {
      name: "포트폴리오 I",
      width: 120,
    },
    instagramReview: {
      name: "고객 후기 I",
      width: 120,
    },
    shareClientPhoto: {
      name: "사진 공유 C",
      width: 120,
    },
    shareDesignerPhoto: {
      name: "사진 공유 D",
      width: 120,
    },
    shareClientContents: {
      name: "컨텐츠 공유 C",
      width: 120,
    },
    shareDesignerContents: {
      name: "컨텐츠 공유 D",
      width: 120,
    },
  };

  targetArr = Object.keys(model.info);
  margin = 20;
  for (let i = 1; i < targetArr.length; i++) {
    model.info[targetArr[i]].left = model.info[targetArr[i - 1]].width + model.info[targetArr[i - 1]].left + margin;
  }

  return model;
}

DataPatch.prototype.photoWhiteViewStandard = function () {
  const targetColumns = {
    standard: [
      "name",
      "proid",
    ],
    info: [
      { name: "진행 상태", target: "status" },
      { name: "응대", target: "action" },
      { name: "촬영 여부", target: "photoBoo" },
      { name: "촬영 상태", target: "photoStatus" },
      { name: "촬영일", target: "contentsPhotoDate" },
      { name: "포토", target: "photographer" },
      { name: "인터뷰어", target: "interviewer" },
      { name: "포트폴리오 상태", target: "rawPortfolioStatus" },
      { name: "포트폴리오 링크", target: "rawPortfolioLink" },
      { name: "고객 후기 상태", target: "rawInterviewStatus" },
      { name: "고객 후기 링크", target: "rawInterviewLink" },
      { name: "원본 사진 상태", target: "rawPhotoStatus" },
      { name: "원본 사진 링크", target: "rawPhotoLink" },
      { name: "사진 공유 C", target: "shareClientPhoto" },
      { name: "컨텐츠 공유 C", target: "shareClientContents" },
      { name: "사진 공유 D", target: "shareDesignerPhoto" },
      { name: "컨텐츠 공유 D", target: "shareDesignerContents" },
      { name: "사진 공유 D", target: "shareDesignerPhoto" },
      { name: "컨텐츠 공유 D", target: "shareDesignerContents" },
      { name: "컨텐츠 공유 D", target: "shareDesignerContents" },
    ],
  };
  return targetColumns;
}

DataPatch.prototype.photoChainingTarget = function () {
  const chainingMethods = {
    photoBoo: function (thisCase, value) {
      if (typeof value !== "boolean") {
        value = (value === "true");
      }

      let resultObj;
      let photoStatus;
      let contentsPhotoDate;
      let photographer;
      let interviewer;
      let rawInterviewStatus;
      let rawInterviewLink;
      let rawPhotoStatus;
      let rawPhotoLink;
      let shareClientPhoto;
      let shareClientContents;
      let shareDesignerPhoto;
      let shareDesignerContents;
      let blogPortfolio;
      let blogReview;
      let instagramPortfolio;
      let instagramReview;

      if (value) {
        photoStatus = "세팅 대기";
        contentsPhotoDate = "3800-01-01";
        photographer = "";
        interviewer = "";
        rawInterviewStatus = "세팅 대기";
        rawInterviewLink = "";
        rawPhotoStatus = "촬영 대기";
        rawPhotoLink = "";
        shareClientPhoto = "1800-01-01";
        shareClientContents = "1800-01-01";
        shareDesignerPhoto = "1800-01-01";
        shareDesignerContents = "1800-01-01";
        blogPortfolio = "1800-01-01";
        blogReview = "1800-01-01";
        instagramPortfolio = "1800-01-01";
        instagramReview = "1800-01-01";
      } else {
        photoStatus = "해당 없음";
        contentsPhotoDate = "1800-01-01";
        photographer = "";
        interviewer = "";
        rawInterviewStatus = "해당 없음";
        rawInterviewLink = "";
        rawPhotoStatus = "해당 없음";
        rawPhotoLink = "";
        shareClientPhoto = "1800-01-01";
        shareClientContents = "1800-01-01";
        shareDesignerPhoto = "1800-01-01";
        shareDesignerContents = "1800-01-01";
        blogPortfolio = "1800-01-01";
        blogReview = "1800-01-01";
        instagramPortfolio = "1800-01-01";
        instagramReview = "1800-01-01";
      }

      resultObj = { photoStatus, contentsPhotoDate, photographer, interviewer, rawInterviewStatus, rawInterviewLink, rawPhotoStatus, rawPhotoLink, shareClientPhoto, shareClientContents, shareDesignerPhoto, shareDesignerContents, blogPortfolio, blogReview, instagramPortfolio, instagramReview };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    photoStatus: function (thisCase, value) {
      let resultObj;
      let photoBoo;
      let contentsPhotoDate;
      let photographer;
      let interviewer;
      let rawInterviewStatus;
      let rawInterviewLink;
      let rawPhotoStatus;
      let rawPhotoLink;
      let shareClientPhoto;
      let shareClientContents;
      let shareDesignerPhoto;
      let shareDesignerContents;
      let blogPortfolio;
      let blogReview;
      let instagramPortfolio;
      let instagramReview;

      if (value === "해당 없음") {
        photoBoo = false;
        contentsPhotoDate = "1800-01-01";
        photographer = "";
        interviewer = "";
        rawInterviewStatus = "해당 없음";
        rawInterviewLink = "";
        rawPhotoStatus = "해당 없음";
        rawPhotoLink = "";
        shareClientPhoto = "1800-01-01";
        shareClientContents = "1800-01-01";
        shareDesignerPhoto = "1800-01-01";
        shareDesignerContents = "1800-01-01";
        blogPortfolio = "1800-01-01";
        blogReview = "1800-01-01";
        instagramPortfolio = "1800-01-01";
        instagramReview = "1800-01-01";
        resultObj = { photoBoo, contentsPhotoDate, photographer, interviewer, rawInterviewStatus, rawInterviewLink, rawPhotoStatus, rawPhotoLink, shareClientPhoto, shareClientContents, shareDesignerPhoto, shareDesignerContents, blogPortfolio, blogReview, instagramPortfolio, instagramReview };
      } else {
        resultObj = {};
      }

      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    }
  };

  const chainingTargets = Object.keys(chainingMethods);

  return { chainingTargets, chainingMethods };
}

DataPatch.prototype.photoMap = function () {
  const statusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ '대기', '진행중', '완료', '홀딩', '드랍' ];

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const statusInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ '대기', '진행중', '완료', '홀딩', '드랍' ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "홀딩" || finalValue === "드랍") {
        grandMother.setAttribute("drop", "true");
      } else {
        grandMother.setAttribute("drop", "false");
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ '대기', '진행중', '완료', '홀딩', '드랍' ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const photoBooToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ 'true', 'false' ];

    if (targetArr.includes(value)) {
      finalValue = (value === "true");
    } else {
      finalValue = pastValue;
    }

    return Boolean(finalValue);
  };
  const photoBooInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ 'true', 'false' ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "false") {
        grandMother.setAttribute("drop", "true");
      } else {
        grandMother.setAttribute("drop", "false");
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ 'true', 'false' ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = "80";
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const photoStatusToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValue;
    let targetArr;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    targetArr = [ '세팅 대기', '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ];

    if (targetArr.includes(value)) {
      finalValue = value;
    } else {
      finalValue = pastValue;
    }

    return finalValue;
  };
  const photoStatusInputFunction = function (mother, input, callback) {
    const grandMother = mother.parentElement;
    let buttonStyle, inputStyle, style;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone;
    let input_clone;
    let iconWidth;
    let inputArr, length;
    let endEvent;
    let originalValue;

    originalValue = input.value;

    endEvent = function (e) {
      const rawValue = this.getAttribute("target");
      let finalValue;
      let items;

      items = [ '세팅 대기', '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ];
      if (items.includes(rawValue)) {
        finalValue = rawValue;
      } else {
        finalValue = originalValue;
      }

      if (finalValue === "해당 없음") {
        grandMother.setAttribute("drop", "true");
      } else {
        grandMother.setAttribute("drop", "false");
      }

      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = finalValue;
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    inputArr = [ '세팅 대기', '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ];
    length = inputArr.length;
    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 15;
    if (width === '' || Number.isNaN(width)) {
      width = "120";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: (width !== "120" ? "calc(50% - " + String((width / 2) + 0.1) + ea + ")" : String(0) + ea),
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      background: "#2fa678",
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      boxShadow: "0px 2px 11px -6px #2fa678",
      marginBottom: String(height / 4) + ea,
    };

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "calc(100% - " + String(5) + ea + ")",
      left: String(0) + ea,
      top: String(GeneralJs.isMac() ? (height / 2.9) : (height / 2.8)) + ea,
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }
      input_clone = GeneralJs.nodes.div.cloneNode(true);
      input_clone.classList.add("inputTarget");
      input_clone.classList.add("hoverDefault");
      for (let j in inputStyle) {
        input_clone.style[j] = inputStyle[j];
      }
      input_clone.textContent = inputArr[i];
      input_clone.setAttribute("target", inputArr[i]);
      input_clone.addEventListener("click", endEvent);
      button_clone.appendChild(input_clone);
      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const designerToObject = function (value, pastValue, vaildMode) {
    let boo = false;
    let finalValueObj, finalValue;

    if (vaildMode) {
      return { boo: !boo, value: null };
    }

    finalValueObj = /d[0-9][0-9][0-9][0-9]_[a-z][a-z][0-9][0-9][a-z]/.exec(value);
    if (finalValueObj === null) {
      finalValue = "";
    } else {
      finalValue = finalValueObj[0];
    }

    return finalValue;
  };
  const designerInputFunction = function (mother, input, callback) {
    let buttonStyle, inputStyle, style;
    let buttonDetailStyles;
    let ea = "px";
    let height, fontSize, top, width;
    let div_clone, svg_clone;
    let button_clone, button_clone2;
    let input_clone;
    let iconWidth;
    let endEvent;
    let tempArr;
    let count;
    let valuesTong;
    let toHtml;
    let originalValue;

    valuesTong = [];
    count = 4;
    tempArr = null;
    toHtml = function (designer, desid) {
      return designer + ' <b style="font-weight:200;font-size:11px;color:white">' + desid + '</b>';
    };
    for (let { designer, desid } of GeneralJs.stacks.allDesignerTong) {
      if (count < 4) {
        tempArr.push(toHtml(designer, desid));
        count++;
      } else {
        if (tempArr !== null) {
          valuesTong.push(tempArr);
        }
        tempArr = [];
        tempArr.push(toHtml(designer, desid));
        count = 0;
      }
    }
    if (Array.isArray(tempArr)) {
      if (tempArr.length > 0) {
        valuesTong.push(tempArr);
      }
    }

    originalValue = input.value;

    endEvent = function (e) {
      input.style.transition = "0s all ease";
      input.style.color = "transparent";
      input.value = this.getAttribute("target");
      input.parentElement.style.transition = "";
      input.parentElement.style.color = "inherit";
      mother.removeChild(document.querySelector(".divTong"));
      callback();
    };

    input.value = "입력중";
    if (input.parentElement.childNodes[0].nodeType === 3) {
      input.parentElement.style.transition = "0s all ease";
      input.parentElement.style.color = "transparent";
    }

    mother.style.overflow = "";
    height = Number(mother.style.height.replace((new RegExp(ea, "gi")), ''));
    fontSize = Number(mother.style.fontSize.replace((new RegExp(ea, "gi")), ''));
    width = Number(mother.style.width.replace((new RegExp(ea, "gi")), '')) + 590;
    if (width === '' || Number.isNaN(width)) {
      width = "600";
    }
    top = height * 0.5;
    iconWidth = 18;

    div_clone = GeneralJs.nodes.div.cloneNode(true);
    div_clone.classList.add("removeTarget");
    div_clone.classList.add("divTong");
    style = {
      position: "absolute",
      top: String((height * 2) - top) + ea,
      left: String(0) + ea,
      width: String(width) + ea,
      textAlign: "center",
      fontSize: "inherit",
      zIndex: String(3),
      paddingBottom: String(iconWidth + 3) + ea,
    };
    for (let i in style) {
      div_clone.style[i] = style[i];
    }

    buttonStyle = {
      position: "relative",
      left: String(0) + ea,
      width: String(width) + ea,
      paddingTop: String(height * 0.3) + ea,
      height: String(height * 1.5) + ea,
      fontSize: "inherit",
      color: "#ffffff",
      zIndex: String(3),
      borderRadius: String(3) + ea,
      animation: "fadeuplite 0.3s ease forwards",
      marginBottom: String(height / 4) + ea,
    };

    buttonDetailStyles = [];
    for (let z = 0; z < 5; z++) {
      buttonDetailStyles.push({
        position: "absolute",
        left: String(20 * z) + '%',
        top: String(0) + ea,
        width: "calc(" + String(20) + '%' + " - " + String(Math.round((height) / 4)) + ea + ")",
        height: "100%",
        background: "#2fa678",
        zIndex: String(3),
        borderRadius: String(3) + ea,
        fontSize: "inherit",
        boxShadow: "0px 2px 11px -6px #2fa678",
      });
    }

    inputStyle = {
      position: "absolute",
      fontSize: "inherit",
      fontWeight: String(400),
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: (GeneralJs.isMac() ? "95%" : "98%"),
      left: String(0) + ea,
      top: GeneralJs.isMac() ? "19%" : "20%",
      borderRadius: String(3) + ea,
      border: String(0),
      cursor: "pointer",
    };

    for (let i = 0; i < valuesTong.length; i++) {
      button_clone = GeneralJs.nodes.div.cloneNode(true);
      button_clone.classList.add("removeTarget");
      for (let j in buttonStyle) {
        button_clone.style[j] = buttonStyle[j];
      }

      for (let z = 0; z < valuesTong[i].length; z++) {
        button_clone2 = GeneralJs.nodes.div.cloneNode(true);
        button_clone2.classList.add("removeTarget");
        button_clone2.classList.add("hoverDefault_lite");
        button_clone2.classList.add("divTarget");
        for (let j in buttonDetailStyles[z]) {
          button_clone2.style[j] = buttonDetailStyles[z][j];
        }
        input_clone = GeneralJs.nodes.div.cloneNode(true);
        input_clone.classList.add("inputTarget");
        for (let j in inputStyle) {
          input_clone.style[j] = inputStyle[j];
        }

        input_clone.setAttribute("switch", "off");
        input_clone.setAttribute("target", valuesTong[i][z].replace(/\<[^\<\>]+\>/g, ''));
        input_clone.insertAdjacentHTML("beforeend", valuesTong[i][z]);
        input_clone.addEventListener("click", endEvent);
        button_clone2.appendChild(input_clone);
        button_clone.appendChild(button_clone2);
      }

      div_clone.appendChild(button_clone);
    }

    mother.appendChild(div_clone);
  };
  const map = {
    proid: { name: "아이디", position: "proid", type: "string", searchBoo: true, },
    cliid: { name: "고객", position: "cliid", type: "string", searchBoo: true, },
    desid: { name: "디자이너", position: "desid", type: "string", searchBoo: true, },
    designer: { name: "디자이너", position: "desid", type: "object", inputFunction: designerInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: designerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    status: { name: "진행 상태", position: "process.status", type: "object", items: [ '대기', '진행중', '완료', '홀딩', '드랍' ], inputFunction: statusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: statusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    action: { name: "응대", position: "process.action", type: "string", items: [ "응대 대기", "현장 미팅", "1차 제안", "수정 제안", "시공 진행", "제품 구매", "배송중", "촬영 컨택", "촬영 대기", "사진 대기", "사진 공유", "컨텐츠 공유", "응대 종료", "해당 없음" ], searchBoo: true, },
    photoBoo: { name: "촬영 여부", position: "contents.photo.boo", type: "object", items: [ "true", "false" ], inputFunction: photoBooInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: photoBooToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    photoStatus: { name: "촬영 상태", position: "contents.photo.status", type: "object", items: [ '세팅 대기', '촬영 컨택 요망', '촬영 컨택중', '촬영 일정 확정', '촬영 완료', '촬영 홀딩', '해당 없음' ], inputFunction: photoStatusInputFunction.toString().replace(/\}$/, '').replace(/^function[^\(\)]*\([^\(\)]*\)[^\{]*\{/gi, ''), objectFunction: photoStatusToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    contentsPhotoDate: { name: "촬영일", position: "contents.photo.date", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    photographer: { name: "포토", position: "contents.photo.info.photographer", type: "string", items: [ '미정', '김다현', '이현익', '정경일', '김기용', '배창규', '박혜연', '허완', '학생', '디자이너', '해당 없음' ], searchBoo: true, },
    interviewer: { name: "인터뷰어", position: "contents.photo.info.interviewer", type: "string", items: [ '미정', '박혜연', '정재은', '강해진', '배창규', '임혜령', '임지민', '이큰별', '인턴', '해당 없음' ], searchBoo: true, },
    rawPortfolioStatus: { name: "포트폴리오 상태", position: "contents.raw.portfolio.status", type: "string", items: [ '세팅 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ], searchBoo: true, },
    rawPortfolioLink: { name: "포트폴리오 링크", position: "contents.raw.portfolio.link", type: "link", searchBoo: true, },
    rawInterviewStatus: { name: "고객 후기 상태", position: "contents.raw.interview.status", type: "string", items: [ '세팅 대기', '인터뷰 요망', '인터뷰 완료', '원본 편집중', '원본 편집 완료', '해당 없음' ], searchBoo: true, },
    rawInterviewLink: { name: "고객 후기 링크", position: "contents.raw.interview.link", type: "link", searchBoo: true, },
    rawPhotoStatus: { name: "원본 사진 상태", position: "contents.raw.photo.status", type: "string", items: [ '촬영 대기', '원본 요청 요망', '원본 요청 완료', '원본 수집 완료', '원본 보정중', '원본 보정 완료', '해당 없음' ], searchBoo: true, },
    rawPhotoLink: { name: "원본 사진 링크", position: "contents.raw.photo.link", type: "link", searchBoo: true, },
    shareClientPhoto: { name: "사진 고객 공유", position: "contents.share.client.photo", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    shareClientContents: { name: "컨텐츠 고객 공유", position: "contents.share.client.contents", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    shareDesignerPhoto: { name: "사진 디자이너 공유", position: "contents.share.designer.photo", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    shareDesignerContents: { name: "컨텐츠 디자이너 공유", position: "contents.share.designer.contents", type: "date", searchBoo: true, yesNo: [ "Y", "N" ], },
    blogPortfolio: { name: "포트폴리오 블로그", position: "contents.blog.portfolio.date", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], isHistory: true },
    blogReview: { name: "고객 후기 블로그", position: "contents.blog.review.date", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], isHistory: true },
    instagramPortfolio: { name: "포트폴리오 인스타", position: "contents.instagram.portfolio.date", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], isHistory: true },
    instagramReview: { name: "고객 후기 인스타", position: "contents.instagram.review.date", type: "date", searchBoo: false, yesNo: [ "Y", "N" ], isHistory: true },
  };
  return map;
}

module.exports = DataPatch;
