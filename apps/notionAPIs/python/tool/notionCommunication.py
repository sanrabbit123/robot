from notion.client import NotionClient
from datetime import datetime, date
import re as RegExp
from json import dumps, loads
import datetime

class NotionCommunication:

    def __init__(self, token, tempDir="."):
        self.token = token
        self.client = NotionClient(token_v2=self.token)
        self.host = "https://www.notion.so"
        self.tempDir = tempDir
        self.user = "homeliaison"

    def getPageLink(self, obj):
        return self.host + '/' + self.user + '/' + RegExp.sub('-', '', obj.id)

    def idToLink(self, id):
        if RegExp.match("http", id) != None:
            return id
        else:
            return self.host + '/' + self.user + '/' + RegExp.sub('-', '', id)

    def notionDateToString(self, instance):
        return str(instance.start.strftime("%Y-%m-%d %H:%M:%S"))

    def getBlockChildren(self, id):
        obj = self.client.get_block(self.host + '/' + RegExp.sub('-', '', id))
        return obj.children

    def cardToObject(self, obj, motherId=""):
        id = RegExp.sub('-', '', obj.id)
        link = self.getPageLink(obj)
        card = self.client.get_block(link)
        properties = card.get_all_properties()
        dic = {}
        dic["parentId"] = motherId
        dic["id"] = id
        for key, value in properties.items():
            if RegExp.search('NotionDate', type(value).__name__) == None:
                if RegExp.search('datetime', type(value).__name__) != None:
                    dic[key] = str(value.strftime("%Y-%m-%d %H:%M:%S"))
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

    def getCollection(self, id):
        page = self.client.get_block(self.idToLink(id))
        allRow = page.collection.get_rows()
        resultArr = []
        for i in allRow:
            resultArr.append(self.cardToObject(i, motherId=id))
        return resultArr

    def appendRow(self, id, dic):
        if not isinstance(id, str) or not isinstance(dic, dict):
            raise Exception("invaild input")

        page = self.client.get_block(self.idToLink(id))
        row = page.collection.add_row()
        for key, value in dic.items():
            if isinstance(value, str):
                if RegExp.search("[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] [0-9][0-9]:[0-9][0-9]:[0-9][0-9]", value) != None:
                    tempList = value.split(" ")
                    tempList2 = tempList[0].split("-")
                    tempList3 = tempList[1].split(":")
                    setattr(row, key, datetime.datetime(int(tempList2[0]), int(tempList2[1]), int(tempList2[2]), int(tempList3[0]), int(tempList3[1]), int(tempList3[2])))
                elif RegExp.search("[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]", value) != None:
                    tempList = value.split("-")
                    setattr(row, key, datetime.datetime(int(tempList[0]), int(tempList[1]), int(tempList[2]), 15, 0, 0))
                else:
                    setattr(row, key, value)
            else:
                setattr(row, key, value)

        return "done"
