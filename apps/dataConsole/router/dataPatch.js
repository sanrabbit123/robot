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

//CLIENT ----------------------------------------------------------------------------------------

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
    outreason: {
      name: "유출 이유",
      width: 100,
    },
    callHistory: {
      name: "전화 기록",
      width: 100,
    },
    timeline: {
      name: "문의일",
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
    expected: {
      name: "입주 예정일",
      width: 100,
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
      name: "이사일",
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
    },
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
      { name: "유출 이유", target: "outreason" },
      { name: "전화 기록", target: "callHistory" },
      { name: "문의일", target: "timeline" },
      { name: "연락처", target: "phone" },
      { name: "이메일", target: "email" },
      { name: "예산", target: "budget" },
      { name: "주소", target: "address" },
      { name: "계약 상태", target: "contract" },
      { name: "평수", target: "pyeong" },
      { name: "거주중", target: "living" },
      { name: "입주 예정일", target: "expected" },
      { name: "사전 점검일", target: "precheck" },
      { name: "집 비는 날", target: "empty" },
      { name: "이사일", target: "movein" },
      { name: "방", target: "room" },
      { name: "화장실", target: "bathroom" },
      { name: "발코니", target: "valcony" },
      { name: "가족 구성원", target: "family" },
      { name: "요청 사항", target: "comment" },
      { name: "유입 채널", target: "channel" },
    ],
  };

  return targetColumns;
}

