from flask import Flask, request
import subprocess
import os
import asyncio


ROBOT_PATH = os.getcwd()
ROBOT = ROBOT_PATH + "/robot.js"
app = Flask(__name__)


def queryStringParsing(qs):
    tempArr = qs.split('&')
    dic = {}
    for i in tempArr:
        tempArr2 = i.split('=')
        dic[tempArr2[0]] = tempArr2[1]
    return dic


@app.route('/test')
def test():
    return "테스트입니다."


#illustrator functions

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


#illustrator routing

@app.route('/illustrator')
def illustrator():
    queryString = request.query_string.decode('utf-8')
    order = queryStringParsing(queryString)

    if order["type"] == "proposal":
        asyncio.run(makeProposal(order["proid"]))
        return order["proid"] + " make success"

    if order["type"] == "request":
        asyncio.run(makeRequest(order["cliid"]))
        return order["cliid"] + " make success"

    if order["type"] == "contents":
        asyncio.run(makeContents(order["pid"]))
        return order["pid"] + " make success"

    return None

if __name__ == '__main__':
    app.run(host="0.0.0.0")
