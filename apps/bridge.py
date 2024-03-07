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
