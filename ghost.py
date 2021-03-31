# set python modules ------------------------------------------------------------------------------------------------------

import os
import sys
import json

# return robot path
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
    robotPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "robot": robotPath, "module": modulPath }

# append robot in module pathes
pathDic = returnModulepath()
sys.path.append(pathDic["module"])
ROBOT_PATH = pathDic["robot"]
ROBOT = ROBOT_PATH + "/robot.js"
SAMBA = os.getenv("HOME") + "/samba/drive/HomeLiaisonServer"

# python start --------------------------------------------------------------------------------------------------------

from aiohttp import web
import subprocess
import asyncio
from datetime import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from pymongo import MongoClient
import pymysql
import re


# process constant --------------------------------------------------------------------------------------------------------

BUTTON_LIST = [
    "proposal",
    "request",
    "contents",
    "voice"
]
runProcess = {}
runList = {}
for b in BUTTON_LIST:
    runProcess[b] = 0
    runList[b] = []


# child process method -----------------------------------------------------------------------------------------------------

async def run(cmdArr):
    cmd = ' '.join(cmdArr)
    proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    (stdout, stderr) = await proc.communicate()
    if stdout:
        print(stdout.decode())
    if stderr:
        print(stderr.decode())

async def runAi(button):
    runProcess[button] = 1
    await asyncio.sleep(5)
    runProcess[button] = 2
    for i in runList[button]:
        await run([ "node", ROBOT, button, i ])
    runList[button] = []
    runProcess[button] = 0


# ai server ----------------------------------------------------------------------------------------------------------------

async def illustrator(request):
    order = request.rel_url.query
    targetStr = str(order["id"])

    if order["type"] == "voice":
        targetStr = re.sub(pattern=" ", string=targetStr, repl="__split__", flags=re.I)

    if runProcess[order["type"]] == 1:
        runList[order["type"]].append(targetStr)
        return web.Response(text=targetStr + " make pass")

    elif runProcess[order["type"]] == 2:
        return web.Response(text=targetStr + " make fail")

    elif runProcess[order["type"]] == 0:
        runList[order["type"]].append(targetStr)
        asyncio.create_task(runAi(order["type"]))
        return web.Response(text=targetStr + " make pass")

async def shell(request):
    order = request.rel_url.query
    print(order)
    return web.Response(text="done")


# cron list ----------------------------------------------------------------------------------------------------------------

# cron 1
async def mongoToJson():
    robotDir = os.getcwd()
    robotDirList = robotDir.split("/");
    robotDirList.pop()
    targetDir = '/'.join(robotDirList) + "/" + "backup"
    infoJson = {}
    with open(os.getcwd() + "/apps/infoObj.js", "rt") as info:
        infoJson = json.loads(re.sub(pattern="module.exports = ", repl='', string=info.read()))

    timeString = re.sub(pattern=' ', repl='', string=str(datetime.now()))
    timeString = re.sub(pattern=':', repl='', string=timeString[0:18])
    timeString = re.sub(pattern='-', repl='', string=timeString)

    await run([ "mkdir", f'{targetDir}/{timeString}' ])

    mongoTargets = [ "mongoinfo", "backinfo", "pythoninfo" ]

    for m in mongoTargets:
        client = MongoClient(f'mongodb://{infoJson[m]["user"]}:{infoJson[m]["password"]}@{infoJson[m]["host"]}:{str(infoJson[m]["port"])}')
        db = client['miro81']
        collections = db.list_collection_names()
        for i in collections:
            await run([ 'mongoexport', f'--uri="mongodb://{infoJson[m]["host"]}/{infoJson[m]["database"]}"', "--username=" + infoJson[m]["user"], "--password=" + infoJson[m]["password"], f'--port={str(infoJson[m]["port"])}', f'--collection={i}', f'--out="{targetDir}/{timeString}/{i}{timeString}.json"', "--authenticationDatabase", "admin" ])

# cron 2
async def analyticsParsing():
    await run([ 'node', ROBOT, 'analyticsParsing' ])

