from notion.client import NotionClient
from datetime import datetime, date
import re as RegExp
from json import dumps, loads

class NotionCommunication:

    def __init__(self, token, tempDir="."):
        self.token = token
        self.client = NotionClient(token_v2=self.token)
        self.host = "https://www.notion.so"
        self.tempDir = tempDir

    def getPageLink(self, obj):
        return self.host + '/' + RegExp.sub('-', '', obj.id)

    def notionDateToString(self, instance):
        return str(instance.start.strftime('%Y-%m-%d'))

    def cardToObject(self, obj, motherId=""):
        id = RegExp.sub('-', '', obj.id)
        link = self.getPageLink(obj)
        card = self.client.get_block(link)
        properties = card.get_all_properties()
        dic = {}
        dic["parentId"] = motherId
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
            resultArr.append(self.cardToObject(i, motherId=id))
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

    def selectTargets(self, dataObj):
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

        return idArr

    def blockToJson(self, dataObj):
        idArr = self.selectTargets(dataObj)
        fileList = self.collectionsToJson(idArr)
        return fileList

    def getAllRows(self, dataObj):
        idArr = self.selectTargets(dataObj)

        resultArr = []
        for dic in idArr:
            page = self.client.get_block(self.host + "/" + RegExp.sub('-', '', dic["id"]))
            allRow = page.collection.get_rows()
            for i in allRow:
                resultArr.append(i)

        return resultArr

    def getElementById(self, id):
        obj = self.client.get_block(self.host + '/' + RegExp.sub('-', '', id))
        return self.cardToObject(obj)

    def setConsoleLink(self, dataObj):
        resultArr = self.getAllRows(dataObj)
        for i in resultArr:
            try:
                if i.cliid != '':
                    if i.status == '현장 미팅' or i.status == '잔금 대기' or i.status == '계약서' or i.status == '프로젝트 진행' or i.status == '디자인 제안' or i.status == '시공 제안' or i.status == '스타일링 제안':
                        i.console = "http://127.0.0.1:8080/project?cliid=" + i.cliid
                    else:
                        i.console = "http://127.0.0.1:8080/client?cliid=" + i.cliid
            except Exception as e:
                if i.desid != '':
                    i.console = "http://127.0.0.1:8080/designer?desid=" + i.desid
