const LiaisonCalendar = function (mother = null, back = null, address = null) {
  if (mother !== null && back !== null && address !== null) {
    this.mother = mother;
    this.back = back;
    this.address = address;
  } else {
    const Mother = require(process.cwd() + "/apps/mother.js");
    const BackMaker = require(process.cwd() + "/apps/backMaker/backMaker.js");
    const ADDRESS = require(process.cwd() + "/apps/infoObj.js");
    this.mother = new Mother();
    this.back = new BackMaker();
    this.address = ADDRESS;
  }
  this.dir = process.cwd() + "/apps/notionAPIs";
  
  const NotionAPIs = require(this.dir + "/notionAPIs.js");
  this.notion = new NotionAPIs(this.mother, this.back, this.address);
  this.hexId = "61c677f450604a5795ba54f91933237c";
  this.pageId = this.notion.hexToId(this.hexId);
  this.id = this.pageId;
}

LiaisonCalendar.prototype.listCalendars = async function () {
  const instance = this;
  const notion = this.notion;
  const { id } = this;
  const { requestSystem, equalJson } = this.mother;
  try {
    const rawPageContents = await notion.readPage(id);
    const targetBlocks = rawPageContents.children.filter((o) => {
      let boo;
      boo = false;
      if (o.type == "heading_2") {
        if (Array.isArray(o.heading_2?.rich_text)) {
          if (/[0-9]+년[ ]*[0-9]+월/gi.test(notion.readRichText(o.heading_2))) {
            boo = true;
          }
        }
      }
      return boo;
    });
    let tempBlockObj;
    let targetChildren;
    let tempRaw;
    let tempRaw0, tempRaw1;
    let targetDetailChildren;
    let targetDatabaseId;
    let targetDatabase;
    let thisValueArr;

    for (let { id } of targetBlocks) {
      tempBlockObj = await notion.readPage(id);
      targetChildren = equalJson(JSON.stringify(tempBlockObj.children)).filter((o) => {
        return o.type === "toggle";
      });

      for (let obj of targetChildren) {

        console.log(notion.readRichText(obj.toggle))
        tempRaw = equalJson(JSON.stringify(await notion.readPage(obj.id))).children;
        tempRaw0 = tempRaw.filter((o) => { return o.type === "bulleted_list_item" })
        tempRaw1 = tempRaw.filter((o) => { return o.type === "toggle" })

        for (let i = 0; i < tempRaw1.length; i++) {
          targetDetailChildren = await notion.readPage(tempRaw1[i].id);
          console.log(notion.readRichText(tempRaw0[i].bulleted_list_item))
          targetDatabaseId = targetDetailChildren.children.find((z) => { return z.type === "child_database" })?.id;
          targetDatabase = await notion.readDatabase(targetDatabaseId);

          thisValueArr = targetDatabase.children.map((z) => {
            let titleRawArr, valuesArr;
            let statusRaw, dayRawArr;

            valuesArr = Object.values(z.properties);

            titleRawArr = valuesArr.find((k) => { return k.id === "title" }).title;
            titleRawArr = titleRawArr.map((x) => { return x.plain_text }).join("");

            statusRaw = valuesArr.find((k) => { return k.type === "select" }).select?.name || "알 수 없음";
            dayRawArr = valuesArr.find((k) => { return k.type === "multi_select" }).multi_select;
            if (dayRawArr.length > 0) {
              dayRawArr = dayRawArr[0].name;
            } else {
              dayRawArr = null;
            }

            return {
              title: titleRawArr,
              status: statusRaw,
              day: dayRawArr,
            };
          }).filter((o3) => { return o3.day !== null }).map((o3) => {
            if (/월/gi.test(o3.day)) {
              o3.dayNumber = 1;
            } else if (/화/gi.test(o3.day)) {
              o3.dayNumber = 2;
            } else if (/수/gi.test(o3.day)) {
              o3.dayNumber = 3;
            } else if (/목/gi.test(o3.day)) {
              o3.dayNumber = 4;
            } else if (/금/gi.test(o3.day)) {
              o3.dayNumber = 5;
            }
            return o3;
          });
          thisValueArr.sort((a, b) => { return a.dayNumber - b.dayNumber });

          console.log(thisValueArr);

        }



      }
    }




    






    

  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = LiaisonCalendar;
