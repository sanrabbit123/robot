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

# append robot in module pathes
try:
    pathDic = returnModulepath()
    path.append(pathDic["module"])
    path.append(pathDic["pythonCloud"])

except Exception as e:
    print(e)

# python start --------------------------------------------------------------------------------------------------------

import requests
from bs4 import BeautifulSoup
import json
import os

# headers = { 'Content-Type': 'application/json; charset=utf-8' }
# data = {}
target = 'http://220.117.13.12:55556/proposal'
params = { 'proid': 'p2012_aa24s' }

# response = requests.post(target, data=json.dumps(data), headers=headers)
response = requests.get(target, params=params)

print(response)
