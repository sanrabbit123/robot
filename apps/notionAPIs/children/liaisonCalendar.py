from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from apps.notionAPIs.notionAPIs import NotionAPIs
import asyncio

class LiaisonCalendar:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()
        self.members = returnMembers()
        self.notion = NotionAPIs()
        self.hexId = [
            {
                "type": "operation",
                "hangul": "운영",
                "id": "0c6b28a28b19443d91dcaa72e7656242",
            },
            {
                "type": "development",
                "hangul": "기획",
                "id": "61c677f450604a5795ba54f91933237c"
            },
        ]
        def callbackFunc(o):
            return { "type": o["type"], "id": self.notion.hexToId(o["id"]), "hangul": o["hangul"] }
        self.pageId = listMap(self.hexId, callbackFunc)

    async def listCalendars(self, allMode: bool = False, targetMember = None):
        members = self.members
        notion = self.notion

        targetDate = getNowDate()
        if targetDate.weekday() == 5 or targetDate.weekday() == 6:
            setRelativeDate(targetDate, -2, "date")

        async def returnResultObject(id: str):
            rawPageContents = await notion.readPage(id)
            def targetBlocksFilter(o):
                b = False
                if o["type"] == "toggle":
                    if type(o["toggle"]["rich_text"]) is list:
                        if patternTest(r"[0-9]+년[ ]*[0-9]+월", notion.readRichText(o["toggle"])):
                            b = True
                return b
            targetBlocks = listFilter(rawPageContents["children"], targetBlocksFilter)

            targets = []
            for obj in targetBlocks:
                dateArr = listMap(notion.readRichText(obj["toggle"]).split("~"), lambda x: stringToDate(x.strip()))
                [ startDate, endDate ] = dateArr
                beforeFrom = dateDeepCopy(startDate)
                afterTo = dateDeepCopy(endDate)
                setRelativeDate(beforeFrom, -1, "date")
                setRelativeDate(afterTo, 2, "date")
                if allMode:
                    tempBlockObj = await notion.readPage(obj["id"])
                    targetChildren = listFilter(objectDeepCopy(tempBlockObj["children"]), lambda o: o["type"] == "bulleted_list_item")
                    targets.append({ "tempBlockObj": objectDeepCopy(tempBlockObj), "targetChildren": objectDeepCopy(targetChildren), "startDate": startDate, "endDate": endDate })
                else:
                    if getDateValue(targetDate) >= getDateValue(beforeFrom) and getDateValue(targetDate) < getDateValue(afterTo):
                        tempBlockObj = await notion.readPage(obj["id"])
                        targetChildren = listFilter(objectDeepCopy(tempBlockObj["children"]), lambda o: o["type"] == "bulleted_list_item")
                        targets.append({ "tempBlockObj": objectDeepCopy(tempBlockObj), "targetChildren": objectDeepCopy(targetChildren), "startDate": startDate, "endDate": endDate })

            resultObject = []
            for target in targets:
                for obj in target["targetChildren"]:
                    tempRaw = await notion.readPage(obj["id"])
                    tempRaw = objectDeepCopy(tempRaw["children"])
                    tempRaw = listFilter(tempRaw, lambda x: x["type"] == "child_database")
                    number = 0
                    for raw in tempRaw:
                        thisMember = (listMap(raw["child_database"]["title"].strip().split(" - "), lambda x: x.strip()))[1]
                        thisMemberObj = listFind(members, lambda x: x["name"] == thisMember)
                        thisMemberId = thisMemberObj["id"]
                        thisMemberName = thisMemberObj["name"]

                        targetDatabaseId = raw["id"]
                        targetDatabase = await notion.readDatabase(targetDatabaseId)

                        def thisValueArrMap0(z):
                            valuesArr = list(z["properties"].values())
                            titleRawArr = listFind(valuesArr, lambda x: x["id"] == "title")["title"]
                            titleRawArr = "".join(listMap(titleRawArr, lambda x: x["plain_text"]))

                            statusRaw = listFind(valuesArr, lambda x: x["type"] == "status")["status"]["name"]
                            dayRawArr = listFind(valuesArr, lambda x: x["type"] == "multi_select")["multi_select"]
                            if len(dayRawArr) > 0:
                                dayRawArr = dayRawArr[0]["name"]
                            else:
                                dayRawArr = None

                            return { "title": titleRawArr, "status": statusRaw, "day": dayRawArr, "raw": objectDeepCopy(z) }
                        thisValueArr = listMap(targetDatabase["children"], thisValueArrMap0)
                        thisValueArr = listFilter(thisValueArr, lambda x: x["day"] is not None)

                        resultObject.append({
                            "date": {
                                "from": target["startDate"],
                                "to": target["endDate"],
                            },
                            "member": {
                                "id": thisMemberId,
                                "name": thisMemberName,
                            },
                            "value": objectDeepCopy(thisValueArr),
                            "databaseId": targetDatabaseId
                        })
                        number = number + 1

            return resultObject

        finalList = []
        for obj in self.pageId:
            thisList = await returnResultObject(obj["id"])
            finalList.extend(thisList)

        if targetMember is None:
            return finalList
        else:
            return listFind(finalList, lambda x: x["member"]["id"] == targetMember["id"])
