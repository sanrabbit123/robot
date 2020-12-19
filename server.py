from aiohttp import web
import subprocess
import os
import asyncio
import json



ROBOT_PATH = os.getcwd()
ROBOT = ROBOT_PATH + "/robot.js"



async def run(cmdArr):
    cmd = ' '.join(cmdArr)
    proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    (stdout, stderr) = await proc.communicate()
    if stdout:
        print(stdout.decode())
    if stderr:
        print(stderr.decode())



runProcess = {}
runProcess["proposal"] = 0
runProcess["request"] = 0
runProcess["contents"] = 0

runList = {}
runList["proposal"] = []
runList["request"] = []
runList["contents"] = []

appendList = {}
appendList["proposal"] = []
appendList["request"] = []
appendList["contents"] = []



async def makeProposal():
    runProcess["proposal"] = 1
    await asyncio.sleep(2)
    for i in runList["proposal"]:
        await run([ "node", ROBOT, "proposal", i ])
    runList["proposal"] = []
    appendList["proposal"] = []
    runProcess["proposal"] = 0

async def makeRequest():
    runProcess["request"] = 1
    await asyncio.sleep(2)
    for i in runList["request"]:
        await run([ "node", ROBOT, "request", i ])
    runList["request"] = []
    appendList["request"] = []
    runProcess["request"] = 0

async def makeContents():
    runProcess["contents"] = 1
    await asyncio.sleep(2)
    for i in runList["contents"]:
        await run([ "node", ROBOT, "contents", i ])
    runList["contents"] = []
    appendList["contents"] = []
    runProcess["contents"] = 0



async def illustrator(request):
    order = request.rel_url.query

    if order["type"] == "proposal":
        runList["proposal"].append(order["proid"])
        if runProcess["proposal"] == 1:
            pass
        else:
            asyncio.create_task(makeProposal())
        return web.Response(text=order["proid"] + " make success")

    if order["type"] == "request":
        asyncio.create_task(makeRequest())
        return web.Response(text=order["cliid"] + " make success")

    if order["type"] == "contents":
        asyncio.create_task(makeContents())
        return web.Response(text=order["pid"] + " make success")

    return web.Response(text="nothing")



# async def returnApp():
#     app = web.Application()
#     app.add_routes([web.get('/', hello)])
#     return app

app = web.Application()
app.add_routes([web.get('/illustrator', illustrator)])
web.run_app(app)
