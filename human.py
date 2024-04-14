# set python modules ------------------------------------------------------------------------------------------------------

import os
from os import path as osPath
from sys import argv, path
from pathlib import Path

# return human path
def returnModulepath():
    rawPath = os.getcwd()
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
    humanPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "robot": humanPath, "module": modulPath }

# append human in module pathes
try:
    os.chdir(str(Path.home()) + "/robot")
    pathDic = returnModulepath()
    path.insert(0, pathDic["robot"])
    path.insert(0, pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

import asyncio
from apps.mother import *
from apps.infoObj import returnAddress
from apps.memberObj import returnMembers
from apps.backMaker.backMaker import BackMaker
from apps.devContext.devContext import DevContext
from apps.sqlCloud.context.sqlContext import SqlContext
from apps.sqlCloud.sqlCloud import SqlCloud

back = BackMaker()
address = returnAddress()

async def main():

    if argv.__len__() > 1:
        thisCommand = argv[1]

        if thisCommand == "infoObj":
            await back.setInfoObj()
            consoleLog("info, member update done")

        elif thisCommand == "dev":
            devInstance = DevContext()
            await devInstance.launching()

        elif thisCommand == "sqlView":
            sqlInstance = SqlContext()
            await sqlInstance.sqlView()

        elif thisCommand == "sqlSheets":
            sqlInstance = SqlContext()
            await sqlInstance.sqlSheets()

        elif thisCommand == "sqlPython":
            sqlInstance = SqlContext()
            await sqlInstance.launching()

        elif thisCommand == "sqlCloud":
            sqlServer = SqlCloud()
            await sqlServer.serverConnect()

        else:
            pass
    else:
        pass

    return 0

asyncio.run(main())