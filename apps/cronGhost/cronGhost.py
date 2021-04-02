import os
import sys
import json
sys.path.append("/Users/baechang-gyu/uragen/homeRobot/robot/python_modules")
import subprocess
import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
ROBOT_PATH = "/Users/baechang-gyu/uragen/homeRobot/robot"
ROBOT = ROBOT_PATH + "/robot.js"
async def run(cmdArr):
    cmd = ' '.join(cmdArr)
    proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    (stdout, stderr) = await proc.communicate()
    if stdout:
        print(stdout.decode())
    if stderr:
        print(stderr.decode())

async def sendAspirantPresentation():
    await run([ 'node', ROBOT, 'sendAspirantPresentation' ])

async def mongoToJson():
    await run([ 'node', ROBOT, 'mongoToJson' ])

async def analyticsParsing():
    await run([ 'node', ROBOT, 'analyticsParsing' ])

async def proposalToClient():
    await run([ 'node', ROBOT, 'proposalToClient' ])

async def reflect():
    await run([ 'node', ROBOT, 'reflect' ])

async def clientReportToSheets():
    await run([ 'node', ROBOT, 'clientReportToSheets' ])

async def fixDir():
    await run([ 'node', ROBOT, 'fixDir' ])



scheduler = AsyncIOScheduler()
scheduler.add_job(sendAspirantPresentation, 'cron', hour='14', minute='40', second='30')
scheduler.add_job(mongoToJson, 'cron', hour='1', minute='30', second='30')
scheduler.add_job(analyticsParsing, 'cron', hour='2', minute='30', second='30')
scheduler.add_job(proposalToClient, 'cron', hour='3', minute='10', second='30')
scheduler.add_job(reflect, 'cron', hour='3', minute='40', second='30')
scheduler.add_job(clientReportToSheets, 'cron', hour='4', minute='30', second='30')
scheduler.add_job(fixDir, 'cron', hour='5', minute='30', second='30')
scheduler.start()
try:
    asyncio.get_event_loop().run_forever()
except (KeyboardInterrupt, SystemExit):
    pass