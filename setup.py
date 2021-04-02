import subprocess
import time
import sys
from pathlib import Path
from os import path as osPath

class RobotInstall:
    def __init__(self):
        self.install = [
            [ "notion" ],
            [ "flask" ],
            [ "pymysql" ],
            [ "PyMySQL" ],
            [ "pymongo" ],
            [ "argparse" ],
            [ "cryptography" ],
            [ "requests" ],
            [ "boto3" ],
            [ "bs4" ],
            [ "html5lib" ],
            [ "lxml" ],
            [ "wheel" ],
            [ "apscheduler" ]
        ]
        self.upgrade = [
            [ "google-api-core" ],
            [ "google-api-python-client", "google-auth-httplib2", "google-auth-oauthlib" ],
            [ "oauth2client" ],
        ]
        self.homeDir = str(Path.home())

        now = time.gmtime(time.time())
        tempDirName = "pythonModuleInstall" + str(now.tm_year) + str(now.tm_mon) + str(now.tm_mday) + str(now.tm_hour) + str(now.tm_min) + str(now.tm_sec)
        self.tempDir = self.homeDir + "/" + tempDirName

        thisFile = osPath.abspath(__file__)
        thisFileArr = thisFile.split('/')
        thisFileArr.pop()
        self.robotPath = '/'.join(thisFileArr)
        self.moduleFolder = "python_modules"
        self.modulePath = self.robotPath + "/" + self.moduleFolder
        self.pythonCloudPath = self.robotPath + "/apps/pythonCloud/python/tool"

    def setTempDir(self):
        subprocess.run([ "mkdir", self.tempDir ], shell=False, encoding='utf8')

    def moduleInstall(self, local=True):
        target = "--target=" + self.tempDir
        for module in self.install:
            commandList = []
            if not local:
                commandList.append("sudo")
            commandList.append("pip3")
            commandList.append("install")
            for m in module:
                commandList.append(m)
            if local:
                commandList.append(target)
            subprocess.run(commandList, shell=False, encoding='utf8')
        for module in self.upgrade:
            commandList = []
            if not local:
                commandList.append("sudo")
            commandList.append("pip3")
            commandList.append("install")
            commandList.append("--upgrade")
            for m in module:
                commandList.append(m)
            if local:
                commandList.append(target)
            subprocess.run(commandList, shell=False, encoding='utf8')

    def moveModules(self):
        bridge = self.homeDir + "/" + self.moduleFolder
        subprocess.run([ "mv", self.tempDir, bridge ], shell=False, encoding='utf8')
        subprocess.run([ "mv", bridge, self.modulePath ], shell=False, encoding='utf8')

    def ignoreDirs(self):
        targetList = [
            "/binary",
            "/temp",
        ]
        for dir in targetList:
            subprocess.run([ "mkdir", (self.robotPath + dir) ], shell=False, encoding='utf8')

    def returnPath(self):
        return { "robotPath": self.robotPath, "modulePath": self.modulePath, "pythonCloudPath": self.pythonCloudPath }

    def installLocal(self):
        self.setTempDir()
        self.ignoreDirs()
        self.moduleInstall(local=True)
        self.moveModules()

    def installServer(self):
        self.installLocal()
        self.moduleInstall(local=False)

try:
    if sys.argv.__len__() == 1:
        raise Exception("invaild arguments : 'install --local' or 'install --server' or 'local' or 'refresh'")
    else:
        installApps = RobotInstall()

        if sys.argv[1] == 'install':
            if sys.argv[2] == 'local' or sys.argv[2] == '--local':
                installApps.installLocal()
            elif sys.argv[2] == 'server' or sys.argv[2] == '--server':
                installApps.installServer()

        pathDic = installApps.returnPath()
        robotPath = pathDic["robotPath"]
        modulePath = pathDic["modulePath"]
        pythonCloudPath = pathDic["pythonCloudPath"]
        sys.path.append(modulePath)
        sys.path.append(pythonCloudPath)

except Exception as e:
    print(e)
    sys.exit()

from cryptography.fernet import Fernet
from enDecrypt import EnDecrypt

pemsName = {
    "key": robotPath + "/pems/guguKey.pem",
    "token": robotPath + "/pems/guguToken.pem",
    "infoObj": robotPath + "/apps/infoObj.js"
}

if sys.argv[1] == 'local':
    infoObjFile = open(pemsName["infoObj"], 'r')
    infoObj = infoObjFile.read()
    infoObjFile.close()

    key = Fernet.generate_key()
    enDecrypt = EnDecrypt(key)
    token = enDecrypt.encrypt(infoObj)

    subprocess.run([ "rm", "-rf", pemsName["key"] ], shell=False, encoding='utf8')
    subprocess.run([ "rm", "-rf", pemsName["token"] ], shell=False, encoding='utf8')

    with open(pemsName["key"], 'wb') as keyFile:
        keyFile.write(key)
    with open(pemsName["token"], 'wb') as tokenFile:
        tokenFile.write(token)

    targetPemKeyInput = input("target pems : 1.database 2.bridge 3.polling 4.password : ")
    targetPassword = False
    if targetPemKeyInput == '1':
        targetPemKey = "database.pem"
    elif targetPemKeyInput == '2':
        targetPemKey = "bridge.pem"
    elif targetPemKeyInput == '3':
        targetPemKey = "polling.pem"
    elif targetPemKeyInput == '4':
        targetPemKey = ""
        targetPassword = True

    targetIdHost = input("target id, host (type 'id@host') : ")
    targetRobotPath = input("target robot path (if type 'default' : path is '/home/centos/robot') : ")
    if targetRobotPath == "default":
        targetRobotPath = "/home/centos/robot"

    if not targetPassword:
        print("scp -i ./pems/" + targetPemKey + " -r ./pems " + targetIdHost + ":" + targetRobotPath)
    else:
        print("scp -r ./pems " + targetIdHost + ":" + targetRobotPath)

elif sys.argv[1] == 'install' or sys.argv[1] == 'refresh':
    if sys.argv[1] == 'refresh':
        subprocess.run([ "rm", "-rf", pemsName["infoObj"] ], shell=False, encoding='utf8')

    with open(pemsName["key"], 'rb') as keyFile:
        infoObjKey = keyFile.read()
    with open(pemsName["token"], 'rb') as tokenFile:
        infoObjToken = tokenFile.read()

    infoEnDecrypt = EnDecrypt(infoObjKey)
    infoObjString = infoEnDecrypt.decrypt(infoObjToken)

    with open(pemsName["infoObj"], 'w') as newInfoObj:
        newInfoObj.write(infoObjString)

    if sys.argv[1] == 'install':
        print("npm install")
        print("npm install -g pm2")
        print("python3 -m venv .")
        print("source ./bin/activate")
        print("pip3 install wheel")
        print("pip3 install aiohttp")
        print("pip3 install gunicorn")
        print("pip3 install requests")
        print("pip3 install bs4")
        print("pip3 install apscheduler")
        print("pip3 install pymongo")
        print("pip3 install PyMySQL")
