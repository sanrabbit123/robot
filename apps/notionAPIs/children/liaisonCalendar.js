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
  this.hexId = [
    {
      type: "development",
      hangul: "기획",
      id: "61c677f450604a5795ba54f91933237c"
    },
    {
      type: "operation",
      hangul: "운영",
      id: "0c6b28a28b19443d91dcaa72e7656242",
    },
  ];
  this.pageId = this.hexId.map(({ type, id, hangul }) => { return { type, id: this.notion.hexToId(id), hangul } });
  this.id = this.pageId;
  this.iconArr = [ "😇", "🤗", "😎", "🤭", "🤩", "🤨", "🤭" ]
  this.dayArr = [ "월요일", "화요일", "수요일", "목요일", "금요일", "예정", "대표님 요청" ];
}

LiaisonCalendar.prototype.listCalendars = async function (allMode = false, targetMember = null) {
  const instance = this;
  const notion = this.notion;
  const back = this.back;
  const { id } = this;
  const { requestSystem, equalJson, dateToString, stringToDate } = this.mother;
  const members = await back.setMemberObj({ getMode: true });
  try {
    let rawPageContents;
    let targetBlocks;
    let tempBlockObj;
    let targetChildren;
    let tempRaw;
    let tempRaw0, tempRaw1;
    let targetDetailChildren;
    let targetDatabaseId;
    let targetDatabase;
    let thisValueArr;
    let valueMatrix;
    let tempArr;
    let thisYear;
    let tempFrom, tempTo;
    let thisMember;
    let thisMemberId, thisMemberName, thisMemberObj;
    let thisTempObject;
    let resultObject;
    let targets;
    let targetDate;
    let beforeFrom, afterTo;
    let startDate, endDate;
    let returnResultObject;
    let tempResultObject;

    targetDate = new Date();
    if (targetDate.getDay() === 6 || targetDate.getDay() === 0) {
      targetDate.setDate(targetDate.getDate() - 1);
      targetDate.setDate(targetDate.getDate() - 1);
    }

    returnResultObject = async (id) => {
      try {
        let resultObject;

        rawPageContents = await notion.readPage(id);
        targetBlocks = rawPageContents.children.filter((o) => {
          let boo;
          boo = false;
          if (o.type == "toggle") {
            if (Array.isArray(o.toggle?.rich_text)) {
              if (/[0-9]+년[ ]*[0-9]+월/gi.test(notion.readRichText(o.toggle))) {
                boo = true;
              }
            }
          }
          return boo;
        });
    
        targets = [];
        for (let { id, toggle } of targetBlocks) {
          [ startDate, endDate ] = notion.readRichText(toggle).split("~").map((str) => { return stringToDate(str.trim()) });
          beforeFrom = stringToDate(dateToString(startDate));
          afterTo = stringToDate(dateToString(endDate));
          beforeFrom.setDate(beforeFrom.getDate() - 1);
          afterTo.setDate(afterTo.getDate() + 2);
          if (allMode) {
            tempBlockObj = await notion.readPage(id);
            targetChildren = equalJson(JSON.stringify(tempBlockObj.children)).filter((o) => {
              return o.type === "bulleted_list_item";
            });
            targets.push({
              tempBlockObj: equalJson(JSON.stringify(tempBlockObj)),
              targetChildren: equalJson(JSON.stringify(targetChildren)),
              startDate,
              endDate
            });
          } else {
            if (targetDate.valueOf() >= beforeFrom.valueOf() && targetDate.valueOf() < afterTo.valueOf()) {
              tempBlockObj = await notion.readPage(id);
              targetChildren = equalJson(JSON.stringify(tempBlockObj.children)).filter((o) => {
                return o.type === "bulleted_list_item";
              });
              targets.push({
                tempBlockObj: equalJson(JSON.stringify(tempBlockObj)),
                targetChildren: equalJson(JSON.stringify(targetChildren)),
                startDate,
                endDate
              });
            }
          }
        }
    
        resultObject = [];
        for (let { targetChildren, startDate, endDate } of targets) {
          for (let obj of targetChildren) {
            tempRaw = equalJson(JSON.stringify(await notion.readPage(obj.id))).children.filter((z) => { return z.type === "child_database" });
            for (let i = 0; i < tempRaw.length; i++) {
    
              thisMember = tempRaw[i].child_database.title.trim().split(" - ")[1];
              thisMemberObj = members.find((k) => { return k.name === thisMember });
              thisMemberId = thisMemberObj.id;
              thisMemberName = thisMemberObj.name;
              
              targetDatabaseId = tempRaw[i].id;
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
                  raw: equalJson(JSON.stringify(z)),
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
                } else if (/예정/gi.test(o3.day)) {
                  o3.dayNumber = 6;
                } else if (/대표님/gi.test(o3.day)) {
                  o3.dayNumber = 7;
                }
                return o3;
              });
              thisValueArr.sort((a, b) => { return a.dayNumber - b.dayNumber });
    
              valueMatrix = [];
              for (let j = 0; j < 7; j++) {
                tempArr = thisValueArr.filter((x) => { return x.dayNumber === j + 1 });
                valueMatrix.push(equalJson(JSON.stringify(tempArr)));
              }
    
              thisTempObject = {
                date: {
                  from: startDate,
                  to: endDate
                },
                member: {
                  id: thisMemberId,
                  name: thisMemberName
                },
                value: valueMatrix,
                databaseId: targetDatabaseId,
              };
              resultObject.push(equalJson(JSON.stringify(thisTempObject)));
            }
          }
        }

        return resultObject;
      } catch {
        return [];
      }
    }

    resultObject = [];
    for (let { type, id: i } of id) {
      tempResultObject = await returnResultObject(i);
      for (let obj of tempResultObject) {
        obj.type = type;
      }
      resultObject = resultObject.concat(tempResultObject);
    }

    if (targetMember === null) {
      return resultObject;
    } else {
      if (resultObject.find((o) => { return o.member.id === targetMember.id }) === undefined) {
        return null;
      } else {
        return resultObject.find((o) => { return o.member.id === targetMember.id });
      }
    }

  } catch (error) {
    console.log(error);
    return null;
  }
}

