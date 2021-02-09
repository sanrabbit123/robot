import os
import json
import re

currentDir = os.getcwd().split("/")
if currentDir[currentDir.__len__() - 1] == "catfish":
    from tools.googleUser import *
elif currentDir[currentDir.__len__() - 1] == "tools":
    from googleUser import *

class ReportCampaignClass:
    def __init__(self, dic):
        self.total = dic["total"]
        self.report = dic["report"]

    def toNormal(self):
        dic = {}
        dic["total"] = self.total
        dic["report"] = self.report
        return dic

class GoogleUsers(list):
    def setLength(self, number):
        self.length = number

    def setData(self, inputList):
        for i in inputList:
            self.append(GoogleUser(i))
        self.setLength(len(inputList))
        self.setHistories()
        self.setHistories()
        self.setUserids()
        self.setUserTypes()
        self.setCampaign()
        self.setReferrers()
        self.setReferrerRaws()
        self.setDevices()
        self.setRegion()
        self.setFirstTimeline()
        self.setLatestTimeline()
        self.setSubmit()

    def setLength(self, number):
        self.length = number

    def search(self, pattern):
        arr = GoogleUsers()
        for i in self:
            if i.search(pattern):
                arr.append(i)
        arr.setLength(arr.__len__())
        arr.setHistories()
        arr.setHistories()
        arr.setUserids()
        arr.setUserTypes()
        arr.setCampaign()
        arr.setReferrers()
        arr.setReferrerRaws()
        arr.setDevices()
        arr.setRegion()
        arr.setFirstTimeline()
        arr.setLatestTimeline()
        arr.setSubmit()
        return arr

    def searchAnd(self, patternList):
        arr = GoogleUsers()
        wholeList = range(self.length)
        indexList = []
        filteredList = []
        for j in range(patternList.__len__()):
            for i in wholeList:
                if not self[i].search(patternList[j]):
                    indexList.append(i)
        for j in wholeList:
            if not j in indexList:
                filteredList.append(j)
        for j in filteredList:
            arr.append(self[j])
        arr.setLength(filteredList.__len__())
        arr.setHistories()
        arr.setHistories()
        arr.setUserids()
        arr.setUserTypes()
        arr.setCampaign()
        arr.setReferrers()
        arr.setReferrerRaws()
        arr.setDevices()
        arr.setRegion()
        arr.setFirstTimeline()
        arr.setLatestTimeline()
        arr.setSubmit()
        return arr

    def searchOr(self, patternList):
        arr = GoogleUsers()
        wholeList = range(self.length)
        indexList = []
        for j in range(patternList.__len__()):
            for i in wholeList:
                if self[i].search(patternList[j]):
                    indexList.append(i)
        for j in indexList:
            arr.append(self[j])
        arr.setLength(indexList.__len__())
        arr.setHistories()
        arr.setHistories()
        arr.setUserids()
        arr.setUserTypes()
        arr.setCampaign()
        arr.setReferrers()
        arr.setReferrerRaws()
        arr.setDevices()
        arr.setRegion()
        arr.setFirstTimeline()
        arr.setLatestTimeline()
        arr.setSubmit()
        return arr

    def find(self, pattern):
        return self.search(pattern)

    def filter(self, pattern):
        return self.search(pattern)

    def toNormal(self):
        arr = []
        for i in self:
            arr.append(i.toNormal())
        return arr

    def reportCampaign(self):
        campaignList = []
        for i in self:
            campaignList.append(i.campaign)

        dic = {}
        dic["total"] = self.__len__()
        dic["set"] = list(set(campaignList))

        dic["report"] = {}

        for i in dic["set"]:
            dic["report"][i] = 0

        for j in range(dic["set"].__len__()):
            num = 0
            for i in self:
                if dic["set"][j] == str(i.campaign):
                    num = num + 1
            dic["report"][dic["set"][j]] = num

        return ReportCampaignClass(dic)

    def getUserById(self, id):
        arr = self.search(id)
        if len(arr) > 0:
            return arr[0]
        else:
            return None

    def getUsersByQuery(self, query):
        return self.search(query)

    def isClient(self, boo=True):
        arr = GoogleUsers()
        if boo:
            for i in self:
                if i.submit == "submit":
                    arr.append(i)
        else:
            for i in self:
                if i.submit == "no":
                    arr.append(i)
        arr.setLength(arr.__len__())
        arr.setHistories()
        arr.setHistories()
        arr.setUserids()
        arr.setUserTypes()
        arr.setCampaign()
        arr.setReferrers()
        arr.setReferrerRaws()
        arr.setDevices()
        arr.setRegion()
        arr.setFirstTimeline()
        arr.setLatestTimeline()
        arr.setSubmit()
        return arr

    def client(self, boo=True):
        return self.isClient(boo)

    def getHistories(self):
        arr = HistoryArray()
        for i in self:
            arr.append(i.history)
        return arr

    def setHistories(self):
        self.history = self.getHistories()

    def getUserids(self):
        arr = Array()
        for i in self:
            arr.append(i.userid)
        return arr

    def setUserids(self):
        self.userid = self.getUserids()

    def getUserTypes(self):
        arr = Array()
        for i in self:
            arr.append(i.userType)
        return arr

    def setUserTypes(self):
        self.userType = self.getUserTypes()

    def getCampaign(self):
        arr = Array()
        for i in self:
            arr.append(i.campaign)
        return arr

    def setCampaign(self):
        self.campaign = self.getCampaign()

    def getReferrers(self):
        arr = Array()
        for i in self:
            arr.append(i.referrer)
        return arr

    def setReferrers(self):
        self.referrer = self.getReferrers()

    def getReferrerRaws(self):
        arr = Array()
        for i in self:
            arr.append(i.referrer.raw)
        return arr

    def setReferrerRaws(self):
        self.referrerRaw = self.getReferrerRaws()

    def getDevices(self):
        arr = Array()
        for i in self:
            arr.append(i.device)
        return arr

    def setDevices(self):
        self.device = self.getDevices()

    def getRegion(self):
        arr = Array()
        for i in self:
            arr.append(i.region)
        return arr

    def setRegion(self):
        self.region = self.getRegion()

    def getFirstTimeline(self):
        arr = Array()
        for i in self:
            arr.append(i.firstTimeline)
        return arr

    def setFirstTimeline(self):
        self.firstTimeline = self.getFirstTimeline()

    def getLatestTimeline(self):
        arr = Array()
        for i in self:
            arr.append(i.latestTimeline)
        return arr

    def setLatestTimeline(self):
        self.latestTimeline = self.getLatestTimeline()

    def getSubmit(self):
        arr = Array()
        for i in self:
            arr.append(i.submit)
        return arr

    def setSubmit(self):
        self.submit = self.getSubmit()