# cron 3
async def sendAspirantPresentation():
    await run([ 'node', ROBOT, 'sendAspirantPresentation' ])

# cron 4
async def ultimateReflection():
    await run([ 'node', ROBOT, 'reflect' ])

# cron 5
async def clientReport():
    await run([ 'node', ROBOT, 'clientReportToSheets' ])

# cron 6
async def fixServerDirectory():
    await run([ 'node', ROBOT, 'fixDir', SAMBA ])

# cron 7
async def proposalToClient():
    await run([ 'node', ROBOT, 'proposalToClient' ])


# start process ------------------------------------------------------------------------------------------------------------

if sys.argv.__len__() > 1:

    if sys.argv[1] == "ai":
        app = web.Application()
        app.add_routes([ web.get('/illustrator', illustrator) ])
        web.run_app(app)

    elif sys.argv[1] == "shell":
        app = web.Application()
        app.add_routes([ web.get('/shell', shell) ])
        web.run_app(app)

    elif sys.argv[1] == "backup":
        scheduler = AsyncIOScheduler()
        scheduler.add_job(mongoToJson, 'cron', hour='22', minute='30', second='30')
        scheduler.start()
        try:
            asyncio.get_event_loop().run_forever()
        except (KeyboardInterrupt, SystemExit):
            pass

    elif sys.argv[1] == "backupnow":
        loop = asyncio.get_event_loop()
        loop.run_until_complete(mongoToJson())
        loop.close()

    elif sys.argv[1] == "analytics":
        scheduler = AsyncIOScheduler()
        scheduler.add_job(analyticsParsing, 'cron', hour='23', minute='50', second='30')
        scheduler.start()
        try:
            asyncio.get_event_loop().run_forever()
        except (KeyboardInterrupt, SystemExit):
            pass

    elif sys.argv[1] == "analyticsnow":
        loop = asyncio.get_event_loop()
        loop.run_until_complete(analyticsParsing())
        loop.close()

    elif sys.argv[1] == "sendAspirantPresentation":
        scheduler = AsyncIOScheduler()
        scheduler.add_job(sendAspirantPresentation, 'cron', hour='14', minute='40', second='30')
        scheduler.start()
        try:
            asyncio.get_event_loop().run_forever()
        except (KeyboardInterrupt, SystemExit):
            pass

    elif sys.argv[1] == "ultimateReflectionNow":
        loop = asyncio.get_event_loop()
        loop.run_until_complete(ultimateReflection())
        loop.close()

    elif sys.argv[1] == "ultimateReflection":
        scheduler = AsyncIOScheduler()
        scheduler.add_job(ultimateReflection, 'cron', hour='21', minute='50', second='30')
        scheduler.start()
        try:
            asyncio.get_event_loop().run_forever()
        except (KeyboardInterrupt, SystemExit):
            pass

    elif sys.argv[1] == "clientReport":
        scheduler = AsyncIOScheduler()
        scheduler.add_job(clientReport, 'cron', hour='09', minute='10', second='30')
        scheduler.start()
        try:
            asyncio.get_event_loop().run_forever()
        except (KeyboardInterrupt, SystemExit):
            pass

    elif sys.argv[1] == "cron":
        scheduler = AsyncIOScheduler()
        scheduler.add_job(sendAspirantPresentation, 'cron', hour='14', minute='40', second='30')
        scheduler.add_job(mongoToJson, 'cron', hour='1', minute='30', second='30')
        scheduler.add_job(analyticsParsing, 'cron', hour='2', minute='30', second='30')
        scheduler.add_job(proposalToClient, 'cron', hour='3', minute='10', second='30')
        scheduler.add_job(ultimateReflection, 'cron', hour='3', minute='30', second='30')
        scheduler.add_job(clientReport, 'cron', hour='4', minute='30', second='30')
        scheduler.add_job(fixServerDirectory, 'cron', hour='5', minute='30', second='30')
        scheduler.start()
        try:
            asyncio.get_event_loop().run_forever()
        except (KeyboardInterrupt, SystemExit):
            pass

else:
    print("argument must be 'ai' or 'backup' or 'mysql'")
