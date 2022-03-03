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
    pythonCloudPath = resultPath + "apps/pythonCloud/python/tool"
    return { "robot": robotPath, "module": modulPath, "pythonCloud": pythonCloudPath }

# return json data
def getBridge():
    pathDic = returnModulepath()

    # name setting
    thisFile = osPath.abspath(__file__)
    fileArr = thisFile.split('/')
    count = fileArr.__len__()
    name = fileArr[count - 3]

    # get bridge data
    try:
        with open(pathDic["robot"] + "/temp/" + name + ".json", 'r') as jsonFile:
            data = jsonFile.read()
    except Exception as e:
        data = {}

    return loads(data)

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
    path.append(pathDic["pythonCloud"])

except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

import pandas
import re

def excelRead(data):
    dic = pandas.read_excel(data["filePath"], sheet_name=None)
    arr = dic[data["sheetsName"]].values.tolist()

    columns = dic[data["sheetsName"]].columns.tolist()
    firstArr = []
    for i in columns:
        if isinstance(i, str):
            if re.search("Unnamed: ", i) is None:
                firstArr.append(i)
            else:
                firstArr.append(None)
        else:
            firstArr.append(None)
    arr.insert(0, firstArr)
    j = dumps(arr, ensure_ascii=False).replace("NaN", "null")
    return loads(j)

try:
    data = getBridge()
    print(dumps(excelRead(data)))

except Exception as e:
    print(e)
