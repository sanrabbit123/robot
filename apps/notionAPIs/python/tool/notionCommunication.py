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
                        i.console = "http://127.0.0.1:3000/project?cliid=" + i.cliid
                    else:
                        i.console = "http://127.0.0.1:3000/client?cliid=" + i.cliid
                    i.update = "http://127.0.0.1:3000/loading?notionUpdate=" + i.cliid
                    i.request = 0
            except Exception as e:
                if i.desid != '':
                    i.console = "http://127.0.0.1:3000/designer?desid=" + i.desid
                    i.update = "http://127.0.0.1:3000/loading?notionUpdate=" + i.desid
                    i.request = 0

    def pastToNewDesid(self, dataObj, filter):
        resultArr = self.getAllRows(dataObj)
        for i in resultArr:
            if i.desid != '':
                i.desid = filter[i.desid]

    def getBlockChildren(self, id):
        obj = self.client.get_block(self.host + '/' + RegExp.sub('-', '', id))
        return obj.children

    def blockToLiteObject(self, block):
        resultDic = {}
        resultDic["className"] = block.__class__.__name__
        resultDic["rawId"] = block.id
        resultDic["id"] = RegExp.sub('-', '', block.id)
        if hasattr(block, "title"):
            resultDic["title"] = block.title
        if hasattr(block, "column_ratio"):
            resultDic["column_ratio"] = block.column_ratio
        if hasattr(block, "title_plaintext"):
            resultDic["title_plaintext"] = block.title_plaintext
        if hasattr(block, "color"):
            resultDic["color"] = block.color
        if hasattr(block, "checked"):
            resultDic["checked"] = block.checked
        if hasattr(block, "language"):
            resultDic["language"] = block.language
        if hasattr(block, "wrap"):
            resultDic["wrap"] = block.wrap
        if hasattr(block, "icon"):
            resultDic["icon"] = block.icon
        if hasattr(block, "cover"):
            resultDic["cover"] = block.cover
        if hasattr(block, "locked"):
            resultDic["locked"] = block.locked
        if hasattr(block, "latex"):
            resultDic["latex"] = block.latex
        if hasattr(block, "caption"):
            resultDic["caption"] = block.caption
        if hasattr(block, "display_source"):
            resultDic["display_source"] = block.display_source
        if hasattr(block, "source"):
            resultDic["source"] = block.source
        if hasattr(block, "height"):
            resultDic["height"] = block.height
        if hasattr(block, "full_width"):
            resultDic["full_width"] = block.full_width
        if hasattr(block, "page_width"):
            resultDic["page_width"] = block.page_width
        if hasattr(block, "width"):
            resultDic["width"] = block.width
        if hasattr(block, "file_id"):
            resultDic["file_id"] = block.file_id
        if hasattr(block, "size"):
            resultDic["size"] = block.size
        if hasattr(block, "bookmark_cover"):
            resultDic["bookmark_cover"] = block.bookmark_cover
        if hasattr(block, "bookmark_icon"):
            resultDic["bookmark_icon"] = block.bookmark_icon
        if hasattr(block, "description"):
            resultDic["description"] = block.description
        if hasattr(block, "link"):
            resultDic["link"] = block.link
        return resultDic

    def treeParsing(self, id):
        targetList = self.getBlockChildren(id)
        finalList = []
        for i in targetList:
            tempDic = {}
            tempDic["block"] = self.blockToLiteObject(i)
            if hasattr(i, "children"):
                tempDic["children"] = self.treeParsing(i.id)
            finalList.append(tempDic)
        return finalList

    def treeParsingAndJson(self, id):
        finalList = self.treeParsing(id)
        fileName = self.tempDir + "/treeParsingAndJson.json"
        with open(fileName, "w", encoding='utf-8') as f:
            f.write(dumps(finalList, indent=2, sort_keys=True, ensure_ascii=False))
        return fileName
