from json import dumps
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

    def toDictionary(self, id):
        targetDom = self.getElementById(id)
        result = {
            "title": targetDom.title,
            "multi": targetDom.multi,
            "select": targetDom.select,
            "number": targetDom.number,
            "email": targetDom.email,
            "text": targetDom.text,
            "phone": targetDom.phone,
            "day": str(targetDom.day.start),
        }
        return result

    def toJson(self, id):
        return dumps(self.toDictionary(id))
