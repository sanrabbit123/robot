from aiohttp import web
import subprocess
import os
import asyncio
import json

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
    for i in appendList[button]:
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


# async def returnApp():
#     app = web.Application()
#     app.add_routes([ web.get('/illustrator', illustrator) ])
#     return app

app = web.Application()
app.add_routes([ web.get('/illustrator', illustrator) ])
web.run_app(app)
