from aiohttp import web
import subprocess
import os
import asyncio
from datetime import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from pymongo import MongoClient
import json
import re
import sys

ROBOT_PATH = os.getcwd()
ROBOT = ROBOT_PATH + "/robot.js"
BUTTON_LIST = [
    "proposal",
    "request",
    "contents",
]

runProcess = {}
runList = {}
for b in BUTTON_LIST:
    runProcess[b] = 0
    runList[b] = []


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


async def illustrator(request):
    order = request.rel_url.query

    if runProcess[order["type"]] == 1:
        runList[order["type"]].append(order["id"])
        return web.Response(text=order["id"] + " make pass")

    elif runProcess[order["type"]] == 2:
        return web.Response(text=order["id"] + " make fail")

    elif runProcess[order["type"]] == 0:
        runList[order["type"]].append(order["id"])
        asyncio.create_task(runAi(order["type"]))
        return web.Response(text=order["id"] + " make pass")


async def mongoToJson():
    targetDir = os.getcwd() + "/" + "backup"
    infoJson = {}
    with open(os.getcwd() + "/apps/infoObj.js", "rt") as info:
        infoJson = json.loads(re.sub(pattern="module.exports = ", repl='', string=info.read()))

    client = MongoClient(f'mongodb://{infoJson["mongoinfo"]["user"]}:{infoJson["mongoinfo"]["password"]}@{infoJson["mongoinfo"]["host"]}:{str(infoJson["mongoinfo"]["port"])}')
    db = client['miro81']
    collections = db.list_collection_names()

    timeString = re.sub(pattern=' ', repl='', string=str(datetime.now()))
    timeString = re.sub(pattern=':', repl='', string=timeString[0:18])
    timeString = re.sub(pattern='-', repl='', string=timeString)

    await run([ "mkdir", f'{targetDir}/{timeString}' ])

    for i in collections:
        await run([ 'mongoexport', f'--uri="mongodb://{infoJson["mongoinfo"]["host"]}/miro81"', "--username=uragen", "--password=Dpdhdn941!", f'--port={str(infoJson["mongoinfo"]["port"])}', f'--collection={i}', f'--out="{targetDir}/{timeString}/{i}{timeString}.json"', "--authenticationDatabase", "admin" ])


if sys.argv.__len__() > 1:

    if sys.argv[1] == "ai":
        app = web.Application()
        app.add_routes([ web.get('/illustrator', illustrator) ])
        web.run_app(app)

    elif sys.argv[1] == "backup":
        scheduler = AsyncIOScheduler()
        scheduler.add_job(mongoToJson, 'cron', hour='22', minute='30', second='30')
        scheduler.start()
        try:
            asyncio.get_event_loop().run_forever()
        except (KeyboardInterrupt, SystemExit):
            pass

else:
    print("argument must be 'ai' or 'backup'")
