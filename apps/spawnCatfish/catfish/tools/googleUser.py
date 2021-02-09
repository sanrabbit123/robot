import os
import json
import re
import datetime

class Array(list):
    def toNormal(self):
        arr = []
        for i in self:
            if (isinstance(i, DataObject)):
                arr.append(i.toString())
            else:
                arr.append(i.toNormal())
        return arr

class HistoryArray(list):
    def report(self):
        arr = Array()
        for i in self:
            arr.append(i.report())
        return arr

    def toNormal(self):
        arr = []
        for i in self:
            if (isinstance(i, DataObject)):
                arr.append(i.toString())
            else:
                arr.append(i.toNormal())
        return arr

class Words(str):
    def search(self, pattern):
        return not (re.search(pattern=pattern, string=self, flags=re.IGNORECASE) is None)

    def toNormal(self):
        return str(self)

class Number(int):
    def toNormal(self):
        return int(self)

class DictObject(dict):
    def toNormal(self):
        return self

class DataObject:

    def __init__(self, year, month=None, date=None, hour=None, minute=None, second=None):
        if isinstance(year, list):
            if year.__len__() != 6:
                raise Exception('invalid input')
            else:
                self.year = Number(year[0])
                self.month = Number(year[1])
                self.date = Number(year[2])
                self.hour = Number(year[3])
                self.minute = Number(year[4])
                self.second = Number(year[5])

        elif isinstance(year, str):
            tempList = year.split("_")
            if tempList.__len__() != 6:
                raise Exception('invalid input')
            else:
                self.year = Number(tempList[0])
                self.month = Number(tempList[1])
                self.date = Number(tempList[2])
                self.hour = Number(tempList[3])
                self.minute = Number(tempList[4])
                self.second = Number(tempList[5])

        else:
            if month is None or date is None or hour is None or minute is None or second is None:
                raise Exception('invalid input')
            else:
                self.year = Number(year)
                self.month = Number(month)
                self.date = Number(date)
                self.hour = Number(hour)
                self.minute = Number(minute)
                self.second = Number(second)

        self.datetime = datetime.datetime(self.year, self.month, self.date, hour=self.hour, minute=self.minute, second=self.second)
        self.value = (self.year * 10000000000) + (self.month * 100000000) + (self.date * 1000000) + (self.hour * 10000) + (self.minute * 100) + self.second

    def zeroAddition(self, num):
        if num < 10:
            return '0' + Words(num)
        else:
            return Words(num)

    def search(self, pattern):
        boolean = not (re.search(pattern=pattern, string=self.toString(), flags=re.IGNORECASE) is None)
        return boolean

    def toString(self):
        return Words(self.year) + '-' + self.zeroAddition(self.month) + '-' + self.zeroAddition(self.date) + ' ' + self.zeroAddition(self.hour) + ':' + self.zeroAddition(self.minute) + ':' + self.zeroAddition(self.second)

    def subtract(self, date = 1):
        self.datetime = self.datetime - datetime.timedelta(days=date)
        self.year = self.datetime.year
        self.month = self.datetime.month
        self.date = self.datetime.day
        self.hour = self.datetime.hour
        self.minute = self.datetime.minute
        self.second = self.datetime.second
        return self

    def add(self, date = 1):
        self.datetime = self.datetime - datetime.timedelta(days=date)
        self.year = self.datetime.year
        self.month = self.datetime.month
        self.date = self.datetime.day
        self.hour = self.datetime.hour
        self.minute = self.datetime.minute
        self.second = self.datetime.second
        return self

    def compare(self, dateObject):
        return Number(Number(self.datetime.timestamp() - dateObject.datetime.timestamp()) / 60)

    def toNormal(self):
        return Words(self.year) + "_" + Words(self.month) + "_" + Words(self.date) + "_" + Words(self.hour) + "_" + Words(self.minute) + "_" + Words(self.second)

class Device:
    def __init__(self, dic):
        self.mobileDevice = Words(dic["mobileDevice"])
        self.os = Words(dic["os"])
        self.type = Words(dic["type"])

    def search(self, pattern):
        boolean0 = not (re.search(pattern=pattern, string=self.mobileDevice, flags=re.IGNORECASE) is None)
        boolean1 = not (re.search(pattern=pattern, string=self.os, flags=re.IGNORECASE) is None)
        boolean2 = not (re.search(pattern=pattern, string=self.type, flags=re.IGNORECASE) is None)
        return (boolean0 or boolean1 or boolean2)

    def toNormal(self):
        dic = {}
        dic["mobileDevice"] = self.mobileDevice
        dic["os"] = self.os
        dic["type"] = self.type
        return dic

class HistoryDetail:
    def __init__(self, dic):
        self.page = Words(dic["page"])
        self.page_raw = Words(dic["page_raw"])
        self.time = DataObject(dic["time"])

    def search(self, pattern):
        boolean0 = not (re.search(pattern=pattern, string=self.page, flags=re.IGNORECASE) is None)
        boolean1 = not (re.search(pattern=pattern, string=self.page_raw, flags=re.IGNORECASE) is None)
        boolean2 = self.time.search(pattern)
        return (boolean0 or boolean1 or boolean2)

    def toNormal(self):
        dic = {}
        dic["page"] = self.page
        dic["page_raw"] = self.page_raw
        dic["time"] = self.time.toString()
        return dic

