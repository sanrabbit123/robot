import os
import sys
import aiohttp
import pprint
import re
import json

async def requestSystem(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return (await resp.text()).strip()

def returnStaticFolder():
    dic = {}
    dic["host"] = __host__
    dic["static"] = __static__
    return dic

def returnDbName():
    return "miro81"

def consoleLog(something):
    pp = pprint.PrettyPrinter(indent=4)
    pp.pprint(something)

def mongoRead(collection, find, conn):
    c = conn[(returnDbName())][collection]
    result = c.find(find)
    tong = []
    for r in result:
        r.pop('_id', None)
        temp = json.dumps(r, indent=4, sort_keys=True, default=str, ensure_ascii=False)
        tong.append(json.loads(temp))
    return tong

def returnModulepath():
    rawPath = os.getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "sector":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    sectorPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "sector": sectorPath, "module": modulPath }

try:
    pathDic = returnModulepath()
    sys.path.append(pathDic["module"])
except Exception as e:
    print(e)
