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

@app.route('/proposal')
def proposal():
    queryString = request.query_string.decode('utf-8')

    if queryString != '':
        proidDic = queryStringParsing(queryString)
        try:
            proid = proidDic["proid"]
            subprocess.run([ "node", ROBOT, "proposal", proid ], encoding="utf-8")
            return "success"
        except Exception as e:
            return "제안서 아이디를 입력해주세요. (must be proid)"
    else:
        return "제안서 아이디를 입력해주세요."


#illustrator functions

async def makeProposal(proid):
    subprocess.run([ "node", ROBOT, "proposal", proid ], encoding="utf-8")
    return "success"

async def runProposal(proid):
    asyncio.create_task(makeProposal(proid))
    return "success"

async def makeRequest(cliid):
    subprocess.run([ "node", ROBOT, "request", cliid ], encoding="utf-8")
    return "success"

async def runRequest(cliid):
    asyncio.create_task(makeRequest(cliid))
    return "success"

async def makeContents(pid):
    subprocess.run([ "node", ROBOT, "contents", pid ], encoding="utf-8")
    return "success"

async def runContents(pid):
    asyncio.create_task(makeContents(pid))
    return "success"

#illustrator routing

@app.route('/illustrator')
def illustrator():
    queryString = request.query_string.decode('utf-8')
    order = queryStringParsing(queryString)

    if order["type"] == "proposal":
        asyncio.run(runProposal(order["proid"]))
        return order["proid"] + " make success"

    if order["type"] == "request":
        asyncio.run(runRequest(order["cliid"]))
        return order["cliid"] + " make success"

    if order["type"] == "contents":
        asyncio.run(runContents(order["pid"]))
        return order["pid"] + " make success"

    return None

if __name__ == '__main__':
    app.run(host="0.0.0.0")
