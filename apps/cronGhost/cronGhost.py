import os
import sys
import json
import re
import time
sys.path.append("/Users/baechang-gyu/uragen/homeRobot/robot/python_modules")
import subprocess
import asyncio
from apscheduler.schedulers.asyncio import AsyncIOScheduler
ROBOT_PATH = "/Users/baechang-gyu/uragen/homeRobot/robot"
ROBOT = ROBOT_PATH + "/robot.js"
THIS_PATH = ROBOT_PATH + "/apps/cronGhost"
LOG_PATH = THIS_PATH + "/log"
async def run(cmdArr):
    cmd = ' '.join(cmdArr)
    proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
    (stdout, stderr) = await proc.communicate()
    if stdout:
        print(stdout.decode())
        return stdout.decode()
    if stderr:
        print(stderr.decode())
        return stderr.decode()

async def relect():
    await run([ 'node', ROBOT, 'relect' ])

async def mysqlReflect():
    await run([ 'node', ROBOT, 'mysqlReflect' ])

async def designerCalculation():
    await run([ 'node', ROBOT, 'designerCalculation' ])



scheduler = AsyncIOScheduler()
scheduler.add_job(relect, 'cron', hour='8', minute='10', second='30')
scheduler.add_job(mysqlReflect, 'cron', hour='8', minute='50', second='30')
scheduler.add_job(designerCalculation, 'cron', day_of_week='mon', hour='9', minute='50', second='30')
scheduler.start()
try:
    asyncio.get_event_loop().run_forever()
except (KeyboardInterrupt, SystemExit):
    pass