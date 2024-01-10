# set python modules ------------------------------------------------------------------------------------------------------

import os
from os import path as osPath
from sys import argv, path

# return human path
def returnModulepath():
    rawPath = os.getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "human":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    humanPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "human": humanPath, "module": modulPath }

# append human in module pathes
try:
    os.chdir(os.environ["HOME"] + "/human")
    pathDic = returnModulepath()
    path.insert(0, pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

import asyncio
from apps.mother import *
