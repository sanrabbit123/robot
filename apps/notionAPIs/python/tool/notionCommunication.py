from notion.client import NotionClient
from datetime import datetime, date
import re as RegExp
from json import dumps, loads

class NotionCommunication:

    def __init__(self, token, host="homeliaison", tempDir="."):
        self.token = token
        self.client = NotionClient(token_v2=self.token)
        self.host = "https://www.notion.so" + "/" + host
        self.tempDir = tempDir

    def getPageLink(self, obj):
        return self.host + '/' + RegExp.sub('-', '', obj.id)

    def notionDateToString(self, instance):
        return str(instance.start.strftime('%Y-%m-%d'))

    def cardToObject(self, obj):
        id = RegExp.sub('-', '', obj.id)
        link = self.getPageLink(obj)
        card = self.client.get_block(link)
        properties = card.get_all_properties()
        dic = {}
        dic["rawId"] = obj.id
        dic["id"] = id
        for key, value in properties.items():
            if RegExp.search('NotionDate', type(value).__name__) == None:
                if RegExp.search('datetime', type(value).__name__) != None:
                    dic[key] = str(value.strftime('%Y-%m-%d'))
                elif type(value).__name__ == 'list':
                    tempArr = []
                    for i in value:
                        if RegExp.search('NotionDate', type(i).__name__) != None:
                            tempArr.append(self.notionDateToString(i))
                    dic[key] = tempArr
                else:
                    dic[key] = value
            else:
                dic[key] = self.notionDateToString(value)
        return dic

    def collectionToJson(self, id, name=''):
        page = self.client.get_block(self.host + "/" + id)
        allRow = page.collection.get_rows()
        resultArr = []
        for i in allRow:
            resultArr.append(self.cardToObject(i))
        fileName = self.tempDir + "/row_" + name + "_toObjectArr_" + RegExp.sub('-', '', datetime.today().strftime('%Y-%m-%d')) + ".json"
        with open(fileName, "w", encoding='utf-8') as f:
            f.write(dumps(resultArr, indent=2, sort_keys=True, ensure_ascii=False))
        return fileName

    def collectionsToJson(self, idArr):
        # idArr = [
        #     { "name": "client", "id": "a054c5877bf84d46aa5c8c5ff3baf4b9" },
        #     { "name": "designer", "id": "9f0bc18ca0b741468919dcbb57d4cc75" },
        # ]
        fileList = []
        for dic in idArr:
            fileList.append(self.collectionToJson(RegExp.sub('-', '', dic["id"]), dic["name"]))
        return fileList

    def blockToJson(self, dataObj):
        # dataObj = {
        #     "blockId": "0da6f7d0806945a3919127b4171adde9",
        #     "targetColumns": [
        #         { "regex": "신규", "name": "newClient" },
        #         { "regex": "프로젝트", "name": "projectContents" },
        #         { "regex": "장기", "name": "oldClient" },
        #         { "regex": "드랍", "name": "dropClient" },
        #         { "regex": "완료", "name": "completeClient" },
        #         { "regex": "디자이너", "name": "designer" },
        #     ]
        # }
        page = self.client.get_block(self.host + "/" + dataObj["blockId"])
        targetCollections = []
        for i in page.children:
            if hasattr(i, "collection"):
                targetCollections.append(i)

        idArr = []
        for i in dataObj["targetColumns"]:
            for j in targetCollections:
                if RegExp.search(i["regex"], j.title) != None:
                    idArr.append({ "name": i["name"], "id": RegExp.sub('-', '', j.id) })

        fileList = self.collectionsToJson(idArr)
        return fileList


data = {
    "blockId": "0da6f7d0806945a3919127b4171adde9",
    "targetColumns": [
        { "regex": "신규", "name": "newClient" },
        { "regex": "프로젝트", "name": "projectContents" },
        { "regex": "장기", "name": "oldClient" },
        { "regex": "드랍", "name": "dropClient" },
        { "regex": "완료", "name": "completeClient" },
        { "regex": "디자이너", "name": "designer" },
    ]
}

app = NotionCommunication(token="4ee0b524880811dd4a6533b5a1e4fa9e7ccee21d23b292994d84b430a48e593d271c820729ab4eed3c91f0d2a94669126eb8eed37ca8ac1e82a01ab21772f252b6898d893207275046b50eeeefd6", host="homeliaison")
app.blockToJson(data)
