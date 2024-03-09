from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
import asyncio

class NotionAPIs:

    def __init__(self):
        self.back = BackMaker()
        self.address = returnAddress()
        self.token = "secret_uSRyGbPynVdrmEeYfvQAp7LDIv0reyNbW58DZP4L6S3"
        self.workspaceName = "homeliaisonworkspace"
        self.url = "https://api.notion.com/v1"
        self.editUrl = "https://www.notion.so/" + self.workspaceName + "/"
        self.headers = {
            "Authorization": "Bearer " + self.token,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28",
        }

    def hexToId(self, hex: str) -> str:
        if type(hex) is not str:
            raise TypeError("hex must be string")
        if patternTest(r"\-", hex) and hex.split("-").__len__() == 5:
            return hex
        else:
            f1 = hex[0:8]
            f2 = hex[8:12]
            f3 = hex[12:16]
            f4 = hex[16:20]
            f5 = hex[20:]
            return '-'.join([ f1, f2, f3, f4, f5 ])

    def idToHex(self, id: str) -> str:
        if type(id) is not str:
            raise TypeError("id must be string")
        return patternReplace(id, r"\-", "")

    def readRichText(self, richTextArr) -> str:
        if type(richTextArr) is list:
            return "".join(listMap(richTextArr, lambda x: x["text"]["content"]))
        elif type(richTextArr) is dict:
            return "".join(listMap(richTextArr["rich_text"], lambda x: x["text"]["content"]))
        else:
            raise TypeError("invalid input")

    async def isPage(self, id: str) -> bool:
        headers = objectDeepCopy(self.headers)
        try:
            url = self.url + "/pages/" + self.hexToId(id)
            res = await requestSystem(url, {}, { "headers": headers })
        except Exception as e:
            url = self.url + "/blocks/" + self.hexToId(id)
            res = await requestSystem(url, {}, { "headers": headers })
        return res["object"] == "page"

    async def readDatabase(self, id: str):
        headers = objectDeepCopy(self.headers)
        delta = 100

        url = self.url + "/databases/" + self.hexToId(id)
        resultObj = await requestSystem(url, {}, { "headers": headers })
        resultObj["date"] = {}
        resultObj["date"]["created"] = dateDeepCopy(resultObj["created_time"])
        resultObj["date"]["edited"] = dateDeepCopy(resultObj["last_edited_time"])
        resultObj["children"] = []

        del resultObj["created_time"]
        del resultObj["last_edited_time"]

        url = self.url + "/databases/" + self.hexToId(id) + "/query"
        res = await requestSystem(url, { "filter": { "or": [] }, "page_size": delta }, { "headers": headers })
        
        for obj in res["results"]:
            copiedObj = objectDeepCopy(obj)
            copiedObj["date"] = {}
            copiedObj["date"]["created"] = dateDeepCopy(obj["created_time"])
            copiedObj["date"]["edited"] = dateDeepCopy(obj["last_edited_time"])
            del copiedObj["created_time"]
            del copiedObj["last_edited_time"]
            resultObj["children"].append(copiedObj)

        while type(res["next_cursor"]) is str:
            cursor = res["next_cursor"]
            res = await requestSystem(url, { "filter": { "or": [] }, "page_size": delta, "start_cursor": cursor }, { "headers": headers })
            for obj in res["results"]:
                copiedObj = objectDeepCopy(obj)
                copiedObj["date"] = {}
                copiedObj["date"]["created"] = dateDeepCopy(obj["created_time"])
                copiedObj["date"]["edited"] = dateDeepCopy(obj["last_edited_time"])
                del copiedObj["created_time"]
                del copiedObj["last_edited_time"]
                resultObj["children"].append(copiedObj)

        resultObj["length"] = resultObj["children"].__len__()

        return resultObj

    async def readPage(self, id: str):
        headers = objectDeepCopy(self.headers)
        delta = 100

        try:
            url = self.url + "/pages/" + self.hexToId(id)
            res = await requestSystem(url, {}, { "headers": headers })
            if res["object"] != "page":
                url = self.url + "/blocks/" + self.hexToId(id)
                res = await requestSystem(url, {}, { "headers": headers })
        except Exception as e:
            url = self.url + "/blocks/" + self.hexToId(id)
            res = await requestSystem(url, {}, { "headers": headers })

        resultObj = objectDeepCopy(res)
        resultObj["date"] = {}
        resultObj["date"]["created"] = dateDeepCopy(resultObj["created_time"])
        resultObj["date"]["edited"] = dateDeepCopy(resultObj["last_edited_time"])
        resultObj["children"] = []

        del resultObj["created_time"]
        del resultObj["last_edited_time"]

        url = self.url + "/blocks/" + self.hexToId(id) + "/children"
        res = await requestSystem(url, { "page_size": delta }, { "method": "get", "headers": headers })
        for obj in res["results"]:
            copiedObj = objectDeepCopy(obj)
            copiedObj["date"] = {}
            copiedObj["date"]["created"] = dateDeepCopy(obj["created_time"])
            copiedObj["date"]["edited"] = dateDeepCopy(obj["last_edited_time"])
            del copiedObj["created_time"]
            del copiedObj["last_edited_time"]
            resultObj["children"].append(copiedObj)

        while type(res["next_cursor"]) is str:
            cursor = res["next_cursor"]
            res = await requestSystem(url, { "page_size": delta, "start_cursor": cursor }, { "method": "get", "headers": headers })
            for obj in res["results"]:
                copiedObj = objectDeepCopy(obj)
                copiedObj["date"] = {}
                copiedObj["date"]["created"] = dateDeepCopy(obj["created_time"])
                copiedObj["date"]["edited"] = dateDeepCopy(obj["last_edited_time"])
                del copiedObj["created_time"]
                del copiedObj["last_edited_time"]
                resultObj["children"].append(copiedObj)

        resultObj["length"] = resultObj["children"].__len__()

        return resultObj

    async def createPage(self, requestObject: dict) -> str:
        headers = objectDeepCopy(self.headers)

        if not "parent" in requestObject:
            raise Exception("invalid input 1")

        url = self.url + "/pages"
        data = {}

        parentIsPage = await self.isPage(self.idToHex(requestObject["parent"]))
        if parentIsPage:
            if not "title" in requestObject:
                raise Exception("invalid input 2")
            data["parent"] = {}
            data["parent"]["page_id"] = self.idToHex(requestObject["parent"])
            data["properties"] = {
                "title": [
                    {
                        "type": "text",
                        "text": {
                            "content": requestObject["title"],
                        }
                    }
                ]
            }
        else:
            if not "properties" in requestObject:
                raise Exception("invalid input 2")
            data["parent"] = {}
            data["parent"]["database_id"] = self.idToHex(requestObject["parent"])
            data["properties"] = requestObject["properties"]

        if "icon" in requestObject:
            data["icon"] = {}
            data["icon"]["emoji"] = requestObject["icon"]

        result = await requestSystem(url, data, { "headers": headers })

        return result["id"]

    async def createDatabase(self, requestObject: dict) -> str:
        headers = objectDeepCopy(self.headers)

        if not "parent" in requestObject:
            raise Exception("invalid input 1")
        if not "title" in requestObject:
            raise Exception("invalid input 2")
        if not "properties" in requestObject:
                raise Exception("invalid input 2")

        url = self.url + "/databases"
        data = {}

        data["parent"] = {}
        data["parent"]["type"] = "page_id"
        data["parent"]["page_id"] = self.idToHex(requestObject["parent"])
        data["title"] = [
            {
                "type": "text",
                "text": {
                    "content": requestObject["title"],
                }
            }
        ]
        data["properties"] = requestObject["properties"]

        if "icon" in requestObject:
            data["icon"] = {}
            data["icon"]["emoji"] = requestObject["icon"]

        result = await requestSystem(url, data, { "headers": headers })

        return result["id"]

    async def appendBlock(self, requestObject: dict):
        headers = objectDeepCopy(self.headers)

        if not "parent" in requestObject:
            raise Exception("invalid input 1")
        if not "children" in requestObject:
            raise Exception("invalid input 2")
        
        url = self.url + "/blocks/" + self.idToHex(requestObject["parent"]) + "/children"
        data = {}
        data["children"] = requestObject["children"]

        result = await requestSystem(url, data, { "method": "patch", "headers": headers })

        return result

    async def updatePage(self, updateObject: dict) -> str:
        headers = objectDeepCopy(self.headers)

        if not "id" in updateObject:
            raise Exception("invalid input 1")
        if not "properties" in updateObject:
            raise Exception("invalid input 2")

        url = self.url + "/pages/" + self.idToHex(updateObject["id"])
        data = {}
        data["properties"] = updateObject["properties"]

        if "icon" in updateObject:
            data["icon"] = {}
            data["icon"]["emoji"] = updateObject["icon"]

        await requestSystem(url, data, { "method": "patch", "headers": headers })

        return updateObject["id"]