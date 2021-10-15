const CronSource = function (mother, back, address) {
  this.mother = mother;
  this.back = back;
  this.address = address;
  this.dir = process.cwd() + "/apps/cronGhost/source";
  this.sourceMap = null;
}

CronSource.prototype.sourceLoad = async function () {
  const instance = this;
  const { fileSystem } = this.mother;
  const { dir } = this;
  try {
    const dateList = await fileSystem(`readFolder`, [ dir + "/day" ]);
    const hourList = await fileSystem(`readFolder`, [ dir + "/hour" ]);
    let dateDetailList, dateFinalList, dateNum;
    let hourDetailList, hourFinalList, hourNum;
    let sourceMap;

    dateDetailList = dateList.map((name) => { return fileSystem(`readFolder`, [ `${dir}/day/${name}` ]); });
    dateFinalList = [];
    dateNum = 0;
    for await (let list of dateDetailList) {
      dateFinalList.push([
        dateList[dateNum],
        list.filter((script) => { return script !== "0_sample.js"; }).map((file) => {
          return `${dir}/day/${dateList[dateNum]}/${file}`;
        }),
      ]);
      dateNum++;
    }

    hourDetailList = hourList.map((name) => { return fileSystem(`readFolder`, [ `${dir}/hour/${name}` ]); });
    hourFinalList = [];
    hourNum = 0;
    for await (let list of hourDetailList) {
      hourFinalList.push([
        hourList[hourNum],
        list.filter((script) => { return script !== "0_sample.js"; }).map((file) => {
          return `${dir}/day/${dateList[dateNum]}/${file}`;
        }),
      ]);
      hourNum++;
    }

    sourceMap = {
      date: dateFinalList,
      hour: hourFinalList
    };

    this.sourceMap = sourceMap;

    console.log(sourceMap.date);

    return sourceMap;

  } catch (e) {
    console.log(e);
  }
}

module.exports = CronSource;