LiaisonCalendar.prototype.weeklySummary = async function () {
  const instance = this;
  const notion = this.notion;
  const back = this.back;
  const { requestSystem, equalJson, dateToString, stringToDate } = this.mother;
  const members = await back.setMemberObj({ getMode: true });
  const { dayArr, pageId } = this;
  const motherDatabaseId = "c1372e0770d64043a4343808358d7eaf";
  try {
    let thisWeekAllWorks;
    let typeSet;
    let resultObject;
    let typeTargets;
    let thisValues;
    let children;
    let targetDate;
    let fromDate, toDate;
    let fromDelta, toDelta;
    let thisObject, thisChildObject, thisChildChildObject;
    let dateArr;
    let middleDate0, middleDate1, middleDate2;

    targetDate = new Date();
    if (targetDate.getDay() === 6 || targetDate.getDay() === 0) {
      targetDate.setDate(targetDate.getDate() - 1);
      targetDate.setDate(targetDate.getDate() - 1);
    }

    fromDate = new Date(JSON.stringify(targetDate).slice(1, -1));
    toDate = new Date(JSON.stringify(targetDate).slice(1, -1));

    fromDelta = Math.abs(targetDate.getDay() - 1);
    toDelta = Math.abs(5 - targetDate.getDay());

    for (let i = 0; i < fromDelta; i++) {
      fromDate.setDate(fromDate.getDate() - 1);
    }
    for (let i = 0; i < toDelta; i++) {
      toDelta.setDate(toDelta.getDate() + 1);
    }

    middleDate0 = new Date(JSON.stringify(fromDate).slice(1, -1));
    middleDate1 = new Date(JSON.stringify(fromDate).slice(1, -1));
    middleDate2 = new Date(JSON.stringify(fromDate).slice(1, -1));

    middleDate0.setDate(middleDate0.getDate() + 1);

    middleDate1.setDate(middleDate1.getDate() + 1);
    middleDate1.setDate(middleDate1.getDate() + 1);

    middleDate2.setDate(middleDate2.getDate() + 1);
    middleDate2.setDate(middleDate2.getDate() + 1);
    middleDate2.setDate(middleDate2.getDate() + 1);

    dateArr = [
      dateToString(fromDate),
      dateToString(middleDate0),
      dateToString(middleDate1),
      dateToString(middleDate2),
      dateToString(toDelta),
    ];

    thisWeekAllWorks = await this.listCalendars();

    typeSet = thisWeekAllWorks.map((o) => { return o.type; });
    typeSet = [ ...new Set(typeSet) ];
    typeSet.sort();
    typeSet.reverse();

    children = [];


    // request

    thisObject = {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "대표님 요청",
            },
          }
        ],
        children: []
      }
    };
    for (let typeName of typeSet) {
      typeTargets = thisWeekAllWorks.filter((o) => { return o.type === typeName });
      for (let obj of typeTargets) {
        thisChildObject = {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: obj.member.name
                },
              }
            ],
            children: []
          },
        }
        thisChildObject.bulleted_list_item.children.push({
          object: "block",
          type: "code",
          code: {
            caption: [],
            language: "javascript",
            rich_text: [
              {
                type: "text",
                text: {
                  content: (obj.value[6].map((o) => { return "- " + o.title.replace(/\n/gi, " ") }).join("\n") || " "),
                },
              }
            ]
          }
        });
        thisChildObject.bulleted_list_item.children.push({
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "",
                },
              }
            ]
          }
        });
        thisObject.heading_2.children.push(equalJson(JSON.stringify(thisChildObject)));
      }
    }
    children.push(equalJson(JSON.stringify(thisObject)));
    children.push({
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "",
            },
          }
        ]
      }
    });
    children.push({
      object: "block",
      type: "divider",
      divider: {},
    });


    // detail works

    for (let typeName of typeSet) {
      typeTargets = thisWeekAllWorks.filter((o) => { return o.type === typeName });
      thisObject = {
        object: "block",
        type: "heading_2",
        heading_2: {
          rich_text: [
            {
              type: "text",
              text: {
                content: pageId.find((o) => { return o.type === typeName }).hangul,
              },
            }
          ],
          children: []
        }
      };
      for (let obj of typeTargets) {
        thisChildObject = {
          object: "block",
          type: "bulleted_list_item",
          bulleted_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: obj.member.name
                },
              }
            ],
            children: []
          },
        }
        obj.value.forEach((rawObj, index) => {
          thisChildObject.bulleted_list_item.children.push({
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: dayArr[index] + (dateArr[index] === undefined ? "" : (" : " + dateArr[index])),
                  },
                }
              ]
            }
          });
          thisChildObject.bulleted_list_item.children.push({
            object: "block",
            type: "code",
            code: {
              caption: [],
              language: "javascript",
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: (rawObj.map((o) => { return "- " + o.title.replace(/\n/gi, " ") }).join("\n") || " "),
                  },
                }
              ]
            }
          });
        });
        thisChildObject.bulleted_list_item.children.push({
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "",
                },
              }
            ]
          }
        });
        thisObject.heading_2.children.push(equalJson(JSON.stringify(thisChildObject)));
      }
      children.push(equalJson(JSON.stringify(thisObject)));
      children.push({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "",
              },
            }
          ]
        }
      });
      children.push({
        object: "block",
        type: "divider",
        divider: {},
      });
    }


    // report

    thisObject = {
      object: "block",
      type: "heading_2",
      heading_2: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "회의록",
            },
          }
        ],
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "",
                  },
                }
              ]
            }
          },
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "",
                  },
                }
              ]
            }
          }
        ]
      }
    };
    children.push(equalJson(JSON.stringify(thisObject)));
    children.push({
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "",
            },
          }
        ]
      }
    });
    children.push({
      object: "block",
      type: "divider",
      divider: {},
    });
    children.push({
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: "",
            },
          }
        ]
      }
    });
    children.push({
      object: "block",
      type: "code",
      code: {
        caption: [],
        language: "javascript",
        rich_text: [
          {
            type: "text",
            text: {
              content: " ",
            },
          }
        ]
      }
    });

    await notion.createPage(null, motherDatabaseId, {
      "이름": {
        "title": [
          {
            "text": {
              "content": "주간_" + dateToString(toDate).replace(/\-/gi, ""),
            }
          }
        ]
      },
      "시작일": {
        "date": {
          "start": dateToString(fromDate),
        }
      },
      "종료일": {
        "date": {
          "start": dateToString(toDate),
        }
      },
      "회의일": {
        "date": {
          "start": dateToString(toDate),
        }
      },
    }, "🤨", children)

    return true;

  } catch (error) {
    console.log(error);
    return false;
  }
}