DataPatch.prototype.clientMap = function () {
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

    for (let i of temp) {
      temp2 = i.split("-");
      obj = new Date(Number(temp2[0]), Number(temp2[1].replace(/^0/, '') - 1), Number(temp2[2].replace(/^0/, '')));
      arr.push(obj);
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
      for (let i = 0; i < inputs.length; i++) {
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
      animation: "fadeuplite 0.3s ease forwards",
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
      fontWeight: String(100) + ea,
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "#2fa678",
      width: String(width) + ea,
      height: "89%",
      left: String(0) + ea,
      top: String(0) + ea,
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
    expected: { name: "입주 예정일", position: "requests.0.request.space.resident.expected", type: "date", searchBoo: true, },
    comment: { name: "요청 사항", position: "requests.0.request.etc.comment", type: "string", searchBoo: false, },
    channel: { name: "유입 채널", position: "requests.0.request.etc.channel", type: "string", searchBoo: true, },
    status: { name: "상태", position: "requests.0.analytics.response.status", type: "string", items: [ "응대중", "진행", "드랍", "완료" ], searchBoo: true, },
    outreason: { name: "유출 이유", position: "requests.0.analytics.response.outreason", type: "array", items: [ '연결 안 됨', '가벼운 문의', '타사 계약', '비용 문제', '의견 조정 안 됨', '직접 진행' ], searchBoo: true, },
    callHistory: { name: "전화 기록", position: "requests.0.analytics.date.callHistory", type: "object", inputFunction: callHistoryInputFunction.toString().replace(/\}$/, '').replace(/function \(mother, input, callback\) \{/gi, ''), objectFunction: callHistoryToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: false, },
    precheck: { name: "사전 점검일", position: "requests.0.analytics.date.space.precheck", type: "date", searchBoo: false, },
    empty: { name: "집 비는 날", position: "requests.0.analytics.date.space.empty", type: "date", searchBoo: false, },
    movein: { name: "이사일", position: "requests.0.analytics.date.space.movein", type: "date", searchBoo: false, },
  };
  return map;
}

DataPatch.prototype.clientNotionMap = function (notionCard) {
  let notionModel, requestNum;
  let targetFunction;
  let resultArr;

  if (notionCard.request === null || notionCard.request === undefined) {
    requestNum = 0;
  } else {
    requestNum = notionCard.request;
  }

  notionModel = {
    address: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.space.address";

      if (typeof notionValue === "string") {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    pyeong: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.space.pyeong";

      if (typeof notionValue === "number") {
        finalValue = notionValue;
      } else if (!Number.isNaN(Number(notionValue.replace(/[^0-9\.]/g, '')))) {
        finalValue = Number(notionValue.replace(/[^0-9\.]/g, ''));
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    movein: function (notionValue, pastValue, requestNum) {
      let target, finalValue;
      let tempArr;

      target = "requests." + String(requestNum) + ".request.space.resident.expected";
      if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(notionValue))) {
        tempArr = DataPatch.toolsDateFilter(notionValue).split('-');
        finalValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    realmove: function (notionValue, pastValue, requestNum) {
      let target, finalValue;
      let tempArr;

      target = "requests." + String(requestNum) + ".analytics.date.space.movein";
      if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(notionValue))) {
        tempArr = DataPatch.toolsDateFilter(notionValue).split('-');
        finalValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    email: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "email";
      if (typeof notionValue === "string" && /@/g.test(notionValue)) {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    family: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.family";
      if (typeof notionValue === "string") {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    channel: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.etc.channel";
      if (typeof notionValue === "string") {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    precheck: function (notionValue, pastValue, requestNum) {
      let target, finalValue;
      let tempArr;

      target = "requests." + String(requestNum) + ".analytics.date.space.precheck";
      if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(notionValue))) {
        tempArr = DataPatch.toolsDateFilter(notionValue).split('-');
        finalValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    empty: function (notionValue, pastValue, requestNum) {
      let target, finalValue;
      let tempArr;

      target = "requests." + String(requestNum) + ".analytics.date.space.empty";
      if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(notionValue))) {
        tempArr = DataPatch.toolsDateFilter(notionValue).split('-');
        finalValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    contract: function (notionValue, pastValue, requestNum) {
      let target, finalValue;
      let items;

      target = "requests." + String(requestNum) + ".request.space.contract";
      items = [ '전월세', '자가' ];
      if (items.includes(notionValue)) {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    room: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.space.spec.room";
      if (typeof notionValue === "string") {
        if (/4/g.test(notionValue) && Number(notionValue.replace(/[^0-9]/g, '')) === 4) {
          finalValue = 4;
        } else if (/3/g.test(notionValue) && Number(notionValue.replace(/[^0-9]/g, '')) === 3) {
          finalValue = 3;
        } else if (/2/g.test(notionValue) && Number(notionValue.replace(/[^0-9]/g, '')) === 2) {
          finalValue = 2;
        } else if (/1/g.test(notionValue) && Number(notionValue.replace(/[^0-9]/g, '')) === 1) {
          finalValue = 1;
        } else {
          finalValue = pastValue;
        }
      } else if (typeof notionValue === "number") {
        if (notionValue === 4) {
          finalValue = 4;
        } else if (notionValue === 3) {
          finalValue = 3;
        } else if (notionValue === 2) {
          finalValue = 2;
        } else if (notionValue === 1) {
          finalValue = 1;
        } else {
          finalValue = pastValue;
        }
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    bathroom: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.space.spec.bathroom";
      if (typeof notionValue === "string") {
        if (/3/g.test(notionValue) && Number(notionValue.replace(/[^0-9]/g, '')) === 3) {
          finalValue = 3;
        } else if (/2/g.test(notionValue) && Number(notionValue.replace(/[^0-9]/g, '')) === 2) {
          finalValue = 2;
        } else if (/1/g.test(notionValue) && Number(notionValue.replace(/[^0-9]/g, '')) === 1) {
          finalValue = 1;
        } else {
          finalValue = pastValue;
        }
      } else if (typeof notionValue === "number") {
        if (notionValue === 3) {
          finalValue = 3;
        } else if (notionValue === 2) {
          finalValue = 2;
        } else if (notionValue === 1) {
          finalValue = 1;
        } else {
          finalValue = pastValue;
        }
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    valcony: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.space.spec.valcony";
      if (typeof notionValue === "string") {
        if (notionValue === "발코니 확장") {
          finalValue = true;
        } else if (notionValue === "발코니 확장 없음") {
          finalValue = false;
        } else {
          finalValue = pastValue;
        }
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    phone: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "phone";
      if (typeof notionValue === "string" && /-/g.test(notionValue)) {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    budget: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "requests." + String(requestNum) + ".request.budget";
      if (typeof notionValue === "string") {
        if (notionValue.replace(/[^0-9]/g, '') === "5000") {
          finalValue = '5,000만원 이상';
        } else if (notionValue.replace(/[^0-9]/g, '') === "4500") {
          finalValue = '4,500만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "4000") {
          finalValue = '4,000만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "3500") {
          finalValue = '3,500만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "3000") {
          finalValue = '3,000만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "2500") {
          finalValue = '2,500만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "2000") {
          finalValue = '2,000만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "1500") {
          finalValue = '1,500만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "1000") {
          finalValue = '1,000만원';
        } else if (notionValue.replace(/[^0-9]/g, '') === "500") {
          finalValue = '500만원 이하';
        } else {
          finalValue = pastValue;
        }
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
  };

  resultArr = [];
  for (let i in notionCard) {
    if (notionModel[i] !== undefined) {
      targetFunction = notionModel[i];
      resultArr.push(targetFunction(notionCard[i], null, requestNum));
    }
  }

  return resultArr;
}

//DESIGNER --------------------------------------------------------------------------------------

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
    status: {
      name: "계약 상태",
      width: 100,
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
          totalString += inputs1[i].value.trim().replace(/\/$/, '');
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
      animation: "fadeuplite 0.3s ease forwards",
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
      fontWeight: String(100) + ea,
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "89%",
      left: String(0) + ea,
      top: String(0) + ea,
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
      totalString = inputs0[0].value + "년 " + inputs0[1].value + "월";
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
      animation: "fadeuplite 0.3s ease forwards",
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
      fontWeight: String(100) + ea,
      color: "#ffffff",
      zIndex: String(3),
      textAlign: "center",
      background: "transparent",
      width: "100%",
      height: "89%",
      left: String(0) + ea,
      top: String(0) + ea,
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

  const map = {
    designer: { name: "성함", position: "designer", type: "string", searchBoo: true, },
    desid: { name: "아이디", position: "desid", type: "string", searchBoo: true, },
    status: { name: "계약 상태", position: "information.contract.status", type: "string", searchBoo: true, },
    date: { name: "계약일", position: "information.contract.date", type: "date", searchBoo: true, },
    phone: { name: "연락처", position: "information.phone", type: "string", searchBoo: true, },
    email: { name: "이메일", position: "information.email", type: "string", searchBoo: true, },
    address: { name: "주소", position: "information.address", type: "array", searchBoo: true, },
    showRoom: { name: "쇼룸", position: "information.personalSystem.showRoom", type: "boolean", items: [ "true", "false" ], searchBoo: true, },
    webPage: { name: "웹페이지", position: "information.personalSystem.webPage", type: "array", searchBoo: true, },
    sns: { name: "SNS", position: "information.personalSystem.sns", type: "object", inputFunction: snsInputFunction.toString().replace(/\}$/, '').replace(/function \(mother, input, callback\) \{/gi, ''), objectFunction: snsToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    career: { name: "경력", position: "information.business.career", type: "object", inputFunction: careerInputFunction.toString().replace(/\}$/, '').replace(/function \(mother, input, callback\) \{/gi, ''), objectFunction: careerToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    account: { name: "계좌번호", position: "information.business.account", type: "object", objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    classification: { name: "사업자 분류", position: "information.business.businessInfo.classification", items: [ "법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서" ], type: "string", searchBoo: true, },
    businessNumber: { name: "사업자 등록번호", position: "information.business.businessInfo.businessNumber", type: "string", searchBoo: true, },
    files: { name: "파일 유무", position: "information.business.businessInfo.files", type: "object", objectFunction: filesToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    percentage: { name: "수수료", position: "information.business.service.cost.percentage", type: "number", searchBoo: true, },
    partner: { name: "시공사", position: "information.business.service.construct.partner", type: "string", searchBoo: true, },
    method: { name: "시공 방식", position: "information.business.service.construct.method", type: "string", searchBoo: true, },
  };
  return map;
}

DataPatch.prototype.designerNotionMap = function (notionCard) {
  let notionModel, requestNum;
  let targetFunction;
  let resultArr;

  if (notionCard.request === null || notionCard.request === undefined) {
    requestNum = 0;
  } else {
    requestNum = notionCard.request;
  }

  notionModel = {
    address: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "information.address";

      if (typeof notionValue === "string" && notionValue !== "") {
        finalValue = [ notionValue ];
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    contractday: function (notionValue, pastValue, requestNum) {
      let target, finalValue;
      let tempArr;

      target = "information.contract.date";
      if (/^[0-9][0-9][0-9][0-9]\-[0-9][0-9]\-[0-9][0-9]$/.test(DataPatch.toolsDateFilter(notionValue))) {
        tempArr = DataPatch.toolsDateFilter(notionValue).split('-');
        finalValue = new Date(Number(tempArr[0]), Number(tempArr[1].replace(/^0/, '')) - 1, Number(tempArr[2].replace(/^0/, '')));
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    email: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "information.email";
      if (typeof notionValue === "string" && /@/g.test(notionValue)) {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    phone: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "information.phone";
      if (typeof notionValue === "string" && /-/g.test(notionValue)) {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    classification: function (notionValue, pastValue, requestNum) {
      let target, finalValue;
      let items;

      target = "information.business.businessInfo.classification";
      items = [ "법인사업자(일반)", "법인사업자(간이)", "개인사업자(일반)", "개인사업자(간이)", "프리랜서" ];
      if (items.includes(notionValue)) {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    percentage: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "information.business.service.cost.percentage";

      if (typeof notionValue === "number") {
        finalValue = notionValue;
      } else if (!Number.isNaN(Number(notionValue.replace(/[^0-9\.]/g, '')))) {
        finalValue = Number(notionValue.replace(/[^0-9\.]/g, ''));
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    },
    businessnumber: function (notionValue, pastValue, requestNum) {
      let target, finalValue;

      target = "information.business.businessInfo.businessNumber";

      if (typeof notionValue === "string") {
        finalValue = notionValue;
      } else {
        finalValue = pastValue;
      }

      return { target, finalValue };
    }
  };

  resultArr = [];
  for (let i in notionCard) {
    if (notionModel[i] !== undefined) {
      targetFunction = notionModel[i];
      resultArr.push(targetFunction(notionCard[i], null, requestNum));
    }
  }

  return resultArr;
}

//PROJECT ---------------------------------------------------------------------------------------

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
    designer: {
      name: "디자이너",
      width: 80,
    },
    service: {
      name: "서비스",
      width: 120,
    },
    firstGuide: {
      name: "계약금 안내",
      width: 100,
    },
    firstDate: {
      name: "계약금 입금",
      width: 100,
    },
    firstAmount: {
      name: "계약금",
      width: 100,
    },
    firstInfo: {
      name: "계약금 정보",
      width: 300,
    },
    meetingDate: {
      name: "1차 미팅",
      width: 100,
    },
    remainGuide: {
      name: "잔금 안내",
      width: 100,
    },
    remainDate: {
      name: "잔금 입금",
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
    remainInfo: {
      name: "잔금 정보",
      width: 300,
    },
    formGuide: {
      name: "계약 안내",
      width: 100,
    },
    formDateFrom: {
      name: "시작일",
      width: 100,
    },
    formDateTo: {
      name: "종료일",
      width: 100,
    },
    method: {
      name: "정산 방식",
      width: 100,
    },
    percentage: {
      name: "수수료",
      width: 80,
    },
    calculationInfo: {
      name: "정산 정보",
      width: 300,
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
    contentsPhotoDate: {
      name: "촬영일",
      width: 100,
    },
    photographer: {
      name: "촬영 작가",
      width: 80,
    },
    interviewer: {
      name: "인터뷰어",
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
      { name: "계약금 입금", target: "firstDate", subTargets: [ "firstGuide" ], subTitles: [ "계약금 안내" ] },
      { name: "계약금 정보", target: "firstInfo" },
      { name: "1차 미팅", target: "meetingDate" },
      { name: "잔금 입금", target: "remainDate", subTargets: [ "remainGuide" ], subTitles: [ "잔금 안내" ] },
      { name: "공급가", target: "remainSupply" },
      { name: "VAT", target: "remainVat" },
      { name: "소비자가", target: "remainConsumer" },
      { name: "잔금 정보", target: "remainInfo" },
      { name: "계약", target: "formGuide",  subTargets: [ "formDateFrom", "formDateTo" ], subTitles: [ "안내", "시작일", "종료일" ] },
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
      let remainVat, remainConsumer;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      remainVat = Math.round(value * 0.1);
      remainConsumer = Math.round(value * 1.1);

      paymentsTotalAmount = methodFilter(value, thisCase.method, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { remainVat, remainConsumer, paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    remainVat: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let remainSupply, remainConsumer;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      remainSupply = value * 10;
      remainConsumer = remainSupply + value;

      paymentsTotalAmount = methodFilter(value * 10, thisCase.method, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { remainSupply, remainConsumer, paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
      return { chainingColumns: Object.keys(resultObj), chainingValues: resultObj };
    },
    remainConsumer: function (thisCase, value) {
      if (typeof value === "string") {
        value = Number(value.replace(/[^0-9\.\-]/g, ''));
      }

      let resultObj;
      let remainSupply, remainVat;
      let paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount;

      remainVat = Math.round(value / 11);
      remainSupply = value - remainVat;

      paymentsTotalAmount = methodFilter(remainSupply, thisCase.method, thisCase.percentage);
      paymentsFirstAmount = Math.round(paymentsTotalAmount / 2);
      paymentsRemainAmount = Math.round(paymentsTotalAmount / 2);

      resultObj = { remainSupply, remainVat, paymentsTotalAmount, paymentsFirstAmount, paymentsRemainAmount };
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
    obj.account = temp[0].replace(/^계좌번호 /, '');
    obj.to = temp[1].replace(/^수신자 /, '');
    obj.proof = temp[2].replace(/^증빙 /, '');

    return obj;
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
    obj.method = temp[0].replace(/^결제방법 /, '');
    obj.to = temp[1].replace(/^수신자 /, '');
    obj.proof = temp[2].replace(/^증빙 /, '');

    return obj;
  };

  const map = {
    proid: { name: "아이디", position: "proid", type: "string", searchBoo: true, },
    cliid: { name: "고객", position: "cliid", type: "string", searchBoo: true, },
    desid: { name: "디자이너", position: "desid", type: "string", searchBoo: true, },



    designer: { name: "디자이너", position: "desid", type: "string", searchBoo: true, },
    service: { name: "서비스", position: "service", type: "string", searchBoo: true, },



    status: { name: "진행 상태", position: "process.status", type: "string", items: [ "응대중", "진행", "드랍", "완료" ], searchBoo: true, },
    firstGuide: { name: "계약금 안내", position: "process.contract.first.guide", type: "date", searchBoo: true, },
    firstDate: { name: "계약금 입금", position: "process.contract.first.date", type: "date", searchBoo: true, },
    firstAmount: { name: "계약금", position: "process.contract.first.calculation.amount", type: "number", searchBoo: true, moneyBoo: true },
    firstInfo: { name: "계약금 정보", position: "process.contract.first.calculation.info", type: "object", objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    meetingDate: { name: "1차 미팅", position: "process.contract.meeting.date", type: "date", searchBoo: true, },
    remainGuide: { name: "잔금 안내", position: "process.contract.remain.guide", type: "date", searchBoo: true, },
    remainDate: { name: "잔금 입금", position: "process.contract.remain.date", type: "date", searchBoo: true, },
    remainSupply: { name: "공급가", position: "process.contract.remain.calculation.amount.supply", type: "number", searchBoo: true, moneyBoo: true },
    remainVat: { name: "VAT", position: "process.contract.remain.calculation.amount.vat", type: "number", searchBoo: true, moneyBoo: true },
    remainConsumer: { name: "소비자가", position: "process.contract.remain.calculation.amount.consumer", type: "number", searchBoo: true, moneyBoo: true },
    remainInfo: { name: "잔금 정보", position: "process.contract.remain.calculation.info", type: "object", objectFunction: methodToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    formGuide: { name: "계약 안내", position: "process.contract.form.guide", type: "date", searchBoo: true, },
    formDateFrom: { name: "프로젝트 시작일", position: "process.contract.form.date.from", type: "date", searchBoo: true, },
    formDateTo: { name: "프로젝트 종료일", position: "process.contract.form.date.to", type: "date", searchBoo: true, },
    method: { name: "정산 방식", position: "process.calculation.method", type: "string", items: [ "사업자(일반)", "사업자(간이)", "프리랜서" ], searchBoo: true, },
    percentage: { name: "수수료", position: "process.calculation.percentage", type: "number", searchBoo: true, },
    calculationInfo: { name: "정산 정보", position: "process.calculation.info", type: "object", objectFunction: accountToObject.toString().replace(/\}$/, '').replace(/function \(value, pastValue, vaildMode\) \{/gi, ''), searchBoo: true, },
    paymentsTotalAmount: { name: "정산 총금액", position: "process.calculation.payments.totalAmount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstAmount: { name: "디자이너 선금", position: "process.calculation.payments.first.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsFirstDate: { name: "선금 지급일", position: "process.calculation.payments.first.date", type: "date", searchBoo: true, },
    paymentsRemainAmount: { name: "디자이너 잔금", position: "process.calculation.payments.remain.amount", type: "number", searchBoo: true, moneyBoo: true },
    paymentsRemainDate: { name: "잔금 지급일", position: "process.calculation.payments.remain.date", type: "date", searchBoo: true, },
    contentsPhotoDate: { name: "촬영일", position: "contents.photo.date", type: "date", searchBoo: true, },
    photographer: { name: "촬영 작가", position: "contents.photo.info.photographer", type: "string", searchBoo: true, },
    interviewer: { name: "인터뷰어", position: "contents.photo.info.interviewer", type: "string", searchBoo: true, },
  };
  return map;
}

//CONTENTS --------------------------------------------------------------------------------------

DataPatch.prototype.contentsStandard = function () {

}

DataPatch.prototype.contentsCardViewStandard = function () {

}

DataPatch.prototype.contentsWhiteViewStandard = function () {

}

DataPatch.prototype.contentsMap = function () {

}

module.exports = DataPatch;
