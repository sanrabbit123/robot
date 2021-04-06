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
        # print(stdout.decode())
        return stdout.decode()
    if stderr:
        # print(stderr.decode())
        return stderr.decode()


async def viewWhoLog():
    columns = [
        "user",
        "tty",
        "from",
        "login",
        "idle"
    ]
    stdout = await run([ 'w' ])
    stdout = re.sub(pattern="\n$", repl="", string=stdout)
    usersArr_raw = (stdout.split("\n"))[2:]
    usersArr = []
    for i in usersArr_raw:
        tempArr = i.split(" ")
        subjectArr = []
        for j in tempArr:
            if j != '':
                subjectArr.append(j)
        usersArr.append(subjectArr)
    finalArr = []
    userDic = {}
    for z in usersArr:
        for i in range(len(columns)):
            userDic[columns[i]] = z[i]
        finalArr.append(userDic)

    now = time.gmtime(time.time())
    logFileName = LOG_PATH + "/users" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec) + ".json"

    with open(logFileName, 'wt') as logFile:
        logFile.write(json.dumps(finalArr))

asyncio.run(viewWhoLog())


# scheduler = AsyncIOScheduler()
# scheduler.add_job(sendAspirantPresentation, 'cron', hour='14', minute='40', second='30')
# scheduler.add_job(mongoToJson, 'cron', hour='1', minute='30', second='30')
# scheduler.add_job(analyticsParsing, 'cron', hour='2', minute='30', second='30')
# scheduler.add_job(proposalToClient, 'cron', hour='3', minute='10', second='30')
# scheduler.add_job(reflect, 'cron', hour='3', minute='40', second='30')
# scheduler.add_job(clientReportToSheets, 'cron', hour='4', minute='30', second='30')
# scheduler.add_job(fixDir, 'cron', hour='5', minute='30', second='30')
# scheduler.start()
# try:
#     asyncio.get_event_loop().run_forever()
# except (KeyboardInterrupt, SystemExit):
#     pass
