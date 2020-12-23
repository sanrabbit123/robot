from aiohttp import web
import subprocess
import os
import asyncio
from datetime import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from pymongo import MongoClient
import pymysql
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


def rowsDecode(rows):
    result = []
    for dic in rows:
        tempDic = {}
        for key, val in dic.items():
            if type(val).__name__ == "bytes":
                tempDic[key] = val.decode("utf-8")
            else:
                tempDic[key] = val
        result.append(tempDic)
    return result


async def mysqlToJson():
    with open(os.getcwd() + "/apps/infoObj.js", "rt") as info:
        infoJson = json.loads(re.sub(pattern="module.exports = ", repl='', string=info.read()))
    tablesConstant = "TABLE_NAME"

    conn = pymysql.connect(host=infoJson["frontinfo"]["host"], port=infoJson["frontinfo"]["port"], user=infoJson["frontinfo"]["user"], password=infoJson["frontinfo"]["password"], db=infoJson["frontinfo"]["database"], charset='utf8')
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = "SELECT " + tablesConstant + " FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" + infoJson["frontinfo"]["database"] + "'"
    curs.execute(sql)
    tables_raw = curs.fetchall()
    tables_dic = rowsDecode(tables_raw)
    tables = []
    for dic in tables_dic:
        tables.append(dic[tablesConstant])

    timeString = re.sub(pattern=' ', repl='', string=str(datetime.now()))
    timeString = re.sub(pattern=':', repl='', string=timeString[0:18])
    timeString = re.sub(pattern='-', repl='', string=timeString)

    fileNameList = []
    for i in tables:
        if i != "conlist" and i != "sessions":
            sql = "SELECT * FROM " + i
            curs.execute(sql)
            rows = curs.fetchall()
            fileName = os.getcwd() + "/temp/" + i + '_' + timeString + ".json"
            fileNameList.append(fileName)
            with open(fileName, "w", encoding='utf-8') as j:
                j.write(json.dumps(rowsDecode(rows), indent=2, sort_keys=True, ensure_ascii=False))

    conn.close()
    return fileNameList


async def mysqlCopy():
    fileList = []
    fileNameList = await mysqlToJson()
    for i in fileNameList:
        with open(i, "rt") as f:
            dataArr = json.loads(f.read())
        dic = {}
        tempList = i.split("_")
        dic["name"] = tempList[0].split("/")[tempList[0].split("/").__len__() - 1]
        dic["data"] = dataArr
        columns = []
        if dataArr.__len__() > 0:
            for j in dataArr[0]:
                if j != "id":
                    columns.append(j)
        dic["columns"] = columns
        fileList.append(dic)

    with open(os.getcwd() + "/apps/infoObj.js", "rt") as info:
        infoJson = json.loads(re.sub(pattern="module.exports = ", repl='', string=info.read()))
    tablesConstant = "TABLE_NAME"

    conn = pymysql.connect(host=infoJson["testinfo"]["host"], port=infoJson["testinfo"]["port"], user=infoJson["testinfo"]["user"], password=infoJson["testinfo"]["password"], db=infoJson["testinfo"]["database"], charset='utf8')
    curs = conn.cursor(pymysql.cursors.DictCursor)

    sql = "SELECT " + tablesConstant + " FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '" + infoJson["frontinfo"]["database"] + "'"
    curs.execute(sql)
    tables_raw = curs.fetchall()
    tables_dic = rowsDecode(tables_raw)
    tables = []

    for dic in tables_dic:
        tables.append(dic[tablesConstant])

    for i in tables:
        sql = "DROP TABLE " + i
        curs.execute(sql)

    for dic in fileList:
        sql = "CREATE TABLE " + dic["name"] + " (id INT(11) NOT NULL AUTO_INCREMENT,"
        for j in dic["columns"]:
            sql += j + " VARCHAR(255),"
        sql += "PRIMARY KEY (id));"
        curs.execute(sql)

    for dic in fileList:
        for j in dic["data"]:
            sql = "INSERT INTO "
            sql += dic["name"]
            sql += " ("
            for k in dic["columns"]:
                sql += k + ","
            sql = sql[0:-1] + ") VALUES ("
            for k in dic["columns"]:
                sql += "'" + str(j[k]) + "',"
            sql = sql[0:-1] + ");"
            print(sql)
            curs.execute(sql)

    conn.commit()
    conn.close()


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

    elif sys.argv[1] == "mysql":
        asyncio.run(mysqlCopy())

else:
    print("argument must be 'ai' or 'backup'")
