from notion.collection import NotionDate
from datetime import datetime, date

class Client:

    def __init__(self, app):
        self.table = app.get_collection_view("https://www.notion.so/83b1e4d9b6f2458fac25afbc757deabc?v=6b2a1f15aab340c9abf6228e8dfc0288")

    def createElement(self, dic):
        row = self.table.collection.add_row()
        dayArr = dic["day"].split('-')
        row.name = dic["title"]
        row.multi = dic["multi"]
        row.select = dic["select"]
        row.number = dic["number"]
        row.email = dic["email"]
        row.text = dic["text"]
        row.phone = dic["phone"]
        row.day = NotionDate(date(int(dayArr[0]), int(dayArr[1]), int(dayArr[2])))
        return row.id

    def createElementsAll(self, arr):
        idArr = []
        for dic in arr:
            tempId = self.createElement(dic)
            idArr.append(tempId)
        return idArr

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
        if element.multi != None and type(element.multi) == list:
            dic["multi"] = element.multi
        else:
            dic["multi"] = []
        if element.select != None:
            dic["select"] = element.select
        else:
            dic["select"] = ""
        if element.number != None:
            dic["number"] = int(element.number)
        else:
            dic["number"] = 0
        if element.email != None:
            dic["email"] = element.email
        else:
            dic["email"] = ""
        if element.text != None:
            dic["text"] = element.text
        else:
            dic["text"] = ""
        if element.phone != None:
            dic["phone"] = element.phone
        else:
            dic["phone"] = "010-0000-0000"
        if element.day != None and isinstance(element.day, NotionDate):
            dic["day"] = str(element.day.start)
        else:
            dic["day"] = "0000-00-00"
        dic["notionId"] = element.id
        return dic

    def getAllRows(self):
        elements = self.getElementsAll()
        resultArr = []
        for element in elements:
            resultArr.append(self.dictionaryFilter(element))
        return resultArr

    def toDictionary(self, id):
        targetDom = self.getElementById(id)
        result = self.dictionaryFilter(targetDom)
        return result
