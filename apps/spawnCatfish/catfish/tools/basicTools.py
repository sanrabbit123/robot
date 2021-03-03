import os
import json
import re
import subprocess

currentDir = os.getcwd().split("/")
if currentDir[currentDir.__len__() - 1] == "catfish":
    from tools.googleUsers import *
    from tools.googleUser import *
    currentDirRoot = '/'.join(currentDir)
elif currentDir[currentDir.__len__() - 1] == "tools":
    from googleUsers import *
    from googleUser import *
    currentDirRoot = '/'.join(currentDir)
    currentDirRoot = currentDirRoot[0:-6]

def readData(startDay, endDay):
    if isinstance(startDay, dict):
        startYear = str(startDay["year"])
        if startDay["month"] < 10:
            startMonth = f'0{str(startDay["month"])}'
        else:
            startMonth = str(startDay["month"])
        if startDay["date"] < 10:
            startDate = f'0{str(startDay["date"])}'
        else:
            startDate = str(startDay["date"])
        startDateFull = f'{startYear}-{startMonth}-{startDate}'

        endYear = str(endDay["year"])
        if endDay["month"] < 10:
            endMonth = f'0{str(endDay["month"])}'
        else:
            endMonth = str(endDay["month"])
        if endDay["date"] < 10:
            endDate = f'0{str(endDay["date"])}'
        else:
            endDate = str(endDay["date"])
        endDateFull = f'{endYear}-{endMonth}-{endDate}'
    else:
        startYear = str(startDay[0])
        if startDay[1] < 10:
            startMonth = f'0{str(startDay[1])}'
        else:
            startMonth = str(startDay[1])
        if startDay[2] < 10:
            startDate = f'0{str(startDay[2])}'
        else:
            startDate = str(startDay[2])
        startDateFull = f'{startYear}-{startMonth}-{startDate}'

        endYear = str(endDay[0])
        if endDay[1] < 10:
            endMonth = f'0{str(endDay[1])}'
        else:
            endMonth = str(endDay[1])
        if endDay[2] < 10:
            endDate = f'0{str(endDay[2])}'
        else:
            endDate = str(endDay[2])
        endDateFull = f'{endYear}-{endMonth}-{endDate}'

    commandList = [ "node", currentDirRoot + "/node/fromMongo.js", startDateFull, endDateFull ]
    subprocess.run(commandList, shell=False, encoding='utf8')
    with open(f"{currentDirRoot}/jsondata/analyticsExtract_{startDateFull}_{endDateFull}.json", "rt", encoding="utf8") as file:
        resultText = file.read()

    final = GoogleUsers()
    final.setData(json.loads(resultText))

    return final

def query(q):
    commandList = [ "node", currentDirRoot + "/node/fromMysql.js", q ]
    subprocess.run(commandList, shell=False, encoding='utf8')
    with open(f"{currentDirRoot}/jsondata/mysqlQueryResult.json", "rt", encoding="utf8") as file:
        resultText = file.read()

    return json.loads(resultText)

def view(dic, indent=4):
    if isinstance(dic, DataObject):
        print(dic.toString())
    elif isinstance(dic, HistoryArray) or isinstance(dic, DictObject) or isinstance(dic, Device) or isinstance(dic, HistoryDetail) or isinstance(dic, History) or isinstance(dic, ReferrerDetail) or isinstance(dic, Referrer) or isinstance(dic, Region) or isinstance(dic, GoogleUser) or isinstance(dic, GoogleUsers) or isinstance(dic, ReportCampaignClass) or isinstance(dic, Array):
        tempDic = dic.toNormal()
        print(json.dumps(tempDic, indent=indent, sort_keys=True, ensure_ascii=False))
    elif isinstance(dic, dict) or isinstance(dic, list):
        print(json.dumps(dic, indent=indent, sort_keys=True, ensure_ascii=False))
    else:
        print(dic)
