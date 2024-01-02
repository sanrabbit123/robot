# set python modules ------------------------------------------------------------------------------------------------------

from os import path as osPath
from os import getcwd
from sys import argv, path

# return human path
def returnModulepath():
    rawPath = getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == "human":
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    humanPath = resultPath[0:-1]
    modulPath = resultPath + "python_modules"
    return { "human": humanPath, "module": modulPath }

# append human in module pathes
try:
    pathDic = returnModulepath()
    path.insert(0, pathDic["module"])
except Exception as e:
    print(e)


# python start --------------------------------------------------------------------------------------------------------

import asyncio
from apps.mother import *
from apps.memberThis import returnMember
from apps.infoObj import returnAddress

def todayComplete():
    async def main():
        address = returnAddress()
        thisMember = returnMember()
        await requestSystem("https://" + address["notioninfo"]["host"] + "/todayComplete", { "member": thisMember["id"] }, { "headers": { "Content-Type": "application/json" } })
    asyncio.run(main())

def todaySetting():
    async def main():
        address = returnAddress()
        thisMember = returnMember()
        await requestSystem("https://" + address["notioninfo"]["host"] + "/defaultSetting", { "member": thisMember["id"] }, { "headers": { "Content-Type": "application/json" } })
        await shellExec("open", [ "-a", '"/Applications/Notion.app"' ])
    asyncio.run(main())

def launching():
    async def main():
        raw = consoleQ("Q. 실행시킬 명령의 번호를 알려주세요!\n\n1. 일정 세팅하기  2. 일정 마무리하기  3. 나가기\n")
        commandNumber = int(raw)
        if commandNumber == 1:
            address = returnAddress()
            thisMember = returnMember()
            await requestSystem("https://" + address["notioninfo"]["host"] + "/defaultSetting", { "member": thisMember["id"] }, { "headers": { "Content-Type": "application/json" } })
            await shellExec("open", [ "-a", '"/Applications/Notion.app"' ])
        elif commandNumber == 2:
            address = returnAddress()
            thisMember = returnMember()
            await requestSystem("https://" + address["notioninfo"]["host"] + "/todayComplete", { "member": thisMember["id"] }, { "headers": { "Content-Type": "application/json" } })
    asyncio.run(main())

