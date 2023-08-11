# set python modules ------------------------------------------------------------------------------------------------------

from os import path as osPath
from os import getcwd
from sys import argv, path
from json import loads, dumps

# return robot path
def returnModulepath():
    rawPath = getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "robot":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    robotPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "robot": robotPath, "module": modulPath }

# return json data
def getBridge():
    pathDic = returnModulepath()

    # name setting
    thisFile = osPath.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()
    name = fileArr[count - 3]

    # get bridge data
    with open(pathDic["robot"] + "/temp/motherPythonBridge.json", 'r') as jsonFile:
        data = jsonFile.read()

    return loads(data)

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

import boto3
import subprocess
import re
import time

def searchDir(target, detail=False):
    fileList_raw = subprocess.check_output([ "ls", "-al", target ], shell=False, encoding='utf8')

    fileList = fileList_raw.split("\n")
    fileList.pop(fileList.__len__() - 1)
    fileList.pop(0)

    tempArr = []
    for i in fileList:
        newArr = []
        for j in i.split(' '):
            if j != '' and j != ' ':
                newArr.append(j)
        tempArr.append(newArr)

    tempArr2 = []
    for i in tempArr:
        dic = {}
        if i[0][0] == 'd':
            dic["directory"] = True
        else:
            dic["directory"] = False
        if i.__len__() > 9:
            str = ''
            for j in range(8, i.__len__()):
                str += i[j]
                str += ' '
            dic["fileName"] = str[0:-1]
        else:
            dic["fileName"] = i[8]
        if dic["fileName"][0] == '.':
            dic["hidden"] = True
        else:
            dic["hidden"] = False
        dic["absolute"] = target + "/" + dic["fileName"]
        tempArr2.append(dic)

    tempArr3 = []
    for i in tempArr2:
        if i["fileName"] != '.' and i["fileName"] != '..' and re.search("->", i["fileName"]) == None:
            tempArr3.append(i)

    tempArr4 = []
    for i in tempArr3:
        if i["directory"] and detail:
            tempArr5 = searchDir(i["absolute"])
            for j in tempArr5:
                tempArr4.append(j)
        else:
            tempArr4.append(i)

    return tempArr4

try:
    BUCKETNAMECONST = "homeliaison"
    data = getBridge()

    if argv[1] == "fileUpload":
        s3 = boto3.resource("s3")
        fromList = data["fromList"]
        toList = data["toList"]
        fromListLength = fromList.__len__()

        for i in range(fromListLength):
            with open(fromList[i], "rb") as fileBuffer:
                s3.Bucket(BUCKETNAMECONST).put_object(Key=toList[i], Body=fileBuffer)

        print(dumps({ "message": "upload success" }))

    elif argv[1] == "searchDir":
        dirList = searchDir(data["directory"])
        print(dumps(dirList))

    elif argv[1] == "listBucket":

        s3 = boto3.resource("s3")
        bucket = s3.Bucket(BUCKETNAMECONST)

        tong = []
        for obj in bucket.objects.filter(Prefix=data["search"]):
            tong.append(obj.key)

        print(dumps({ "message": tong }))

    elif argv[1] == "listBucketAll":

        s3 = boto3.resource("s3")
        bucket = s3.Bucket(BUCKETNAMECONST)

        tong = []
        for obj in bucket.objects.all():
            tong.append(obj.key)

        print(dumps({ "message": tong }))

    elif argv[1] == "delete":

        s3 = boto3.resource("s3")
        s3.Object(BUCKETNAMECONST, data["key"]).delete()
        print(dumps({ "message": "done" }))



except Exception as e:
    print(e)
