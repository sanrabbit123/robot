import os
import sys
import aiohttp
import pprint
import re
import json
import asyncio

async def requestSystem(url, data={}):
    result = {}
    if len(data.keys()) == 0:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as resp:
                result["data"] = (await resp.text()).strip()
    else:
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=data) as resp:
                result["data"] = (await resp.json())
    return result

async def shellExec(cmdArr):
    cmd = ' '.join(cmdArr)
    proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    (stdout, stderr) = await proc.communicate()
    if stdout:
        print(stdout.decode())
    if stderr:
        print(stderr.decode())

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

def returnHost(key=None):
    tong = {}
    hostTargets = __infoObj__
    for obj in hostTargets:
        tong[obj["name"]] = {}
        tong[obj["name"]]["protocol"] = obj["protocol"]
        tong[obj["name"]]["host"] = obj["host"]
        tong[obj["name"]]["port"] = obj["port"]
        tong[obj["name"]]["static"] = obj["static"]
    if key is None:
        return tong
    else:
        return tong[key]

def returnStaticFolder():
    dict = returnHost("officeinfo")
    dict["static"] = os.path.expanduser("~") + "/samba"
    return dict

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
