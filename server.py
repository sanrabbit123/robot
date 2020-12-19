from aiohttp import web
import subprocess
import os
import asyncio


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


async def makeProposal(proid):
    await asyncio.create_task(run([ "node", ROBOT, "proposal", proid ]))

async def makeRequest(cliid):
    await asyncio.create_task(run([ "node", ROBOT, "request", cliid ]))

async def makeContents(pid):
    await asyncio.create_task(run([ "node", ROBOT, "contents", pid ]))


async def illustrator(request):
    order = request.rel_url.query

    if order["type"] == "proposal":
        asyncio.run(makeProposal(order["proid"]))
        return web.Response(text=order["proid"] + " make success")

    if order["type"] == "request":
        asyncio.run(makeRequest(order["cliid"]))
        return web.Response(text=order["cliid"] + " make success")

    if order["type"] == "contents":
        asyncio.run(makeContents(order["pid"]))
        return web.Response(text=order["pid"] + " make success")

    return web.Response(text="nothing")



# async def returnApp():
#     app = web.Application()
#     app.add_routes([web.get('/', hello)])
#     return app

app = web.Application()
app.add_routes([web.get('/', hello)])
web.run_app(app)