LiaisonCalendar.prototype.createDefaultSet = async function (targetDatabaseId, dayNumber) {
  const instance = this;
  const notion = this.notion;
  const { iconArr, dayArr } = this;
  const { requestSystem, equalJson, stringToDate } = this.mother;
  try {
    if (typeof targetDatabaseId !== "string" || typeof dayNumber !== "number") {
      throw new Error("invalid input");
    }
    const targetDay = dayArr[dayNumber - 1];

    if (targetDay === undefined) {
      throw new Error("invalid day number");
    }

    for (let i = 0; i < iconArr.length; i++) {
      await notion.createPage({
        parent: targetDatabaseId,
        icon: iconArr[iconArr.length - 1 - i],
        properties: {
          title: {
            title: [
              {
                text: {
                  content: "Type : Task title " + String(iconArr.length - 1 - i),
                }
              }
            ]
          },
          "상태": {
            select: {
              name: "예정"
            }
          },
          "요일": {
            multi_select: [
              {
                name: targetDay,
              }
            ]
          },
        }
      });
    }

  } catch (error) {
    console.log(error);
    return null;
  }
}

LiaisonCalendar.prototype.todayComplete = async function (targetDatabaseId, memberObject) {
  const instance = this;
  const notion = this.notion;
  const { dayArr } = this;
  const { requestSystem, equalJson, stringToDate, dateToString, messageSend } = this.mother;
  try {
    if (typeof targetDatabaseId !== "string") {
      throw new Error("invalid input");
    }
    if (typeof memberObject !== "object" || memberObject === null) {
      throw new Error("invalid input 2");
    }
    let today;
    let todayDayNumber;
    let rawChildren;
    let targetChildren;
    let targetId;
    let finalText;

    today = new Date();
    todayDayNumber = today.getDay();
    if (todayDayNumber === 0 || todayDayNumber === 6) {
      today.setDate(today.getDate() - 1);
      today.setDate(today.getDate() - 1);
      todayDayNumber = today.getDay();
    }

    rawChildren = (await notion.readDatabase(targetDatabaseId)).children;
    targetChildren = rawChildren.filter((o) => {
      return o.properties["요일"].multi_select.length > 0;
    }).filter((o) => {
      return (dayArr.findIndex((k) => { return k === o.properties["요일"].multi_select[0].name }) + 1) === todayDayNumber;
    });
    targetId = targetChildren.map((o) => { return o.id });

    for (let id of targetId) {
      await notion.updatePage({
        id,
        properties: {
          "상태": {
            select: {
              name: "완료"
            }
          },
        }
      });
    }

    finalText = targetChildren.map((o) => {
      return "- " + notion.readRichText(o.properties["이름"].title).trim();
    }).join("\n");
    finalText = dateToString(today).replace(/\-/gi, '').slice(2) + " 데일리 업무 보고_" + memberObject.name + "\n\n" + finalText;

    await messageSend({ text: finalText, channel: "#002_staff_report", voice: false });

    return true;

  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = LiaisonCalendar;
