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
    with open(pathDic["robot"] + "/temp/" + name + ".json", 'r') as jsonFile:
        data = jsonFile.read()

    return loads(data)

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

from tool.dateCalculation import DateCalculation

try:

    data = getBridge()

    if argv[1] == 'dateMatrix':
        dateApp = DateCalculation(data["length"])
        print(dumps(dateApp.getDateMatrix()))

    if argv[1] == 'dateMatrixFullSet':
        dateApp = DateCalculation(data["length"])
        print(dumps(dateApp.getDateMatrix(fullSet=True, future=True)))

    if argv[1] == 'thisWeek':
        dateApp = DateCalculation(2)
        print(dumps(dateApp.thisWeek(data["today"])))

except Exception as e:
    print(e)
