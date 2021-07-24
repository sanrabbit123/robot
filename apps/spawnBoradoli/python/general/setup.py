import asyncio
import os
import sys
import json


# python mother methods -----------------------------------------------------------------------------------------------------

class Mother:
    async def subprocess(self, cmdArr):
        if not isinstance(cmdArr, list):
            raise Exception("invaild input")
        cmd = ' '.join(cmdArr)
        proc = await asyncio.create_subprocess_shell(cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
        (stdout, stderr) = await proc.communicate()
        if stdout:
            print(stdout.decode())
        if stderr:
            print(stderr.decode())


# setup python modules ------------------------------------------------------------------------------------------------------

mother = Mother()
moduleFolder_name = "python_modules"
with open(os.getcwd() + "/package.json", "rt") as config:
    projectFolder_name = json.loads(config.read().strip())["name"]

def returnModulepath():
    rawPath = os.getcwd()
    rawPathArr = rawPath.split('/')
    num = 0
    index = 0
    for path in rawPathArr:
        if path == projectFolder_name:
            index = num
        num = num + 1
    resultPath = ''
    for i in range(index + 1):
        resultPath += rawPathArr[i] + '/'
    modulPath = resultPath + moduleFolder_name
    return modulPath

async def installModule(moduleName):
    if not isinstance(moduleName, str):
        raise Exception("invaild input")
    await mother.subprocess([ "pip3", "install", f"--target='{returnModulepath()}'", moduleName ])

async def installModules(moduleNames):
    if not isinstance(moduleNames, list):
        raise Exception("invaild input")
    for m in moduleNames:
        await mother.subprocess([ "pip3", "install", f"--target='{returnModulepath()}'", m ])

pathDic = returnModulepath()
sys.path.append(pathDic)


# excute python module install -----------------------------------------------------------------------------------------------

if __name__ == "__main__":
    if not moduleFolder_name in os.listdir(os.getcwd()):
        asyncio.run(mother.subprocess([ "mkdir", os.getcwd() + "/" + moduleFolder_name ]))
    if sys.argv.__len__() > 1:
        if sys.argv[1] == "install":
            with open(os.getcwd() + "/package.json", "rt") as config:
                targets = json.loads(config.read().strip())["dependencies"]
                asyncio.run(installModules(targets))
        else:
            newModule = sys.argv[1].strip()
            with open(os.getcwd() + "/package.json", "rt") as config:
                package = json.loads(config.read().strip())
            package["dependencies"].append(newModule)
            with open(os.getcwd() + "/package.json", "wt") as config:
                config.write(json.dumps(package, ensure_ascii=False, indent=2))
            asyncio.run(installModule(newModule))