class History(list):

    def setLength(self, number):
        self.length = number

    def setDetails(self, dic):
        for i in dic:
            self.append(HistoryDetail(i))
        self.setLength(len(self))

    def search(self, pattern):
        targetIndexes = []
        for i in range(len(self)):
            if self[i].search(pattern):
                targetIndexes.append(i)

        result = Array()
        for i in targetIndexes:
            result.append(self[i])

        return result.__len__() > 0

    def report(self):
        arr = Array()
        for i in range(self.length):
            if i != self.length - 1:
                temp = DictObject()
                temp["page"] = self[i].page + " (" + self[i].page_raw + ")"
                temp["stay"] = Words(self[i + 1].time.compare(self[i].time)) + '분'
                temp["stay_int"] = Number(self[i + 1].time.compare(self[i].time))
                arr.append(temp)

        temp = DictObject()
        temp["page"] = self[self.length - 1].page + " (" + self[self.length - 1].page_raw + ")"
        temp["stay"] = Words("알 수 없음")
        temp["stay_int"] = Number(0)
        arr.append(temp)

        return arr

    def toNormal(self):
        arr = []
        for i in self:
            arr.append(i.toNormal())
        return arr

class ReferrerDetail:
    def __init__(self, dic):
        self.host = Words(dic["host"])
        self.queryString = Words(dic["queryString"])

    def search(self, pattern):
        boolean0 = not (re.search(pattern=pattern, string=self.host, flags=re.IGNORECASE) is None)
        boolean1 = not (re.search(pattern=pattern, string=self.queryString, flags=re.IGNORECASE) is None)
        return (boolean0 or boolean1)

    def toNormal(self):
        dic = {}
        dic["host"] = self.host
        dic["queryString"] = self.queryString
        return dic

class Referrer:
    def __init__(self, dic):
        self.name = Words(dic["name"])
        self.raw = Words(dic["raw"])
        self.detail = ReferrerDetail(dic["detail"])

    def search(self, pattern):
        boolean0 = not (re.search(pattern=pattern, string=self.name, flags=re.IGNORECASE) is None)
        boolean1 = not (re.search(pattern=pattern, string=self.raw, flags=re.IGNORECASE) is None)
        boolean2 = self.detail.search(pattern)
        return (boolean0 or boolean1 or boolean2)

    def toNormal(self):
        dic = {}
        dic["name"] = self.name
        dic["raw"] = self.raw
        dic["detail"] = self.detail.toNormal()
        return dic

class Region:
    def __init__(self, dic):
        self.city = Words(dic["city"])
        self.country = Words(dic["country"])

    def search(self, pattern):
        boolean0 = not (re.search(pattern=pattern, string=self.city, flags=re.IGNORECASE) is None)
        boolean1 = not (re.search(pattern=pattern, string=self.country, flags=re.IGNORECASE) is None)
        return (boolean0 or boolean1)

    def toNormal(self):
        dic = {}
        dic["city"] = self.city
        dic["country"] = self.country
        return dic

class GoogleUser:
    def __init__(self, dic):
        self.campaign = Words(dic["campaign"])
        self.device = Device(dic["device"])
        self.firstTimeline = DataObject(dic["firstTimeline"])
        self.history = History()
        self.history.setDetails(dic["history"])
        self.latestTimeline = DataObject(dic["latestTimeline"])
        self.ref = Words(dic["referrer"]["raw"])
        self.referrer = Referrer(dic["referrer"])
        self.region = Region(dic["region"])
        self.userType = Words(dic["userType"])
        self.userid = Words(dic["userid"])
        self.submit = Words(dic["submit"])

    def search(self, pattern):
        boolean0 = not (re.search(pattern=pattern, string=self.campaign, flags=re.IGNORECASE) is None)
        boolean1 = self.device.search(pattern)
        boolean2 = self.firstTimeline.search(pattern)
        boolean3 = self.history.search(pattern)
        boolean4 = self.latestTimeline.search(pattern)
        boolean5 = self.referrer.search(pattern)
        boolean6 = self.region.search(pattern)
        boolean7 = not (re.search(pattern=pattern, string=self.userType, flags=re.IGNORECASE) is None)
        boolean8 = not (re.search(pattern=pattern, string=self.userid, flags=re.IGNORECASE) is None)
        boolean9 = not (re.search(pattern=pattern, string=self.submit, flags=re.IGNORECASE) is None)
        return (boolean0 or boolean1 or boolean2 or boolean3 or boolean4 or boolean5 or boolean6 or boolean7 or boolean8 or boolean9)

    def toNormal(self):
        dic = {}
        dic["campaign"] = self.campaign
        dic["device"] = self.device.toNormal()
        dic["firstTimeline"] = self.firstTimeline.toString()
        dic["history"] = self.history.toNormal()
        dic["latestTimeline"] = self.latestTimeline.toString()
        dic["referrer"] = self.referrer.toNormal()
        dic["region"] = self.region.toNormal()
        dic["userType"] = self.userType
        dic["userid"] = self.userid
        dic["submit"] = self.submit
        return dic
