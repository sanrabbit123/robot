from notion.collection import NotionDate
from datetime import datetime, date
import re as RegExp

class Client:


    def __init__(self, app):
        self.client = app
        self.table = app.get_collection_view("https://www.notion.so/a054c5877bf84d46aa5c8c5ff3baf4b9?v=a5f22beba9e748a9b3fb56d9623204bf")


    def createElement(self, dic):
        row = self.table.collection.add_row()
        row.title = dic["title"]
        row.status = "신규 고객"
        row.cliid = dic["cliid"]
        row.phone = dic["phone"]
        row.email = dic["email"]
        row.address = dic["address"]
        row.budget = dic["budget"]
        row.pyeong = int(dic["pyeong"])
        row.contract = dic["contract"]
        row.family = dic["family"]
        dayArr = dic["movein"].split('-')
        row.movein = NotionDate(date(int(dayArr[0]), int(dayArr[1]), int(dayArr[2])))
        row.room = dic["room"]
        row.bathroom = dic["bathroom"]
        row.valcony = dic["valcony"]
        row.etc = dic["etc"]
        row.channel = dic["channel"]
        row.manager = self.client.current_user
        return row.id


    def createElementsAll(self, arr):
        idArr = []
        for dic in arr:
            tempId = self.createElement(dic)
            idArr.append(tempId)
        return idArr


    def updateElement(self, row, dic):
        row.title = dic["title"]
        row.status = dic["status"]
        row.cliid = dic["cliid"]
        row.phone = dic["phone"]
        row.email = dic["email"]
        row.address = dic["address"]
        row.budget = dic["budget"]
        row.pyeong = dic["pyeong"]
        row.contract = dic["contract"]
        row.family = dic["family"]
        dayArr0 = dic["movein"].split('-')
        row.movein = NotionDate(date(int(dayArr0[0]), int(dayArr0[1]), int(dayArr0[2])))
        row.room = dic["room"]
        row.bathroom = dic["bathroom"]
        row.valcony = dic["valcony"]
        row.etc = dic["etc"]
        row.channel = dic["channel"]
        row.service = dic["service"]
        dayArr1 = dic["precheck"].split('-')
        row.precheck = NotionDate(date(int(dayArr1[0]), int(dayArr1[1]), int(dayArr1[2])))
        dayArr2 = dic["empty"].split('-')
        row.empty = NotionDate(date(int(dayArr2[0]), int(dayArr2[1]), int(dayArr2[2])))
        return row.id


    def getElementById(self, id):
        target = []
        for row in self.table.collection.get_rows():
            if row.id == id:
                target.append(row)
        return target[target.__len__() - 1]


    def getElementsAll(self):
        target = []
        for row in self.table.collection.get_rows():
            target.append(row)
        return target


    def dictionaryFilter(self, element):
        dic = {}
        dic["title"] = element.title
        dic["status"] = element.status
        dic["cliid"] = element.cliid
        dic["phone"] = element.phone
        dic["email"] = element.email
        dic["address"] = element.address
        dic["budget"] = element.budget
        dic["pyeong"] = element.pyeong
        dic["contract"] = element.contract
        dic["room"] = element.room
        dic["bathroom"] = element.bathroom
        dic["valcony"] = element.valcony
        dic["etc"] = element.etc
        # dic["designer"] = element.designer
        # dic["manager"] = element.manager
        dic["notionId"] = element.id
        dic["family"] = element.family
        dic["channel"] = element.channel

        if element.movein != None and isinstance(element.movein, NotionDate):
            dic["movein"] = str(element.movein.start)
        else:
            dic["movein"] = "1800-01-01"

        if element.precheck != None and isinstance(element.precheck, NotionDate):
            dic["precheck"] = str(element.precheck.start)
        else:
            dic["precheck"] = "1800-01-01"

        if element.empty != None and isinstance(element.empty, NotionDate):
            dic["empty"] = str(element.empty.start)
        else:
            dic["empty"] = "1800-01-01"

        if element.service != None and type(element.service) == list:
            dic["service"] = element.service
        else:
            dic["service"] = []

        return dic


    def getAllRows(self):
        elements = self.getElementsAll()
        resultArr = []
        for element in elements:
            regex = RegExp.compile("^info")
            regBoo = regex.search(element.title)
            if regBoo == None:
                resultArr.append(self.dictionaryFilter(element))
        return resultArr


    def toDictionary(self, id):
        targetDom = self.getElementById(id)
        result = self.dictionaryFilter(targetDom)
        return result
